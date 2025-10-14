"use client";

import {
  getGenres,
  getMovieCredits,
  getMovieDetail,
  getMovies,
  getNowPlayingMovies,
  getPopularMovies,
} from "@/services/movie.service";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { MovieParams } from "@/types/movie.type";

// 영화 목록
export function useMovies(params: MovieParams) {
  return useQuery({
    queryKey: ["movies", params],
    queryFn: () => getMovies(params),
  });
}

// 영화 목록 (무한스크롤)
export function useInfinityMovies(params: MovieParams) {
  return useInfiniteQuery({
    queryKey: ["movies", params],
    queryFn: ({ pageParam = 1 }) => getMovies({ ...params, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage <= lastPage.total_pages ? nextPage : undefined;
    },
    initialPageParam: 1,
  });
}

// 영화 상세 정보
export function useMovieDetail(movieId: number) {
  return useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => getMovieDetail(movieId),
    enabled: !!movieId,
  });
}

// 영화 크레딧 정보
export function useMovieCredits(movieId: number) {
  return useQuery({
    queryKey: ["movie-credit", movieId],
    queryFn: () => getMovieCredits(movieId),
  });
}

// 영화 장르 목록
export function useGenres() {
  return useQuery({
    queryKey: ["genres"],
    queryFn: () => getGenres(),
  });
}

// 인기 영화 목록
export function useGetPopularMovies() {
  return useQuery({
    queryKey: ["movies", "popular"],
    queryFn: () => getPopularMovies(),
  });
}

// 상영중인 영화 목록
export function useGetNowPlayingMovies() {
  return useQuery({
    queryKey: ["movies", "now-playing"],
    queryFn: () => getNowPlayingMovies(),
  });
}
