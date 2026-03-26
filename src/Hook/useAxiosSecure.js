import axios from "axios";
import { useMemo } from "react";

export const useAxiosSecure = () => {
  const axiosSecure = useMemo(() => {
    const instance = axios.create({
      baseURL: "https://zeromiroo-api.vercel.app",
      withCredentials: true,
    });

    // 🔐 handle unauthorized globally
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
        //   alert("Unauthorized - redirect to login");
          // optional: window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, [])
  return axiosSecure;
};