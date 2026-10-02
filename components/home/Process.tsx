'use client'

import { useRef } from 'react'
import h from './home.module.css'
import s from './Process.module.css'
import { useLanguage } from '@/contexts/LanguageContext'
import { gsap, useGSAP, MQ } from '@/lib/motion'
import type { Locale } from '@/translations'

// 단계마다 고객이 받는 것 (문구는 확정되면 translations 로 옮긴다). 순서는 process.steps 와 같다
const GETS: Record<Locale, { label: string; items: string[][] }> = {
    ko: {
        label: '이 단계에서 받는 것',
        items: [
            ['필요한 화면과 기능 목록', '범위와 일정', '예상 비용'],
            ['화면 흐름도', '데이터 구조', '화면 시안 (AI 도구 또는 디자이너 협업)'],
            ['매주 실제로 동작하는 화면', '진행 상황 공유', '수정 요청 반영'],
            ['배포된 서비스', '운영 문서와 계정 권한', '유지보수는 별도 계약으로'],
        ],
    },
    en: {
        label: 'What you get at this step',
        items: [
            ['A list of screens and features', 'Scope and schedule', 'Estimated cost'],
            ['Screen flow', 'Data structure', 'Screen designs (AI tools or a designer)'],
            ['Working screens every week', 'Progress updates', 'Your change requests applied'],
            ['The deployed service', 'Operating documents and account access', 'Maintenance under a separate contract'],
        ],
    },
    de: {
        label: 'Was Sie in diesem Schritt erhalten',
        items: [
            ['Liste der Screens und Funktionen', 'Umfang und Zeitplan', 'Geschätzte Kosten'],
            ['Screen-Flow', 'Datenstruktur', 'Screen-Entwürfe (KI-Tools oder Designer)'],
            ['Jede Woche funktionierende Screens', 'Stand der Arbeit', 'Umsetzung Ihrer Änderungswünsche'],
            ['Der veröffentlichte Service', 'Betriebsdokumente und Zugänge', 'Wartung über separaten Vertrag'],
        ],
    },
}

// 실제로 순서가 있는 내용이라 번호를 쓴다.
// 단계마다 큰 카드가 화면 위에 붙어 멈추고, 다음 카드가 그 위로 올라와 쌓인다 (붙는 것은 CSS sticky)
export default function Process() {
    const { t, locale } = useLanguage()
    const { process } = t.home
    const gets = GETS[locale]
    const root = useRef<HTMLElement>(null)

    // 다음 카드가 올라오는 동안 아래 깔리는 카드를 살짝 줄여 깊이를 만든다
    useGSAP(
        () => {
            const mm = gsap.matchMedia()
            mm.add(MQ.motion, () => {
                const cards = gsap.utils.toArray<HTMLElement>('[data-card]')
                cards.slice(0, -1).forEach((card, i) => {
                    gsap.to(card.firstElementChild, {
                        scale: 0.93,
                        ease: 'none',
                        scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top 20%', scrub: true },
                    })
                })
            })
            return () => mm.revert()
        },
        { scope: root, dependencies: [locale], revertOnUpdate: true }
    )

    return (
        <section ref={root} className={h.section}>
            <div className={h.container}>
                <h2 className={h.h2}>{process.title}</h2>
                <ol className={s.stack}>
                    {process.steps.map((step, i) => (
                        <li key={step.title} className={s.slot} data-card style={{ '--i': i } as React.CSSProperties}>
                            <div className={s.card} data-tone={i}>
                                <span className={s.num}>{i + 1}</span>
                                <div className={s.body}>
                                    <div>
                                        <h3 className={s.title}>{step.title}</h3>
                                        <p className={s.desc}>{step.desc}</p>
                                    </div>
                                    <div className={s.gets}>
                                        <p className={s.getsLabel}>{gets.label}</p>
                                        <ul>
                                            {gets.items[i]?.map((item) => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    )
}
