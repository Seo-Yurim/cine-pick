"use client";

import { useMovieDetail } from "@/queries/movie.query";
import { ButtonComponent, MovieListComponent } from "@/components";

interface CollectionMovieListProps {
  movieId: number;
  onDeleteMovie: (movieId: number) => void;
}

export function CollectionMovieList({ movieId, onDeleteMovie }: CollectionMovieListProps) {
  const { data, isLoading } = useMovieDetail(movieId);

  const movieDetail = data ?? {};

  return (
    <div className="flex items-center gap-4">
      <MovieListComponent movie={movieDetail} genres={movieDetail.genres} isLoading={isLoading} />
      <ButtonComponent
        onClick={() => onDeleteMovie(movieId)}
        className="rounded-xl bg-text-bg hover:bg-white/30"
      >
        삭제
      </ButtonComponent>
    </div>
  );
}
