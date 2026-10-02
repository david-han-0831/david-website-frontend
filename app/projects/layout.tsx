import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/site'

const baseUrl = SITE_URL

export const metadata: Metadata = {
  title: '프로젝트',
  description: '2015년부터 만든 웹 서비스, 모바일 앱, AI 기능, 업무 시스템. 무엇을 왜 만들었는지 프로젝트별로 정리했습니다.',
  keywords: ['개발 포트폴리오', '외주 개발 사례', '앱 개발 사례', 'AI 개발 사례', '웹 서비스 개발'],
  authors: [{ name: 'Han Dongyun' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: `${baseUrl}/projects`,
    siteName: '한동윤 David Han',
    title: '프로젝트',
    description: '2015년부터 만든 웹 서비스, 모바일 앱, AI 기능, 업무 시스템. 무엇을 왜 만들었는지 프로젝트별로 정리했습니다.',
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Han Dongyun Projects Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '프로젝트',
    description: '2015년부터 만든 웹 서비스, 모바일 앱, AI 기능, 업무 시스템. 무엇을 왜 만들었는지 프로젝트별로 정리했습니다.',
    images: [`${baseUrl}/og-image.jpg`],
  },
  alternates: {
    canonical: '/projects',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
