import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";
import { useContext } from "react";
import { UseContext } from "../Context/AuthContext";

const useNotifications = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(UseContext);

  const { data: notifications = 0, refetch } = useQuery({
    queryKey: ["notificationCount", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/notifications/unread-count");
      return res.data.count;
    },

    enabled: !!user, // 🔥 user থাকলে তবেই call হবে
    staleTime: 1000 * 60 * 2, // 2 min cache
    refetchOnWindowFocus: false, // focus এ call করবে না
    refetchInterval: false, // ❌ auto polling বন্ধ
  });

  return [notifications, refetch];
};

export default useNotifications;