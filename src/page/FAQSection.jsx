import { useState } from "react";
import { ChevronDown, Mail } from "lucide-react";

const faqs = [
  {
    q: "What payment methods do you accept?",
    a: "We accept cash on delivery, bKash, Nagad, Rocket, bank transfer, and all major debit/credit cards.",
  },
  {
    q: "What are your delivery times and charges?",
    a: "Delivery inside Dhaka takes 24–48 hours. Outside Dhaka takes 2–4 working days. Charges vary by location.",
  },
  {
    q: "Do you offer warranty on products?",
    a: "Yes, all products come with official brand warranty where applicable.",
  },
  {
    q: "What is your return and refund policy?",
    a: "We offer easy returns within 3 days for damaged or incorrect items. Refunds are processed within 5–7 working days.",
  },
  {
    q: "How can I track my order?",
    a: "After placing an order, you will receive a tracking ID via SMS or email to track your order status.",
  },
  {
    q: "Do you ship outside of Dhaka?",
    a: "Yes, we deliver to all 64 districts across Bangladesh.",
  },
  {
    q: "Are the products genuine and authentic?",
    a: "Absolutely. We sell 100% original and authentic products sourced from authorized distributors.",
  },
  {
    q: "What are your customer service hours?",
    a: "Our customer service is available daily from 10:00 AM to 11:00 PM.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-500 mt-3">
          Everything you need to know about shopping at BDShop
        </p>
      </div>

      {/* FAQ list */}
      <div className="space-y-4">
        {faqs.map((item, index) => (
          <div
            key={index}
            className="border rounded-xl overflow-hidden bg-white"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between px-6 py-5 text-left"
            >
              <span className="font-medium text-gray-900">
                {item.q}
              </span>
              <ChevronDown
                className={`transition-transform ${
                  openIndex === index ? "rotate-180 text-blue-600" : "text-blue-600"
                }`}
              />
            </button>

            {openIndex === index && (
              <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-14">
        <p className="text-gray-500 mb-4">Still have questions?</p>
        <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          <Mail size={18} />
          Contact Us
        </button>
      </div>
    </section>
  );
};

export default FAQSection;
