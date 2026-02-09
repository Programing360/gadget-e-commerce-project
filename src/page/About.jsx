import React from "react";
import {
  BadgeCheck,
  GraduationCap,
  Video,
  Headphones,
  Handshake,
  MapPin,
} from "lucide-react";
import { ShoppingBag, Mail } from "lucide-react";
import { Link } from "react-router";
const About = () => {
  const stats = [
    {
      value: "10+",
      title: "Years Experience",
      desc: "Serving Bangladesh since 2014",
    },
    {
      value: "5K+",
      title: "Original Products",
      desc: "Authentic electronics & gadgets",
    },
    {
      value: "64",
      title: "Districts",
      desc: "Nationwide delivery coverage",
    },
    {
      value: "100%",
      title: "Authentic",
      desc: "Original products guarantee",
    },
  ];
  const values = [
    {
      icon: <BadgeCheck size={28} className="text-white" />,
      title: "100% Original",
      desc: "We guarantee authentic products only. Every item is sourced directly from authorized dealers and manufacturers to ensure originality.",
    },
    {
      icon: <GraduationCap size={28} className="text-white" />,
      title: "Knowledge-Based",
      desc: "We provide detailed, content-oriented information about every product to help you make informed purchasing decisions.",
    },
    {
      icon: <Video size={28} className="text-white" />,
      title: "Creator Focused",
      desc: "Specialized in gear for YouTubers, vloggers, and content creators with microphones, tripods, and professional equipment.",
    },
    {
      icon: <Headphones size={28} className="text-white" />,
      title: "Complete Support",
      desc: "Dedicated pre-sales and post-sales support to ensure a secure and pleasant online shopping experience for every customer.",
    },
    {
      icon: <Handshake size={28} className="text-white" />,
      title: "Trusted Platform",
      desc: "Built on trust and reliability over 10 years, we're committed to transparency and keeping our promises to customers.",
    },
    {
      icon: <MapPin size={28} className="text-white" />,
      title: "Physical Presence",
      desc: "Visit our Dhaka office to see products firsthand and schedule pickups. We combine online convenience with offline trust.",
    },
  ];
  return (
    <div className="mb-10">
      <div className="bg-indigo-500 pt-30 text-center">
        <h1 className=" md:text-5xl text-2xl text-white font-bold pb-4">
          ABOUT Zeroo<span className="text-[#ff4e5c]">m</span>
          <span className="text-[#fdb529]">iro</span>
        </h1>
        <p className="text-lg font-bold text-white md:w-150 text-center mx-auto max-w-150">
          Bangladesh's Trusted E-commerce Platform for Original Electronics &
          Content Creator Gear Since 2026
        </p>
        <div className="flex gap-4 justify-center py-20">
          <h1 className="md:w-60 py-3 rounded-2xl bg-indigo-400 text-white font-semibold px-2">
            <span>BD</span> Made in Bangladesh
          </h1>
          <h1 className="md:w-60 py-3 rounded-2xl bg-indigo-400 text-white font-semibold px-2">
            Original Products
          </h1>
          <h1 className="md:w-60 py-3 rounded-2xl bg-indigo-400 text-white font-semibold px-2">
            Creator Focused
          </h1>
        </div>
      </div>
      <main>
        <section>
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-6 text-center relative overflow-hidden hover:-translate-y-3 duration-250 hover:skew-x-3"
                >
                  {/* Top gradient line */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500" />

                  <h2 className="text-4xl font-bold text-indigo-500 mb-2">
                    {item.value}
                  </h2>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="max-w-7xl mx-auto px-4 py-16">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-indigo-500">Our Values</h2>
            <p className="text-gray-500 mt-3">
              The principles that guide everything we do
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-lg p-8 text-center hover:shadow-xl transition"
              >
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center rounded-full bg-indigo-500">
                  {item.icon}
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section className="w-full bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 py-24">
          <div className="max-w-5xl mx-auto px-4 text-center text-white">
            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Shop Authentic Electronics?
            </h2>

            {/* Description */}
            <p className="text-lg text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
              Join content creators and tech enthusiasts who trust BDSHOP for
              100% original electronics. Discover authentic products, expert
              guidance, and exceptional support since 2014.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <Link to='/userAllProduct'>
                <button className="flex items-center gap-2 bg-white text-indigo-600 font-semibold px-8 py-4 rounded-full hover:bg-gray-100 transition">
                  <ShoppingBag size={18} />
                  Start Shopping
                </button>
              </Link>

              <button className="flex items-center gap-2 border border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition">
                <Mail size={18} />
                Contact Us
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
