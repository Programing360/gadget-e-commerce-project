import React from "react";
import { useAxiosSecure } from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useOrderList = () => {
  const axiosSecure = useAxiosSecure();
  const {
    isLoading,
    refetch,
    data: orders = [],
  } = useQuery({
    queryKey: ["orders"],
    
    queryFn: async () => {
      const res = await axiosSecure.get("/orders");
      return res.data;
    },
  });
  const unreadCount = orders.filter(n => !n.isRead).length;

  return [orders, refetch ,isLoading,unreadCount];
};

export default useOrderList;