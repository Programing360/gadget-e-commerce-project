import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useAxiosSecure } from "./useAxiosSecure";
import { UseContext } from "../Context/AuthContext";

const useWishList = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(UseContext);

  const { refetch: reload, data: wishlist = [] } = useQuery({
    queryKey: ["wishListGet", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/wishListGet");
      return res.data;
    },
  });

  return [wishlist, reload];
};

export default useWishList;
