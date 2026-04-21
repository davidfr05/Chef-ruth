export type CartItem = {
  productId: string;
  quantity: number;
};

export type Cart = CartItem[];

export type Order = {
  id: string;
  sessionId: string;
  email: string;
  name: string;
  address: string;
  items: CartItem[];
  total: number; // en cents
  status: "paid" | "shipped" | "delivered";
  createdAt: string;
};
