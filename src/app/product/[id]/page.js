import Link from "next/link";
import AddToCartButton from "../../../components/AddToCartButton";

// Récupérer un produit
async function getProduct(id) {
  const res = await fetch(`https://node-eemi.vercel.app/api/products/${id}`, {
    cache: "no-store",
  });
  return res.json();
}

// Récupérer tous les produits
async function getProducts() {
  const res = await fetch("https://node-eemi.vercel.app/api/products", {
    cache: "no-store",
  });
  return res.json();
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);
  const allProducts = await getProducts();

  // Exclure le produit actuel
  const otherProducts = allProducts.items.filter(
    (p) => (p._id || p.id) !== (product._id || product.id)
  );

  return (
    <main className="p-6 max-w-6xl mx-auto text-white">
      {/* Retour */}
      <Link href="/" className="text-orange-500 hover:underline block mb-6">
        &larr; Retour à l’accueil
      </Link>

      {/* Produit principal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#111] p-6 rounded-xl shadow-lg">
        <img
          src={product.imageUrl || "/placeholder.png"}
          alt={product.name}
          className="w-full h-80 object-cover rounded-lg"
        />
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            {product.name}
          </h1>
          <h2 className="text-xl font-bold mb-2">Description</h2>
          <p className="text-gray-300 mb-6">{product.description}</p>

          <div className="flex items-center gap-4">
            <span className="bg-white text-black px-4 py-2 rounded-lg font-bold">
              € {Number(product.price).toFixed(2)}
            </span>
            {product.isAvailable ? (
              <AddToCartButton product={product} />
            ) : (
              <p className="text-red-500 font-semibold">Produit indisponible</p>
            )}
          </div>
        </div>
      </div>

      {/* Nos autres propositions */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-orange-500">
          Nos autres propositions 🍔
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {otherProducts.map((p) => {
            const id = p._id || p.id;
            return (
              <div
                key={id}
                className="bg-[#1c1c1c] border border-gray-800 rounded-xl overflow-hidden shadow-lg flex flex-col"
              >
                <img
                  src={p.imageUrl || "/placeholder.png"}
                  alt={p.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-lg font-bold mb-2">{p.name}</h3>
                  <p className="text-gray-400 mb-3">
                    € {Number(p.price).toFixed(2)}
                  </p>
                  {p.isAvailable ? (
                    <AddToCartButton product={p} />
                  ) : (
                    <p className="text-red-500 font-semibold">Indisponible</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
