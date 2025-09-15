"use client";

import {
  PostFavoriteMovie,
  getAccount,
  getAccountDetail,
  getCollectionList,
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

export function useCollectionList(accountId: string) {
  return useQuery({
    queryKey: ["collection-list", accountId],
    queryFn: () => getCollectionList(accountId),
  });
}

export function usePostFavoriteMovie() {
  const queryclient = useQueryClient();

  return useMutation({
    mutationFn: ({
      accountId,
      favoriteMovie,
    }: {
      accountId: string;
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
