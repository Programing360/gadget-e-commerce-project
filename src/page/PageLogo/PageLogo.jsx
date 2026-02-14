import React from "react";
import logoIcon from "../../assets/logo.jpg";
import shippingBag from "../../assets/assets/shopping-bag.png";
import { Link } from "react-router";
import useCart from "../../Hook/useCart";

const PageLogo = () => {
  const [cart] = useCart();

  return (
    <div className="flex items-center justify-between bg-white max-w-6xl mx-auto p-4 relative">
      <div className="flex items-center justify-center gap-0">
        <Link className="flex items-center gap-2 py-3 pl-3" to="/">
          <img className="w-16 rounded-full" src={logoIcon} alt="" />
          <h1 className=" text-4xl font-bold text-[#000000]">
            Zeroo<span className="text-[#ff4e5c]">m</span>
            <span className="text-[#fdb529]">iro</span>
          </h1>
        </Link>
      </div>
      <div className="">
        <Link to="/cartDetails">
          <img
            className="w-9 bg-amber-200 rounded-lg "
            src={shippingBag}
            alt=""
          />
        </Link>
        <span className="absolute top-6 right-0 badge badge-sm indicator-item bg-amber-100">{cart.length}</span>
      </div>
    </div>
  );
};

export default PageLogo;
