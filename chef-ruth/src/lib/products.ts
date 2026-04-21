export type Product = {
  id: string;
  name: string;
  description: string;
  price: number; // en euros, sera converti en cents pour Stripe
  category: "plat" | "salade" | "accompagnement";
  image?: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "poulet-roti",
    name: "Poulet Rôti",
    description: "Poulet fermier rôti à la broche, savoureux et tendre",
    price: 20,
    category: "plat",
  },
  {
    id: "salade-pomme-terre",
    name: "Salade de Pomme de Terre",
    description: "Salade traditionnelle avec vinaigrette maison",
    price: 4,
    category: "salade",
  },
  {
    id: "carottes",
    name: "Carottes Glacées",
    description: "Carottes cuites au beurre et au miel",
    price: 5,
    category: "accompagnement",
  },
  {
    id: "roti-porc",
    name: "Rôti de Porc",
    description: "Rôti de porc fermier cuit lentement",
    price: 18,
    category: "plat",
  },
  {
    id: "salade-verte",
    name: "Salade Verte",
    description: "Mélange de laitues fraîches avec vinaigrette légère",
    price: 3,
    category: "salade",
  },
  {
    id: "gratin-dauphinois",
    name: "Gratin Dauphinois",
    description: "Gratin de pommes de terre à la crème et au fromage",
    price: 8,
    category: "accompagnement",
  },
  {
    id: "poisson-blanc",
    name: "Pavé de Poisson Blanc",
    description: "Poisson frais cuisiné à la vapeur avec fines herbes",
    price: 22,
    category: "plat",
  },
  {
    id: "salade-betterave",
    name: "Salade de Betterave",
    description: "Betteraves rouges avec chèvre frais",
    price: 5,
    category: "salade",
  },
  {
    id: "haricots-verts",
    name: "Haricots Verts",
    description: "Haricots verts frais à l'ail et persil",
    price: 4,
    category: "accompagnement",
  },
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductsByCategory(
  category: Product["category"]
): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}
