import api from "./axios";

const getProfile = async (
  userId
) => {
  const response =
    await api.get(
      `/users/${userId}`
    );

  return response.data;
};

const updateProfile = async (
  userId,
  data
) => {
  const response =
    await api.put(
      `/users/${userId}`,
      data
    );

  return response.data;
};

export default {
  getProfile,
  updateProfile,
};