import { get } from "./method";

export async function getAccount() {
  const res = await get("/account");
  return res.data;
}

export async function getAccountDetail(accountId: string) {
  const res = await get(`/account/${accountId}`);
  return res.data;
}
