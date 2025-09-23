import axios from "axios";

const tmdbInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TMDB_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: process.env.NEXT_PUBLIC_TMDB_API_KEY,
  },
  params: { language: "ko" },
});

// 로딩

tmdbInstance.interceptors.request.use(
  (config) => {
    const sessionId = localStorage.getItem("session_id");

    if (sessionId) {
      config.params = {
        ...config.params,
        session_id: sessionId,
      };
    }

    return config;
  },
  (error) => Promise.reject(error),
);

tmdbInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("TMDB API 응답 에러:", error);
    return Promise.reject(error);
  },
);

export default tmdbInstance;
