import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { THEME } from "@/lib/theme";
import { CartProvider } from "@/context/CartContext";
import CartCounter from "@/app/shop/components/CartCounter";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        {/* Navbar Shop */}
        <nav className="bg-white border-b" style={{ borderColor: THEME.colors.borderColor }}>
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/shop">
              <h2 className="text-2xl font-serif italic" style={{ color: THEME.colors.dark }}>
                Chef Ruth - Boutique
              </h2>
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-2 px-4 py-2 rounded transition-colors"
              style={{
                backgroundColor: THEME.colors.primary,
                color: "white",
              }}
            >
              <ShoppingCart size={18} />
              <CartCounter />
            </Link>
          </div>
        </nav>

        {/* Contenu */}
        <main className="flex-1">{children}</main>
      </div>
    </CartProvider>
  );
}
