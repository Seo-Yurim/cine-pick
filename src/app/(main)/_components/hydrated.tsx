"use client";

import { useMovies } from "@/queries/movie.query";
import { MovieListComponent } from "@/components";
import { GenreMovieListComponent } from "./genre-movie-list.component";

export default function Hydrated() {
  const today = new Date().toISOString().split("T")[0];

  const { data: popularData } = useMovies({ sort_by: "popularity.desc" });
  const { data: newData } = useMovies({
    sort_by: "primary_release_date.desc",
    "primary_release_date.lte": today,
  });

  return (
    <main className="flex flex-col gap-16 pb-40">
      <MovieListComponent
        title="오늘의 인기 영화"
        bgColor="hsl(var(--point-color))"
        data={popularData?.results}
      />
      <MovieListComponent title="최신 개봉작" data={newData?.results} />
      <GenreMovieListComponent />
    </main>
  );
}
