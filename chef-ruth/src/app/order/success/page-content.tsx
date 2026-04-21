"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Loader } from "lucide-react";
import { THEME } from "@/lib/theme";
import { useCart } from "@/context/CartContext";
import { Order } from "@/lib/cart-types";
import { getProductById } from "@/lib/products";

function SuccessContent() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      setError("Session non trouvée");
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const response = await fetch(
          `/api/checkout/success?session_id=${sessionId}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Erreur de vérification");
        }

        setOrder(data);
        clearCart();

        const existingOrders = JSON.parse(
          localStorage.getItem("chef-ruth-orders") || "[]"
        );
        localStorage.setItem(
          "chef-ruth-orders",
          JSON.stringify([...existingOrders, data])
        );
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erreur lors de la vérification"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [searchParams, clearCart]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-16">
        <div className="text-center">
          <Loader size={40} className="animate-spin mx-auto mb-4" />
          <p style={{ color: THEME.colors.dark }}>Vérification du paiement...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1
            className="text-4xl font-serif mb-4 text-red-600"
            style={{ color: THEME.colors.dark }}
          >
            ❌ Erreur
          </h1>
          <p className="mb-6" style={{ color: `${THEME.colors.dark}60` }}>
            {error || "Une erreur est survenue."}
          </p>
          <Link
            href="/shop"
            className="inline-block px-6 py-2 rounded text-white"
            style={{ backgroundColor: THEME.colors.primary }}
          >
            Retour à la boutique
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <CheckCircle
            size={64}
            className="mx-auto mb-4 text-green-500"
          />
          <h1
            className="text-4xl font-serif mb-2"
            style={{ color: THEME.colors.dark }}
          >
            ✓ Paiement Confirmé!
          </h1>
          <p style={{ color: `${THEME.colors.dark}60` }}>
            Merci pour votre commande
          </p>
        </div>

        <div
          className="p-6 rounded-lg mb-8 text-center"
          style={{ backgroundColor: THEME.colors.cream }}
        >
          <p
            className="text-sm mb-2"
            style={{ color: `${THEME.colors.dark}60` }}
          >
            Numéro de commande
          </p>
          <p
            className="text-2xl font-mono font-bold"
            style={{ color: THEME.colors.primary }}
          >
            {order.id}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div
            className="p-4 border rounded"
            style={{ borderColor: THEME.colors.borderColor }}
          >
            <p
              className="text-sm font-semibold mb-2"
              style={{ color: THEME.colors.dark }}
            >
              Email de confirmation
            </p>
            <p style={{ color: `${THEME.colors.dark}80` }}>{order.email}</p>
          </div>
          <div
            className="p-4 border rounded"
            style={{ borderColor: THEME.colors.borderColor }}
          >
            <p
              className="text-sm font-semibold mb-2"
              style={{ color: THEME.colors.dark }}
            >
              Date de commande
            </p>
            <p style={{ color: `${THEME.colors.dark}80` }}>
              {new Date(order.createdAt).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>

        <div className="mb-12">
          <h2
            className="text-2xl font-serif mb-6"
            style={{ color: THEME.colors.dark }}
          >
            Détails de votre commande
          </h2>

          <div className="space-y-3">
            {order.items.map((item) => {
              const product = getProductById(item.productId);
              return (
                <div
                  key={item.productId}
                  className="flex justify-between pb-3 border-b"
                  style={{ borderColor: THEME.colors.borderColor }}
                >
                  <div>
                    <p style={{ color: THEME.colors.dark }}>
                      {product?.name} x {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">
                    {((product?.price ?? 0) * item.quantity).toFixed(2)}€
                  </p>
                </div>
              );
            })}
          </div>

          <div
            className="mt-6 p-4 rounded-lg"
            style={{ backgroundColor: THEME.colors.cream }}
          >
            <div className="flex justify-between text-lg font-semibold">
              <span>Total payé:</span>
              <span style={{ color: THEME.colors.primary }}>
                {(order.total / 100).toFixed(2)}€
              </span>
            </div>
          </div>
        </div>

        <div
          className="p-4 rounded-lg mb-8 border"
          style={{
            backgroundColor: `${THEME.colors.primary}10`,
            borderColor: THEME.colors.primary,
          }}
        >
          <p
            className="text-sm"
            style={{ color: THEME.colors.dark }}
          >
            📧 Un email de confirmation a été envoyé à <strong>{order.email}</strong>. Vous pourrez suivre votre commande depuis ce lien.
          </p>
        </div>

        <div className="flex gap-4">
          <Link
            href="/shop"
            className="flex-1 px-6 py-3 text-center rounded border transition-colors"
            style={{
              borderColor: THEME.colors.primary,
              color: THEME.colors.primary,
            }}
          >
            Continuer les achats
          </Link>
          <Link
            href="/"
            className="flex-1 px-6 py-3 text-center rounded text-white transition-colors"
            style={{ backgroundColor: THEME.colors.primary }}
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
