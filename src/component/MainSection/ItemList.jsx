import React, { useEffect, useState } from "react";
const ItemList = () => {
  const ITEM_WIDTH = 220;
  const products = [
    { id: 1, title: "Apple", img: "https://picsum.photos/200?1" },
    { id: 2, title: "Orange", img: "https://picsum.photos/200?2" },
    { id: 3, title: "Banana", img: "https://picsum.photos/200?3" },
    { id: 4, title: "Mango", img: "https://picsum.photos/200?4" },
    { id: 5, title: "Grapes", img: "https://picsum.photos/200?5" },
    
  ];

  const [index, setIndex] = useState(0)

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev >= products.length - 5 ? 0 : prev + 1));
//     }, 2000);

//     return () => clearInterval(interval);
//   }, []);

  return (
    <div className="w-full overflow-hidden py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10">
        Featured Products
      </h2>

      <div
        className="flex gap-6 transition-transform duration-700 ease-in-out"
        // style={{
        //   transform: `translateX(-${index * ITEM_WIDTH}px)`,
        // }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative p-10 mx-auto flex-shrink-0
                       flex flex-col items-center justify-center 
                       border border-gray-300 rounded-full
                       bg-white
                       hover:border-dotted border-4
                       "
          >
            {/* Rotating gradient circle */}
            <div
              className="
                         
                         
                         "
            ></div>

            <img
              src={product.img}
              alt={product.title}
              className="w-24 h-24 rounded-full  "
            />
            <h3 className="text-lg font-semibold z-10">{product.title}</h3>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
