import { get } from "./method";

// 인물 정보
export async function getPersonInfo(personId: string) {
  const res = await get(`/person/${personId}`);
  return res.data;
}

// 인물이 참여한 영화 목록
export async function getPersonMovies(personId: string) {
  const res = await get(`/person/${personId}/movie_credits`);
  return res.data;
}
