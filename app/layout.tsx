import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geistSans = localFont({
  src: [
    {
      path: "./fonts/Geist-Variable.woff2",
      style: "normal",
      weight: "100 900",
    },
    {
      path: "./fonts/Geist-Italic-Variable.woff2",
      style: "italic",
      weight: "100 900",
    },
  ],
  variable: "--font-geist-sans",
  display: "swap",
})

const geistMono = localFont({
  src: [
    {
      path: "./fonts/GeistMono-Variable.woff2",
      style: "normal",
      weight: "100 900",
    },
    {
      path: "./fonts/GeistMono-Italic-Variable.woff2",
      style: "italic",
      weight: "100 900",
    },
  ],
  variable: "--font-geist-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Personal Blog - Thoughts on Design & Development",
  description: "A minimalist blog exploring design, development, and user experience",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
