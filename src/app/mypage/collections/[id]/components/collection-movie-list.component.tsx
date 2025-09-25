"use client";

import { useMovieDetail } from "@/queries/movie.query";
import { ButtonComponent, LoadingComponent, MovieCardComponent } from "@/components";

interface CollectionMovieListProps {
  movieId: number;
  onDeleteMovie: (movieId: number) => void;
}

export function CollectionMovieLIst({ movieId, onDeleteMovie }: CollectionMovieListProps) {
  const { data, isLoading, isError } = useMovieDetail(movieId);
  if (isLoading) return <LoadingComponent />;

  return (
    <div className="flex flex-col items-center">
      <MovieCardComponent data={data} minWidth="412px" />
      <ButtonComponent onClick={() => onDeleteMovie(movieId)} className="bg-red-500 text-white">
        삭제
      </ButtonComponent>
    </div>
  );
}
