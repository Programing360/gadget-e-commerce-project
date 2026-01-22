import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router/dom";
import { router } from "./router/router.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className=" ">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <div className="">
            <RouterProvider router={router} />,
          </div>
        </AuthProvider>
      </QueryClientProvider>
    </div>
    <ToastContainer position="top-center"></ToastContainer>
  </StrictMode>,
);
