import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  getUserProfileAPI,
  updateUserProfileAPI,
  uploadProfileImageAPI,
  getUserPromptsAPI,
  getSavedPromptsAPI,
  getLikedPromptsAPI,
} from "./userAPI";

const getErrorMessage = (error) =>
  error?.response?.data?.message ||
  error?.message ||
  "Something went wrong";

export const getUserProfile = createAsyncThunk(
  "user/getProfile",
  async (userId, thunkAPI) => {
    try {
      const res = await getUserProfileAPI(userId);
      return res.data.data;
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ userId, data }, thunkAPI) => {
    try {
      const res = await updateUserProfileAPI(userId, data);

      toast.success(res.data.message);
      console.log(res.data.data);
      return res.data.data;
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const uploadProfileImage = createAsyncThunk(
  "user/uploadProfileImage",
  async (formData, thunkAPI) => {
    try {
      const res = await uploadProfileImageAPI(formData);

      toast.success(res.data.message);
      
      return res.data.data;
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUserPrompts = createAsyncThunk(
  "user/getPrompts",
  async ({ userId, page = 1, limit = 20 }, thunkAPI) => {
    try {
      const res = await getUserPromptsAPI(userId, {
        page,
        limit,
      });
      return res.data.data;
      
    } catch (error) {
      console.log(error);
      const message = getErrorMessage(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSavedPrompts = createAsyncThunk(
  "user/getSavedPrompts",
  async (userId, thunkAPI) => {
    try {
      const res = await getSavedPromptsAPI(userId);
      return res.data.data;
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getLikedPrompts = createAsyncThunk(
  "user/getLikedPrompts",
  async (userId, thunkAPI) => {
    try {
      const res = await getLikedPromptsAPI(userId);
      return res.data.data;
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);