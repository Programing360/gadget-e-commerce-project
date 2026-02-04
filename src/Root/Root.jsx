import React, { useEffect, useState } from "react";
import NavBar from "../component/NavBar/NavBar";
import { Outlet, useLocation } from "react-router";
import Footer from "../component/Footer/Footer";
import CategoryNav from "../component/NavBar/CetagoryNav";

const Root = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // spinner duration

    return () => clearTimeout(timer);
  }, [location.pathname]);
  return (
    <div>
      <NavBar></NavBar>
      <CategoryNav></CategoryNav>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 dark:bg-black/70">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;
