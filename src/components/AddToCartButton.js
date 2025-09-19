"use client";
import { useState } from "react";

export default function AddToCartButton({ product }) {
  const [adding, setAdding] = useState(false);
  const isAvailable = product?.isAvailable ?? true;

  function addToCart() {
    if (!isAvailable) return;
    setAdding(true);

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push({
      id: product._id || product.id,
      name: product.name,
      price: Number(product.price) || 0,
      imageUrl: product.imageUrl || "/placeholder.png",
    });
    localStorage.setItem("cart", JSON.stringify(cart));

    setTimeout(() => setAdding(false), 400);
  }

  return (
    <button
      onClick={addToCart}
      disabled={!isAvailable || adding}
      className={`w-full mt-auto rounded-lg py-2 transition ${
        isAvailable
          ? "bg-orange-500 hover:bg-orange-600 text-white"
          : "bg-gray-600 text-white cursor-not-allowed"
      }`}
    >
      {!isAvailable ? "Indisponible" : adding ? "Ajout..." : "Ajouter au panier"}
    </button>
  );
}
