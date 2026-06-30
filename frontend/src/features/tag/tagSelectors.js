export const selectTags = (state) =>
  state.tag.tags;

export const selectTagPrompts = (
  state
) => state.tag.tagPrompts;

export const selectTagLoading = (
  state
) => state.tag.loading;

export const selectTagErrors = (
  state
) => state.tag.error;