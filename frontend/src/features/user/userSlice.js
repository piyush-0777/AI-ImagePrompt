import { createSlice } from "@reduxjs/toolkit";

import {
  getUserProfile,
  updateUserProfile,
  uploadProfileImage,
  getUserPrompts,
  getSavedPrompts,
  getLikedPrompts,
} from "./userThunks";

import { deletePrompt } from "../prompt/promptThunks";

const initialState = {
  profile: null,

  prompts: [],
  savedPrompts: [],
  likedPrompts: [],

  loading: {
    profile: false,
    update: false,
    updateImg: null,
    prompts: false,
    saved: false,
    liked: false,
  },

  complate: {
    profile: false,
    update: false,
    updateImg: null,
    prompts: false,
    saved: false,
    liked: false,
  },

  error: {
    profile: null,
    update: null,
    updateImg: null,
    prompts: null,
    saved: null,
    liked: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    clearUserErrors: (state) => {
      state.error = {
        profile: null,
        update: null,
        updateImg: null,
        prompts: null,
        saved: null,
        liked: null,
      };
    },
    clearUserState: (state) => {
      state.error = {
        profile: null,
        update: null,
        updateImg: null,
        prompts: null,
        saved: null,
        liked: null,
      };
      state.loading = {
        profile: null,
        update: null,
        updateImg: null,
        prompts: null,
        saved: null,
        liked: null,
      };
      state.complate = {
        profile: null,
        update: null,
        updateImg: null,
        prompts: null,
        saved: null,
        liked: null,
      };
    } ,

    clearUserData: () => initialState,
  },

  extraReducers: (builder) => {
    builder


     //Delet Prompt

      .addCase(deletePrompt.fulfilled, (state, action) => {
     
             state.prompts = state.prompts.filter(
               (prompt) => prompt.id !== action.payload
             );
      })

      // PROFILE
      .addCase(getUserProfile.pending, (state) => {
        state.loading.profile = true;
        state.error.profile = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading.profile = false;
        state.profile = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading.profile = false;
        state.error.profile = action.payload;
      })

      // UPDATE PROFILE
      .addCase(updateUserProfile.pending, (state) => {
        state.loading.update = true;
        state.error.update = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading.update = false;
        state.complate.update = true;
        state.profile = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading.update = false;
        state.error.update = action.payload;
      })

      // UPLOAD PROFILE IMAGE
      .addCase(uploadProfileImage.pending, (state) => {
        state.loading.updateImg = true;
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.loading.updateImg = false;

        if (state.profile) {
          state.profile =
            action.payload;
        }
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.loading.updateImg = false;
        state.error.updateImg = action.payload;
      })

      // USER PROMPTS
      .addCase(getUserPrompts.pending, (state) => {
        state.loading.prompts = true;
        state.error.prompts = null;
      })
      .addCase(getUserPrompts.fulfilled, (state, action) => {
        state.loading.prompts = false;
        
        state.prompts = action.payload;
      })
      .addCase(getUserPrompts.rejected, (state, action) => {
        state.loading.prompts = false;
        state.error.prompts = action.payload;
      })

      // SAVED PROMPTS
      .addCase(getSavedPrompts.pending, (state) => {
        state.loading.saved = true;
        state.error.saved = null;
      })
      .addCase(getSavedPrompts.fulfilled, (state, action) => {
        state.loading.saved = false;
        state.savedPrompts = action.payload;
      })
      .addCase(getSavedPrompts.rejected, (state, action) => {
        state.loading.saved = false;
        state.error.saved = action.payload;
      })

      // LIKED PROMPTS
      .addCase(getLikedPrompts.pending, (state) => {
        state.loading.liked = true;
        state.error.liked = null;
      })
      .addCase(getLikedPrompts.fulfilled, (state, action) => {
        state.loading.liked = false;
        state.likedPrompts = action.payload;
      })
      .addCase(getLikedPrompts.rejected, (state, action) => {
        state.loading.liked = false;
        state.error.liked = action.payload;
      });
  },
});

export const {
  clearUserErrors,
  clearUserData,
  clearUserState,
} = userSlice.actions;

export default userSlice.reducer;