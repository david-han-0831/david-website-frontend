import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Teaching | David Han',
    description: '강의 전문성과 실적을 증명하는 교육 포트폴리오. 실무·자동화·AI 중심의 결과물 기반 강의.',
}

export default function TeachingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
