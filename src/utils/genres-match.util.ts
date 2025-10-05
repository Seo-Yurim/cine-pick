import { MovieGenres } from "@/types/movie.type";

export function genresMatch(genres: MovieGenres[], genreIds: number[]): MovieGenres[] {
  return genreIds
    .map((id) => genres?.find((genre) => genre.id === id))
    .filter((genre): genre is MovieGenres => genre !== undefined);
}
