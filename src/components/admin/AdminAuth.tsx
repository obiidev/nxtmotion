"use client";

import { useState } from "react";

export default function AdminAuth({ children }: { children: React.ReactNode }) {
  const [enteredPassword, setEnteredPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: enteredPassword }),
    });

    if (res.ok) {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Ongeldig wachtwoord.");
    }
  };

  if (authenticated) return <>{children}</>;

  return (
    <div className="max-w-md mx-auto mt-24 p-8 bg-[#111] rounded shadow">
      <h1 className="text-2xl mb-4 text-white">Admin Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="Wachtwoord"
          value={enteredPassword}
          onChange={(e) => setEnteredPassword(e.target.value)}
          className="w-full p-2 bg-[#222] text-white rounded"
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          type="submit"
          className="px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600"
        >
          Inloggen
        </button>
      </form>
    </div>
  );
}
