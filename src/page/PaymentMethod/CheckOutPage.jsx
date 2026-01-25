import CheckoutForm from "./CheckOutForm";
import OrderSummary from "./OrderSummary";


const CheckoutPage = ({ cart }) => {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left */}
        <div className="flex-1">
          <CheckoutForm />
        </div>

        {/* Right */}
        <div className="w-full md:w-[380px]">
          <OrderSummary cart={cart} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
