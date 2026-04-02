import React, { useState } from "react";
import useOrderList from "../../Hook/useOrderList";
import { toast } from "react-toastify";
import { useAxiosSecure } from "../../Hook/useAxiosSecure";

import useOrderCount from "../../Hook/useOrderCount";
import { Link } from "react-router";
import OrderDetails from "./OrderDetails";
import AdminOrders from "./AdminOrders";

const ProductList = () => {
  const [filter, setFilter] = useState("all");
  const [orders, refetch] = useOrderList(filter);
  const axiosSecure = useAxiosSecure();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [orderCount, refetchOrderCount] = useOrderCount();
  const notify = () => toast("Order Confirm");

  const handleOrderBtn = async (id) => {
    // 🔍 order আগে থেকেই confirm কিনা চেক
    const isConfirmed = orderCount.find((item) => item.orderId === id);

    if (isConfirmed) {
      toast("Order Already Confirmed");
      return;
    }

    try {
      const orderInfo = {
        orderId: id,
      };

      const res = await axiosSecure.post(`/orderConfirm/${id}`, orderInfo);

      if (res.data.insertedId) {
        notify();
        refetchOrderCount();
      }
    } catch (error) {
      if (error) {
        toast("Something went wrong!");
      }
    }
    const res = await axiosSecure.patch(`/updateOrderStatus/${id}`, {
      status: "confirmed",
    });
    if (res.data.modifiedCount > 0) {
      refetch();
    }
  };

  const [selectedOrder, setSelectedOrder] = useState(null);
  const handleOrderDetails = (_id) => {
    const MatchIdWithOrder = orders.find((item) => item._id === _id);
    setSelectedOrder(MatchIdWithOrder);
    document.getElementById("my_modal_4").showModal();
  };

  const handleOrderCancelBtn = (item) => {
    const id = item._id;

    axiosSecure.delete(`/orderDelete/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        axiosSecure.post("/orderCancel", item);
        refetch();
        toast("Order Cancel");
      }
    });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="flex flex-wrap gap-2 mb-4 items-center">

  {/* Filter Buttons */}
  <button onClick={() => setFilter("all")} className={`btn ${filter==="all" && "bg-black text-white"}`}>All</button>
  <button onClick={() => setFilter("today")} className={`btn ${filter==="today" && "bg-black text-white"}`}>Today</button>
  <button onClick={() => setFilter("yesterday")} className={`btn ${filter==="yesterday" && "bg-black text-white"}`}>Yesterday</button>
  <button onClick={() => setFilter("thisMonth")} className={`btn ${filter==="thisMonth" && "bg-black text-white"}`}>This Month</button>

  {/* 🔥 Custom Date Range */}
  <input
    type="date"
    value={startDate}
    onChange={(e) => setStartDate(e.target.value)}
    className="border p-2 rounded"
  />

  <span>to</span>

  <input
    type="date"
    value={endDate}
    onChange={(e) => setEndDate(e.target.value)}
    className="border p-2 rounded"
  />

  <button
    onClick={() => setFilter("custom")}
    className="btn bg-blue-500 text-white"
  >
    Apply
  </button>

</div>
        <table className="table">
          {/* head */}
          <thead className="text-white bg-amber-400 w-full">
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox bg-indigo-600" />
                </label>
              </th>
              <th>Customer Name</th>
              <th>Customer Email</th>
              <th>Mobile Number</th>
              <th>Location</th>
              <th>Payment Status</th>
              <th>Order Status</th>
              <th>Date</th>
              <th>Qty</th>
              <th>Total Amount</th>
              <th>Order Details</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody className="mt-20">
            {orders.length === 0 ? (
              <tr>
                <td colSpan="12">
                  <div className="flex flex-col justify-center items-center py-10">
                    <h2 className="text-2xl font-bold mb-2">No Orders Found</h2>
                    <p className="text-gray-500">
                      No orders available for this filter
                    </p>
                    <Link to="/">
                      <button className="bg-[#f56e06] text-white px-6 py-3 rounded hover:bg-[#2f333a] mt-3">
                        Go to Shop
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            ) : (
              orders.map((item, index) => (
                <tr key={index}>
                  <th>
                    <label>{index + 1}</label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold capitalize">{item.name}</div>
                        {/* <div className="text-sm opacity-50">{(item.address) + (item.shipping)}</div> */}
                      </div>
                    </div>
                  </td>
                  <td>{item.email}</td>
                  <td>{item.mobileNumber}</td>
                  <td className="capitalize">
                    {item.address},{item.shipping}
                  </td>

                  <th>
                    <button className="bg-white text-black p-1 rounded">
                      {item.paymentMethod}
                    </button>
                  </th>
                  {orderCount?.some((order) => order._id === item._id) ? (
                    <td className="text-green-400">Order Confirm</td>
                  ) : (
                    <td className="text-amber-700">Pending</td>
                  )}
                  <td>{new Date(item.newDate).toLocaleString()}</td>
                  <td>
                    {item.cart.reduce(
                      (total, current) => total + current.quantity,
                      0,
                    )}
                  </td>

                  <td>{item.total} TK</td>
                  <th>
                    <button
                      onClick={() => handleOrderDetails(item._id)}
                      className="hover:bg-blue-500 border px-4 py-2 rounded-lg hover:shadow-2xl cursor-pointer"
                    >
                      View
                    </button>
                  </th>
                  <td className="text-center flex">
                    <button
                      onClick={() => handleOrderBtn(item._id)}
                      className={
                        orderCount?.some((order) => order._id === item._id)
                          ? "btn-disabled btn btn-sm bg-gray-300 dark:text-green-700 mr-2 active:scale-95 cursor-pointer"
                          : "btn btn-sm bg-green-500 rounded mr-2 active:scale-95 cursor-pointer"
                      }
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => handleOrderCancelBtn(item)}
                      className="btn btn-sm bg-red-500 text-white"
                    >
                      cancel
                    </button>
                  </td>
                </tr>
              ))
            )}
            {/* row 1 */}
          </tbody>
        </table>
      </div>
      {/* modal open */}
      <OrderDetails order={selectedOrder}></OrderDetails>
    </div>
  );
};

export default ProductList;
