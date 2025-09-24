"use client";

import { useMovieDetail } from "@/queries/movie.query";
import { LoadingComponent, MovieCardComponent } from "@/components";

export function CollectionMovieLIst({ movieId }: { movieId: number }) {
  const { data, isLoading, isError } = useMovieDetail(movieId);
  if (isLoading) return <LoadingComponent />;

  return (
    <div className="flex items-center">
      <MovieCardComponent data={data} minWidth="412px" />
    </div>
  );
}
