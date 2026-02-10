import { useContext, useEffect, useState } from "react";
import useAllProduct from "../Hook/useAllProduct";
import useCart from "../Hook/useCart";
import { UseContext } from "../Context/AuthContext";

const Filters = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [allProduct] = useAllProduct();
  const [cart] = useCart();
  const { products, setProducts } = useContext(UseContext);
  /* ======================
            SEARCH HANDLER
        ====================== */

    // useEffect(() => {
    //     setProducts(allProduct)
    // }, [setProducts, allProduct])

  const handleSearch = (value) => {
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    const filtered = allProduct.filter((product) =>
      product.name?.toLowerCase().includes(value.toLowerCase()),
    );
    setProducts(filtered);
  };
  return (
    <div className="w-72 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {/* Search */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Search</label>
        <input
          type="text"
          placeholder="Search products..."
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* Category */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Category</label>
        <select className="w-full border rounded-md px-3 py-2">
          <option>All Categories</option>
          <option>Electronics</option>
          <option>Fashion</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Price Range</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min ৳"
            className="w-1/2 border rounded-md px-3 py-2"
          />
          <input
            type="number"
            placeholder="Max ৳"
            className="w-1/2 border rounded-md px-3 py-2"
          />
        </div>
      </div>

      {/* Brand */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Brand</label>
        <select className="w-full border rounded-md px-3 py-2">
          <option>All Brands</option>
          <option>Apple</option>
          <option>Samsung</option>
        </select>
      </div>

      {/* On Sale */}
      <div className="flex items-center gap-2 mb-5">
        <input type="checkbox" />
        <span className="text-sm">On Sale Only</span>
      </div>

      {/* Buttons */}
      <button className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700">
        Apply Filters
      </button>

      <button className="w-full text-sm text-gray-500 mt-2 hover:underline">
        Clear Filters
      </button>
    </div>
  );
};

export default Filters;
