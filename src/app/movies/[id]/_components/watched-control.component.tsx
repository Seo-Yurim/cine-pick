import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsBookmarkCheckFill, BsBookmarkPlus } from "react-icons/bs";
import { WatchesItem } from "@/types/watches.type";
import { useAuthStore } from "@/stores/auth.store";
import { useDeleteWatchedMovie, usePostWatchedMovie } from "@/queries/watches.query";
import { ButtonComponent, TooltipComponent } from "@/components";

interface WatchedControlProps {
  defaultValue?: WatchesItem | null;
  movieId: number;
}

export function WatchedControlComponent({ defaultValue, movieId }: WatchedControlProps) {
  const { user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [watched, setWatched] = useState<boolean>(defaultValue?.watched || false);

  useEffect(() => {
    if (defaultValue !== undefined) {
      setWatched(defaultValue?.watched || false);
    }
  }, [defaultValue]);

  const addWatched = usePostWatchedMovie();
  const deleteWatched = useDeleteWatchedMovie();

  // 시청기록 토글 처리 함수
  const handleWatched = () => {
    if (!user) {
      toast.error("로그인이 필요한 서비스입니다!");
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    if (defaultValue && defaultValue.id) {
      deleteWatched.mutate(
        { watchedId: defaultValue.id },
        {
          onSuccess: () => {
            setWatched(false);
          },
        },
      );
    } else {
      const watchedData = {
        movieId,
        userId: user.id,
        watched: true,
      };

      addWatched.mutate(watchedData, {
        onSuccess: () => {
          setWatched(true);
        },
      });
    }
  };

  return (
    <TooltipComponent text="시청기록 추가" bgColor="#0369a1">
      <ButtonComponent>
        <div
          onClick={handleWatched}
          className="rounded-full border-2 border-sky-700 p-3 transition-all duration-300 hover:scale-105"
        >
          {!watched ? (
            <BsBookmarkPlus size={30} className="text-sky-700" />
          ) : (
            <BsBookmarkCheckFill size={30} className="text-sky-700" />
          )}
        </div>
      </ButtonComponent>
    </TooltipComponent>
  );
}
