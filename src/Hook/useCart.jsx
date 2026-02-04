import { useContext } from "react";
import { useAxiosSecure } from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
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

const useCart = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(UseContext);

  const {
    isLoading,
    refetch,
    data: cart = [],
  } = useQuery({
    queryKey: ["cartData", user?.email || "guest"],
    queryFn: async () => {
      const userId = user ? user?.email : getGuestUserId();

      const res = await axiosSecure.get("/cartData");
      const data = res.data;

      // 🔥 Correct filtering
      const userCart = data.filter(
        (item) => item.userId === userId
      );

      return userCart;
    },
    enabled: true,
  });

  return [cart, refetch, isLoading];
};

export default useCart;
