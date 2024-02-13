import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

type UseLikeButtonProps = {
  initialLiked: boolean;
};

type FetchLikeProps = {
  postId: number;
  trigger: "like" | "unlike";
};

export async function fetchLike({ trigger, ...props }: FetchLikeProps) {
  const result = await fetch("/api/likes", {
    method: trigger === "like" ? "POST" : "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...props,
    }),
  });

  if (!result.ok) throw new Error("エラーが発生しました。");

  return result.json() as Promise<{ message: string; liked: boolean }>;
}

export function useLikeButton({ initialLiked }: UseLikeButtonProps) {
  const [currentLikeState, setCurrentLikeState] = useState(initialLiked);

  const realityLiked = useRef(initialLiked);

  const { isPending, mutateAsync } = useMutation({
    mutationFn: fetchLike,
    onSuccess: ({ liked }) => {
      realityLiked.current = liked;
      setCurrentLikeState(liked);
    },
    onError: () => {
      realityLiked.current = currentLikeState;
      setCurrentLikeState(realityLiked.current);
    },
  });

  const onDebounceLike = useDebouncedCallback(async () => {
    if (isPending) return;
    if (realityLiked.current === currentLikeState) return;

    const trigger = currentLikeState ? "like" : "unlike";

    await mutateAsync({
      postId: 1,
      trigger,
    });
  }, 500);

  const handleLike = () => {
    setCurrentLikeState((prev) => !prev);

    onDebounceLike();
  };

  return {
    currentLikeState,
    handleLike,
  };
}
