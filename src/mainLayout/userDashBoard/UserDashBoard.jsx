import React, { useContext } from "react";
import PageLogo from "../../page/PageLogo/PageLogo";
import logo from "../../assets/assets/logo.jpg";
import userLoginIcon from "../../assets/assets/user.png";
import menuBar from "../../assets/assets/menu.png";
import arrowIcon from "../../assets/assets/arrow.png";
import { Link, useNavigate } from "react-router";
import { UseContext } from "../../Context/AuthContext";
import { FaEdit } from "react-icons/fa";
import SEO from "../../component/SEO/SEO";
const UserDashBoard = () => {
  const { user, UserLogout } = useContext(UseContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    UserLogout();
    navigate("/");
  };
  return (
    <div className="flex items-center md:block gap-10  p-3 fixed top-0 bg-blue-500 w-full">
      <SEO
        title="Your Personal Page - Zeroomiro"
        description="Your personal page and details"
      />
      <div className="drawer w-10">
        <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer-1" className=" drawer-button">
            <div className="block md:hidden ">
              <img className="w-7 dark:invert dark:brightness-200 " src={menuBar} alt="" />
            </div>
          </label>
        </div>
        <div className="drawer-side mt-20">
          <label
            htmlFor="my-drawer-1"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <div className="flex flex-col md:flex-row items-center gap-3">
              <img className="w-10 dark:invert dark:brightness-200" src={userLoginIcon} alt="" />
              <div>
                <h1 className="text-lg text-center md:text-start font-semibold flex items-center gap-3">
                  {user.displayName || "Guest User"} <FaEdit />
                </h1>
                <p>{user.email}</p>
              </div>
            </div>
            <hr className="mt-2 text-gray-300" />
            <div className="md:flex items-center gap-5 mt-2">
              <Link to="/">
                <h3 className="hover:bg-gray-200 p-2 rounded-lg transition decoration-1 dark:hover:text-black">
                  Shop
                </h3>
              </Link>
              <Link to="/userDashBoard">
                <h3 className="font-semibold underline hover:bg-gray-200 p-2 rounded-lg transition decoration-1 dark:hover:text-black">
                  Orders
                </h3>
              </Link>
            </div>
          </ul>

          <div className="mt-130 w-[320px]">
            <hr className="text-gray-300" />
            <ul className=" bg-base-200 p-4 leading-10">
              <Link to="/userDashboard/profile">
                <li>
                  <a>Profile</a>
                </li>
              </Link>

              <Link to="/userDashBoard/setting">
                <li>
                  <a>Setting</a>
                </li>
              </Link>

              <li onClick={handleSignOut}>
                <a>Sign Out</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="lg:container lg:w-8/12 lg:mx-auto md:block flex justify-center">
        <nav className="flex justify-between items-center">
          <div className="flex items-center gap-20">
            <div className="flex items-center justify-center md:gap-2 gap-1">
              <img className="w-14 rounded-full" src={logo} alt="" />
              <h1 className=" text-2xl font-bold text-[#fdb529]">
                Zeroo<span className="text-[#ff4e5c]">m</span>
                <span className="text-[#fdb529]">iro</span>
              </h1>
            </div>
            <div className="md:flex items-center gap-5 mt-2 hidden">
              <Link to="/">
                <h3 className="hover:bg-gray-200 p-2 rounded-lg transition decoration-1 dark:hover:text-black">
                  Shop
                </h3>
              </Link>
              <Link to="/userDashBoard">
                <h3 className="font-semibold underline hover:bg-gray-200 p-2 rounded-lg transition decoration-1 dark:hover:text-black">
                  Orders
                </h3>
              </Link>
            </div>
          </div>

          <div className="dropdown dropdown-end hidden md:block ">
            <div
              tabIndex={0}
              role="button"
              className=" m-1 flex items-center gap-2 hover:bg-gray-200 p-2 rounded-xl"
            >
              <img className="w-8" src={userLoginIcon} alt="" />
              <img className="w-3" src={arrowIcon} alt="" />
            </div>
            <ul
              tabIndex="-1"
              className="dropdown-content menu shadow-2xl bg-base-100 rounded-box md:w-80 z-1 p-4 "
            >
              <div className="flex items-center gap-3">
                <img className="w-7 dark:invert dark:brightness-200" src={userLoginIcon} alt="" />
                <p>{user.email}</p>
              </div>
              <hr className="my-2 text-gray-300" />
              <Link to="/userDashboard/profile">
                <li>
                  <a>Profile</a>
                </li>
              </Link>
              <Link to="/userDashBoard/setting">
                <li>
                  <a>Setting</a>
                </li>
              </Link>
              <li onClick={handleSignOut}>
                <a>Sign Out</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default UserDashBoard;
