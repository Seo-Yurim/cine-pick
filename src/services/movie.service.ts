import { MovieParams } from "@/types/movie.type";
import { get } from "./method";

export async function getMovies(params: MovieParams) {
  const res = await get("/discover/movie", params);
  return res.data;
}
