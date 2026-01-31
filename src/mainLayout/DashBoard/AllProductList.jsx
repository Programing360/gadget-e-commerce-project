import React from "react";
import useAllProduct from "../../Hook/useAllProduct";
import crossIcon from '../../assets/assets/cross-button.png'
import { useAxiosSecure } from "../../Hook/useAxiosSecure";
import { toast } from "react-toastify";
const AllProductList = () => {
  const [allProducts,refetch] = useAllProduct();
  const axiosSecure = useAxiosSecure();
//   console.log(allProducts);
    const onRemove = (id) => {
        console.log(id)

        axiosSecure.delete(`/allProduct/${id}`).then(res => {
            if(res.data){
                toast('Product already deleted')
                refetch()
            }
        })

    }
  return (
    <div>
        <div className="bg-[#8d50f7] py-5 text-center w-full">
            <h1 className="text-2xl font-bold bg-linear-to-tl to-white from-gray-400 bg-clip-text text-transparent shadow-fuchsia-900 shadow p-4">ALL PRODUCTS </h1>
        </div>
      <div className="p-4">
        {allProducts?.map((product) => (
          <div className="flex items-center justify-between gap-4 p-3 mb-5 border border-gray-500 rounded-lg">
            {/* Left Side: Image + Info */}
            <div className="flex items-center gap-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-14 h-14 object-cover rounded-md"
              />

              <div>
                <h4 className="font-semibold text-sm">{product.name}</h4>
                <p className="text-gray-500 text-sm">৳{product.price}</p>
              </div>
            </div>

            {/* Right Side: Cross Icon */}
            <button
              onClick={() => onRemove(product._id)}
              className="text-gray-400 hover:text-red-500 transition btn btn-ghost"
            >
              <img className="w-6" src={crossIcon} alt="" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProductList;
