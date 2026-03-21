import React from "react";
import logoIcon from "../../assets/logo.jpg";
import shippingBag from "../../assets/assets/shopping-bag.png";
import { Link } from "react-router";
import useCart from "../../Hook/useCart";

const PageLogo = () => {
  const [cart] = useCart();

  return (
    <div className="flex items-center justify-between mx-auto p-4 relative dark:bg-[#1f1345] w-full">
      <div className="container  flex items-center gap-0">
        <Link className="flex items-center gap-2 py-3 pl-3" to="/">
          <img className="w-16 rounded-full" src={logoIcon} alt="" />
          <h1 className="text-xl md:text-2xl font-bold text-[#FF6D1F]">
                Zeroo<span className="text-[#fdb529]">m</span>
                <span className="text-[#FF6D1F]">iro</span>
              </h1>
        </Link>
      </div>
      <div className="">
        <Link to="/cartDetails">
          <img
            className="w-9 rounded-lg dark:bg-white"
            src={shippingBag}
            alt=""
          />
        </Link>
        <span className="absolute top-8 right-0 badge badge-sm indicator-item rounded-full bg-red-500 text-white dark:text-white">{cart.length}</span>
      </div>
    </div>
  );
};

export default PageLogo;
