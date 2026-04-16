import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";

// Mettez à jour cette variable avec votre domaine de production
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://chefruth.fr";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Chef Ruth | Traiteur & Sandwicherie — Paris 16e",
    template: "%s | Chef Ruth",
  },
  description:
    "Chef Ruth, votre traiteur-sandwicherie au 138 Rue de la Pompe, 75016 Paris. Cuisine fraîche et généreuse, plateaux traiteur pour événements, déjeuner sur place ou à emporter.",
  keywords: [
    "traiteur Paris 16",
    "sandwicherie Paris 16",
    "Chef Ruth",
    "traiteur 75016",
    "plateau apéritif Paris",
    "livraison repas Paris",
    "buffet événement Paris",
    "sandwich Paris 16e",
    "traiteur Rue de la Pompe",
  ],
  authors: [{ name: "Chef Ruth" }],
  creator: "Chef Ruth",

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "Chef Ruth",
    title: "Chef Ruth | Traiteur & Sandwicherie — Paris 16e",
    description:
      "Cuisine fraîche et généreuse au cœur du 16e. Sandwichs artisanaux, salades, plateaux traiteur pour vos événements.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Chef Ruth — Traiteur Sandwicherie Paris 16e",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Chef Ruth | Traiteur & Sandwicherie — Paris 16e",
    description:
      "Cuisine fraîche et généreuse au cœur du 16e. Sandwichs artisanaux, salades, plateaux traiteur pour vos événements.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
