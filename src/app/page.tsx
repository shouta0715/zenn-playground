import Link from "next/link";
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
    <div>
      <LikeButton initialLiked={liked !== null} />

      <Link
        className={buttonVariants({
          className: "mt-10",
        })}
        href="/segment-config"
      >
        Go To Segment Config
      </Link>
    </div>
  );
}
