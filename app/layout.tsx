import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, IBM_Plex_Mono } from "next/font/google"
import { Poppins } from "next/font/google";

const inter = Inter({ subsets: ["latin"] })
const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
})

export const metadata: Metadata = {
  title: "Beauty of Cloud",
  description: "Sri Lanka's first Student-led cloud hackathon",
    generator: 'v0.dev'
}

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700", "900"]
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${poppins.className} ${ibmPlexMono.variable}`}>{children}</body>
    </html>
  )
}
