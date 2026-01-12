import { useState } from "react";
import { Heart, ZoomIn, X, Minus, Plus } from "lucide-react";
import { Link } from "react-router";

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

  return (
    <>
      {/* CARD */}
      <div className="relative group border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition">
        {/* Discount Badge */}
        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
          -{discountPercentage}%
        </span>

        {/* Wishlist */}
        <button className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow z-10 hover:text-red-500 dark:text-red-500">
          <Heart size={16} />
        </button>

        {/* Image */}
        <div className="relative">
          <Link to={`productDetails/${_id}`}>
            <img src={image} alt={name} className="w-full h-80  object-cover" />
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
        <button className="btn w-full">Quick Add</button>
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
                <Link to={`productDetails/${_id}`}>
                  <img src={image} alt={name} className="w-full rounded-xl" />
                </Link>
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
                <button className="bg-cyan-600 w-full text-white px-6 py-3 rounded-xl mb-4 hover:opacity-90">
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
