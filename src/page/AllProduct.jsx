import ProductCart from "./ProductCart";
import useAllProduct from "../Hook/useAllProduct";
import { Link } from "react-router";
import Clock from "../component/Clock/Clock";

const AllProduct = () => {
  const [allProduct, , isLoading] = useAllProduct();

  return (
    <div className="mt-14 container lg:w-10/12 mx-auto lg:p-10 p-2">
      <h1 className="text-center text-3xl text-[#111827] font-bold bg-gray-100 py-4">
        Our Products
      </h1>

      <p className="text-center w-full mx-auto text-gray-500 mt-4">
        Welcome to our premium product collection where quality meets value.
      </p>

      {/* Loading */}
      <div className="flex justify-center">
        {isLoading && (
          <span className="loading w-2/7 loading-bars loading-xl"></span>
        )}
      </div>

      {/* No Product Found */}
      {!isLoading && allProduct.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="No Product"
            className="w-32 mb-4 opacity-70"
          />
          <h2 className="text-2xl font-semibold text-gray-700">
            No Products Found
          </h2>
          <p className="text-gray-500 mt-2">
            Looks like there are no products available right now.
          </p>

          <Link to="/">
            <button className="mt-5 px-6 py-2 bg-[#f56e06] text-white rounded hover:bg-black">
              Go Home
            </button>
          </Link>
        </div>
      )}
    
      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-10 gap-2 mt-14">
        {allProduct?.map((product) => (
          <ProductCart key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProduct;