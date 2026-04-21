import { CartProvider } from "@/context/CartContext";

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CartProvider>{children}</CartProvider>;
}
