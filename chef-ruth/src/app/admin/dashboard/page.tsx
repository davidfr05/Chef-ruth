"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Order } from "@/lib/cart-types";
import { getProductById } from "@/lib/products";
import { THEME } from "@/lib/theme";
import { LogOut, RefreshCw } from "lucide-react";

const ORDERS_STORAGE_KEY = "chef-ruth-orders";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    setAuthenticated(true);

    const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  const handleRefresh = () => {
    const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  };

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    const updated = orders.map((order) =>
      order.id === orderId ? { ...order, status } : order
    );
    setOrders(updated);
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
  };

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  if (!authenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1
              className="text-4xl font-serif mb-2"
              style={{ color: THEME.colors.dark }}
            >
              Tableau de Bord Admin
            </h1>
            <p style={{ color: `${THEME.colors.dark}60` }}>
              Gestion des commandes Chef Ruth
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded border transition-colors"
            style={{
              borderColor: THEME.colors.primary,
              color: THEME.colors.primary,
            }}
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>

        {/* Statistiques */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div
            className="p-6 rounded-lg"
            style={{ backgroundColor: THEME.colors.cream }}
          >
            <p
              className="text-sm mb-2"
              style={{ color: `${THEME.colors.dark}60` }}
            >
              Total Commandes
            </p>
            <p
              className="text-4xl font-bold"
              style={{ color: THEME.colors.primary }}
            >
              {orders.length}
            </p>
          </div>

          <div
            className="p-6 rounded-lg"
            style={{ backgroundColor: THEME.colors.cream }}
          >
            <p
              className="text-sm mb-2"
              style={{ color: `${THEME.colors.dark}60` }}
            >
              Chiffre d'Affaires
            </p>
            <p
              className="text-4xl font-bold"
              style={{ color: THEME.colors.primary }}
            >
              {(totalRevenue / 100).toFixed(2)}€
            </p>
          </div>

          <div
            className="p-6 rounded-lg"
            style={{ backgroundColor: THEME.colors.cream }}
          >
            <p
              className="text-sm mb-2"
              style={{ color: `${THEME.colors.dark}60` }}
            >
              Commandes Livrées
            </p>
            <p
              className="text-4xl font-bold"
              style={{ color: THEME.colors.primary }}
            >
              {orders.filter((o) => o.status === "delivered").length}
            </p>
          </div>
        </div>

        {/* Boutons action */}
        <div className="mb-8">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 rounded text-white"
            style={{ backgroundColor: THEME.colors.primary }}
          >
            <RefreshCw size={18} />
            Actualiser
          </button>
        </div>

        {/* Table des commandes */}
        {orders.length === 0 ? (
          <div
            className="text-center py-12 rounded-lg"
            style={{ backgroundColor: THEME.colors.cream }}
          >
            <p style={{ color: `${THEME.colors.dark}60` }}>
              Aucune commande pour le moment
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: `2px solid ${THEME.colors.borderColor}` }}>
                  <th
                    className="text-left py-3 px-4 font-semibold text-sm"
                    style={{ color: THEME.colors.dark }}
                  >
                    Numéro Commande
                  </th>
                  <th
                    className="text-left py-3 px-4 font-semibold text-sm"
                    style={{ color: THEME.colors.dark }}
                  >
                    Email
                  </th>
                  <th
                    className="text-left py-3 px-4 font-semibold text-sm"
                    style={{ color: THEME.colors.dark }}
                  >
                    Nom
                  </th>
                  <th
                    className="text-left py-3 px-4 font-semibold text-sm"
                    style={{ color: THEME.colors.dark }}
                  >
                    Articles
                  </th>
                  <th
                    className="text-left py-3 px-4 font-semibold text-sm"
                    style={{ color: THEME.colors.dark }}
                  >
                    Total
                  </th>
                  <th
                    className="text-left py-3 px-4 font-semibold text-sm"
                    style={{ color: THEME.colors.dark }}
                  >
                    Statut
                  </th>
                  <th
                    className="text-left py-3 px-4 font-semibold text-sm"
                    style={{ color: THEME.colors.dark }}
                  >
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    style={{
                      borderBottom: `1px solid ${THEME.colors.borderColor}`,
                    }}
                  >
                    <td
                      className="py-4 px-4 text-sm font-mono"
                      style={{ color: THEME.colors.primary }}
                    >
                      {order.id.substring(0, 12)}...
                    </td>
                    <td className="py-4 px-4 text-sm">{order.email}</td>
                    <td className="py-4 px-4 text-sm">{order.name}</td>
                    <td className="py-4 px-4 text-sm">
                      {order.items.length} article(s)
                    </td>
                    <td
                      className="py-4 px-4 text-sm font-semibold"
                      style={{ color: THEME.colors.primary }}
                    >
                      {(order.total / 100).toFixed(2)}€
                    </td>
                    <td className="py-4 px-4">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(
                            order.id,
                            e.target.value as Order["status"]
                          )
                        }
                        className="px-3 py-1 rounded text-sm"
                        style={{
                          borderColor: THEME.colors.borderColor,
                          backgroundColor:
                            order.status === "delivered"
                              ? "#dcfce7"
                              : order.status === "shipped"
                                ? "#fef3c7"
                                : "#dbeafe",
                          color: THEME.colors.dark,
                        }}
                      >
                        <option value="paid">Payée</option>
                        <option value="shipped">Expédiée</option>
                        <option value="delivered">Livrée</option>
                      </select>
                    </td>
                    <td
                      className="py-4 px-4 text-sm"
                      style={{ color: `${THEME.colors.dark}60` }}
                    >
                      {new Date(order.createdAt).toLocaleDateString("fr-FR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
