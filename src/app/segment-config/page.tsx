import Link from "next/link";
import React, { Suspense } from "react";
import { CacheFetch } from "@/components/segment-config/cache";
import { buttonVariants } from "@/components/ui/button";

export const fetchCache = "force-no-store";

export default async function page() {
  const params = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div>
      <h1 className="text-center text-4xl font-bold text-primary">
        Segment Config
      </h1>

      <div className="grid gap-10">
        <Suspense fallback={<div>Loading...</div>}>
          <CacheFetch />
        </Suspense>
      </div>
      <Link
        className={buttonVariants({
          className: "mt-10",
        })}
        href="/"
      >
        Back to home
      </Link>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="mt-10 grid grid-cols-5 gap-4">
          {params.map((param) => {
            return (
              <Link
                key={param}
                className={buttonVariants({
                  className: "flex flex-col items-center",
                })}
                href={`/segment-config/${param}`}
              >
                <span>{`Segment Config ${param}`}</span>
                <span>{param > 5 ? "Dynamic Render " : "Static Render"}</span>
              </Link>
            );
          })}
        </div>
      </Suspense>
    </div>
  );
}
