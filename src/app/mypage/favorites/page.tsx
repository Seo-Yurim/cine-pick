"use client";

import { useAuthStore } from "@/stores/auth.store";
import toast from "react-hot-toast";
import { MovieItem } from "@/types/movie.type";
import { LoadingComponent, MovieCardComponent } from "@/components";
import { useAccount, useFavoriteMovies } from "@/queries/account.query";

export default function MyFavoritePage() {
  const { accountId } = useAuthStore();

  const {
    data: favoriteMovies,
    isLoading: isFavoriteMoviesLoading,
    isError: isFavoriteMoviesError,
  } = useFavoriteMovies(accountId as string);

  if (isFavoriteMoviesLoading) return <LoadingComponent label="로딩 중 ..." isIndeterminate />;

  if (isFavoriteMoviesError) {
    toast.error("데이터를 불러오는 중 오류가 발생했습니다.");
    return;
  }

  return (
    <main className="mx-auto flex w-full max-w-[1920px] flex-col gap-8 px-8 py-8">
      <h1 className="text-2xl font-bold">즐겨찾기 목록</h1>
      <div className="grid grid-cols-1 justify-items-center gap-4 md:grid-cols-2 md:justify-between lg:grid-cols-4">
        {favoriteMovies.total_results !== 0 ? (
          favoriteMovies.results.map((movie: MovieItem) => (
            <MovieCardComponent key={movie.id} data={movie} />
          ))
        ) : (
          <p>즐겨찾기한 작품이 없습니다.</p>
        )}
      </div>
    </main>
  );
}
