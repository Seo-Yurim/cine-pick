import { MovieGenres } from "@/types/movie.type";

export function genresMatch(genres: MovieGenres[], genreIds: number[]): string[] {
  return genreIds
    .map((id) => genres.find((genre) => genre.id === id)?.name)
    .filter((name): name is string => Boolean(name));
}
