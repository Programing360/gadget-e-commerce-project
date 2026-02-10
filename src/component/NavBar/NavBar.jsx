import React, { useContext } from "react";
import logo from "../../assets/logo.jpg";
import { Link, useNavigate } from "react-router";
import { UseContext } from "../../Context/AuthContext";
import loginIcon from "../../assets/Icon.png";
import loginOutIcon from "../../assets/assets/log-out.png";
import wishListIcon from "../../assets/assets/wishlist.png";
import adminIcon from "../../assets/assets/dashboard-admin.png";
import cartIcon from "../../assets/assets/shopping-bag.png";
import notificationIcon from "../../assets/assets/notification.png";
import userloginIcon from "../../assets/assets/user.png";
import dotIcon from "../../assets/assets/dots.png";
import useCart from "../../Hook/useCart";
import CartAdd from "../../page/AddToCart/CartAdd";
import bellIcon from "../../assets/assets/bell.png";
import crossIcon from "../../assets/assets/crossIcon.png";
import CashOnDelivery from "../../page/DeliveryPage/CashOnDelivery";
import SearchInput from "../../page/SearchInput/SearchInput";
import useOrderList from "../../Hook/useOrderList";
import TimeAgo from "../SetTimeOut";
import useNotifications from "../../Hook/useNotifications";
import { useAxiosSecure } from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const NavBar = () => {
  const { user, UserLogout, setOpen, open } = useContext(UseContext);
  const navigate = useNavigate();
  const [cart] = useCart();
  const [orders] = useOrderList();
  const axiosSecure = useAxiosSecure();
  // console.log(notifications)

 // 🔔 get notifications
  const {
    data: notificationsCount = [],
    refetch,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/notifications");
      return res.data;
    },
    // enabled: adminUser
  });
  const unreadCount = notificationsCount?.filter(
    (n) => n.isRead === false
  ).length;

  const handleOpenNotifications = async () => {
  try {
    await axiosSecure.patch("/notifications/read-all");
    refetch();
  } catch (error) {
    alert(error);
  }
};


  const quantity = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const formatted = quantity.toLocaleString();
  const adminUser = user?.email === "fhlimon360@gmail.com";

  const handleUserLogOut = () => {
    UserLogout().then(() => {
      navigate("/login");
    });
  };
  

  // navber animition scroll---------------

  return (
    <div className="sticky top-0 z-50 bg-white ">
      <div className="navbar bg-white md:px-10 w-full mx-auto relative">
        <div className="flex-1">
          <div className="flex items-center gap-0">
            <Link className="flex items-center" to="/">
              <img className="w-10 rounded-full" src={logo} alt="" />
              <h1 className=" md:text-2xl font-bold text-[#000000]">
                Zeroo<span className="text-[#ff4e5c]">m</span>
                <span className="text-[#fdb529]">iro</span>
              </h1>
            </Link>
          </div>
        </div>
        <div className=" md:mr-6 mr-3">
          <SearchInput></SearchInput>
        </div>
        {adminUser && (
          <div className="dropdown dropdown-end " onClick={handleOpenNotifications}>
            <div
              tabIndex={0}
              role="button"
              className="relative cursor-pointer mr-3"
              
            >
              <img
                src={notificationIcon}
                className="w-10 bg-gray-200 p-2 rounded-full"
              />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>

            <ul
              tabIndex={0}
              className="dropdown-content bg-base-100 w-72 p-3 shadow rounded-box max-h-80 overflow-y-auto"
            >
              {notificationsCount?.length > 0 ? (
                notificationsCount?.map((n) => (
                  <li
                    key={n._id}
                    className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-xl"
                  >
                    <img src={bellIcon} className="w-5 mt-1" />
                    <div>
                      <p className="text-sm font-medium">{n.message}</p>
                      <p className="text-xs text-gray-500">
                        <TimeAgo time={n.createdAt} />
                      </p>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center">
                  No notifications
                </p>
              )}
            </ul>
          </div>
        )}

        <div className="flex-none ">
          <div className="flex items-center">
            <div className="drawer drawer-end">
              <input
                id="my-drawer-5"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="mr-3 md:mr-2">
                {/* Page content here */}
                <label
                  htmlFor="my-drawer-5"
                  className="relative drawer-button cursor-pointer "
                >
                  <img
                    className={
                      user
                        ? "w-10 md:mr-1 bg-gray-200 rounded-full p-2"
                        : "w-10 bg-gray-200 rounded-full p-2"
                    }
                    src={cartIcon}
                    alt=""
                  />
                  <span className="absolute -top-2 -right-3 indicator-item text-white bg-red-500 dark:bg-black  rounded-full px-2">
                    {cart.length || 0}
                  </span>
                </label>
              </div>
              <div className="drawer-side h-full">
                <label
                  htmlFor="my-drawer-5"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>

                <ul className="menu bg-base-200 min-h-full lg:w-100 w-[350px] p-4 dark:bg-white dark:text-black">
                  {/* Sidebar content here */}

                  <div className=" h-150 overflow-auto">
                    <div className="flex justify-between items-center pb-3 bg-[#e9edf1] p-3 border-b border-gray-300 mb-6">
                      <h1 className="text-2xl font-medium">Shopping Cart</h1>
                      <label
                        className="flex justify-end"
                        htmlFor="my-drawer-5"
                        aria-label="close sidebar"
                      >
                        <img
                          className="w-5 cursor-pointer"
                          src={crossIcon}
                          alt=""
                        />
                      </label>
                    </div>
                    <CartAdd></CartAdd>
                  </div>
                  <div className="bg-gray-200 leading-16 mt-10">
                    <div className="flex justify-between items-center px-6">
                      <h2 className="text-xl text-gray-700">Subtitle:</h2>
                      <p className="">৳{formatted}</p>
                    </div>
                    <hr className="mx-6 text-gray-400" />
                    <div className="flex justify-between items-center px-6">
                      <h1 className="text-2xl font-semibold">Total</h1>
                      <p className="text-sky-800 text-sm">৳{formatted}</p>
                    </div>
                    <div className="px-4">
                      <Link to="/onlinePayment">
                        <button className="btn w-full bg-linear-0 to-[#0f1624] from-violet-600 text-white">
                          Pay Online
                        </button>
                      </Link>

                      <button
                        onClick={() => setOpen(true)}
                        className="btn w-full bg-linear-0 to-[#0f1624] from-cyan-800 text-white hover:bg-[#0f1624]"
                      >
                        Cash On Delivery
                      </button>
                    </div>
                    <Link to="/cartDetails">
                      <p className="underline text-center">View Cart</p>
                    </Link>
                  </div>
                </ul>
              </div>
            </div>
            {open && <CashOnDelivery></CashOnDelivery>}

            {user ? (
              <div className="dropdown dropdown-end ">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div>
                    <img
                      className="md:w-10 rounded-full"
                      src={userloginIcon}
                      alt="User"
                    />
                  </div>
                </div>
                <ul
                  tabIndex="-1"
                  className="menu menu-sm dropdown-content bg-base-100 rounded z-1 mt-3 p-2 shadow"
                >
                  <div className="text-center mb-4 bg-gray-300 rounded-lg p-3">
                    {user.email}
                    {user.photoURL ? (
                      <img
                        className="rounded-full w-14 mx-auto mt-4"
                        src={user?.photoURL}
                        alt=""
                      />
                    ) : (
                      <img
                        className="rounded-full w-14 mx-auto mt-4"
                        src={userloginIcon}
                        alt=""
                      />
                    )}

                    <h1 className="font-bold">{user.displayName}</h1>
                  </div>
                  <li className="">
                    <Link to="/wishList">
                      <div className="flex gap-2">
                        <img className="w-4" src={wishListIcon} alt="" />
                        <a className="justify-between">Wish List</a>
                      </div>
                    </Link>
                  </li>
                  {user.email === "fhlimon360@gmail.com" ? (
                    <li>
                      <Link to="/adminDashboard">
                        <div className="flex">
                          <img className="w-5" src={adminIcon} alt="" />
                          <a>Admin Page</a>
                        </div>
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <Link to="/userDashBoard">
                        <img className="w-5" src={userloginIcon} alt="" />
                        <a>Your Page</a>
                      </Link>
                    </li>
                  )}
                  <li onClick={handleUserLogOut}>
                    <div className="flex">
                      <img className="w-4" src={loginOutIcon} alt="" />
                      <a>Logout</a>
                    </div>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login">
                <div className="tooltip tooltip-bottom" data-tip="Account">
                  <img className="w-14 mt-2" src={loginIcon} alt="" />
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
