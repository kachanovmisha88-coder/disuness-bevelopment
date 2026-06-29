"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      router.push("/admin/applications");
    } else {
      const data = await res.json();
      setError(data.error || "Invalid credentials");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="font-serif text-2xl text-fg mb-1">
            Disuness<span className="text-gold"> B</span>evelopment
          </p>
          <p className="text-xs text-gray-600 tracking-widest uppercase">Admin Panel</p>
        </div>

        <form onSubmit={submit} className="bg-bg-card border border-border rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Email</label>
            <input
              type="email"
              required
              className="w-full bg-bg-elevated border border-border focus:border-gold/60 outline-none rounded px-4 py-3 text-fg text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Password</label>
            <input
              type="password"
              required
              className="w-full bg-bg-elevated border border-border focus:border-gold/60 outline-none rounded px-4 py-3 text-fg text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gold text-black font-semibold rounded hover:bg-gold-light transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
