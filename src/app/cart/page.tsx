"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { getProductById } from "@/lib/products";
import { Trash2, Plus, Minus } from "lucide-react";
import { THEME } from "@/lib/theme";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

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

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* En-tête */}
        <h1 className="text-4xl font-serif mb-8" style={{ color: THEME.colors.dark }}>
          Mon Panier
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p
              className="text-lg mb-6"
              style={{ color: `${THEME.colors.dark}60` }}
            >
              Votre panier est vide
            </p>
            <Link
              href="/shop"
              className="inline-block px-6 py-2 rounded text-white"
              style={{ backgroundColor: THEME.colors.primary }}
            >
              Continuer vos achats
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Articles */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center justify-between p-4 border rounded"
                  style={{ borderColor: THEME.colors.borderColor }}
                >
                  {/* Produit info */}
                  <div className="flex-1">
                    <h3
                      className="font-semibold text-lg"
                      style={{ color: THEME.colors.dark }}
                    >
                      {item.product?.name}
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: `${THEME.colors.dark}60` }}
                    >
                      {item.product?.price}€ x {item.quantity}
                    </p>
                  </div>

                  {/* Quantité */}
                  <div className="flex items-center gap-3 mx-4">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                      className="p-1 rounded hover:bg-gray-100"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1)
                      }
                      className="p-1 rounded hover:bg-gray-100"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Prix total article */}
                  <div className="w-24 text-right">
                    <p
                      className="font-semibold"
                      style={{ color: THEME.colors.primary }}
                    >
                      {((item.product?.price ?? 0) * item.quantity).toFixed(2)}
                      €
                    </p>
                  </div>

                  {/* Supprimer */}
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="p-2 ml-4 rounded hover:bg-red-50"
                  >
                    <Trash2 size={18} className="text-red-500" />
                  </button>
                </div>
              ))}
            </div>

            {/* Résumé */}
            <div
              className="p-6 rounded-lg"
              style={{ backgroundColor: THEME.colors.cream }}
            >
              <div className="flex justify-between items-center mb-4">
                <span style={{ color: THEME.colors.dark }}>Sous-total:</span>
                <span className="text-xl font-semibold">{subtotal.toFixed(2)}€</span>
              </div>
              <div
                className="border-t pt-4 flex justify-between items-center"
                style={{ borderColor: THEME.colors.borderColor }}
              >
                <span
                  className="text-lg font-semibold"
                  style={{ color: THEME.colors.dark }}
                >
                  Total:
                </span>
                <span
                  className="text-2xl font-bold"
                  style={{ color: THEME.colors.primary }}
                >
                  {subtotal.toFixed(2)}€
                </span>
              </div>
            </div>

            {/* Boutons */}
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
                href="/checkout"
                className="flex-1 px-6 py-3 text-center rounded text-white transition-colors"
                style={{ backgroundColor: THEME.colors.primary }}
              >
                Procéder au paiement
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
