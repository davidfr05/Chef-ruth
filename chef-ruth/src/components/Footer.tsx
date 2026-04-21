import { RESTAURANT_INFO } from "@/lib/config";
import { formatBusinessHoursForFooter } from "@/lib/formats";
import { NAV_LINKS } from "@/lib/navigation";

const horairesFooter = formatBusinessHoursForFooter();

export default function Footer() {
  return (
    <footer className="bg-[#1A1714] text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <span className="font-serif text-2xl italic font-light">
              Chef Ruth
            </span>
            <div className="w-8 h-px bg-[#C4904A] mt-2 mb-3" />
            <span className="text-[10px] tracking-[0.3em] text-[#C4904A] uppercase">
              Traiteur · Sandwicherie
            </span>
            <p className="text-white/40 text-sm leading-relaxed mt-4">
              Cuisine fraîche et généreuse au cœur du 16e arrondissement
              de Paris, depuis le premier jour.
            </p>
          </div>

          {/* Contact + navigation */}
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#C4904A] mb-5">
              Nous trouver
            </h4>
            <div className="space-y-2 text-sm text-white/50 mb-6">
              <p>{RESTAURANT_INFO.address.street}</p>
              <p>{RESTAURANT_INFO.address.postalCode} {RESTAURANT_INFO.address.city}</p>
              <a
                href={`tel:${RESTAURANT_INFO.phone.replace(/\s/g, "")}`}
                className="block text-white/60 hover:text-white transition-colors mt-3"
              >
                {RESTAURANT_INFO.phone}
              </a>
            </div>
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-xs text-white/30 hover:text-white/70 transition-colors tracking-wide"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Horaires */}
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#C4904A] mb-5">
              Horaires
            </h4>
            <div className="space-y-3">
              {horairesFooter.map(({ jours, horaire }) => (
                <div key={jours} className="flex justify-between text-sm gap-4">
                  <span className="text-white/35 shrink-0">{jours}</span>
                  <span
                    className={
                      horaire === "Fermé"
                        ? "text-white/25 italic"
                        : "text-white/60 text-right"
                    }
                  >
                    {horaire}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Barre du bas */}
        <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-white/20">
          <p>© 2024 Chef Ruth. Tous droits réservés.</p>
          <p>138 Rue de la Pompe, 75016 Paris</p>
        </div>
      </div>
    </footer>
  );
}
