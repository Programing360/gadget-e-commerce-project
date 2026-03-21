import React, { useRef } from "react";
import laptop from "../../assets/assets/Laptop.jpg";
import electronics from '../../assets/assets/Consumer-Electronics-Appliance_blog.jpeg'
import phone from '../../assets/assets/phone.jpg'
import bravery from '../../assets/assets/bravery.jpg'
import arrow from '../../assets/assets/arrow.png'
import shoe from '../../assets/assets/photo-1560769629-975ec94e6a86.avif'
const ItemList = () => {

  const sliderRef = useRef(null);

  const products = [
    { id: 1, title: "Laptop", img: laptop },
    { id: 2, title: "Electronics", img: electronics },
    { id: 3, title: "Phone", img: phone },
    { id: 4, title: "Shoe", img: shoe },
    { id: 5, title: "Bravery", img: bravery },
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
    <div className="container mx-auto py-16 relative ">

      <h2 className="text-3xl font-bold text-center mb-10">
        Featured Products
      </h2>

      {/* Left Button */}
      <button
        onClick={slideLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:text-black"
      >
       <img className="w-4 rotate-90" src={arrow} alt="" />
      </button>

      {/* Right Button */}
      <button
        onClick={slideRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:text-black rounded-full"
      >
       <img className="w-4 -rotate-90" src={arrow} alt="" />
      </button>

      {/* Slider */}
      <div
        ref={sliderRef}
        className="flex gap-6 overflow-auto md:overflow-hidden px-12"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="
            min-w-full
            sm:min-w-[100%]
            md:min-w-[25%]
            lg:min-w-[20%]
            "
          >
            <div className="p-6 bg-white border border-gray-300 hover:shadow-xl transition overflow-auto rounded-2xl dark:text-black">

              <img
                src={product.img}
                alt={product.title}
                className="w-full md:w-58 h-50 mx-auto mb-4 object-cover"
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