"use client";

import { useState, useEffect } from "react";
import { NAV_LINKS } from "@/lib/navigation";
import { THEME } from "@/lib/theme";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#accueil" className="flex flex-col leading-none group">
          <span
            className={`font-serif text-xl italic transition-colors ${
              scrolled ? "text-[#1A1714]" : "text-white"
            }`}
          >
            Chef Ruth
          </span>
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#C4904A]">
            Traiteur · Sandwicherie
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-[#C4904A] ${
                scrolled ? "text-[#1A1714]" : "text-white"
              }`}
            >
              {label}
            </a>
          ))}
          <a
            href="#reservation"
            className="bg-[#C4904A] text-white px-5 py-2.5 text-xs font-medium tracking-widest uppercase hover:bg-[#B07A3A] transition-colors"
          >
            Réserver
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className={`md:hidden p-2 text-lg transition-colors ${
            scrolled ? "text-[#1A1714]" : "text-white"
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-6">
          <div className="flex flex-col items-center gap-5">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-[#1A1714] text-sm font-medium tracking-wide hover:text-[#C4904A] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
            <a
              href="#reservation"
              className="bg-[#C4904A] text-white px-6 py-2.5 text-xs font-medium tracking-widest uppercase hover:bg-[#B07A3A] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Réserver
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
