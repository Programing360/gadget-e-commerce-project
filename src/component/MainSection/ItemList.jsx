import React, { useRef } from "react";
import laptop from "../../assets/assets/Laptop.jpg";

const ItemList = () => {

  const sliderRef = useRef(null);

  const products = [
    { id: 1, title: "Laptop", img: laptop },
    { id: 2, title: "Laptop", img: laptop },
    { id: 3, title: "Laptop", img: laptop },
    { id: 4, title: "Laptop", img: laptop },
    { id: 5, title: "Laptop", img: laptop },
    { id: 6, title: "Laptop", img: laptop },
    { id: 7, title: "Laptop", img: laptop },
    { id: 8, title: "Laptop", img: laptop },
  ];

  const slideLeft = () => {
    sliderRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const slideRight = () => {
    sliderRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="container mx-auto py-16 relative">

      <h2 className="text-3xl font-bold text-center mb-10">
        Featured Products
      </h2>

      {/* Left Button */}
      <button
        onClick={slideLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg w-10 h-10 flex items-center justify-center hover:bg-gray-100"
      >
        ‹
      </button>

      {/* Right Button */}
      <button
        onClick={slideRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg w-10 h-10 flex items-center justify-center hover:bg-gray-100"
      >
        ›
      </button>

      {/* Slider */}
      <div
        ref={sliderRef}
        className="flex gap-6 overflow-hidden px-12"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="
            min-w-[50%]
            sm:min-w-[33%]
            md:min-w-[25%]
            lg:min-w-[20%]
            "
          >
            <div className="p-6 bg-white border border-gray-300 hover:shadow-lg transition">

              <img
                src={product.img}
                alt={product.title}
                className="w-28 h-20 mx-auto mb-4 object-contain"
              />

              <h3 className="text-center font-semibold">
                {product.title}
              </h3>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ItemList;