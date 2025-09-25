import {
  deleteWatchedMovie,
  getWatchedDetail,
  getWatchedList,
  postWatchedMovie,
} from "@/services/watches.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { WatchesItem } from "@/types/watches.type";
import { queryClient } from "./query-client";

// 시청 목록
export function useGetWatchedList(userId: string) {
  return useQuery({
    queryKey: ["watches", userId],
    queryFn: () => getWatchedList(userId),
    enabled: !!userId,
  });
}

// 시청 목록 상세
export function useGetWatchedDetail(userId: string, movieId: number) {
  return useQuery({
    queryKey: ["watches", userId],
    queryFn: () => getWatchedDetail(userId, movieId),
    enabled: !!userId && !!movieId,
    staleTime: 0,
  });
}

// 시청 목록에 추가
export function usePostWatchedMovie() {
  return useMutation({
    mutationFn: (watchedData: Omit<WatchesItem, "id">) => postWatchedMovie(watchedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watches"] });
      toast.success("시청 기록에 추가했어요!");
    },
    onError: (err) => {
      console.error("시청 기록 추가 실패: ", err.message);
      toast.error("시청 기록 추가 중 문제가 발생하였습니다!");
    },
  });
}

// 시청 목록에서 삭제
export function useDeleteWatchedMovie() {
  return useMutation({
    mutationFn: ({ watchedId }: { watchedId: string }) => deleteWatchedMovie(watchedId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watches"] });
      toast.success("시청 기록에서 삭제했어요!");
    },
    onError: (err) => {
      console.error("시청 기록 삭제 실패: ", err.message);
      toast.error("시청 기록 삭제 중 문제가 발생하였습니다!");
    },
  });
}
