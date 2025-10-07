"use client";

import { useSearchParams } from "next/navigation";
import { MovieItem } from "@/types/movie.type";
import { genresMatch } from "@/utils/genres-match.util";
import { useGenres } from "@/queries/movie.query";
import { useSearchResult } from "@/queries/search.query";
import { MovieCardComponent, SearchComponent } from "@/components";

export default function SearchResultComponent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const { data: searchResult } = useSearchResult(query);
  const { data: genres } = useGenres();

  const filteredData = searchResult?.results?.filter((item: MovieItem) => item.media_type !== "tv");

  return (
    <>
      <h1 className="text-2xl font-bold">검색 결과</h1>
      <SearchComponent defaultValue={query} placeholder="원하는 영화를 찾아보세요!" />
      <section className="grid grid-cols-4 gap-4">
        {filteredData?.map((item: MovieItem) => (
          <MovieCardComponent
            key={item.id}
            movie={item}
            genres={genresMatch(genres.genres, item.genre_ids)}
          />
        ))}
      </section>
    </>
  );
}
