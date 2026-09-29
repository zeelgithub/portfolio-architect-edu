import "./globals.css"
import { Inter } from "next/font/google"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import Providers from "@/components/Providers"
import ScrollToTopButton from "@/components/ui/ScrollToTopButton"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <main className="
  flex-1 container mx-auto px-6 py-16 space-y-2
  text-gray-900 dark:text-gray-100
">
  {children}
</main>
          <Footer />
          <ScrollToTopButton />
        </Providers>
      </body>
    </html>
  )
}
