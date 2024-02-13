import Link from "next/link";
import React from "react";
import { CacheFetch } from "@/components/segment-config/cache";
import { Revalidate } from "@/components/segment-config/revalidate";
import { buttonVariants } from "@/components/ui/button";
import { BASE_URL } from "@/lib/constant";

export const dynamic = "error";

export default async function page() {
  const data = await fetch(BASE_URL, {
    next: {
      revalidate: 0,
    },
  });

  const text = await data.text();

  return (
    <div>
      <h1 className="text-center text-4xl font-bold text-primary">
        Segment Config
      </h1>
      <p>{text}</p>
      <div className="grid gap-10">
        <CacheFetch />

        <Revalidate />
      </div>
      <Link
        className={buttonVariants({
          className: "mt-10",
        })}
        href="/"
      >
        Back to home
      </Link>
    </div>
  );
}
