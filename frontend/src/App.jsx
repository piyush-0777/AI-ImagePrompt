import { useSelector } from "react-redux";
import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";




function App() {
  const mode = useSelector(
    (state) => state.theme.mode
  );

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      mode === "dark"
    );
  }, [mode]);
  console.log(mode)

  return (
    <>
   <Toaster
  position="top-right"
  toastOptions={{
    duration: 3000,
    style: {
      minWidth: "360px",
      padding: "16px",
      borderRadius: "12px",
      background:
        mode === "dark" ? "#111827" : "#ffffff",
      color:
        mode === "dark" ? "#ffffff" : "#000000",
      border:
        mode === "dark"
          ? "1px solid #374151"
          : "1px solid #e5e7eb",
    },
  }}
/>
  <AppRoutes />
 
  </>
);
}

export default App;