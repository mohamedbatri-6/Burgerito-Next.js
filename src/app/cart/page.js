"use client";
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart = [], clearCart } = useCart(); // 👈 valeur par défaut []
  const router = useRouter();

  function handleOrder() {
    if (!cart || cart.length === 0) return;

    const orders = JSON.parse(localStorage.getItem("orders") || "[]");

    // Nouvelle commande avec la date du jour
    const newOrder = {
      date: new Date().toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      items: cart,
    };

    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));

    clearCart();
    router.push("/profile"); // Redirection vers profil
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-10 text-white">
      <h1 className="text-4xl font-bold mb-8">Panier</h1>

      {!cart || cart.length === 0 ? (
        <p>Votre panier est vide</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-[#1c1c1c] p-4 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.imageUrl || "/placeholder.png"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-400">
                      €{Number(item.price || 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <button
            onClick={handleOrder}
            className="mt-6 bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-bold"
          >
            Commander
          </button>
        </>
      )}
    </main>
  );
}
