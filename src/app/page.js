import Link from "next/link";

async function getProducts() {
  const res = await fetch("https://node-eemi.vercel.app/api/products", {
    cache: "no-store",
  });
  return res.json();
}

export default async function Home() {
  const data = await getProducts();
  const products = data.items;

  return (
    <main className="p-0">
      {/* HERO SECTION */}
      <section className="relative w-full h-[450px] mb-12">
        <img
          src="/hero-burger.jpg"
          alt="Burger Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
          <h1 className="text-6xl font-extrabold text-orange-500 mb-4">
            BURGERITO
          </h1>
          <p className="text-lg text-white">Les meilleurs burgers faits maison 🍔</p>
        </div>
      </section>

      {/* Titre principal */}
      <h2 className="text-3xl font-bold text-center mb-10 text-orange-500">
        Nos Burgers
      </h2>

      {/* Grille des produits */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
        {products.map((burger) => {
          const id = burger._id || burger.id;
          return (
            <div
              key={id}
              className="bg-[#0a0a0a] rounded-xl overflow-hidden shadow-lg border border-gray-800 flex flex-col"
            >
              <Link href={`/product/${id}`}>
                <img
                  src={burger.imageUrl}
                  alt={burger.name}
                  className="w-full h-48 object-cover cursor-pointer"
                />
              </Link>
              <div className="p-4 flex flex-col flex-1">
                <Link href={`/product/${id}`}>
                  <h3 className="text-lg font-bold text-white mb-2 hover:text-orange-500">
                    {burger.name}
                  </h3>
                </Link>
                <p className="text-gray-400 mb-3">Prix : {burger.price} €</p>
                {burger.isAvailable ? (
                  <button className="bg-orange-500 text-white py-2 rounded-lg w-full mt-auto hover:bg-orange-600 transition">
                    Ajouter au panier
                  </button>
                ) : (
                  <p className="text-red-500 font-semibold">Indisponible</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
