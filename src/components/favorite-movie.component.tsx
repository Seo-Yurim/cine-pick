import { useAuthStore } from "@/stores/auth.store";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { usePostFavoriteMovie } from "@/queries/account.query";
import { ButtonComponent } from "./button/button.component";

interface FavoriteMovieProps {
  defaultValue: boolean;
  movieId: number;
}

export function FavoriteMovieComponent({ defaultValue, movieId }: FavoriteMovieProps) {
  const { accountId } = useAuthStore();

  const [favorited, setFavorited] = useState<boolean>(defaultValue);

  const toggleFavorite = usePostFavoriteMovie();

  const handletoggleFavorite = () => {
    if (!accountId) {
      toast.error("로그인이 필요합니다.");
      return;
    }

    const newFavorite = !favorited;
    setFavorited(newFavorite);

    const favoriteMovie = {
      media_type: "movie",
      media_id: movieId,
      favorite: newFavorite,
    };

    toggleFavorite.mutate(
      { accountId, favoriteMovie },
      {
        onSuccess: () => {
          if (newFavorite) {
            toast.success("해당 작품을 즐겨찾기에 추가했어요!");
          } else {
            toast.success("해당 작품을 즐겨찾기에서 삭제했어요!");
          }
        },
      },
    );
  };

  return (
    <ButtonComponent onClick={handletoggleFavorite}>
      <div className="rounded-full border border-rose-600 p-2">
        {favorited ? (
          <IoIosHeart className="h-6 w-6 text-rose-600" />
        ) : (
          <IoIosHeartEmpty className="h-6 w-6 text-rose-600" />
        )}
      </div>
    </ButtonComponent>
  );
}
