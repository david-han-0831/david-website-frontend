'use client'

import h from './home.module.css'
import { useLanguage } from '@/contexts/LanguageContext'

// 한글·라틴 제목 서체가 언어에 따라 바뀌므로 main 에 언어를 표시한다
export default function HomeShell({ children }: { children: React.ReactNode }) {
    const { locale } = useLanguage()
    return (
        <main className={h.home} data-page="home" data-locale={locale}>
            {children}
        </main>
    )
}
