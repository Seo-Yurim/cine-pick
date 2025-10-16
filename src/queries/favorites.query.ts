import {
  deleteFavoriteMovie,
  getMyFavoriteList,
  getMyFavoriteMovie,
  patchFavoriteMovie,
  postFavoriteMovie,
} from "@/services/favorites.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FavoriteMovieItem } from "@/types/users.type";
import { queryClient } from "./query-client";

// 내가 좋아요 한 영화 목록
export function useGetMyFavoriteList(userId: string) {
  return useQuery({
    queryKey: ["favorites", userId],
    queryFn: () => getMyFavoriteList(userId),
    enabled: !!userId,
    staleTime: 0,
  });
}

// 내가 좋아요 한 영화
export function useGetFavoriteMovie(userId: string, movieId: number) {
  return useQuery({
    queryKey: ["favorites", userId, movieId],
    queryFn: () => getMyFavoriteMovie(userId, movieId),
    enabled: !!movieId,
    staleTime: 0,
  });
}

// 좋아요
export function usePostFavoriteMovie() {
  return useMutation({
    mutationFn: (favoriteData: Omit<FavoriteMovieItem, "id">) => postFavoriteMovie(favoriteData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      toast.success("좋아요를 눌렀습니다!");
    },
    onError: (err) => {
      console.error("좋아요 실패: ", err.message);
      toast.error("좋아요 처리 중 문제가 발생하였습니다!");
    },
  });
}

// 좋아요 수정
export function usePatchFavoriteMovie() {
  return useMutation({
    mutationFn: ({
      favoriteId,
      favoriteData,
    }: {
      favoriteId: string;
      favoriteData: Omit<FavoriteMovieItem, "id">;
    }) => patchFavoriteMovie(favoriteId, favoriteData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
    onError: (err) => {
      console.error("좋아요 실패: ", err.message);
    },
  });
}

// 좋아요 취소
export function useDeleteFavoriteMovie() {
  return useMutation({
    mutationFn: ({ favoriteId }: { favoriteId: string }) => deleteFavoriteMovie(favoriteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      toast.success("좋아요를 취소했습니다!");
    },
    onError: (err) => {
      console.error("좋아요 취소 실패: ", err.message);
      toast.error("좋아요 취소 중 문제가 발생하였습니다!");
    },
  });
}
