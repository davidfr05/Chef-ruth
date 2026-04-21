import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import { RESTAURANT_INFO } from "@/lib/config";
import { SEO_KEYWORDS, SEO_DESCRIPTION, SEO_OG_DESCRIPTION } from "@/lib/seo";

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
  metadataBase: new URL(RESTAURANT_INFO.siteUrl),

  title: {
    default: "Chef Ruth | Traiteur & Sandwicherie — Paris 16e",
    template: "%s | Chef Ruth",
  },
  description: SEO_DESCRIPTION,
  keywords: SEO_KEYWORDS,
  authors: [{ name: RESTAURANT_INFO.name }],
  creator: RESTAURANT_INFO.name,

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: RESTAURANT_INFO.siteUrl,
    siteName: RESTAURANT_INFO.name,
    title: "Chef Ruth | Traiteur & Sandwicherie — Paris 16e",
    description: SEO_OG_DESCRIPTION,
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
    description: SEO_OG_DESCRIPTION,
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
    canonical: RESTAURANT_INFO.siteUrl,
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
