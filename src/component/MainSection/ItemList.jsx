import React from "react";

const ItemList = () => {
  const products = [
    { id: 1, title: "Apple", img: "https://picsum.photos/200?1" },
    { id: 2, title: "Orange", img: "https://picsum.photos/200?2" },
    { id: 3, title: "Banana", img: "https://picsum.photos/200?3" },
    { id: 4, title: "Mango", img: "https://picsum.photos/200?4" },
    { id: 5, title: "Grapes", img: "https://picsum.photos/200?5" },
  ];

  return (
    <div className="w-full py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10 dark:text-black">
        Featured Products
      </h2>

      {/* Mobile Slider */}
      <div className="md:hidden overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 px-4 w-max">
          {products.map((product) => (
            <div
              key={product.id}
              className="
                min-w-[160px]
                p-6 flex-shrink-0
                flex flex-col items-center justify-center
                border-4 border-gray-300 rounded-full
                bg-white
              "
            >
              <img
                src={product.img}
                alt={product.title}
                className="w-20 h-20 rounded-full mb-2"
              />
              <h3 className="text-sm font-semibold">
                {product.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Grid */}
      <div
        className="
          hidden md:grid
          grid-cols-3 lg:grid-cols-5
          gap-6 px-6
        "
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="
              p-6 flex flex-col items-center justify-center
              border-4 border-gray-300 rounded-full
              bg-white
              hover:border-dashed transition
            "
          >
            <img
              src={product.img}
              alt={product.title}
              className="w-24 h-24 rounded-full mb-3"
            />
            <h3 className="text-lg font-semibold">
              {product.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
