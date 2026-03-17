import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { Gallery } from "@/components/gallery"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  )
}
