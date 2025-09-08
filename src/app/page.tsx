"use client";

import { useMovies } from "@/queries/movie.query";
import LoadingComponent from "@/components/loading.component";
import MovieListComponent from "@/components/movie-list.component";
import { GenreMovieListComponent } from "./component/genre-movie-list.component";

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

  if (popularLoading || newLoading)
    return <LoadingComponent label="로딩 중 ... " isIndeterminate />;
  if (popularErr || newErr) return <div>error .. </div>;

  return (
    <main className="flex flex-col gap-16 pb-40">
      <MovieListComponent
        title="오늘의 인기 영화"
        bgColor="hsl(var(--point-color))"
        data={popularData.results}
      />
      <MovieListComponent title="최신 개봉작" data={newData.results} />
      <GenreMovieListComponent />
    </main>
  );
}
