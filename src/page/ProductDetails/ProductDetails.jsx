import React, { useContext, useEffect, useMemo, useState } from "react";
import {useLoaderData, useNavigate } from "react-router";
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
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
  const [loadingId, setLoadingId] = useState(null);
  const [size, setSize] = useState(null);
  const [currentStock, setCurrentStock] = useState(stock);
  const navigate = useNavigate();

  const isShoe = category?.toLowerCase() === "shoe";
  const isShirt = category?.toLowerCase() === "shirt";

  const quantity = cart.find((item) => item.productId === _id);

  /* 🔥 auto select color */
  const [selectedColor, setSelectedColor] = useState(null);

  const defaultColor = useMemo(() => {
    return colors?.length > 0 ? colors[0] : null;
  }, [colors]);

  const finalColor = selectedColor || defaultColor;

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

  const matchCart = cart.find((item) => item.productId === _id);

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

    const matchCart = cart.find((item) => item.productId === _id);
    if (matchCart) {
      navigate("/onlinePayment");
      return;
    }

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
  const handleCartData = async (id) => {
    try {
      setLoadingId(id);

      if ((isShirt || isShoe) && !size) {
        toast.error("Please select size 👕");
        return;
      }

      if (currentStock === 0) {
        toast.error("Selected variant is out of stock ❌");
        return;
      }

      const userId = getGuestUserId();

      const matchCart = cart.find((item) => item.productId === _id);

      if (matchCart) {
        toast.success("Product already added");
        return;
      }

      const existing = cart.find(
        (item) =>
          item.productId === _id &&
          item.size === size &&
          item.color === selectedColor,
      );

      // যদি already থাকে তাহলে quantity বাড়াবে
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
    } catch (error) {
      if (error) {
        toast.error("Something went wrong");
      }
    } finally {
      setLoadingId(null);
    }
  };

  const [loadedImages, setLoadedImages] = useState({});

  const data = useLoaderData();
  // if not get data ------------------------
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading product...</div>
      </div>
    );
  }

  // skeleton
  if (!_id) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 grid lg:grid-cols-2 gap-10 animate-pulse mt-20">
        {/* Image Skeleton */}
        <div className="w-full h-[350px] bg-gray-300 rounded-xl"></div>

        {/* Info Skeleton */}
        <div className="space-y-4">
          <div className="h-8 bg-gray-300 rounded w-2/3"></div>
          <div className="h-6 bg-gray-300 rounded w-1/3"></div>
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>

          <div className="flex gap-2">
            <div className="h-10 w-12 bg-gray-300 rounded"></div>
            <div className="h-10 w-12 bg-gray-300 rounded"></div>
            <div className="h-10 w-12 bg-gray-300 rounded"></div>
          </div>

          <div className="h-10 bg-gray-300 rounded w-full"></div>
          <div className="h-10 bg-gray-300 rounded w-full"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen mt-28">
      <SEO title={name} description={description} image={images[0]} />

      <div className="max-w-6xl mx-auto px-2 md:px-4 py-10 grid lg:grid-cols-2 gap-10">
        {/* Images */}

        <Carousel
          className="overflow-x-auto"
          showThumbs={true}
          showStatus={false}
          infiniteLoop
          autoPlay={false} // mobile এ auto slide বন্ধ
          swipeable={false}
          emulateTouch={false}
          showIndicators={true}
          renderArrowPrev={(onClickHandler, hasPrev) =>
            hasPrev && (
              <button
                onClick={onClickHandler}
                className="absolute left-3 top-1/2 z-20 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md rounded-full p-2"
              >
                <FaChevronLeft className="text-gray-700 text-sm" />
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext) =>
            hasNext && (
              <button
                onClick={onClickHandler}
                className="absolute right-3 top-1/2 z-20 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md rounded-full p-2"
              >
                <FaChevronRight className="text-gray-700 text-sm" />
              </button>
            )
          }
        >
          {images?.map((img, i) => (
            <div key={i} className="relative">
              {/* Skeleton */}
              {!loadedImages[i] && (
                <div className="w-full h-[300px] rounded-xl p-3">
                  <div className="w-full h-full bg-gray-300 animate-pulse rounded-xl"></div>
                </div>
              )}

              {/* Image */}
              <img
                src={img}
                alt={name}
                loading="lazy"
                onLoad={() =>
                  setLoadedImages((prev) => ({ ...prev, [i]: true }))
                }
                className={`w-full h-full object-cover rounded-xl p-3 transition-all duration-300 ${
                  loadedImages[i] ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
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
          {Array.isArray(colors) && colors.length > 0 && (
            <div>
              <h3>Select Color:</h3>

              <div className="flex gap-2">
                {colors.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(c)}
                    className={
                      selectedColor === c || finalColor === c
                        ? "bg-black text-white px-3"
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
          {matchCart && (
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
            disabled={stock === 0 || loadingId === _id}
            onClick={() => handleCartData(_id)}
            className={`btn w-full rounded-none border-0 text-white transition-all duration-300 ${
              stock === 0
                ? "btn-disabled bg-gray-300 text-black"
                : "bg-linear-to-r from-[#902afb] via-[#8440fd] to-[#4f46e5] hover:scale-[1.02] active:scale-95"
            }`}
          >
            {loadingId === _id ? (
              <span className="flex items-center justify-center gap-2">
                <span className="loading loading-spinner loading-sm"></span>
                Adding...
              </span>
            ) : stock === 0 ? (
              "Out of Stock"
            ) : (
              "Quick Add"
            )}
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
