"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { getProductById } from "@/lib/products";
import { THEME } from "@/lib/theme";
import { Loader } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    address: "",
  });

  const cartItems = cart
    .map((item) => ({
      ...item,
      product: getProductById(item.productId),
    }))
    .filter((item) => item.product);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.product?.price ?? 0) * item.quantity,
    0
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/checkout/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          email: formData.email,
          name: formData.name,
          address: formData.address,
        }),
      });

      const { sessionId } = await response.json();

      // Redirection vers Stripe Checkout - utiliser le lien direct
      if (typeof window !== "undefined") {
        window.location.href = `https://checkout.stripe.com/pay/${sessionId}`;
      }
    } catch (error) {
      console.error("Erreur checkout:", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1
            className="text-4xl font-serif mb-4"
            style={{ color: THEME.colors.dark }}
          >
            Panier Vide
          </h1>
          <p className="mb-6" style={{ color: `${THEME.colors.dark}60` }}>
            Vous ne pouvez pas procéder au paiement avec un panier vide.
          </p>
          <button
            onClick={() => router.push("/shop")}
            className="px-6 py-2 rounded text-white"
            style={{ backgroundColor: THEME.colors.primary }}
          >
            Retour à la boutique
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-serif mb-12" style={{ color: THEME.colors.dark }}>
          Finaliser votre commande
        </h1>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Formulaire */}
          <form onSubmit={handleCheckout} className="space-y-6">
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
              />
            </div>

            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: THEME.colors.dark }}
              >
                Nom complet
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded"
                style={{ borderColor: THEME.colors.borderColor }}
              />
            </div>

            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: THEME.colors.dark }}
              >
                Adresse de livraison
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-2 border rounded"
                style={{ borderColor: THEME.colors.borderColor }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded text-white font-semibold flex items-center justify-center gap-2"
              style={{ backgroundColor: THEME.colors.primary }}
            >
              {loading && <Loader size={18} className="animate-spin" />}
              {loading ? "Traitement..." : "Payer maintenant"}
            </button>
          </form>

          {/* Résumé commande */}
          <div>
            <h2 className="text-2xl font-serif mb-6" style={{ color: THEME.colors.dark }}>
              Résumé de votre commande
            </h2>

            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="flex justify-between pb-4 border-b"
                  style={{ borderColor: THEME.colors.borderColor }}
                >
                  <div>
                    <p style={{ color: THEME.colors.dark }}>
                      {item.product?.name} x {item.quantity}
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: `${THEME.colors.dark}60` }}
                    >
                      {item.product?.price}€ chacun
                    </p>
                  </div>
                  <p className="font-semibold">
                    {((item.product?.price ?? 0) * item.quantity).toFixed(2)}€
                  </p>
                </div>
              ))}
            </div>

            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: THEME.colors.cream }}
            >
              <div className="flex justify-between text-lg font-semibold">
                <span>Total à payer:</span>
                <span style={{ color: THEME.colors.primary }}>
                  {subtotal.toFixed(2)}€
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
