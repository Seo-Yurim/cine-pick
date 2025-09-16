import { MovieParams } from "@/types/movie.type";
import { get, post, remove } from "./method";

// 영화 목록
export async function getMovies(params?: MovieParams) {
  const res = await get("/discover/movie", params);
  return res.data;
}

// 영화 상세 정보
export async function getMovieDetail(movieId: number) {
  const res = await get(`/movie/${movieId}`);
  return res.data;
}

// 장르 목록
export async function getGenres() {
  const res = await get("/genre/movie/list");
  return res.data;
}

// 출연진, 제작진 목록
export async function getMovieCredits(movieId: number) {
  const res = await get(`/movie/${movieId}/credits`);
  return res.data;
}

// 평점 추가
export async function postRating(movieId: number, value: string) {
  const res = await post(`/movie/${movieId}}/rating`, { value });
  return res.data;
}

// 평점 제거
export async function deleteRating(movieId: number) {
  const res = await remove(`/movie/${movieId}}/rating`);
  return res.data;
}

// 리뷰 목록
export async function getReivews(movieId: number) {
  const res = await get(`/movie/${movieId}}/reviews`);
  return res.data;
}

// 리뷰 상세 정보
export async function getReviewDetail(reviewId: string) {
  const res = await get(`/review/${reviewId}`);
  return res.data;
}

// 특정 영화에 관한 사용자 상태
export async function getMovieAccountState(movieId: number) {
  const res = await get(`/movie/${movieId}}/account_states`);
  return res.data;
}
