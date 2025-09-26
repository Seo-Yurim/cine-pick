import axios from "axios";

const localInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

localInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("Local API 응답 에러:", err);
    return Promise.reject(err);
  },
);

export default localInstance;
