import axios from "axios";
import dotenv from "dotenv";
import ApiSchema from "../validationSchemas/apiSchema";

dotenv.config();

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

const validateApiCall = async (config) => {
  try {
    await ApiSchema.validate(config);
  } catch (error) {
    throw new Error(`Validation error: ${error.message}`);
  }
};

export const loginApi = async (credentials) => {
  const config = {
    method: "POST",
    endpoint: "/users/login",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: credentials,
  };

  await validateApiCall(config);

  const response = await api.post(config.endpoint, config.body);
  setAuthToken(response.data.token);
  return response.data;
};

export const logoutApi = async (token) => {
  const config = {
    method: "POST",
    endpoint: "/users/logout",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  await validateApiCall(config);

  setAuthToken(token);
  const response = await api.post(config.endpoint);
  setAuthToken(null);
  return response.data;
};

export const refreshUserApi = async (token) => {
  const config = {
    method: "GET",
    endpoint: "/users/current",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  await validateApiCall(config);

  setAuthToken(token);
  const response = await api.get(config.endpoint);
  return response.data;
};
