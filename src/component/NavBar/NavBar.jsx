import React, { useContext } from "react";
import logo from "../../assets/logo.jpg";
import { Link, useNavigate } from "react-router";
import { UseContext } from "../../Context/AuthContext";
import loginIcon from "../../assets/Icon.png";
import cartIcon from "../../assets/assets/OrderCart.png";
import userloginIcon from "../../assets/assets/userloginIcon.png";
import useCart from "../../Hook/useCart";
import CartAdd from "../../page/AddToCart/CartAdd";

const NavBar = () => {
  const { user, UserLogout } = useContext(UseContext);
  const navigate = useNavigate();
  const [cart] = useCart()
  // console.log(cart)
  const handleUserLogOut = () => {
    UserLogout().then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="sticky top-0 z-50">
      <div className="navbar bg-white px-10 shadow-sm">
        <div className="flex-1">
          <div className="flex items-center gap-0">
            <Link className="flex items-center" to="/">
              <img className="w-10 rounded-full" src={logo} alt="" />
              <h1 className=" text-2xl font-bold text-[#000000]">
                Zeroo<span className="text-[#ff4e5c]">m</span>
                <span className="text-[#fdb529]">iro</span>
              </h1>
            </Link>
          </div>
        </div>
        <div className="flex-none ">
          <div className="flex items-center">
            <div className="drawer drawer-end">
              <input
                id="my-drawer-5"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content">
                {/* Page content here */}
                <label
                  htmlFor="my-drawer-5"
                  className="relative drawer-button cursor-pointer"
                >
                  <img className="w-8 mr-5" src={cartIcon} alt="" />
                  <span className="absolute -top-2 right-1 badge badge-sm indicator-item text-white bg-cyan-700 dark:bg-black outline-0">
                    {cart.length || 0}
                  </span> 
                </label>
              </div>
              <div className="drawer-side">
                <label
                  htmlFor="my-drawer-5"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul className="menu bg-base-200 min-h-full w-100 p-4">
                  {/* Sidebar content here */}
                  <CartAdd></CartAdd>
                </ul>
              </div>
            </div>
            {/* <div className="dropdown dropdown-end mr-4 dark:text-black">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {" "}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />{" "}
                  </svg>
                  
                </div>
              </div>
              <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow mr-4"
              ></div>
            </div> */}
            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                    className="filter bg-fuchsia-600 invert"
                      alt="Tailwind CSS Navbar component"
                      src={userloginIcon}
                    />
                  </div>
                </div>
                <ul
                  tabIndex="-1"
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <a className="justify-between">
                      User Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li onClick={handleUserLogOut}>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login">
                <div>
                  <img className="w-8" src={loginIcon} alt="" />
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
