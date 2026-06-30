import { useSelector } from "react-redux";

export const getAccessToken = () =>
   localStorage.getItem("refreshToken");
  

export const getRefreshToken = () =>
  localStorage.getItem("accessToken");

export const setTokens = (
  refreshToken , accessToken
) => {
  

  localStorage.setItem(
    "refreshToken",
    refreshToken
  );
  localStorage.setItem(
    "accessToken",
    accessToken
  );
};

export const removeTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};