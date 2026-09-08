import axios from "axios";

import { ACCESS_TOKEN_KEY } from "../utils/constants";
import { storage } from "../utils/storage";

const apiClient = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const accessToken = storage.get(ACCESS_TOKEN_KEY);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      storage.remove(ACCESS_TOKEN_KEY);
    }

    return Promise.reject(error);
  }
);

export default apiClient;