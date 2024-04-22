import React from "react";
import { cn } from "@/lib/utils";

export function Box({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "size-40 rounded-xl border border-border bg-background p-4 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}
