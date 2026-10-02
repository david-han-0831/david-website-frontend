'use client'

import Link from 'next/link'
import h from './home.module.css'
import s from './Teaching.module.css'
import { useLanguage } from '@/contexts/LanguageContext'
import { trackButtonClick } from '@/lib/utils/gtm'
import type { Locale } from '@/translations'
import Sentences from './Sentences'
import { TEACHING_RECORD } from '@/data/teaching'
import { useContactScroll, KIND_LECTURE } from './useContactScroll'

// 강의를 요청하려는 방문자를 위한 구역 (문구는 확정되면 translations 로 옮긴다).
// 강의 이력은 data/teaching.ts 에 있고 강의 페이지와 같이 쓴다
type Copy = {
    title: string[]
    text: string
    ask: string
    history: string
    schools: string[]
    offersLabel: string
    offers: { who: string; what: string }[]
    format: string
}

const COPY: Record<Locale, Copy> = {
    ko: {
        title: ['지금 만들고 있는', '사람이 가르칩니다'],
        text: '2023년부터 대학과 공공 교육사업, 기업에서 가르쳤습니다. 서울과학기술대학교와 대구테크노파크는 다음 해에 같은 과정을 다시 맡겨 주셨습니다.',
        ask: '강의 문의하기',
        history: '강의 이력 전체 보기',
        schools: ['서울과학기술대학교', '구미대학교', '동아대학교'],
        offersLabel: '이런 강의를 합니다',
        offers: [
            { who: '대학', what: '파이썬 프로그래밍, 생성형 AI를 활용한 취업 준비' },
            { who: '공공 교육사업', what: '데이터 라벨링 실무, ChatGPT 활용, 포트폴리오와 기획서' },
            { who: '기업', what: 'GPT 업무 자동화 특강' },
            { who: '개인', what: '1:1 맞춤 수업과 프로젝트 코칭' },
        ],
        format: '온라인, 오프라인 출강, 둘을 섞은 방식 모두 가능합니다.',
    },
    en: {
        title: ['Taught by someone', 'who is still building'],
        text: 'Since 2023 I have taught at universities, public training programs and companies. SeoulTech and Daegu Technopark both asked me back for the same course the following year.',
        ask: 'Ask about a course',
        history: 'See full teaching history',
        schools: ['SeoulTech', 'Gumi University', 'Dong-A University'],
        offersLabel: 'What I teach',
        offers: [
            { who: 'Universities', what: 'Python programming, job preparation with generative AI' },
            { who: 'Public training programs', what: 'Data labeling practice, ChatGPT at work, portfolios and proposals' },
            { who: 'Companies', what: 'GPT work-automation sessions' },
            { who: 'Individuals', what: 'One-to-one lessons and project coaching' },
        ],
        format: 'Online, on site, or a mix of both.',
    },
    de: {
        title: ['Unterricht von jemandem,', 'der selbst noch entwickelt'],
        text: 'Seit 2023 unterrichte ich an Hochschulen, in öffentlichen Bildungsprogrammen und Unternehmen. SeoulTech und Daegu Technopark haben mich im Folgejahr erneut für denselben Kurs beauftragt.',
        ask: 'Kurs anfragen',
        history: 'Gesamte Lehrtätigkeit ansehen',
        schools: ['SeoulTech', 'Gumi University', 'Dong-A University'],
        offersLabel: 'Was ich unterrichte',
        offers: [
            { who: 'Hochschulen', what: 'Python-Programmierung, Bewerbungsvorbereitung mit generativer KI' },
            { who: 'Öffentliche Programme', what: 'Datenannotation in der Praxis, ChatGPT im Beruf, Portfolio und Konzept' },
            { who: 'Unternehmen', what: 'GPT-Schulungen zur Arbeitsautomatisierung' },
            { who: 'Einzelpersonen', what: 'Einzelunterricht und Projekt-Coaching' },
        ],
        format: 'Online, vor Ort oder gemischt.',
    },
}

export default function Teaching() {
    const { locale } = useLanguage()
    const copy = COPY[locale]
    const toContact = useContactScroll()
    return (
        <section className={h.section}>
            <div className={h.container}>
                <div className={s.card}>
                    <div className={s.head}>
                        <h2 className={s.title}>
                            {copy.title.map((line) => (
                                <span key={line}>{line} </span>
                            ))}
                        </h2>
                        <p className={s.text}>
                            <Sentences text={copy.text} />
                        </p>
                        <ul className={s.schools}>
                            {copy.schools.map((school) => (
                                <li key={school}>{school}</li>
                            ))}
                        </ul>
                        <div className={s.actions}>
                            <Link
                                href="/contact"
                                className={h.button}
                                onClick={(e) => {
                                    // 내려가면서 "강의 요청"을 미리 골라 둔다
                                    toContact(e, KIND_LECTURE)
                                    trackButtonClick('contact_teaching', 'cta', '/contact', locale)
                                }}
                            >
                                {copy.ask}
                            </Link>
                            <Link href="/teaching" className={h.link}>
                                {copy.history}
                            </Link>
                        </div>
                    </div>

                    <div className={s.detail}>
                        {TEACHING_RECORD[locale].map((group) => (
                            <div key={group.year} className={s.year}>
                                <h3 className={s.yearNum}>{group.year}</h3>
                                <ul className={s.items}>
                                    {group.items.map((item) => (
                                        <li key={item.name} className={s.item}>
                                            <span className={s.when}>{item.when}</span>
                                            <div>
                                                <strong>{item.name}</strong>
                                                <span className={s.note}>{item.note}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        <h3 className={s.label}>{copy.offersLabel}</h3>
                        <dl className={s.rows}>
                            {copy.offers.map((offer) => (
                                <div key={offer.who} className={s.row}>
                                    <dt>{offer.who}</dt>
                                    <dd>
                                        <span>{offer.what}</span>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                        <p className={s.format}>{copy.format}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
