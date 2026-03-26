import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import { router } from "./router/router.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "aos/dist/aos.css";
import Aos from "aos";
import { HelmetProvider } from "react-helmet-async";
// Create a client
const queryClient = new QueryClient();

Aos.init();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="">
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <div className="">
              <RouterProvider
                router={router}
                fallbackElement={
                  <span className="loading loading-bars loading-xl"></span>
                }
              />
              
            </div>
          </AuthProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </div>
    <ToastContainer
      position="top-center"
      autoClose={800}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      pauseOnHover
      draggable
    />
  </StrictMode>,
);
