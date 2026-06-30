import { createSlice } from "@reduxjs/toolkit";

import {
  getTags,
  createTag,
  updateTag,
  deleteTag,
  getTagPrompts,
} from "./tagThunks";

const initialState = {
  tags: [],
  tagPrompts: [],

  loading: {
    list: false,
    create: false,
    update: false,
    delete: false,
    prompts: false,
  },
  complate: {
    list: false,
    create: false,
    update: false,
    delete: false,
    prompts: false,
  },

  error: {
    list: null,
    create: null,
    update: null,
    delete: null,
    prompts: null,
  },
};

const tagSlice = createSlice({
  name: "tag",
  initialState,

  reducers: {
    clearTagPrompts(state) {
      state.tagPrompts = [];
    },

    clearTagErrors(state) {
      state.error = {
        list: null,
        create: null,
        update: null,
        delete: null,
        prompts: null,
      };
    },
  },

  extraReducers: (builder) => {
    builder

      // GET TAGS
      .addCase(getTags.pending, (state) => {
        state.loading.list = true;
        state.error.list = null;
      })
      .addCase(
        getTags.fulfilled,
        (state, action) => {
          state.loading.list = false;
          state.tags = action.payload;
        }
      )
      .addCase(
        getTags.rejected,
        (state, action) => {
          state.loading.list = false;
          state.error.list =
            action.payload;
        }
      )

      // CREATE TAG
      .addCase(
        createTag.pending,
        (state) => {
          state.loading.create = true;
          state.error.create = null;
        }
      )
      .addCase(
        createTag.fulfilled,
        (state, action) => {
          state.loading.create = false;
          state.tags.push(
            action.payload
          );
        }
      )
      .addCase(
        createTag.rejected,
        (state, action) => {
          state.loading.create = false;
          state.error.create =
            action.payload;
        }
      )

      // UPDATE TAG
      .addCase(
        updateTag.pending,
        (state) => {
          state.loading.update = true;
          state.error.update = null;
        }
      )
      .addCase(
        updateTag.fulfilled,
        (state, action) => {
          state.loading.update = false;

          state.tags =
            state.tags.map((tag) =>
              tag.id ===
              action.payload.id
                ? action.payload
                : tag
            );
        }
      )
      .addCase(
        updateTag.rejected,
        (state, action) => {
          state.loading.update = false;
          state.error.update =
            action.payload;
        }
      )

      // DELETE TAG
      .addCase(
        deleteTag.pending,
        (state) => {
          state.loading.delete = true;
          state.error.delete = null;
        }
      )
      .addCase(
        deleteTag.fulfilled,
        (state, action) => {
          state.loading.delete = false;

          state.tags =
            state.tags.filter(
              (tag) =>
                tag.id !==
                action.payload
            );
        }
      )
      .addCase(
        deleteTag.rejected,
        (state, action) => {
          state.loading.delete = false;
          state.error.delete =
            action.payload;
        }
      )

      // TAG PROMPTS
      .addCase(
        getTagPrompts.pending,
        (state) => {
          state.loading.prompts = true;
          state.error.prompts = null;
        }
      )
      .addCase(
        getTagPrompts.fulfilled,
        (state, action) => {
          state.loading.prompts = false;
          state.tagPrompts =
            action.payload;
        }
      )
      .addCase(
        getTagPrompts.rejected,
        (state, action) => {
          state.loading.prompts = false;
          state.error.prompts =
            action.payload;
        }
      );
  },
});

export const {
  clearTagPrompts,
  clearTagErrors,
} = tagSlice.actions;

export default tagSlice.reducer;