import { useContext, useState } from "react";
import { Heart, ZoomIn, X, Minus, Plus } from "lucide-react";
import { Link } from "react-router";
import { useAxiosSecure } from "../Hook/useAxiosSecure";
import { toast } from "react-toastify";
import { UseContext } from "../Context/AuthContext";
import useCart from "../Hook/useCart";
import hearIcon from "../assets/assets/heart.png";
import useWishList from "../Hook/useWishList";
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
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(UseContext);
  // const [wishlistIcon, setWishlistIcon] = useState(null)
  const [cart, refetch] = useCart();
  const [wishlist, reload] = useWishList();
  // const notify = toast("Added to cart successfully!");
  const handleCartData = async (id) => {
    const existing = cart.find((item) => item.productId === id);
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
    localStorage.setItem("cartItem", JSON.stringify({ id }));

    axiosSecure.post("/cartData", cartItem).then((res) => {
      if (res.data.insertedId) {
        toast.success("Product added to cart 🛒");
        refetch();
      }
    });
  };

  const isInWishlist = wishlist?.find((item) => item.productId === _id);
//   useEffect(() => {
//   console.log("wishlist changed:", isInWishlist);
// }, [isInWishlist]);


  const handlewishlistCart = () => {
    const cartItem = {
      productId: _id,
      name,
      price: discountPrice,
      quantity: 1,
      image,
      email: user.email || "",
    };
    axiosSecure.post("/addWishList", cartItem).then((res) => {
      if (res.data.insertedId) {
        toast.success("Add to wishlist");
        reload();
      }
    });
  };

  return (
    <>
      {/* CARD */}
      <div className="relative group border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition">
        {/* Discount Badge */}
        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
          -{discountPercentage}%
        </span>

        {/* Wishlist */}
        <button
          onClick={() => handlewishlistCart(_id)}
          className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow z-10 hover:text-red-500 dark:text-red-500"
        >
          {isInWishlist ? (
            <img className="w-4" src={hearIcon} alt="" />
          ) : (
            <Heart size={16} />
          )}
        </button>

        {/* Image */}
        <div className="relative">
          <Link to={`productDetails/${_id}`}>
            <img src={image} alt={name} className="w-full h-80 object-cover" />
          </Link>

          {/* Hover Zoom */}
          <button
            onClick={() => setOpen(true)}
            className="absolute top-20 right-2 rounded-full  flex items-center justify-end  opacity-0 group-hover:opacity-100 transition"
          >
            <ZoomIn className="text-white" size={36} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex justify-between items-center gap-4 ">
            <h3 className="font-semibold text-sm mb-1">{name}</h3>
            {stock === 0 && (
              <p className="bg-red-600 rounded-2xl text-sm text-white px-2">
                Stock Out
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">
              ৳{discountPrice}
            </span>
            <span className="text-sm line-through text-gray-400">৳{price}</span>
          </div>
        </div>
        <button onClick={() => handleCartData(_id)} className="btn w-full">
          Quick Add
        </button>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-4xl rounded-2xl p-6 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <X />
            </button>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Image */}
              <div className="relative">
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  -{discountPercentage}%
                </span>
                <div className="">
                  <Link to={`productDetails/${_id}`}>
                    <img src={image} alt={name} className="w-full rounded-xl" />
                  </Link>
                </div>
              </div>

              {/* Right Info */}
              <div>
                <h2 className="text-2xl font-bold mb-2 dark:text-black">
                  {name}
                </h2>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-primary">
                    ৳{discountPrice}
                  </span>
                  <span className="line-through text-gray-400">৳{price}</span>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-3 mb-4 dark:text-black">
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

                {/* Add to Cart */}
                <button
                  onClick={() => handleCartData(_id)}
                  className="bg-cyan-600 w-full text-white px-6 py-3 rounded-xl mb-4 hover:opacity-90"
                >
                  Add to Cart
                </button>
                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;

/* Example Usage:
<ProductCard product={productData} />
*/
