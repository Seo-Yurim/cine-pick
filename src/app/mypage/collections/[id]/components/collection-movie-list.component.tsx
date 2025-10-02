"use client";

import { useMovieDetail } from "@/queries/movie.query";
import { ButtonComponent, MovieCardComponent } from "@/components";
import { MovieCardSkeletonComponent } from "@/components/skeleton/movie-card-skeleton.component";

interface CollectionMovieListProps {
  movieId: number;
  onDeleteMovie: (movieId: number) => void;
}

export function CollectionMovieLIst({ movieId, onDeleteMovie }: CollectionMovieListProps) {
  const { data } = useMovieDetail(movieId);

  const movieDetail = data ?? {};

  return (
    <div className="flex flex-col items-center">
      {movieDetail ? (
        <MovieCardComponent movie={movieDetail} genres={movieDetail.genres} />
      ) : (
        <MovieCardSkeletonComponent />
      )}
      <ButtonComponent onClick={() => onDeleteMovie(movieId)} className="bg-red-500 text-white">
        삭제
      </ButtonComponent>
    </div>
  );
}
