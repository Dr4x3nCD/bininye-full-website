import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Playfair_Display } from "next/font/google"
import { CookieConsent } from "@/components/cookie-consent"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

export const metadata: Metadata = {
  title: "ONG Binin Ye - Organisation Non Gouvernementale",
  description:
    "Binin Ye est une Organisation Non Gouvernementale (ONG) engagée dans la création d'un avenir durable pour tous.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${playfair.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  )
}
