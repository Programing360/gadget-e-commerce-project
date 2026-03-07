import useCart from "../../Hook/useCart";
import { useAxiosSecure } from "../../Hook/useAxiosSecure";
import { toast } from "react-toastify";
import useCartItemUpdate from "../../Hook/cartItemUpdate";
import { useState } from "react";

const CartAdd = () => {
  const [cart, refetch] = useCart();
  const axiosSecure = useAxiosSecure();
  const { handleCartIncrement, handleCartDecrement } = useCartItemUpdate();
  const [removing, setRemoving] = useState(null);

  const handleCartDelete = async (id) => {
    try {
      setRemoving(id);

      const res = await axiosSecure.delete(`/cartDelete/${id}`);
      if (res.data.deletedCount > 0) {
        toast.success("item removed from cart");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to remove item");
    } finally {
      setRemoving(null);
      
    }
  };

  

  return (
    <div>
      {cart.map((item) => (
        <div
          key={item._id}
          className="flex gap-4 mb-4 items-center shadow-lg p-2"
        >
          <img
            className="w-[40%] h-[50%] border border-gray-300 p-4"
            src={item?.image}
            alt=""
          />
          <div className="flex flex-col ">
            <h1 className="text-[1rem] font-bold text-cyan-700">{item.name}</h1>
            <p className="text-pink-700">TK {item.price}</p>
            <div className="  flex items-center justify-around mt-3 gap-4">
              <div className="bg-gray-200 w-25 text-center text-xl py-1 flex items-center justify-around dark:text-black">
                <button
                  className="text-2xl"
                  onClick={() => handleCartDecrement(item.productId)}
                >
                  -
                </button>{" "}
                <span className="">{item.quantity}</span>{" "}
                <button
                  className=""
                  onClick={() => handleCartIncrement(item.productId)}
                >
                  +
                </button>
              </div>
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartAdd;
