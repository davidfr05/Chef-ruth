"use client";

import { useState } from "react";
import { restaurantMenu, traiteurMenu, type MenuCategory } from "@/lib/menu-data";
import { THEME } from "@/lib/theme";

export default function Menu() {
  const [activeTab, setActiveTab] = useState<"restaurant" | "traiteur">(
    "restaurant"
  );

  const items = activeTab === "restaurant" ? restaurantMenu : traiteurMenu;

  return (
    <section id="menu" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* En-tête */}
        <div className="text-center mb-12">
          <span className="text-[#C4904A] text-[10px] tracking-[0.35em] uppercase">
            Ce que nous proposons
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-[#1A1714] mt-3">
            Notre Menu
          </h2>
          <div className="w-10 h-0.5 bg-[#C4904A] mx-auto mt-4" />
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-14">
          <div className="flex border border-[#E8E3DA]">
            {(["restaurant", "traiteur"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-10 py-3 text-xs font-medium tracking-widest uppercase transition-all ${
                  activeTab === tab
                    ? "bg-[#1A1714] text-white"
                    : "text-[#1A1714]/50 hover:text-[#1A1714] bg-white"
                }`}
              >
                {tab === "restaurant" ? "Restauration" : "Traiteur"}
              </button>
            ))}
          </div>
        </div>

        {/* Catégories et plats */}
        <div className="space-y-12">
          {items.map(({ category, items: dishes }) => (
            <div key={category}>
              <h3 className="text-[10px] tracking-[0.3em] uppercase text-[#C4904A] mb-6 pb-3 border-b border-[#F0EBE0]">
                {category}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {dishes.map(({ name, desc, price }) => (
                  <div
                    key={name}
                    className="flex justify-between items-start gap-4 group"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-[#1A1714] group-hover:text-[#C4904A] transition-colors">
                        {name}
                      </h4>
                      <p className="text-sm text-[#1A1714]/45 mt-1 leading-relaxed">
                        {desc}
                      </p>
                    </div>
                    <span className="text-[#C4904A] font-medium text-sm shrink-0 pt-0.5">
                      {price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-[#1A1714]/35 mt-14 italic">
          Menu susceptible de changer selon les saisons et les arrivages.
          Prix TTC, service compris.
        </p>
      </div>
    </section>
  );
}
