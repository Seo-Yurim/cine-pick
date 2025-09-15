import { get, post } from "./method";

export interface PostFavoriteMovie {
  media_type: string;
  media_id: number;
  favorite: boolean;
}

// 로그인 정보 조회
export async function getAccount(sessionId?: string) {
  const res = await get("/account", { sessionId });
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

// 컬렉션 목록 조회
export async function getCollectionList(accountId: string) {
  const res = await get(`/account/${accountId}/lists`);
  return res.data;
}
