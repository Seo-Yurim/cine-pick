import { get } from "./method";

export async function getSearchResult(query: string) {
  const res = await get("/search/multi", { query });
  return res.data;
}

export async function getSearchPersonResult(query: string) {
  const res = await get("/search/person", { query });
  return res.data.results?.[0]?.id;
}

export async function getPersonIds(names: string[]) {
  const promises = names.map((name) => getSearchPersonResult(name));
  const ids = await Promise.all(promises);
  return ids.filter((id) => id !== null);
}
