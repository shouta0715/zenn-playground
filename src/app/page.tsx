import { LikeButton } from "@/components/like-button";
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
      <nav>
        <LikeButton initialLiked={liked !== null} />
      </nav>
    </div>
  );
}
