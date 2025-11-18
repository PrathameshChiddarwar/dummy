import React from "react";
import { useCart } from "../context/CartContext"; 
import { ShoppingCart } from "lucide-react";

const ProductCard = ({ id, productName, image, description, specialPrice, price, discount }) => {
   const { addToCart } = useCart(); 

  const product = {
    id,
    name: productName,
    image,
    description,
    price: specialPrice || price,
    discount,
  };

  return (
    <div className="relative group rounded-3xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-2 border border-gray-100">
      
      {/* 🖼 Product Image */}
      <div className="relative h-80 overflow-hidden">
        <img
          src={image}
          alt={productName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-all"></div>
      </div>

      {/* 📝 Content */}
      <div className="absolute bottom-0 w-full p-5 text-left text-black z-10">
        <h3 className="text-xl font-bold mb-1 drop-shadow-lg">{productName}</h3>
        <p className="text-sm text-gray-200 mb-3 line-clamp-2">{description}</p>

        {/* 💰 Price Section */}
        {specialPrice ? (
          <div className="text-lg font-semibold">
            ₹{specialPrice}{" "}
            <span className="line-through text-gray-300 text-sm ml-2">₹{price}</span>
            <span className="text-green-400 text-sm ml-1">({discount}% off)</span>
          </div>
        ) : (
          <div className="text-lg font-semibold">₹{price}</div>
        )}

        {/* 🛒 Add to Cart Button */}
        <button
          onClick={() => addToCart(product)}
          className="mt-4 bg-yellow-400 hover:bg-yellow-300 text-black px-5 py-2 rounded-full font-semibold flex items-center gap-2 shadow-lg transition-all duration-300 group-hover:scale-105"
        >
          <ShoppingCart className="w-5 h-5" /> Add to Cart
        </button>
      </div>

      {/* ✨ Glow Effect on Hover */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 blur-lg transition-all"></div>
    </div>
  );
};

export default ProductCard;
