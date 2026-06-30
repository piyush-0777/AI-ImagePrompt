import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/feed/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import CreatePromptPage from "../pages/prompts/CreatePromptPage"
import UpdatePromptPage from "../pages/prompts/UpdatePromptPage";
import NotFoundPage from "../pages/NotFoundPage";
import PromptDetealPaje from "../pages/feed/PromptDetealPaje";
import ProfilePage from "../pages/feed/ProfilePage"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../features/auth/authThunks";



function AppRoutes() {
  const dispatch = useDispatch();
  useEffect(()=>{
    const token = localStorage.getItem("accessToken");

    
    if(token) {
     dispatch(getCurrentUser());
    }
  }, [])
  return (
    <>
    
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="promptDetal/:id"
        element={<PromptDetealPaje />}
      />

      <Route
        path="createPrompt"
        element={<CreatePromptPage />}
      />
      <Route
        path="updatePrompt/:id"
        element={<UpdatePromptPage />}
      />
      <Route
        path="profile/:id"
        element={<ProfilePage />}
      />
    

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
    </>
  );
}

export default AppRoutes;