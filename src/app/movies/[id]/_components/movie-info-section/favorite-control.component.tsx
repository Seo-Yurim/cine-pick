import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { FavoriteMovieItem } from "@/types/users.type";
import { useAuthStore } from "@/stores/auth.store";
import { useDeleteFavoriteMovie, usePostFavoriteMovie } from "@/queries/favorites.query";
import { ButtonComponent } from "@/components";
import { TooltipComponent } from "@/components/tooltip/tooltip.component";

interface FavoriteControlComponentProps {
  defaultValue?: FavoriteMovieItem | null;
  movieId: number;
}

export function FavoriteControlComponent({ defaultValue, movieId }: FavoriteControlComponentProps) {
  const { user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [favorited, setFavorited] = useState<boolean>(defaultValue?.favorite || false);

  useEffect(() => {
    setFavorited(defaultValue?.favorite || false);
  }, [defaultValue]);

  const addFavorite = usePostFavoriteMovie();
  const toggleFavorite = useDeleteFavoriteMovie();

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
        { favoriteId: defaultValue.id },
        {
          onSuccess: () => {
            setFavorited(false);
          },
        },
      );
    }
  };

  return (
    <TooltipComponent text="즐겨찾기" bgColor="#e11d48">
      <ButtonComponent>
        <div
          onClick={handleFavorite}
          className="rounded-full border-2 border-rose-600 p-3 transition-all duration-300 hover:scale-105"
        >
          {favorited ? (
            <IoIosHeart size={30} className="text-rose-600" />
          ) : (
            <IoIosHeartEmpty size={30} className="text-rose-600" />
          )}
        </div>
      </ButtonComponent>
    </TooltipComponent>
  );
}
