import { PersonItem } from "@/types/movie.type";
import { get } from "./method";

// 검색 결과 조회
export async function getSearchResult(query: string) {
  const res = await get("/search/multi", { query }, "tmdb");
  return res.data;
}

// 검색한 인물의 ID 반환
export async function getSearchPersonResult(query: string) {
  const res = await get("/search/person", { query }, "tmdb");

  const results = res.data.results;
  if (!results || results.length === 0) return [];

  return results.map((person: PersonItem) => person.id);
}

// 태그 리스트에 담긴 인물 이름으로 인물 조회
export async function getPersonIds(names: string[]) {
  const allIds = await Promise.all(names.map(getSearchPersonResult));

  return [...new Set(allIds.flat())];
}
