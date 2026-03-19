import React, { useContext, useState } from "react";
import { UseContext } from "../Context/AuthContext";
import useAllProduct from "../Hook/useAllProduct";
import useCart from "../Hook/useCart";
import { Link } from "react-router";
import cartImg from "../assets/assets/shopping-bag.png";

const SearchField = ({ show, setShow }) => {
  const { user } = useContext(UseContext);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const [allProduct] = useAllProduct();
  const [cart] = useCart();

  /* SEARCH HANDLER */
  const handleSearch = (value) => {
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    const filtered = allProduct.filter((product) =>
      product.name?.toLowerCase().includes(value.toLowerCase()),
    );

    setResults(filtered);
  };

  if (!show) return null;

  return (
    <div>
      <div className="fixed top-0 left-0 w-full bg-gray-300 z-50 transition-all duration-300 ease-in-out">
        {/* CLOSE BUTTON */}
        <button
          onClick={() => setShow(false)}
          className="absolute right-4 top-4 text-lg font-bold bg-red-300 px-1.5  rounded-full"
        >
          ✕
        </button>

        {/* SEARCH SECTION */}
        <div className="pt-16 pb-6 px-4 flex justify-center shadow shadow-gray-600">
          <div className="w-full max-w-xl">
            {/* INPUT + ICON */}
            <div className="flex justify-between items-center gap-4">
              <label className="input input-bordered shadow border-[#e17100] rounded-full flex items-center gap-2 w-full">
                <svg
                  className="h-5 opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="m21 21-4.3-4.3"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>

                <input
                  type="search"
                  placeholder="Search products..."
                  className="w-full outline-none"
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </label>

              {/* RIGHT SIDE */}
              <div className="flex items-center gap-3">
                {!user && (
                  <Link to="/login">
                    <button className="btn btn-ghost btn-circle">Login</button>
                  </Link>
                )}

                <Link to="/cartDetails">
                  <div className="relative">
                    <img
                      src={cartImg}
                      alt=""
                      className="w-15 hover:bg-gray-200 rounded-full"
                    />
                    <span className="badge badge-sm bg-[#e17100] text-white absolute -top-2 -right-3 rounded-full">
                      {cart.length}
                    </span>
                  </div>
                </Link>
              </div>
            </div>

            {/* SEARCH RESULT */}
            {results.length > 0 && (
              <div className="bg-white mt-3 rounded-lg shadow max-h-72 overflow-y-auto">
                {results.map((product) => (
                  <Link
                    key={product._id}
                    to={`/productDetails/${product._id}`}
                    onClick={() => {
                      setQuery("");
                      setResults([]);
                      setShow(false);
                    }}
                    className="flex items-center gap-3 p-3 hover:bg-gray-100"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />

                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">
                        TK {product.price}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* NO RESULT */}
            {query && results.length === 0 && (
              <p className="text-center text-gray-500 mt-4">No product found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchField;
