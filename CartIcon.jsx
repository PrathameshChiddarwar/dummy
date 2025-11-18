import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";
import { ShoppingCart } from "lucide-react"; // optional icon lib

const CartIcon = () => {
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative p-2 rounded-full hover:bg-gray-100 transition"
        aria-label="Open cart"
      >
        <ShoppingCart size={24} />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default CartIcon;