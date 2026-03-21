import { useAxiosSecure } from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

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
  // const { user } = useContext(UseContext);

  const userId = getGuestUserId();
  const {
    isLoading,
    refetch,
    data: cart = [],
  } = useQuery({
    queryKey: ["cartData", userId],
    enabled: !!userId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/cartData?userId=${userId}`);
      return res.data;
    },
  });

  return [cart, refetch, isLoading];
};

export default useCart;
