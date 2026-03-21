import useCart from "../../Hook/useCart";
import useCartItemUpdate from "../../Hook/cartItemUpdate";
import { useState } from "react";
import { useAxiosSecure } from "../../Hook/useAxiosSecure";
import { toast } from "react-toastify";
import SEO from "../../component/SEO/SEO";

const CartAdd = () => {
  const [cart, refetch] = useCart();
  const { handleCartIncrement, handleCartDecrement } = useCartItemUpdate();
  const axiosSecure = useAxiosSecure();
  const [removing, setRemoving] = useState(null);
  const [spinningId, setSpinningId] = useState(null);

  // Delete
  const handleCartDelete = async (id) => {
    try {
      setRemoving(id);
      const res = await axiosSecure.delete(`/cartDelete/${id}`);
      if (res.data.deletedCount > 0) {
        toast.success("Item removed from cart");
        refetch();
      }
    } catch {
      toast.error("Failed to remove item");
    } finally {
      setRemoving(id || null);
      setTimeout(setRemoving, 700);
    }
  };

  // Increment with UI spinner
  const handleIncrement = async (id) => {
    setSpinningId(id);

    await handleCartIncrement(id); // wait backend

    refetch(); // 🔥 important

    setSpinningId(id || null);
    setTimeout(setSpinningId, 700);
  };

  // Decrement with UI spinner
  const handleDecrement = async (id) => {
    const item = cart.find((i) => i.productId === id);
    if (!item || item.quantity <= 1) return;

    setSpinningId(id);

    await handleCartDecrement(id);

    refetch();

    setSpinningId(id || null);
    setTimeout(setSpinningId, 700);
  };

  return (
    <div>
      <SEO
        title="Your Cart - Zeroomiro"
        description="Review your cart items and checkout"
      />
      {cart.map((item) => (
        <div
          key={item._id}
          className="flex gap-4 mb-4 items-center shadow-lg p-2 relative"
        >
          {/* Image */}
          <img
            className="w-[40%] h-[50%] border border-gray-300 p-4"
            src={item?.image}
            alt=""
          />

          {/* Info */}
          <div className="flex flex-col w-full">
            <h1 className="text-[1rem] font-bold text-cyan-700">{item.name}</h1>
            <p className="text-pink-700">TK {item.price}</p>

            <div className="flex items-center justify-between mt-3 gap-4">
              {/* Quantity */}
              <div className="bg-gray-200 w-25 text-center text-xl py-1 flex items-center justify-around">
                <button onClick={() => handleDecrement(item.productId)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrement(item.productId)}>
                  +
                </button>
              </div>

              {/* Remove */}
              <button
                onClick={() => handleCartDelete(item._id)}
                disabled={removing === item._id}
                className="text-sm text-cyan-800 underline cursor-pointer"
              >
                {removing === item._id ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Remove"
                )}
              </button>
            </div>

            {/* 🔥 Spinner Overlay on item UI only */}
            {spinningId === item.productId && (
              <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-lg">
                <span className="loading loading-spinner loading-md"></span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartAdd;
