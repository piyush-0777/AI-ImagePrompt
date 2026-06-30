import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import {
  registerAPI,
  loginAPI,
  getMeAPI,
  refreshTokenAPI,
  logoutAPI,
  forgotPasswordAPI,
  resetPasswordAPI,
} from "./authAPI";

import {
  setTokens,
  removeTokens,
} from "../../utils/token";

/*
|--------------------------------------------------------------------------
| Register
|--------------------------------------------------------------------------
*/

export const registerUser =
  createAsyncThunk(
    "auth/register",

    async (data, thunkAPI) => {
      try {
        const response =
          await registerAPI(data);

        toast.success(
          response.data.message ||
            "Account Created"
        );
        // console.log(response.data);
        // console.log(response.data.data.accessToken)
        // console.log(response.data.data.refreshToken)
        setTokens(response.data.data.refreshToken , response.data.data.accessToken);
        return {
          user:response.data.data.user ,accessToken:response.data.data.accessToken}
      } catch (error) {
        const message =
          error.response?.data
            ?.message ||
          "Something went wrong";

        toast.error(message);

        return thunkAPI.rejectWithValue(
          message
        );
      }
    }
  );

/*
|--------------------------------------------------------------------------
| Login
|--------------------------------------------------------------------------
*/

export const loginUser =
  createAsyncThunk(
    "auth/login",

    async (data, thunkAPI) => {
      try {
        const response =
          await loginAPI(data);

        const {
          user,
          accessToken,
          refreshToken,
        } = response.data.data;

        setTokens(
          accessToken,
          refreshToken
        );

        toast.success(
          response.data.message ||
            "Login Successful"
        );

        return {
          user,
          accessToken,
        };
      } catch (error) {
        const message =
          error.response?.data
            ?.message ||
          "Something went wrong";

        toast.error(message);

        return thunkAPI.rejectWithValue(
          message
        );
      }
    }
  );

/*
|--------------------------------------------------------------------------
| Get Current User
|--------------------------------------------------------------------------
*/

export const getCurrentUser =
  createAsyncThunk(
    "auth/me",

    async (_, thunkAPI) => {
      try {
        const response =
          await getMeAPI();
        console.log( 'hello i am' ,response.data.data)
        return response.data.data;
      } catch (error) {
        const message =
          error.response?.data
            ?.message ||
          "Failed to fetch user";

        return thunkAPI.rejectWithValue(
          message
        );
      }
    }
  );

/*
|--------------------------------------------------------------------------
| Refresh Access Token
|--------------------------------------------------------------------------
*/

export const refreshAccessToken =
  createAsyncThunk(
    "auth/refresh-token",

    async (
      refreshToken,
      thunkAPI
    ) => {
      try {
        const response =
          await refreshTokenAPI({
            refreshToken,
          });

        const accessToken =
          response.data.data
            .accessToken;

        return accessToken;
      } catch (error) {
        const message =
          error.response?.data
            ?.message ||
          "Session expired";

        removeTokens();

        return thunkAPI.rejectWithValue(
          message
        );
      }
    }
  );

/*
|--------------------------------------------------------------------------
| Logout
|--------------------------------------------------------------------------
*/

export const logoutUser =
  createAsyncThunk(
    "auth/logout",

    async (
      refreshToken,
      thunkAPI
    ) => {
      try {
        await logoutAPI({
          refreshToken
        });

        removeTokens();

        toast.success(
          "Logged Out Successfully"
        );

        return null;
      } catch (error) {
        const message =
          error.response?.data
            ?.message ||
          "Logout failed";

        return thunkAPI.rejectWithValue(
          message
        );
      }
    }
  );

/*
|--------------------------------------------------------------------------
| Forgot Password
|--------------------------------------------------------------------------
*/

export const forgotPassword =
  createAsyncThunk(
    "auth/forgot-password",

    async (email, thunkAPI) => {
      try {
        const response =
          await forgotPasswordAPI({
            email,
          });

        toast.success(
          response.data.message
        );

        return response.data;
      } catch (error) {
        const message =
          error.response?.data
            ?.message ||
          "Something went wrong";

        toast.error(message);

        return thunkAPI.rejectWithValue(
          message
        );
      }
    }
  );

/*
|--------------------------------------------------------------------------
| Reset Password
|--------------------------------------------------------------------------
*/

export const resetPassword =
  createAsyncThunk(
    "auth/reset-password",

    async (
      payload,
      thunkAPI
    ) => {
      try {
        const response =
          await resetPasswordAPI(
            payload
          );

        toast.success(
          response.data.message ||
            "Password Reset Successful"
        );

        return response.data;
      } catch (error) {
        const message =
          error.response?.data
            ?.message ||
          "Something went wrong";

        toast.error(message);

        return thunkAPI.rejectWithValue(
          message
        );
      }
    }
  );