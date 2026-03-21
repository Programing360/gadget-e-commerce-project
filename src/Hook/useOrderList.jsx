import React from "react";
import { useAxiosSecure } from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useOrderList = (filter) => {
  const axiosSecure = useAxiosSecure();
  const {
    isLoading,
    refetch,
    data: orders = [],
  } = useQuery({
   queryKey: ["adminOrders", filter],
   
    queryFn: async () => {
      const {data} = await axiosSecure.get(`/admin/orders?filter=${filter}`);
      return data;
    },
  });
  const unreadCount = orders.filter(n => !n.isRead).length;

  return [orders, refetch ,isLoading,unreadCount];
};

export default useOrderList;