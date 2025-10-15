"use client";

import { GenresList, MovieItem } from "@/types/movie.type";
import { genresMatch } from "@/utils/genres-match.util";
import { MovieCardComponent, SearchComponent } from "@/components";

interface SearchResultClientProps {
  query: string;
  genres: GenresList;
  searchResults: MovieItem[];
}

export default function SearchResultClient({
  query,
  genres,
  searchResults,
}: SearchResultClientProps) {
  const filteredData = searchResults.filter((item: MovieItem) => item.media_type !== "tv");

  return (
    <>
      <h1 className="text-2xl font-bold">검색 결과</h1>
      <SearchComponent defaultValue={query} placeholder="원하는 영화를 찾아보세요!" />
      <section className="grid grid-cols-4 gap-4">
        {filteredData.map((item: MovieItem) => (
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
