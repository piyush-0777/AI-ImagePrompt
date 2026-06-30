export const selectLikesCount = (state, promptId) =>
  state.like.likesCount[promptId] || 0;

export const selectLikeLoading = (state) => state.like.loading;
export const selectLikeError = (state) => state.like.error;