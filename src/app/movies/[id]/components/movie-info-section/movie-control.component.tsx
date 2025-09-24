import { useState } from "react";
import toast from "react-hot-toast";
import { FaFolderPlus } from "react-icons/fa";
import { useAuthStore } from "@/stores/user.store";
import { usePostAddMovie } from "@/queries/collection.query";
import { useGetFavoriteMovie } from "@/queries/favorites.query";
import { LoadingComponent, RatingComponent } from "@/components";
import { FavoriteMovieComponent } from "@/components/favorite-movie.component";
import { MenuComponent } from "@/components/menu.component";

export function MovieControlComponent({ movieId }: { movieId: number }) {
  const { user } = useAuthStore();
  const userId = user?.id as string;

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const {
    data: favoriteMovie,
    isLoading: isFavoriteLoading,
    isError: isFavoriteError,
  } = useGetFavoriteMovie(userId, movieId);

  if (isFavoriteLoading) return <LoadingComponent />;
  if (isFavoriteError) return toast.error("데이터를 불러오는 중 오류가 발생했습니다!");

  return (
    <div className="flex items-center gap-4">
      <FavoriteMovieComponent defaultValue={!user ? null : favoriteMovie} movieId={movieId} />

      {/* <MenuComponent
        isOpen={isMenuOpen}
        onOpenChange={() => setIsMenuOpen(!isMenuOpen)}
        btnIcon={<FaFolderPlus className="h-6 w-6" />}
        menuList={collectionList.results}
        onSelectCollection={handleSelectCollection}
      />

      <p className="text-nowrap rounded-xl bg-point-color px-4 py-1 font-medium">내가 준 평점</p>
      {movieAccountStates.rated.value > 0 ? (
        <RatingComponent type="show" defaultValue={movieAccountStates.rated.value} />
      ) : (
        <p className="font-semibold">남긴 평점이 없습니다. 이 영화를 평가해주세요!</p>
      )} */}
    </div>
  );
}
