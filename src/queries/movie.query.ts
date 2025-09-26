"use client";

import { getGenres, getMovieCredits, getMovieDetail, getMovies } from "@/services/movie.service";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { MovieParams } from "@/types/movie.type";

export function useMovies(params?: MovieParams) {
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

export function useMovieDetail(movieId: number) {
  return useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => getMovieDetail(movieId),
    enabled: !!movieId,
  });
}

export function useMovieCredits(movieId: number) {
  return useQuery({
    queryKey: ["movie-credit", movieId],
    queryFn: () => getMovieCredits(movieId),
  });
}

export function useGenres() {
  return useQuery({
    queryKey: ["genres"],
    queryFn: () => getGenres(),
  });
}
