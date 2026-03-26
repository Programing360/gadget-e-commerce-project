import React from "react";
import logoIcon from "../../assets/assets/zeroomiro.jpeg";
import shippingBag from "../../assets/assets/shopping-bag.png";
import { Link } from "react-router";
import useCart from "../../Hook/useCart";

const PageLogo = () => {
  const [cart] = useCart();

  return (
    <div className="flex items-center justify-between mx-auto p-4 relative dark:bg-[#1f1345] w-full">
      <div className="container  flex items-center gap-0">
        <Link className="flex items-center gap-2 py-3 pl-3" to="/">
          <img className="w-16 rounded-full" src={logoIcon} alt="page logo" />
          <h1 className="text-xl md:text-2xl font-bold bg-linear-to-r from-[#534d89] via-[#3f9cb6] to-[#9b9a3b] bg-clip-text text-transparent">
            Zeroo<span>m</span>
            <span>iro</span>
          </h1>
        </Link>
      </div>
      <div className="">
        <Link to="/cartDetails">
          <img
            className="w-9 rounded-lg dark:bg-white"
            src={shippingBag}
            alt="shippingBag"
          />
        </Link>
        <span className="absolute top-8 right-0 badge badge-sm indicator-item rounded-full bg-red-500 text-white dark:text-white">
          {cart.length}
        </span>
      </div>
    </div>
  );
};

export default PageLogo;
