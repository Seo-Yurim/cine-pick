import instance from "./instance";

export async function get(url: string, params = {}) {
  try {
    return instance.get(url, { params });
  } catch (error) {
    console.error("GET 요청 실패:", error);
    throw error;
  }
}

export async function post<T>(url: string, body: T) {
  try {
    return instance.post(url, body);
  } catch (error) {
    console.error("POST 요청 실패:", error);
    throw error;
  }
}

export async function patch<T>(url: string, body?: T) {
  try {
    return instance.patch(url, body);
  } catch (error) {
    console.error("PATCH 요청 실패:", error);
    throw error;
  }
}

export async function remove(url: string) {
  try {
    return instance.delete(url);
  } catch (error) {
    console.error("DELETE 요청 실패:", error);
    throw error;
  }
}
