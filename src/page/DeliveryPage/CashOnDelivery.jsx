import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { UseContext } from "../../Context/AuthContext";
import useCart from "../../Hook/useCart";
import { useAxiosSecure } from "../../Hook/useAxiosSecure";

const CashOnDelivery = () => {
  const { open, setOpen, user } = useContext(UseContext);
  const [cart] = useCart();
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

  // 🧠 Watch shipping value
  const shipping = watch("shipping");

  // 🧮 Calculate subtotal
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  // 🚚 Calculate shipping cost (NO STATE)
  const shippingCost = shipping === "outside" ? 130 : 70;
  // 💰 Total
  const total = subtotal + shippingCost;
  // console.log(total, subtotal, cart)

  const onSubmit = (data) => {
    const orderData = {
      ...data,
      cart,
      subtotal,
      shippingCost,
      total,
      paymentMethod: "Cash On Delivery",
      email: user?.email,
    };

    console.log("COD Order Data:", orderData, cart);

    axiosSecure.post("/orders", orderData).then(res => {
      console.log(res.data)
    })
    // reset();
    // setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 overflow-y-scroll top-0 h-full">
      <div className="bg-white rounded-lg p-5 relative w-full max-w-lg ">
        {/* Close */}
        <button
          onClick={() => setOpen(false)}
          className="absolute right-3 top-3 btn btn-sm btn-circle"
        >
          ✕
        </button>

        <h2 className="text-xl w-100 mx-auto font-bold mb-4 text-center">
          ক্যাশ অন ডেলিভারিতে অর্ডার করতে আপনার তথ্য দিন
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
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
            {...register("phone", {
              required: "ফোন নাম্বার দিন",
              minLength: {
                value: 11,
                message: "সঠিক ফোন নাম্বার দিন",
              },
            })}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
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
          <div className="border rounded p-3 space-y-2">
            <label className="flex justify-between">
              <span>
                <input type="radio" value="dhaka" {...register("shipping")} />{" "}
                ঢাকা সিটির ভিতরে
              </span>
              <span>৳70</span>
            </label>

            <label className="flex justify-between">
              <span>
                <input type="radio" value="ctg" {...register("shipping")} />{" "}
                চট্টগ্রাম সিটির ভিতরে
              </span>
              <span>৳70</span>
            </label>

            <label className="flex justify-between">
              <span>
                <input type="radio" value="outside" {...register("shipping")} />{" "}
                ঢাকা ও চট্টগ্রামের বাইরে
              </span>
              <span>৳130</span>
            </label>
          </div>

          {/* Cart Items */}
          <div className="overflow-y-scroll h-50 ">
            {cart.map((item) => (
              <div key={item._id} className="flex gap-4 py-3 border-b">
                <div className="relative">
                  <img
                    src={item.image}
                    className="w-14 h-14 rounded border"
                    alt=""
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
          <div className="bg-gray-100 p-4 rounded-lg space-y-2">
            <div className="flex justify-between font-medium">
              <span>সাব টোটাল</span>
              <span>৳{subtotal}</span>
            </div>

            <div className="flex justify-between font-medium">
              <span>ডেলিভারি চার্জ</span>
              <span>৳{shippingCost}</span>
            </div>

            <div className="flex justify-between font-bold text-lg">
              <span>মোট</span>
              <span>৳{total}</span>
            </div>
          </div>
          <div className="flex items-center justify-between gap-6">
            <h1 className="font-bold">Order Note</h1>
            <input
              type="text"
              name=""
              id=""
              {...register("order")}
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
  );
};

export default CashOnDelivery;
