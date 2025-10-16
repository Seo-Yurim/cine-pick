import { MovieParams } from "@/types/movie.type";
import { get } from "./method";

// 영화 목록
export async function getMovies(params?: MovieParams) {
  let res;
  const today = new Date().toISOString().split("T")[0];

  // 파라미터 객체가 없다면 초기화
  const queryParams = { ...params };

  if (queryParams?.sort_by === "primary_release_date.desc") {
    queryParams["primary_release_date.lte"] = today;
    queryParams.with_origin_country = "KR";
  }

  res = await get(`/discover/movie`, queryParams, "tmdb");

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

// 인기 영화 목록
export async function getPopularMovies() {
  const res = await get("/movie/popular", {}, "tmdb");
  return res.data.results;
}

// 상영중인 영화 목록
export async function getNowPlayingMovies() {
  const res = await get("/movie/now_playing", { region: "KR" }, "tmdb");
  return res.data.results;
}
