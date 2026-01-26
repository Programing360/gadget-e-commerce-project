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

  return [orders, refetch ,isLoading];
};

export default useOrderList;
