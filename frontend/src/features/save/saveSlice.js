// src/features/save/saveSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  savePrompt,
  removeSave,
  fetchSaveCount,
  fetchMySavedPrompts,
} from "./saveThunks";
import {getLikeorSavePrompt} from '../like/likeThunks'
import {getPromptDetail} from '../prompt/promptThunks'
const initialState = {
  savedPrompts: [],
  saveCount: null,
  isSave:false , 

  loading: {
    save: false,
    remove: false,
    list: false,
    count: false,
    isSave: false,
  },

  error: {},
};

const saveSlice = createSlice({
  name: "save",
  initialState,
  reducers: {
    clearSaveError: (state) => {
      state.error = {};
    },
  },
  extraReducers: (builder) => {

      builder
            .addCase( getPromptDetail.fulfilled,(state, action) => {
                      state.saveCount = action.payload.result.prompt.saves_count;
                    }
                  )

    // SAVE PROMPT


    builder
      .addCase(savePrompt.pending, (state) => {
        state.loading.save = true;
        state.error.save = null;
      })
      .addCase(savePrompt.fulfilled, (state, action) => {
        state.loading.save = false;
        state.saveCount = state.saveCount +1
        state.isSave = true;
      })
      .addCase(savePrompt.rejected, (state, action) => {
        state.loading.save = false;
        state.error.save = action.payload;
      });

    // REMOVE SAVE
    builder
      .addCase(removeSave.pending, (state) => {
        state.loading.remove = true;
        state.error.remove = null;
      })
      .addCase(removeSave.fulfilled, (state, action) => {
        state.loading.remove = false;
        state.saveCount = state.saveCount -1;
        state.isSave = false;
      })
      .addCase(removeSave.rejected, (state, action) => {
        state.loading.remove = false;
        state.error.remove = action.payload;
      });

    // SAVE COUNT
    builder
      .addCase(fetchSaveCount.pending, (state) => {
        state.loading.count = true;
      })
      .addCase(fetchSaveCount.fulfilled, (state, action) => {
        state.loading.count = false;
        const { promptId, count } = action.payload;
        state.saveCount[promptId] = count;
      })
      .addCase(fetchSaveCount.rejected, (state, action) => {
        state.loading.count = false;
        state.error.count = action.payload;
      });

    // MY SAVED PROMPTS
    builder
      .addCase(fetchMySavedPrompts.pending, (state) => {
        state.loading.list = true;
      })
      .addCase(fetchMySavedPrompts.fulfilled, (state, action) => {
        state.loading.list = false;
        state.savedPrompts = action.payload;
      })
      .addCase(fetchMySavedPrompts.rejected, (state, action) => {
        state.loading.list = false;
        state.error.list = action.payload;
      });

      builder
            .addCase(getLikeorSavePrompt.pending, (state) => {
              state.loading.isSave = true;
              state.error.isSave = null;
            })
            .addCase(getLikeorSavePrompt.fulfilled, (state, action) => {
              state.loading.isSave = false;
              state.isSave = action.payload.isSave;
            })
            .addCase(getLikeorSavePrompt.rejected, (state, action) => {
              state.loading.isSave = false;
              state.error.isSave = action.payload;
            });
  },
});

export const { clearSaveError } = saveSlice.actions;
export default saveSlice.reducer;