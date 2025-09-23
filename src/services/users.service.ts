import { User } from "@/types/user.type";
import { get, patch, post, remove } from "./method";

// 로그인
export async function getLogin(username: string, password: string) {
  const res = await get("/users", { username, password });
  return res.data.length > 0 ? res.data[0] : null;
}

// 내 정보 가져오기
export async function getUser(userId: string) {
  const res = await get(`/users/${userId}`);
  return res.data;
}

// 회원가입
export async function postUser(userData: Omit<User, "id">) {
  const res = await post("/users", userData);
  return res.data;
}

// 회원 정보 수정
export async function patchUser(userId: string, userData: Omit<User, "id">) {
  const res = await patch(`/users/${userId}`, userData);
  return res.data;
}

// 회원 탈퇴
export async function deleteUser(userId: string) {
  const res = await remove(`/users/${userId}`);
  return res.data;
}
