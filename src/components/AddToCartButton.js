"use client";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);

  function onAdd() {
    if (!product) return;
    setAdding(true);

    // normaliser l'objet produit stocké dans le panier
    const normalized = {
      id: product._id || product.id,
      name: product.name || "Produit",
      price: Number(product.price) || 0,
      imageUrl: product.imageUrl || "/placeholder.png",
      isAvailable: product.isAvailable ?? true,
    };

    addToCart(normalized);
    setTimeout(() => setAdding(false), 300);
  }

  const disabled = adding || product?.isAvailable === false;

  return (
    <button
      onClick={onAdd}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg font-semibold ${
        disabled
          ? "bg-gray-600 text-white cursor-not-allowed"
          : "bg-orange-500 hover:bg-orange-600 text-white"
      }`}
    >
      {product?.isAvailable === false ? "Indisponible" : adding ? "Ajout..." : "Ajouter au panier"}
    </button>
  );
}
