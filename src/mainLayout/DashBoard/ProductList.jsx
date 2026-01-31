import React, { useEffect, useState } from "react";
import useOrderList from "../../Hook/useOrderList";
import { toast } from "react-toastify";
import { useAxiosSecure } from "../../Hook/useAxiosSecure";
import { UseContext } from "../../Context/AuthContext";
import useOrderCount from "../../Hook/useOrderCount";
import { Link } from "react-router";
const ProductList = () => {
  const [orders, refetch] = useOrderList();
  const axiosSecure = useAxiosSecure();
  const [orderCount] = useOrderCount();
  const [confirmOrder, setConfirmOrder] = useState(false);
  const notify = () => toast("Order Confirm");
  console.log(orders);
  useEffect(() => {
    const matchedOrder = orders.find((order) =>
      orderCount?.some((item) => item.orderId === order._id),
    );
    if (matchedOrder) {
      setConfirmOrder(true);
    } else {
      setConfirmOrder(false);
    }
  }, [orders, orderCount]);

  const handleOrderBtn = (orderItem) => {
    const orderInfo = {
      orderId: orderItem._id,
    };

    if (confirmOrder) {
      toast("Order Already Confirm");
    } else {
      axiosSecure.post("/orderConfirm", orderInfo).then((res) => {
        if (res.data.insertedId) {
          notify();
          refetch();
        }
      });
    }
  };

  const handleOrderCancelBtn = (item) => {
    const id = item._id;
    axiosSecure.delete(`/orderConfirm/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        const orderInfo = {
          name: item.name,
          email: item.email,
          phoneNumber: item.phone,
          address: item.address,
        };
        axiosSecure.post("/orderCancel", orderInfo);
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
              <th>Action</th>
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
                      <div className="font-bold">{item.name}</div>
                      {/* <div className="text-sm opacity-50">{(item.address) + (item.shipping)}</div> */}
                    </div>
                  </div>
                </td>
                <td>
                  {item.address},{item.shipping}
                </td>
                <td>{item.total} TK</td>
                <th>
                  <button className="bg-white text-black p-1 rounded">
                    {item.paymentMethod}
                  </button>
                </th>
                {confirmOrder ? (
                  <td className="text-green-400">Order Confirm</td>
                ) : (
                  <td className="text-amber-700">Pending</td>
                )}

                <td>{item.email}</td>
                <th className="">
                  <button
                    onClick={() => handleOrderBtn(item)}
                    className={
                      confirmOrder
                        ? "btn-disabled btn bg-gray-300 mr-2"
                        : "btn bg-green-400  rounded mr-2"
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
