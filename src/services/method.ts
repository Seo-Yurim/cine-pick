import localInstance from "./local.instance";
import tmdbInstance from "./tmdb.instance";

type InstanceType = "tmdb" | "local";

function getInstance(type: InstanceType) {
  if (type === "tmdb") return tmdbInstance;
  return localInstance;
}
export async function get(url: string, params = {}, instanceType: InstanceType = "local") {
  try {
    const instance = getInstance(instanceType);
    return await instance.get(url, { params });
  } catch (error) {
    console.error("GET 요청 실패:", error);
    throw error;
  }
}

export async function post<T>(url: string, body: T, instanceType: InstanceType = "local") {
  try {
    const instance = getInstance(instanceType);
    return await instance.post<T>(url, body);
  } catch (error) {
    console.error("POST 요청 실패:", error);
    throw error;
  }
}

export async function patch<T>(url: string, body?: T, instanceType: InstanceType = "local") {
  try {
    const instance = getInstance(instanceType);
    return instance.patch(url, body);
  } catch (error) {
    console.error("PATCH 요청 실패:", error);
    throw error;
  }
}

export async function remove(url: string, instanceType: InstanceType = "local") {
  try {
    const instance = getInstance(instanceType);
    return instance.delete(url);
  } catch (error) {
    console.error("DELETE 요청 실패:", error);
    throw error;
  }
}
