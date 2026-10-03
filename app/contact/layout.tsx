import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/site'

const baseUrl = SITE_URL

export const metadata: Metadata = {
  title: '문의',
  description: '외주 개발과 강의 문의. 필요한 것을 고르면 문의 초안이 만들어지고, 범위와 일정, 예상 비용을 정리해 답장드립니다.',
  keywords: ['contact', 'collaboration', 'inquiry', 'Han Dongyun', 'developer', 'educator'],
  authors: [{ name: 'Han Dongyun' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: `${baseUrl}/contact`,
    siteName: '한동윤 David Han',
    title: '프로젝트와 강의 문의',
    description: '외주 개발과 강의 문의. 필요한 것을 고르면 문의 초안이 만들어지고, 범위와 일정, 예상 비용을 정리해 답장드립니다.',
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Contact Han Dongyun',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '프로젝트와 강의 문의',
    description: '외주 개발과 강의 문의. 필요한 것을 고르면 문의 초안이 만들어지고, 범위와 일정, 예상 비용을 정리해 답장드립니다.',
    images: [`${baseUrl}/og-image.jpg`],
  },
  alternates: {
    canonical: '/contact',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
