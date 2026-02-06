import React, { useEffect, useState } from "react";
import useAllProduct from "../Hook/useAllProduct";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router";

const UserAllProducts = () => {
  const [allProduct] = useAllProduct();
  const [allProducts, setAllProducts] = useState([]);
  const [open, setOpen] = useState(false);
  console.log(allProducts);
  useEffect(() => {
    if (allProduct?.length) {
      setAllProducts(allProduct);
    }
  }, [allProduct]);

  const handleAToZ = () => {
    const sorted = [...allProducts].sort((a, b) => 
      a.name.localeCompare(b.name)
  );
    setAllProducts(sorted);
  };
  const handleZToA = () => {
    const sorted = [...allProducts].sort((a, b) => 
      b.name.localeCompare(a.name)
  );
    setAllProducts(sorted);
  };

  const handleLowToHigh = () => {
    const sorted = [...allProducts].sort((a, b) => a.price - b.price);
    setAllProducts(sorted);
  };

  const handleHighToLow = () => {
    const sorted = [...allProducts].sort((a, b) => b.price - a.price);
    setAllProducts(sorted);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* SIDEBAR */}
        <aside className="hidden md:block md:col-span-2 border-r bg-white p-4">
          <h1 className="font-semibold text-lg">Sidebar</h1>
        </aside>

        {/* MAIN CONTENT */}
        <main className="md:col-span-10 p-4 relative">
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
                <button onClick={handleAToZ}>Alphabetically, A-Z</button>
              </li>
              <li>
                <button onClick={handleZToA}>Alphabetically, Z-A</button>
              </li>
              <li>
                <button onClick={handleLowToHigh}>Price, Low to High</button>
              </li>
              <li>
                <button onClick={handleHighToLow}>Price, High to Low</button>
              </li>
            </ul>
          )}

          {/* PRODUCTS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-8">
            {allProducts?.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition"
              >
                <Link to={`/productDetails/${item._id}`}>
                  <figure className="w-full h-48 md:h-64 overflow-hidden rounded-t-xl">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </figure>
                </Link>

                <div className="p-4 space-y-2">
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
                    <span className="badge badge-outline badge-sm">
                      Product
                    </span>
                  </div>
                  <button className="border w-full py-1 ">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserAllProducts;
