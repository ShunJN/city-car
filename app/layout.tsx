import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Toaster } from "@/components/toaster"

export const metadata: Metadata = {
  title: "CityCar - Leasing et financement automobile",
  description: "Votre partenaire de confiance pour le financement et leasing de voitures d'occasion depuis 2007",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
