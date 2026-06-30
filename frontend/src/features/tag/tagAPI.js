import api from "../../services/axios";

export const getTagsAPI = () =>
  api.get("/tags");

export const createTagAPI = (data) =>
  api.post("/tags", data);

export const updateTagAPI = (tagId, data) =>
  api.put(`/tags/${tagId}`, data);

export const deleteTagAPI = (tagId) =>
  api.delete(`/tags/${tagId}`);

export const getTagPromptsAPI = (
  tagId,
  params
) =>
  api.get(`/tags/${tagId}/prompts`, {
    params,
  });