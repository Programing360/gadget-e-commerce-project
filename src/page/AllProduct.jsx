import React, { useEffect, useState } from "react";
import { useAxiosSecure } from "../Hook/useAxiosSecure";
import ProductCart from "./ProductCart";

const AllProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  const axiosAllProduct = useAxiosSecure();
  useEffect(() => {
    axiosAllProduct.get("/allProducts").then((res) => setAllProducts(res.data));
  }, [axiosAllProduct]);

  return (
    <div className="mt-14 container mx-11/12 mx-auto p-10 lg:p-0">
      <h1 className="text-center text-3xl font-bold">Our Products</h1>
      <p className="text-center md:w-1/2 w-11/12 mx-auto text-gray-500 mt-4">Welcome to our premium product collection where quality meets value. This page showcases carefully selected products with detailed information to help you make confident purchasing decisions. Each product card displays high-quality images, clear pricing, and attractive discount offers for better savings.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-14">
        {allProducts.map((product) => (
          <ProductCart key={product._id} product={product}></ProductCart>
        ))}
      </div>
    </div>
  );
};

export default AllProduct;
