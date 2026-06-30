export const selectPrompts = (state) =>
  state.prompt.prompts;

export const selectCurrentPrompt = (state) =>
  state.prompt.currentPrompt;

export const selectTrendingPrompts = (state) =>
  state.prompt.trendingPrompts;

export const selectLatestPrompts = (state) =>
  state.prompt.latestPrompts;

export const selectSearchResults = (state) =>
  state.prompt.searchResults;

export const selectPromptPagination = (state) =>
  state.prompt.pagination;

export const selectPromptLoading = (state) =>
  state.prompt.loading;

export const selectPromptErrors = (state) =>
  state.prompt.error;