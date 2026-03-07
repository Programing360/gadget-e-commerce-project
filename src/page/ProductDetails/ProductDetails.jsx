import React, { useContext } from "react";
import { Link, useLoaderData } from "react-router";
import { useAxiosSecure } from "../../Hook/useAxiosSecure";
import { toast } from "react-toastify";
import { UseContext } from "../../Context/AuthContext";
import useCart from "../../Hook/useCart";
import useCartItemUpdate from "../../Hook/cartItemUpdate";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

/* 🔑 Guest ID helper */
const getGuestUserId = () => {
  let guestId = localStorage.getItem("guestCart");
  if (!guestId) {
    guestId = crypto.randomUUID();
    localStorage.setItem("guestCart", guestId);
  }
  return guestId;
};

const ProductDetails = () => {
  const { _id, name, image, stock, price, discountPrice, description } =
    useLoaderData();

  const { user } = useContext(UseContext);
  const axiosSecure = useAxiosSecure();
  const [cart, refetch] = useCart();
  const { handleCartIncrement, handleCartDecrement } = useCartItemUpdate();

  const cartItem = cart.find((item) => item.productId === _id);

  /* 🛒 Add to cart */
  const handleCartData = async (_id) => {
    const existing = cart.find((item) => item.productId === _id);

    if (existing) {
      const newQty = existing.quantity + 1;
      const { data } = await axiosSecure.patch(`/cartData/${existing._id}`, {
        quantity: newQty,
      });

      if (data.modifiedCount > 0) {
        toast.success("Product also added to cart 🛒");
        refetch();
      }
      return;
    }

    const userId = user ? user.email : getGuestUserId();

    const cartItem = {
      productId: _id,
      name,
      price: discountPrice,
      quantity: 1,
      image,
      userId,
      email: user?.email || null,
    };

    const res = await axiosSecure.post("/cartData", cartItem);

    if (res.data?.insertedId) {
      toast.success("Product added to cart 🛒");
      refetch();
    }
  };

  return (
    <div className="bg-base-100 min-h-screen mt-14">
      {/* 🔝 Header */}
      <div className="bg-gradient-to-r from-[#c127d2] via-[#632463] to-[#5a3d99] text-white py-6 text-center">
        <h1 className="text-xl md:text-2xl font-semibold">{name}</h1>
        <div className="flex justify-center text-sm">
          <div className="breadcrumbs">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>{name}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 🧱 Content */}
      <div className="md:px-10">
        <div className="max-w-6xl mx-auto px-4 py-10 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* 🖼 Image */}
            <Carousel
              showThumbs={true}
              showStatus={false}
              infiniteLoop
              autoPlay
              className="rounded-xl overflow-hidden"
            >
              <div>
                <img
                  src={image}
                  alt={name}
                  className="object-contain max-h-100"
                />
              </div>
              <div>
                <img
                  src={image}
                  alt={name}
                  className="object-contain max-h-100"
                />
              </div>
            </Carousel>

            {/* 📦 Info */}
            <div className="space-y-4">
              <p>
                <span className="font-semibold">Availability:</span>{" "}
                <span className="text-emerald-600">{stock} in stock</span>
              </p>

              <h2 className="text-2xl md:text-4xl font-bold">{name}</h2>

              <div className="flex items-center gap-3">
                <span className="text-xl font-bold text-primary">
                  ৳{discountPrice}
                </span>
                <span className="line-through text-gray-400">৳{price}</span>
              </div>

              {/* Quantity */}
              {cartItem && (
                <div className="flex items-center gap-3 border p-4 border-indigo-600 justify-between bg-indigo-100">
                  <div className="flex items-center gap-4 ">
                    <input
                      type="radio"
                      name="quantity"
                      id="quantity1"
                      defaultChecked
                      className=""
                    />
                    <div>
                      <h2 className=" font-bold">{name}</h2>
                      <div className="flex items-center gap-3">
                        <span className=" font-bold text-primary">
                          ৳{discountPrice}
                        </span>
                        <span className="line-through text-gray-400">
                          ৳{price}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-200">
                    <button
                      onClick={() => handleCartDecrement(_id)}
                      className="btn btn-ghost active:scale-95"
                    >
                      −
                    </button>
                    <span className="min-w-6 text-center font-normal">
                      {cartItem.quantity}
                    </span>
                    <button
                      onClick={() => handleCartIncrement(_id)}
                      className="btn btn-ghost hover:bg-blue-400 active:scale-95"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              <Link to="/onlinePayment">
                <button className="btn w-full bg-linear-to-r from-[#c127d2] via-[#632463] to-[#5a3d99] text-white mb-4 active:scale-95">
                  Buy Now
                </button>
              </Link>
              <button
                disabled={stock === 0}
                onClick={() => handleCartData(_id)}
                className={`btn w-full rounded-none ${
                  stock === 0
                    ? "btn-disabled bg-gray-300 dark:text-black"
                    : "btn w-full border-fuchsia-700 hover:bg-linear-to-r from-[#c127d2] via-[#632463] to-[#5a3d99] hover:text-white text-purple-600 active:scale-95"
                }`}
              >
                {stock === 0 ? "Out of Stock" : "Quick Add"}
              </button>
              <a
                href="https://www.facebook.com/messages/"
                target="_blank"
                rel="noreferrer"
              >
                <button className="btn w-full bg-linear-to-r from-[#8c0fd4] via-[#301830] to-[#221b31] text-white mb-4 active:scale-95">
                  Chat with Messenger
                </button>
              </a>

              <p className="bg-gray-100 p-4 rounded-xl text-sm text-gray-700">
                <span className="font-semibold">Description:</span>{" "}
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
