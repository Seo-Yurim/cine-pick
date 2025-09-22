import { get, post, remove } from "./method";

export interface CollectionData {
  name: string;
  description: string;
  language: string;
}

// 컬렉션 상세
export async function getCollectionDetail(listId: number) {
  const res = await get(`/list/${listId}`);
  return res.data;
}

// 컬렉션 목록 추가
export async function postCollection(collection: CollectionData) {
  const res = await post("/list", { collection });
  return res.data;
}

// 컬렉션 목록 삭제
export async function deleteCollection(listId: number) {
  const res = await remove(`/list/${listId}`);
  return res.data;
}

// 컬렉션에 영화 추가
export async function postAddMovie(listId: number, media_id: number) {
  const res = await post(`/list/${listId}/add_item`, { media_id });
  return res.data;
}

// 컬렉션에 영화 삭제
export async function deleteMovie(listId: number, media_id: number) {
  const res = await post(`/list/${listId}/add_item`, { media_id });
  return res.data;
}
