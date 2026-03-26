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
import { motion } from "framer-motion";
const About = () => {
  const stats = [
    {
      value: "5+",
      title: "Years Experience",
      desc: "Trusted by customers all over Bangladesh",
    },
    {
      value: "5K+",
      title: "Premium Product",
      desc: "Carefully selected quality items",
    },
    {
      value: "64",
      title: "Districts",
      desc: "Fast delivery across Bangladesh",
    },
    {
      value: "99%",
      title: "Customer Satisfaction",
      desc: "Committed to best service experience",
    },
    {
      value: "24/7",
      title: "Support",
      desc: "Always here to help you",
    },
    {
      value: "500+",
      title: "Curated Products",
      desc: "Handpicked for quality & performance",
    },
  ];
  const values = [
    {
      icon: <BadgeCheck size={28} className="text-white" />,
      title: "Authenticity",
      desc: "Only genuine, verified products.",
    },
    {
      icon: <GraduationCap size={28} className="text-white" />,
      title: "Clarity",
      desc: "Clear specs for smarter decisions.",
    },
    {
      icon: <Video size={28} className="text-white" />,
      title: "Creators",
      desc: "Tools built for content creators.",
    },
    {
      icon: <Headphones size={28} className="text-white" />,
      title: "Support",
      desc: "Always here to help you.",
    },
    {
      icon: <Handshake size={28} className="text-white" />,
      title: "Trust",
      desc: "Reliable and transparent service.",
    },
    {
      icon: <MapPin size={28} className="text-white" />,
      title: "Presence",
      desc: "Online ease, offline assurance.",
    },
  ];
  return (
    <div className="mb-10">
      <div className="relative pt-32 pb-24 text-center overflow-hidden">
        {/* 🔥 Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e1b4b] via-[#312e81] to-[#0f172a] animate-gradient-x"></div>

        {/* 🔥 Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-500 opacity-20 blur-[120px] rounded-full"></div>

        <div className="relative z-10 px-4">
          {/* 🔥 Title Animation */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="md:text-5xl text-3xl font-bold text-white leading-tight"
          >
            ABOUT{" "}
            <span className="bg-gradient-to-r from-[#534d89] via-[#3f9cb6] to-[#9b9a3b] bg-clip-text text-transparent">
              Zeroomiro
            </span>
          </motion.h1>

          {/* 🔥 Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-4 text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Bangladesh's trusted e-commerce platform for original electronics &
            creator gear. Built with passion, powered by innovation.
          </motion.p>

          {/* 🔥 CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="flex justify-center gap-4 mt-8 flex-wrap"
          >
            <Link to="/userAllProduct">
              <button className="px-6 py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition">
                Explore Products
              </button>
            </Link>

            <Link to="/contact">
              <button className="px-6 py-3 rounded-lg border border-white text-white hover:bg-white hover:text-black transition">
                Contact Us
              </button>
            </Link>
          </motion.div>

          {/* 🔥 Feature Tags */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="flex flex-wrap justify-center gap-4 mt-10"
          >
            <div className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium hover:scale-105 transition">
              🇧🇩 Made in Bangladesh
            </div>

            <div className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium hover:scale-105 transition">
              ✅ 100% Original Products
            </div>

            <div className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium hover:scale-105 transition">
              🎥 Creator Focused
            </div>
          </motion.div>
        </div>
      </div>
      <main>
        <section>
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((item, index) => (
                <div
                  data-aos="flip-down"
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-6 text-center relative overflow-hidden hover:-translate-y-3 duration-250 hover:skew-x-3"
                >
                  {/* Top gradient line */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-purple-500 to-indigo-500" />

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
                data-aos="flip-left"
                key={index}
                className="bg-white rounded-3xl shadow-lg p-8 text-center hover:shadow-xl transition hover:bg-gray-100 cursor-pointer"
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
        <section className="w-full bg-linear-to-r from-purple-600 via-indigo-500 to-blue-600 py-24">
          <div className="max-w-5xl mx-auto px-4 text-center text-white">
            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Shop Authentic Electronics?
            </h2>

            {/* Description */}
            <p className="text-lg text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
              Join content creators and tech enthusiasts who trust Zeroomiro for
              100% original electronics. Discover authentic products, expert
              guidance, and exceptional support since 2014.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <Link to="/userAllProduct">
                <button className="flex items-center gap-2 bg-white text-indigo-600 font-semibold px-8 py-4 rounded-full hover:bg-gray-100 transition">
                  <ShoppingBag size={18} />
                  Start Shopping
                </button>
              </Link>

              <Link to="/contract">
                <button className="flex items-center gap-2 border border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition">
                  <Mail size={18} />
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
