import Link from "next/link";
import AddToCartButton from "../components/AddToCartButton";

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
    <main className="bg-black text-white">
      {/* HERO */}
      <section className="relative max-w-6xl mx-auto h-[400px] sm:h-[500px] mb-12 rounded-2xl overflow-hidden">
        <img
          src="/hero-burger.jpg"
          alt="Burger Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-6">
          <p className="text-gray-200 max-w-2xl mb-6 text-base sm:text-lg md:text-xl">
            Lorem ipsum dolor sit amet consectetur. Velit nisl tempus mattis sit
            mauris nunc adipiscing sit massa. Maecenas vel facilisis arcu turpis
            nunc.
          </p>
          <h1 className="uppercase text-orange-500 text-6xl sm:text-8xl md:text-[120px] lg:text-[150px] xl:text-[180px] font-extrabold leading-none">
            BURGERITO
          </h1>
        </div>
      </section>

      {/* TITRE PRODUITS */}
      <h2 className="text-3xl font-bold text-center mb-10 text-orange-500">
        Nos Burgers 🍔
      </h2>

      {/* PRODUITS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 max-w-6xl mx-auto">
        {products.map((burger) => {
          const id = burger._id || burger.id;
          return (
            <div
              key={id}
              className="bg-[#1c1c1c] border border-gray-800 rounded-xl overflow-hidden shadow-lg flex flex-col hover:shadow-xl transition"
            >
              <div className="relative">
                <Link href={`/product/${id}`}>
                  <img
                    src={burger.imageUrl || "/placeholder.png"}
                    alt={burger.name}
                    className="w-full h-40 object-cover cursor-pointer"
                  />
                </Link>
                {!burger.isAvailable && (
                  <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                    Produit indisponible
                  </span>
                )}
              </div>

              <div className="p-4 flex flex-col flex-1">
                <Link href={`/product/${id}`}>
                  <h3 className="text-lg font-bold text-white mb-2 hover:text-orange-500">
                    {burger.name}
                  </h3>
                </Link>
                <p className="text-gray-400 mb-3">
                  € {Number(burger.price).toFixed(2)}
                </p>

                {/* Bouton ajouter au panier */}
                <AddToCartButton product={burger} />
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
