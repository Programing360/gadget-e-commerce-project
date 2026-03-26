import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { motion } from "framer-motion";

const CategoryNav = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const normalClass =
    "relative text-white hover:text-blue-400 transition-colors duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full";

  const activeClass =
    "relative text-blue-400 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-blue-400";

  return (
    <motion.div
      layout
      className={`fixed top-15 left-0 w-full z-10 backdrop-blur-md bg-black/70 transition-transform duration-300 ease-in-out ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <ul className="flex justify-center gap-6 md:gap-10 text-white py-4 font-medium">
          {/* Home */}
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? activeClass : normalClass)}>
              Home
            </NavLink>
          </li>

          {/* All Products */}
          <li>
            <NavLink
              to="/userAllProduct"
              className={({ isActive }) => (isActive ? activeClass : normalClass)}
            >
              All Products
            </NavLink>
          </li>

          {/* About */}
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? activeClass : normalClass)}>
              About
            </NavLink>
          </li>

          {/* Contact */}
          <li>
            <NavLink
              to="/contract"
              className={({ isActive }) => (isActive ? activeClass : normalClass)}
            >
              Contact Us
            </NavLink>
          </li>
        </ul>
      </div>
    </motion.div>
  );
};

export default CategoryNav;