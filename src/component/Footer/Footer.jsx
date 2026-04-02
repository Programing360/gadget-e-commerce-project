import {
  Phone,
  Mail,
  Clock,
  Facebook,
  Youtube,
  Instagram,
  ChevronRight,
  Send,
} from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const links = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/userAllProduct" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contract" },
];
const categories = [
  { name: "Smartphones", path: "/userAllProduct" },
  { name: "Laptops", path: "/userAllProduct" },
  { name: "Gaming", path: "/userAllProduct" },
  { name: "Accessories", path: "/userAllProduct" },
];

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#020617] text-white overflow-hidden">
      {/* 🔥 Top Wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-[80px]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.29,22,104,29,158,17,70-16,136-56,207-68,73-13,147,6,218,26,69,20,138,42,209,40,72-2,142-29,213-45,69-15,138-15,207,5V0Z"
            opacity=".25"
            className="fill-[#0f172a]"
          ></path>
        </svg>
      </div>

      {/* 🔥 Glow Effect */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500 opacity-20 blur-[140px] rounded-full"></div>

      {/* 🔥 Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="lg:col-span-2"
        >
          <Link to="/">
            <span className="font-semibold text-2xl animate-text-gradient bg-linear-to-r from-pink-500 via-blue-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]">
              Zeroomiro
            </span>
          </Link>

          <p className="text-sm text-gray-400 mt-3 max-w-md">
            At ZerooMiro, We believe shopping should be simple reliable and
            exciting. Explore a wide range of products - handpicked for quality
            and satisfaction.
            <br />
            Your trust, Our priority.
          </p>

          <div className="mt-6 space-y-3 text-sm text-gray-400">
            <p className="flex items-center gap-2 hover:text-white transition">
              <Phone size={16} /> 01540561692
            </p>
            <p className="flex items-center gap-2 hover:text-white transition">
              <Mail size={16} /> zeroomiro@gmail.com
            </p>
            <p className="flex items-center gap-2 hover:text-white transition">
              <Clock size={16} /> 10AM - 11PM
            </p>
          </div>

          {/* Social */}
          <div className="mt-6 flex gap-3">
            <a
              href="https://www.facebook.com/Zeroomirooo"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-blue-600 hover:scale-110 transition cursor-pointer"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://www.instagram.com/zeroomiro?utm_source=qr&igsh=Nnpwc3hwNGgyb2py"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-pink-600 hover:scale-110 transition cursor-pointer"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://www.youtube.com/@Zeroomirooo"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-red-600 hover:scale-110 transition cursor-pointer"
            >
              <Youtube size={18} />
            </a>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <h3 className="font-semibold mb-5">Quick Links</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            {links.map((item) => (
              <li
                key={item.name}
                className="flex items-center gap-2 hover:text-white transition cursor-pointer hover:translate-x-1"
              >
                <ChevronRight size={14} />
                <Link
                  to={item.path}
                  className="hover:text-white transition hover:translate-x-1"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Categories */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <h3 className="font-semibold mb-5">Categories</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            {categories.map((item) => (
              <li
                key={item.name}
                className="flex items-center gap-2 hover:text-white transition cursor-pointer hover:translate-x-1"
              >
                <ChevronRight size={14} />
                <Link
                  to={item.path}
                  className="hover:text-white transition hover:translate-x-1"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Newsletter */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <h3 className="font-semibold mb-5">Newsletter</h3>

          <div className="flex items-center bg-white/5 border border-white/10 rounded-lg overflow-hidden">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 bg-transparent outline-none text-sm"
            />
            <button className="px-4 bg-blue-600 hover:bg-blue-500 transition py-2 z-0 btn text-white outline-0">
              <Send size={16} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 text-center py-6 text-sm text-gray-400">
        © 2026{" "}
        <span className="font-semibold animate-text-gradient bg-gradient-to-r from-pink-500 via-blue-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]">
          Zeroomiro
        </span>
        • Build with ❤️
      </div>
    </footer>
  );
};

export default Footer;
