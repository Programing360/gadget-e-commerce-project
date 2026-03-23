import React, { useState } from "react";
import { Link } from "react-router";
import menuIcon from "../../assets/assets/burger-bar.png"; // menu icon path

const categories = [
  { name: "Shirt", sub: ["T-Shirt", "Formal Shirt", "Casual Shirt", 'Polo Shirt'] },
  { name: "Pants" },
  { name: "Shoes" },
  { name: "Accessories" },
];

const MobileDrawer = ({ setActiveCategory, activeCategory }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [subDrawer, setSubDrawer] = useState({ open: false, subItems: [] });
    
  const handleCategoryClick = (category) => {
    setActiveCategory(category.name);
    if (category.sub) {
      setSubDrawer({ open: true, subItems: category.sub });
    } else {
      setSubDrawer({ open: false, subItems: [] });
      setIsDrawerOpen(false); // close drawer if no sub-category
    }
  };

  const handleSubClick = (subItem) => {
    setActiveCategory(subItem);
    setSubDrawer({ open: false, subItems: [] });
    setIsDrawerOpen(false);
  };

  return (
    <>
      {/* Menu Icon */}
      <div className="md:hidden flex items-center mr-4">
        <img
          src={menuIcon}
          alt="Menu"
          className="w-8 cursor-pointer"
          onClick={() => setIsDrawerOpen(true)}
        />
      </div>

      {/* Main Drawer */}
      {isDrawerOpen && (
        <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transition-transform duration-300">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="font-bold text-lg">Categories</h2>
            <button onClick={() => setIsDrawerOpen(false)}>✕</button>
          </div>
          <ul className="p-4 space-y-2">
            {categories.map((cat) => (
              <li
                key={cat.name}
                className={`p-2 rounded cursor-pointer ${
                  activeCategory === cat.name ? "bg-[#FF6D1F] text-white" : ""
                }`}
                onClick={() => handleCategoryClick(cat)}
              >
                {cat.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Sub-category Drawer */}
      {subDrawer.open && (
        <div className="fixed top-0 left-64 h-full w-64 bg-gray-100 shadow-lg z-50 transition-transform duration-300">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="font-bold text-lg">Select Option</h2>
            <button onClick={() => setSubDrawer({ open: false, subItems: [] })}>
              ✕
            </button>
          </div>
          <ul className="p-4 space-y-2">
            {subDrawer.subItems.map((sub) => (
              <li
                key={sub}
                className={`p-2 rounded cursor-pointer ${
                  activeCategory === sub ? "bg-[#FF6D1F] text-white" : ""
                }`}
                onClick={() => handleSubClick(sub)}
              >
                {sub}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default MobileDrawer;