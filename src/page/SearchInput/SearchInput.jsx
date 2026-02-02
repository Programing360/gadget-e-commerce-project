import React, { useContext, useState } from "react";
import { Link } from "react-router";

import cartImg from "../../assets/assets/shopping-bag.png";
// import loginImg from "../assets/account_circle_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.png";

import useAllProduct from "../../Hook/useAllProduct";
import useCart from "../../Hook/useCart";
import { UseContext } from "../../Context/AuthContext";

const SearchInput = () => {
  const { user } = useContext(UseContext);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [allProduct] = useAllProduct();
  const [cart] = useCart();
  /* ======================
        SEARCH HANDLER
    ====================== */
  const handleSearch = (value) => {
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    const filtered = allProduct.filter((product) =>
      product.name?.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filtered);
  };
  return (
    <div className="relative ">
      {/* TOGGLE */}
      <input id="top-drawer" type="checkbox" className="peer hidden" />

      {/* SEARCH BUTTON */}
      <label htmlFor="top-drawer" className="cursor-pointer ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 bg-gray-200 p-2 rounded-full"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </label>

      {/* TOP DRAWER */}
      <div
        className="
                fixed top-0 left-0 w-full bg-gray-300 z-50
                transform -translate-y-full
                peer-checked:translate-y-0
                transition-transform duration-300
            "
      >
        {/* CLOSE */}
        <label
          htmlFor="top-drawer"
          className="btn btn-sm absolute right-4 top-4"
        >
          ✕
        </label>

        {/* SEARCH INPUT */}
        <div className="pt-16 pb-6 px-4 flex justify-center shadow shadow-gray-600 ">
          <div className="w-full max-w-xl">
            <div className="flex justify-between items-center gap-4">
              <label
                className="
                            input input-bordered
                            shadow shadow-amber-300
                            border-[#e17100]
                            rounded-full
                            flex items-center gap-2 outline-0"
              >
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
                  className="w-full "
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </label>
              <div className="flex">
                {user ? (
                  ""
                ) : (
                  <Link to="/login">
                    <button className="btn btn-ghost btn-circle">
                      {/* <img src={loginImg} alt="" /> */}
                    </button>
                  </Link>
                )}
                <Link to='/cartDetails'>
                  <div className="relative">
                    <img
                      src={cartImg}
                      alt=""
                      className="hover:bg-[#e2e2e2] rounded-full w-8 text-white"
                    />
                    <span className="badge badge-sm shadow-2xl shadow-gray-600 bg-[#e17100] text-[#ffffff] indicator-item absolute -top-2 right-6 rounded-full">
                      {cart.length}
                    </span>
                  </div>
                </Link>
              </div>
            </div>

            {/* SEARCH RESULT */}
            {results.length > 0 && (
              <div className="bg-white mt-3 rounded-lg shadow max-h-72 overflow-y-auto dark:text-black">
                {results.map((product) => (
                  <Link
                    key={product._id}
                    to={`/productDetails/${product._id}`}
                    onClick={() => {
                      setQuery("");
                      setResults([]);
                      document.getElementById("top-drawer").checked = false;
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

export default SearchInput;