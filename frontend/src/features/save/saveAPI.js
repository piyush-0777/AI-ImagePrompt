// src/features/save/saveAPI.js
import axiosInstance from "../../services/axios";

// Save prompt
export const savePromptAPI = (promptId) =>
  axiosInstance.post(`/prompts/${promptId}/save`);

// Unsave prompt
export const removeSaveAPI = (promptId) =>
  axiosInstance.delete(`/prompts/${promptId}/save`);

// Get save count
export const getSaveCountAPI = (promptId) =>
  axiosInstance.get(`/prompts/${promptId}/saves`);

// Get my saved prompts
export const getMySavedPromptsAPI = () =>
  axiosInstance.get(`/me/saved-prompts`);