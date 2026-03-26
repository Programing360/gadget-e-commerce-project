import { useForm } from "react-hook-form";
import { useAxiosSecure } from "../../Hook/useAxiosSecure";
import { toast } from "react-toastify";
import { useState } from "react";

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

  // 🔥 Handle Image Change
  const handleImageChange = (index, value) => {
    const updated = [...images];
    updated[index] = value;
    setImages(updated);
  };

  // 🔥 Add New Image Field
  const addImageField = () => {
    setImages([...images, ""]);
  };

  // 🔥 Remove Image Field
  const removeImageField = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
  };

  // 🔥 Submit
  const onSubmit = (data) => {
    data.images = images; // multiple images add

    axiosSecure.post("/productAdd", data).then((res) => {
      if (res.data) {
        toast("Publish Your Product ✅");
        reset();
        setImages([""]); // reset images
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-1 rounded-xl text-white bg-linear-0 from-indigo-500 to-pink-400 mt-[5%]">
      <div className="card bg-[#100828] shadow-xl">
        <div className="card-body">
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
                className="input input-bordered w-full border-cyan-600 bg-[#362949]"
                {...register("name", { required: "Product name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
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
                className="input input-bordered w-full border-cyan-600 bg-[#362949]"
                {...register("price", {
                  required: "Price is required",
                  min: { value: 1, message: "Price must be greater than 0" },
                })}
              />
            </div>

            {/* Discount + Stock */}
            <div className="flex gap-3">
              <input
                type="number"
                placeholder="Discount Price"
                className="input input-bordered w-full border-cyan-600 bg-[#362949]"
                {...register("discountPrice")}
              />
              <input
                type="number"
                placeholder="Discount %"
                className="input input-bordered w-full border-cyan-600 bg-[#362949]"
                {...register("discountPercentage")}
              />
              <input
                type="number"
                placeholder="Stock"
                className="input input-bordered w-full border-cyan-600 bg-[#362949]"
                {...register("stock")}
              />
            </div>

            {/* Category */}
            <div>
              <select
                className="select select-bordered w-full border-cyan-600 bg-[#362949]"
                {...register("category", { required: true })}
              >
                <option value="">Select category</option>
                <option value="electronics">Electronics</option>
                <option value="Watch">Watch</option>
                <option value="Shirt">Shirt</option>
                <option value="Laptop">Laptop</option>
                <option value="Umbrella">Umbrella</option>
              </select>
            </div>

            {/* 🔥 Multiple Images */}
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
                    className="input input-bordered w-full border-cyan-600 bg-[#362949]"
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
              className="textarea textarea-bordered w-full border-cyan-600 bg-[#362949]"
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
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}

            {/* Status */}
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register("status")} />
              Available
            </label>

            {/* Submit */}
            <button className="btn bg-indigo-500 text-white w-full">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductAdd;
