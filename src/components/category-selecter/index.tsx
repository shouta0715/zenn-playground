"use client";

/* eslint-disable react/no-array-index-key */
import { Category } from "@prisma/client";
import { AlertTriangle, Check, ChevronsUpDown, Loader2 } from "lucide-react";
import React, { Suspense, memo } from "react";

import { useSearchCategories } from "@/components/category-selecter/use-search-categories";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

function SearchingLoader({ type }: { type: "command" | "item" }) {
  switch (type) {
    case "command":
      return (
        <>
          <CommandInput disabled isLoading placeholder="Searching..." />
          <SearchingLoader type="item" />
        </>
      );
    case "item":
      return (
        <div className="grid gap-2 p-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={`searching-loader-${i}`} className="h-8 w-full" />
          ))}
        </div>
      );
    default:
      return null;
  }
}

type CategoryItemProps = {
  category: Pick<Category, "name">;
  setOpen?: (value: boolean) => void;
  setCategory: (value: string) => void;
  value: string;
};

const CategoryItem = memo(
  ({ category, setOpen, setCategory, value }: CategoryItemProps) => {
    return (
      <CommandItem
        key={category.name}
        className="mt-2 flex items-center justify-between text-sm capitalize first:mt-0"
        onSelect={(currentValue) => {
          setCategory(currentValue);
          setOpen?.(false);
        }}
        value={category.name}
      >
        <div className="flex items-center">
          <Check
            className={cn(
              "mr-2 h-4 w-4",
              category.name === value ? "opacity-100" : "opacity-0"
            )}
          />
          <span>{category.name}</span>
        </div>
      </CommandItem>
    );
  }
);

function Categories({
  setOpen,
  setCategory,
  value,
}: {
  setOpen?: (value: boolean) => void;
  setCategory: (value: string) => void;
  value: string;
}) {
  const {
    categories,
    hasMore,
    onChangeQuery,
    isSearching,
    inputValue,
    setInputValue,
    fetchNextPage,
  } = useSearchCategories();

  return (
    <>
      <CommandInput
        isLoading={isSearching}
        onValueChange={(v) => {
          onChangeQuery(v);
          setInputValue(v);
        }}
        placeholder="Search category"
      />
      <CommandEmpty className="py-0 text-left text-sm">
        {isSearching ? (
          <SearchingLoader type="item" />
        ) : (
          <div className="flex w-full flex-col  gap-4 overflow-hidden px-2 py-4">
            <div className="flex justify-center">
              <AlertTriangle className="size-8 text-muted-foreground" />
            </div>

            <div className="grid gap-2">
              <p className="text-center text-muted-foreground">Not Found for</p>
              <code className="line-clamp-1 max-w-full rounded-md bg-secondary p-2 text-destructive ">
                {inputValue}
              </code>
            </div>
            <Button className="flex items-center" variant="default">
              <span className="mx-2 line-clamp-1 max-w-44 flex-1">
                {inputValue}
              </span>
              <span>を作成する</span>
            </Button>
          </div>
        )}
      </CommandEmpty>

      <CommandGroup className="p-2">
        {categories.map((category) => (
          <CategoryItem
            key={category.name}
            category={category}
            setCategory={setCategory}
            setOpen={setOpen}
            value={value}
          />
        ))}
      </CommandGroup>
      {hasMore && (
        <div className="mb-2 border-t border-border px-2 pt-6">
          <Button
            className="w-full rounded-full"
            disabled={isSearching}
            onClick={() => fetchNextPage()}
            size="sm"
            variant="default"
          >
            {isSearching && <Loader2 className="mr-4 size-5 animate-spin" />}
            {isSearching ? "Loading..." : "Load more"}
          </Button>
        </div>
      )}
    </>
  );
}

export function CategorySelector() {
  const [open, setOpen] = React.useState(false);
  const [value, setCategory] = React.useState("");

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <div className="group inline-block">
          <Button
            aria-expanded={open}
            className="mt-3 w-72 justify-between capitalize group-hover:bg-accent group-hover:text-accent-foreground sm:w-80"
            role="combobox"
            type="button"
            variant="outline"
          >
            {value || "Select category"}
            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="max-h-80 min-h-48 w-72 overflow-auto p-0 sm:w-80">
        <Command>
          <Suspense fallback={<SearchingLoader type="command" />}>
            <Categories
              setCategory={setCategory}
              setOpen={setOpen}
              value={value}
            />
          </Suspense>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
