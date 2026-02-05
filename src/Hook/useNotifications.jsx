import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";

const useNotifications = (email) => {
  const axiosSecure = useAxiosSecure();

  const { data: notifications = [], refetch } = useQuery({
    queryKey: ["notifications", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/notifications?email=${email}`);
      return res.data;
    },
  });

  // unread count
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return { notifications, unreadCount, refetch };
};

export default useNotifications;
