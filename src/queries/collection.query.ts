import {
  CollectionData,
  deleteCollection,
  deleteMovie,
  getCollectionDetail,
  postAddMovie,
  postCollection,
} from "@/services/collection.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// 컬렉션 상세
export function useCollectionDetail(listId: number) {
  return useQuery({
    queryKey: ["collection-detail", listId],
    queryFn: () => getCollectionDetail(listId),
  });
}

// 컬렉션 목록 추가
export function usePostCollection() {
  const queryclient = useQueryClient();

  return useMutation({
    mutationFn: ({ sessionId, collection }: { sessionId: string; collection: CollectionData }) =>
      postCollection(sessionId, collection),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["collection-list"] });
      toast.success("새 컬렉션 목록을 생성했어요!");
    },
    onError: (err) => {
      console.error("컬렉션 생성 실패: ", err.message);
      toast.error("컬렉션 생성 중 문제가 발생하였습니다!");
    },
  });
}

// 컬렉션 목록 삭제
export function useDeleteCollection() {
  const queryclient = useQueryClient();

  return useMutation({
    mutationFn: ({ listId }: { listId: number }) => deleteCollection(listId),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["collection-list"] });
      toast.success("컬렉션 목록을 삭제했어요!");
    },
    onError: (err) => {
      console.error("컬렉션 삭제 실패: ", err.message);
      toast.error("컬렉션 삭제 중 문제가 발생하였습니다!");
    },
  });
}

// 컬렉션에 영화 추가
export function usePostAddMovie() {
  const queryclient = useQueryClient();

  return useMutation({
    mutationFn: ({ listId, media_id }: { listId: number; media_id: number }) =>
      postAddMovie(listId, media_id),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["collection-list"] });
      toast.success("컬렉션에 영화를 추가했어요!");
    },
    onError: (err) => {
      console.error("영화 추가 실패: ", err.message);
      toast.error("영화 추가 중 문제가 발생하였습니다!");
    },
  });
}

// 컬렉션에 영화 삭제
export function useDeleteMovie() {
  const queryclient = useQueryClient();

  return useMutation({
    mutationFn: ({ listId, media_id }: { listId: number; media_id: number }) =>
      deleteMovie(listId, media_id),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["collection-list"] });
      toast.success("해당 영화를 삭제했어요!");
    },
    onError: (err) => {
      console.error("영화 삭제 실패: ", err.message);
      toast.error("영화 삭제 중 문제가 발생하였습니다!");
    },
  });
}
