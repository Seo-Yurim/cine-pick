"use client";

import { isError } from "postcss/lib/css-syntax-error";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MovieItem } from "@/types/movie.type";
import { useMovieAccountStates } from "@/queries/movie.query";
import { FavoriteMovieComponent } from "../favorite-movie.component";
import { LoadingComponent } from "../loading.component";

export function MovieCardComponent({
  minWidth = "312px",
  data,
  type = "grid",
}: {
  minWidth?: string;
  data: MovieItem;
  type?: string;
}) {
  const router = useRouter();
  const posterUrl = data.poster_path
    ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
    : "/default.svg";

  const { data: movieAccountStates, isLoading: isMovieAccountStatesLoading } =
    useMovieAccountStates(data.id);

  if (isMovieAccountStatesLoading) return <LoadingComponent label="로딩 중 ... " isIndeterminate />;

  const handleClick = () => {
    if (type !== "grid") router.push(`/movies/${data.id}`);
  };

  return (
    <div
      onClick={handleClick}
      style={{ minWidth: minWidth }}
      className={`${type === "grid" ? "" : "cursor-pointer"} group relative flex w-full flex-col gap-4 overflow-hidden rounded-xl bg-white p-4 shadow-lg transition-all duration-300 hover:scale-105`}
    >
      {type === "grid" && (
        <div className="relative aspect-[3/4] w-full min-w-[200px]">
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
        <div className="absolute left-0 top-0 flex h-full w-full flex-col rounded-xl border bg-text-bg opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex-1 overflow-y-auto p-4 scrollbar-none">
            <div className="flex items-center gap-4 pb-4">
              <h3 className="text-nowrap text-xl font-bold">줄거리</h3>
              <div className="w-full border-b" />
            </div>

            <p className="text-lg">{data.overview || "요약된 줄거리가 없습니다."}</p>
          </div>

          <div className="flex items-center gap-4 border-t bg-text-bg p-4">
            <FavoriteMovieComponent movieId={data.id} defaultValue={movieAccountStates.favorite} />
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
