import { Link } from "react-router";
import useCart from "../../Hook/useCart";
import useCartItemUpdate from "../../Hook/cartItemUpdate";
import editIcon from "../../assets/assets/editIcon.png";
import crossIcon from "../../assets/assets/crossIcon.png";
import emptyCartImg from "../../assets/assets/7612.jpg"; // 👉 add an image
import { useAxiosSecure } from "../../Hook/useAxiosSecure";
import { toast } from "react-toastify";

const CartDetails = () => {
  const [cart, refetch] = useCart();
  const { handleCartIncrement, handleCartDecrement } = useCartItemUpdate();
  const axiosSecure = useAxiosSecure();

  const handleCartDelete = (id) => {
    axiosSecure.delete(`/cartDelete/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        refetch();
        toast.success("Item removed from cart");
        localStorage.removeItem("cartItem");
      }
    });
  };

  const handleAllCartDelete = () => {
    axiosSecure.delete("/cartDeleteAll").then((res) => {
      if (res.data.deletedCount > 0) {
        refetch();
        toast.success("Removed all cart items");
        localStorage.removeItem("cartItem");
      }
    });
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  //   const navigate = useNavigate();

  //   // ⏳ Auto redirect after 5 seconds
  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       navigate("/");
  //     }, 5000);

  //     return () => clearTimeout(timer);
  //   }, [navigate]);
  // 🔴 EMPTY CART UI
  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center text-center">
        <img src={emptyCartImg} alt="Empty Cart" className="w-64 mb-6" />
        <h2 className="text-3xl font-bold mb-2">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-6">
          Looks like you haven’t added anything to your cart yet
        </p>
        <Link to="/">
          <button className="bg-[#f56e06] text-white px-6 py-3 rounded hover:bg-[#2f333a]">
            Go to Shop
          </button>
        </Link>
      </div>
    );
  }

  // 🟢 CART WITH PRODUCTS
  return (
    <div className="dark:bg-white dark:text-black">
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
            {cart.map((item) => (
              <tr key={item._id} className="border bg-gray-200 text-center">
                <td>
                  <img
                    className="md:h-20 md:w-20 mx-auto"
                    src={item.image}
                    alt={item.name}
                  />
                </td>

                <td className="font-bold">{item.name}</td>

                <td>{item.price} TK</td>

                <td>
                  <div className="flex justify-center items-center gap-4 bg-gray-100 py-1">
                    <button
                      className="text-2xl"
                      onClick={() => handleCartDecrement(item.productId)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="text-2xl"
                      onClick={() => handleCartIncrement(item.productId)}
                    >
                      +
                    </button>
                  </div>
                </td>

                <td>{item.price * item.quantity} TK</td>

                <td>
                  <div className="flex justify-center gap-4">
                    <Link to={`/productDetails/${item.productId}`}>
                      <img
                        className="w-5 cursor-pointer"
                        src={editIcon}
                        alt="edit"
                      />
                    </Link>
                    <img
                      onClick={() => handleCartDelete(item._id)}
                      className="w-5 cursor-pointer"
                      src={crossIcon}
                      alt="delete"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end gap-6 bg-gray-200 py-4 px-10 border-t">
          <h2 className="text-2xl font-bold">Grand Total:</h2>
          <p className="text-xl font-semibold">{totalPrice} TK</p>
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
            className="bg-[#005f78] btn border-0 text-white w-[50%] mr-4 text-[.80rem] md:px-6 md:py-3 md:mr-4 hover:bg-[#2f333a] mb-3 text-center "
          >
            CLEAR CART
          </button>
          <Link className="bg-[#2f333a] border-0 btn text-white md:px-6 md:py-3 text-[.70rem] w-[50%] py-3 hover:bg-[#005f78]" to='/onlinePayment'>
            <button >
              PROCEED TO CHECKOUT
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
