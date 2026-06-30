import {
  createSlice,
} from "@reduxjs/toolkit";

import {
  registerUser,
  loginUser,
  getCurrentUser,
  refreshAccessToken,
  logoutUser,
  forgotPassword,
  resetPassword,
} from "./authThunks";
import { User } from "lucide-react";

import {uploadProfileImage , updateUserProfile} from "../user/userThunks"

const initialState = {
  user: null,
  accessToken: null,

  loading: {
    login: false,
    register: false,
    getMe: false,
    logout: false,
    refreshToken: false,
    forgotPassword: false,
    resetPassword: false,
  },

  error: {
    login: null,
    register: null,
    getMe: null,
    logout: null,
    refreshToken: null,
    forgotPassword: null,
    resetPassword: null,
  },
};

const authSlice =
  createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (
      builder
    ) => {
      builder

        .addCase(updateUserProfile.fulfilled, (state, action) => {

                state.profile = action.payload;
              })

      .addCase(uploadProfileImage.fulfilled, (state, action) => {
              state.loading.update = false;
      
              if (state.profile) {
                state.user =
                  action.payload;
              }
            })

        /* Register */

        .addCase( registerUser.pending,
          (state) => {
            state.loading.register = true;
            state.error.register = null;
          }
        )

        .addCase( registerUser.fulfilled,
          (state , action) => {
            state.loading.register = false;
              state.user=action.payload.user;
              state.accessToken=action.payload.accessToken
          }
        )

        .addCase( registerUser.rejected,
          (state, action) => {
            state.loading.register = false;
            state.error.register = action.payload;
          }
        )

        /* Login */

        .addCase( loginUser.pending,
          (state) => {
            state.loading.login = true;
            state.error.login = null;
          }
        )

        .addCase( loginUser.fulfilled,
          (state, action) => {
            state.loading.login = false;
            state.user = action.payload.user;
            state.accessToken =action.payload.accessToken;
          }
        )

        .addCase( loginUser.rejected,
          (state, action) => {
            state.loading.login = false;
            state.error.login = action.payload;
          }
        )

        /* Get Me */

        .addCase( getCurrentUser.pending,
          (state) => {
            state.loading.getMe = true;
          }
        )

        .addCase(
          getCurrentUser.fulfilled,
          (state, action) => {
            state.loading.getMe =false;

            state.user = action.payload;
          }
        )

        .addCase( getCurrentUser.rejected,
          (state, action) => {
            state.loading.getMe = false;
            state.error.getMe = action.payload;
          }
        )

        /* Refresh */

        .addCase( refreshAccessToken.pending,
          (state) => {
            state.loading.refreshToken = true;
          }
        )

        .addCase( refreshAccessToken.fulfilled,
          (state, action) => {
            state.loading.refreshToken = false;

            state.accessToken = action.payload;
          }
        )

        .addCase( refreshAccessToken.rejected,
          (state, action) => {
            state.loading.refreshToken = false;
            state.error.refreshToken =action.payload;
          }
        )

        /* Logout */

        .addCase(logoutUser.fulfilled,
          (state) => {
            state.user = null;
            state.accessToken =null;
          }
        )

        /* Forgot Password */

        .addCase( forgotPassword.pending,
          (state) => {
            state.loading.forgotPassword = true;
          }
        )

        .addCase(  forgotPassword.fulfilled,
          (state) => {
            state.loading.forgotPassword =false;
          }
        )

        .addCase(forgotPassword.rejected,
          (state, action) => {
            state.loading.forgotPassword = false;
            state.error.forgotPassword =action.payload;
          }
        )

        /* Reset Password */

        .addCase(resetPassword.pending,
          (state) => {
            state.loadingresetPassword = true;
          }
        )

        .addCase( resetPassword.fulfilled,
          (state) => {
            state.loading.resetPassword =false;
          }
        )

        .addCase(  resetPassword.rejected,
          (state, action) => {
            state.loading.resetPassword = false;
            state.error.resetPassword = action.payload;
          }
        );
    },
  });

export default authSlice.reducer;