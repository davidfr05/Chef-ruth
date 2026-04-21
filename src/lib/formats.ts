import { BUSINESS_HOURS } from "./config";

const dayTranslations: Record<string, string> = {
  Monday: "Lundi",
  Tuesday: "Mardi",
  Wednesday: "Mercredi",
  Thursday: "Jeudi",
  Friday: "Vendredi",
  Saturday: "Samedi",
  Sunday: "Dimanche",
};

type DayFormat = "Lundi" | "Mardi" | "Mercredi" | "Jeudi" | "Vendredi" | "Samedi" | "Dimanche";

export function formatBusinessHoursForDisplay() {
  return BUSINESS_HOURS.map((block) => {
    const daysFrench = block.days.map((day) => dayTranslations[day]);
    return daysFrench.map((jour) => ({
      jour,
      midi: block.lunch ? block.lunch.open + "–" + block.lunch.close : null,
      soir: block.dinner ? block.dinner.open + "–" + block.dinner.close : null,
    }));
  }).flat();
}

export function formatBusinessHoursForFooter() {
  const footerFormats = [];

  const monToThu = BUSINESS_HOURS.find((h) =>
    h.days.includes("Monday")
  );
  if (monToThu && monToThu.lunch && monToThu.dinner) {
    footerFormats.push({
      jours: "Lun – Jeu",
      horaire: `${monToThu.lunch.open}–${monToThu.lunch.close}  ·  ${monToThu.dinner.open}–${monToThu.dinner.close}`,
    });
  }

  const fri = BUSINESS_HOURS.find((h) => h.days.includes("Friday"));
  if (fri && fri.lunch) {
    footerFormats.push({
      jours: "Vendredi",
      horaire: `${fri.lunch.open}–${fri.lunch.close}`,
    });
  }

  footerFormats.push({ jours: "Samedi", horaire: "Fermé" });

  const sun = BUSINESS_HOURS.find((h) => h.days.includes("Sunday"));
  if (sun && sun.lunch && sun.dinner) {
    footerFormats.push({
      jours: "Dimanche",
      horaire: `${sun.lunch.open}–${sun.lunch.close}  ·  ${sun.dinner.open}–${sun.dinner.close}`,
    });
  }

  return footerFormats;
}

export function formatBusinessHoursForOpeningHours() {
  return BUSINESS_HOURS.flatMap((block) => {
    const specs = [];

    if (block.lunch) {
      specs.push({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: block.days,
        opens: block.lunch.open,
        closes: block.lunch.close,
      });
    }

    if (block.dinner) {
      specs.push({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: block.days,
        opens: block.dinner.open,
        closes: block.dinner.close,
      });
    }

    return specs;
  });
}

export function formatBusinessHoursForReservation() {
  const sun = BUSINESS_HOURS.find((h) => h.days.includes("Sunday"));
  return {
    lunch: sun?.lunch ? `${sun.lunch.open} – ${sun.lunch.close}` : "",
    dinner: sun?.dinner ? `${sun.dinner.open} – ${sun.dinner.close}` : "",
  };
}
