"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Récup user
    const storedUser = localStorage.getItem("currentUser");
    const current = storedUser ? JSON.parse(storedUser) : null;

    if (!current) {
      router.push("/login");
      return;
    } else {
      setUser(current);
    }

    // Récup commandes
    const savedOrdersRaw = localStorage.getItem("orders");
    const savedOrders = savedOrdersRaw ? JSON.parse(savedOrdersRaw) : [];
    setOrders(Array.isArray(savedOrders) ? savedOrders : []);
  }, [router]);

  function logout() {
    localStorage.removeItem("currentUser");
    router.push("/");
  }

  // tant que user pas chargé -> on attend
  if (!user) return null;

  return (
    <main className="max-w-6xl mx-auto px-6 py-10 text-white">
      <Link href="/" className="text-gray-300 hover:text-orange-500 mb-6 block">
        ← Retour à l’accueil
      </Link>

      <h1 className="text-6xl font-extrabold mb-8">{user.firstname}</h1>

      <div className="flex gap-4 mb-10">
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg font-semibold"
        >
          Me déconnecter
        </button>
        <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold">
          Mon profil
        </button>
      </div>

      {(!orders || orders.length === 0) ? (
        <p>Aucune commande passée.</p>
      ) : (
        (orders || []).map((order, index) => (
          <div key={index} className="mb-10">
            <h2 className="text-lg mb-4">{order.date || "Commande"}</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(order.items || []).map((item, i) => (
                <div
                  key={i}
                  className="bg-[#1c1c1c] rounded-lg p-4 flex flex-col items-center"
                >
                  <img
                    src={item?.imageUrl || "/placeholder.png"}
                    alt={item?.name || "Produit"}
                    className="w-full h-32 object-cover rounded-md mb-3"
                  />
                  <h3 className="font-semibold">
                    {item?.name || "Produit sans nom"}
                  </h3>

                  <p className="text-gray-400">
                    €{Number(item?.price || 0).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </main>
  );
}
