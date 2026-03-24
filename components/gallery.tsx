"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

type PhotoLayout = "v" | "h" | "hm"

type Photo = {
  src: string
  alt: string
  layout?: PhotoLayout // "v" (default) or "h"
  pos?: string // ✅ controls cropping focus: "center", "top", "bottom", "50% 20%"...
}

const photos: Photo[] = [

  // Row 1: bold openers — color, mood, studio
  { src: "/images/gallery-100.jpg", alt: "Man in front of red Emergency sign", layout: "v", pos: "center" },
  { src: "/images/gallery-610.jpg", alt: "Silhouette portrait in black and white", layout: "v", pos: "center" },
  { src: "/images/gallery-130.jpg", alt: "Studio portrait with green background", layout: "v", pos: "center" },

  // Row 2: full-width editorial break
  { src: "/images/gallery-320.jpg", alt: "Black and white editorial portrait", layout: "h", pos: "50% 30%" },

  // Row 3: portrait + wide scene
  { src: "/images/gallery-720.jpg", alt: "Portrait in warm hallway light", layout: "v", pos: "center" },
  { src: "/images/gallery-900.jpg", alt: "Dramatic theater scene with rose petals", layout: "hm", pos: "50% 40%" },

  // Row 4: vibrant trio
  { src: "/images/gallery-450.jpg", alt: "Profile portrait with embroidered scarf", layout: "v", pos: "center" },
  { src: "/images/gallery-110.jpg", alt: "Portrait on yellow chair", layout: "v", pos: "center" },
  { src: "/images/gallery-120.jpg", alt: "Fashion portrait with orange background", layout: "v", pos: "center" },

  // Row 5: city night wide + candid market
  { src: "/images/gallery-620.jpg", alt: "Woman looking back in night city", layout: "hm", pos: "50% 35%" },
  { src: "/images/gallery-2000.jpg", alt: "Elder man at colorful market stall", layout: "v", pos: "center" },

  // Row 6: urban + festival portraits
  { src: "/images/gallery-440.jpg", alt: "Man at Uganda cultural stall", layout: "v", pos: "center" },
  { src: "/images/gallery-410.jpg", alt: "Woman with red flower at festival", layout: "v", pos: "50% 20%" },
  { src: "/images/gallery-420.jpg", alt: "Close portrait with flower crown", layout: "v", pos: "center" },

  // Row 7: joyful candid + street wide
  { src: "/images/gallery-310.jpg", alt: "Woman posing at digital billboard", layout: "v", pos: "center" },
  { src: "/images/gallery-800.jpg", alt: "Three children walking in matching red uniforms", layout: "hm", pos: "50% 40%" },

  // { src: "/images/gallery-620.jpg", alt: "Error404", layout: "v", pos: "center"},

  // { src: "/images/gallery-1700.jpg", alt: "Error404", layout: "v", pos: "center" },
  // { src: "/images/gallery-1800.jpg", alt: "Error404", layout: "v", pos: "center" },
  // { src: "/images/gallery-1900.jpg", alt: "Error404", layout: "v", pos: "center" },
]

function GalleryItem({
  photo,
  index,
  onOpen,
}: {
  photo: Photo
  index: number
  onOpen: (i: number) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const isH = photo.layout === "h"
  const isHm = photo.layout === "hm"

  const aspectClass = isH ? "aspect-[2.5/1]" : isHm ? "aspect-[3/2]" : "aspect-[3/4]"
  const spanClass = isH ? "col-span-3" : isHm ? "col-span-2" : "col-span-1"

  return (
    <div
      ref={ref}
      className={`cursor-pointer overflow-hidden bg-secondary ${spanClass}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `all 0.7s cubic-bezier(0.23,1,0.32,1) ${(index % 4) * 0.08}s`,
      }}
      onClick={() => onOpen(index)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onOpen(index)
        }
      }}
      aria-label={`View ${photo.alt}`}
    >
      <div className={`relative ${aspectClass} overflow-hidden`}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover gallery-img"
          // ✅ Option C: control crop focus per-photo
          style={{ objectPosition: photo.pos ?? "center" }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw"
        />
      </div>
    </div>
  )
}

function Lightbox({
  photos: allPhotos,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: {
  photos: Photo[]
  currentIndex: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") onNext()
      if (e.key === "ArrowLeft") onPrev()
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKey)
    }
  }, [onClose, onNext, onPrev])

  return (
    <div
      className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Photo lightbox"
    >
      <button
        className="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <X className="w-5 h-5" />
      </button>

      <button
        className="absolute left-4 md:left-8 z-10 w-10 h-10 flex items-center justify-center text-foreground/40 hover:text-foreground transition-colors"
        onClick={(e) => {
          e.stopPropagation()
          onPrev()
        }}
        aria-label="Previous photo"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <div
        className="relative w-[90vw] h-[80vh] md:w-[80vw] md:h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={allPhotos[currentIndex].src}
          alt={allPhotos[currentIndex].alt}
          fill
          className="object-contain"
          sizes="90vw"
          priority
        />
      </div>

      <button
        className="absolute right-4 md:right-8 z-10 w-10 h-10 flex items-center justify-center text-foreground/40 hover:text-foreground transition-colors"
        onClick={(e) => {
          e.stopPropagation()
          onNext()
        }}
        aria-label="Next photo"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs text-muted-foreground tracking-widest">
        {currentIndex + 1} / {allPhotos.length}
      </div>
    </div>
  )
}

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const handleClose = useCallback(() => setLightboxIndex(null), [])
  const handleNext = useCallback(
    () => setLightboxIndex((prev) => (prev !== null ? (prev + 1) % photos.length : null)),
    []
  )
  const handlePrev = useCallback(
    () => setLightboxIndex((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : null)),
    []
  )

  return (
    <>
      <section id="gallery" className="px-4 md:px-8 lg:px-12 py-20 md:py-28">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center gap-4 mb-12 md:mb-16">
            <h2 className="font-serif text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Gallery
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 auto-rows-auto">
            {photos.map((photo, index) => (
              <GalleryItem
                key={photo.src}
                photo={photo}
                index={index}
                onOpen={setLightboxIndex}
              />
            ))}
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          photos={photos}
          currentIndex={lightboxIndex}
          onClose={handleClose}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </>
  )
}