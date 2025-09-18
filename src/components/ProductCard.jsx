"use client"
import Link from "next/link"
import { useState } from "react"

export default function ProductCard({ product }) {
  const [adding, setAdding] = useState(false)
  const id = product._id || product.id

  function addToCart() {
    if (!product.isAvailable) return
    setAdding(true)
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    cart.push(id)
    localStorage.setItem("cart", JSON.stringify(cart))
    setTimeout(() => setAdding(false), 500)
  }

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition">
      <img
        src={product.imageUrl || "/placeholder.png"}
        alt={product.name}
        className="h-40 w-full object-cover"
      />
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-white">{product.name}</h3>
        <p className="text-sm text-gray-400 flex-1">
          {product.description?.slice(0, 70)}...
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-orange-500 font-bold">
            {product.price?.toFixed(2)} €
          </span>
          <div className="flex gap-2">
            <Link
              href={`/product/${id}`}
              className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-sm rounded-lg text-white"
            >
              Voir détail
            </Link>
            <button
              onClick={addToCart}
              disabled={!product.isAvailable || adding}
              className={`px-3 py-1 text-sm rounded-lg ${
                product.isAvailable
                  ? "bg-orange-500 text-white hover:bg-orange-600"
                  : "bg-gray-500 text-white cursor-not-allowed"
              }`}
            >
              {product.isAvailable ? (adding ? "Ajout..." : "Ajouter") : "Indisponible"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
