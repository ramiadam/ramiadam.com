"use client"

import { useState, useEffect } from "react"

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="flex items-center justify-between px-6 md:px-10 lg:px-16 py-5">
        {/* Logo / Name */}
        <a
          href="#"
          className="font-serif text-sm tracking-widest uppercase text-foreground"
        >
          Rami Adam
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#gallery"
            className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            Gallery
          </a>
          <a
            href="#contact"
            className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            Contact
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden relative w-8 h-8 flex items-center justify-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span
            className={`block absolute h-px w-5 bg-foreground transition-all duration-300 ${
              menuOpen ? "rotate-45" : "-translate-y-1"
            }`}
          />
          <span
            className={`block absolute h-px w-5 bg-foreground transition-all duration-300 ${
              menuOpen ? "-rotate-45" : "translate-y-1"
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          scrolled ? "bg-background/80 backdrop-blur-md" : "bg-background/95 backdrop-blur-md"
        } ${menuOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="flex flex-col gap-5 px-6 pb-6 pt-2">
          <a
            href="#gallery"
            className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Gallery
          </a>
          <a
            href="#contact"
            className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  )
}
