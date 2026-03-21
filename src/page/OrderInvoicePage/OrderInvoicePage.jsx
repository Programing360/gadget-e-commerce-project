import React from "react";
import { useLocation } from "react-router";
import jsPDF from "jspdf";
import logo from "../../assets/assets/logo.jpg";
import SEO from "../../component/SEO/SEO";
const OrderInvoicePage = () => {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <h2 className="text-center mt-10">No Order Data Found</h2>;
  }

  const invoiceNumber = "INV-" + Date.now();

  const {
    name,
    email,
    mobileNumber,
    address,
    shipping,
    cart,
    subtotal,
    shippingCost,
    total,
    newDate,
    paymentMethod,
    transactionId, // 🔥 added
  } = order;

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("INVOICE", 90, 20);

    doc.setFontSize(11);
    doc.text(`Invoice No: ${invoiceNumber}`, 20, 40);
    doc.text(`Date: ${new Date(newDate).toLocaleDateString()}`, 20, 48);
    doc.text(`Transaction ID: ${transactionId || "N/A"}`, 20, 56); // 🔥 show transaction id

    doc.text(`Name: ${name}`, 20, 68);
    doc.text(`Phone: ${mobileNumber}`, 20, 76);
    doc.text(`Address: ${address}`, 20, 84);

    let y = 100;

    cart.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.name} - ${item.quantity} x ${item.price}`,
        20,
        y,
      );
      y += 8;
    });

    y += 10;

    doc.text(`Subtotal: ৳${subtotal}`, 20, y);
    doc.text(`Shipping: ৳${shippingCost}`, 20, y + 8);
    doc.text(`Total: ৳${total}`, 20, y + 16);

    doc.text("Thank you for your purchase ❤️", 60, y + 40);

    doc.save("invoice.pdf");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg my-46">
        <SEO
        title="Your Invoice - Zeroomiro"
        description="Order details show and received download or print"
      />
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <img src={logo} className="w-32 mb-2" />
          <h1 className="text-xl md:text-2xl font-bold text-[#FF6D1F]">
            Zeroo<span className="text-[#fdb529]">m</span>
            <span className="text-[#FF6D1F]">iro</span>
          </h1>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-bold">INVOICE</h2>
          <p>{invoiceNumber}</p>
          <p>{new Date(newDate).toLocaleString()}</p>
          <p>Transaction ID: {transactionId || "N/A"}</p>{" "}
          {/* 🔥 show on page */}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <h3 className="font-semibold">Customer:</h3>
          <p>{name}</p>
          <p>{email}</p>
          <p>{mobileNumber}</p>
          <p>{address}</p>
        </div>
        <div className="text-right">
          <p>Shipping: {shipping}</p>
          <p>Payment: {paymentMethod}</p>
          <p>Transaction ID: {transactionId || "N/A"}</p>{" "}
          {/* 🔥 show on page */}
        </div>
      </div>

      <table className="w-full mt-6 border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">Product</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Qty</th>
            <th className="border p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={index}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">৳{item.price}</td>
              <td className="border p-2">{item.quantity}</td>
              <td className="border p-2">৳{item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end mt-6">
        <div className="w-72">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>৳{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>৳{shippingCost}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t mt-2 pt-2">
            <span>Total:</span>
            <span>৳{total}</span>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={handleDownloadPDF}
          className="px-6 py-2 bg-blue-600 text-white rounded mr-3 cursor-pointer"
        >
          Download PDF
        </button>
        <button
          onClick={() => window.print()}
          className="px-6 py-2 bg-black text-white rounded cursor-pointer"
        >
          Print
        </button>
      </div>
    </div>
  );
};

export default OrderInvoicePage;
