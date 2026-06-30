import axios from "../../services/axios";

// POST /api/prompts/:promptId/like
export const likePromptAPI = (promptId) => {
  return axios.post(`/prompts/${promptId}/like`);
};

// DELETE /api/prompts/:promptId/like
export const unlikePromptAPI = (promptId) => {
  return axios.delete(`/prompts/${promptId}/like`);
};

// GET /api/prompts/:promptId/likes
export const getLikesCountAPI = (promptId) => {
  return axios.get(`/prompts/${promptId}/likes`);
};