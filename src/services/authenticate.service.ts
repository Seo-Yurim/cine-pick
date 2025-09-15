import { get, post } from "./method";

export async function getRequestToken() {
  const res = await get("/authentication/token/new");
  return res.data;
}

export async function postSession(data: { request_token: string }) {
  const res = await post("/authentication/session/new", data);
  return res.data;
}
