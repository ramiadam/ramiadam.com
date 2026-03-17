import type { Metadata, Viewport } from "next"
import { Syne, Inter } from "next/font/google"

import "./globals.css"

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Rami Adam | Where People Become Art",
  description:
    "Rami Adam is a photographer based in KSA. Where people become art. Explore the gallery and get in touch.",
}

export const viewport: Viewport = {
  themeColor: "#080808",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
