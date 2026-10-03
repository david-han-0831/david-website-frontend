'use client'

import h from '@/components/home/home.module.css'
import s from './ContactPage.module.css'
import HomeShell from '@/components/home/HomeShell'
import Inquiry from '@/components/home/Inquiry'
import Sentences from '@/components/home/Sentences'
import { useLanguage } from '@/contexts/LanguageContext'
import type { Locale } from '@/translations'

// 문의 페이지. 홈 맨 아래와 같은 문의 작성기를 쓴다 (문구는 확정되면 translations 로 옮긴다)
const COPY: Record<Locale, { title: string; intro: string }> = {
    ko: {
        title: '문의하기',
        intro: '만들고 싶은 것이나 필요한 강의를 알려 주세요. 범위와 일정, 예상 비용을 정리해 답장드립니다.',
    },
    en: {
        title: 'Get in touch',
        intro: 'Tell me what you want to build or which course you need. I will reply with scope, schedule and an estimate.',
    },
    de: {
        title: 'Kontakt',
        intro: 'Schreiben Sie mir, was Sie bauen möchten oder welchen Kurs Sie brauchen. Ich antworte mit Umfang, Zeitplan und Kostenschätzung.',
    },
}

export default function ContactPage() {
    const { locale } = useLanguage()
    const copy = COPY[locale]
    return (
        <HomeShell>
            <section className={s.intro}>
                <div className={h.container}>
                    <h1 className={s.title}>{copy.title}</h1>
                    <p className={s.lead}>
                        <Sentences text={copy.intro} />
                    </p>
                </div>
            </section>
            <section className={s.body}>
                <div className={h.container}>
                    <Inquiry />
                </div>
            </section>
        </HomeShell>
    )
}
