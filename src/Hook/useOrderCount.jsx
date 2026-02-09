import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAxiosSecure } from "./useAxiosSecure";

const useOrderCount = () => {
  const axiosSecure = useAxiosSecure();

  const { data:orderCount = [], refetch } = useQuery({
    queryKey: ['orderConfirm'],
    queryFn: async () => {
        const res = await axiosSecure.get('/orderConfirm')
        return res.data
    },
    
  });
  
  return [orderCount,refetch];
};

export default useOrderCount;
