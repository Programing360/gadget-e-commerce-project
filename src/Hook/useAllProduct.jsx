import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAxiosSecure } from "./useAxiosSecure";

const useAllProduct = () => {
  const axiosSecure = useAxiosSecure();
  const { data:allProduct, refetch } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allProducts");
      return res.data;
    },
  });

  return [allProduct, refetch];
};

export default useAllProduct;
