import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import menuIcon from "../../assets/assets/burger-bar.png";
import { motion } from "framer-motion";
import { UseContext } from "../../Context/AuthContext";
import useAllData from "../../Hook/useAllData";

const MobileDrawer = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 🔹 get current route
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [subDrawer, setSubDrawer] = useState({ open: false, subItems: [] });
  const [allData] = useAllData();
  const { setProducts } = useContext(UseContext);
  const dynamicCategories = [...new Set(allData?.map((p) => p.category))];

  const handleCategoryClick = (categoryName) => {
    const filtered = allData.filter(
      (product) =>
        product.category.toLowerCase() === categoryName.toLowerCase(),
    );
    setProducts(filtered);

    if (categoryName === "Clothing") {
      const uniqueSubCategories = [
        ...new Set(
          filtered
            .map((p) => p.subCategory) // subCategory map
            .filter(Boolean), // null বা undefined বাদ
        ),
      ];

      setSubDrawer({
        open: true,
        subItems: uniqueSubCategories.length
          ? uniqueSubCategories
          : ["No sub-category"], // যদি empty হয়
      });
    } else {
      setSubDrawer({ open: false, subItems: [] });
      setIsDrawerOpen(false);
      navigate(`/userAllProduct?category=${encodeURIComponent(categoryName)}`);
    }
  };
  const handleSubClick = (subItem) => {
    setSubDrawer({ open: false, subItems: [] });
    setIsDrawerOpen(false);
    navigate(
      `/userAllProduct?category=Clothing&subCategory=${encodeURIComponent(
        subItem,
      )}`,
    );
  };

  const listVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i = 1) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.08, duration: 0.25 },
    }),
  };

  // 🔹 helper to check active
  const isActive = (category) => {
    return location.search.includes(`category=${category}`);
  };

  return (
    <>
      {/* Menu Icon */}
      <div className="md:hidden flex items-center mr-4">
        <img
          src={menuIcon}
          className="w-8 cursor-pointer"
          onClick={() => setIsDrawerOpen(true)}
        />
      </div>

      {/* Backdrop */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 bg-opacity-20 z-40 md:hidden"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Main Drawer */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isDrawerOpen ? 0 : "-100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className="fixed top-0 left-0 h-full w-64 bg-white shadow-md z-50 dark:text-black md:hidden"
      >
        <div className="flex justify-between p-4 bg-purple-500 text-white border-b border-gray-200">
          <h2 className="font-semibold text-white">Categories</h2>
          <button onClick={() => setIsDrawerOpen(false)}>✕</button>
        </div>

        <ul className="p-4 space-y-2">
          {dynamicCategories.map((cat, index) => (
            <motion.li
              key={cat}
              custom={index}
              variants={listVariants}
              initial="hidden"
              animate="visible"
              className={`p-2 rounded cursor-pointer transition-all duration-200 capitalize
                ${
                  isActive(cat)
                    ? "bg-purple-200 text-purple-700 font-semibold"
                    : "hover:bg-gray-200 text-gray-700"
                }`}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Sub Drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: subDrawer.open ? 0 : "100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className="fixed top-0 left-64 h-full w-64 bg-gray-50 shadow-md z-50 md:hidden"
      >
        <div className="flex gap-5 bg-purple-500 text-white p-4 border-b border-gray-200">
          <h2 className="font-semibold text-white">Select Option</h2>
          <button onClick={() => setSubDrawer({ open: false, subItems: [] })}>
            ✕
          </button>
        </div>

        <ul className="p-4 space-y-2">
          {subDrawer.subItems.map((sub, index) => (
            <motion.li
              key={sub}
              custom={index}
              variants={listVariants}
              initial="hidden"
              animate="visible"
              className={`p-2 rounded cursor-pointer transition-all duration-200
                ${
                  isActive(sub)
                    ? "bg-purple-200 text-purple-700 font-semibold"
                    : "hover:bg-gray-200 text-gray-700"
                }`}
              onClick={() => handleSubClick(sub)}
            >
              {sub}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </>
  );
};

export default MobileDrawer;
