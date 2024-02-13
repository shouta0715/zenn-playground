"use client";

import clsx from "clsx";
import { HeartIcon } from "lucide-react";
import React from "react";
import { useLikeButton } from "@/components/like-button/use-like-button";
import { Button } from "@/components/ui/button";

interface LikeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  initialLiked: boolean;
}

export function LikeButton({ initialLiked, ...props }: LikeButtonProps) {
  const { currentLikeState, handleLike } = useLikeButton({
    initialLiked,
  });

  return (
    <Button onClick={handleLike} size="icon" variant="ghost" {...props}>
      <HeartIcon
        className={clsx(currentLikeState ? "fill-pink-500 text-pink-500" : "")}
      />
    </Button>
  );
}
