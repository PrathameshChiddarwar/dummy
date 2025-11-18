import React from "react";
import { useCart } from "../context/CartContext";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom"; // adjust if you use Next.js

const CartDrawer = ({ open, onClose }) => {
  const {
    cartItems,
    totalAmount,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={onClose} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.productId}
                className="flex items-center gap-3 border-b pb-3"
              >
                {/* optional image */}
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}

                <div className="flex-1">
                  <h4 className="font-medium">{item.productName}</h4>
                  <p className="text-sm text-gray-600">
                    ${(item.specialPrice || item.price).toFixed(2)} each
                  </p>

                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.quantity - 1
                        )
                      }
                      className="p-1 rounded hover:bg-gray-200"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="w-8 text-center">{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.quantity + 1
                        )
                      }
                      className="p-1 rounded hover:bg-gray-200"
                    >
                      <Plus size={16} />
                    </button>

                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="ml-auto p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="text-right font-medium">
                  ${((item.specialPrice || item.price) * item.quantity).toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t p-4 space-y-3">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>

            <Link
              to="/checkout"
              className="block w-full bg-green-600 text-white text-center py-2 rounded hover:bg-green-700 transition"
              onClick={onClose}
            >
              Checkout
            </Link>

            <button
              onClick={clearCart}
              className="w-full text-sm text-red-600 hover:underline"
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;