"use client";

import { useState, useEffect } from "react";
import { useCart } from "../hooks/useCart";

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user?.id) {
          setUserId(user.id);
        }
      } catch (err) {
        console.error("Failed to parse user from localStorage", err);
      }
    }
  }, []);

  const formattedOrder = {
    userId: userId,
    items: cartItems.map((item) => ({
      productId: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
    })),
  };

  const handleSubmit = async () => {
    if (!userId) {
      alert("User not logged in. Please login first.");
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      await fetch("https://backendrailways-production-6735.up.railway.app/api/Cart/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedOrder),
      });

      alert("Order submitted successfully!");
      clearCart();
      setSubmitSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Failed to submit order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-white">
        <h2 className="text-4xl font-bold mb-4 text-gray-900">Your Cart</h2>
        <p className="text-lg text-gray-700">Your cart is empty.</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-white">
      <h2 className="text-4xl font-bold mb-8 text-gray-900">Your Cart</h2>

      <div className="w-full max-w-4xl space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center p-4 bg-white border border-gray-200 rounded-lg shadow"
          >
            <div>
              <h3 className="font-semibold text-lg text-gray-900">{item.title}</h3>
              <p className="text-gray-700">
                ${item.price.toFixed(2)} × {item.quantity}
              </p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Remove
            </button>
          </div>
        ))}

        <div className="flex justify-between mt-6 items-center">
          <div className="text-xl font-bold text-gray-900">
            Total: ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
          </div>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`bg-black hover:bg-gray-800 text-white px-6 py-2 rounded ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Processing..." : "Submit Order"}
          </button>
        </div>

        {submitSuccess && (
          <p className="mt-4 text-green-600 font-medium">Order submitted successfully!</p>
        )}
      </div>
    </main>
  );
}
