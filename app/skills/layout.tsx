import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/site'

const baseUrl = SITE_URL

export const metadata: Metadata = {
  title: '기술 스택',
  description: '59개 프로젝트에서 실제로 쓴 기술과 특허, 자격. Next.js, FastAPI, Spring Boot, SwiftUI, Kotlin, Firebase, PostgreSQL 등.',
  keywords: ['skills', 'technical skills', 'full-stack', 'programming', 'Next.js', 'React', 'Python', 'AI', 'ML'],
  authors: [{ name: 'Han Dongyun' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: `${baseUrl}/skills`,
    siteName: '한동윤 David Han',
    title: '기술 스택',
    description: '59개 프로젝트에서 실제로 쓴 기술과 특허, 자격. Next.js, FastAPI, Spring Boot, SwiftUI, Kotlin, Firebase, PostgreSQL 등.',
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Han Dongyun Skills',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '기술 스택',
    description: '59개 프로젝트에서 실제로 쓴 기술과 특허, 자격. Next.js, FastAPI, Spring Boot, SwiftUI, Kotlin, Firebase, PostgreSQL 등.',
    images: [`${baseUrl}/og-image.jpg`],
  },
  alternates: {
    canonical: '/skills',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function SkillsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
