"use client";

import { useCart } from "@/context/CartContext";

export default function CartCounter() {
  const { cart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);

  return <span>{total}</span>;
}
