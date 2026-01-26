import { useForm } from "react-hook-form";
import { useAxiosSecure } from "../../Hook/useAxiosSecure";
import { toast } from "react-toastify";

const ProductAdd = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const onSubmit = (data) => {
    // 👉 Here you can send data to backend
    axiosSecure.post("/productAdd", data).then((res) => {
      if (res.data) {
        toast("Publish Your Product");
        reset();
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-1 rounded-xl text-white bg-linear-0 from-indigo-500 to-pink-400 mt-[5%]">
      <div className="card bg-[#100828] shadow-xl">
        <div className="card-body ">
          <h2 className="text-2xl font-bold text-center text-cyan-600">
            Add New Product
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Product Name */}
            <div>
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <input
                type="text"
                placeholder="Product name"
                className="input input-bordered w-full border-cyan-600 outline-0 bg-[#362949]"
                {...register("name", { required: "Product name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                placeholder="Product price"
                className="input input-bordered w-full border-cyan-600 outline-0 bg-[#362949]"
                {...register("price", {
                  required: "Price is required",
                  min: { value: 1, message: "Price must be greater than 0" },
                })}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>
            <div className="flex justify-between gap-3 w-full">
              {/*Discount Price */}
              <div>
                <label className="label">
                  <span className="label-text">Discount Price</span>
                </label>
                <input
                  type="number"
                  placeholder="discount price"
                  className="input input-bordered w-full border-cyan-600 outline-0 bg-[#362949]"
                  {...register("discountPrice", {
                    required: "Price is required",
                    min: { value: 1, message: "Price must be greater than 0" },
                  })}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Percentage</span>
                </label>
                <input
                  type="number"
                  placeholder="Percentage"
                  className="input input-bordered w-full border-cyan-600 outline-0 bg-[#362949]"
                  {...register("discountPercentage", {
                    required: "Price is required",
                    min: { value: 1, message: "Price must be greater than 0" },
                  })}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Stock Count</span>
                </label>
                <input
                  type="number"
                  placeholder="Stoke Count"
                  className="input input-bordered w-full border-cyan-600 outline-0 bg-[#362949]"
                  {...register("stock", {
                    required: "Price is required",
                    min: { value: 1, message: "Price must be greater than 0" },
                  })}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                className="select select-bordered w-full border-cyan-600 outline-0 bg-[#362949]"
                {...register("category", { required: true })}
              >
                <option value="">Select category</option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="food">Food</option>
                <option value="home">Home Appliance</option>
              </select>
            </div>

            {/* Image URL */}
            <div>
              <label className="label">
                <span className="label-text">Image URL</span>
              </label>
              <input
                type="text"
                placeholder="https://image-url.com"
                className="input input-bordered w-full border-cyan-600 outline-0 bg-[#362949]"
                {...register("image", { required: true })}
              />
            </div>

            {/* Description */}
            <div>
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full border-cyan-600 outline-0 bg-[#362949]"
                placeholder="Product description"
                rows={4}
                {...register("description", {
                  required: "Description is required",
                })}
              ></textarea>
            </div>

            {/* Status */}
            <div className="flex items-center gap-4">
              <label className="label cursor-pointer">
                <span className="label-text mr-2">Available</span>
                <input
                  type="checkbox"
                  className="toggle toggle-success border-cyan-600 outline-0 bg-[#362949]"
                  {...register("status")}
                />
              </label>
            </div>

            {/* Submit Button */}
            <div className="card-actions justify-end">
              <button
                type="submit"
                className="btn bg-linear-0 from-[#7d63e4] to-[#9c85fb] border-cyan-600 text-white animate-btn outline-0"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductAdd;
