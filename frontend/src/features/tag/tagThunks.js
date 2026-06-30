import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  getTagsAPI,
  createTagAPI,
  updateTagAPI,
  deleteTagAPI,
  getTagPromptsAPI,
} from "./tagAPI";

const getErrorMessage = (error) =>
  error?.response?.data?.message ||
  error?.message ||
  "Something went wrong";

export const getTags = createAsyncThunk(
  "tag/getTags",
  async (_, thunkAPI) => {
    try {
      const res = await getTagsAPI();
      return res.data.data;
    } catch (error) {
      const message = getErrorMessage(error);

      toast.error(message);

      return thunkAPI.rejectWithValue(
        message
      );
    }
  }
);

export const createTag = createAsyncThunk(
  "tag/createTag",
  async (data, thunkAPI) => {
    try {
      const res = await createTagAPI(data);

      toast.success("Tag created");

      return res.data.data;
    } catch (error) {
      const message = getErrorMessage(error);

      toast.error(message);

      return thunkAPI.rejectWithValue(
        message
      );
    }
  }
);

export const updateTag = createAsyncThunk(
  "tag/updateTag",
  async (
    { tagId, data },
    thunkAPI
  ) => {
    try {
      const res = await updateTagAPI(
        tagId,
        data
      );

      toast.success("Tag updated");

      return res.data.data;
    } catch (error) {
      const message = getErrorMessage(error);

      toast.error(message);

      return thunkAPI.rejectWithValue(
        message
      );
    }
  }
);

export const deleteTag = createAsyncThunk(
  "tag/deleteTag",
  async (tagId, thunkAPI) => {
    try {
      await deleteTagAPI(tagId);

      toast.success("Tag deleted");

      return tagId;
    } catch (error) {
      const message = getErrorMessage(error);

      toast.error(message);

      return thunkAPI.rejectWithValue(
        message
      );
    }
  }
);

export const getTagPrompts =
  createAsyncThunk(
    "tag/getTagPrompts",
    async (
      { tagId, page = 1, limit = 20 },
      thunkAPI
    ) => {
      try {
        const res =
          await getTagPromptsAPI(
            tagId,
            {
              page,
              limit,
            }
          );

        return res.data.data;
      } catch (error) {
        const message =
          getErrorMessage(error);

        toast.error(message);

        return thunkAPI.rejectWithValue(
          message
        );
      }
    }
  );