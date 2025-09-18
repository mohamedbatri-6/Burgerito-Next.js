import Link from "next/link";

async function getProduct(id) {
  const res = await fetch(`https://node-eemi.vercel.app/api/products/${id}`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);

  return (
    <main className="p-6 max-w-3xl mx-auto">
      {/* Bouton retour */}
      <Link href="/" className="text-orange-500 hover:underline">
        &larr; Retour à l’accueil
      </Link>

      {/* Détails produit */}
      <div className="mt-6 bg-gray-900 border border-gray-700 rounded-xl overflow-hidden shadow-lg">
        <img
          src={product.imageUrl || "/placeholder.png"}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-400 mb-4">{product.description}</p>
          <p className="text-xl font-semibold mb-4">{product.price} €</p>

          {product.isAvailable ? (
            <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
              Ajouter au panier
            </button>
          ) : (
            <p className="text-red-500 font-semibold">Produit indisponible</p>
          )}
        </div>
      </div>
    </main>
  );
}
