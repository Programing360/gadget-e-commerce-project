import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";

const useNotifications = () => {
  const axiosSecure = useAxiosSecure();

  const { data:notifications, refetch } = useQuery({
  queryKey: ["notificationCount"],
  queryFn: async () => {
    const res = await axiosSecure.get("/notifications/unread-count");
    return res.data.count;
  },
  refetchInterval: 5000, // auto update
});

  return [ notifications, refetch ];
};

export default useNotifications;
