import React, { useContext } from "react";
import { NavLink } from "react-router";
import homeIcon from '../assets/assets/homeIcon.png'
import windowsIcon from '../assets/assets/windowsIcon.png'
import shoppingIcon from '../assets/assets/shopping-bag.png'
import searchIcon from '../assets/assets/dashboard.png'
import { UseContext } from "../Context/AuthContext";
const Dock = () => {

    const {user} = useContext(UseContext)



  return (
    <div className="dock bg-gray-100 md:hidden z-10">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "bg-gray-200 font-bold" : "text-gray-600"
        }
      >
        <button>
          <img className="w-6" src={homeIcon} alt="" />
          
        </button>
      </NavLink>

      <NavLink to='/userAllProduct' className={({ isActive }) =>
          isActive ? "bg-gray-200 font-bold" : "text-gray-600"
        }>
        <button className="">
        <img className="w-6" src={windowsIcon} alt="" />
        
      </button>
      </NavLink>

      <NavLink to='/cartDetails' className={({ isActive }) =>
          isActive ? "bg-gray-200 font-bold" : "text-gray-600"
        }>
        <button>
        <img className="w-6" src={shoppingIcon} alt="" />
        
      </button>
      </NavLink>
      <NavLink to={user === 'fhlimon360@gmail.com' ? '/adminDashbord' : '/userDashBoard' } className={({ isActive }) =>
          isActive ? "bg-gray-200 font-bold" : "text-gray-600"
        }>
        <button >
        <img className="w-6" src={searchIcon} alt="" />
      
      </button>
      </NavLink>
    </div>
  );
};

export default Dock;
