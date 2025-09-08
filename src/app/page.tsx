"use client";

import { useMovies } from "@/queries/movie.query";
import MovieListComponent from "@/components/movie-list/movie-list.component";

export default function Home() {
  const { data, isLoading, isError } = useMovies({
    sort_by: "popularity.desc",
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading movies</p>;

  return (
    <main className="flex flex-col gap-16 pb-40">
      <MovieListComponent
        title="오늘의 인기 영화"
        bgColor="hsl(var(--point-color))"
        data={data.results}
      />
      <MovieListComponent title="최신 개봉작" data={data.results} />
      <MovieListComponent title="장르별 추천 영화" data={data.results} />
    </main>
  );
}
