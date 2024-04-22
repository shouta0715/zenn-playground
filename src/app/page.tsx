import Link from "next/link";

import { Box } from "@/app/_components/box";
import { CategorySelector } from "@/components/category-selecter";
import { FadeIn, FadeInWithStagger } from "@/components/fade-in";
import { LikeButton } from "@/components/like-button";
import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

const items = Array.from({ length: 50 }, (_, i) => i);

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

      <h2 className="mt-10 text-center text-xl font-bold">
        表示されたものがFadeInで表示される
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-10">
        {items.map((item) => (
          <FadeIn>
            <Box
              key={item}
              className="flex items-center justify-center text-2xl font-bold"
            >
              {item}
            </Box>
          </FadeIn>
        ))}
      </div>
      <h2 className="mt-10 text-center text-xl font-bold">
        最初の要素が表示されると連動して他の要素も表示される
      </h2>
      <FadeInWithStagger className="flex flex-wrap items-center justify-center gap-10">
        {items.map((item) => (
          <FadeIn>
            <Box
              key={item}
              className="flex items-center justify-center text-2xl font-bold"
            >
              <span className="">{item + 1}</span>
            </Box>
          </FadeIn>
        ))}
      </FadeInWithStagger>
    </div>
  );
}
