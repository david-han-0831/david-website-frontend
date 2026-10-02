'use client'

import Link from 'next/link'
import h from './home.module.css'
import s from './Services.module.css'
import { useLanguage } from '@/contexts/LanguageContext'
import { trackCardClick } from '@/lib/utils/gtm'
import type { Locale } from '@/translations'
import { useContactScroll } from './useContactScroll'

// 분야마다 실제로 만든 것 세 건을 붙인다. 순서는 translations 의 services.items 와 같다
const EXAMPLES = [
    { ids: [49, 51, 43] },
    { ids: [41, 42, 44] },
    { ids: [39, 47, 52] },
    { ids: [53, 55, 56] },
] as const

// 문구는 확정되면 translations 로 옮긴다
const COPY: Record<Locale, { built: string; other: string; ask: string; names: Record<number, string> }> = {
    ko: {
        built: '만든 것',
        other: '여기 없는 일도 일단 물어보세요.',
        ask: '문의하기',
        names: {
            49: '키워드 분석 서비스',
            51: '미용실 예약 플랫폼',
            43: '브랜드사 운영 서비스',
            41: '부부 캘린더 앱',
            42: '반려견 유치원 앱',
            44: 'K-POP 여행 플래너 앱',
            39: '녹음으로 채우는 조사표',
            47: '수입 서류 변환',
            52: '음성 배구 경기 기록',
            53: '점자 영화 기기 연동',
            55: '제설 로봇 관제',
            56: '수거 로버 운행 기록',
        },
    },
    en: {
        built: 'Built',
        other: 'Not on this list? Ask anyway.',
        ask: 'Get in touch',
        names: {
            49: 'Keyword analysis service',
            51: 'Salon booking platform',
            43: 'Brand operations service',
            41: 'Shared calendar app for couples',
            42: 'Dog daycare app',
            44: 'K-POP trip planner app',
            39: 'Survey forms filled from recordings',
            47: 'Import document conversion',
            52: 'Voice-driven volleyball stats',
            53: 'Braille device for films',
            55: 'Snow-clearing robot console',
            56: 'Rover run log',
        },
    },
    de: {
        built: 'Gebaut',
        other: 'Nicht dabei? Fragen Sie trotzdem.',
        ask: 'Kontakt aufnehmen',
        names: {
            49: 'Keyword-Analyse-Service',
            51: 'Buchungsplattform für Friseursalons',
            43: 'Betriebsservice für Marken',
            41: 'Kalender-App für Paare',
            42: 'App für Hundetagesstätten',
            44: 'K-POP-Reiseplaner-App',
            39: 'Prüfbögen aus Aufnahmen',
            47: 'Umwandlung von Importdokumenten',
            52: 'Volleyball-Statistik per Sprache',
            53: 'Braille-Gerät für Filme',
            55: 'Konsole für Schneeräumroboter',
            56: 'Fahrtenprotokoll für Rover',
        },
    },
}

export default function Services() {
    const { t, locale } = useLanguage()
    const { services } = t.home
    const copy = COPY[locale]
    const toContact = useContactScroll()

    return (
        <section className={h.section}>
            <div className={h.container}>
                <h2 className={h.h2}>{services.title}</h2>
                <dl className={s.list}>
                    {services.items.map((item, i) => (
                        <div key={item.title} className={s.row}>
                            <dt className={s.title}>{item.title}</dt>
                            <dd className={s.desc}>
                                {item.desc}
                                <span className={s.stack}>{item.stack}</span>
                                <span className={s.built}>
                                    <span className={s.builtLabel}>{copy.built}</span>
                                    {EXAMPLES[i]?.ids.map((id) => (
                                        <Link
                                            key={id}
                                            href={`/projects/${id}`}
                                            className={s.example}
                                            onClick={() =>
                                                trackCardClick(`home_service_${id}`, `/projects/${id}`, locale)
                                            }
                                        >
                                            {copy.names[id]}
                                        </Link>
                                    ))}
                                </span>
                            </dd>
                        </div>
                    ))}
                </dl>
                <p className={s.other}>
                    {copy.other}{' '}
                    <Link href="/contact" className={h.link} onClick={(e) => toContact(e)}>
                        {copy.ask}
                    </Link>
                </p>
            </div>
        </section>
    )
}
