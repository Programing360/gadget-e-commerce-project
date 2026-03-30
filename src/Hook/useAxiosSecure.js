import axios from "axios";
import { useMemo } from "react";

export const useAxiosSecure = () => {

  const axiosSecure = useMemo(() => {
    const instance = axios.create({
      baseURL: "https://zeromiroo-api.vercel.app",
      withCredentials: true,
    });

    // ✅ REQUEST INTERCEPTOR (token attach)
    instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // ✅ RESPONSE INTERCEPTOR (handle 401 + refresh token)
    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // 🔁 token expired হলে refresh try করবে
        if (
          error.response?.status === 401 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          try {
            const res = await axios.post(
              "https://zeromiroo-api.vercel.app/refresh-token",
              {},
              { withCredentials: true }
            );

            const newToken = res.data.accessToken;

            // 🔐 নতুন token save
            localStorage.setItem("accessToken", newToken);

            // 🔁 retry original request
            originalRequest.headers.authorization = `Bearer ${newToken}`;
            return instance(originalRequest);

          } catch (refreshError) {
            // ❌ refresh fail = logout
            localStorage.removeItem("accessToken");
            // navigate("/login");
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return instance;
  }, []);

  return axiosSecure;
};