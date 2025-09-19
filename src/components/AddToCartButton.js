"use client";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function AddToCartButton({ product }) {
  const [adding, setAdding] = useState(false);
  const { updateCartCount } = useCart();

  function addToCart() {
    if (!product?.isAvailable) return;
    setAdding(true);

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push({
      id: product._id || product.id,
      name: product.name,
      price: Number(product.price) || 0,
      imageUrl: product.imageUrl || "/placeholder.png",
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    setTimeout(() => setAdding(false), 300);
  }

  return (
    <button
      onClick={addToCart}
      disabled={adding || !product?.isAvailable}
      className={`w-full mt-auto rounded-lg py-2 transition ${
        product?.isAvailable
          ? "bg-orange-500 hover:bg-orange-600 text-white"
          : "bg-gray-600 text-white cursor-not-allowed"
      }`}
    >
      {product?.isAvailable ? (adding ? "Ajout..." : "Ajouter au panier") : "Indisponible"}
    </button>
  );
}
