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
                <th>Image</th>
                <th>Name</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>

            <tbody>
              {order?.cart?.map((item, index) => (
                <tr key={item._id || index}>
                  <td>{index + 1}</td>

                  <td>
                    <img
                      src={item?.image}
                      className="w-12 h-12 rounded"
                    />
                  </td>

                  <td>{item?.name}</td>

                  <td>{item?.quantity}</td>

                  <td>{item?.price} ৳</td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <th></th>
                <th>Total</th>
                <th></th>
                <th>{total} ৳</th>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="modal-action">
          <form method="dialog">
            <button className="btn bg-blue-500 text-white">
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
