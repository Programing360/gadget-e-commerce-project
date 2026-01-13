import React from "react";

const CategoryNav = () => {
  return (
    <div className="bg-sky-600">
      <ul className="flex justify-center gap-8 text-white py-3 relative">
        {/* Category Dropdown */}
        <li className="relative group cursor-pointer">
          <span className="hover:text-yellow-300">Category</span>

          {/* Dropdown */}
          <ul
            className="
              absolute top-full left-0 mt-2
              bg-white text-black
              rounded-lg shadow-lg
              w-48
              opacity-0 invisible
              group-hover:opacity-100 group-hover:visible
              transition-all duration-200 z-50
            "
          >
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Electronics Shop
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Clothes Shop
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Shoe Shop
            </li>
          </ul>
        </li>

        <li className="hover:text-yellow-300 cursor-pointer">All Products</li>
        <li className="hover:text-yellow-300 cursor-pointer">Pages</li>
        <li className="hover:text-yellow-300 cursor-pointer">Blog</li>
      </ul>
    </div>
  );
};

export default CategoryNav;
