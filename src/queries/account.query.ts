"use client";

import {
  PostFavoriteMovie,
  getAccount,
  getAccountDetail,
  getFavoriteMovies,
  postFavoriteMovie,
} from "@/services/account.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useAccount() {
  return useQuery({
    queryKey: ["account-data"],
    queryFn: () => getAccount(),
  });
}

export function useAccountDetail(accountId: string) {
  return useQuery({
    queryKey: ["account", accountId],
    queryFn: () => getAccountDetail(accountId),
  });
}

export function useFavoriteMovies(accountId: string) {
  return useQuery({
    queryKey: ["favorite-movies", accountId],
    queryFn: () => getFavoriteMovies(accountId),
    enabled: !!accountId,
  });
}

export function usePostFavoriteMovie(accountId: string) {
  const queryclient = useQueryClient();

  return useMutation({
    mutationFn: ({
      movieId,
      favoriteMovie,
    }: {
      movieId: string;
      favoriteMovie: PostFavoriteMovie;
    }) => postFavoriteMovie(accountId, favoriteMovie),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["favorite-movie"] });
      toast.success("해당 작품을 좋아요에 추가했어요!");
    },
    onError: (err) => {
      console.error("좋아요 실패: ", err.message);
      toast.error("좋아요 처리 중 문제가 발생하였습니다!");
    },
  });
}
