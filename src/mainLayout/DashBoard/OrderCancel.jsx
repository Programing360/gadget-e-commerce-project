import React from "react";
import useOrderCancelList from "../../Hook/useOrderCancelList";

const OrderCancel = () => {
  const [orderCancel] = useOrderCancelList();

  console.log(orderCancel);

  return (
    <div className="overflow-x-auto ">
      <table className="table">
        {/* head */}
        <thead>
          <tr className="text-white bg-rose-500">
            <th>Order ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}

          {orderCancel?.map((order) => (
            <tr className="">
              <th>{order._id}</th>
              <td>{order.name}</td>
              <td>{order.email}</td>
              <td>{order.phoneNumber}</td>
              <td>{order.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderCancel;
