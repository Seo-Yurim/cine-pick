"use client";

import { FavoriteMovieItem } from "@/types/users.type";
import { useAuthStore } from "@/stores/auth.store";
import { useGetMyFavoriteList } from "@/queries/favorites.query";
import { FavoriteListComponent } from "./_components/favorite-list.component";

export default function MyFavoritePage() {
  const { user } = useAuthStore();
  const userId = user?.id as string;

  const { data: favoriteMovies } = useGetMyFavoriteList(userId);

  return (
    <main className="mx-auto flex w-full max-w-[1920px] flex-col gap-8 px-8 py-8">
      <h1 className="text-2xl font-bold">즐겨찾기 목록</h1>
      <div className="grid grid-cols-1 justify-items-center gap-4 md:grid-cols-2 md:justify-between lg:grid-cols-4">
        {favoriteMovies?.length > 0 ? (
          favoriteMovies?.map((favoriteMovie: FavoriteMovieItem) => (
            <FavoriteListComponent key={favoriteMovie.id} movieId={favoriteMovie.movieId} />
          ))
        ) : (
          <p>즐겨찾기한 작품이 없습니다.</p>
        )}
      </div>
    </main>
  );
}
