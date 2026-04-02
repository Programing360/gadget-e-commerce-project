import React, { useState } from "react";
import { useLocation } from "react-router";
import jsPDF from "jspdf";
import { QRCodeCanvas } from "qrcode.react";
import logo from "../../assets/assets/zeroomiro.jpeg";
import SEO from "../../component/SEO/SEO";


const OrderInvoicePage = () => {
  const location = useLocation();
  const order = location.state?.order;
  const [invoiceNumber] = useState(() => "INV-" + Date.now());
  
  if (!order) {
      return <h2 className="text-center mt-10">No Order Data Found</h2>;
    }
    

  const {
    name,
    email,
    mobileNumber,
    address,
    cart,
    subtotal,
    shippingCost,
    total,
    newDate,
    paymentMethod,
    transactionId,
    orderId
  } = order;


  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("INVOICE", 90, 20);

    doc.setFontSize(10);
    doc.text(`Invoice: ${invoiceNumber}`, 20, 40);
    doc.text(`Date: ${new Date(newDate).toLocaleDateString()}`, 20, 48);
    doc.text(`Transaction: ${transactionId || "N/A"}`, 20, 56);

    doc.text(`Customer: ${name}`, 20, 70);

    let y = 90;

    cart.forEach((item, i) => {
      doc.text(
        `${i + 1}. ${item.name} (${item.quantity} x ${item.price})`,
        20,
        y
      );
      y += 8;
    });

    y += 10;
    doc.text(`Total: ৳${total}`, 20, y);

    doc.save("invoice.pdf");
  };

  return (
    <div className="max-w-5xl mx-auto my-20 shadow-lg border bg-white mt-40 dark:text-black">
      <SEO
        title="Invoice - Zeroomiro"
        description="Professional invoice with QR code"
      />

      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center bg-orange-500 text-white p-6">
        <div className="flex items-center gap-3">
          <img src={logo} className="w-12 h-12 rounded" alt="page logo"/>
          <h1 className="text-2xl font-bold">Zeroomiro</h1>
        </div>
        <h2 className="text-3xl font-bold">INVOICE</h2>
      </div>

      {/* 🔥 TOP INFO */}
      <div className="grid grid-cols-2 p-6 bg-gray-50">
        <div>
          <h3 className="font-bold text-sm mb-2">INVOICE TO:</h3>
          <p>{name}</p>
          <p>{email}</p>
          <p>{mobileNumber}</p>
          <p>{address}</p>
        </div>

        <div className="text-right">
          <p><b>Invoice:</b> {invoiceNumber}</p>
          <p><b>Date:</b> {new Date(newDate).toLocaleDateString()}</p>
          <p><b>Payment:</b> {paymentMethod}</p>
          <p><b>Order ID:</b> {orderId || "N/A"}</p>

          {/* 🔥 QR CODE */}
          <div className="mt-3 flex justify-end">
            <QRCodeCanvas
              value={`https://zeroomiro26.web.app/userDashBoard`}
              size={80}
            />
          </div>
        </div>
      </div>

      {/* 🔥 TABLE */}
      <div className="p-6">
        <table className="w-full border">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="p-2 text-left">Product</th>
              <th className="p-2">Color</th>
              <th className="p-2">Price</th>
              <th className="p-2">Qty</th>
              <th className="p-2">Total</th>
            </tr>
          </thead>

          <tbody>
            {cart.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-2 flex items-center gap-2">
                  <img
                    src={item.image}
                    className="w-10 h-10 rounded"
                  />
                  {
                    item?.size ? <td>{item.name} ({item.size})</td> : (item?.name)
                  }
                </td>
                <td className="text-center">{item.color}</td>
                <td className="text-center">৳{item.price}</td>
                <td className="text-center">{item.quantity}</td>
                <td className="text-center">
                  ৳{item.price * item.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 🔥 TOTAL SECTION */}
        <div className="flex justify-end mt-6">
          <div className="w-72 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>৳{subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>৳{shippingCost}</span>
            </div>

            <div className="flex justify-between font-bold text-lg border-t pt-2 bg-orange-100 p-2 rounded">
              <span>Total</span>
              <span>৳{total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 🔥 FOOTER */}
      <div className="p-6 border-t text-center text-sm text-gray-500">
        Thank you for your business ❤️
      </div>

      {/* 🔥 BUTTONS */}
      <div className="text-center pb-6">
        <button
          onClick={handleDownloadPDF}
          className="px-6 py-2 bg-orange-600 text-white rounded mr-3"
        >
          Download PDF
        </button>

        <button
          onClick={() => window.print()}
          className="px-6 py-2 bg-black text-white rounded"
        >
          Print
        </button>
      </div>
    </div>
  );
};

export default OrderInvoicePage;