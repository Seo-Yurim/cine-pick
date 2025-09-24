import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { FavoriteMovieItem } from "@/types/users.type";
import { useAuthStore } from "@/stores/user.store";
import { usePatchFavoriteMovie, usePostFavoriteMovie } from "@/queries/favorites.query";
import { ButtonComponent } from "./button/button.component";

interface FavoriteMovieProps {
  defaultValue?: FavoriteMovieItem | null;
  movieId: number;
}

export function FavoriteMovieComponent({ defaultValue, movieId }: FavoriteMovieProps) {
  const { user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [favorited, setFavorited] = useState<boolean>(defaultValue?.favorite || false);

  const addFavorite = usePostFavoriteMovie();
  const toggleFavorite = usePatchFavoriteMovie();

  const handleFavorite = () => {
    if (!user) {
      toast.error("로그인이 필요한 서비스입니다!");
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    const favoriteData = { movieId, userId: user.id, favorite: !favorited };

    if (!defaultValue || defaultValue.id === undefined) {
      addFavorite.mutate(favoriteData, {
        onSuccess: () => {
          setFavorited(true);
        },
      });
    } else {
      toggleFavorite.mutate(
        { favoriteId: defaultValue.id, favoriteData },
        {
          onSuccess: () => {
            setFavorited(!favorited);
          },
        },
      );
    }
  };

  return (
    <ButtonComponent>
      <div onClick={handleFavorite} className="rounded-full border border-rose-600 p-2">
        {favorited ? (
          <IoIosHeart className="h-6 w-6 text-rose-600" />
        ) : (
          <IoIosHeartEmpty className="h-6 w-6 text-rose-600" />
        )}
      </div>
    </ButtonComponent>
  );
}
