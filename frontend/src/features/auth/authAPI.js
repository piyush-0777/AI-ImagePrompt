import api from "../../services/axios";

/*
|--------------------------------------------------------------------------
| Auth APIs
|--------------------------------------------------------------------------
*/

export const registerAPI =
  (data) =>
    api.post(
      "/auth/register",
      data
    );

export const loginAPI =
  (data) =>
    api.post(
      "/auth/login",
      data
    );

export const getMeAPI =
  () =>
    api.get("/auth/me");

export const refreshTokenAPI =
  (data) =>
    api.post(
      "/auth/refresh-token",
      data
    );

export const logoutAPI =
  (data) =>
    api.post(
      "/auth/logout",
      data
    );

export const forgotPasswordAPI =
  (data) =>
    api.post(
      "/auth/forgot-password",
      data
    );

export const resetPasswordAPI =
  (data) =>
    api.post(
      "/auth/reset-password",
      data
    );