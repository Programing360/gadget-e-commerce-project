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

  const userId =  getGuestUserId();

  const {
    isLoading,
    refetch,
    data: cart = [],
  } = useQuery({
    queryKey: ["cartData", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/cartData?userId=${userId}`);
      return data;
    },
  });

  return [cart, refetch, isLoading];
};

export default useCart;
