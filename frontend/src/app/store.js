import { configureStore } from "@reduxjs/toolkit";

import themeReducer from "../features/theme/themeSlice";

import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import promptReducer from "../features/prompt/promptSlice";
import tagReducer from "../features/tag/tagSlice";
import likeReducer from "../features/like/likeSlice";
import saveReducer from "../features/save/saveSlice";
// import uploadReducer from "../features/upload/uploadSlice";
// import adminReducer from "../features/admin/adminSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    user: userReducer,
    prompt: promptReducer,
    tag: tagReducer,
    like: likeReducer,
    save: saveReducer,
    // upload: uploadReducer,
    // admin: adminReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

  devTools: import.meta.env.DEV,
});