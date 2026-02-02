import React from "react";
import useOrderList from "../../Hook/useOrderList";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router";
import { toast } from "react-toastify";
import TimeAgo from "../../component/SetTimeOut";
// import { useAxiosSecure } from "../Hook/useAxiosSecure";

dayjs.extend(relativeTime);
const UserOrders = () => {
  const [orders] = useOrderList();
  //   const cart = (orders.map(item => console.log(item.cart)));
  //   const axiosSecure = useAxiosSecure();
  //   const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [, forceUpdate] = useState(0);

  /* ================= FETCH ORDERS ================= */
  //   useEffect(() => {
  //     axiosSecure.get("/userOrders").then((res) => {
  //       setOrders(res.data || []);
  //       setLoading(false);
  //     });
  //   }, [axiosSecure]);

  /* ================= AUTO TIME UPDATE ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate((p) => p + 1);
    }, 60000); // every minute

    return () => clearInterval(interval);
  }, []);
  /* ================= CANCEL ORDER ================= */
  //   const handleCancelOrder = async (orderId) => {
  //     const confirm = window.confirm(
  //       "Are you sure you want to cancel this order?",
  //     );
  //     if (!confirm) return;

  //     const res = await axiosSecure.patch(`/cancelOrder/${orderId}`);

  //     if (res.data.modifiedCount > 0) {
  //       toast.success("Order cancelled successfully");
  //       setOrders((prev) =>
  //         prev.map((order) =>
  //           order._id === orderId ? { ...order, status: "cancelled" } : order,
  //         ),
  //       );
  //     }
  //   };
  /* ================= STATES ================= */
  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading your orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        You have no orders yet 📦
      </div>
    );
  }
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="flex gap-4 bg-white shadow-sm rounded-xl p-4"
          >
            {/* Product Image */}
            {order.cart.map((item, index) => (
              <img
              key={index}
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg border"
            />
            ))}
            

            {/* Order Info */}
            <div className="flex-1">
              <h3 className="font-semibold">{order.name}</h3>

              <p className="text-xs text-gray-400">
                Order ID: <span className="font-medium">{order._id}</span>
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Ordered <TimeAgo time={order.newDate}></TimeAgo>
              </p>

              <div className="text-sm mt-1">
                Qty: <span className="font-medium">{order.quantity}</span>
              </div>

              <div className="text-sm">
                Payment:{" "}
                <span className="font-medium capitalize">
                  {order.paymentMethod}
                </span>
              </div>
            </div>

            {/* Right Side */}
            <div className="text-right flex flex-col justify-between">
              <div>
                <p className="font-bold text-cyan-600">৳{order.totalPrice}</p>

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

              {/* Action Buttons */}
              <div className="flex gap-2 mt-3">
                <Link to={`/orderDetails/${order._id}`}>
                  <button className="btn btn-xs btn-outline">View</button>
                </Link>

                {order.status === "pending" && (
                  <button
                    // onClick={() => handleCancelOrder(order._id)}
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
    </div>
  );
};

export default UserOrders;
