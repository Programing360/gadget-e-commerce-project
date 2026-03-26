import React, { useContext, useState } from "react";
import logo from "../../assets/assets/zeroomiro.jpeg";
import { Link, useNavigate } from "react-router";
import { UseContext } from "../../Context/AuthContext";
import loginIcon from "../../assets/Icon.png";
import loginOutIcon from "../../assets/assets/log-out (2).png";
import wishListIcon from "../../assets/assets/heart.png";
import adminIcon from "../../assets/assets/dashboard-admin.png";
import notificationIcon from "../../assets/assets/notification.png";
import userloginIcon from "../../assets/assets/user (1).png";
import useCart from "../../Hook/useCart";
import bellIcon from "../../assets/assets/bell.png";
import CashOnDelivery from "../../page/DeliveryPage/CashOnDelivery";
import SearchInput from "../../page/SearchInput/SearchInput";
import TimeAgo from "../SetTimeOut";
import { useAxiosSecure } from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import OrderPage from "../../page/DeliveryPage/OrderPage";
import CartDrawer from "../CartDrawer";
import MobileDrawer from "./MobileDrawer";

const NavBar = () => {
  const { user, UserLogout, setOpen, open, showSuccessModal } =
    useContext(UseContext);
  const navigate = useNavigate();
  const [cart, , isLoading] = useCart();
  const axiosSecure = useAxiosSecure();

  // 🔔 get notifications
  const { data: notificationsCount = [], refetch } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/notifications");
      return res.data;
    },
    // enabled: adminUser
  });
  const unreadCount = notificationsCount?.filter(
    (n) => n.isRead === false,
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
  const adminUser =
    user?.email === "fhlimon360@gmail.com" ||
    user?.email === "zeroomiro@gmail.com";

  const handleUserLogOut = () => {
    UserLogout().then(() => {
      navigate("/login");
    });
  };
  const [activeCategory, setActiveCategory] = useState("");
  // navbar animation scroll---------------

  return (
    <div className="fixed w-full top-0 z-50 bg-[#131921] ">
      <div className="navbar bg-[#f7f7f7] md:px-10 w-full mx-auto relative">
        <div className="flex-1 flex items-center">
          <MobileDrawer
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          ></MobileDrawer>
          <div className="flex justify-center md:justify-start pl-15  items-center  gap-0">
            <Link className="flex items-center gap-2" to="/">
              <img className="w-10 rounded-full" src={logo} alt="" />
              <h1 className="text-xl md:text-2xl font-bold bg-linear-to-r from-[#534d89] via-[#3f9cb6] to-[#9b9a3b] bg-clip-text text-transparent">
                Zeroo<span>m</span>
                <span>iro</span>
              </h1>
            </Link>
          </div>
        </div>
        <div className=" md:mr-6 mr-3 hidden md:block">
          <SearchInput></SearchInput>
        </div>
        {adminUser && (
          <div
            className="dropdown dropdown-end "
            onClick={handleOpenNotifications}
          >
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
                    className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-xl dark:hover:text-black"
                  >
                    <img src={bellIcon} className="w-5 mt-1" alt="bell icon"/>
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
          <div className="w-10 md:w-full md:flex items-center">
            {!open && (
              <CartDrawer
                cart={cart}
                isLoading={isLoading}
                user={user}
                setOpen={setOpen}
                formatted={formatted}
              ></CartDrawer>
            )}
            {open && <CashOnDelivery></CashOnDelivery>}
            {/* 🔥 Success Modal */}
            {showSuccessModal && <OrderPage></OrderPage>}
            {user ? (
              <div className="dropdown dropdown-end ">
                <div tabIndex={0} role="button" className=" avatar">
                  <div>
                    {user?.photoURL ? (
                      <img
                        className="rounded-full w-11 mx-auto cursor-pointer"
                        src={user?.photoURL}
                        alt="login icon"
                      />
                    ) : (
                      <img
                        className="rounded-full w-14 mx-auto cursor-pointer"
                        src={userloginIcon}
                        alt="user login icon"
                      />
                    )}
                  </div>
                </div>
                <ul
                  tabIndex="-1"
                  className="menu menu-md dropdown-content bg-base-100 rounded z-1 mt-3 p-4 shadow-2xl "
                >
                  <div className="text-center mb-4 bg-gray-300 rounded-lg p-6">
                    <h1 className="dark:text-black">{user?.email}</h1>
                    {user?.photoURL ? (
                      <img
                        className="rounded-full w-14 mx-auto mt-4"
                        src={user?.photoURL}
                        alt="user login icon"
                      />
                    ) : (
                      <img
                        className="rounded-full w-14 mx-auto mt-4"
                        src={userloginIcon}
                        alt="user login icon"
                      />
                    )}

                    <h1 className="font-bold dark:text-black">
                      {user?.displayName}
                    </h1>
                  </div>
                  <li className="">
                    <Link to="/wishList">
                      <div className="flex items-center gap-1">
                        <img className="w-4" src={wishListIcon} alt="wish list icon" />
                        <a className="justify-between font-bold">Wish List</a>
                      </div>
                    </Link>
                  </li>
                  {adminUser ? (
                    <li>
                      <Link to="/adminDashboard">
                        <div className="flex items-center gap-1">
                          <img className="w-5" src={adminIcon} alt="admin page icon" />
                          <a className="font-bold">Admin Page</a>
                        </div>
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <Link to="/userDashBoard">
                        <img className="w-5" src={userloginIcon} alt="user login icon" />
                        <a className="font-bold">Your Page</a>
                      </Link>
                    </li>
                  )}
                  <li onClick={handleUserLogOut}>
                    <div className="flex items-center border border-[#512da8] justify-center mt-6">
                      <img
                        className="w-4 dark:brightness-0 dark:invert"
                        src={loginOutIcon}
                        alt="log out icon"
                      />
                      <a className="font-bold text-[#512da8]dark:text-white">
                        Logout
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login">
                <div className="tooltip tooltip-bottom" data-tip="Account">
                  <img className="w-17 mt-2" src={loginIcon} alt="login icon" />
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
