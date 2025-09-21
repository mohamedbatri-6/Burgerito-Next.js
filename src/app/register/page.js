"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    setError("");

    const firstname = e.target.firstname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    // On récupère les utilisateurs déjà enregistrés
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Vérifie si l'email existe déjà
    if (users.find((u) => u.email === email)) {
      setError("Cet e-mail est déjà utilisé");
      return;
    }

    // Ajoute un nouvel utilisateur
    users.push({ firstname, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    // Redirige vers la page de connexion
    router.push("/login");
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-black text-white">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md text-center space-y-4"
      >
        <h1 className="text-5xl font-extrabold mb-6">Inscription</h1>
        <input
          name="firstname"
          placeholder="Prénom"
          className="w-full p-4 rounded-xl bg-gray-800 text-white text-center"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="E-mail"
          className="w-full p-4 rounded-xl bg-gray-800 text-white text-center"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Mot de passe"
          className="w-full p-4 rounded-xl bg-gray-800 text-white text-center"
          required
        />
        {error && <p className="text-red-400">{error}</p>}
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold"
        >
          S’inscrire
        </button>
      </form>
    </main>
  );
}
