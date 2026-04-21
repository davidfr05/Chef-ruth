import { RESTAURANT_INFO } from "@/lib/config";
import { formatBusinessHoursForOpeningHours } from "@/lib/formats";

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: RESTAURANT_INFO.name,
    description:
      "Traiteur-sandwicherie au cœur du 16e arrondissement de Paris. Cuisine fraîche, sandwichs artisanaux, plateaux traiteur pour événements professionnels et particuliers.",
    url: RESTAURANT_INFO.siteUrl,
    telephone: RESTAURANT_INFO.phoneRaw,
    image: `${RESTAURANT_INFO.siteUrl}/og-image.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: RESTAURANT_INFO.address.street,
      addressLocality: RESTAURANT_INFO.address.city,
      postalCode: RESTAURANT_INFO.address.postalCode,
      addressCountry: RESTAURANT_INFO.address.country,
    },
    servesCuisine: ["Sandwicherie", "Traiteur", "Cuisine française"],
    priceRange: "€€",
    hasMenu: `${RESTAURANT_INFO.siteUrl}#menu`,
    openingHoursSpecification: formatBusinessHoursForOpeningHours(),
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
