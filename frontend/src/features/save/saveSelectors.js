// src/features/save/saveSelectors.js

export const selectSavedPrompts = (state) =>
  state.save.savedPrompts;

export const selectSaveCount = (promptId) => (state) =>
  state.save.saveCount[promptId] || 0;

export const selectSaveLoading = (state) => state.save.loading;

export const selectSaveError = (state) => state.save.error;