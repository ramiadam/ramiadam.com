"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

const photos = [
  { src: "/images/gallery-200.jpg", alt: "Portrait CYB-PS-0691" },
  { src: "/images/gallery-300.jpg", alt: "Portrait CYB-PS-0598" },
  { src: "/images/gallery-400.jpg", alt: "Portrait MAH-9696" },
  { src: "/images/gallery-500.jpg", alt: "Portrait SO-3486" },
  { src: "/images/gallery-600.jpg", alt: "Portrait SO-3467" },
  { src: "/images/gallery-700.jpg", alt: "Portrait SO-3488" },
  { src: "/images/gallery-800.jpg", alt: "Portrait SG-2397" },
  { src: "/images/gallery-900.jpg", alt: "Portrait R&P-5669" },
  { src: "/images/gallery-1000.jpg", alt: "Portrait GEN-8981" },
  { src: "/images/gallery-1100.jpg", alt: "Portrait GEN-8914" },
  { src: "/images/gallery-1200.jpg", alt: "Portrait TUH-6032" },
  { src: "/images/gallery-1300.jpg", alt: "Portrait RAN-1364" },
]

function GalleryItem({
  photo,
  index,
  onOpen,
}: {
  photo: (typeof photos)[0]
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

  return (
    <div
      ref={ref}
      className="cursor-pointer overflow-hidden bg-secondary"
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
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover gallery-img"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
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
  photos: typeof photos
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
      {/* Close */}
      <button
        className="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Prev */}
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

      {/* Image */}
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

      {/* Next */}
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

      {/* Counter */}
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
    () =>
      setLightboxIndex((prev) =>
        prev !== null ? (prev + 1) % photos.length : null
      ),
    []
  )
  const handlePrev = useCallback(
    () =>
      setLightboxIndex((prev) =>
        prev !== null ? (prev - 1 + photos.length) % photos.length : null
      ),
    []
  )

  return (
    <>
      <section
        id="gallery"
        className="px-4 md:px-8 lg:px-12 py-20 md:py-28"
      >
        <div className="max-w-[1600px] mx-auto">
          {/* Section header */}
          <div className="flex items-center gap-4 mb-12 md:mb-16">
            <h2 className="font-serif text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Gallery
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Photo grid: 2 cols on mobile, 3 on md, 4 on lg */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
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