import { useContext, useEffect, useState } from "react";
import { UseContext } from "../Context/AuthContext";
import useAllProduct from "../Hook/useAllProduct";

const Filters = () => {
  const [allProduct] = useAllProduct();
  const { setProducts } = useContext(UseContext);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [subCategory, setSubCategory] = useState("All"); // 🔥 NEW
  const [subCategories, setSubCategories] = useState([]); // 🔥 NEW
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [brand, setBrand] = useState("All");

  // 🔥 SubCategory generate
  useEffect(() => {
    if (category !== "All") {
      const filtered = allProduct.filter(
        (p) => p.category?.toLowerCase() === category.toLowerCase(),
      );

      const uniqueSubs = [
        ...new Set(filtered.map((p) => p.subCategory).filter(Boolean)),
      ];

      setSubCategories(uniqueSubs);
    } else {
      setSubCategories([]);
      setSubCategory("All");
    }
  }, [category, allProduct]);

  // 🔥 Main Filter Logic
  useEffect(() => {
    let filtered = [...allProduct];

    if (query.trim()) {
      filtered = filtered.filter((p) =>
        p.name?.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (category !== "All") {
      filtered = filtered.filter(
        (p) => p.category?.toLowerCase() === category.toLowerCase(),
      );
    }

    // 🔥 SubCategory filter
    if (subCategory !== "All") {
      filtered = filtered.filter(
        (p) => p.subCategory?.toLowerCase() === subCategory.toLowerCase(),
      );
    }

    if (brand !== "All") {
      filtered = filtered.filter(
        (p) => p.brand?.toLowerCase() === brand.toLowerCase(),
      );
    }

    if (minPrice) {
      filtered = filtered.filter((p) => p.price >= Number(minPrice));
    }

    if (maxPrice) {
      filtered = filtered.filter((p) => p.price <= Number(maxPrice));
    }

    setProducts(filtered);
  }, [
    query,
    category,
    subCategory,
    minPrice,
    maxPrice,
    brand,
    allProduct,
    setProducts,
  ]);

  // 🔥 Clear
  const handleClear = () => {
    setQuery("");
    setCategory("All");
    setSubCategory("All");
    setMinPrice("");
    setMaxPrice("");
    setBrand("All");
    setProducts(allProduct);
  };

  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-md dark:text-black">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {/* Category */}
      <div className="mb-4">
        <label className="block text-sm mb-1">Category</label>
        <select
          className="w-full border px-3 py-2 rounded-md"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>{" "}
          <option value="Home Appliance">Home Appliance</option>{" "}
          <option value="Electronics">Electronics</option>{" "}
          <option value="Laptop">Laptop</option>{" "}
          <option value="smartPhone">Mobile</option>{" "}
          <option value="shoe">Shoes</option>{" "}
          <option value="Bravery">Beverage</option>{" "}
          <option value="Earthen">Earthen</option>{" "}
          <option value="Watch">Watch</option>{" "}
          <option value="Clothing">Clothing</option>{" "}
          <option value="Umbrella">Umbrella</option>{" "}
          <option value="Bottle">Water Bottle</option>
        </select>
      </div>

      {/* 🔥 SubCategory (Dynamic Show) */}
      {subCategories.length > 0 && (
        <div className="mb-4">
          <label className="block text-sm mb-1">Sub Category</label>
          <select
            className="w-full border px-3 py-2 rounded-md"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="All">All Sub Categories</option>
            {subCategories.map((sub, i) => (
              <option key={i} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Price Range</label>

        {/* Range Slider */}
        <input
          type="range"
          min="0"
          max="50000"
          step="100"
          value={maxPrice || 50000}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full accent-indigo-600 bg-linear-to-r from-[#902afb] via-[#8440fd] to-[#4f46e5] text-white hover:scale-[1.02] active:scale-95"
        />

        {/* Min / Max Inputs */}
        <div className="flex gap-2 mt-3">
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

        {/* Selected Range */}
        <p className="text-sm text-gray-500 mt-1">
          ৳{minPrice || 0} - ৳{maxPrice || 500000}
        </p>
      </div>
      {/* Buttons */}
      <button className="w-full py-2 rounded-md bg-linear-to-r from-[#902afb] via-[#8440fd] to-[#4f46e5] text-white hover:scale-[1.02] active:scale-95">
        Apply Filters
      </button>

      <button
        onClick={handleClear}
        className="w-full text-sm text-gray-500 mt-2"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default Filters;
