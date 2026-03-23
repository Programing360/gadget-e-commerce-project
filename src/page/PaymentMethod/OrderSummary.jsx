import { useContext } from "react";
import useCart from "../../Hook/useCart";
import { UseContext } from "../../Context/AuthContext";
import { Link } from "react-router";
// import menuList from "../../assets/cart-arrow-down-solid-full.svg";

const OrderSummary = () => {
  const [cart] = useCart();
  const { deliveryArea } = useContext(UseContext);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping =
    deliveryArea === "inside" ? 50 : deliveryArea === "outside" ? 17 : 0;
  const total = subtotal + shipping;
  const isCartEmpty = cart.length === 0;
  return (
    <div className="bg-base-200 p-4 rounded space-y-4 shadow-2xl px-9 dark:text-white dark:bg-[#140b1e]">
      <h1 className="text-2xl font-bold">Order Summary</h1>
      <hr className="mb-10" />
      <h3>Items in Cart</h3>
      {isCartEmpty ? (
        <div className="text-center py-10 text-gray-500">
          <div className="text-4xl mb-3">🛒</div>
          <p>Your cart is empty</p>
          <Link to='/userAllProduct'>
            <button className="text-blue-500 mt-2">Continue Shopping</button>
          </Link>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item._id} className="flex gap-3">
              <div className="relative">
                <img
                  src={item.image}
                  className="w-14 h-14 rounded border "
                  alt=""
                />
                <span className="absolute top-0 right-12 bg-black w-5 rounded h-5 text-white text-center">
                  {item.quantity}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-sm">৳{item.price}</p>
              </div>
            </div>
          ))}
        </>
      )}

      <hr />

      <p className="flex justify-between text-sm">
        <span>Subtotal</span>
        <span>৳{subtotal}</span>
      </p>

      <p className="flex justify-between text-sm">
        <span>Shipping</span>
        <span>৳{shipping}</span>
      </p>

      <p className="flex justify-between font-bold">
        <span>Total</span>
        <span>৳{total}</span>
      </p>
    </div>
  );
};

export default OrderSummary;
