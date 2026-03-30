import React, { useContext } from "react";
import logo from "../../assets/assets/zeroomiro.jpeg";
import userLoginIcon from "../../assets/assets/user.png";
import menuBar from "../../assets/assets/menu.png";
import arrowIcon from "../../assets/assets/arrow.png";
import { Link, useNavigate } from "react-router";
import { UseContext } from "../../Context/AuthContext";
import { FaEdit } from "react-icons/fa";
import SEO from "../../component/SEO/SEO";
import { motion } from "framer-motion";

const UserDashBoard = () => {
  const { user, UserLogout } = useContext(UseContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    UserLogout();
    navigate("/");
  };

  return (
    <div className="fixed top-0 w-full z-50">
      <SEO
        title="Your Personal Page - Zeroomiro"
        description="Your personal page and details"
      />
      <motion.div
        className="flex items-center md:block gap-10 p-3 bg-linear-to-r from-[#a056dd] via-[#5c2c8a] to-[#611caf] shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Drawer */}
        <div className="drawer w-10 text-black">
          <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label htmlFor="my-drawer-1" className="drawer-button">
              <div className="block md:hidden">
                <img
                  className="w-7 invert brightness-125 "
                  src={menuBar}
                  alt="menu"
                />
              </div>
            </label>
          </div>
          <div className="drawer-side mt-20">
            <label
              htmlFor="my-drawer-1"
              className="drawer-overlay"
              aria-label="close sidebar"
            ></label>
            <motion.ul
              className="menu bg-white min-h-full w-80 p-4 shadow-xl"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* User Info */}
              <div className="flex flex-col md:flex-row items-center gap-3 mb-4">
                <img
                  className="w-10 rounded-"
                  src={userLoginIcon}
                  alt="user"
                />
                <div>
                  <h1 className="text-lg font-semibold flex items-center gap-2">
                    {user.displayName || "Guest User"} <FaEdit />
                  </h1>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <hr className="border-gray-300 mb-4" />
              {/* Navigation Links */}
              <motion.div
                className="flex flex-col gap-2"
                whileHover={{ scale: 1.02 }}
              >
                <Link to="/">
                  <h3 className="hover:bg-gray-100 p-2 rounded-lg transition">
                    Shop
                  </h3>
                </Link>
                <Link to="/userDashBoard">
                  <h3 className="font-semibold underline hover:bg-gray-100 p-2 rounded-lg transition">
                    Orders
                  </h3>
                </Link>
              </motion.div>

              {/* Footer Links */}
              <div className="mt-90">
                <hr className="border-gray-300 my-4" />
                <ul className="flex flex-col gap-2 text-gray-700">
                  <Link to="/userDashboard/profile">
                    <li className="hover:text-cyan-600 transition">Profile</li>
                  </Link>
                  <Link to="/userDashBoard/setting">
                    <li className="hover:text-cyan-600 transition">Setting</li>
                  </Link>
                  <li
                    onClick={handleSignOut}
                    className="hover:text-red-500 cursor-pointer transition"
                  >
                    Sign Out
                  </li>
                </ul>
              </div>
            </motion.ul>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="lg:container lg:w-8/12 lg:mx-auto md:block flex justify-between items-center">
          <nav className="flex justify-between items-center w-full">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img className="w-14 rounded-full" src={logo} alt="logo" />
              <span className="font-bold text-2xl animate-text-gradient bg-linear-to-r from-pink-500 via-blue-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]">
                Zeroomiro
              </span>
            </motion.div>

            {/* Desktop Links */}
            <div className="md:flex items-center gap-5 hidden">
              <Link to="/">
                <h3 className="hover:bg-white/30 p-2 rounded-lg transition text-white">
                  Shop
                </h3>
              </Link>
              <Link to="/userDashBoard">
                <h3 className="font-semibold underline hover:bg-white/30 p-2 rounded-lg transition text-white">
                  Orders
                </h3>
              </Link>
            </div>

            {/* User Dropdown */}
            <motion.div
              className="dropdown dropdown-end hidden md:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div
                tabIndex={0}
                role="button"
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 p-2 rounded-xl cursor-pointer"
              >
                <img className="w-8 rounded-full" src={userLoginIcon} alt="user" />
                <img className="w-3" src={arrowIcon} alt="arrow" />
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content menu shadow-2xl bg-white rounded-box md:w-80 p-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  <img
                    className="w-7 rounded-full"
                    src={userLoginIcon}
                    alt="user"
                  />
                  <p className="text-gray-700">{user.email}</p>
                </div>
                <hr className="my-2 border-gray-300" />
                <Link to="/userDashboard/profile">
                  <li className="hover:text-cyan-600 transition cursor-pointer">Profile</li>
                </Link>
                <Link to="/userDashBoard/setting">
                  <li className="hover:text-cyan-600 transition cursor-pointer">Setting</li>
                </Link>
                <li
                  onClick={handleSignOut}
                  className="hover:text-red-500 transition cursor-pointer"
                >
                  Sign Out
                </li>
              </ul>
            </motion.div>
          </nav>
        </div>
      </motion.div>
    </div>
  );
};

export default UserDashBoard;