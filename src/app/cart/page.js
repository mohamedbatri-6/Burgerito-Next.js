"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  function removeFromCart(index) {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  const total = cart.reduce((acc, item) => acc + (item.price || 0), 0);

  return (
    <main className="max-w-6xl mx-auto px-6 py-10 text-white">
      {/* Retour */}
      <Link href="/" className="text-gray-300 hover:text-orange-500 mb-6 block">
        ← Retour à l’accueil
      </Link>

      {/* Titre */}
      <h1 className="text-5xl font-extrabold mb-10">Panier</h1>

      {/* Panier vide */}
      {cart.length === 0 ? (
        <p className="text-gray-400">Votre panier est vide</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Liste produits */}
          <div className="md:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <div
                key={index}
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
                    <p className="text-gray-400">{item.price.toFixed(2)}€</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(index)}
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
              Totale{" "}
              <span className="font-bold text-2xl ml-2">
                {total.toFixed(2)}€
              </span>
            </p>
            <button className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold">
              Commander
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
