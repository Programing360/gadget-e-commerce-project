import React, { useState } from "react";
import useAllProduct from "../Hook/useAllProduct";
import { IoIosArrowDown } from "react-icons/io";
const UserAllProducts = () => {
  const [allProduct] = useAllProduct();
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen">
      {/* Main layout */}
      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* Sidebar */}
        <div className="hidden md:block md:col-span-2 border-r p-4">
          <h1 className="font-semibold">Sidebar</h1>
        </div>

        {/* Products */}
        <div className="md:col-span-10 p-4">
          <h1
            onClick={() => setOpen(!open)}
            className=" font-semi-bold flex items-center gap-1"
          >
            Best selling <IoIosArrowDown />
          </h1>
          {open ? (
            <ul className="menu bg-base-200 rounded-b-lg shadow-2xl absolute mt-2">
              <li>
                <a>Alphabetically, A-Z</a>
              </li>
              <li>
                <a>Alphabetically, Z-A</a>
              </li>
              <li>
                <a>Price, Low to High</a>
              </li>
              <li>
                <a>Price, High to Low</a>
              </li>
            </ul>
          ) : (
            ""
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
            {allProduct?.map((item) => (
              <div key={item._id} className=" bg-base-100 shadow-md">
                <figure className="h-48">
                  <img src={item.image} alt={item.title} className="" />
                </figure>

                <div className="card-body">
                  <h2 className="card-title">
                    {item.name}
                    <div className="badge badge-secondary">NEW</div>
                  </h2>

                  <p className="text-sm text-gray-600">
                    {item.description?.slice(0, 80)}...
                  </p>

                  <div className="card-actions justify-end">
                    <div className="badge badge-outline">Product</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAllProducts;
