import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  registerApi,
  loginApi,
  getMeApi,
  logoutApi,
} from "./authApi";

/*
|--------------------------------------------------------------------------
| Register
|--------------------------------------------------------------------------
*/

export const registerUser = createAsyncThunk(
  "auth/registerUser",

  async (userData, { rejectWithValue }) => {
    try {
      const data = await registerApi(userData);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Registration failed"
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| Login
|--------------------------------------------------------------------------
*/

export const loginUser = createAsyncThunk(
  "auth/loginUser",

  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginApi(credentials);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Login failed"
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| Get Current User
|--------------------------------------------------------------------------
*/

export const getMe = createAsyncThunk(
  "auth/getMe",

  async (_, { rejectWithValue }) => {
    try {
      const data = await getMeApi();

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Unable to get current user"
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| Logout
|--------------------------------------------------------------------------
*/

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",

  async (_, { rejectWithValue }) => {
    try {
      const data = await logoutApi();

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Logout failed"
      );
    }
  }
);