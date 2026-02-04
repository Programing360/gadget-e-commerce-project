import React from "react";
import { Outlet } from "react-router";
import UserDashBoard from "./UserDashBoard";
import DashBoardFooter from "./DashBoardFooter";

const UserDashBoardHome = () => {
  return (
    <div>
      <UserDashBoard></UserDashBoard>
      <Outlet></Outlet>
      
      <div className="absolute bottom-10">
        
        <DashBoardFooter></DashBoardFooter>
      </div>
    </div>
  );
};

export default UserDashBoardHome;
