import { deleteUser, getUser, patchUser, postUser } from "@/services/users.service";
import { useAuthStore } from "@/stores/user.store";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { User } from "@/types/user.type";
import { queryClient } from "./query-client";

// 내 정보 가져오기
export function useGetUser(userId: number) {
  return useQuery<User>({
    queryKey: ["users", userId],
    queryFn: () => getUser(userId),
    enabled: !!userId,
    refetchOnWindowFocus: false,
  });
}

// 회원가입
export function usePostUser() {
  return useMutation({
    mutationFn: ({ userData }: { userData: User }) => postUser(userData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      useAuthStore.getState().setUser(data);
      toast.success("회원가입 성공!");
    },
    onError: (err) => {
      console.error("회원가입 실패: ", err.message);
      toast.error("회원가입 처리 중 문제가 발생하였습니다!");
    },
  });
}

// 회원 정보 수정
export function usePatchUser() {
  return useMutation({
    mutationFn: ({ userId, userData }: { userId: number; userData: User }) =>
      patchUser(userId, userData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users", variables.userId] });
      useAuthStore.getState().setUser(data);
      toast.success("회원 정보 수정 성공!");
    },
    onError: (err) => {
      console.error("회원 정보 수정 실패: ", err.message);
      toast.error("회원 정보 수정 중 문제가 발생하였습니다!");
    },
  });
}

// 회원 탈퇴
export function useDeleteUser() {
  return useMutation({
    mutationFn: ({ userId }: { userId: number }) => deleteUser(userId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users", variables.userId] });
      toast.success("회원 탈퇴 성공!");
    },
    onError: (err) => {
      console.error("회원 탈퇴 실패: ", err.message);
      toast.error("회원 탈퇴 처리 중 문제가 발생하였습니다!");
    },
  });
}
