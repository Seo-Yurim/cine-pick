"use client";

import { useSearchParams } from "next/navigation";
import { MovieItem } from "@/types/movie.type";
import { useSearchResult } from "@/queries/search.query";
import { MovieCardComponent, SearchComponent } from "@/components";

export default function SearchResultComponent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const { data: searchResult } = useSearchResult(query ?? "");

  const filteredData = searchResult?.results?.filter((item: MovieItem) => item.media_type !== "tv");

  return (
    <main className="mx-auto flex w-full max-w-[1920px] flex-col gap-8 px-8 py-8">
      <h1 className="text-2xl font-bold">검색 결과</h1>
      <SearchComponent defaultValue={query} placeholder="원하는 영화를 찾아보세요!" />
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredData?.map((item: MovieItem) => (
          <MovieCardComponent key={item.id} data={item} />
        ))}
      </section>
    </main>
  );
}
