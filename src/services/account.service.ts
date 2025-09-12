import { get, post } from "./method";

export interface PostFavoriteMovie {
  media_type: string;
  media_id: number;
  favorite: boolean;
}

// 로그인 정보 조회
export async function getAccount() {
  const res = await get("/account");
  return res.data;
}

// 로그인 아이디를 이용해서 사용자 정보 조회
export async function getAccountDetail(accountId: string) {
  const res = await get(`/account/${accountId}`);
  return res.data;
}

// 즐겨찾기 목록 조회
export async function getFavoriteMovies(accountId: string) {
  const res = await get(`/account/${accountId}/favorite/movies`);
  return res.data;
}

// 즐겨찾기 추가
export async function postFavoriteMovie(accountId: string, movie: PostFavoriteMovie) {
  const res = await post(`/account/${accountId}/favorite`, { movie });
  return res.data;
}
