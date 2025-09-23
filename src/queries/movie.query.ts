"use client";

import { getGenres, getMovieCredits, getMovieDetail, getMovies } from "@/services/movie.service";
import { useQuery } from "@tanstack/react-query";
import { MovieParams } from "@/types/movie.type";

export function useMovies(params?: MovieParams) {
  return useQuery({
    queryKey: ["movies", params],
    queryFn: () => getMovies(params),
  });
}

export function useMovieDetail(movieId: number) {
  return useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => getMovieDetail(movieId),
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
