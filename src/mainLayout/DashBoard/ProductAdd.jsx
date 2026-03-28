import { useForm } from "react-hook-form";
import { useAxiosSecure } from "../../Hook/useAxiosSecure";
import { toast } from "react-toastify";
import { useState } from "react";
import { motion } from "framer-motion";

const ProductAdd = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure();

  // 🔥 Multiple Image State
  const [images, setImages] = useState([""]);

  // 🔥 Custom category & subcategory
  const [customCategory, setCustomCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  // 🔥 Handle Image Change
  const handleImageChange = (index, value) => {
    const updated = [...images];
    updated[index] = value;
    setImages(updated);
  };

  // 🔥 Add/Remove Image
  const addImageField = () => setImages([...images, ""]);
  const removeImageField = (index) =>
    setImages(images.filter((_, i) => i !== index));

  // 🔥 Submit
  const onSubmit = (data) => {
    data.images = images;
    data.category = customCategory || data.category;
    if (subCategory) data.subCategory = subCategory;

    axiosSecure.post("/productAdd", data).then((res) => {
      if (res.data) {
        toast.success("Publish Your Product ✅");
        reset();
        setImages([""]);
        setCustomCategory("");
        setSubCategory("");
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 rounded-xl mt-12 bg-gradient-to-r from-indigo-500 to-pink-400 shadow-xl">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="card bg-[#100828] shadow-xl"
      >
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center text-cyan-400 mb-4">
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
                className="input input-bordered w-full border-cyan-600 bg-[#362949] text-white"
                {...register("name", { required: "Product name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Price + Discount + Stock */}
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="number"
                placeholder="Price"
                className="input input-bordered w-full border-cyan-600 bg-[#362949] text-white"
                {...register("price", {
                  required: "Price is required",
                  min: { value: 1, message: "Price must be > 0" },
                })}
              />
              <input
                type="number"
                placeholder="Discount Price"
                className="input input-bordered w-full border-cyan-600 bg-[#362949] text-white"
                {...register("discountPrice")}
              />
              <input
                type="number"
                placeholder="Discount %"
                className="input input-bordered w-full border-cyan-600 bg-[#362949] text-white"
                {...register("discountPercentage")}
              />
              <input
                type="text"
                placeholder="Stock"
                className="input input-bordered w-full border-cyan-600 bg-[#362949] text-white"
                {...register("stock")}
              />
            </div>

            {/* Category + Subcategory */}
            <div className="space-y-3">
              <label className="label">
                <span className="label-text">Category</span>
              </label>

              {/* Select Category */}
              <select
                className="select select-bordered w-full border-cyan-600 bg-[#362949] text-white"
                {...register("category")}
                disabled={customCategory.length > 0}
              >
                <option value="">Select category</option>
                <option value="electronics">Electronics</option>
                <option value="watch">Watch</option>
                <option value="shirt">Shirt</option>
                <option value="laptop">Laptop</option>
                <option value="laptop">Clothing</option>
              </select>

              <p className="text-center text-sm text-gray-400">OR</p>

              {/* Custom Category */}
              <input
                type="text"
                placeholder="Add custom category"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                className="input input-bordered w-full border-cyan-600 bg-[#362949] text-white"
              />

              {/* Optional Sub-category */}
              <input
                type="text"
                placeholder="Add sub-category (optional)"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="input input-bordered w-full border-cyan-600 bg-[#362949] text-white"
              />
            </div>

            {/* Images */}
            <div>
              <label className="label">
                <span className="label-text">Product Images</span>
              </label>

              {images.map((img, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={img}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    placeholder="https://image-url.com"
                    className="input input-bordered w-full border-cyan-600 bg-[#362949] text-white"
                  />
                  {images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageField(index)}
                      className="btn btn-error"
                    >
                      X
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addImageField}
                className="btn btn-sm mt-2"
              >
                + Add Image
              </button>
            </div>

            {/* Description */}
            <textarea
              className="textarea textarea-bordered w-full border-cyan-600 bg-[#362949] text-white"
              placeholder="Write product description..."
              rows={4}
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 20,
                  message: "Minimum 20 characters",
                },
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description.message}</p>
            )}

            {/* Status */}
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register("status")} />
              Available
            </label>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn bg-indigo-500 text-white w-full mt-2"
            >
              Add Product
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductAdd;