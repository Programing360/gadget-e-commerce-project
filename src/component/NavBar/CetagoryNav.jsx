import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import homeIcon from "../../assets/assets/home (2).png";
import { motion } from "motion/react";

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

  const activeClass = "text-blue-500 border-b-2 border-blue-500 pb-1";
  const normalClass = "hover:text-blue-500 transition duration-200 text-[#ff6d1f]";

  return (
    <motion.div
      layoutId="underline"
      className={`fixed top-16 left-0 w-full bg-white shadow-md z-20
      transition-transform duration-300 ease-in-out
      ${show ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="bg-[#232f3e] font-medium">
        <ul className="flex justify-center gap-6 md:gap-10 text-black py-4">

          {/* Home */}
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? activeClass : normalClass
              }
            >
              <div className="flex items-center">
                {/* <img src={homeIcon} alt="Home" className="w-5 h-5 mr-2" /> */}
                Home
              </div>
            </NavLink>
          </li>

          {/* All Products with Dropdown */}
          <li
            className="relative group"
          >
            <NavLink
              to="/userAllProduct"
              className={({ isActive }) =>
                isActive ? activeClass : normalClass
              }
            >
              All Products
            </NavLink>

            {/* {openDropdown && (
              <ul className="absolute top-6 left-0 bg-white shadow-lg rounded-md w-48 py-2">
                <li>
                  <NavLink
                    to="/category/honey"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Honey
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/category/olive-oil"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Olive Oil
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/category/black-seed"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Black Seed Oil
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/category/dates"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dates
                  </NavLink>
                </li>
              </ul>
            )} */}
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