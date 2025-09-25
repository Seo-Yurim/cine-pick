import { CollectionItem, CollectionList, CollectionMovie } from "@/types/collections.type";
import { get, patch, post, remove } from "./method";

// 컬렉션 목록
export async function getCollectionList(userId: string) {
  const res = await get(`/collections?userId=${userId}`);
  return res.data;
}

// 컬렉션 상세
export async function getCollectionDetail(collectionId: string) {
  const res = await get(`/collections/${collectionId}`);
  return res.data;
}

// 컬렉션 추가
export async function postCollection(collectionData: Omit<CollectionList, "id">) {
  const res = await post("/collections", collectionData);
  return res.data;
}

// 컬렉션 수정
export async function patchCollection(
  collectionId: string,
  collectionData: Omit<CollectionItem, "id">,
) {
  const res = await patch(`/collections/${collectionId}`, collectionData);
  return res.data;
}

// 컬렉션 삭제
export async function deleteCollection(collectionId: string) {
  const moviesRes = await get(`/collectionMovies?collectionId=${collectionId}`);
  const movies: CollectionMovie[] = moviesRes.data;

  for (const movie of movies) {
    await remove(`/collectionMovies/${movie.movieId}`);
  }

  const res = await remove(`/collections/${collectionId}`);
  return res.data;
}

// 컬렉션에 영화 추가
export async function patchCollectionMovie(
  collectionId: string,
  collectionMovie: CollectionMovie[],
) {
  const res = await patch(`/collections/${collectionId}`, { movies: collectionMovie });
  return res.data;
}

// 컬렉션에 영화 삭제
export async function deleteCollectionMovie(collectionMovieId: string) {
  const res = await remove(`/collectionMovies/${collectionMovieId}`);
  return res.data;
}
