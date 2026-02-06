import { useContext, useState } from "react";
import { Heart, X, Minus, Plus } from "lucide-react";
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
    image,
    discountPrice,
    description,
    stock,
  } = product;

  // const [open, setOpen] = useState(false);
  // const [qty, setQty] = useState(1);

  const axiosSecure = useAxiosSecure();
  const { user } = useContext(UseContext);
  const [cart, refetch] = useCart();
  const [wishlist, reload] = useWishList();
  // console.log(wishlist)
  /* ================= ADD TO CART ================= */
  const handleCartData = async (id) => {
    const userId = user ? user.email : getGuestUserId();

    const existing = cart.find(
      (item) => item.productId === id && item.userId === userId,
    );

    // 🟢 If product already in cart → increase quantity
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

    // 🟢 New cart item
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

    if (res.data.insertedId) {
      toast.success("Product added to Cart 🛒");
      refetch();
    }
  };

  /* ================= WISHLIST ================= */

  const isInWishlist = wishlist?.find((item) => item.productId === _id);
  // console.log(isInWishlist)

  const handleWishlist = async (id) => {
    const userId = user ? user.email : getGuestUserId();

    const existing = wishlist.find(
      (item) => item.productId === id && item.userId === userId,
    );
    console.log(existing);

    if (!user) {
      toast.error("Please login first");
      return;
    }

    if (existing) {
      toast.info("Already in wishlist ❤️");
      return;
    }

    const wishItem = {
      productId: id,
      name,
      price: discountPrice,
      quantity: 1,
      image,
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
    <div>
      {/* ================= CARD ================= */}
      <div className="relative group overflow-hidden shadow-sm hover:shadow-lg transition bg-white">
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
            -{discountPercentage}%
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={() => handleWishlist(_id)}
          className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow z-10 cursor-pointer"
        >
          {isInWishlist ? (
            <img className="w-4 " src={hearIcon} alt="wishlist" />
          ) : (
            <Heart size={16} />
          )}
        </button>

        {/* Image */}
        <div className="w-full h-48 md:h-64 overflow-hidden">
          <Link to={`/productDetails/${_id}`}>
            <img
              src={image}
              alt={name}
              loading="lazy"
              className="w-full h-full object-cover rounded-xl p-3 transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Content */}
        <div className="p-4">
          {stock === 0 && (
            <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full">
              Stock Out
            </span>
          )}
          <div className="flex justify-between items-center gap-2">
            <h3 className="font-semibold text-sm">{name}</h3>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-bold text-primary">
              ৳{discountPrice}
            </span>
            <span className="text-sm line-through text-gray-400">৳{price}</span>
          </div>
        </div>

        {/* Add to Cart */}
        <button
          disabled={stock === 0}
          onClick={() => handleCartData(_id)}
          className={`btn w-full rounded-none ${
            stock === 0 ? "btn-disabled bg-gray-300" : ""
          }`}
        >
          {stock === 0 ? "Out of Stock" : "Quick Add"}
        </button>
      </div>

      {/* ================= MODAL ================= */}
      {/* {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-4xl rounded-2xl p-6 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-500"
            >
              <X />
            </button>

            <div className="grid md:grid-cols-2 gap-6">
              <img
                src={image}
                alt={name}
                className="w-full max-h-[450px] object-contain rounded-xl"
              />

              <div>
                <h2 className="text-2xl font-bold mb-2">{name}</h2>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-primary">
                    ৳{discountPrice}
                  </span>
                  <span className="line-through text-gray-400">৳{price}</span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="p-2 border rounded-lg"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 font-semibold">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="p-2 border rounded-lg"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={() => handleCartData(_id)}
                  className="bg-cyan-600 w-full text-white px-6 py-3 rounded-xl mb-4"
                >
                  Add to Cart
                </button>

                <p className="text-sm text-gray-600">{description}</p>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default ProductCard;
