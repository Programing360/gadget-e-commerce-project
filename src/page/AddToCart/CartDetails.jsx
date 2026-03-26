import { Link } from "react-router";
import useCart from "../../Hook/useCart";
import useCartItemUpdate from "../../Hook/cartItemUpdate";
import editIcon from "../../assets/assets/editIcon.png";
import crossIcon from "../../assets/assets/crossIcon.png";
import { useAxiosSecure } from "../../Hook/useAxiosSecure";
import { toast } from "react-toastify";
import { useState } from "react";
import SEO from "../../component/SEO/SEO";

const CartDetails = () => {
  const [cart, refetch] = useCart();
  const { handleCartIncrement, handleCartDecrement } = useCartItemUpdate();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(null);
  const [spinningId, setSpinningId] = useState(null);
  const handleCartDelete = async (id) => {
    try {
      setLoading(id);

      const res = await axiosSecure.delete(`/cartDelete/${id}`);

      if (res.data.deletedCount > 0) {
        refetch();
        toast.success("Item removed from cart");
        localStorage.removeItem("cartItem");
      }
    } catch (err) {
      if(err){
        toast.error('Something is wrong')
      }
    } finally {
      setLoading(null);
    }
  };

  const handleAllCartDelete = async () => {
    await axiosSecure.delete("/cartDeleteAll").then((res) => {
      if (res.data.deletedCount > 0) {
        refetch();
        toast.success("Removed all cart items");
        localStorage.removeItem("cartItem");
      }
    });
  };

  const handleIncrement = async (id) => {
    setSpinningId(id);

    await handleCartIncrement(id); // wait backend

    refetch(); // 🔥 important

    setSpinningId(id || null);
    setTimeout(setSpinningId, 700);
  };
  const handleDecrement = async (id) => {
    const item = cart.find((i) => i.productId === id);
    if (!item || item.quantity <= 1) return;

    setSpinningId(id);

    await handleCartDecrement(id);

    refetch();

    setSpinningId(id || null);
    setTimeout(setSpinningId, 700);
  };
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  // 🔴 EMPTY CART UI
  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center text-center">
        <img src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png" alt="Empty Cart" className="w-64 mb-6" />
        <h2 className="text-3xl font-bold mb-2">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-6">
          Looks like you haven’t added anything to your cart yet
        </p>
        <Link to="/">
          <button className="bg-[#f56e06] text-white px-6 py-3 rounded hover:bg-[#2f333a] active:scale-95">
            Go to Shop
          </button>
        </Link>
      </div>
    );
  }

  // 🟢 CART WITH PRODUCTS
  return (
    <div className="dark:bg-white dark:text-black my-22">
      <SEO
        title="Cart Details - Zeroomiro"
        description="Review your cart items and checkout"
      />
      <div className="bg-cyan-800 py-10 text-white">
        <h1 className="text-4xl text-center font-bold">Cart</h1>
        <p className="text-center pt-4">
          <Link to="/">Home</Link> {">"} Cart
        </p>
      </div>

      <div className="overflow-x-auto lg:w-8/12 w-full mx-auto mt-10">
        <table className="table">
          <thead>
            <tr className="bg-[#006078ce] text-white text-center">
              <th>IMAGE</th>
              <th>PRODUCT NAME</th>
              <th>UNIT PRICE</th>
              <th>QTY</th>
              <th>SUBTOTAL</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>
            {cart?.map((item) => (
              <tr key={item._id} className="border bg-gray-200 text-center">
                <td>
                  <img
                    className="md:h-20 md:w-20 mx-auto"
                    src={item.image}
                    alt={item.name}
                  />
                </td>

                <td className="font-bold">{item.name}</td>

                <td className="font-bold">{item.price} TK</td>

                <td>
                  <div className="flex justify-center items-center gap-3 bg-gray-100 px-3 py-2 rounded-xl w-full shadow-sm">
                    {/* Decrement */}
                    <button
                      onClick={() => handleDecrement(item.productId)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-300 text-xl font-semibold 
               hover:bg-red-50 hover:text-red-500 active:scale-90 transition"
                    >
                      −
                    </button>

                    {/* Quantity */}
                    <p className="min-w-7.5 text-center font-semibold text-gray-800">
                      {item.quantity}
                    </p>

                    {/* Increment */}
                    <button
                      onClick={() => handleIncrement(item.productId)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-300 text-xl font-semibold 
               hover:bg-green-50 hover:text-green-600 active:scale-90 transition"
                    >
                      +
                    </button>
                  </div>
                  {spinningId === item.productId && (
                    <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-lg">
                      <span className="loading loading-spinner loading-md"></span>
                    </div>
                  )}
                </td>

                <td className="font-bold">{item.price * item.quantity} TK</td>

                <td>
                  <div className="flex justify-center gap-4">
                    <Link to={`/productDetails/${item.productId}`}>
                      <img
                        className="w-5 cursor-pointer"
                        src={editIcon}
                        alt="edit"
                      />
                    </Link>
                    <button
                      onClick={() => handleCartDelete(item._id)}
                      disabled={loading}
                      className="text-red-500 underline cursor-pointer ml-3 flex items-center gap-2"
                    >
                      {loading === item._id ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        <img
                          className="w-5 cursor-pointer"
                          src={crossIcon}
                          alt="delete"
                        />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end items-center w-full gap-6 bg-gray-200 py-4 px-10 border-t">
          <h2 className="text-2xl font-bold">Grand Total:</h2>
          <p className="text-xl font-semibold">{totalPrice} BDT</p>
        </div>
      </div>

      <div className="md:w-8/12 mx-auto bg-gray-200 mt-16 p-8 gap-4 flex flex-col lg:flex-row justify-between items-center ">
        <div className="join lg:w-1/2 w-full">
          <input
            className="input join-item w-full border-orange-300 dark:bg-white outline-0"
            placeholder="Enter coupon code"
          />
          <button className="btn rounded-none md:join-item bg-[#005f78] text-white hover:bg-[#2f333a] dark:border-0">
            Apply Coupon
          </button>
        </div>

        <div className="flex ">
          <button
            onClick={handleAllCartDelete}
            className="bg-[#005f78] btn border-0 text-white w-[50%] mr-4 text-[.80rem] md:px-6 md:py-3 md:mr-4 hover:bg-[#2f333a] mb-3 text-center active:scale-95"
          >
            CLEAR CART
          </button>
          <Link
            className="bg-[#2f333a] border-0 btn text-white md:px-6 md:py-3 text-[.70rem] w-[50%] py-3 hover:bg-[#005f78]"
            to="/onlinePayment"
          >
            <button>PROCEED TO CHECKOUT</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
