import {
  deleteCollection,
  getCollectionDetail,
  getCollectionList,
  patchCollection,
  patchCollectionMovie,
  postCollection,
} from "@/services/collections.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CollectionItem, CollectionList, CollectionMovie } from "@/types/collections.type";
import { queryClient } from "./query-client";

// 컬렉션 목록
export function useGetCollectionList(userId: string) {
  return useQuery({
    queryKey: ["collections", userId],
    queryFn: () => getCollectionList(userId),
    enabled: !!userId,
  });
}

// 컬렉션 상세
export function useGetCollectionDetail(collectionId: string) {
  return useQuery({
    queryKey: ["collections"],
    queryFn: () => getCollectionDetail(collectionId),
    enabled: !!collectionId,
    staleTime: 0,
  });
}

// 컬렉션 추가
export function usePostCollection() {
  return useMutation({
    mutationFn: (collectionData: Omit<CollectionList, "id">) => postCollection(collectionData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      toast.success("새 컬렉션 목록을 생성했어요!");
    },
    onError: (err) => {
      console.error("컬렉션 생성 실패: ", err.message);
      toast.error("컬렉션 생성 중 문제가 발생하였습니다!");
    },
  });
}

// 컬렉션 수정
export function usePatchCollection() {
  return useMutation({
    mutationFn: ({
      collectionId,
      collectionData,
    }: {
      collectionId: string;
      collectionData: Omit<CollectionItem, "id">;
    }) => patchCollection(collectionId, collectionData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["collections", variables.collectionId] });
      toast.success("컬렉션 목록을 수정했어요!");
    },
    onError: (err) => {
      console.error("컬렉션 수정 실패: ", err.message);
      toast.error("컬렉션 수정 중 문제가 발생하였습니다!");
    },
  });
}

// 컬렉션 삭제
export function useDeleteCollection() {
  return useMutation({
    mutationFn: ({ collectionId }: { collectionId: string }) => deleteCollection(collectionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      toast.success("컬렉션 목록을 삭제했어요!");
    },
    onError: (err) => {
      console.error("컬렉션 삭제 실패: ", err.message);
      toast.error("컬렉션 삭제 중 문제가 발생하였습니다!");
    },
  });
}

// 컬렉션에 영화 추가 및 삭제
export function usePatchCollectionMovie() {
  return useMutation({
    mutationFn: ({
      collectionId,
      collectionMovie,
    }: {
      collectionId: string;
      collectionMovie: CollectionMovie[];
    }) => patchCollectionMovie(collectionId, collectionMovie),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
    onError: (err) => {
      console.error("영화 추가 실패: ", err.message);
    },
  });
}
