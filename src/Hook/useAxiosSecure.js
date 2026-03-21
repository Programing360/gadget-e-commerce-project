import axios from "axios";

export const useAxiosSecure = () => {
  const instance = axios.create({
    baseURL: "https://zeromiroo-api.vercel.app",
    withCredentials: true,
    timeout: 10000, // ⏱️ timeout add করো
  });

  return instance;
};