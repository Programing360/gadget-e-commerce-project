import React, { useContext } from "react";
import { Mail, MapPin, Phone, Clock, Send } from "lucide-react";
  import { useNavigate } from "react-router";
import {
  Facebook,
  Instagram,
  Twitter,
  MessageCircle,
  Share2,
  Zap,
  Search,
  History,
  HelpCircle,
  Star,
} from "lucide-react";
import { UseContext } from "../../Context/AuthContext";
import { Link, useLocation } from "react-router";
const ContactUs = () => {
  const { user } = useContext(UseContext);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";


const navigate = useNavigate();

const handleFAQ = () => {
  navigate("/"); // first go to home

  setTimeout(() => {
    const section = document.getElementById("faq");
    section?.scrollIntoView({ behavior: "smooth" });
  }, 100);
};

  return (
    <div className="bg-gray-100 min-h-screen mt-20 dark:text-black">
      {/* Top Banner */}
      <div className="bg-[#615fff] text-white text-center py-14 px-4">
        <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
        <p className="max-w-2xl mx-auto text-blue-100">
          We'd love to hear from you! Whether you have questions about our
          products, need help with an order, or just want to say hello.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8">
        {/* LEFT SIDE - FORM */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
            <Mail size={20} /> Send us a Message
          </h2>

          <form className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Full Name *</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full border rounded-lg p-3 mt-1 focus:ring-2 focus:ring-[#615fff] outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Email Address *</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border rounded-lg p-3 mt-1 focus:ring-2 focus:ring-[#615fff] outline-none"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Phone Number</label>
                <input
                  type="text"
                  placeholder="01712345678 (optional)"
                  className="w-full border rounded-lg p-3 mt-1 focus:ring-2 focus:ring-[#615fff] outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Subject *</label>
                <select className="w-full border rounded-lg p-3 mt-1 focus:ring-2 focus:ring-[#615fff] outline-none">
                  <option>Select a subject</option>
                  <option>Order Issue</option>
                  <option>Product Inquiry</option>
                  <option>General Question</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Message *</label>
              <textarea
                rows="5"
                placeholder="Tell us how we can help you..."
                className="w-full border rounded-lg p-3 mt-1 focus:ring-2 focus:ring-[#615fff] outline-none"
              ></textarea>
            </div>

            <button className="w-full bg-[#615fff] hover:bg-blue-800 transition text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium">
              <Send size={18} /> Send Message
            </button>
          </form>
        </div>

        {/* RIGHT SIDE - CONTACT INFO */}
        <div className="bg-white rounded-xl shadow-2xl p-8 space-y-8">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <MapPin size={20} /> Contact Information
          </h2>

          {/* Address */}
          <div className="flex gap-4">
            <div className="bg-[#615fff] text-white p-3 rounded-lg">
              <MapPin size={20} />
            </div>
            <div>
              <h4 className="font-semibold">Shop & Display Center Address</h4>
              <p className="text-gray-600 text-sm mt-1">
                G3, Ground Floor, House# 307,
                <br />
                Elephant Road, Dhaka-1205, Bangladesh
              </p>
              <p className="text-green-600 text-sm mt-2">
                (10am–8pm, Closed on Tuesday)
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex gap-4">
            <div className="bg-[#615fff] text-white p-3 rounded-lg">
              <Phone size={20} />
            </div>
            <div>
              <h4 className="font-semibold">Call Us</h4>
              <p className="text-[#615fff] font-medium">09678-300400</p>
              <p className="text-green-600 text-sm">
                10am–8pm (Closed on Tuesday)
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex gap-4">
            <div className="bg-[#615fff] text-white p-3 rounded-lg">
              <Mail size={20} />
            </div>
            <div>
              <h4 className="font-semibold">Mail Us</h4>
              <p className="text-gray-600 text-sm">info@bdshop.com</p>
            </div>
          </div>

          {/* Hours */}
          <div className="flex gap-4">
            <div className="bg-[#615fff] text-white p-3 rounded-lg">
              <Clock size={20} />
            </div>
            <div>
              <h4 className="font-semibold">Business Hours</h4>
              <p className="text-green-600 text-sm">
                Online Operations: 10:00 AM - 11:00 PM
              </p>
              <p className="text-green-600 text-sm">Everyday (7 Days a Week)</p>
              <p className="text-gray-500 text-sm">
                24/7 Online Shopping Available
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pb-16 space-y-10">
        {/* ================= FOLLOW US ================= */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
            <Share2 size={20} /> Follow Us
          </h2>

          {/* Social Buttons */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition">
              <Facebook size={18} /> Facebook
            </button>

            <button className="bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition">
              <Instagram size={18} /> Instagram
            </button>

            <button className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition">
              <MessageCircle size={18} /> WhatsApp
            </button>

            <button className="bg-blue-400 hover:bg-blue-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition">
              <Twitter size={18} /> Twitter
            </button>
          </div>

          {/* Highlight Box */}
          <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 p-4 rounded-lg">
            <div className="flex items-start gap-2">
              <Star size={18} className="mt-1" />
              <div>
                <p className="font-medium">
                  Join our community for exclusive offers!
                </p>
                <p className="text-sm">
                  Follow us on social media for beauty tips, new arrivals, and
                  special discounts.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= QUICK ACTIONS ================= */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
            <Zap size={20} /> Quick Actions
          </h2>

          <div className="space-y-4">
            {/* Track Order */}
            <div className="flex items-center gap-4 bg-gray-100 hover:bg-gray-200 transition p-4 rounded-lg cursor-pointer">
              <div className="bg-blue-200 text-blue-700 p-3 rounded-lg">
                <Search size={18} />
              </div>
              <div>
                <h4 className="font-semibold">Track Your Order</h4>
                <p className="text-sm text-gray-600">
                  Check the status of your recent orders
                </p>
              </div>
            </div>

            {/* Order History */}
            {user ? (
              <Link to="/userDashBoard">
                <div className="flex items-center gap-4 bg-gray-100 hover:bg-gray-200 transition p-4 rounded-lg cursor-pointer">
                  <div className="bg-gray-300 text-gray-700 p-3 rounded-lg">
                    <History size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold">Order History</h4>
                    <p className="text-sm text-gray-600">
                      View all your previous orders
                    </p>
                  </div>
                </div>
              </Link>
            ) : (
              <Link
                to="/login"
                state={{ from}}
                className="text-blue-600 hover:underline"
              >
                <div className="flex items-center gap-4 bg-gray-100 hover:bg-gray-200 transition p-4 rounded-lg cursor-pointer">
                  <div className="bg-gray-300 text-gray-700 p-3 rounded-lg">
                    <History size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold">Order History</h4>
                    <p className="text-sm text-gray-600">
                      View all your previous orders
                    </p>
                  </div>
                </div>
              </Link>
            )}

            {/* FAQs */}
            <Link >
              <div onClick={handleFAQ} className="flex items-center gap-4 bg-gray-100 mt-4 hover:bg-gray-200 transition p-4 rounded-lg cursor-pointer start-0">
                <div className="bg-purple-200 text-purple-700 p-3 rounded-lg">
                  <HelpCircle size={18} />
                </div>
                <div>
                  <h4 className="font-semibold">FAQs</h4>
                  <p className="text-sm text-gray-600">
                    Find answers to common questions
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
