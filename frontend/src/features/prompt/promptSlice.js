import { createSlice } from "@reduxjs/toolkit";

import {
  createPrompt,
  getPrompts,
  getPromptById,
  updatePrompt,
  deletePrompt,
  searchPrompts,
  getTrendingPrompts,
  getLatestPrompts,
  getPromptDetail,
} from "./promptThunks";

const initialState = {
  prompts: [],
  currentPrompt: null,
  hasMore: true,

  trendingPrompts: [],
  latestPrompts: [],
  searchResults: [],

  pagination: {},

  loading: {
    list: false,
    details: false,
    create: false,
    update: false,
    delete: false,
    search: false,
    trending: false,
    latest: false,
    currentPrompt: false,
  },
  complate: {
    list: null,
    details: null,
    create: null,
    update: null,
    delete: null,
    search: null,
    trending: null,
    latest: null,
    currentPrompt:null,
  } ,

  error: {
    list: null,
    details: null,
    create: null,
    update: null,
    delete: null,
    search: null,
    trending: null,
    latest: null,
    currentPrompt:null,
  },
};

const promptSlice = createSlice({
  name: "prompt",
  initialState,

  reducers: {
    clearCurrentPrompt(state) {
      state.currentPrompt = null;
    },

    clearPromptErrorsAndLoading(state) {
      state.error = {
        list: null,
        details: null,
        create: null,
        update: null,
        delete: null,
        search: null,
        trending: null,
        latest: null,
      };
    state.loading ={
      list: false,
      details: false,
      create: false,
      update: false,
      delete: false,
      search: false,
      trending: false,
      latest: false,
      currentPrompt: false,
  };
  state.complate= {
    list: null,
    details: null,
    create: null,
    update: null,
    delete: null,
    search: null,
    trending: null,
    latest: null,
    currentPrompt:null,
  }
    },
  },

  extraReducers: (builder) => {
    builder

      // CREATE
      .addCase(createPrompt.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createPrompt.fulfilled, (state, action) => {
        state.loading.create = false;
        state.complate.create = true;
        state.prompts.unshift(action.payload);
      })
      .addCase(createPrompt.rejected, (state, action) => {
        state.loading.create = false;
        state.error.create = action.payload;
      })

      // GET ALL
      .addCase(getPrompts.pending, (state) => {
        state.loading.list = true;
      })


    .addCase(getPrompts.fulfilled, (state, action) => {
  state.loading.list = false;

  const { prompts, page, hasMore } = action.payload;

  if (page === 1) {
    state.prompts = prompts;
  } else {
    state.prompts.push(...prompts);
  }

  state.hasMore = hasMore;
})
      .addCase(getPrompts.rejected, (state, action) => {
        state.loading.list = false;
        state.error.list = action.payload;
      })

      // DETAILS
      .addCase(getPromptById.pending, (state) => {
        state.loading.details = true;
      })
      .addCase(getPromptById.fulfilled, (state, action) => {
        state.loading.details = false;
        state.currentPrompt = action.payload;
      })
      .addCase(getPromptById.rejected, (state, action) => {
        state.loading.details = false;
        state.error.details = action.payload;
      })

      // UPDATE
      .addCase(updatePrompt.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updatePrompt.fulfilled, (state, action) => {
        state.loading.update = false;
        state.complate.update = true;

        state.currentPrompt = action.payload;

        state.prompts = state.prompts.map(
          (prompt) =>
            prompt.id === action.payload.id
              ? action.payload
              : prompt
        );
      })
      .addCase(updatePrompt.rejected, (state, action) => {
        state.loading.update = false;
        state.error.update = action.payload;
      })

      // DELETE
      .addCase(deletePrompt.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deletePrompt.fulfilled, (state, action) => {
        state.loading.delete = false;

        state.prompts = state.prompts.filter(
          (prompt) => prompt.id !== action.payload
        );

        if (
          state.currentPrompt?.id ===
          action.payload
        ) {
          state.currentPrompt = null;
        }
      })
      .addCase(deletePrompt.rejected, (state, action) => {
        state.loading.delete = false;
        state.error.delete = action.payload;
      })

      // SEARCH
      .addCase(searchPrompts.pending, (state) => {
        state.loading.search = true;
      })
      .addCase(searchPrompts.fulfilled, (state, action) => {
        state.loading.search = false;
        state.searchResults = action.payload;
      })
      .addCase(searchPrompts.rejected, (state, action) => {
        state.loading.search = false;
        state.error.search = action.payload;
      })

      // TRENDING
      .addCase(getTrendingPrompts.pending, (state) => {
        state.loading.trending = true;
      })
      .addCase(
        getTrendingPrompts.fulfilled,
        (state, action) => {
          state.loading.trending = false;
          state.trendingPrompts =
            action.payload;
        }
      )
      .addCase(
        getTrendingPrompts.rejected,
        (state, action) => {
          state.loading.trending = false;
          state.error.trending =
            action.payload;
        }
      )

      // LATEST
      .addCase(getLatestPrompts.pending, (state) => {
        state.loading.latest = true;
      })
      .addCase(
        getLatestPrompts.fulfilled,
        (state, action) => {
          state.loading.latest = false;
          state.latestPrompts =
            action.payload;
        }
      )
      .addCase(
        getLatestPrompts.rejected,
        (state, action) => {
          state.loading.latest = false;
          state.error.latest =
            action.payload;
        }
      )
       .addCase(getPromptDetail.pending, (state) => {
        state.loading.currentPrompt = true;
      })
      .addCase(
        getPromptDetail.fulfilled,
        (state, action) => {
          state.loading.currentPrompt = false;
          state.currentPrompt =
            action.payload.result;
        }
      )
      .addCase(
        getPromptDetail.rejected,
        (state, action) => {
          state.loading.currentPrompt = false;
          state.error.currentPrompt =
            action.payload;
        }
      )
      ;
  },
});

export const {
  clearCurrentPrompt,
  clearPromptErrorsAndLoading,
} = promptSlice.actions;

export default promptSlice.reducer;