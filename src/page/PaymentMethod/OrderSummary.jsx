import useCart from "../../Hook/useCart";

const OrderSummary = () => {
  const [cart] = useCart();
 
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const shipping = 70;
    const total = subtotal + shipping;
//  console.log(subtotal);
  return (
    <div className="bg-base-200 p-4 rounded space-y-4">
      {cart.map((item) => (
        <div key={item._id} className="flex gap-3">
          <div className="relative">
            <img src={item.image} className="w-14 h-14 rounded border " alt="" />
            <span className="absolute top-0 right-12 bg-black w-5 rounded h-5 text-white text-center">{item.quantity}</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{item.name}</p>
            <p className="text-sm">৳{item.price}</p>
          </div>
        </div>
      ))}

      <hr />

      <p className="flex justify-between text-sm">
        <span>Subtotal</span>
        <span>৳{subtotal}</span>
      </p>

      <p className="flex justify-between text-sm">
        <span>Shipping</span>
        <span>৳{shipping}</span>
      </p>

      <p className="flex justify-between font-bold">
        <span>Total</span>
        <span>৳{total}</span>
      </p>
    </div>
  );
};

export default OrderSummary;
