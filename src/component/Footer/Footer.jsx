import {
  Phone,
  Mail,
  Clock,
  Facebook,
  Youtube,
  ChevronRight,
  Send,
} from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#0b2a44] to-[#061e33] text-white">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand */}
        <div className="lg:col-span-2">
          <Link to="/">
            <h1 className=" md:text-2xl font-bold text-[#ffffff]">
              Zeroo<span className="text-[#ff4e5c]">m</span>
              <span className="text-[#fdb529]">iro</span>
              <span className="text-blue-400">™</span>
            </h1>
          </Link>
          <p className="text-sm text-white/70 mb-6 max-w-md">
            Your premier destination for quality electronics and gadgets. We
            deliver excellence in every product.
          </p>

          <div className="space-y-3 text-sm text-white/80">
            <p className="flex items-center gap-2">
              <Phone size={16} /> 09678-300400
            </p>
            <p className="flex items-center gap-2">
              <Mail size={16} /> info@bdshop.com
            </p>
            <p className="flex items-center gap-2">
              <Clock size={16} /> 10:00 AM - 11:00 PM
            </p>
          </div>

          {/* Social */}
          <div className="mt-6">
            <p className="mb-3 font-semibold">Follow Us</p>
            <div className="flex gap-3">
              <a className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition">
                <Facebook size={18} />
              </a>
              <a className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition">
                <Facebook size={18} />
              </a>
              <a className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition">
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-5">Quick Links</h3>
          <ul className="space-y-3 text-sm text-white/80">
            <Link to="/">
              <li className="flex items-center gap-2 hover:text-white cursor-pointer">
                <ChevronRight size={14} /> Home
              </li>
            </Link>
            <Link to="/userAllProduct">
              <li className="flex items-center gap-2 hover:text-white cursor-pointer">
                <ChevronRight size={14} /> Shop
              </li>
            </Link>
            <Link to="/specialOffers">
              <li className="flex items-center gap-2 hover:text-white cursor-pointer">
                <ChevronRight size={14} /> Special Offers
              </li>
            </Link>
            <Link to="/about">
              <li className="flex items-center gap-2 hover:text-white cursor-pointer">
                <ChevronRight size={14} /> About Us
              </li>
            </Link>
            <Link to="/contract">
              <li className="flex items-center gap-2 hover:text-white cursor-pointer">
                <ChevronRight size={14} /> Contract
              </li>
            </Link>
            <Link to='/userDashBoard'>
              <li className="flex items-center gap-2 hover:text-white cursor-pointer">
                <ChevronRight size={14} /> Order Info
              </li>
            </Link>

            {/* {[
              "Home",
              "Shop",
              "Special Offers",
              "About Us",
              "Contact",
              "Track Order",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 hover:text-white cursor-pointer"
              >
                <ChevronRight size={14} /> {item}
              </li>
            ))} */}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-semibold mb-5">Categories</h3>
          <ul className="space-y-3 text-sm text-white/80">
            {[
              "Smartphones",
              "Laptops & Computers",
              "Gaming",
              "Audio & Headphones",
              "Smart Home",
              "Accessories",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 hover:text-white cursor-pointer"
              >
                <ChevronRight size={14} /> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="font-semibold mb-5">Customer Service</h3>
          <ul className="space-y-3 text-sm text-white/80">
            {[
              "FAQ",
              "Shipping Info",
              "Returns & Refunds",
              "Privacy Policy",
              "Terms & Conditions",
              "Support Center",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 hover:text-white cursor-pointer"
              >
                <ChevronRight size={14} /> {item}
              </li>
            ))}
          </ul>

          {/* Newsletter */}
          <div className="mt-8">
            <h4 className="font-semibold mb-3">Newsletter</h4>
            <p className="text-sm text-white/70 mb-3">
              Subscribe for exclusive deals & updates
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-l-lg bg-white/10 outline-none text-sm"
              />
              <button className="px-4 bg-blue-600 rounded-r-lg hover:bg-blue-700 transition">
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/70">
          <p>
            © 2026{" "}
            <span className="text-white font-semibold">
              <span className=" font-bold text-[#ffffff]">
                Zeroo<span className="text-[#ff4e5c]">m</span>
                <span className="text-[#fdb529]">iro</span>
              </span>
            </span>
            . All rights reserved
          </p>

          <p>
            Developed with ❤️ by <span className="text-white">SmartB</span>
          </p>

          <div className="flex items-center gap-3">
            <span>Secure Payment:</span>
            <img src="/visa.png" className="h-6" />
            <img src="/mastercard.png" className="h-6" />
            <img src="/amex.png" className="h-6" />
            <img src="/paypal.png" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
