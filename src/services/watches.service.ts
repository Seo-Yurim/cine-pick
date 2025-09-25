import { WatchesItem } from "@/types/watches.type";
import { get, post, remove } from "./method";

// 시청 목록
export async function getWatchedList(userId: string) {
  const res = await get(`/watches?userId=${userId}`);
  return res.data;
}

// 시청 목록에 추가
export async function postWatchedMovie(watchedData: Omit<WatchesItem, "id">) {
  const res = await post("/watches", watchedData);
  return res.data;
}

// 시청 목록에서 삭제
export async function deleteWatchedMovie(watchedId: string) {
  const res = await remove(`/watches/${watchedId}`);
  return res.data;
}
