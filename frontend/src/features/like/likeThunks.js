import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  likePromptAPI,
  unlikePromptAPI,
  getLikesCountAPI,
} from "./likeAPI";


import {getLikeorSaveSatateByuser} from '../prompt/promptAPI' 

// LIKE
export const likePrompt = createAsyncThunk(
  "like/likePrompt",
  async (promptId, { rejectWithValue }) => {
    try {
      const res = await likePromptAPI(promptId);
     
      return { promptId, message: res.data.message };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Like failed");
    }
  }
);

// UNLIKE
export const unlikePrompt = createAsyncThunk(
  "like/unlikePrompt",
  async (promptId, { rejectWithValue }) => {
    try {
      const res = await unlikePromptAPI(promptId);
      return { promptId, message: res.data.message };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Unlike failed");
    }
  }
);

// GET LIKE COUNT
export const getLikesCount = createAsyncThunk(
  "like/getLikesCount",
  async (promptId, { rejectWithValue }) => {
    try {
      const res = await getLikesCountAPI(promptId);
      return { promptId, count: res.data.count };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Fetch failed");
    }
  }
);

export const getLikeorSavePrompt = createAsyncThunk('prompts/likeSave' , async (id , ThankAPI) => {
  try{
        
        const res = await getLikeorSaveSatateByuser(id);
      
        return res.data;
    }catch (error) {

        const massage = getErrorMessage(error);
        toast.error(massage);
        return thunkAPI.rejectWithValue(message);
    }
})