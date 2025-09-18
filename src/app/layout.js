import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Burgerito",
  description: "Projet Fil Rouge - Burgerito",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-black text-white min-h-screen flex flex-col">
        {/* HEADER */}
        <header className="flex justify-between items-center p-4 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-orange-500">BURGERITO</h1>
          <nav className="flex gap-4">
            <Link href="/" className="hover:text-orange-400">Accueil</Link>
            <Link href="/cart" className="hover:text-orange-400">Panier</Link>
            <Link href="/login" className="bg-orange-500 px-3 py-1 rounded hover:bg-orange-600">
              Connexion
            </Link>
          </nav>
        </header>

        {/* CONTENU */}
        <main className="flex-1">{children}</main>

        {/* FOOTER */}
        <footer className="p-4 text-center border-t border-gray-700 text-gray-400">
          © 2025 Burgerito – Projet Fil Rouge
        </footer>
      </body>
    </html>
  );
}
