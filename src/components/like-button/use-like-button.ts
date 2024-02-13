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

export async function fetchLike({ trigger, ...body }: FetchLikeProps) {
  const result = await fetch("/api/likes", {
    method: trigger === "like" ? "POST" : "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!result.ok) throw new Error("エラーが発生しました。");

  return result.json() as Promise<{ message: string; liked: boolean }>;
}

export function useLikeButton({ initialLiked }: UseLikeButtonProps) {
  // UIに表示する状態
  const [currentLikeState, setCurrentLikeState] = useState(initialLiked);

  // レンダリングには表示しないが、実際の状態を保持する
  const realityLiked = useRef(initialLiked);

  const { isPending, mutateAsync } = useMutation({
    mutationFn: fetchLike,
    onSuccess: ({ liked }) => {
      // 実際の状態に強制的に変更する
      realityLiked.current = liked;
      setCurrentLikeState(liked);
    },
    onError: () => {
      // エラーが発生した場合は元の状態に戻す
      setCurrentLikeState(realityLiked.current);
    },
  });

  // 連打対策にdebounceを使用する
  const onDebounceLike = useDebouncedCallback(async () => {
    // 送信中であれば何もしない
    if (isPending) return;

    // 現在の状態と実際の状態が同じであれば何もしない
    if (realityLiked.current === currentLikeState) return;

    const trigger = currentLikeState ? "like" : "unlike";

    await mutateAsync({ postId: 1, trigger });

    // その他の処理...
  }, 500);

  const handleLike = () => {
    // UIの状態を変更する
    setCurrentLikeState((prev) => !prev);

    // 設定したms後までに再度呼び出されなければ実行される
    onDebounceLike();
  };

  return {
    currentLikeState,
    handleLike,
  };
}
