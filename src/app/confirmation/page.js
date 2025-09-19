import Link from "next/link";

export default function ConfirmationPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold text-green-400 mb-6">
        ✅ Votre commande a bien été enregistrée !
      </h1>
      <p className="text-gray-300 mb-8">
        Merci pour votre achat. Votre commande est en cours de traitement.
      </p>
      <Link
        href="/"
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold"
      >
        Retour à l’accueil
      </Link>
    </main>
  );
}
