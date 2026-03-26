import React, { useContext } from "react";
import useCart from "../../Hook/useCart";
import successIcon from "../../assets/assets/check.png";
import logo from "../../assets/assets/zeroomiro.jpeg";
import { UseContext } from "../../Context/AuthContext";
import jsPDF from "jspdf";
const OrderPage = () => {
  const [cart] = useCart();
  const { latestOrderId, setShowSuccessModal, user, } = useContext(UseContext);
  const userId = localStorage.getItem("guestCart");


  const handleDownload = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // 🔥 Logo
    const imgProps = doc.getImageProperties(logo);
    const imgWidth = 30; // লোগোর প্রস্থ
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width; // Aspect ratio ঠিক রাখবে
    const imgX = (pageWidth - imgWidth) / 2; // Center X
    doc.addImage(logo, "PNG", imgX, 10, imgWidth, imgHeight);

    // 🔥 Company Name ZEROOMIRO (centered)
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("ZEROOMIRO", pageWidth / 2, 45, { align: "center" });

    // 🔥 Title INVOICE (centered)
    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.text("INVOICE", pageWidth / 2, 55, { align: "center" });

    // 🔥 Line below title
    doc.line(20, 60, 190, 60);

    // 🔥 Info Section
    doc.setFontSize(11);
    doc.text(`Order ID: ${userId}`, 20, 70);
    const fullDate = latestOrderId.newDate; // 2026-03-20T01:18:06+06:00
    const dateOnly = fullDate.split("T")[0]; // "2026-03-20"

    doc.text(`Date: ${dateOnly}`, 20, 77);

    doc.text(`Name: ${latestOrderId.name}`, 20, 85);
    doc.text(`Mobile: ${latestOrderId.mobileNumber}`, 20, 92);
    doc.text(`Email: ${latestOrderId.email}`, 20, 99);
    doc.text(`Address: ${latestOrderId.address}`, 20, 106);

    doc.text(`Payment: ${latestOrderId.paymentMethod}`, 140, 85);
    doc.text(`Shipping: TK ${latestOrderId.shippingCost}`, 140, 92);

    // 🔥 Table Header
    let y = 120;
    doc.setFontSize(12);
    doc.text("Products", 20, y);
    doc.text("Qty", 120, y);
    doc.text("Price", 150, y);
    doc.line(20, y + 2, 190, y + 2);

    // 🔥 Products List
    y += 10;
    latestOrderId.cart.forEach((item) => {
      doc.setFontSize(10);
      doc.text(item.name, 20, y);
      doc.text(String(item.quantity), 125, y);
      doc.text(`TK ${item.price * item.quantity}`, 150, y);
      y += 8;
    });

    // 🔥 Total Section
    doc.line(20, y, 190, y);
    y += 10;
    doc.setFontSize(12);
    doc.text(`Subtotal: TK ${latestOrderId.subtotal}`, 120, y);
    y += 8;
    doc.text(`Delivery: TK ${latestOrderId.shippingCost}`, 120, y);
    y += 8;
    doc.setFontSize(14);
    doc.text(`Total: TK ${latestOrderId.total}`, 120, y);

    // 🔥 Footer
    doc.setFontSize(10);
    doc.text("Thank you for your purchase", pageWidth / 2, 280, {
      align: "center",
    });

    doc.save("invoice.pdf");
  };

  return (
    <div>
        <SEO
        title="Order now - Zeroomiro"
        description="Order confirm page"
      />
      <dialog open className="modal">
        <div className="modal-box max-w-lg text-center">
          {/* ✅ Success Icon */}
          <div className="flex justify-center mb-3">
            <img src={successIcon} className="w-12 animate-bounce" alt="" />
          </div>

          <h3 className="font-bold text-xl text-green-600">
            🎉 Order Confirmed!
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে
          </p>

          {/* 🔥 Order Items */}
          <div className="mt-6 border rounded-lg p-3 max-h-40 overflow-y-auto text-left">
            {cart.map((item, index) => (
              <div
                key={item._id}
                className="flex justify-between text-sm border-b py-2"
              >
                <span>
                  {index + 1}. {item.name} × {item.quantity}
                </span>
                <span>৳{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          {/* 💰 Price Summary */}
          <div className="mt-4 text-sm space-y-1 text-left">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>৳{latestOrderId.subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span>৳{latestOrderId.shippingCost}</span>
            </div>

            <div className="flex justify-between font-bold text-base">
              <span>Total</span>
              <span>৳{latestOrderId.total}</span>
            </div>
          </div>

          {/* 📦 Order Info */}
          <div className="mt-4 text-sm text-left border-t pt-3 space-y-1">
            <div className="flex justify-between">
              <span>Payment</span>
              <span>COD</span>
            </div>

            <div className="flex justify-between">
              <span>Email</span>
              <span>{user?.email}</span>
            </div>

            <div className="flex justify-between">
              <span>Date</span>
              <span>{new Date().toLocaleString()}</span>
            </div>
          </div>

          {/* ✅ Button */}
          <div className="modal-action justify-center mt-4 flex items-center">
            <button
              onClick={() => setShowSuccessModal(false)}
              className="btn bg-green-500 text-white px-8"
            >
              Done
            </button>
            <button className=" btn" onClick={() => handleDownload(cart)}>
              Download Invoice
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default OrderPage;
