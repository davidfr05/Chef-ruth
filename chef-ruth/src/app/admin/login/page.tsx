"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { THEME } from "@/lib/theme";
import { Loader } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Identifiants incorrects");
      } else {
        localStorage.setItem("adminToken", data.token);
        router.push("/admin/dashboard");
      }
    } catch (err) {
      setError("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-16 px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1
            className="text-4xl font-serif mb-2"
            style={{ color: THEME.colors.dark }}
          >
            Chef Ruth
          </h1>
          <p
            className="text-sm"
            style={{ color: `${THEME.colors.dark}60` }}
          >
            Administration
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div
              className="p-4 rounded-lg text-sm border"
              style={{
                backgroundColor: `#fef2f2`,
                borderColor: "#fca5a5",
                color: "#dc2626",
              }}
            >
              {error}
            </div>
          )}

          <div>
            <label
              className="block text-sm font-semibold mb-2"
              style={{ color: THEME.colors.dark }}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded"
              style={{ borderColor: THEME.colors.borderColor }}
              placeholder="admin@chefruth.fr"
            />
          </div>

          <div>
            <label
              className="block text-sm font-semibold mb-2"
              style={{ color: THEME.colors.dark }}
            >
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded"
              style={{ borderColor: THEME.colors.borderColor }}
              placeholder="Votre mot de passe"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded text-white font-semibold flex items-center justify-center gap-2"
            style={{ backgroundColor: THEME.colors.primary }}
          >
            {loading && <Loader size={18} className="animate-spin" />}
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p
          className="text-xs text-center mt-6"
          style={{ color: `${THEME.colors.dark}40` }}
        >
          Demandes de connexion: contact@chefruth.fr
        </p>
      </div>
    </div>
  );
}
