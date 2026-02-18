import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAxiosSecure } from "./useAxiosSecure";

const useAllProduct = () => {
  const axiosSecure = useAxiosSecure();
  const { data:allProduct=[], refetch, isLoading } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allProducts");
      return res.data;
    },
  });

  return [allProduct, refetch,isLoading];
};

export default useAllProduct;
