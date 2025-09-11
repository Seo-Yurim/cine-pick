import { MovieParams } from "@/types/movie.type";
import { get, post, remove } from "./method";

// 영화 목록
export async function getMovies(params?: MovieParams) {
  const res = await get("/discover/movie", params);
  return res.data;
}

// 영화 상세 정보
export async function getMovieDetail(movieId: string) {
  const res = await get(`/movie/${movieId}`);
  return res.data;
}

// 장르 목록
export async function getGenres() {
  const res = await get("/genre/movie/list");
  return res.data;
}

// 출연진, 제작진 목록
export async function getMovieCredits(movieId: string) {
  const res = await get(`/movie/${movieId}/credits`);
  return res.data;
}

// 인물 정보
export async function getPersonDetail(personId: string) {
  const res = await get(`/person/${personId}`);
  return res.data;
}

// 인물이 참여한 영화 목록
export async function getPersonMovies(personId: string) {
  const res = await get(`/person/${personId}/movie_credits`);
  return res.data;
}

// 평점 추가
export async function postRating(movieId: string, rating: number) {
  const res = await post(`/movie/${movieId}}/rating`, rating);
  return res.data;
}

// 평점 제거
export async function deleteRating(movieId: string) {
  const res = await remove(`/movie/${movieId}}/rating`);
  return res.data;
}

// 리뷰 상세 정보
export async function getReviewDetail(reviewId: string) {
  const res = await get(`/review/${reviewId}`);
  return res.data;
}
