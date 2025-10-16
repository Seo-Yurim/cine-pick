"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MovieGenres, MovieItem } from "@/types/movie.type";
import { MovieCardSkeletonComponent } from "../skeleton/movie-card-skeleton.component";

interface MovieCardProps {
  movie: MovieItem;
  genres: MovieGenres[];
  isLoading?: boolean;
}

export function MovieCardComponent({ movie, genres, isLoading = false }: MovieCardProps) {
  const router = useRouter();

  if (isLoading) {
    return <MovieCardSkeletonComponent />;
  }

  return (
    <div
      onClick={() => router.push(`/movies/${movie.id}`)}
      className="group relative flex aspect-[2/3] w-full flex-col gap-4 rounded-xl bg-white p-4 shadow-lg transition-all duration-300 hover:scale-[1.02]"
    >
      <div className="relative aspect-[3/4] w-full">
        <Image
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/default.svg"
          }
          className="absolute h-full w-full rounded-xl object-cover"
          fill
          priority
          fetchPriority="high"
          alt={`${movie.title} 포스터`}
          sizes="412px"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex w-full justify-between gap-4">
          <p className="truncate text-xl font-bold text-background">{movie.title}</p>
          <p className="text-nowrap py-1 text-sm text-gray-500">{movie.release_date}</p>
        </div>

        <div className="flex min-h-[24px] gap-2 overflow-hidden text-sm text-gray-200">
          {genres?.length ? (
            genres.map((genre: MovieGenres) => (
              <span key={genre.id} className="text-nowrap rounded-lg bg-text-bg px-2 py-1 text-xs">
                {genre.name}
              </span>
            ))
          ) : (
            <span className="invisible text-xs">장르 없음</span>
          )}
        </div>
      </div>

      <div className="absolute left-0 top-0 flex h-full w-full flex-col overflow-hidden rounded-xl border bg-text-bg opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="flex-1 overflow-y-auto p-4 scrollbar-none">
          <div className="flex items-center gap-4 pb-4">
            <h3 className="text-nowrap text-xl font-bold">줄거리</h3>
            <div className="w-full border-b" />
          </div>

          <p>{movie.overview || "요약된 줄거리가 없습니다."}</p>
        </div>

        <div className="flex items-center gap-4 border-t bg-text-bg p-4">
          <Link
            href={`/movies/${movie.id}`}
            className="flex w-full cursor-pointer justify-center rounded-lg border bg-text-bg p-4 text-lg font-semibold hover:bg-point-color"
          >
            상세보기
          </Link>
        </div>
      </div>
    </div>
  );
}
