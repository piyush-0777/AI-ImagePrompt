import { createSlice } from "@reduxjs/toolkit";
import { likePrompt, unlikePrompt, getLikesCount, getLikeorSavePrompt } from "./likeThunks";
import {getPromptDetail} from '../prompt/promptThunks'



const initialState = {
  likesCount: null ,
  isLike:false,
  likedPosts:null,
  
  success: {
    like: false,
    unlike: false,
    count: false,
    isLike:false,
  } , 

  loading: {
    like: false,
    unlike: false,
    count: false,
    isLike:false,
  },

  error: {
    like: null,
    unlike: null,
    count: null,
    isLike:false,
  },
};

const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    resetLoadingState: (state)=> {
      state.loading = {
    like: false,
    unlike: false,
    count: false,
      };

  state.error = {
    like: null,
    unlike: null,
    count: null,
  }
  state.success = {
    like: false,
    unlike: false,
    count: false,

  }

    }

  },

  extraReducers: (builder) => {
    // LIKE

    builder
      .addCase(
              getPromptDetail.fulfilled,
              (state, action) => {

                state.likesCount =
                  action.payload.result.prompt.likes_count;
              }
            )

    builder
      .addCase(likePrompt.pending, (state) => {
        state.loading.like = true;
        state.error.like = null;
      })
      .addCase(likePrompt.fulfilled, (state, action) => {
        state.loading.like = false;
        state.likesCount = state.likesCount +1;
        state.isLike = true;
      })
      .addCase(likePrompt.rejected, (state, action) => {
        state.loading.like = false;
        state.error.like = action.payload;
      });

    // UNLIKE
    builder
      .addCase(unlikePrompt.pending, (state) => {
        state.loading.unlike = true;
        state.error.unlike = null;
      })
      .addCase(unlikePrompt.fulfilled, (state, action) => {
        state.loading.unlike = false;
        state.likesCount = state.likesCount -1;
         state.isLike = false;
      })
      .addCase(unlikePrompt.rejected, (state, action) => {
        state.loading.unlike = false;
        state.error.unlike = action.payload;
      });

    // GET COUNT
    builder
      .addCase(getLikesCount.pending, (state) => {
        state.loading.count = true;
        state.error.count = null;
      })
      .addCase(getLikesCount.fulfilled, (state, action) => {
        state.loading.count = false;
        const { promptId, count } = action.payload;
        state.likesCount[promptId] = count;
      })
      .addCase(getLikesCount.rejected, (state, action) => {
        state.loading.count = false;
        state.error.count = action.payload;
      });


      builder
      .addCase(getLikeorSavePrompt.pending, (state) => {
        state.loading.isLike = true;
        state.error.isLike = null;
      })
      .addCase(getLikeorSavePrompt.fulfilled, (state, action) => {
        state.loading.isLike = false;
        state.isLike = action.payload.isLike;
      })
      .addCase(getLikeorSavePrompt.rejected, (state, action) => {
        state.loading.isLike = false;
        state.error.isLike = action.payload;
      });
  },
});

export const { resetLoadingState } = likeSlice.actions;

export default likeSlice.reducer;