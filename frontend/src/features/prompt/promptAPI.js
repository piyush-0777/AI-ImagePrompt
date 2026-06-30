import api from "../../services/axios";

export const createPromptAPI = (data) =>
  api.post("/prompts", data);

export const getPromptsAPI = (params) =>
  api.get("/prompts", { params });

export const getPromptByIdAPI = (promptId) =>
  api.get(`/prompts/${promptId}`);

export const updatePromptAPI = (promptId, data) =>
  api.put(`/prompts/${promptId}`, data);

export const deletePromptAPI = (promptId) =>
  api.delete(`/prompts/${promptId}`);

export const searchPromptsAPI = (params) =>
  api.get("/prompts/search", { params });

export const getTrendingPromptsAPI = () =>
  api.get("/prompts/trending");

export const getLatestPromptsAPI = (params) =>
  api.get("/prompts/latest", { params });

export const getLikeorSaveSatateByuser = (id) =>
  api.get(`/prompts/PromptDetail/${id}/isLikeorSave`);

export const getPromptDetailAPI = (id) =>
  api.get(`/prompts/PromptDetail/${id}`);