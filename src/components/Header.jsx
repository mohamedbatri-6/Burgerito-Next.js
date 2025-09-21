"use client";
import Link from "next/link";
import CartBadge from "./CartBadge";

export default function Header() {
  // Ici on pourrait lire un cookie ou état global pour savoir si l'utilisateur est connecté
  const isAuth = false; // temporaire

  return (
    <header className="bg-black py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6">
        <Link href="/" className="text-white text-2xl font-bold">
          <img src="/logo.svg" alt="Logo" className="h-8" />
        </Link>

        <div className="flex gap-3 items-center">
          <Link
            href="/cart"
            className="relative bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            Panier
            <CartBadge />
          </Link>

          {!isAuth ? (
            <>
              <Link
                href="/register"
                className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg"
              >
                Inscription
              </Link>
              <Link
                href="/login"
                className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg"
              >
                Connexion
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/profile"
                className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg"
              >
                Mon profil
              </Link>
              <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg">
                Déconnexion
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
