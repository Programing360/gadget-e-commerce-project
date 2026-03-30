import { useContext, useState } from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { UseContext } from "../Context/AuthContext";
import { useAxiosSecure } from "../Hook/useAxiosSecure";
import useCart from "../Hook/useCart";
import useWishList from "../Hook/useWishList";
import hearIcon from "../assets/assets/heart.png";

/* ================= GUEST ID HELPER ================= */
const getGuestUserId = () => {
  let guestId = localStorage.getItem("guestCart");

  if (!guestId) {
    guestId = crypto.randomUUID();
    localStorage.setItem("guestCart", guestId);
  }

  return guestId;
};

const ProductCard = ({ product }) => {
  const {
    _id,
    name,
    price,
    discountPercentage,
    images = [],
    discountPrice,
    stock,
  } = product;

  const mainImage = images[0] || "https://via.placeholder.com/300"; // 🔥 fallback

  const axiosSecure = useAxiosSecure();
  const { user } = useContext(UseContext);
  const [cart, refetch] = useCart();
  const [wishlist, reload] = useWishList();
  const [imgLoading, setImgLoading] = useState(true);
  /* ================= ADD TO CART ================= */
  const handleCartData = async (id) => {
    const userId = getGuestUserId();

    const existing = cart?.find(
      (item) => item.productId === id && item.userId === userId,
    );

    if (existing) {
      const newQty = existing.quantity + 1;

      const { data } = await axiosSecure.patch(`/cartData/${existing._id}`, {
        quantity: newQty,
      });

      if (data.modifiedCount > 0) {
        toast.success("Product quantity updated 🛒");
        refetch();
      }
      return;
    }

    const cartItem = {
      productId: _id,
      name,
      price: discountPrice,
      quantity: 1,
      image: mainImage, // 🔥 only single image
      userId,
      email: user?.email || null,
    };

    const res = await axiosSecure.post("/cartData", cartItem);

    if (res?.data?.insertedId) {
      toast.success("Product added to Cart 🛒");
      refetch();
    }
  };

  /* ================= WISHLIST ================= */
  const isInWishlist = wishlist?.find((item) => item.productId === _id);

  const handleWishlist = async (id) => {
    const userId = getGuestUserId();

    if (!user) {
      toast.error("Please login first");
      return;
    }


    const existing = wishlist.find(
      (item) => item.productId === id,
    );

    if (existing) {
      toast.info("Already in wishlist ❤️");
      return;
    }

    const wishItem = {
      productId: id,
      name,
      price: discountPrice,
      quantity: 1,
      image: mainImage, // 🔥 fix
      email: user?.email,
      userId,
    };

    const res = await axiosSecure.post("/addWishList", wishItem);

    if (res.data.insertedId) {
      toast.success("Added to wishlist ❤️");
      reload();
    }
  };

  return (
    <div data-aos="fade-up" data-aos-anchor-placement="center-bottom">
      <div className="relative group overflow-hidden shadow-lg hover:shadow-xl transition bg-white hover:text-blue-600 dark:text-black">
        {/* Discount */}
        {discountPercentage > 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10">
            -{discountPercentage}%
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={() => handleWishlist(_id)}
          className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow z-10"
        >
          {isInWishlist ? (
            <img className="w-4" src={hearIcon} alt="wishlist" />
          ) : (
            <Heart size={16} />
          )}
        </button>

        {/* 🔥 Image */}
        <div className="w-full h-48 md:h-64 overflow-hidden relative">
          {/* 🔥 Skeleton */}
          {imgLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-xl"></div>
          )}

          <Link to={`/productDetails/${_id}`}>
            <img
              src={mainImage}
              alt={name}
              loading="lazy"
              onLoad={() => setImgLoading(false)}
              className={`w-full h-full object-cover rounded-xl p-3 transition-all duration-300 group-hover:scale-105 ${
                imgLoading ? "opacity-0" : "opacity-100"
              }`}
            />
          </Link>
        </div>

        {/* Content */}
        <div className="p-4">
          {stock === 0 && (
            <span className="text-xs bg-red-600 text-white px-2 rounded-full absolute md:top-55 top-40">
              Stock Out
            </span>
          )}
          <Link to={`/productDetails/${_id}`}>
            <h3 className="font-semibold text-sm">{name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg font-bold text-primary">
                ৳{discountPrice}
              </span>
              <span className="text-sm line-through text-gray-400">
                ৳{price}
              </span>
            </div>
          </Link>
        </div>

        {/* Button */}
        <button
          disabled={stock === 0}
          onClick={() => handleCartData(_id)}
          className={`btn w-full rounded-none border-0 text-white transition-all duration-300 ${
            stock === 0
              ? "btn-disabled bg-gray-300 text-black"
              : "bg-linear-to-r from-[#902afb] via-[#8440fd] to-[#4f46e5] hover:scale-[1.02] active:scale-95"
          }`}
        >
          {stock === 0 ? "Out of Stock" : "Quick Add"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
