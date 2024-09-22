import axios from "axios";

const api = axios.create({
  baseURL: "https://connections-api.goit.global",
});

export const loginApi = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export const logoutApi = async () => {
  await api.post("/auth/logout");
};

export const refreshUserApi = async () => {
  const response = await api.get("/auth/refresh");
  return response.data;
};
