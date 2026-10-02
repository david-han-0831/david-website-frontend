import type { Metadata } from 'next'
import { Inter, Poppins, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/dom/SmoothScroll'
import Navigation from '@/components/dom/Navigation'
import Footer from '@/components/dom/Footer'
import { GoogleTagManager } from '@next/third-parties/google'
import MicrosoftClarity from '@/components/analytics/MicrosoftClarity'
import PostHogProviderWrapper from '@/components/analytics/PostHog'
import StructuredData from '@/components/seo/StructuredData'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { SITE_URL } from '@/lib/site'

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
    default: '한동윤 David Han | 웹, 앱, AI 제품 개발과 강의',
    template: '%s | Han Dongyun',
  },
  description: '웹, 앱, AI 제품을 기획부터 출시까지 만드는 개발자 한동윤입니다. 외주 개발과 대학·기업 강의 문의를 받습니다.',
  keywords: ['외주 개발', '앱 개발', '웹 개발', 'AI 개발', '프리랜서 개발자', '개발 강의', '파이썬 강의', '생성형 AI 강의', 'Next.js', 'FastAPI', 'SwiftUI'],
  authors: [{ name: 'Han Dongyun' }],
  creator: 'Han Dongyun',
  publisher: 'Han Dongyun',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_URL,
    siteName: '한동윤 David Han',
    title: '제 서비스도 만들고, 남의 서비스도 만듭니다',
    description: '웹, 앱, AI 제품을 기획부터 출시까지 만드는 개발자 한동윤입니다. 외주 개발과 강의 문의를 받습니다.',
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: '미니어처 작업실과 한동윤 소개 문구',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '제 서비스도 만들고, 남의 서비스도 만듭니다',
    description: '웹, 앱, AI 제품을 기획부터 출시까지 만드는 개발자 한동윤입니다.',
    images: [`${SITE_URL}/og-image.jpg`],
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
  // 검색 등록 도구의 소유 확인 값. 값이 없으면 태그를 넣지 않는다
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION
      ? { 'naver-site-verification': process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION }
      : undefined,
  },
}


// ... imports

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID
  const posthogApiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST

  return (
    <html lang="ko" className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/wanteddev/wanted-sans@v1.0.3/packages/wanted-sans/fonts/webfonts/variable/split/WantedSansVariable.min.css"
        />
        <StructuredData type="Person" />
        <StructuredData type="Organization" />
        <StructuredData type="WebSite" />
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager - Next.js 공식 컴포넌트 (자동으로 head와 body에 최적화 배치) */}
        {gtmId && <GoogleTagManager gtmId={gtmId} />}
        {clarityId && <MicrosoftClarity clarityId={clarityId} />}
        {posthogApiKey && posthogHost ? (
          <PostHogProviderWrapper apiKey={posthogApiKey} apiHost={posthogHost}>
            <LanguageProvider>
              <SmoothScroll>
                <Navigation />
                {children}
                <Footer />
              </SmoothScroll>
            </LanguageProvider>
          </PostHogProviderWrapper>
        ) : (
          <LanguageProvider>
            <SmoothScroll>
              <Navigation />
              {children}
              <Footer />
            </SmoothScroll>
          </LanguageProvider>
        )}
      </body>
    </html>
  )
}
