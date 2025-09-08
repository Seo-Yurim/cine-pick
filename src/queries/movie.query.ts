"use client";

import { getGenres, getMovies } from "@/services/movie.service";
import { useQuery } from "@tanstack/react-query";
import { MovieParams } from "@/types/movie.type";

export function useMovies(params?: MovieParams) {
  return useQuery({
    queryKey: ["movies", params],
    queryFn: () => getMovies(params),
  });
}

export function useGenres() {
  return useQuery({
    queryKey: ["genres"],
    queryFn: () => getGenres(),
  });
}
