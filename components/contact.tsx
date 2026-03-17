"use client"

import { useEffect, useRef, useState } from "react"

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com/rami_adam",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/ramiadam",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:hello@ramiadam.com",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
]

export function Contact() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      id="contact"
      className="px-6 md:px-10 lg:px-16 py-24 md:py-36"
    >
      <div
        className="max-w-2xl mx-auto text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.8s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        {/* Section label */}
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">
          Hit me up
        </p>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.05] text-balance">
          {"Let\u2019s make something together."}
        </h2>

        <p className="mt-5 text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
          For bookings, collaborations, or just to say hello.
        </p>

        {/* Social links */}
        <div className="mt-10 flex items-center justify-center gap-5">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-12 h-12 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all duration-300"
              aria-label={s.label}
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Email text */}
        <a
          href="mailto:hello@ramiadam.com"
          className="inline-block mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-wide"
        >
          hello@ramiadam.com
        </a>
      </div>
    </section>
  )
}
