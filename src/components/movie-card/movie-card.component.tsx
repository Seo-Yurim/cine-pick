"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MovieItem } from "@/types/movie.type";

export function MovieCardComponent({ data, type = "grid" }: { data: MovieItem; type?: string }) {
  const router = useRouter();
  const posterUrl = data.poster_path
    ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
    : "/default.svg";

  const handleClick = () => {
    if (type !== "grid") router.push(`/movies/${data.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`${type === "grid" ? "max-w-xs sm:max-w-sm md:max-w-md" : "cursor-pointer"} group relative flex w-full flex-col gap-4 rounded-xl bg-white p-4 shadow-lg transition-all duration-300 hover:scale-105`}
    >
      {type === "grid" && (
        <div className="relative aspect-[3/4] w-full">
          <Image
            src={posterUrl}
            className="absolute h-full w-full rounded-xl object-cover"
            fill
            priority
            alt={`${data.title} 포스터`}
            sizes="412px"
          />
        </div>
      )}

      <div className="flex flex-col items-end gap-4 text-background">
        <div className="flex w-full justify-between gap-4">
          <p className="text-xl font-bold">{data.title}</p>
          <p className="text-nowrap py-1 text-sm text-gray-500">{data.release_date}</p>
        </div>
      </div>

      {type === "grid" && (
        <div className="absolute left-0 top-0 flex h-full w-full flex-col gap-4 overflow-y-scroll rounded-xl border bg-text-bg p-4 opacity-0 transition-opacity duration-300 scrollbar-none group-hover:opacity-100">
          <div className="flex items-center gap-4">
            <h3 className="text-nowrap text-xl font-bold">줄거리</h3>
            <div className="w-full border-b" />
          </div>

          <p className="text-lg">{data.overview || "요약된 줄거리가 없습니다."}</p>

          <div className="fixed bottom-0 left-1/2 w-full -translate-x-1/2 rounded-b-lg border bg-text-bg p-8">
            <Link
              href={`/movies/${data.id}`}
              className="flex w-full cursor-pointer justify-center rounded-lg border bg-text-bg p-4 text-lg font-semibold hover:bg-point-color"
            >
              상세보기
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
