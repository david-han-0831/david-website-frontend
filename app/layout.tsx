import type { Metadata } from 'next'
import { Inter, Poppins, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/dom/SmoothScroll'
import Navigation from '@/components/dom/Navigation'
import Footer from '@/components/dom/Footer'
import { GoogleTagManager } from '@next/third-parties/google'
import MicrosoftClarity from '@/components/analytics/MicrosoftClarity'
import StructuredData from '@/components/seo/StructuredData'

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
  title: {
    default: 'Han Dongyun | Interactive Portfolio',
    template: '%s | Han Dongyun',
  },
  description: 'Interactive Portfolio Platform of Han Dongyun - Developer & Educator. Full-stack developer specializing in Next.js, React, Python, and modern web technologies.',
  keywords: ['portfolio', 'developer', 'full-stack', 'Next.js', 'React', 'Python', 'FastAPI', 'education', 'teaching'],
  authors: [{ name: 'Han Dongyun' }],
  creator: 'Han Dongyun',
  publisher: 'Han Dongyun',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Han Dongyun Portfolio',
    title: 'Han Dongyun | Interactive Portfolio',
    description: 'Interactive Portfolio Platform of Han Dongyun - Developer & Educator',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Han Dongyun Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Han Dongyun | Interactive Portfolio',
    description: 'Interactive Portfolio Platform of Han Dongyun - Developer & Educator',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

import { LanguageProvider } from '@/contexts/LanguageContext'

// ... imports

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID

  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable}`}>
      <head>
        <StructuredData type="Person" />
        <StructuredData type="Organization" />
        <StructuredData type="WebSite" />
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager - Next.js 공식 컴포넌트 (자동으로 head와 body에 최적화 배치) */}
        {gtmId && <GoogleTagManager gtmId={gtmId} />}
        {clarityId && <MicrosoftClarity clarityId={clarityId} />}
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
