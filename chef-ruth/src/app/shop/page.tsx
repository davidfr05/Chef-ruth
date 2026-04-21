"use client";

import { useState } from "react";
import { PRODUCTS } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import { THEME } from "@/lib/theme";

export default function ShopPage() {
  const { addToCart } = useCart();
  const [addedProduct, setAddedProduct] = useState<string | null>(null);

  const handleAddToCart = (productId: string) => {
    addToCart(productId, 1);
    setAddedProduct(productId);
    setTimeout(() => setAddedProduct(null), 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif mb-4" style={{ color: THEME.colors.dark }}>
            Notre Boutique
          </h1>
          <p className="text-lg" style={{ color: `${THEME.colors.dark}80` }}>
            Découvrez nos produits frais et de qualité
          </p>
        </div>

        {/* Grille produits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              style={{ borderColor: THEME.colors.borderColor }}
            >
              {/* Image placeholder */}
              <div
                className="h-48 w-full flex items-center justify-center text-white text-sm font-medium"
                style={{ backgroundColor: THEME.colors.cream }}
              >
                Image du produit
              </div>

              {/* Contenu */}
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2" style={{ color: THEME.colors.dark }}>
                  {product.name}
                </h3>
                <p className="text-sm mb-4" style={{ color: `${THEME.colors.dark}60` }}>
                  {product.description}
                </p>

                {/* Prix et bouton */}
                <div className="flex items-center justify-between">
                  <span
                    className="text-2xl font-bold"
                    style={{ color: THEME.colors.primary }}
                  >
                    {product.price}€
                  </span>
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="p-2 rounded transition-all text-white"
                    style={{
                      backgroundColor:
                        addedProduct === product.id
                          ? "#2d5016"
                          : THEME.colors.primary,
                    }}
                  >
                    <ShoppingCart size={20} />
                  </button>
                </div>

                {/* Message confirmation */}
                {addedProduct === product.id && (
                  <p className="text-xs mt-2 text-center text-green-600">
                    ✓ Ajouté au panier
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
