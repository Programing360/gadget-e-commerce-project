import Dock from "../../component/Dock";
import PageLogo from "../PageLogo/PageLogo";
import CheckoutForm from "./CheckOutForm";
import OrderSummary from "./OrderSummary";

const CheckoutPage = ({ cart }) => {
  return (
    <div>
      <div className="border-b border-gray-300 sticky top-0 z-50 shadow-md bg-gray-100">
        <PageLogo></PageLogo>
      </div>
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-8">
          
          <div className="flex-1 mb-10">
            <CheckoutForm />
          </div>

         
          {/* <div className="w-full md:w-[380px]">
            <OrderSummary cart={cart} />
            </div> */}
        </div>
            <Dock></Dock>
      </div>
    </div>
  );
};

export default CheckoutPage;
