import React from "react";
import logoIcon from "../../assets/logo.jpg";
import productIcon from "../../assets/assets/list-text.png";
import dashboardIcon from "../../assets/assets/dashboardIcon.png";
import menuList from "../../assets/assets/menulist.png";
import { NavLink, Outlet } from "react-router";
import useOrderCancelList from "../../Hook/useOrderCancelList";
import useOrderList from "../../Hook/useOrderList";

const AdminPage = () => {

  const orderCancel = useOrderCancelList()
  const orderList = useOrderList()

  return (
    <div className="drawer lg:drawer-open bg-[#010313] text-white">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      
      
      <div className="drawer-content">
        

        <nav className="navbar flex w-full bg-[#030938] fixed z-10 ">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            <img className="w-4" src={menuList} alt="" />
          </label>
          <div>
            <div className="bg-linear-to-r from-pink-500 to-violet-500 bg-clip-text text-xl font-extrabold text-transparent">
              Admin Dashboard
            </div>
          </div>
        </nav>
        

        <div className="mt-16 lg:mt-16 ">
          <Outlet></Outlet>
        </div>
      </div>

      <div className="drawer-side  is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start  lg:is-drawer-close:w-full lg:is-drawer-open:w-full bg-[#231236e0] text-white">
          
          <ul className="menu md:w-full grow w-75">
           
            <li>
              <div className="flex flex-col md:flex-row justify-center items-center gap-3 pb-10">
                <img className="w-16 rounded-full" src={logoIcon} alt="" />
                <h1 className=" text-2xl font-bold text-[#f3eeee] dark:text-white">
                  Zeroo<span className="text-[#ff4e5c]">m</span>
                  <span className="text-[#fdb529]">iro</span>
                </h1>
              </div>
              <NavLink to="/">
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3"
                  data-tip="Homepage"
                >
               
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4"
                  >
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  </svg>
                  <span className="lg:is-drawer-close:block is-drawer-close:hidden ">
                    Homepage
                  </span>
                </button>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "border rounded pl-2 bg-red-400" : ""
                }
                to="/adminDashboard"
                end
              >
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3"
                  data-tip="Dashboard"
                >
                 
                  <img className="w-4" src={dashboardIcon} alt="" />
                  <span className="lg:is-drawer-close:block is-drawer-close:hidden ">
                    Dashboard
                  </span>
                </button>
              </NavLink>
            </li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "border rounded pl-2 bg-red-400" : ""
              }
              to="/adminDashboard/AllProductList"
            >
              <li>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center"
               
                >
                  <img className="w-5 m-0" src={productIcon} alt="" />
                  <span className="is-drawer-close:hidden lg:is-drawer-close:block">
                   All Products
                  </span>
                </button>
              </li>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "border rounded pl-2 bg-red-400" : ""
              }
              to="/adminDashboard/orderCencel"
            >
              <li>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center"
               
                >
                  <img className="w-5 m-0" src={productIcon} alt="" />
                  <span className="is-drawer-close:hidden lg:is-drawer-close:block">
                   Order Cancel - {orderCancel[0]?.length}
                  </span>
                </button>
              </li>
            </NavLink>
     
            <NavLink
              className={({ isActive }) =>
                isActive ? "border rounded pl-2 bg-red-400" : ""
              }
              to="/adminDashboard/productList"
            >
              <li>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center"
                  
                >
                  <img className="w-5 m-0" src={productIcon} alt="" />
                  <span className="is-drawer-close:hidden lg:is-drawer-close:block">
                    Order List - {orderList[0]?.length}
                  </span>
                </button>
              </li>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "border rounded pl-2 bg-red-400" : ""
              }
              to="/adminDashboard/productAdd"
            >
              <li>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3"
                  
                >
                 
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4"
                  >
                    <path d="M20 7h-9"></path>
                    <path d="M14 17H5"></path>
                    <circle cx="17" cy="17" r="3"></circle>
                    <circle cx="7" cy="7" r="3"></circle>
                  </svg>
                  <span className="is-drawer-close:hidden lg:is-drawer-close:block">
                    Product Add
                  </span>
                </button>
              </li>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "border rounded pl-2 bg-red-400" : ""
              }
              to="/adminDashboard/inbox"
            >
              <li>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center"
                 
                >
                  <img className="w-5 m-0" src={productIcon} alt="" />
                  <span className="is-drawer-close:hidden lg:is-drawer-close:block">
                    Inbox
                  </span>
                </button>
              </li>
            </NavLink> 
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
