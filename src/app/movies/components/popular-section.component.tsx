"use client";

import { useMovies } from "@/queries/movie.query";
import { MovieItem } from "@/types/movie.type";

export default function PopularSectionComponent() {
  const { data, isLoading, isError } = useMovies({
    sort_by: "popularity.desc",
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading movies</p>;

  return (
    <section>
      <h2>오늘의 인기 영화</h2>
      <div className="flex flex-col items-center gap-2">
        {data.results.map((item: MovieItem, idx: number) => (
          <div key={idx}>{item.title}</div>
        ))}
      </div>
    </section>
  );
}
