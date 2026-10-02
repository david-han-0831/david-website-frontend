'use client'

import Link from 'next/link'
import h from './home.module.css'
import s from './Teaching.module.css'
import { useLanguage } from '@/contexts/LanguageContext'
import { trackButtonClick } from '@/lib/utils/gtm'
import type { Locale } from '@/translations'
import { useContactScroll, KIND_LECTURE } from './useContactScroll'

// 강의를 요청하려는 방문자를 위한 구역 (문구는 확정되면 translations 로 옮긴다).
// 이력은 외부 공유용 강의 경력서(노션, 2026-08 기준)와 강의 준비 기록에 있는 내용만 쓴다
type Copy = {
    title: string[]
    text: string
    ask: string
    history: string
    schools: string[]
    offersLabel: string
    offers: { who: string; what: string }[]
    recordLabel: string
    record: { year: string; name: string; note: string }[]
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
        recordLabel: '최근 강의',
        record: [
            { year: '2026.09', name: '동아대학교 STEP-UP 프로그램', note: '외국인 유학생 대상 생성형 AI 취업 준비, 8시간' },
            { year: '2026.08', name: '구미대학교 G-AI Training', note: '외국인 유학생 40명, 한국어와 영어 두 반, 8시간' },
            { year: '2026.08', name: '서울과학기술대학교 파이썬 비교과 특강', note: 'ITM 전공 13명, 40시간. 2년 연속' },
            { year: '2026.08', name: '대구테크노파크 데이터 라벨링 실무 교육', note: '의료 데이터 실습, 15시간. 2년 연속' },
            { year: '2025', name: '동남권, 충청권 ICT 취·창업 역량강화교육', note: 'ChatGPT 활용과 포트폴리오 특강 4회' },
            { year: '2025.06', name: '서울도시가스 GPT 업무 자동화 특강', note: '본사 재직자 대상' },
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
        recordLabel: 'Recent teaching',
        record: [
            { year: '2026.09', name: 'Dong-A University STEP-UP program', note: 'Job preparation with generative AI for international students, 8 hours' },
            { year: '2026.08', name: 'Gumi University G-AI Training', note: '40 international students in Korean and English tracks, 8 hours' },
            { year: '2026.08', name: 'SeoulTech Python course', note: '13 ITM majors, 40 hours. Second year running' },
            { year: '2026.08', name: 'Daegu Technopark data labeling training', note: 'Medical data practice, 15 hours. Second year running' },
            { year: '2025', name: 'Regional ICT career programs (southeast, central)', note: 'Four sessions on ChatGPT and portfolios' },
            { year: '2025.06', name: 'Seoul City Gas GPT automation session', note: 'For head-office staff' },
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
        recordLabel: 'Letzte Lehrtätigkeit',
        record: [
            { year: '2026.09', name: 'Dong-A University, STEP-UP-Programm', note: 'Bewerbungsvorbereitung mit generativer KI für internationale Studierende, 8 Stunden' },
            { year: '2026.08', name: 'Gumi University, G-AI Training', note: '40 internationale Studierende, koreanische und englische Gruppe, 8 Stunden' },
            { year: '2026.08', name: 'SeoulTech, Python-Kurs', note: '13 ITM-Studierende, 40 Stunden. Zweites Jahr in Folge' },
            { year: '2026.08', name: 'Daegu Technopark, Datenannotation', note: 'Praxis mit medizinischen Daten, 15 Stunden. Zweites Jahr in Folge' },
            { year: '2025', name: 'Regionale ICT-Karriereprogramme (Südost, Zentral)', note: 'Vier Vorträge zu ChatGPT und Portfolio' },
            { year: '2025.06', name: 'Seoul City Gas, GPT-Automatisierung', note: 'Für Mitarbeitende der Zentrale' },
        ],
        format: 'Online, vor Ort oder gemischt.',
    },
}

export default function Teaching() {
    const { locale } = useLanguage()
    const copy = COPY[locale]
    const toContact = useContactScroll()
    // 연도를 크게 세우고 그 해의 강의를 묶는다
    const years = [...new Set(copy.record.map((item) => item.year.slice(0, 4)))]
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
                        <p className={s.text}>{copy.text}</p>
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
                        {years.map((year) => (
                            <div key={year} className={s.year}>
                                <h3 className={s.yearNum}>{year}</h3>
                                <ul className={s.items}>
                                    {copy.record
                                        .filter((item) => item.year.startsWith(year))
                                        .map((item) => (
                                            <li key={item.name} className={s.item}>
                                                <strong>{item.name}</strong>
                                                <span>{item.note}</span>
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
