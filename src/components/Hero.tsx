export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center justify-center bg-[#1A1714] overflow-hidden"
    >
      {/* Cercles décoratifs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-16 w-80 h-80 rounded-full border border-white/5" />
        <div className="absolute bottom-16 right-16 w-64 h-64 rounded-full border border-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/[0.03]" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Logo cercle */}
        <div className="w-28 h-28 rounded-full bg-[#F0EBE0] mx-auto mb-10 flex flex-col items-center justify-center shadow-lg">
          <span className="font-serif italic text-lg text-[#1A1714] leading-tight">
            Chef Ruth
          </span>
          <div className="w-14 h-px bg-[#C4904A] my-1.5" />
          <span className="text-[8px] tracking-[0.2em] text-[#1A1714]/60 uppercase">
            Traiteur
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-serif font-light text-white mb-4 tracking-tight">
          Chef Ruth
        </h1>

        <p className="text-[#C4904A] text-xs tracking-[0.35em] uppercase mb-6">
          Traiteur · Sandwicherie · Paris 16<sup>e</sup>
        </p>

        <p className="text-white/60 text-lg leading-relaxed mb-12 max-w-xl mx-auto">
          Une cuisine généreuse et authentique, préparée avec soin chaque jour.
          Déjeuner sur place, à emporter ou livraison pour vos événements.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#menu"
            className="bg-[#C4904A] text-white px-10 py-3.5 text-xs font-medium tracking-widest uppercase hover:bg-[#B07A3A] transition-colors"
          >
            Notre Menu
          </a>
          <a
            href="#reservation"
            className="border border-white/25 text-white px-10 py-3.5 text-xs font-medium tracking-widest uppercase hover:bg-white/10 transition-colors"
          >
            Réserver
          </a>
        </div>
      </div>

    </section>
  );
}
