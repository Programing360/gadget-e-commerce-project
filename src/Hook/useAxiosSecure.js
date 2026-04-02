import axios from "axios";
import { useMemo } from "react";

export const useAxiosSecure = () => {
  const axiosSecure = useMemo(() => {
    const instance = axios.create({
      baseURL: "https://zeromiroo-api.vercel.app",
      withCredentials: true,
    });

    // request interceptor
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

    // response interceptor
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem("accessToken");
        }

        return Promise.reject(error);
      }
    );

    return instance;
  }, []);

  return axiosSecure;
};