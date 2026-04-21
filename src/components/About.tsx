import { MapPin, Phone, Clock } from "lucide-react";

const horaires = [
  { jour: "Lundi", midi: "12:00–15:00", soir: "18:30–21:00" },
  { jour: "Mardi", midi: "12:00–15:00", soir: "18:30–21:00" },
  { jour: "Mercredi", midi: "12:00–15:00", soir: "18:30–21:00" },
  { jour: "Jeudi", midi: "12:00–15:00", soir: "18:30–21:00" },
  { jour: "Vendredi", midi: "12:00–15:00", soir: null },
  { jour: "Samedi", midi: null, soir: null },
  { jour: "Dimanche", midi: "12:00–16:00", soir: "18:30–21:00" },
];

export default function About() {
  return (
    <section id="a-propos" className="py-24 bg-[#FAFAF7]">
      <div className="max-w-6xl mx-auto px-6">
        {/* En-tête */}
        <div className="text-center mb-16">
          <span className="text-[#C4904A] text-[10px] tracking-[0.35em] uppercase">
            Notre histoire
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-[#1A1714] mt-3">
            À propos de Chef Ruth
          </h2>
          <div className="w-10 h-0.5 bg-[#C4904A] mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Description + contact */}
          <div>
            <p className="text-[#1A1714]/65 text-lg leading-relaxed mb-5">
              Bienvenue chez{" "}
              <strong className="text-[#1A1714] font-semibold">Chef Ruth</strong>,
              votre traiteur-sandwicherie au cœur du 16e arrondissement de Paris.
              Nous vous proposons une cuisine fraîche, généreuse et préparée avec
              des produits soigneusement sélectionnés.
            </p>
            <p className="text-[#1A1714]/65 text-lg leading-relaxed mb-10">
              Que vous souhaitiez déjeuner sur le pouce, emporter votre repas ou
              organiser un événement, notre équipe met tout en œuvre pour vous
              offrir une expérience culinaire à la hauteur de vos attentes.
            </p>

            {/* Infos contact */}
            <address className="not-italic space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={17} className="text-[#C4904A] mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-[#1A1714]">
                    138 Rue de la Pompe
                  </p>
                  <p className="text-sm text-[#1A1714]/50">75016 Paris</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={17} className="text-[#C4904A] shrink-0" />
                <a
                  href="tel:0145624540"
                  className="font-medium text-[#1A1714] hover:text-[#C4904A] transition-colors"
                >
                  01 45 62 45 40
                </a>
              </div>
            </address>
          </div>

          {/* Horaires */}
          <div className="bg-[#F0EBE0] p-8">
            <div className="flex items-center gap-2.5 mb-6">
              <Clock size={17} className="text-[#C4904A]" />
              <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1A1714]">
                Horaires d'ouverture
              </h3>
            </div>
            <div className="space-y-3">
              {horaires.map(({ jour, midi, soir }) => (
                <div key={jour} className="flex items-center justify-between text-sm">
                  <span
                    className={`font-medium w-24 ${
                      !midi ? "text-[#1A1714]/35" : "text-[#1A1714]"
                    }`}
                  >
                    {jour}
                  </span>
                  {!midi ? (
                    <span className="text-[#1A1714]/35 italic text-xs">
                      Fermé
                    </span>
                  ) : (
                    <div className="text-right text-[#1A1714]/65">
                      <span>{midi}</span>
                      {soir && (
                        <>
                          <span className="text-[#1A1714]/25 mx-2">·</span>
                          <span>{soir}</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
