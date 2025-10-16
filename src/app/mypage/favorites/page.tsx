"use client";

import { FavoriteMovieItem } from "@/types/users.type";
import { useAuthStore } from "@/stores/auth.store";
import { useGetMyFavoriteList } from "@/queries/favorites.query";
import { FavoriteListComponent } from "./_components/favorite-list.component";

export default function MyFavoritePage() {
  const { user } = useAuthStore();
  const userId = user?.id as string;

  const { data: favoriteMovies } = useGetMyFavoriteList(userId);

  const filteredMovies = favoriteMovies?.filter((movie: FavoriteMovieItem) => movie.favorite);

  return (
    <>
      <h1 className="text-2xl font-bold">즐겨찾기 목록</h1>
      <div className="flex flex-col gap-2">
        {filteredMovies?.length > 0 ? (
          filteredMovies?.map((favoriteMovie: FavoriteMovieItem) => (
            <FavoriteListComponent key={favoriteMovie.id} favoriteMovie={favoriteMovie} />
          ))
        ) : (
          <p>즐겨찾기한 작품이 없습니다.</p>
        )}
      </div>
    </>
  );
}
