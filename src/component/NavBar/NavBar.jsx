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
import useCart from "../../Hook/useCart";
import CartAdd from "../../page/AddToCart/CartAdd";
import bellIcon from "../../assets/assets/bell.png";
import crossIcon from "../../assets/assets/crossIcon.png";
import CashOnDelivery from "../../page/DeliveryPage/CashOnDelivery";
import SearchInput from "../../page/SearchInput/SearchInput";
import { UserIcon } from "lucide-react";
import useOrderList from "../../Hook/useOrderList";

// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";
// dayjs.extend(relativeTime);
const NavBar = () => {
  const { user, UserLogout, setOpen, open } = useContext(UseContext);
  const navigate = useNavigate();
  const [cart] = useCart();
  const [orders,refetch] = useOrderList();
  // const [allProduct] = useAllProduct()

  const quantity = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const adminUser = user?.email === "fhlimon360@gmail.com";

  const handleUserLogOut = () => {
    UserLogout().then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="sticky top-0 z-50 bg-white ">
      <div className="navbar bg-white md:px-10 w-full mx-auto relative">
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
        <div className=" md:mr-8 mr-5">
          <SearchInput></SearchInput>
        </div>

        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="m-2">
            <div className="">
              <img
                className="w-10 mr-6 cursor-pointer bg-gray-200 rounded-full p-2"
                src={notificationIcon}
                alt=""
              />
              {adminUser ? (
                <span className="absolute top-0 md:right-5 right-5 bg-red-500 text-white px-2 rounded-full">
                  {orders.length}
                </span>
              ) : (
                <span className="absolute top-0 md:right-5 right-5 bg-red-500 text-white px-2 rounded-full">
                  0
                </span>
              )}
              <span className="absolute top-0 md:right-5 right-5 bg-red-500 text-white px-2 rounded-full">
                {orders.length}
              </span>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content bg-base-100 w-64 p-3 shadow rounded-box"
          >
            {orders.length === 0 ? (
              <p className="text-sm text-gray-500">No notifications</p>
            ) : (
              orders.map((order) => (
                <Link to='/adminDashboard/productList'>
                  <li
                    key={order._id}
                    className="flex items-start gap-3 pb-3 hover:bg-gray-200 p-4 rounded-2xl"
                  >
                    <img src={bellIcon} className="w-5 mt-1" alt="" />
                    <div>
                      <p className="text-sm font-medium">
                        New Order: {order.name}
                      </p>
                      <p className="text-xs text-gray-500"> {order.newDate} </p>
                    </div>
                  </li>
                </Link>
              ))
            )}
          </ul>
        </div>
        <div className="flex-none ">
          <div className="flex items-center">
            <div className="drawer drawer-end">
              <input
                id="my-drawer-5"
                type="checkbox"
                className="drawer-toggle"
              />
              <div>
                {/* Page content here */}
                <label
                  htmlFor="my-drawer-5"
                  className="relative drawer-button cursor-pointer"
                >
                  <img
                    className="w-10 mr-5 bg-gray-200 rounded-full p-2"
                    src={cartIcon}
                    alt=""
                  />
                  <span className="absolute -top-2 right-1 indicator-item text-white bg-cyan-700 dark:bg-black  rounded-full px-2">
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
                    <label
                      className="flex justify-end"
                      htmlFor="my-drawer-5"
                      aria-label="close sidebar"
                    >
                      <img
                        className="w-7 cursor-pointer"
                        src={crossIcon}
                        alt=""
                      />
                    </label>
                    <CartAdd></CartAdd>
                  </div>
                  <div className="bg-gray-200 leading-16 mt-10">
                    <div className="flex justify-between items-center px-6">
                      <h2 className="text-2xl text-cyan-700">Subtitle:</h2>
                      <p className="text-pink-600">Price: {quantity} TK</p>
                    </div>
                    <div className="px-4">
                      <Link to="/onlinePayment">
                        <button className="btn w-full bg-linear-0 to-violet-400 from-violet-600 text-white">
                          Pay Online
                        </button>
                      </Link>

                      <button
                        onClick={() => setOpen(true)}
                        className="btn w-full bg-linear-0 to-cyan-400 from-cyan-800 text-white"
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
                  className="menu menu-sm dropdown-content bg-base-100 rounded z-1 mt-3 w-52 p-2 shadow"
                >
                  <div className="text-center mb-4 bg-gray-300 rounded-lg">
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
                        src={UserIcon}
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
                      <Link to="/adminDashboard">
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
                  <img className="w-10 " src={loginIcon} alt="" />
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
