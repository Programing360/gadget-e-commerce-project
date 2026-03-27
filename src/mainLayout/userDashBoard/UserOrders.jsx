import React, { useContext, useEffect, useState } from "react";
import useOrderList from "../../Hook/useOrderList";
import { Link } from "react-router";
import { toast } from "react-toastify";
import TimeAgo from "../../component/SetTimeOut";
import { useAxiosSecure } from "../../Hook/useAxiosSecure";
import SEO from "../../component/SEO/SEO";
import { UseContext } from "../../Context/AuthContext";
import { motion } from "framer-motion";

const UserOrders = () => {
  const { user } = useContext(UseContext);
  const [orders, refetch, isLoading] = useOrderList("all", user);
  const axiosSecure = useAxiosSecure();

  const guestId = localStorage.getItem("guestCart");

  // ✅ Filter user orders
  const userOrderData = orders?.filter((order) =>
    user?.email ? order.email === user.email : order.guestId === guestId,
  );

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [, forceUpdate] = useState(0);

  // ⏱ Auto time refresh
  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate((p) => p + 1);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // ❌ Cancel Order
  const handleCancelOrder = async (orderId) => {
    const confirm = window.confirm(
      "Are you sure you want to cancel this order?",
    );
    if (!confirm) return;

    const res = await axiosSecure.patch(`/cancelOrder/${orderId}`);

    if (res.data.modifiedCount > 0) {
      toast.success("Order cancelled successfully");
      refetch();
    }
  };

  // ⏳ Loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500">
        Loading your orders...
      </div>
    );
  }

  // 📦 Empty State (FIXED ✅)
  if (!userOrderData || userOrderData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center min-h-[80vh]">
        <motion.img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
          alt="No Orders"
          className="w-44 mb-6 opacity-80"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        />

        <motion.h2
          className="text-2xl font-semibold text-gray-800"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          No Orders Found
        </motion.h2>

        <motion.p
          className="text-gray-500 mt-2 max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          You haven’t placed any orders yet. Start shopping and your orders will
          appear here.
        </motion.p>

        <Link
          to="/userAllProduct"
          className="mt-6 px-6 py-2 bg-black text-white rounded-lg shadow hover:bg-gray-800 transition"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 mt-20">
      <SEO
        title="Order Details - Zeroomiro"
        description="Review your orders and track status"
      />

      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      <div className="space-y-4">
        {userOrderData.map((order, index) => (
          <motion.div
            key={order._id}
            className="flex flex-col md:flex-row md:justify-between gap-4 rounded-xl p-4 text-white border border-purple-500 shadow-sm"
            style={{
              background: "linear-gradient(135deg, #ad46ff 0%, #c3cfe2 100%)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
            }}
          >
            {/* 🖼 Images */}
            <div className="flex -space-x-3">
              {order.cart?.slice(0, 3).map((item, idx) => (
                <img
                  key={idx}
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg border-2 border-white shadow"
                />
              ))}
              {order.cart?.length > 3 && (
                <div className="w-16 h-16 flex items-center justify-center bg-gray-200 text-sm font-bold rounded-lg border-2 border-white">
                  +{order.cart.length - 3}
                </div>
              )}
            </div>

            {/* 📦 Order Info */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs text-gray-800">
                  Order ID: <span className="font-medium">#{order.orderId}</span>
                </p>

                <h3 className="font-semibold text-purple-950 text-shadow-purple-600 capitalize">
                  {order.name}
                </h3>

                <p className="text-sm text-purple-950 text-shadow-purple-600 mt-1">
                  Qty: <span className="font-medium ">{order.cart?.length}</span>
                </p>

                <p className="text-sm text-purple-950 text-shadow-purple-600">
                  Payment:{" "}
                  <span className="font-medium capitalize">
                    {order.paymentMethod}
                  </span>
                </p>

                <p className="text-xs text-purple-950 text-shadow-purple-600 mt-1">
                  Ordered <TimeAgo time={order.newDate} />
                </p>
              </div>

              {/* 💰 Price & Status */}
              <div className="flex flex-col md:items-end mt-2 md:mt-0">
                <p className="font-bold text-lg text-cyan-700">
                 Total: {order.total} BDT
                </p>

                <span
                  className={`text-xs px-3 py-1 rounded-full mt-1 inline-block font-medium ${
                    order.status === "delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "cancelled"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status}
                </span>

                {/* 🔘 Buttons */}
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="px-3 py-1 text-xs border rounded-md text-purple-950 text-shadow-purple-600 hover:bg-gray-100 transition"
                  >
                    View
                  </button>

                  {order.status === "pending" && (
                    <button
                      onClick={() => handleCancelOrder(order._id)}
                      className="px-3 py-1 text-xs bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🔥 Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-[95%] md:w-[600px] rounded-2xl p-6 relative shadow-xl">
            {/* Close */}
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-2 right-3 text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">Order Details</h2>

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

            {/* 🛒 Items */}
            <div className="space-y-3 max-h-80 overflow-y-auto">
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
                    <h3 className="text-sm font-semibold">{item.name}</h3>
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
              <p className="text-lg font-bold">Total: ৳{selectedOrder.total}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrders;
