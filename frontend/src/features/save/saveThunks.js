// src/features/save/saveThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  savePromptAPI,
  removeSaveAPI,
  getSaveCountAPI,
  getMySavedPromptsAPI,
} from "./saveAPI";

// SAVE prompt
export const savePrompt = createAsyncThunk(
  "save/savePrompt",
  async (promptId, { rejectWithValue }) => {
    try {
      const res = await savePromptAPI(promptId);
      return { promptId, message: res.data.message };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Save failed");
    }
  }
);

// REMOVE save
export const removeSave = createAsyncThunk(
  "save/removeSave",
  async (promptId, { rejectWithValue }) => {
    try {
      const res = await removeSaveAPI(promptId);
      return { promptId, message: res.data.message };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Remove failed");
    }
  }
);

// GET SAVE COUNT
export const fetchSaveCount = createAsyncThunk(
  "save/fetchSaveCount",
  async (promptId, { rejectWithValue }) => {
    try {
      const res = await getSaveCountAPI(promptId);
      return { promptId, count: res.data.count };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Fetch failed");
    }
  }
);

// GET MY SAVED PROMPTS
export const fetchMySavedPrompts = createAsyncThunk(
  "save/fetchMySavedPrompts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getMySavedPromptsAPI();
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Fetch failed");
    }
  }
);