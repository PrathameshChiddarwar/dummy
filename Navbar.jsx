import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { useCart } from "../context/useCart";
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
   const { cartItems } = useCart(); // ✅ get cart data
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/About" },
    { name: "Contact", path: "/Contact" },
  ];

  // 🔹 Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔹 Close menu when navigating
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
// 🔹 Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
    useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 tracking-wide hover:text-blue-700 transition"
        >
          ShreeGen
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-gray-800 font-medium hover:text-blue-600 transition ${
                  isActive
                    ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                    : ""
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex items-center justify-center text-gray-700 hover:text-blue-600 transition"
          >
            <FiShoppingCart size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-1.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Login Button */}
          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden bg-white border-t border-gray-200 shadow-md transition-all duration-300 ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <nav className="flex flex-col items-center py-4 space-y-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-gray-800 font-medium hover:text-blue-600 ${
                  isActive ? "text-blue-600" : ""
                }`
              }
            >
              {item.name}
            </NavLink>

          ))}

          <Link
            to="/cart"
            className="relative flex items-center justify-center text-gray-700 hover:text-blue-600 transition"
          >
            <FiShoppingCart size={20} />  {totalItems > 0 && (
    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-1.5 rounded-full">
      {totalItems}
    </span>
  )}
          </Link>

          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
