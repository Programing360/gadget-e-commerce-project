import React from "react";
import { Outlet } from "react-router";
import UserDashBoard from "./UserDashBoard";
import DashBoardFooter from "./DashBoardFooter";

const UserDashBoardHome = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top / Sidebar / Header */}
      <UserDashBoard />

      {/* Main content (this grows) */}
      <main className="flex-grow container mx-auto">
        <Outlet />
      </main>

      {/* Footer (always bottom) */}
      <footer className="container mx-auto lg:w-8/12">
        <DashBoardFooter />
      </footer>
    </div>
  );
};

export default UserDashBoardHome;
