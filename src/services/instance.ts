import { useAuthStore } from "@/stores/auth.store";
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: process.env.NEXT_PUBLIC_TMDB_API_KEY,
  },
  params: { language: "ko" },
});

instance.interceptors.request.use(
  (config) => {
    const sessionId = useAuthStore.getState().sessionId;

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

export default instance;
