import React, { useContext, useEffect } from "react";
import { useAxiosSecure } from "../Hook/useAxiosSecure";
import ProductCart from "./ProductCart";
import { UseContext } from "../Context/AuthContext";

const AllProduct = () => {

  const {allProducts, setAllProducts} = useContext(UseContext);

  const axiosAllProduct = useAxiosSecure();
  useEffect(() => {
    axiosAllProduct.get("/allProducts").then((res) => setAllProducts(res.data));
  }, [axiosAllProduct, setAllProducts]);

  return (
    <div className="mt-14 container lg:w-10/12 mx-auto lg:p-10 p-4">
      <h1 className="text-center text-3xl text-[#111827] font-bold bg-gray-100 py-4">Our Products</h1>
      <p className="text-center w-full mx-auto text-gray-500 mt-4">Welcome to our premium product collection where quality meets value.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 md:gap-10 gap-4 mt-14">
        {allProducts.map((product) => (
          <ProductCart key={product._id} product={product}></ProductCart>
        ))}
      </div>
    </div>
  );
};

export default AllProduct;
