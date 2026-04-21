import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Order } from "@/lib/cart-types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

function generateId(): string {
  return `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID manquante" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Paiement non confirmé" },
        { status: 400 }
      );
    }

    const { name, address, items } = session.metadata || {};

    const order: Order = {
      id: generateId(),
      sessionId: session.id,
      email: session.customer_email || "",
      name: name || "",
      address: address || "",
      items: items ? JSON.parse(items) : [],
      total: session.amount_total || 0,
      status: "paid",
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(order);
  } catch (error) {
    console.error("Erreur vérification paiement:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
