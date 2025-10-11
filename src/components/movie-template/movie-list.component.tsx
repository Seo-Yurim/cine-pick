"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MovieGenres, MovieItem } from "@/types/movie.type";

interface MovieListProps {
  movie: MovieItem;
  genres: MovieGenres[];
}

export function MovieListComponent({ movie, genres }: MovieListProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/movies/${movie.id}`)}
      className="relative flex w-full cursor-pointer overflow-hidden rounded-xl bg-black shadow-lg transition duration-300 hover:scale-[1.01] hover:shadow-xl"
    >
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center blur-sm brightness-50"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
        }}
      />

      <div className="flex w-full items-center gap-6 bg-black/30 p-6 backdrop-blur-sm">
        <div className="relative aspect-[2/3] w-[120px] shrink-0">
          <Image
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/default.svg"
            }
            fill
            className="rounded-lg object-cover"
            alt={`${movie.title} 포스터`}
            sizes="120px"
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">{movie.title}</h2>
            <p className="text-sm text-gray-400">{movie.release_date} 개봉</p>
          </div>
          <p className="line-clamp-3 text-gray-200">{movie.overview}</p>
          <div className="flex flex-wrap gap-2 text-sm text-gray-200">
            {genres?.map((genre: MovieGenres) => (
              <span key={genre.id} className="rounded-lg bg-white/20 px-4 py-1 text-sm font-medium">
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
