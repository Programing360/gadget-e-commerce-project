import React from "react";

const OrderDetails = ({ order }) => {
 const total = order?.cart?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl text-black">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>order ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Color</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total Price</th>
              </tr>
            </thead>

            <tbody>
              {order?.cart?.map((item, index) => (
                <tr key={item._id || index}>
                  <td>{index + 1}</td>
                  <td>{order.orderId}</td>

                  <td>
                    <img
                      src={item?.image}
                      className="w-12 h-12 rounded"
                    />
                  </td>

                  {
                    item?.size ? <td className="inline-block align-middle">{item.name} ({item.size})</td> : (item?.name)
                  }

                  <td>{item?.color}</td>
                  <td>{item?.quantity}</td>

                  <td>{item?.price} ৳</td>
                  <td>{Number(item?.price)*item.quantity} ৳</td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <th></th>
                <th className="text-2xl font-bold">Total</th>
                <th></th>
                <th></th>
                <th></th>
                <th className="text-2xl font-bold">{total} ৳</th>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="modal-action">
          <form method="dialog">
            <button className="btn bg-blue-500 text-white active:scale-95">
              Close
            </button>
          </form>
        </div>
      </div>
      </dialog>
    </div>
  );
};

export default OrderDetails;
