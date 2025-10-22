import "./globals.css";
import { CartProvider } from "../context/CartContext";
import Header from "../components/Header";
import ChatWidget from "../components/ChatWidget"; // ⬅️

export const metadata = {
  title: "Burgerito",
  description: "Application Burger Shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-black text-white">
        <CartProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <ChatWidget /> {/* ⬅️ Ici */}
        </CartProvider>
      </body>
    </html>
  );
}
