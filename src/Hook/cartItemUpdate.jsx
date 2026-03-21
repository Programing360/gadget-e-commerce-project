import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";
import useCart from "./useCart";
import { toast } from "react-toastify";

const useCartItemUpdate = () => {
  const [cart] = useCart();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // 🔥 Increment
  const cartUpdateIncrement = useMutation({
    mutationFn: async ({ productId, quantity }) => {
      const res = await axiosSecure.patch(`/cart/dataIncrement/${productId}`, {
        quantity,
      });
      return res.data;
    },

    // 🔥 Optimistic Update
    onMutate: async ({ productId, quantity }) => {
      await queryClient.cancelQueries(["cart"]);

      const previousCart = queryClient.getQueryData(["cart"]);

      queryClient.setQueryData(["cart"], (old = []) => {
        return old.map((item) =>
          item._id === productId ? { ...item, quantity: quantity } : item,
        );
      });

      return { previousCart };
    },

    // ❌ Error হলে rollback
    onError: (err, variables, context) => {
      queryClient.setQueryData(["cart"], context.previousCart);
      toast.error("Update failed");
    },

    // ✅ Success
    // onSuccess: () => {
    //   toast.success("Cart Updated");
    // },

    // 🔄 Sync with backend
    onSettled: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });

  // 🔥 Decrement
  const cartUpdateDecrement = useMutation({
    mutationFn: async ({ productId, quantity }) => {
      const res = await axiosSecure.patch(`/cart/dataDecrement/${productId}`, {
        quantity,
      });
      return res.data;
    },

    onMutate: async ({ productId, quantity }) => {
      await queryClient.cancelQueries(["cart"]);

      const previousCart = queryClient.getQueryData(["cart"]);

      queryClient.setQueryData(["cart"], (old = []) => {
        return old.map((item) =>
          item._id === productId ? { ...item, quantity: quantity } : item,
        );
      });

      return { previousCart };
    },

    onError: (err, variables, context) => {
      queryClient.setQueryData(["cart"], context.previousCart);
      toast.error("Update failed");
    },

    // onSuccess: () => {
    //   toast.success("Cart Updated");
    // },

    onSettled: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });

  // 🔥 Handle Increment
  const handleCartIncrement = (id) => {
    const existing = cart.find((item) => item.productId === id);
    if (!existing) return;

    cartUpdateIncrement.mutate({
      productId: existing._id,
      quantity: existing.quantity + 1,
    });
  };

  // 🔥 Handle Decrement
  const handleCartDecrement = (id) => {
    const existing = cart.find((item) => item.productId === id);
    if (!existing) return;

    // ❗ quantity 1 এর নিচে নামবে না
    if (existing.quantity <= 1) return;

    cartUpdateDecrement.mutate({
      productId: existing._id,
      quantity: existing.quantity - 1,
    });
  };

  return {
    handleCartIncrement,
    handleCartDecrement,
    isLoading: cartUpdateIncrement.isPending || cartUpdateDecrement.isPending,
  };
};

export default useCartItemUpdate;
