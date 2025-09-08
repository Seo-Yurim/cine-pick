import { MovieParams } from "@/types/movie.type";
import { get } from "./method";

export async function getMovies(params?: MovieParams) {
  const res = await get("/discover/movie", params);
  return res.data;
}

export async function getGenres() {
  const res = await get("/genre/movie/list");
  return res.data;
}
