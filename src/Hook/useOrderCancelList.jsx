import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAxiosSecure } from "./useAxiosSecure";

const useOrderCancelList = () => {
  const axiosSecure = useAxiosSecure();
  const { data: orderCancel, refetch } = useQuery({
    queryKey: ["orderCancelList"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orderCancelList");
      return res.data;
    },
  });

  return [orderCancel, refetch];
};

export default useOrderCancelList;
