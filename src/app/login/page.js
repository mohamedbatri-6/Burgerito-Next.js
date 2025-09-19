"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("https://node-eemi.vercel.app/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setMessage("❌ Identifiants incorrects");
        return;
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);

      setMessage("✅ Connexion réussie !");
      router.push("/"); // redirection vers accueil
    } catch (err) {
      console.error(err);
      setMessage("❌ Erreur serveur");
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md text-center">
        <h1 className="text-5xl font-extrabold mb-10">Je me connecte</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-xl bg-gray-800 text-white placeholder-gray-400 text-center"
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-xl bg-gray-800 text-white placeholder-gray-400 text-center"
            required
          />
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold text-lg"
          >
            Connexion
          </button>
        </form>
        {message && <p className="mt-4 text-sm">{message}</p>}
      </div>
    </main>
  );
}
