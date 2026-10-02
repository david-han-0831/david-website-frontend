import type { Metadata } from 'next'
import About from '@/components/about/About'
import { SITE_URL } from '@/lib/site'

const baseUrl = SITE_URL

export const metadata: Metadata = {
  title: '소개',
  description: '㈜콜론비 대표 한동윤 소개. 2015년 외주 개발로 시작해 웹, 앱, AI 제품을 만들고 대학과 기업에서 가르칩니다.',
  keywords: ['한동윤', '개발자 소개', '콜론비', '외주 개발자', '개발 강사'],
  authors: [{ name: 'Han Dongyun' }],
  openGraph: {
    type: 'profile',
    locale: 'ko_KR',
    url: `${baseUrl}/about`,
    siteName: '한동윤 David Han',
    title: '직접 만들고, 운영하고, 가르칩니다',
    description: '㈜콜론비 대표 한동윤 소개. 웹, 앱, AI 제품을 만들고 가르칩니다.',
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Han Dongyun - About',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '직접 만들고, 운영하고, 가르칩니다',
    description: '㈜콜론비 대표 한동윤 소개. 웹, 앱, AI 제품을 만들고 가르칩니다.',
    images: [`${baseUrl}/og-image.jpg`],
  },
  alternates: {
    canonical: '/about',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function AboutPage() {
    return (
        // 인물 정보(JSON-LD)는 루트 레이아웃의 head 에 이미 있다. 본문에 script 를 또 두면
        // 분석 도구가 끼워 넣는 script 와 자리가 어긋나 화면 불일치 경고가 난다
        <About />
    )
}
