import { Category } from "@prisma/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useMemo, useState, useTransition } from "react";
import { useDebouncedCallback } from "use-debounce";

type Params = {
  q: string;
  offset: number;
};

type FetchResult = {
  categories: Pick<Category, "name">[];
  hasMore: boolean;
};

async function fetchCategories(params: Params): Promise<FetchResult> {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    searchParams.set(key, value.toString());
  });

  const res = await fetch(`/api/categories?${searchParams.toString()}`);
  const data = (await res.json()) as FetchResult;

  return data;
}

function useQueryCategory(q: string) {
  const { data, isPending, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery({
      queryKey: ["categories", "search", { q }],
      queryFn: ({ pageParam }: { pageParam: Params }) => {
        return fetchCategories(pageParam);
      },
      initialPageParam: { q, offset: 0 },
      getNextPageParam: (lastPage, _, lastPageParam) => {
        if (lastPage.categories.length === 0) return undefined;
        if (!lastPage.hasMore) return undefined;

        return {
          q: lastPageParam.q,
          offset: lastPageParam.offset + 10,
        };
      },
    });

  const categories = useMemo(() => {
    return data?.pages.flatMap((page) => page.categories) ?? [];
  }, [data?.pages]);

  return {
    isPending: isPending || isFetchingNextPage,
    categories,
    hasMore: hasNextPage,
    fetchNextPage,
  };
}

export function useSearchCategories() {
  const [inputValue, setInputValue] = useState("");
  const [q, setQ] = useState("");
  const [isTransition, startTransition] = useTransition();

  const { hasMore, categories, isPending, fetchNextPage } = useQueryCategory(q);

  const onChangeQuery = useDebouncedCallback((val: string) => {
    startTransition(() => {
      setQ(val.toLowerCase());
    });
  }, 500);

  const isSearching =
    isPending || isTransition || inputValue.toLowerCase() !== q.toLowerCase();

  return {
    onChangeQuery,
    isSearching,
    inputValue,
    setInputValue,
    categories,
    hasMore,
    fetchNextPage,
  };
}
