"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <section className="relative min-h-[100dvh] flex flex-col">
      {/* Full-bleed background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/gallery-01.jpg"
          alt="Featured portrait photography by Rami Adam"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark overlay gradient from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
      </div>

      {/* Content pinned to bottom */}
      <div className="relative z-10 mt-auto px-6 md:px-10 lg:px-16 pb-12 md:pb-16 lg:pb-20">
        <div
          className="max-w-4xl"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(24px)",
            transition: "all 1s cubic-bezier(0.23, 1, 0.32, 1) 0.3s",
          }}
        >
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.95] tracking-tight text-foreground text-balance">
            Where People
            <br />
            Become Art
          </h1>

          <p
            className="mt-6 md:mt-8 max-w-lg text-sm md:text-base text-foreground/70 leading-relaxed"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(16px)",
              transition: "all 1s cubic-bezier(0.23, 1, 0.32, 1) 0.6s",
            }}
          >
            The bio is still loading… <br />
            But the art is ready.
          </p>
        </div>

        {/* Scroll hint */}
        <div
          className="mt-12 md:mt-16 flex items-center gap-3"
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 1s ease 1.2s",
          }}
        >
          <div className="w-px h-8 bg-foreground/30 animate-pulse" />
          <span className="text-[10px] uppercase tracking-widest text-foreground/30">
            Scroll
          </span>
        </div>
      </div>
    </section>
  )
}
