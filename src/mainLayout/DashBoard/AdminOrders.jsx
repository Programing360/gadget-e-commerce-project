import { useState, useEffect } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
    console.log(orders);
  useEffect(() => {
    axios
      .get(`https://zeromiroo-api.vercel.app/admin/orders?filter=${filter}`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, [filter]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Orders</h2>

      <div className="flex gap-2 mb-4">
        <button onClick={() => setFilter("all")} className="btn">
          All
        </button>
        <button onClick={() => setFilter("today")} className="btn">
          Today
        </button>
        <button onClick={() => setFilter("yesterday")} className="btn">
          Yesterday
        </button>
        <button onClick={() => setFilter("thisMonth")} className="btn">
          This Month
        </button>
      </div>

      <div>
        {orders.map((order) => (
          <div key={order._id} className="border p-2 mb-2 rounded">
            <p><strong>Name:</strong> {order.name}</p>
            <p><strong>Total:</strong> ৳{order.total}</p>
            <p><strong>Order Time:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;