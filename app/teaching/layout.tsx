import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/site'

const baseUrl = SITE_URL

export const metadata: Metadata = {
    title: '강의',
    description: '대학, 공공 교육사업, 기업에서 파이썬과 생성형 AI를 가르칩니다. 서울과학기술대학교, 구미대학교, 동아대학교 강의 이력과 강의 주제.',
    keywords: ['개발 강의', '파이썬 강의', '생성형 AI 강의', 'ChatGPT 특강', '데이터 라벨링 교육', '출강', '대학 특강', '기업 교육'],
    authors: [{ name: 'Han Dongyun' }],
    openGraph: {
        type: 'website',
        locale: 'ko_KR',
        url: `${baseUrl}/teaching`,
        siteName: '한동윤 David Han',
        title: '지금 만들고 있는 사람이 가르칩니다',
        description: '대학, 공공 교육사업, 기업에서 파이썬과 생성형 AI를 가르칩니다. 서울과학기술대학교, 구미대학교, 동아대학교 강의 이력과 강의 주제.',
        images: [
            {
                url: `${baseUrl}/og-image.jpg`,
                width: 1200,
                height: 630,
                alt: '한동윤 강의 소개',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: '지금 만들고 있는 사람이 가르칩니다',
        description: '대학, 공공 교육사업, 기업에서 파이썬과 생성형 AI를 가르칩니다. 서울과학기술대학교, 구미대학교, 동아대학교 강의 이력과 강의 주제.',
        images: [`${baseUrl}/og-image.jpg`],
    },
    alternates: {
        canonical: '/teaching',
    },
    robots: {
        index: true,
        follow: true,
    },
}

export default function TeachingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
