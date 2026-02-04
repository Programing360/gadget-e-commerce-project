import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useAxiosSecure } from "./useAxiosSecure";
import { UseContext } from "../Context/AuthContext";

/* ================= GUEST ID HELPER ================= */
const getGuestUserId = () => {
  let guestId = localStorage.getItem("guestCart");
  if (!guestId) {
    guestId = crypto.randomUUID();
    localStorage.setItem("guestCart", guestId);
  }

  return guestId;
};

const useWishList = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(UseContext);

  const { refetch: reload, data: wishlist = [] } = useQuery({
    queryKey: ["wishListGet", user?.email || "guestCart"],
    queryFn: async () => {
      const userId = user ? user?.email : getGuestUserId();
      console.log(userId)
      const res = await axiosSecure.get("/wishListGet");
      const data = res.data;

      // 🔥 Correct filtering
      const userCart = data?.filter((item) => item.userId === userId);
      console.log(userCart,data)
      return userCart;
    },
  });

  return [wishlist, reload];
};

export default useWishList;
