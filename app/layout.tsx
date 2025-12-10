import type { Metadata } from 'next'
import { Inter, Poppins, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/dom/SmoothScroll'
import Navigation from '@/components/dom/Navigation'
import Footer from '@/components/dom/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Han Dongyun | Interactive Portfolio',
  description: 'Interactive Portfolio Platform of Han Dongyun - Developer & Educator',
}

import { LanguageProvider } from '@/contexts/LanguageContext'

// ... imports

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable}`}>
      <body className={inter.className}>
        <LanguageProvider>
          <SmoothScroll>
            <Navigation />
            {children}
            <Footer />
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  )
}
