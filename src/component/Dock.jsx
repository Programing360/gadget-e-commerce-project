import React, { useContext, useState } from "react";
import { NavLink } from "react-router";
import homeIcon from "../assets/assets/homeIcon.png";
import windowsIcon from "../assets/assets/windowsIcon.png";
import shoppingIcon from "../assets/assets/shopping-bag.png";
import dashboardIcon from "../assets/assets/dashboard.png";
import searchIcon from "../assets/assets/searchIcon.png";
import { UseContext } from "../Context/AuthContext";
import SearchField from "./SearchField";
import SearchInput from "../page/SearchInput/SearchInput";
import useCart from "../Hook/useCart";
import CartDrawer from "./CartDrawer";

const Dock = () => {
  const { user} = useContext(UseContext);
  const [showSearch, setShowSearch] = useState(false);
  const [cart] = useCart();

  return (
    <>
      {/* Search Overlay */}
      <SearchField show={showSearch} setShow={setShowSearch}></SearchField>

      {/* Dock */}
      <div className="dock bg-gray-100 md:hidden z-10">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "bg-[#d8e6f8] font-bold" : "text-gray-600"
          }
        >
          <button>
            <img className="w-6" src={homeIcon} alt="" />
          </button>
        </NavLink>

        <NavLink
          to="/userAllProduct"
          className={({ isActive }) =>
            isActive ? "bg-[#d8e6f8] font-bold" : "text-gray-600"
          }
        >
          <button>
            <img className="w-6" src={windowsIcon} alt="" />
          </button>
        </NavLink>
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer-5" className="drawer-button">
            <img className="w-6" src={shoppingIcon} alt="" />
            <span className="absolute bg-red-500 text-white px-2 rounded-full -top-0 right-4">
              {cart.length}
            </span>
          </label>
        </div>

        {/* Search Button */}
        <button onClick={() => setShowSearch(true)}>
          <img className="w-6" src={searchIcon} alt="" />
        </button>

        <NavLink
          to={
            user === "fhlimon360@gmail.com"
              ? "/adminDashbord"
              : "/userDashBoard"
          }
          className={({ isActive }) =>
            isActive ? "bg-[#d8e6f8] font-bold" : "text-gray-600"
          }
        >
          <button>
            <img className="w-6" src={dashboardIcon} alt="" />
          </button>
        </NavLink>
      </div>
    </>
  );
};

export default Dock;
