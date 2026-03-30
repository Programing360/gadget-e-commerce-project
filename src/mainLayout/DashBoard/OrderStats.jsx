import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import useOrderList from "../../Hook/useOrderList";
import useOrderConfirmList from "../../Hook/useOrderConfirmList";

const data = [
  { name: "Delivered", value: 76.64, color: "#22c55e" },
  { name: "Returned", value: 10.98, color: "#ef4444" },
  { name: "Paid Return", value: 4.04, color: "#3b82f6" },
  { name: "Processing", value: 8.08, color: "#f59e0b" },
];

const OrderStats = () => {
  const [orders] = useOrderList();

  const [orderConfirm] = useOrderConfirmList();
  const totalPriceOfOrders = orders?.reduce((sum, item) => sum + item.total, 0);
  const TotalProcessing = orders.length - orderConfirm.length;
  const processing =
    orders > 0 ? ((orders - totalDelivered) / orders) * 100 : 0;

  const totalOrders = orders?.length || 0;
  const totalDelivered = orderConfirm?.length || 0;

  const deliveredPercentage =
    totalOrders > 0 ? (totalDelivered / totalOrders) * 100 : 0;
  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 ">
        <h2 className="text-lg font-semibold text-black">Overall Statistics</h2>
        <input
          type="date"
          // value={startDate}
          // onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded text-black"
        />

        <span className="text-black hidden md:block">to</span>

        <input
          type="date"
          // value={endDate}
          // onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded text-black hidden md:block"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Donut Chart */}
        <div className="flex justify-center relative">
          <PieChart width={250} height={250}>
            <Pie
              data={data}
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>

          {/* Center Text */}
          <div className="absolute text-center top-23 text-black">
            <p className="text-gray-500 text-sm">TOTAL VALUE</p>
            <h2 className="text-xl font-bold">৳ {totalPriceOfOrders}</h2>
            <p className="text-gray-400 text-sm">{orders.length} Orders</p>
          </div>
        </div>

        {/* Right Stats */}
        <div className="space-y-4">
          <div className="flex justify-between border-l-4 border-green-500 pl-3">
            <div>
              <p className="text-sm text-gray-500">Delivered</p>
              <h3 className="text-lg font-bold text-black">
                {Number(deliveredPercentage.toFixed(1))}%
              </h3>
              <p className="text-xs text-gray-400">
                {orderConfirm.length} orders
              </p>
            </div>
          </div>

          <div className="flex justify-between border-l-4 border-red-500 pl-3">
            <div>
              <p className="text-sm text-gray-500">Returned</p>
              <h3 className="text-lg font-bold text-black">10.98%</h3>
              <p className="text-xs text-gray-400">462 orders</p>
            </div>
          </div>

          <div className="flex justify-between border-l-4 border-blue-500 pl-3">
            <div>
              <p className="text-sm text-gray-500">Paid Return</p>
              <h3 className="text-lg font-bold text-black">4.04%</h3>
              <p className="text-xs text-gray-400">170 orders</p>
            </div>
          </div>

          <div className="flex justify-between border-l-4 border-yellow-500 pl-3">
            <div>
              <p className="text-sm text-gray-500">Processing</p>
              <h3 className="text-lg font-bold text-black">
                {Number(processing.toFixed(1))}%
              </h3>
              <p className="text-xs text-gray-400">{TotalProcessing} orders</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStats;
