import { FavoriteMovieItem } from "@/types/users.type";
import { get, patch, post } from "./method";

// 내가 좋아요 한 영화 목록
export async function getMyFavoriteList(userId: string) {
  const res = await get(`/favorites/${userId}`);
  return res.data;
}

// 내가 좋아요 누른 영화
export async function getMyFavoriteMovie(userId: string, movieId: number) {
  const res = await get(`/favorites`, { userId, movieId });
  return res.data[0] ?? null;
}

// 좋아요
export async function postFavoriteMovie(favoriteData: Omit<FavoriteMovieItem, "id">) {
  const res = await post(`/favorites`, favoriteData);
  return res.data;
}

// 좋아요 삭제
export async function patchFavoriteMovie(
  favoriteId: string,
  favoriteData: Omit<FavoriteMovieItem, "id">,
) {
  const res = await patch(`/favorites/${favoriteId}`, favoriteData);
  return res.data;
}
