import { useForm } from "react-hook-form";
import useCart from "../../Hook/useCart";
import OrderSummary from "./OrderSummary";
import { UseContext } from "../../Context/AuthContext";
import { useContext, useMemo, useState } from "react";
import CheckoutSection from "./CheckoutSection";
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

const CheckoutForm = () => {
  const { register, handleSubmit } = useForm();
  const axiosSecure = useAxiosSecure();

  // const [deliveryArea, setDeliveryArea] = useState("outside");
  const { deliveryArea, setDeliveryArea , user} = useContext(UseContext);
  // const [paymentType, setPaymentType] = useState("partial");
  const [cart] = useCart();

  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, []);

  const deliveryCharge =
    deliveryArea === "inside" ? 50 : deliveryArea === "outside" ? 100 : 0;

  const total = subtotal + deliveryCharge;

  const partialAmount = (subtotal * 0.1 + deliveryCharge).toFixed(0);
  const remaining = (total - partialAmount).toFixed(0);

  // const [delivery, setDelivery] = useState("pickup");
  const [paymentType, setPaymentType] = useState("full");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const newDate = moment().format();
  const onSubmit = (data) => {
    console.log(data)
    const orderData = {
      ...data,
      name:data.fullName,
      cart,
      deliveryArea,
      paymentMethod,
      paymentType,
      subtotal,
      deliveryCharge,
      total,
      mobileNumber:data.mobile,
      newDate,
      email:user?.email,
      payNow: paymentType === "partial" ? partialAmount : total,
    };
    axiosSecure.post("/orders", orderData).then((res) => {
      if (res.data) {
        toast("Order Confirm");
      }
    });
    // console.log(orderData);
  };

  return (
    <div className="container mx-auto p-6 grid grid-cols-3 gap-6">
      {/* LEFT SIDE */}
      <div className="col-span-2 bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">
          <span>
            <img src="" alt="" />
          </span>
          Checkout
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Customer Info */}
          <div>
            <h3 className="font-semibold mb-2">Customer Information</h3>

            <div className="grid grid-cols-2 gap-4">
              <input
                {...register("fullName", { required: true })}
                placeholder="Full Name"
                className="border p-2 rounded"
              />
              <input
                {...register("mobile", { required: true })}
                placeholder="Mobile Number"
                className="border p-2 rounded"
              />
            </div>

            <textarea
              {...register("address", { required: true })}
              placeholder="Delivery Address"
              className="border p-2 rounded w-full mt-4"
            />
          </div>

          {/* Delivery Area */}

          {/* Payment */}
          <div>
            <div className="bg-white rounded-xl max-w-3xl mx-auto">
              {/* ================= DELIVERY AREA ================= */}
              <h2 className="text-lg font-semibold mb-4">
                Select Delivery Area
              </h2>

              <div className="grid grid-cols-3 gap-4">
                {/* Office Pickup */}
                <div
                  onClick={() => setDeliveryArea("pickup")}
                  className={`border rounded-lg p-4 cursor-pointer transition ${
                    deliveryArea === "pickup"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Store size={18} />
                    <p className="font-medium">Office Pickup</p>
                  </div>
                  <p className="text-sm text-gray-500">Free</p>
                </div>

                {/* Inside Dhaka */}
                <div
                  onClick={() => setDeliveryArea("inside")}
                  className={`border rounded-lg p-4 cursor-pointer transition ${
                    deliveryArea === "inside"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MapPin size={18} />
                    <p className="font-medium">Inside Dhaka</p>
                  </div>
                  <p className="text-sm text-gray-500">৳50.00</p>
                </div>

                {/* Outside Dhaka */}
                <div
                  onClick={() => setDeliveryArea("outside")}
                  className={`border rounded-lg p-4 cursor-pointer transition ${
                    deliveryArea === "outside"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Truck size={18} />
                    <p className="font-medium">Outside Dhaka</p>
                  </div>
                  <p className="text-sm text-gray-500">৳100.00</p>
                </div>
              </div>

              {/* Selected Info Bar */}
              <div className="mt-4 bg-blue-100 text-blue-700 text-sm p-3 rounded-lg">
                Selected:{" "}
                {deliveryArea === "pickup"
                  ? "Office Pickup • Charge: Free • Time: Same day"
                  : deliveryArea === "inside"
                    ? "Inside Dhaka • Charge: ৳50 • Time: 1-2 days"
                    : "Outside Dhaka • Charge: ৳100 • Time: 3-5 days"}
              </div>

              {/* ================= PAYMENT METHOD ================= */}
              <h2 className="text-lg font-semibold mt-8 mb-4">
                Payment Method
              </h2>

              {/* Full / Partial */}
              <div className="flex gap-6 mb-4">
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
                <div className="bg-blue-50 p-3 rounded text-sm mb-7">
                  <p>Pay Now: ৳{partialAmount}</p>
                  <p>Remaining: ৳{remaining}</p>
                </div>
              )}
              {/* Payment Options */}
              <div className="grid grid-cols-3 gap-4">
                {/* Pay in 30 min */}
                <div
                  onClick={() => setPaymentMethod("cod")}
                  className={`border rounded-lg p-4 cursor-pointer ${
                    paymentMethod === "cod"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Clock size={18} />
                    <p className="font-medium">Pay in 30 min</p>
                  </div>
                  <p className="text-xs text-orange-500">
                    Order will be canceled if not paid
                  </p>
                </div>

                {/* bKash */}
                <div
                  onClick={() => setPaymentMethod("bkash")}
                  className={`border rounded-lg p-4 cursor-pointer ${
                    paymentMethod === "bkash"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Smartphone size={18} />
                    <p className="font-medium">bKash</p>
                  </div>
                </div>

                {/* Pay Online */}
                <div
                  onClick={() => setPaymentMethod("online")}
                  className={`border rounded-lg p-4 cursor-pointer ${
                    paymentMethod === "online"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={18} />
                    <p className="font-medium">Pay Online</p>
                  </div>
                </div>
              </div>

              {/* Use Credit */}
              <div className="mt-4 border rounded-lg p-4 text-gray-400 cursor-not-allowed">
                <div className="flex items-center gap-2">
                  <CreditCard size={18} />
                  <p className="font-medium">Use Credit</p>
                </div>
                <p className="text-xs">Check by phone</p>
              </div>

              {/* ================= PLACE ORDER BUTTON ================= */}
              <button className="mt-8 w-full py-3 rounded-lg bg-gradient-to-r from-slate-800 to-blue-900 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-2xl hover:bg-gradient-to-r hover:from-blue-900 hover:to-slate-800 transition decoration-2 delay-75">
                <CreditCard size={18} />
                Place Order
              </button>

              <p className="text-center text-xs text-gray-500 mt-2">
                By placing your order, you agree to our terms and conditions
              </p>
            </div>
          </div>
        </form>
      </div>

      {/* RIGHT SIDE */}
      <OrderSummary></OrderSummary>
    </div>
  );
};

export default CheckoutForm;
