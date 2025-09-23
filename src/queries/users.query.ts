import { deleteUser, getLogin, getUser, patchUser, postUser } from "@/services/users.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { User } from "@/types/users.type";
import { useAuthStore } from "@/stores/user.store";
import { queryClient } from "./query-client";

// 로그인
export function useGetLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) =>
      getLogin(username, password),
    onSuccess: (data) => {
      if (!data) {
        toast.error("아이디 또는 비밀번호가 일치하지 않습니다.");
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["users"] });
      useAuthStore.getState().setUser(data);
      toast.success("로그인 성공!");
      router.push("/");
    },
    onError: (err) => {
      console.error("로그인 실패: ", err.message);
      toast.error("로그인 처리 중 문제가 발생하였습니다!");
    },
  });
}

// 내 정보 가져오기
export function useGetUser(userId: string) {
  return useQuery<User>({
    queryKey: ["users", userId],
    queryFn: () => getUser(userId),
    enabled: !!userId,
    refetchOnWindowFocus: false,
  });
}

// 회원가입
export function usePostUser() {
  const router = useRouter();

  return useMutation({
    mutationFn: (userData: Omit<User, "id">) => postUser(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("회원가입 성공!");
      router.push("/login");
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
    mutationFn: ({ userId, userData }: { userId: string; userData: User }) =>
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
    mutationFn: ({ userId }: { userId: string }) => deleteUser(userId),
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
