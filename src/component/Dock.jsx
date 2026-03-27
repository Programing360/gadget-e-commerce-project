import React, { useContext, useState } from "react";
import { NavLink } from "react-router";
import homeIcon from "../assets/assets/home (c).png";
import windowsIcon from "../assets/assets/menu (c).png";
import shoppingIcon from "../assets/assets/shopping-bag (c).png";
import dashboardIcon from "../assets/assets/dashboard(c).png";
import searchIcon from "../assets/assets/search(c).png";
import { UseContext } from "../Context/AuthContext";
import SearchField from "./SearchField";
import useCart from "../Hook/useCart";

const Dock = () => {
  const { user } = useContext(UseContext);
  const [showSearch, setShowSearch] = useState(false);
  const [cart] = useCart();

  return (
    <>
      {/* 🔍 Search Overlay */}
      <SearchField show={showSearch} setShow={setShowSearch} />

      {/* 📱 Mobile Dock */}
      <div className="dock bg-gray-100 md:hidden z-50">
        
        {/* Home */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "bg-[#d8e6f8] font-bold" : "text-gray-600"
          }
        >
          <button>
            <img className="w-6" src={homeIcon} alt="Home page" />
          </button>
        </NavLink>

        {/* Products */}
        <NavLink
          to="/userAllProduct"
          className={({ isActive }) =>
            isActive ? "bg-[#d8e6f8] font-bold" : "text-gray-600"
          }
        >
          <button>
            <img className="w-6" src={windowsIcon} alt="All products" />
          </button>
        </NavLink>

        {/* Cart */}
        <div className="drawer-content relative">
          <label htmlFor="my-drawer-5" className="drawer-button">
            <img className="w-6" src={shoppingIcon} alt="Shopping cart" />
            
            {/* Cart Count */}
            <span className="absolute bg-red-500 text-white px-2 rounded-full top-2 right-5 text-md">
              {cart?.length || 0}
            </span>
          </label>
        </div>

        {/* Search */}
        <button onClick={() => setShowSearch(true)}>
          <img className="w-6" src={searchIcon} alt="Search products" />
        </button>

        {/* Dashboard */}
        <NavLink
          to={
            user?.email === "fhlimon360@gmail.com"
              ? "/adminDashboard"
              : "/userDashBoard"
          }
          className={({ isActive }) =>
            isActive ? "bg-[#d8e6f8] font-bold" : "text-gray-600"
          }
        >
          <button>
            <img className="w-6" src={dashboardIcon} alt="User dashboard" />
          </button>
        </NavLink>
      </div>
    </>
  );
};

export default Dock;