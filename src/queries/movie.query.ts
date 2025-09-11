"use client";

import {
  deleteRating,
  getGenres,
  getMovieAccountState,
  getMovieCredits,
  getMovieDetail,
  getMovies,
  getReivews,
  getReviewDetail,
  postRating,
} from "@/services/movie.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { MovieParams } from "@/types/movie.type";

export function useMovies(params?: MovieParams) {
  return useQuery({
    queryKey: ["movies", params],
    queryFn: () => getMovies(params),
  });
}

export function useMovieDetail(movieId: string) {
  return useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => getMovieDetail(movieId),
  });
}

export function useMovieCredits(movieId: string) {
  return useQuery({
    queryKey: ["movie-credit", movieId],
    queryFn: () => getMovieCredits(movieId),
  });
}

export function useReviews(movieId: string) {
  return useQuery({
    queryKey: ["reviews", movieId],
    queryFn: () => getReivews(movieId),
  });
}

export function useReviewDeatil(reviewId: string) {
  return useQuery({
    queryKey: ["review", reviewId],
    queryFn: () => getReviewDetail(reviewId),
  });
}

export function useMovieAccountStates(movieId: string) {
  return useQuery({
    queryKey: ["movie-account-states", movieId],
    queryFn: () => getMovieAccountState(movieId),
  });
}

export function useGenres() {
  return useQuery({
    queryKey: ["genres"],
    queryFn: () => getGenres(),
  });
}

// 영화 정보랑 로그인 정보 쿼리 키
export function usePostRating() {
  const queryclient = useQueryClient();

  return useMutation({
    mutationFn: ({ movieId, value }: { movieId: string; value: string }) =>
      postRating(movieId, value),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["movie"] });
      toast.success("작성을 완료했습니다!");
    },
    onError: (err) => {
      console.error("작성 실패: ", err.message);
      toast.error("작성 중 문제가 발생하였습니다!");
    },
  });
}

export function useDeleteRating() {
  const queryclient = useQueryClient();

  return useMutation({
    mutationFn: ({ movieId }: { movieId: string }) => deleteRating(movieId),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["movie"] });
      toast.success("삭제 완료했습니다!");
    },
    onError: (err) => {
      console.error("삭제 실패: ", err.message);
      toast.error("삭제 중 문제가 발생하였습니다!");
    },
  });
}
