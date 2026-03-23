import { ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";

const SimilarProductsGrid = ({ products }) => {
  const [showAll, setShowAll] = useState(false);

  // Default mobile: 2, md+: 4
  const visibleProducts = showAll ? products : products.slice(0, 2);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 ">
        {visibleProducts.map((product) => (
          <div
            key={product._id}
            className="border border-gray-300 shadow-2xl rounded-lg p-2 hover:shadow-lg transition "
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="object-contain h-40 w-full mb-2"
            />
            <h3 className="font-semibold text-sm">{product.name}</h3>
            <p className="text-primary font-bold">৳{product.discountPrice}</p>
            <Link
              to={`/productDetails/${product._id}`}
              className="btn btn-sm w-full mt-2"
            >
              View
            </Link>
          </div>
        ))}
      </div>

      {products.length > 2 && !showAll && (
        <div className="text-center mx-auto flex justify-self-center mt-4">
          <button
            className="btn btn-ghost border border-gray-400 flex justify-center items-center justify-center gap-2"
            onClick={() => setShowAll(true)}
          >
            More Products <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default SimilarProductsGrid;
