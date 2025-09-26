import { MovieParams } from "@/types/movie.type";
import { get } from "./method";

// 영화 목록
export async function getMovies(params?: MovieParams) {
  const res = await get("/discover/movie", params, "tmdb");
  return res.data;
}

// 영화 상세 정보
export async function getMovieDetail(movieId: number) {
  const res = await get(`/movie/${movieId}`, {}, "tmdb");
  return res.data;
}

// 장르 목록
export async function getGenres() {
  const res = await get("/genre/movie/list", {}, "tmdb");
  return res.data;
}

// 출연진, 제작진 목록
export async function getMovieCredits(movieId: number) {
  const res = await get(`/movie/${movieId}/credits`, {}, "tmdb");
  return res.data;
}
