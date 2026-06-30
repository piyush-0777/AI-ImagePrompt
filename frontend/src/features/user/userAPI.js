import api from "../../services/axios";

export const getUserProfileAPI = (userId) =>
  api.get(`/users/${userId}`);

export const updateUserProfileAPI = (userId, data) =>
  api.put(`/users/${userId}`, data);

export const uploadProfileImageAPI = (formData) =>
  api.post("/users/profile-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getUserPromptsAPI = (userId, params) =>
  api.get(`/users/${userId}/prompts`, { params });

export const getSavedPromptsAPI = (userId) =>
  api.get(`/users/${userId}/saved-prompts`);

export const getLikedPromptsAPI = (userId) =>
  api.get(`/users/${userId}/liked-prompts`);