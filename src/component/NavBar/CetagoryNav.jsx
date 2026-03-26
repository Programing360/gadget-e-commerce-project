import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";

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

  const normalClass =
  "relative text-white hover:text-blue-500 transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full";

const activeClass =
  "relative text-blue-500 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-blue-500";
  return (
    <div
      layoutId="underline"
      className={`fixed top-15 md:top-16 left-0 w-full bg-white shadow-md z-20
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
                <h1 className="text-white">Home</h1>
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
              <h1 className="text-white">All Products</h1>
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
              <h1 className="text-white">About</h1>
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
              <h1 className="text-white">Contact Us</h1>
            </NavLink>
          </li>

        </ul>
      </div>
    </div>
  );
};

export default CategoryNav;