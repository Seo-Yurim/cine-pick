import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { MovieDetailItem } from "@/types/movie.type";
import { useAuthStore } from "@/stores/auth.store";
import {
  useGetFavoriteMovie,
  usePatchFavoriteMovie,
  usePostFavoriteMovie,
} from "@/queries/favorites.query";
import { ButtonComponent, TooltipComponent } from "@/components";

interface FavoriteControlComponentProps {
  movieData: MovieDetailItem;
}

export function FavoriteControlComponent({ movieData }: FavoriteControlComponentProps) {
  const { user } = useAuthStore();
  const { data: favoriteMovie } = useGetFavoriteMovie(user?.id ?? "", movieData?.id);

  const router = useRouter();
  const pathname = usePathname();
  const [favorited, setFavorited] = useState<boolean>(favoriteMovie?.favorite ?? false);

  useEffect(() => {
    setFavorited(favoriteMovie?.favorite);
  }, [favoriteMovie]);

  const addFavorite = usePostFavoriteMovie();
  const patchFavorite = usePatchFavoriteMovie();

  // 좋아요 토글 처리 함수
  const handleFavorite = () => {
    if (!user) {
      toast.error("로그인이 필요한 서비스입니다!");
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    const favoriteData = { movieId: movieData.id, userId: user.id, favorite: !favorited };

    if (favoriteMovie) {
      patchFavorite.mutate(
        {
          favoriteId: favoriteMovie.id,
          favoriteData,
        },
        {
          onSuccess: () => {
            setFavorited(!favorited);
            toast.success(`즐겨찾기를 ${!favorited ? "추가" : "해제"}했어요.`);
          },
        },
      );
    } else {
      // 존재하지 않으면 새로 생성
      addFavorite.mutate(
        {
          movieId: movieData.id,
          userId: user.id,
          favorite: true,
        },
        {
          onSuccess: (newFavorite) => {
            setFavorited(newFavorite.favorite);
            toast.success("즐겨찾기에 추가했어요.");
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
