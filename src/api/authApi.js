import axios from "axios";

const api = axios.create({
  baseURL: "https://connections-api.goit.global",
});

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export const loginApi = async (credentials) => {
  const response = await api.post("/users/login", credentials);
  setAuthToken(response.data.token);
  return response.data;
};

export const logoutApi = async (token) => {
  setAuthToken(token);
  const response = await api.post("/users/logout");
  setAuthToken(null);
  return response.data;
};

export const refreshUserApi = async (token) => {
  setAuthToken(token);
  const response = await api.get("/users/current");
  return response.data;
};
