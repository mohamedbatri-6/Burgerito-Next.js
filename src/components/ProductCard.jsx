"use client";
import { useState } from "react";

export default function ProductCard({ product }) {
  const [adding, setAdding] = useState(false);

  function addToCart() {
    if (!product.isAvailable) return;

    setAdding(true);

    // Récupérer l’ancien panier
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Ajouter ce produit
    cart.push({
      id: product._id || product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });

    // Sauvegarder le panier
    localStorage.setItem("cart", JSON.stringify(cart));

    setTimeout(() => setAdding(false), 500);
  }

  return (
    <div className="bg-[#1c1c1c] rounded-xl overflow-hidden shadow-lg flex flex-col">
      <img
        src={product.imageUrl || "/placeholder.png"}
        alt={product.name}
        className="h-40 w-full object-cover"
      />
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-bold">{product.name}</h3>
        <p className="text-gray-400">€ {product.price.toFixed(2)}</p>

        {product.isAvailable ? (
          <button
            onClick={addToCart}
            disabled={adding}
            className="mt-3 bg-orange-500 text-white px-3 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            {adding ? "Ajout..." : "Ajouter au panier"}
          </button>
        ) : (
          <p className="mt-3 text-red-500 font-semibold">Indisponible</p>
        )}
      </div>
    </div>
  );
}
