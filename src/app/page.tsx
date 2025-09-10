"use client";

import { LoadingComponent, MovieListComponent } from "@/components";
import { useMovies } from "@/queries/movie.query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GenreMovieListComponent } from "./component/genre-movie-list.component";

export default function Home() {
  const today = new Date();
  const formatted = today.toISOString().split("T")[0];
  const [showLoading, setShowLoading] = useState<boolean>(true);

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

  const isLoading = popularLoading || newLoading;
  const isError = popularErr || newErr;

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isLoading) {
      setShowLoading(true);
    } else {
      timeout = setTimeout(() => setShowLoading(false), 800);
    }

    return () => clearTimeout(timeout);
  }, [isLoading]);

  if (showLoading) return <LoadingComponent label="로딩 중 ... " isIndeterminate />;
  if (isError) toast.error("데이터를 불러오는 중 오류가 발생하였습니다.", { duration: 3000 });

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
