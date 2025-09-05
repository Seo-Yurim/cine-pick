import instance from "./instance";

export async function get(url: string, params = {}) {
  return instance.get(url, { params });
}

export async function post<T>(url: string, body: T) {
  return instance.post(url, body);
}

export async function patch<T>(url: string, body?: T) {
  return instance.patch(url, body);
}

export async function remove(url: string) {
  return instance.delete(url);
}
