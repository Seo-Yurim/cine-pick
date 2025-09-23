import { User } from "@/types/user.type";
import { get, patch, post, remove } from "./method";

// 내 정보 가져오기
export async function getUser(userId: number) {
  const res = await get(`/users/${userId}`);
  return res.data;
}

// 회원가입
export async function postUser(userData: User) {
  const res = await post("/users", userData);
  return res.data;
}

// 회원 정보 수정
export async function patchUser(userId: number, userData: User) {
  const res = await patch(`/users/${userId}`, userData);
  return res.data;
}

// 회원 탈퇴
export async function deleteUser(userId: number) {
  const res = await remove(`/users/${userId}`);
  return res.data;
}
