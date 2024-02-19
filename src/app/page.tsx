import Link from "next/link";

import { CategorySelector } from "@/components/category-selecter";
import { LikeButton } from "@/components/like-button";
import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const liked = await prisma.like.findFirst({
    where: {
      postId: 1,
      userId: 2,
    },
  });

  return (
    <div className="grid gap-6">
      <div className="border-b border-border p-6">
        <LikeButton initialLiked={liked !== null} />
      </div>

      <div className="border-b border-border p-6">
        <CategorySelector />
      </div>
      <div className="border-b border-border p-6">
        <Link
          className={buttonVariants({
            className: "mt-10 w-max",
          })}
          href="/segment-config"
        >
          Go To Segment Config
        </Link>
      </div>
    </div>
  );
}
