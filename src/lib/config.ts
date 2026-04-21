export const RESTAURANT_INFO = {
  name: "Chef Ruth",
  address: {
    street: "138 Rue de la Pompe",
    city: "Paris",
    postalCode: "75016",
    country: "FR",
  },
  phone: "01 45 62 45 40",
  phoneRaw: "+33145624540",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://chefruth.fr",
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=138+Rue+de+la+Pompe+75016+Paris",
};

export const BUSINESS_HOURS = [
  {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    lunch: { open: "12:00", close: "15:00" },
    dinner: { open: "18:30", close: "21:00" },
  },
  {
    days: ["Friday"],
    lunch: { open: "12:00", close: "15:00" },
    dinner: null,
  },
  {
    days: ["Saturday"],
    lunch: null,
    dinner: null,
  },
  {
    days: ["Sunday"],
    lunch: { open: "12:00", close: "16:00" },
    dinner: { open: "18:30", close: "21:00" },
  },
];
