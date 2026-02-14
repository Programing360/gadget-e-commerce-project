import { useState } from "react";
import {
  Truck,
  MapPin,
  Store,
  CreditCard,
  ShieldCheck,
  Smartphone,
  Clock,
} from "lucide-react";

const CheckoutSection = () => {
  const [delivery, setDelivery] = useState("pickup");
  const [paymentType, setPaymentType] = useState("full");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  return (
    <div className="bg-white p-6 rounded-xl max-w-3xl mx-auto">

      {/* ================= DELIVERY AREA ================= */}
      <h2 className="text-lg font-semibold mb-4">Select Delivery Area</h2>

      <div className="grid grid-cols-3 gap-4">
        {/* Office Pickup */}
        <div
          onClick={() => setDelivery("pickup")}
          className={`border rounded-lg p-4 cursor-pointer transition ${
            delivery === "pickup"
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
          onClick={() => setDelivery("inside")}
          className={`border rounded-lg p-4 cursor-pointer transition ${
            delivery === "inside"
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
          onClick={() => setDelivery("outside")}
          className={`border rounded-lg p-4 cursor-pointer transition ${
            delivery === "outside"
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
        {delivery === "pickup"
          ? "Office Pickup • Charge: Free • Time: Same day"
          : delivery === "inside"
          ? "Inside Dhaka • Charge: ৳50 • Time: 1-2 days"
          : "Outside Dhaka • Charge: ৳100 • Time: 3-5 days"}
      </div>

      {/* ================= PAYMENT METHOD ================= */}
      <h2 className="text-lg font-semibold mt-8 mb-4">Payment Method</h2>

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
      <button className="mt-8 w-full py-3 rounded-lg bg-gradient-to-r from-slate-800 to-blue-900 text-white font-semibold flex items-center justify-center gap-2">
        <CreditCard size={18} />
        Place Order
      </button>

      <p className="text-center text-xs text-gray-500 mt-2">
        By placing your order, you agree to our terms and conditions
      </p>
    </div>
  );
};

export default CheckoutSection;
