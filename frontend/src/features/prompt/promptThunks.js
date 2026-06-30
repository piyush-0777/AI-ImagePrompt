import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  createPromptAPI,
  getPromptsAPI,
  getPromptByIdAPI,
  updatePromptAPI,
  deletePromptAPI,
  searchPromptsAPI,
  getTrendingPromptsAPI,
  getLatestPromptsAPI,
  getPromptDetailAPI ,
  getLikeorSaveSatateByuser
} from "./promptAPI";

const getErrorMessage = (error) =>
  error?.response?.data?.message ||
  error?.message ||
  "Something went wrong";

export const createPrompt = createAsyncThunk( "prompt/create", async (data, thunkAPI) => {
    try {
      const res = await createPromptAPI(data);

      toast.success(res.data.message);

      return res.data.data;
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getPrompts = createAsyncThunk("prompt/getPrompts", async (params, thunkAPI) => {
    try {
      const res = await getPromptsAPI(params);
      return {
        prompts: res.data.prompts,
        // pagination: res.data.data.pagination || 1,
      };
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getPromptById = createAsyncThunk("prompt/getById",async (promptId, thunkAPI) => {
    try {
      const res = await getPromptByIdAPI(promptId);

      return res.data.data;
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updatePrompt = createAsyncThunk("prompt/update",async ({ promptId, data }, thunkAPI) => {
    try {
      const res = await updatePromptAPI(
        promptId,
        data
      );

      toast.success(res.data.message);

      return res.data.data;
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deletePrompt = createAsyncThunk( "prompt/delete",async (promptId, thunkAPI) => {
    try {
      await deletePromptAPI(promptId);

      toast.success("Prompt deleted");
      
      return promptId;
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const searchPrompts = createAsyncThunk("prompt/search", async (params, thunkAPI) => {
    try {
      const res = await searchPromptsAPI(params);

      return res.data.data;
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getTrendingPrompts = createAsyncThunk("prompt/trending",async (_, thunkAPI) => {
    try {
      const res = await getTrendingPromptsAPI();

      return res.data.data;
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getLatestPrompts = createAsyncThunk("prompt/latest", async (params, thunkAPI) => {
    try {
      const res = await getLatestPromptsAPI(params);
      
      return res.data.data;
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getPromptDetail = createAsyncThunk('prompts/getPromptDetail', async (id , thankAPI)=>{

    try{
        
        const res = await getPromptDetailAPI(id);
        console.log(res.data);
        return res.data;
    }catch (error) {

        const massage = getErrorMessage(error);
        toast.error(massage);
        return thunkAPI.rejectWithValue(message);
    }
})

