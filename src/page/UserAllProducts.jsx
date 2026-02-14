import React, { useContext, useEffect, useState } from "react";
import useAllProduct from "../Hook/useAllProduct";
import { IoIosArrowDown } from "react-icons/io";
import { Link, NavLink } from "react-router";
import Filters from "./filters";
import { UseContext } from "../Context/AuthContext";
import { useAxiosSecure } from "../Hook/useAxiosSecure";
import { toast } from "react-toastify";
import useCart from "../Hook/useCart";

const getGuestUserId = () => {
  let guestId = localStorage.getItem("guestCart");

  if (!guestId) {
    guestId = crypto.randomUUID();
    localStorage.setItem("guestCart", guestId);
  }

  return guestId;
};

const UserAllProducts = () => {
  const [allProduct] = useAllProduct();
  // const [products, setProducts] = useState([]);
  const { products, setProducts, user } = useContext(UseContext);
  const [open, setOpen] = useState(false);
  const [activeSort, setActiveSort] = useState("");
  const [cart, refetch] = useCart();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (allProduct?.length) {
      setProducts(allProduct);
    }
  }, [allProduct, setProducts]);

  const handleAToZ = () => {
    const sorted = [...products].sort((a, b) => a.name.localeCompare(b.name));
    setProducts(sorted);
  };
  const handleZToA = () => {
    const sorted = [...products].sort((a, b) => b.name.localeCompare(a.name));
    setProducts(sorted);
  };

  const handleLowToHigh = () => {
    const sorted = [...products].sort((a, b) => a.price - b.price);
    setProducts(sorted);
  };

  const handleHighToLow = () => {
    const sorted = [...products].sort((a, b) => b.price - a.price);
    setProducts(sorted);
  };

  // add To Cart---------------

  const handleCartData = async (id) => {
    const allData = allProduct?.find((product) => product._id === id);
    const userId = user ? user?.email : getGuestUserId();

    const existing = cart?.find(
      (item) => item.productId === id && item.userId === userId,
    );

    // 🟢 If product already in cart → increase quantity
    if (existing) {
      const newQty = existing.quantity + 1;
      const { data } = await axiosSecure.patch(`/cartData/${existing._id}`, {
        quantity: newQty,
      });

      if (data.modifiedCount > 0) {
        toast.success("Product quantity updated 🛒");
        refetch();
      }
      return;
    }

    // 🟢 New cart item

    //  console.log(allData)
    const cartItem = {
      productId: id,
      userId,
      name: allData.name,
      price: allData.price,
      image: allData.image,
      quantity: 1,
    };

    const res = await axiosSecure.post("/cartData", cartItem);
    if (res.data.insertedId) {
      toast.success("Product added to Cart 🛒");
      refetch();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-18 container w-11/12 mx-auto mb-10">
      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* SIDEBAR */}
        <aside className="hidden md:block md:col-span-3  bg-white md:p-4 h-screen">
          <h1 className="font-semibold text-lg">Filders</h1>
          <Filters></Filters>
        </aside>

        {/* MAIN CONTENT */}
        <main className="md:col-span-9 md:p-4 relative">
          {/* SORT HEADER */}
          <div className="flex justify-between items-center mb-4">
            <h1
              onClick={() => setOpen(!open)}
              className="font-semibold flex items-center gap-1 cursor-pointer select-none"
            >
              Best Selling <IoIosArrowDown />
            </h1>
          </div>

          {/* SORT DROPDOWN */}
          {open && (
            <ul className="menu bg-base-100 rounded-lg shadow-xl w-56 absolute z-20">
              <li>
                <button
                  onClick={() => {
                    handleAToZ();
                    setActiveSort("a-z");
                  }}
                  className={
                    activeSort === "a-z"
                      ? "active font-semibold text-blue-600"
                      : ""
                  }
                >
                  Alphabetically, A-Z
                </button>
              </li>

              <li>
                <button
                  onClick={() => {
                    handleZToA();
                    setActiveSort("z-a");
                  }}
                  className={
                    activeSort === "z-a"
                      ? "active font-semibold text-blue-600"
                      : ""
                  }
                >
                  Alphabetically, Z-A
                </button>
              </li>

              <li>
                <button
                  onClick={() => {
                    handleLowToHigh();
                    setActiveSort("low-high");
                  }}
                  className={
                    activeSort === "low-high"
                      ? "active font-semibold text-blue-600"
                      : ""
                  }
                >
                  Price, Low to High
                </button>
              </li>

              <li>
                <button
                  onClick={() => {
                    handleHighToLow();
                    setActiveSort("high-low");
                  }}
                  className={
                    activeSort === "high-low"
                      ? "active font-semibold text-blue-600"
                      : ""
                  }
                >
                  Price, High to Low
                </button>
              </li>
            </ul>
          )}

          {/* PRODUCTS GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 md:gap-5 gap-2">
            {products?.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition hover:border-indigo-600 delay-75 hover:text-blue-500  duration-150"
              >
                <Link to={`/productDetails/${item._id}`}>
                  <figure className="w-full h-48 md:h-64 overflow-hidden rounded-t-xl">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </figure>
                </Link>

                <div className="p-4 space-y-2 ">
                  <div className="flex justify-between items-start">
                    <h2 className="font-semibold text-sm line-clamp-2">
                      {item.name}
                    </h2>
                    <span className="badge badge-secondary badge-sm">NEW</span>
                  </div>
                  <div className="flex gap-4">
                    <b>৳{item.discountPrice}</b>
                    <del className="text-gray-500">{item.price}</del>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex justify-end">
                    {/* <span className="badge badge-outline badge-sm">
                      Product
                    </span> */}
                  </div>
                  <button
                    disabled={item.stock === 0}
                    onClick={() => handleCartData(item._id)}
                    className={`btn w-full rounded-none ${
                      item.stock === 0 ? "btn-disabled bg-gray-300" : "bg-[#111827] text-white"
                    }`}
                  >
                    {item.stock === 0 ? "Out of Stock" : "Quick Add"}
                  </button>
                </div>
              </div>
            ))}
            {products.length === 0 && (
              <h1 className="text-center text-gray-500 mt-4 text-2xl w-full ">
                No product found
              </h1>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserAllProducts;
