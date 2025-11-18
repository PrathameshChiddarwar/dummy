import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6 md:px-20 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">ShreeGen</h2>
          <p className="text-sm">
            Your one-stop shop for gifts, stationery, and more. Discover products
            that bring joy and creativity to everyday life.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/shop" className="hover:text-white">Shop</Link></li>
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Customer Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/faq" className="hover:text-white">FAQs</Link></li>
            <li><Link to="/returns" className="hover:text-white">Return Policy</Link></li>
            <li><Link to="/shipping" className="hover:text-white">Shipping Info</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Newsletter & Socials */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Stay Connected</h3>
          <p className="text-sm mb-3">Subscribe for exclusive deals and updates!</p>
          <form className="flex items-center mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 rounded-l-lg bg-gray-800 text-gray-200 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-r-lg text-white text-sm"
            >
              Subscribe
            </button>
          </form>

          <div className="flex space-x-4 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white"><FaFacebook /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white"><FaTwitter /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} <span className="text-white font-semibold">ShreeGen</span>. All rights reserved.</p>
        <p className="mt-1">Crafted with ❤️ by the ShreeGen Team.</p>
      </div>
    </footer>
  );
};

export default Footer;
