import axios from "axios";

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: "https://connections-api.goit.global",
});

// Add a request interceptor to include the token in the headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
