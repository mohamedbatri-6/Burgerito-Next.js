"use client";
import { useCart } from "../context/CartContext";

export default function CartBadge() {
  const { cartCount } = useCart();

  if (cartCount === 0) return null;

  return (
    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
      {cartCount}
    </span>
  );
}
