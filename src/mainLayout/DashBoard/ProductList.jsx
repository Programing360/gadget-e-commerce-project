import React, { useEffect, useState } from "react";
import useOrderList from "../../Hook/useOrderList";
import { toast } from "react-toastify";
import { useAxiosSecure } from "../../Hook/useAxiosSecure";

import useOrderCount from "../../Hook/useOrderCount";
import { Link } from "react-router";
import { set } from "react-hook-form";

const ProductList = () => {
  const [orders, refetch] = useOrderList();
  const axiosSecure = useAxiosSecure();
  const [orderCount, refetchOrderCount] = useOrderCount();
  // const [confirmOrder, setConfirmOrder] = useState(false);
  const notify = () => toast("Order Confirm");

  // useEffect(() => {
  //   const matchOrderId = orders?.find((item) =>
  //     orderCount.some((id) => id._id === item._id),
  //   );
  //   console.log(orderCount, matchOrderId);
  //   setConfirmOrder(!!matchOrderId);
  // }, [orders, orderCount]);

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
      console.error(error);
      toast("Something went wrong!");
    }
  };

  const handleOrderCancelBtn = (item) => {
    const id = item._id;
    axiosSecure.delete(`/orderDelete/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        // const orderInfo = {
        //   name: item.name,
        //   email: item.email,
        //   phoneNumber: item.phone,
        //   address: item.address,
        // };
        axiosSecure.post("/orderCancel", item);
        refetch();
        toast("Order Cancel");
      }
    });
  };
  if (orders.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center text-center">
        {/* <img src={emptyCartImg} alt="Empty Cart" className="w-64 mb-6" /> */}
        <h2 className="text-3xl font-bold mb-2">Your Order is Empty</h2>
        <p className="text-gray-500 mb-6">
          Looks like you haven’t added anything to your order yet
        </p>
        <Link to="/">
          <button className="bg-[#f56e06] text-white px-6 py-3 rounded hover:bg-[#2f333a]">
            Go to Shop
          </button>
        </Link>
      </div>
    );
  }
  return (
    <div>
      {/* <nav className="">
        <div className="navbar bg-neutral-600 text-neutral-content">
          <button className="btn btn-ghost text-xl">daisyUI</button>
        </div>
      </nav> */}
      <div className="overflow-x-auto">
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
              <th>Location</th>
              <th>Total Amount</th>
              <th>Payment Status</th>
              <th>Order Status</th>
              <th>Customer Email</th>
              <th>Mobile Number</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody className="mt-20">
            {/* row 1 */}
            {orders.map((item, index) => (
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
                <td className="capitalize">
                  {item.address},{item.shipping}
                </td>
                <td>{item.total} TK</td>
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

                <td>{item.email}</td>
                <td>{item.mobileNumber}</td>
                <th className="text-center">
                  <button
                    onClick={() => handleOrderBtn(item._id)}
                    className={
                      orderCount?.some((order) => order._id === item._id)
                        ? "btn-disabled btn bg-gray-300 mr-2"
                        : "btn bg-green-400 rounded mr-2"
                    }
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => handleOrderCancelBtn(item)}
                    className="btn bg-white text-black text-lg rounded mt-2 lg:mt-0"
                  >
                    cancel
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
