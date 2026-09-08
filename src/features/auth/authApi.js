import apiClient from "../../services/apiClient";
import { ACCESS_TOKEN_KEY } from "../../utils/constants";
import { storage } from "../../utils/storage";

export const registerApi = async (userData) => {
  const response = await apiClient.post("/auth/register", userData);

  return response.data;
};

export const loginApi = async (credentials) => {
  const response = await apiClient.post("/auth/login", credentials);

  const accessToken = response.data?.data?.accessToken;

  if (accessToken) {
    storage.set(ACCESS_TOKEN_KEY, accessToken);
  }

  return response.data;
};

export const getMeApi = async () => {
  const response = await apiClient.get("/auth/me");

  return response.data;
};

export const logoutApi = async () => {
  const response = await apiClient.post("/auth/logout");

  storage.remove(ACCESS_TOKEN_KEY);

  return response.data;
};
