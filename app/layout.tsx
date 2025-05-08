import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, IBM_Plex_Mono } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })
const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
})

export const metadata: Metadata = {
  title: "Beauty of Cloud",
  description: "Sri Lanka's first Student-led cloud hackathon",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${ibmPlexMono.variable}`}>{children}</body>
    </html>
  )
}
