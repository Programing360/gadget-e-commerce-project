import React, { useContext } from "react";
import { useAxiosSecure } from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { UseContext } from "../Context/AuthContext";

const useCart = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useContext(UseContext);
  
    const {isLoading, refetch,data: cart = []} = useQuery({
      queryKey: ["cartData", user?.email],
      queryFn: async () => {
        const res = await axiosSecure.get(`/cartData`);
        return res.data;
      },
    })
 
  return [cart, refetch, isLoading];
};

export default useCart;
