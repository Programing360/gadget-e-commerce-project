import React, { useEffect, useState } from "react";
import NavBar from "../component/NavBar/NavBar";
import { Outlet, useLocation } from "react-router";
import Footer from "../component/Footer/Footer";
import CategoryNav from "../component/NavBar/CetagoryNav";
import ScrollToTop from "../page/ScrollToTop";
import Dock from "../component/Dock";
import Clock from "../component/Clock/Clock";
import upArrowIcon from "../assets/assets/up-arrow.png";
import AutoReloadOnRouteChange from "../page/AutoReloadOnRouteChange/AutoReloadOnRouteChange";
import TrackPage from "../page/TrackPage/TrackPage";

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
  const [showArrow, setShowArrow] = useState(false);

  // detect scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      <div className="fixed top-40 left-0 shadow-2xl p-3 z-100 hidden md:block">
        <Clock></Clock>
      </div>
      <TrackPage></TrackPage>
      <AutoReloadOnRouteChange></AutoReloadOnRouteChange>
      <ScrollToTop></ScrollToTop>
      <NavBar></NavBar>
      <CategoryNav></CategoryNav>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="w-16 h-16 border-4 border-cyan-700 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <Outlet></Outlet>
      {showArrow && (
        <img
          onClick={scrollToTop}
          className="w-15 z-10 hover:scale-110 cursor-pointer fixed bottom-30 right-10 hover:shadow rounded-full hover:shadow-indigo-400 bg-[#fc8934] transition delay-75 duration-150"
          src={upArrowIcon}
          alt="scroll to top"
        />
      )}
      <Dock></Dock>
      <Footer></Footer>
    </div>
  );
};

export default Root;
