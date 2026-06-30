export const selectAuth =
  (state) => state.auth;

/*
|--------------------------------------------------------------------------
| User
|--------------------------------------------------------------------------
*/

export const selectUser =
  (state) => state.auth.user;

export const selectAccessToken =
  (state) =>
    state.auth.accessToken;

export const selectIsAuthenticated =
  (state) =>
    !!state.auth.user;

/*
|--------------------------------------------------------------------------
| Loading
|--------------------------------------------------------------------------
*/

export const selectLoginLoading =
  (state) =>
    state.auth.loading.login;

export const selectRegisterLoading =
  (state) =>
    state.auth.loading.register;

export const selectMeLoading =
  (state) =>
    state.auth.loading.getMe;

export const selectLogoutLoading =
  (state) =>
    state.auth.loading.logout;

export const selectRefreshTokenLoading =
  (state) =>
    state.auth.loading
      .refreshToken;

export const selectForgotPasswordLoading =
  (state) =>
    state.auth.loading
      .forgotPassword;

export const selectResetPasswordLoading =
  (state) =>
    state.auth.loading
      .resetPassword;

/*
|--------------------------------------------------------------------------
| Error
|--------------------------------------------------------------------------
*/

export const selectLoginError =
  (state) =>
    state.auth.error.login;

export const selectRegisterError =
  (state) =>
    state.auth.error.register;

export const selectMeError =
  (state) =>
    state.auth.error.getMe;

export const selectLogoutError =
  (state) =>
    state.auth.error.logout;

export const selectRefreshTokenError =
  (state) =>
    state.auth.error
      .refreshToken;

export const selectForgotPasswordError =
  (state) =>
    state.auth.error
      .forgotPassword;

export const selectResetPasswordError =
  (state) =>
    state.auth.error
      .resetPassword;