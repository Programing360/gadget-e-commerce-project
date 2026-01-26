import { useMemo, useState } from "react";
import countryList from "react-select-country-list";


const CheckoutForm = () => {
  const [shipping, setShipping] = useState(70);
  const [payment, setPayment] = useState("cod");
  const countries = useMemo(() => countryList().getData(), []);
  return (
    <div>
        
      <div className="space-y-6">
        {/* Contact */}
        <div>
          <h2 className="font-semibold text-lg mb-2">Contact</h2>
          <input
            type="text"
            placeholder="Phone number"
            className="input input-bordered w-full"
          />
        </div>

        {/* Delivery */}
        <div>
          <h2 className="font-semibold text-lg mb-2">Delivery</h2>

          <div className="space-y-3">
            <select className="select select-bordered w-full">
              {countries.map((country) => (
                <option key={country.value} value={country.label}>
                  {country.label}
                </option>
              ))}
            </select>

            <div className="flex gap-3">
              <input
                type="text"
                placeholder="First name (optional)"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Last name"
                className="input input-bordered w-full"
              />
            </div>

            <input
              type="text"
              placeholder="Address"
              className="input input-bordered w-full"
            />

            <input
              type="text"
              placeholder="City"
              className="input input-bordered w-full"
            />

            <input
              type="text"
              placeholder="Postal Code (optional)"
              className="input input-bordered w-full"
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="input input-bordered w-full"
            />

            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="checkbox checkbox-sm" />
              Save this information for next time
            </label>
          </div>
        </div>

        {/* Shipping Method */}
        <div>
          <h2 className="font-semibold text-lg mb-2">Shipping Method</h2>

          <div className="border rounded divide-y">
            <label className="flex justify-between p-3">
              <span>
                <input
                  type="radio"
                  name="shipping"
                  defaultChecked
                  onChange={() => setShipping(70)}
                />{" "}
                Inside Sirajganj
              </span>
              <span>৳70.00</span>
            </label>

            <label className="flex justify-between p-3">
              <span>
                <input
                  type="radio"
                  name="shipping"
                  onChange={() => setShipping(70)}
                />{" "}
                Inside Dhaka City
              </span>
              <span>৳70.00</span>
            </label>

            <label className="flex justify-between p-3">
              <span>
                <input
                  type="radio"
                  name="shipping"
                  onChange={() => setShipping(130)}
                />{" "}
                Outside Dhaka & Sirajganj
              </span>
              <span>৳130.00</span>
            </label>
          </div>
        </div>

        {/* Payment */}
        <div>
          <h2 className="font-semibold text-lg mb-1">Payment</h2>
          <p className="text-sm text-gray-500 mb-2">
            All transactions are secure and encrypted.
          </p>

          <div className="border rounded divide-y">
            <label className="flex items-center gap-2 p-3">
              <input
                type="radio"
                name="payment"
                onChange={() => setPayment("ssl")}
              />
              SSLCOMMERZ
            </label>

            <label className="flex items-center gap-2 p-3">
              <input
                type="radio"
                name="payment"
                defaultChecked
                onChange={() => setPayment("cod")}
              />
              Cash on Delivery (COD)
            </label>
            {/* <label>
            <details className="collapse bg-base-100 border-base-300 ">
            <summary className="collapse-title font-semibold border">
              <input
                type="radio"
                name="payment"
                id=""
                onChange={() => setPayment("cod")}
              />
              Cash on Delivery (COD)
            </summary>
            <div className="collapse-content text-sm text-center border-t">
              Cash On Delivery
            </div>
          </details>
          </label> */}
          </div>
        </div>

        {/* Billing Address */}
        <div>
          <h2 className="font-semibold text-lg mb-2">Billing Address</h2>
          <label className="flex items-center gap-2">
            <input type="radio" defaultChecked />
            Same as shipping address
          </label>
        </div>

        {/* Place Order */}
        <button className="btn btn-warning w-full">Place Order</button>
      </div>
    </div>
  );
};

export default CheckoutForm;
