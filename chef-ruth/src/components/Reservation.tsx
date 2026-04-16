import { Phone, MapPin } from "lucide-react";

export default function Reservation() {
  return (
    <section id="reservation" className="py-24 bg-[#F0EBE0]">
      <div className="max-w-6xl mx-auto px-6">
        {/* En-tête */}
        <div className="text-center mb-12">
          <span className="text-[#C4904A] text-[10px] tracking-[0.35em] uppercase">
            Venez nous voir
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-[#1A1714] mt-3">
            Réservation
          </h2>
          <div className="w-10 h-0.5 bg-[#C4904A] mx-auto mt-4" />
        </div>

        <div className="max-w-lg mx-auto">
          <div className="bg-white p-10 shadow-sm">
            {/* Message */}
            <p className="text-center text-[#1A1714]/60 text-sm leading-relaxed mb-8">
              La réservation en ligne sera bientôt disponible. En attendant,
              contactez-nous directement par téléphone pour réserver votre table
              ou organiser votre événement traiteur.
            </p>

            {/* Boutons */}
            <div className="flex flex-col gap-3">
              <a
                href="tel:0145624540"
                className="flex items-center justify-center gap-3 bg-[#1A1714] text-white py-4 text-xs font-medium tracking-widest uppercase hover:bg-[#2A2724] transition-colors"
              >
                <Phone size={15} />
                01 45 62 45 40
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=138+Rue+de+la+Pompe+75016+Paris"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 border border-[#1A1714]/15 text-[#1A1714] py-4 text-xs font-medium tracking-widest uppercase hover:bg-[#1A1714]/5 transition-colors"
              >
                <MapPin size={15} />
                138 Rue de la Pompe, Paris 16e
              </a>
            </div>

            {/* Badge coming soon */}
            <div className="mt-8 pt-8 border-t border-[#F0EBE0] text-center">
              <span className="inline-block bg-[#C4904A]/10 text-[#C4904A] text-[10px] tracking-[0.25em] uppercase px-4 py-2">
                Réservation en ligne — bientôt disponible
              </span>
            </div>
          </div>

          {/* Infos horaires rapides */}
          <div className="mt-6 grid grid-cols-2 gap-3 text-center text-xs text-[#1A1714]/60">
            <div className="bg-white/60 py-3 px-4">
              <p className="font-medium text-[#1A1714] mb-1">Déjeuner</p>
              <p>12:00 – 15:00</p>
            </div>
            <div className="bg-white/60 py-3 px-4">
              <p className="font-medium text-[#1A1714] mb-1">Dîner</p>
              <p>18:30 – 21:00</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
