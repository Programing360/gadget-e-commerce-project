import React from "react";
import useOrderCancelList from "../../Hook/useOrderCancelList";
import removeBtn from '../../assets/assets/cross-button.png' 
import { useAxiosSecure } from "../../Hook/useAxiosSecure";
import { toast } from "react-toastify";
const OrderCancel = () => {
  const [orderCancel, refetch] = useOrderCancelList();
    const axiosSecure = useAxiosSecure()

  const removeOrderCancelBtn = (id) => {
    axiosSecure.delete(`/deleteOrderCancel/${id}`).then(res => {
        if(res.data.deletedCount > 0){
            toast('Order Cancel Successful')
            refetch()
        }
    })
    
  }

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
            <th>Action</th>
          </tr>
        </thead>
        <tbody className=" overflow-y-auto border border-red-700">
          {/* row 1 */}

          {orderCancel?.map((order) => (
            <tr className="">
              <th>{order._id}</th>
              <td className="capitalize">{order.name}</td>
              <td>{order.email}</td>
              <td>{order.mobile}</td>
              <td className="capitalize">{order.address}</td>
              <td><img 
                onClick={() => removeOrderCancelBtn(order._id)}
              className="w-5 cursor-pointer" src={removeBtn} alt="" /></td>
            </tr>
          ))}
        </tbody>
        
      </table>
      
    </div>
  );
};

export default OrderCancel;
