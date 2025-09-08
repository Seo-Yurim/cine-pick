"use client";

import { useMovies } from "@/queries/movie.query";
import MovieListComponent from "@/components/movie-list/movie-list.component";

export default function Home() {
  const today = new Date();
  const formatted = today.toISOString().split("T")[0];
  const {
    data: popularData,
    isLoading: popularLoading,
    isError: popularErr,
  } = useMovies({
    sort_by: "popularity.desc",
  });

  const {
    data: newData,
    isLoading: newLoading,
    isError: newErr,
  } = useMovies({
    sort_by: "primary_release_date.desc",
    "primary_release_date.lte": formatted,
  });

  const {
    data: genresData,
    isLoading: genresLoading,
    isError: genresErr,
  } = useMovies({
    sort_by: "popularity.desc",
  });

  if (popularLoading || newLoading || genresLoading) return <div>loading .. </div>;
  if (popularErr || newErr || genresErr) return <div>error .. </div>;

  return (
    <main className="flex flex-col gap-16 pb-40">
      <MovieListComponent
        title="오늘의 인기 영화"
        bgColor="hsl(var(--point-color))"
        data={popularData.results}
      />
      <MovieListComponent title="최신 개봉작" data={newData.results} />
      <MovieListComponent title="장르별 추천 영화" data={genresData.results} />
    </main>
  );
}
