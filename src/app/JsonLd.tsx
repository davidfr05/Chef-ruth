const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://chefruth.fr";

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Chef Ruth",
    description:
      "Traiteur-sandwicherie au cœur du 16e arrondissement de Paris. Cuisine fraîche, sandwichs artisanaux, plateaux traiteur pour événements professionnels et particuliers.",
    url: SITE_URL,
    telephone: "+33145624540",
    image: `${SITE_URL}/og-image.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "138 Rue de la Pompe",
      addressLocality: "Paris",
      postalCode: "75016",
      addressCountry: "FR",
    },
    servesCuisine: ["Sandwicherie", "Traiteur", "Cuisine française"],
    priceRange: "€€",
    hasMenu: `${SITE_URL}#menu`,
    openingHoursSpecification: [
      // Lundi–Jeudi midi
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "12:00",
        closes: "15:00",
      },
      // Lundi–Jeudi soir
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "18:30",
        closes: "21:00",
      },
      // Vendredi midi uniquement
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Friday"],
        opens: "12:00",
        closes: "15:00",
      },
      // Dimanche midi
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday"],
        opens: "12:00",
        closes: "16:00",
      },
      // Dimanche soir
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday"],
        opens: "18:30",
        closes: "21:00",
      },
    ],
    currenciesAccepted: "EUR",
    paymentAccepted: "Cash, Credit Card",
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Takeaway",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Delivery",
        value: true,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
