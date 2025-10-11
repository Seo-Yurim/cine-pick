"use client";

import { useMovieDetail } from "@/queries/movie.query";
import { ButtonComponent, MovieCardComponent, MovieListComponent } from "@/components";
import { MovieCardSkeletonComponent } from "@/components/skeleton/movie-card-skeleton.component";

interface CollectionMovieListProps {
  movieId: number;
  onDeleteMovie: (movieId: number) => void;
}

export function CollectionMovieList({ movieId, onDeleteMovie }: CollectionMovieListProps) {
  const { data } = useMovieDetail(movieId);

  const movieDetail = data ?? {};

  return (
    <div className="flex items-center gap-4">
      {movieDetail ? (
        <MovieListComponent movie={movieDetail} genres={movieDetail.genres} />
      ) : (
        <MovieCardSkeletonComponent />
      )}
      <ButtonComponent
        onClick={() => onDeleteMovie(movieId)}
        className="rounded-xl bg-text-bg hover:bg-white/30"
      >
        삭제
      </ButtonComponent>
    </div>
  );
}
