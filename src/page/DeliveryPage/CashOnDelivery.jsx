import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { UseContext } from "../../Context/AuthContext";
import useCart from "../../Hook/useCart";
import { useAxiosSecure } from "../../Hook/useAxiosSecure";
import { toast } from "react-toastify";
import moment from "moment";
import useOrderList from "../../Hook/useOrderList";

const CashOnDelivery = () => {
  const { open, setOpen, user } = useContext(UseContext);
  const [cart] = useCart();
  const [, refetch] = useOrderList();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      shipping: "dhaka",
    },
  });

  const shipping = watch("shipping");

  // যদি cart empty হয়
  if (!cart || cart.length === 0) {
    return null;
  }

  // subtotal safe calculate
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // shipping cost
  const shippingCost = shipping === "outside" ? 130 : 70;

  const total = subtotal + shippingCost;

  const onSubmit = async (data) => {
    try {
      const newDate = moment().format();

      const orderData = {
        ...data,
        cart,
        subtotal,
        shippingCost,
        total,
        newDate,
        paymentMethod: "Cash On Delivery",
        email: user?.email,
      };

      const res = await axiosSecure.post("/orders", orderData);

      if (res.data) {
        toast.success("Order Confirmed ✅");
        reset();
        refetch();
        setOpen(false);
      }
    } catch (error) {
      toast.error("Something went wrong ❌");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-3">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg max-h-[95vh] overflow-y-auto relative">
        {/* Close */}
        <button
          onClick={() => setOpen(false)}
          className="absolute right-3 top-3 btn btn-sm btn-circle"
        >
          ✕
        </button>

        <div className="p-5">
          <h2 className="text-lg md:text-xl font-bold mb-4 text-center">
            ক্যাশ অন ডেলিভারিতে অর্ডার করতে আপনার তথ্য দিন
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <input
              type="text"
              placeholder="আপনার নাম"
              className="input input-bordered w-full"
              {...register("name", { required: "নাম লিখুন" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}

            {/* Phone */}
            <input
              type="text"
              placeholder="ফোন নাম্বার"
              className="input input-bordered w-full"
              {...register("mobileNumber", {
                required: "ফোন নাম্বার দিন",
                minLength: {
                  value: 11,
                  message: "সঠিক ফোন নাম্বার দিন",
                },
              })}
            />
            {errors.mobileNumber && (
              <p className="text-red-500 text-sm">
                {errors.mobileNumber.message}
              </p>
            )}

            {/* Address */}
            <textarea
              placeholder="এড্রেস"
              className="textarea textarea-bordered w-full"
              {...register("address", { required: "এড্রেস দিন" })}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}

            {/* Shipping */}
            <div className="border rounded p-3 space-y-2 text-sm md:text-base">
              <label className="flex justify-between items-center">
                <span>
                  <input
                    type="radio"
                    value="dhaka"
                    {...register("shipping")}
                    className="mr-2"
                  />
                  ঢাকা সিটির ভিতরে
                </span>
                <span>৳70</span>
              </label>

              <label className="flex justify-between items-center">
                <span>
                  <input
                    type="radio"
                    value="ctg"
                    {...register("shipping")}
                    className="mr-2"
                  />
                  চট্টগ্রাম সিটির ভিতরে
                </span>
                <span>৳70</span>
              </label>

              <label className="flex justify-between items-center">
                <span>
                  <input
                    type="radio"
                    value="outside"
                    {...register("shipping")}
                    className="mr-2"
                  />
                  ঢাকা ও চট্টগ্রামের বাইরে
                </span>
                <span>৳130</span>
              </label>
            </div>

            {/* Cart Items */}
            <div className="max-h-40 overflow-y-auto">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-3 py-3 border-b text-sm"
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      className="w-14 h-14 rounded border object-cover"
                      alt={item.name}
                    />
                    <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>

                  <div className="flex justify-between w-full items-center">
                    <p className="font-medium">{item.name}</p>
                    <p>৳{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Summary */}
            <div className="p-3 rounded-lg bg-gray-50 space-y-2 text-sm md:text-base">
              <div className="flex justify-between">
                <span>সাব টোটাল</span>
                <span>৳{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>ডেলিভারি চার্জ</span>
                <span>৳{shippingCost}</span>
              </div>

              <div className="flex justify-between font-bold text-base md:text-lg">
                <span>মোট</span>
                <span>৳{total}</span>
              </div>
            </div>

            {/* Order Note */}
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <h1 className="font-bold md:w-32">Order Note</h1>
              <input
                type="text"
                {...register("orderNote")}
                placeholder="Order note"
                className="border border-gray-400 py-2 flex-1 rounded pl-3"
              />
            </div>

            <button type="submit" className="btn bg-cyan-500 w-full">
              অর্ডার কনফার্ম করুন
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CashOnDelivery;
