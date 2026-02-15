import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";

const CategoryNav = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShow(false); // scroll down
      } else {
        setShow(true); // scroll up
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed top-16 left-0 w-full z-5
      bg-white shadow-md
      transition-transform duration-300 ease-in-out
      ${show ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="bg-gray-400 sticky z-20">
        <ul className="flex justify-center gap-8 text-white py-5 relative">
          {/* Category Dropdown */}
          <li className="relative group cursor-pointer">
            <Link to="/"><span className="hover:text-yellow-300">Home</span></Link>

            {/* Dropdown */}
            {/* <ul
              className="
              absolute top-full left-0 mt-2
              bg-white text-black
              rounded-lg shadow-lg
              w-48
              opacity-0 invisible
              group-hover:opacity-100 group-hover:visible
              transition-all duration-200 z-100
            "
            >
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Electronics Shop
              </li>
              <Link to={`/userAllProducts?category=${encodeURIComponent("Laptop")}`}>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Laptop Shop
              </li>
              </Link>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Mobile Shop
              </li>
            </ul> */}
          </li>

          <Link to="/userAllProduct">
            <li className="hover:text-yellow-300 cursor-pointer">
              All Products
            </li>
          </Link>
          <Link to="/contract">
            <li className="hover:text-yellow-300 cursor-pointer">
              Contact Us
            </li>
          </Link>
          <NavLink to='/about'>
            <li className="hover:text-yellow-300 cursor-pointer">About</li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default CategoryNav;
