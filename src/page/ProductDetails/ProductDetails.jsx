import React, { useContext } from "react";
import { Link, useLoaderData } from "react-router";
import { useAxiosSecure } from "../../Hook/useAxiosSecure";
import { toast, ToastContainer } from "react-toastify";
import { UseContext } from "../../Context/AuthContext";
import useCart from "../../Hook/useCart";
import useCartItemUpdate from "../../Hook/cartItemUpdate";

const ProductDetails = () => {
  const { _id, name, image, stock, price, discountPrice, description } =
    useLoaderData();
  const { user } = useContext(UseContext);
  const axiosSecure = useAxiosSecure();
  const [cart, refetch] = useCart();
  const {handleCartIncrement, handleCartDecrement} = useCartItemUpdate();

  const handleCartData = async () => {
    const existing = cart.find((item) => item.productId === _id);
    if (existing) {
      const newQty = existing.quantity + 1;
      const { data } = await axiosSecure.patch(`/cartData/${existing._id}`, {
        quantity: newQty,
      });
      if (data.modifiedCount > 0) {
        cart.map((item) =>
          item.id === existing._id ? { ...item, quantity: newQty } : item
        );
        toast.success("Product also added to cart 🛒");
        refetch();
      }
      return;
    }

    const cartItem = {
      productId: _id,
      name,
      price: discountPrice,
      quantity: 1,
      image,
      email: user.email,
    };
    localStorage.setItem("cartItem", JSON.stringify({ id: _id }));
    axiosSecure.post("/cartData", cartItem).then((res) => {
      if (res.data?.insertedId) {
        toast.success("Product added to cart 🛒");
        refetch();
      }
    });
  };

  const quantity = cart.map((item) => {
    if (item.productId === _id) {
      return item.quantity;
    }
  });
  console.log(quantity);
  return (
    <div className="dark:bg-white dark:text-white">
      <div className="bg-sky-700 text-white text-center w-full py-7">
        <h1 className="text-2xl">{name}</h1>
        <div className="breadcrumbs text-sm justify-items-center">
          <ul className="">
            <li>
              <Link to="/">
                <a>Home</a>
              </Link>
            </li>

            <li>
              <Link to="/products">
                <a>Product</a>
              </Link>
            </li>
            <li>{name}</li>
          </ul>
        </div>
      </div>
      <div className="hero bg-base-200 min-h-screen ">
        <div className="hero-content flex-col lg:flex-row gap-10">
          <img src={image} className="w-full h-full rounded-lg shadow-2xl" />
          <div className="product-cart leading-10">
            <div className="">
              <p>
                <span className="font-semibold">Availability</span>:{" "}
                <span className="text-emerald-700">{stock} in stoke</span>
              </p>
              <h1 className="text-5xl font-bold mb-3">{name}</h1>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-primary">
                  ৳{discountPrice}
                </span>
                <span className="text-sm line-through text-gray-400">
                  ৳{price}
                </span>
              </div>
            </div>
            <div className="flex gap-4 w-full p-3 items-center">
              {/* Quantity */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleCartDecrement(_id)}
                  className="btn btn-sm"
                >
                  -
                </button>
                <span className="min-w-5 text-center">{quantity}</span>
                <button
                  onClick={() => handleCartIncrement(_id)}
                  className="btn btn-sm"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleCartData}
                className=" btn flex-1 bg-linear-to-r from-[#c127d2] via-[#632463] to-[#5a3d99] text-white"
              >
                Add To Cart
              </button>
            </div>

            <button className="btn w-full bg-linear-to-r from-[#8c0fd4] via-[#301830] to-[#221b31] mt-4 text-white">
              Chat with Messenger
            </button>
            <p className="py-6 bg-gray-200 p-4 mt-4 rounded-tr-2xl rounded-bl-2xl dark:text-black">
              <span className="font-bold">Description: </span>
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
