import React, { useContext } from 'react';
import { UseContext } from '../../Context/AuthContext';

const CashOnDelivery = () => {
        const {open, setOpen} = useContext(UseContext)
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[420px] rounded-lg p-5 relative">

        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute right-3 top-3 btn btn-sm btn-circle"
        >
          ✕
        </button>

        <h2 className="text-lg font-bold mb-4 text-center">
          ক্যাশ অন ডেলিভারিতে অর্ডার করতে আপনার তথ্য দিন
        </h2>

        {/* Form */}
        <form className="space-y-3">
          <input
            type="text"
            placeholder="আপনার নাম"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="ফোন নাম্বার"
            className="input input-bordered w-full"
          />
          <textarea
            placeholder="এড্রেস"
            className="textarea textarea-bordered w-full"
          />

          {/* Shipping */}
          <div className="border rounded p-3 space-y-2">
            <label className="flex justify-between">
              <span>
                <input type="radio" name="shipping" defaultChecked /> ঢাকা সিটির ভিতরে
              </span>
              <span>৳70</span>
            </label>

            <label className="flex justify-between">
              <span>
                <input type="radio" name="shipping" /> চট্টগ্রাম সিটির ভিতরে
              </span>
              <span>৳70</span>
            </label>

            <label className="flex justify-between">
              <span>
                <input type="radio" name="shipping" /> ঢাকা ও চট্টগ্রামের বাইরে
              </span>
              <span>৳130</span>
            </label>
          </div>

          <button className="btn btn-warning w-full">
            অর্ডার কনফার্ম করুন
          </button>
        </form>
      </div>
    </div>
  );
};

export default CashOnDelivery;