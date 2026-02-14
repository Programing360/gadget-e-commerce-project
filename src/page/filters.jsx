import { useContext, useEffect, useState } from "react";
import { UseContext } from "../Context/AuthContext";
import useAllProduct from "../Hook/useAllProduct";

const Filters = () => {
  const [allProduct] = useAllProduct();
  const { setProducts } = useContext(UseContext);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [brand, setBrand] = useState("All");

  // 🔥 Main Filter Logic
  useEffect(() => {
    let filtered = [...allProduct];

    // Search filter
    if (query.trim() !== "") {
      filtered = filtered.filter((product) =>
        product.name?.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Category filter
    if (category !== "All") {
      filtered = filtered.filter(
        (product) =>
          product.category?.toLowerCase() === category.toLowerCase()
      );
    }

    // Brand filter
    if (brand !== "All") {
      filtered = filtered.filter(
        (product) => product.brand?.toLowerCase() === brand.toLowerCase()
      );
    }

    // Price filter
    if (minPrice !== "") {
      filtered = filtered.filter(
        (product) => product.price >= Number(minPrice)
      );
    }

    if (maxPrice !== "") {
      filtered = filtered.filter(
        (product) => product.price <= Number(maxPrice)
      );
    }

    setProducts(filtered);
  }, [query, category, minPrice, maxPrice, brand, allProduct, setProducts]);

  // Clear filters
  const handleClear = () => {
    setQuery("");
    setCategory("All");
    setMinPrice("");
    setMaxPrice("");
    setBrand("All");
    setProducts(allProduct);
  };

  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {/* Search */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Search</label>
        <input
          type="text"
          placeholder="Search products..."
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Category */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          className="w-full border rounded-md px-3 py-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Laptop">Laptop</option>
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
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max ৳"
            className="w-1/2 border rounded-md px-3 py-2"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      {/* Brand */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Brand</label>
        <select
          className="w-full border rounded-md px-3 py-2"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        >
          <option value="All">All Brands</option>
          <option value="Apple">Apple</option>
          <option value="Samsung">Samsung</option>
        </select>
      </div>

      {/* Buttons */}
      <button className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700">
        Apply Filters
      </button>

      <button
        onClick={handleClear}
        className="w-full text-sm text-gray-500 mt-2 hover:underline"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default Filters;
