import React, { useContext, useEffect, useState } from "react";
import useOrderList from "../../Hook/useOrderList";
import { Link } from "react-router";
import { toast } from "react-toastify";
import TimeAgo from "../../component/SetTimeOut";
import { useAxiosSecure } from "../../Hook/useAxiosSecure";
import SEO from "../../component/SEO/SEO";
import { UseContext } from "../../Context/AuthContext";

const UserOrders = () => {
  const { user } = useContext(UseContext);
  const [orders, refetch, isloading] = useOrderList("all", user);
  const axiosSecure = useAxiosSecure();

  const guestId = localStorage.getItem("guestCart"); 
  const userOrderData = orders.filter((order) =>
  user?.email
    ? order.email === user.email
    : order.guestId === guestId
);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [, forceUpdate] = useState(0);

  /* 🔄 Auto time update */
  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate((p) => p + 1);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  /* ❌ Cancel Order */
  const handleCancelOrder = async (orderId) => {
    const confirm = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (!confirm) return;

    const res = await axiosSecure.patch(`/cancelOrder/${orderId}`);

    if (res.data.modifiedCount > 0) {
      toast.success("Order cancelled successfully");
      refetch();
    }
  };

  /* ⏳ Loading */
  if (isloading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading your orders...
      </div>
    );
  }

  /* 📦 Empty */
  if (orders.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        You have no orders yet 📦
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 mt-20 ">
      <SEO
        title="Order Details - Zeroomiro"
        description="Review your orders and track status"
      />

      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      <div className="space-y-4">
        {userOrderData.map((order) => (
          <div
            key={order._id}
            className="flex gap-4 bg-white dark:bg-white hover:bg-amber-300 transition shadow-sm rounded-xl p-4 dark:text-white"
          >
            {/* 🖼 Product Preview */}
            <div className="flex flex-col md:flex-row gap-2 md:gap-0 -space-x-3">
              {order.cart?.slice(0, 2).map((item, index) => (
                <img
                  key={index}
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg border-2 border-white shadow"
                />
              ))}

              {order.cart?.length > 3 && (
                <div className="w-16 h-16 flex items-center justify-center bg-gray-300 text-sm font-bold rounded-lg border-2 border-white">
                  +{order.cart.length - 3}
                </div>
              )}
            </div>

            {/* 📦 Info */}
            <div className="flex-1 dark:text-black">
              <p className="text-xs text-gray-400">
                Order ID:{" "}
                <span className="font-medium">{order._id}</span>
              </p>

              <h3 className="font-semibold capitalize dark:text-black">
                {order.name}
              </h3>

              <div className="text-sm mt-1">
                Qty:{" "}
                <span className="font-medium">
                  {order.cart?.length}
                </span>
              </div>

              <div className="text-sm">
                Payment:{" "}
                <span className="font-medium capitalize">
                  {order.paymentMethod}
                </span>

                <p className="text-sm text-gray-500 mt-1">
                  Ordered{" "}
                  <TimeAgo time={order.newDate}></TimeAgo>
                </p>
              </div>
            </div>

            {/* 💰 Right Side */}
            <div className="text-right flex flex-col justify-between">
              <div>
                <p className="font-bold text-cyan-600">
                  ৳{order.total}
                </p>

                <span
                  className={`text-xs px-3 py-1 rounded-full inline-block mt-1 ${
                    order.status === "delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* 🔘 Buttons */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="btn btn-xs btn-outline dark:text-black"
                >
                  View
                </button>

                {order.status === "pending" && (
                  <button
                    onClick={() =>
                      handleCancelOrder(order._id)
                    }
                    className="btn btn-xs btn-error"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 dark:text-black">
          <div className="bg-white w-[95%] h-full md:w-[600px] rounded-xl p-5 relative">

            {/* ❌ Close */}
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-2 right-3 text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">
              Order Details
            </h2>

            <p className="text-sm mb-1">
              <span className="font-semibold">Order ID:</span>{" "}
              {selectedOrder._id}
            </p>

            <p className="text-sm mb-1">
              <span className="font-semibold">Date:</span>{" "}
              <TimeAgo time={selectedOrder.newDate} />
            </p>

            <p className="text-sm mb-3">
              <span className="font-semibold">Status:</span>{" "}
              {selectedOrder.status}
            </p>

            {/* 🛒 Products */}
            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {selectedOrder.cart?.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 items-center border-b pb-2"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="text-sm font-semibold">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="text-sm font-bold text-cyan-600">
                    ৳{item.price}
                  </p>
                </div>
              ))}
              
            </div>

            {/* 💰 Total */}
            <div className="mt-4 text-right">
              <p className="text-lg font-bold">
                Total: ৳{selectedOrder.total}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrders;