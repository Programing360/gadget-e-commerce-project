import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import homeIcon from "../../assets/assets/home (2).png";
import { motion } from "motion/react"
const CategoryNav = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const activeClass = "text-yellow-300 border-b-2 border-yellow-300 pb-1";

  const normalClass = "hover:text-yellow-300 transition duration-200";

  return (
    <motion.div
      layoutId="underline"
      className={`fixed top-16 left-0 w-full
      bg-white shadow-md z-20
      transition-transform duration-300 ease-in-out
      ${show ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="bg-[#1e3c96]">
        <ul className="flex justify-center gap-6 md:gap-10 text-white py-4">
          {/* Home */}
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? activeClass : normalClass
              }
            >
              <div className="flex items-center">
                <img src={homeIcon} alt="Home" className="w-5 h-5 mr-2" />
                Home
              </div>
            </NavLink>
          </li>

          {/* All Products */}
          <li>
            <NavLink
              to="/userAllProduct"
              className={({ isActive }) =>
                isActive ? activeClass : normalClass
              }
            >
              All Products
            </NavLink>
          </li>

          {/* About */}
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? activeClass : normalClass
              }
            >
              About
            </NavLink>
          </li>

          {/* Contact */}
          <li>
            <NavLink
              to="/contract"
              className={({ isActive }) =>
                isActive ? activeClass : normalClass
              }
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
