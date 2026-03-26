import React, { useContext, useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router";
import { useAxiosSecure } from "../../Hook/useAxiosSecure";
import { toast } from "react-toastify";
import { UseContext } from "../../Context/AuthContext";
import useCart from "../../Hook/useCart";
import useCartItemUpdate from "../../Hook/cartItemUpdate";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useAllProduct from "../../Hook/useAllProduct";
import SimilarProductsGrid from "./SimilarProductsGrid";
import SEO from "../../component/SEO/SEO";
import { motion } from "motion/react";

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
  const {
    _id,
    name,
    images = [],
    stock,
    price,
    discountPrice,
    description,
    category,
    colors = [],
    variants = [], // [{size:'M', color:'Red', stock:5}, ...]
  } = useLoaderData();

  const { user } = useContext(UseContext);
  const axiosSecure = useAxiosSecure();
  const [cart, refetch] = useCart();
  const { handleCartIncrement, handleCartDecrement } = useCartItemUpdate();

  const [size, setSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [currentStock, setCurrentStock] = useState(stock);
  const [imgLoading, setImgLoading] = useState(true);
  const navigate = useNavigate();

  const isShoe = category?.toLowerCase() === "shoe";
  const isShirt = category?.toLowerCase() === "shirt";


  const quantity = cart.find(item => item.productId === _id)

  /* 🔥 auto select color */
  useEffect(() => {
    if (colors.length > 0) {
      () => setSelectedColor(colors[0]);
    }
  }, [colors]);

  /* 🔥 Update stock according to selected variant */
  useEffect(() => {
    if (size && selectedColor && variants.length > 0) {
      const variant = variants.find(
        (v) => v.size === size && v.color === selectedColor,
      );
      () => setCurrentStock(variant ? variant.stock : 0);
    } else {
      () => setCurrentStock(stock);
    }
  }, [size, selectedColor, variants, stock]);

  /* 🔥 current cart item (variant wise) */
  const cartItem = cart.find(
    (item) =>
      item.productId === _id &&
      item.size === size &&
      item.color === selectedColor,
  );
  /* 🔥 Similar products */
  const [allProduct] = useAllProduct();
  const sameCategoryProducts = allProduct.filter(
    (item) => item.category === category && item._id !== _id && item.stock > 0,
  );

  /* 🛒 Buy Now */
  const handleBuyNow = async () => {
    if ((isShirt || isShoe) && !size) {
      toast.error("Please select size 👕");
      return;
    }
    if (currentStock === 0) {
      toast.error("Selected variant is out of stock ❌");
      return;
    }

    const userId = getGuestUserId();

    const existing = cart.find(
      (item) =>
        item.productId === _id &&
        item.size === size &&
        item.color === selectedColor,
    );

    if (existing) {
      navigate("/onlinePayment");
      return;
    }

    const cartData = {
      productId: _id,
      name,
      price: discountPrice,
      quantity: 1,
      image: images[0],
      size,
      color: selectedColor,
      userId,
      email: user?.email || null,
    };

    const res = await axiosSecure.post("/cartData", cartData);

    if (res.data?.insertedId) refetch();

    navigate("/onlinePayment");
  };

  /* 🛒 Add to cart */
  const handleCartData = async () => {
    if ((isShirt || isShoe) && !size) {
      toast.error("Please select size 👕");
      return;
    }
    if (currentStock === 0) {
      toast.error("Selected variant is out of stock ❌");
      return;
    }

    const userId = getGuestUserId();

    const existing = cart.find(
      (item) =>
        item.productId === _id &&
        item.size === size &&
        item.color === selectedColor,
    );

    /* 🔥 If exists → increase quantity */
    if (existing) {
      const newQty = existing.quantity + 1;

      const { data } = await axiosSecure.patch(`/cartData/${existing._id}`, {
        quantity: newQty,
      });

      if (data.modifiedCount > 0) {
        toast.success("Quantity updated 🛒");
        refetch();
      }
      return;
    }

    const cartData = {
      productId: _id,
      name,
      price: discountPrice,
      quantity: 1,
      image: images[0],
      size,
      color: selectedColor,
      userId,
      email: user?.email || null,
    };

    const res = await axiosSecure.post("/cartData", cartData);

    if (res.data?.insertedId) {
      toast.success("Product added to cart 🛒");
      refetch();
    }
  };

  return (
    <div className="min-h-screen mt-28">
      <SEO title={name} description={description} image={images[0]} />

      <div className="max-w-6xl mx-auto px-2 md:px-4 py-10 grid lg:grid-cols-2 gap-10">
        {/* Images */}
        <Carousel
          className="overflow-x-auto"
          showThumbs
          showStatus={false}
          infiniteLoop
          autoPlay
        >
          {images?.map((img, i) => (
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              key={i}
            >
              <img
                src={img}
                alt={name}
                loading="lazy"
                onLoad={() => setImgLoading(false)}
                className={`w-full h-full object-cover rounded-xl p-3 transition-all duration-300 group-hover:scale-105 ${
                  imgLoading ? "opacity-0" : "opacity-100"
                }`}
              />
            </motion.div>
          ))}
        </Carousel>

        {/* Info */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">{name}</h2>

          <div className="flex gap-3">
            <span className="text-xl font-bold">৳{discountPrice}</span>
            <span className="line-through text-gray-400">৳{price}</span>
          </div>

          {/* 👕 Shirt Size */}
          {isShirt && (
            <div>
              <h3>Select Size:</h3>
              <div className="flex gap-2">
                {["M", "L", "XL", "XXL"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={
                      size === s ? "bg-black text-white px-3" : "border px-3"
                    }
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 👟 Shoe Size */}
          {isShoe && (
            <div>
              <h3>Select Size:</h3>
              <div className="flex gap-2">
                {["39", "40", "41", "42", "43", "44"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={
                      size === s ? "bg-black text-white px-3" : "border px-3"
                    }
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 🎨 Color */}
          {colors.length > 0 && (
            <div>
              <h3>Select Color:</h3>
              <div className="flex gap-2 ">
                {colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={
                      selectedColor === c
                        ? "bg-black text-white px-3 "
                        : "border px-3"
                    }
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 🔥 Stock */}
          <p className="text-green-600 font-semibold">
            Stock Available: {currentStock}
          </p>

          {/* 🔥 Quantity Control */}
          {cartItem && (
            <div className="flex items-center gap-3 border p-2 rounded-lg bg-gray-100 dark:text-black shadow-sm">
              {/* Decrement */}
              <button
                onClick={() => handleCartDecrement(_id)}
                className="w-8 h-8 flex items-center justify-center rounded-md bg-white shadow hover:bg-red-100 active:scale-90 transition duration-150"
              >
                −
              </button>

              {/* Quantity */}
              <span className="min-w-[24px] text-center font-semibold text-gray-800">
                {quantity.quantity}
              </span>

              {/* Increment */}
              <button
                onClick={() => handleCartIncrement(_id)}
                className="w-8 h-8 flex items-center justify-center rounded-md bg-white shadow hover:bg-green-100 active:scale-90 transition duration-150"
              >
                +
              </button>
            </div>
          )}

          {/* Buttons */}
          <button
            onClick={handleBuyNow}
            className="cta-btn w-full py-2 rounded font-semibold cursor-pointer active:scale-95"
          >
            Buy Now
          </button>

          <button
            onClick={handleCartData}
            className="btn w-full border active:scale-95"
          >
            Add to Cart
          </button>

          {description && (
            <div className="bg-gray-100 p-4 whitespace-pre-line dark:text-black">
              <h1>Description</h1>
              {description}
            </div>
          )}
        </div>
      </div>

      {/* Similar */}
      <div className="max-w-6xl mx-auto mt-10">
        <h1 className="text-2xl font-bold my-4">Related Products</h1>
        <hr />
        <SimilarProductsGrid products={sameCategoryProducts} />
      </div>
    </div>
  );
};

export default ProductDetails;
