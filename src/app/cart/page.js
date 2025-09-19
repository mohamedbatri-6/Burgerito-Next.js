"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const [items, setItems] = useState([]);
  const { updateCartCount } = useCart?.() || { updateCartCount: () => {} };

  const fmt = (v) => {
    const n = Number(v);
    return Number.isFinite(n) ? n.toFixed(2) : "0.00";
  };

  const loadCart = useCallback(() => {
    const raw = JSON.parse(localStorage.getItem("cart") || "[]");

    if (!Array.isArray(raw) || raw.length === 0) {
      setItems([]);
      updateCartCount();
      return;
    }

    const normalized = raw.map((x) =>
      typeof x === "object"
        ? {
            id: x._id || x.id,
            name: x.name || "Produit",
            price: Number(x.price) || 0,
            imageUrl: x.imageUrl || "/placeholder.png",
          }
        : { id: x, name: "Produit", price: 0, imageUrl: "/placeholder.png" }
    );

    setItems(normalized);
    updateCartCount();
  }, [updateCartCount]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const total = items.reduce((sum, p) => sum + (Number(p.price) || 0), 0);

  function removeAt(index) {
    const raw = JSON.parse(localStorage.getItem("cart") || "[]");
    raw.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(raw));
    loadCart();
  }

  if (items.length === 0) {
    return (
      <main className="max-w-6xl mx-auto px-6 py-10 text-white">
        <Link href="/" className="text-gray-300 hover:text-orange-500 mb-6 block">
          ← Retour à l’accueil
        </Link>
        <h1 className="text-5xl font-extrabold mb-4">Panier</h1>
        <p className="text-gray-400">Votre panier est vide</p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-10 text-white">
      <Link href="/" className="text-gray-300 hover:text-orange-500 mb-6 block">
        ← Retour à l’accueil
      </Link>

      <h1 className="text-5xl font-extrabold mb-10">Panier</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Liste des produits */}
        <div className="md:col-span-2 space-y-4">
          {items.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="flex items-center justify-between bg-[#1c1c1c] p-4 rounded-xl"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-gray-400">€ {fmt(item.price)}</p>
                </div>
              </div>
              <button
                onClick={() => removeAt(idx)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>

        {/* Récapitulatif */}
        <div className="bg-[#1c1c1c] p-6 rounded-xl">
          <h2 className="text-lg mb-4">Récapitulatif</h2>
          <p className="text-gray-300">
            Total{" "}
            <span className="font-bold text-2xl ml-2">€ {fmt(total)}</span>
          </p>
          <Link
            href="/confirmation"
            className="block w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold text-center"
          >
            Commander
          </Link>
        </div>
      </div>
    </main>
  );
}
