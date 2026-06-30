import api from "./axios";

const login = async (data) => {
  const response =
    await api.post(
      "/auth/login",
      data
    );

  return response.data;
};

const register = async (data) => {
  const response =
    await api.post(
      "/auth/register",
      data
    );

  return response.data;
};

const getMe = async () => {
  const response =
    await api.get("/auth/me");

  return response.data;
};

const logout = async (
  refreshToken
) => {
  const response =
    await api.post(
      "/auth/logout",
      {
        refreshToken,
      }
    );

  return response.data;
};

export default {
  login,
  register,
  getMe,
  logout,
};