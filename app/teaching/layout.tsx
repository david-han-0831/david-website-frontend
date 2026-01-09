import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'

export const metadata: Metadata = {
    title: 'Teaching | Han Dongyun',
    description: '강의 전문성과 실적을 증명하는 교육 포트폴리오. 실무·자동화·AI 중심의 결과물 기반 강의.',
    keywords: ['teaching', 'education', '강의', '교육', '프로그래밍', 'full-stack', 'AI', 'automation', 'curriculum'],
    authors: [{ name: 'Han Dongyun' }],
    openGraph: {
        type: 'website',
        locale: 'ko_KR',
        url: `${baseUrl}/teaching`,
        siteName: 'Han Dongyun Portfolio',
        title: 'Teaching | Han Dongyun - 강의 전문성과 실적',
        description: '강의 전문성과 실적을 증명하는 교육 포트폴리오. 실무·자동화·AI 중심의 결과물 기반 강의.',
        images: [
            {
                url: `${baseUrl}/og-teaching.jpg`,
                width: 1200,
                height: 630,
                alt: 'Han Dongyun Teaching Portfolio',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Teaching | Han Dongyun',
        description: '강의 전문성과 실적을 증명하는 교육 포트폴리오. 실무·자동화·AI 중심의 결과물 기반 강의.',
        images: [`${baseUrl}/og-teaching.jpg`],
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
