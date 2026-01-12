import React from "react";
import { useLoaderData } from "react-router";
import NavBar from "../../component/NavBar/NavBar";

const ProductDetails = () => {
  const { name, image, stock, price, discountPrice, description } =
    useLoaderData();
  // console.log(data)

  return (
    <div>
      <div className="bg-sky-700 text-white text-center py-7">
        <h1 className="text-2xl">{name}</h1>
        <p>Home/Product/{name}</p>
      </div>
      <div className="hero bg-base-200 min-h-screen ">
        <div className="hero-content flex-col lg:flex-row gap-10">
          <img src={image} className="w-full h-full rounded-lg shadow-2xl" />
          <div className="product-cart leading-10">
            <div className="">
              <p>
                <span className="font-semibold">Availability</span>:{" "}
                <span className="text-emerald-700">{stock} in stoke</span>
              </p>
              <h1 className="text-5xl font-bold mb-3">{name}</h1>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-primary">
                  ৳{discountPrice}
                </span>
                <span className="text-sm line-through text-gray-400">
                  ৳{price}
                </span>
              </div>
            </div>
            <div className="flex gap-4 w-full p-3 items-center">
              {/* Quantity */}
              <div className="flex items-center gap-3">
                <button className="btn btn-sm">-</button>
                <span className="min-w-[20px] text-center">0</span>
                <button className="btn btn-sm">+</button>
              </div>

              {/* Add to Cart */}
              <button className=" btn flex-1 bg-gradient-to-r from-[#c127d2] via-[#632463] to-[#5a3d99] text-white">
                Add To Cart
              </button>
            </div>

            <button className="btn w-full bg-gradient-to-r from-[#8c0fd4] via-[#301830] to-[#221b31] mt-4 text-white">
              Chat with Messenger
            </button>
            <p className="py-6 bg-gray-200 p-4 mt-4 rounded-tr-2xl rounded-bl-2xl">
              <span className="font-bold">Description: </span>
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
