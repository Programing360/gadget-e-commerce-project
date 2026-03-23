import { useForm } from "react-hook-form";
import useCart from "../../Hook/useCart";
import OrderSummary from "./OrderSummary";
import { UseContext } from "../../Context/AuthContext";
import { useContext, useMemo, useState, useEffect } from "react";
import {
  Truck,
  MapPin,
  Store,
  CreditCard,
  ShieldCheck,
  Smartphone,
  Clock,
} from "lucide-react";
import { useAxiosSecure } from "../../Hook/useAxiosSecure";
import { toast } from "react-toastify";
import moment from "moment";
import { useNavigate } from "react-router";
import SEO from "../../component/SEO/SEO";
import cashIcon from "../../assets/assets/cash-on-delivery.png";
import OnlineIcon from "../../assets/assets/card.png";
import bkash from "../../assets/assets/bkash.png";

const transactionId = "TXN-" + Date.now();
const CheckoutForm = () => {
  const { register, handleSubmit, setValue } = useForm();
  const axiosSecure = useAxiosSecure();
  const { deliveryArea, setDeliveryArea, user } = useContext(UseContext);
  const [cart] = useCart();
  const navigate = useNavigate();
  let guestId = localStorage.getItem("guestCart");
  const orderId = Date.now().toString().slice(-6);

  // 🔥 Auto Fill user data
  useEffect(() => {
    if (user) {
      setValue("fullName", user.displayName || "");
      setValue("mobile", user.phoneNumber || "");
      setValue("email", user.email || "");
    }
  }, [user, setValue]);

  // 🔥 Price calculation
  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  const deliveryCharge =
    deliveryArea === "inside" ? 50 : deliveryArea === "outside" ? 17 : 0;

  const total = subtotal + deliveryCharge;

  const partialAmount = (subtotal * 0.1 + deliveryCharge).toFixed(0);
  const remaining = (total - partialAmount).toFixed(0);

  const [paymentType, setPaymentType] = useState("full");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const newDate = moment().format();
  // 🔥 Submit
  const onSubmit = (data) => {
    const orderData = {
      ...data,
      name: data.fullName,
      cart,
      deliveryArea,
      paymentMethod,
      paymentType,
      subtotal,
      shippingCost: deliveryCharge,
      total,
      mobileNumber: data.mobile,
      newDate,
      transactionId,
      email: user?.email || null,
      guestId,
      orderId,
      payNow: paymentType === "partial" ? partialAmount : total,
    };

    axiosSecure.post("/orders", orderData).then((res) => {
      if (res.data) {
        navigate("/invoicePage", {
          state: { order: orderData },
        });
        toast.success("Order Confirmed ✅");
      }
    });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 dark:bg-[#0d0518]">
      <SEO
        title="Checkout Page - Zeroomiro"
        description="Review your cart items and checkout"
      />


      {!user && (
        <div className="flex justify-between items-center p-2 mb-4 border-gray-400 shadow-2xl">
          <h1>Have any account? please login or register</h1>
          <div>
            <button className="border px-6 py-1 rounded-md cursor-pointer border-purple-400 hover:bg-purple-300 hover:text-white transition mr-4">
              Login
            </button>
            <button className="border px-6 py-1 rounded-md cursor-pointer border-purple-400 bg-purple-300 text-white transition">
              Register
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded shadow dark:text-white dark:bg-[#140b1e]">
          <h2 className="text-2xl font-bold mb-6">Checkout</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Customer Info */}
            <div>
              <h3 className="font-semibold mb-3">Customer Information</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <input
                  {...register("fullName", { required: true })}
                  placeholder="Full Name"
                  className="border p-2 rounded w-full"
                />

                {/* Mobile */}
                <input
                  {...register("mobile", { required: true })}
                  placeholder="Mobile Number"
                  className="border p-2 rounded w-full"
                />

                {/* Email (auto + readonly) */}
                <input
                  {...register("email")}
                  readOnly
                  className="border p-2 rounded w-full bg-gray-100 dark:bg-black cursor-not-allowed"
                />
              </div>

              {/* Address */}
              <textarea
                {...register("address", { required: true })}
                placeholder="Delivery Address"
                className="border p-2 rounded w-full mt-4"
              />
            </div>

            {/* Delivery Area */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Select Delivery Area
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div
                  onClick={() => setDeliveryArea("pickup")}
                  className={`border rounded-lg p-4 cursor-pointer tab-disabled ${
                    deliveryArea === "pickup"
                      ? "border-blue-500 bg-blue-50 dark:text-black"
                      : "border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-2 ">
                    <Store size={18} />
                    <p className="font-medium">Office Pickup</p>
                  </div>
                  <p className="text-sm text-gray-500">Free</p>
                </div>

                <div
                  onClick={() => setDeliveryArea("inside")}
                  className={`border rounded-lg p-4 cursor-pointer ${
                    deliveryArea === "inside"
                      ? "border-blue-500 bg-blue-50 dark:text-black"
                      : "border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MapPin size={18} />
                    <p className="font-medium">Inside Dhaka</p>
                  </div>
                  <p className="text-sm text-gray-500">৳50</p>
                </div>

                <div
                  onClick={() => setDeliveryArea("outside")}
                  className={`border rounded-lg p-4 cursor-pointer ${
                    deliveryArea === "outside"
                      ? "border-blue-500 bg-blue-50 dark:text-black"
                      : "border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Truck size={18} />
                    <p className="font-medium">Delivery Charge</p>
                  </div>
                  <p className="text-lg font-bold text-gray-500 ">৳17</p>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Payment Method</h3>

              {/* Full / Partial */}
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={paymentType === "full"}
                    onChange={() => setPaymentType("full")}
                  />
                  Full Payment
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={paymentType === "partial"}
                    onChange={() => setPaymentType("partial")}
                  />
                  Partial Payment (10%)
                </label>
              </div>

              {paymentType === "partial" && (
                <div className="bg-blue-50 p-3 rounded text-sm mb-4 dark:text-black">
                  <p>Pay Now: ৳{partialAmount}</p>
                  <p>Remaining: ৳{remaining}</p>
                </div>
              )}

              {/* Payment Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div
                  onClick={() => setPaymentMethod("cod")}
                  className={`border rounded-lg p-4 cursor-pointer ${
                    paymentMethod === "cod"
                      ? "border-blue-500 bg-blue-50 dark:text-black"
                      : "border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <img className="w-8" src={cashIcon} alt="" />
                    <p className="font-medium">Cash On Delivery</p>
                  </div>
                </div>

                <div
                  onClick={() => setPaymentMethod("bkash")}
                  className={`border rounded-lg p-4 cursor-pointer btn-disabled ${
                    paymentMethod === "bkash"
                      ? "border-blue-500 bg-blue-50 dark:text-black"
                      : "border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <img className="w-8" src={bkash} alt="" />
                    <p className="font-medium">bKash</p>
                  </div>
                </div>

                <div
                  onClick={() => setPaymentMethod("online")}
                  className={`border rounded-lg p-4 cursor-pointer btn-disabled ${
                    paymentMethod === "online"
                      ? "border-blue-500 bg-blue-50 dark:text-black"
                      : "border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <img className="w-8" src={OnlineIcon} alt="" />
                    <p className="font-medium">Pay Online</p>
                  </div>
                </div>
              </div>

              <button className="mt-8 w-full py-3 text-sm sm:text-base rounded-lg bg-gradient-to-r from-slate-800 to-blue-900 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-xl transition">
                <CreditCard size={18} />
                Place Order
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT */}
        <div>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
