import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Burgerito",
  description: "Application Burger Shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-black text-white">
        <header className="bg-black py-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center px-6">
            <Link href="/" className="text-white text-2xl font-bold">
              <img src="/logo.png" alt="Logo" className="h-8" />
            </Link>

            <div className="flex gap-3">
              <Link href="/cart" className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">
                Panier
              </Link>
              <Link href="/register" className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">
                Inscription
              </Link>
              <Link href="/login" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg">
                Connexion
              </Link>
            </div>
          </div>
        </header>

        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
