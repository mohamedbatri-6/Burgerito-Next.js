"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    // Récupère les utilisateurs enregistrés
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Vérifie si l'utilisateur existe
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      // Stocke l'utilisateur connecté
      localStorage.setItem("currentUser", JSON.stringify(user));
      router.push("/profile");
    } else {
      setError("Identifiants incorrects");
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-black text-white">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md text-center space-y-4"
      >
        <h1 className="text-5xl font-extrabold mb-6">Connexion</h1>
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
          Se connecter
        </button>
      </form>
    </main>
  );
}
