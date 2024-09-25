import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

// Reusable function to create thunks
const createApiThunk = (type, apiCall) => {
  return createAsyncThunk(
    type,
    async (payload, { getState, rejectWithValue }) => {
      try {
        const response = await apiCall(payload, getState);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  );
};

// API call functions
const registerApiCall = async (userData) => {
  const response = await api.post("/users/signup", userData);
  const token = response.data.token;
  localStorage.setItem("token", token);
  return response;
};

const loginApiCall = async (credentials) => {
  const response = await api.post("/users/login", credentials);
  const token = response.data.token;
  localStorage.setItem("token", token);
  return response;
};

const refreshUserApiCall = async (_, getState) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  const response = await api.get("/users/current", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const logoutApiCall = async (_, getState) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  const response = await api.post("/users/logout", null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  localStorage.removeItem("token");
  return response;
};

// Async thunks
export const register = createApiThunk("auth/register", registerApiCall);
export const login = createApiThunk("auth/login", loginApiCall);
export const refreshUser = createApiThunk(
  "auth/refreshUser",
  refreshUserApiCall
);
export const logout = createApiThunk("auth/logout", logoutApiCall);
