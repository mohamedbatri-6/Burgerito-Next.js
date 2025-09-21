"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const current = JSON.parse(localStorage.getItem("currentUser"));
    if (!current) {
      router.push("/login");
    } else {
      setUser(current);
    }

    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(savedOrders);
  }, [router]);

  function logout() {
    localStorage.removeItem("currentUser");
    router.push("/");
  }

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

      {orders.length === 0 ? (
        <p>Aucune commande passée.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="mb-10">
            <h2 className="text-lg mb-4">{order.date}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {order.items.map((item, i) => (
                <div
                  key={i}
                  className="bg-[#1c1c1c] rounded-lg p-4 flex flex-col items-center"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-32 object-cover rounded-md mb-3"
                  />
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-400">€{item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </main>
  );
}
