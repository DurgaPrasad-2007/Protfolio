import type React from "react"
import type { Metadata } from "next"
import { Inter, Handjet } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Analytics from "@/components/analytics"
import SchemaMarkup from "@/components/schema-markup"
import { Suspense } from "react"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const handjet = Handjet({
  subsets: ["latin"],
  variable: "--font-handjet",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Poloju Durga Prasad Chary | Machine Learning Intern",
  description:
    "Portfolio of Poloju Durga Prasad Chary, Machine Learning Intern specializing in AI, cybersecurity, and software systems.",
  openGraph: {
    title: "Poloju Durga Prasad Chary | Machine Learning Intern",
    description:
      "Portfolio of Poloju Durga Prasad Chary, Machine Learning Intern specializing in AI, cybersecurity, and software systems.",
    url: "https://polojudurgaprasadchary.com",
    siteName: "Poloju Durga Prasad Chary Portfolio",
    images: [
      {
        url: "/vinaya-swamy.jpg",
        width: 1200,
        height: 630,
        alt: "Vinaya Swamy",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <SchemaMarkup />
        <link rel="icon" href="/vinaya-swamy.jpg" />
      </head>
      <body className={`${inter.variable} ${handjet.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navigation />
          <Suspense>{children}</Suspense>
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
