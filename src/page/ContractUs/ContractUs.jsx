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
import SEO from "../../component/SEO/SEO";
import { motion } from "framer-motion";
import DarkModeToggle from "../../component/DarkMood/DarkModeToggle";
import ContactForm from "./ContactForm";
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
      <SEO
        title="Contact Page - Zeroomiro"
        description="Your opinion and other information shere with us"
      />
      <div className="relative overflow-hidden py-20 px-4 text-center">
        {/* 🔥 Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e1b4b] via-[#4338ca] to-[#0f172a] animate-gradient-x"></div>

        {/* 🔥 Glow Effect */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500 opacity-20 blur-[120px] rounded-full"></div>

        {/* 🔥 Content */}
        <div className="relative z-10">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-5xl font-bold text-white"
          >
            Get in Touch
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="max-w-2xl mx-auto text-gray-300 mt-4 text-sm md:text-lg leading-relaxed"
          >
            We'd love to hear from you! Whether you have questions about our
            products, need help with an order, or just want to say hello.
          </motion.p>

          {/* 🔥 Optional CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-6"
          >
            <button className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition">
              Contact Now
            </button>
          </motion.div>
        </div>
      </div>
      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
        {/* ================= LEFT - FORM ================= */}
        <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition duration-300">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-6 text-gray-800">
            <Mail size={22} className="text-[#615fff]" /> Send us a Message
          </h2>

          <form className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Full Name *</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full border rounded-xl p-3 mt-1 focus:ring-2 focus:ring-[#615fff] focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Email Address *</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border rounded-xl p-3 mt-1 focus:ring-2 focus:ring-[#615fff] focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Phone Number</label>
                <input
                  type="text"
                  placeholder="017XXXXXXXX"
                  className="w-full border rounded-xl p-3 mt-1 focus:ring-2 focus:ring-[#615fff] outline-none transition"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Subject *</label>
                <select className="w-full border rounded-xl p-3 mt-1 focus:ring-2 focus:ring-[#615fff] outline-none transition">
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
                className="w-full border rounded-xl p-3 mt-1 focus:ring-2 focus:ring-[#615fff] outline-none transition"
              ></textarea>
            </div>

            <button className="w-full bg-gradient-to-r from-[#615fff] to-blue-600 hover:scale-[1.02] transition transform text-white py-3 rounded-xl flex items-center justify-center gap-2 font-semibold shadow-md">
              <Send size={18} /> Send Message
            </button>
          </form>
        </div>

        {/* ================= RIGHT - CONTACT INFO ================= */}
        <div className="bg-gradient-to-br from-[#615fff] to-indigo-700 text-white rounded-2xl shadow-xl p-8 space-y-8">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <MapPin size={22} /> Contact Information
          </h2>

          {/* Address */}
          <div className="flex gap-4 items-start">
            <div className="bg-white/20 p-3 rounded-xl">
              <MapPin size={20} />
            </div>
            <div>
              <h4 className="font-semibold">Shop Address</h4>
              <p className="text-sm opacity-80 mt-1">
                Elephant Road, Dhaka-1205 <br />
                Bangladesh
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex gap-4 items-start">
            <div className="bg-white/20 p-3 rounded-xl">
              <Phone size={20} />
            </div>
            <div>
              <h4 className="font-semibold">Call Us</h4>
              <p className="font-medium">09678-300400</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex gap-4 items-start">
            <div className="bg-white/20 p-3 rounded-xl">
              <Mail size={20} />
            </div>
            <div>
              <h4 className="font-semibold">Email</h4>
              <p className="text-sm opacity-80">info@zeroomiro.com</p>
            </div>
          </div>

          {/* Hours */}
          <div className="flex gap-4 items-start">
            <div className="bg-white/20 p-3 rounded-xl">
              <Clock size={20} />
            </div>
            <div>
              <h4 className="font-semibold">Business Hours</h4>
              <p className="text-sm opacity-80">10AM - 11PM (Everyday)</p>
            </div>
          </div>
        </div>
      </div>
      {/* <ContactForm></ContactForm> */}
      <div className="max-w-7xl mx-auto px-6 pb-16 space-y-10">
        {/* FOLLOW */}
        <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Share2 size={20} className="text-[#615fff]" /> Follow Us
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { name: "Facebook", color: "bg-blue-600" },
              { name: "Instagram", color: "bg-pink-500" },
              { name: "WhatsApp", color: "bg-green-500" },
              { name: "Twitter", color: "bg-blue-400" },
            ].map((item) => (
              <button
                key={item.name}
                className={`${item.color} hover:scale-105 transition transform text-white py-3 rounded-xl font-semibold`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* QUICK ACTION */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Zap size={20} className="text-[#615fff]" /> Quick Actions
          </h2>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 hover:scale-[1.01] transition cursor-pointer">
              <Search size={18} />
              <div>
                <h4 className="font-semibold">Track Order</h4>
                <p className="text-sm text-gray-500">Check your order status</p>
              </div>
            </div>

            <Link to="/userDashBoard">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 hover:scale-[1.01] transition cursor-pointer">
                <History size={18} />
                <div>
                  <h4 className="font-semibold">Order History</h4>
                  <p className="text-sm text-gray-500">View previous orders</p>
                </div>
              </div>
            </Link>

            <div
              onClick={handleFAQ}
              className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 hover:scale-[1.01] transition cursor-pointer"
            >
              <HelpCircle size={18} />
              <div>
                <h4 className="font-semibold">FAQs</h4>
                <p className="text-sm text-gray-500">Common questions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <h1 className="text-2xl text-center font-bold mb-3">Our Location</h1>
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <iframe
            title="Zeroomiro Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3629.8405972009336!2d89.53318607591437!3d24.525597558574265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fdb7e3b76d077d%3A0x4be8a7e8c24209f3!2sDhangora%20Bazar!5e0!3m2!1sen!2sbd!4v1774531703413!5m2!1sen!2sbd"
            className="w-full h-[400px] border-0"
            loading="lazy"
          ></iframe>
        </div>
      </div>
      {/* <DarkModeToggle></DarkModeToggle> */}
    </div>
  );
};

export default ContactUs;
