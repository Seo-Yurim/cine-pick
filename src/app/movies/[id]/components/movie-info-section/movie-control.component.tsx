import { useAuthStore } from "@/stores/auth.store";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaFolderPlus } from "react-icons/fa";
import { MovieCollectionItem } from "@/types/movie.type";
import { LoadingComponent, RatingComponent } from "@/components";
import { FavoriteMovieComponent } from "@/components/favorite-movie.component";
import { MenuComponent } from "@/components/menu.component";
import { useCollectionList } from "@/queries/account.query";
import { usePostAddMovie } from "@/queries/collection.query";
import { useMovieAccountStates } from "@/queries/movie.query";

export function MovieControlComponent({ movieId }: { movieId: number }) {
  const { accountId } = useAuthStore();
  if (!accountId) return null;

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const addMovie = usePostAddMovie();

  const {
    data: movieAccountStates,
    isLoading: isMovieAccountStatesLoading,
    isError: isMovieAccountStatesError,
  } = useMovieAccountStates(movieId);

  const {
    data: collectionList,
    isLoading: isCollectionListLoading,
    isError: isCollectionError,
  } = useCollectionList(accountId);

  if (isMovieAccountStatesLoading || isCollectionListLoading) return <LoadingComponent />;
  if (isMovieAccountStatesError || isCollectionError) {
    toast.error("데이터를 불러오는 중 오류가 발생했습니다!", { duration: 3000 });
    return;
  }

  const handleSelectCollection = (collection: MovieCollectionItem) => {
    addMovie.mutate({
      listId: collection.id,
      media_id: movieId,
    });
  };

  return (
    <div className="flex items-center gap-4">
      <FavoriteMovieComponent defaultValue={movieAccountStates.favorite} movieId={movieId} />

      <MenuComponent
        isOpen={isMenuOpen}
        onOpenChange={() => setIsMenuOpen(!isMenuOpen)}
        btnIcon={<FaFolderPlus className="h-6 w-6" />}
        menuList={collectionList.results}
        onSelectCollection={handleSelectCollection}
      />

      <p className="rounded-xl bg-point-color px-4 py-1 font-medium">내가 준 평점</p>
      {movieAccountStates.rated.value > 0 ? (
        <RatingComponent type="show" defaultValue={movieAccountStates.rated.value} />
      ) : (
        <p className="font-semibold">남긴 평점이 없습니다, 리뷰를 통해 이 영화를 평가해주세요!</p>
      )}
    </div>
  );
}
