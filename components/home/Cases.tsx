'use client'

import Image from 'next/image'
import Link from 'next/link'
import h from './home.module.css'
import s from './Cases.module.css'
import { PROJECTS } from '@/data/projects'
import { useLanguage } from '@/contexts/LanguageContext'
import { trackCardClick } from '@/lib/utils/gtm'
import type { Locale } from '@/translations'

// 사례 3건을 "문제 → 만든 것" 으로 보여준다 (문구는 확정되면 translations 로 옮긴다)
const CASES = [
    { id: 39, image: 'inspect' },
    { id: 42, image: 'daycare' },
    { id: 47, image: 'customs' },
] as const

type CaseCopy = { title: string; problem: string; built: string; scope: string }

const COPY: Record<
    Locale,
    { title: string; problem: string; built: string; scope: string; more: string; all: string; cases: CaseCopy[] }
> = {
    ko: {
        title: '이런 문제를 이렇게 풀었습니다',
        problem: '문제',
        built: '만든 것',
        scope: '범위',
        more: '자세히 보기',
        all: '전체 {count}개 프로젝트 보기',
        cases: [
            {
                title: '녹음하면 조사표가 채워지는 현장 앱',
                problem: '현장실사는 면담 내용을 손으로 조사표에 옮기느라 시간이 오래 걸리고 누락이 잦았습니다.',
                built: '실사요원이 앱으로 녹음하면 AI가 조사표를 채우고, 매니저가 웹 콘솔에서 검수합니다. Android 앱은 현장에서 쓰이고 있습니다.',
                scope: 'Android, iOS, 태블릿 앱, 웹 콘솔, 서버',
            },
            {
                title: '반려견 유치원을 위한 운영 서비스',
                problem: '등원 관리와 알림장, 보호자 연락을 메신저와 수기로 처리하고 있었습니다.',
                built: '원장은 웹과 앱으로 등원, 알림장, 픽업, 매출을 관리하고 보호자는 앱으로 반려견의 하루를 받아 봅니다.',
                scope: '원장용 웹과 iOS 앱, 보호자용 iOS 앱, 서버',
            },
            {
                title: '수입 서류를 읽어 엑셀로 바꾸는 서비스',
                problem: '거래처마다 양식이 다른 송장과 포장명세서를 사람이 직접 옮겨 적고 있었습니다.',
                built: 'AI가 서류를 읽고 규칙으로 검증한 뒤 관세청 대량등록 엑셀로 바꿔 줍니다.',
                scope: '웹 서비스, 문서 인식 서버',
            },
        ],
    },
    en: {
        title: 'Problems I have solved',
        problem: 'Problem',
        built: 'What I built',
        scope: 'Scope',
        more: 'Read more',
        all: 'See all {count} projects',
        cases: [
            {
                title: 'A field app that fills the survey form from a recording',
                problem: 'Field inspectors copied interview notes into survey forms by hand. It was slow and things got missed.',
                built: 'Inspectors record in the app, AI fills the form, and managers review it in a web console. The Android app is in use on site.',
                scope: 'Android, iOS and tablet apps, web console, backend',
            },
            {
                title: 'An operations service for dog daycares',
                problem: 'Attendance, daily notes and messages to owners were handled with chat apps and paper.',
                built: 'Directors manage attendance, notes, pickups and revenue on web and app. Owners follow their dog’s day in their own app.',
                scope: 'Director web and iOS app, owner iOS app, backend',
            },
            {
                title: 'A service that turns import documents into spreadsheets',
                problem: 'Invoices and packing lists came in a different layout from every supplier and were retyped by hand.',
                built: 'AI reads the documents, rules validate the values, and the result exports as a customs bulk-upload spreadsheet.',
                scope: 'Web service, document recognition server',
            },
        ],
    },
    de: {
        title: 'Probleme, die ich gelöst habe',
        problem: 'Problem',
        built: 'Lösung',
        scope: 'Umfang',
        more: 'Mehr lesen',
        all: 'Alle {count} Projekte ansehen',
        cases: [
            {
                title: 'Eine App, die Prüfbögen aus Aufnahmen ausfüllt',
                problem: 'Prüfer übertrugen Gesprächsnotizen von Hand in Prüfbögen. Das dauerte lange und führte zu Lücken.',
                built: 'Prüfer nehmen in der App auf, KI füllt den Bogen aus, Manager prüfen in der Web-Konsole. Die Android-App ist im Einsatz.',
                scope: 'Android-, iOS- und Tablet-Apps, Web-Konsole, Backend',
            },
            {
                title: 'Ein Betriebsservice für Hundetagesstätten',
                problem: 'Anwesenheit, Tagesberichte und Nachrichten an Halter liefen über Messenger und Papier.',
                built: 'Leitungen verwalten Anwesenheit, Berichte, Abholung und Umsatz per Web und App. Halter sehen den Tag ihres Hundes in ihrer App.',
                scope: 'Web und iOS-App für Leitungen, iOS-App für Halter, Backend',
            },
            {
                title: 'Ein Service, der Importdokumente in Tabellen umwandelt',
                problem: 'Rechnungen und Packlisten kamen von jedem Lieferanten anders und wurden von Hand abgetippt.',
                built: 'KI liest die Dokumente, Regeln prüfen die Werte, das Ergebnis wird als Zoll-Tabelle exportiert.',
                scope: 'Web-Service, Server für Dokumentenerkennung',
            },
        ],
    },
}

export default function Cases() {
    const { locale } = useLanguage()
    const copy = COPY[locale]
    return (
        <section className={h.section} id="work">
            <div className={h.container}>
                <h2 className={h.h2}>{copy.title}</h2>
                <div className={s.cases}>
                    {CASES.map(({ id, image }, i) => {
                        const item = copy.cases[i]
                        return (
                            <article key={id} className={s.case}>
                                <div className={s.scene}>
                                    <Image
                                        src={`/media/cases/${image}.webp`}
                                        alt=""
                                        width={1120}
                                        height={907}
                                        sizes="(min-width: 900px) 46vw, 100vw"
                                    />
                                </div>
                                <div className={s.body}>
                                    <h3 className={s.title}>{item.title}</h3>
                                    <dl className={s.facts}>
                                        <dt>{copy.problem}</dt>
                                        <dd>{item.problem}</dd>
                                        <dt>{copy.built}</dt>
                                        <dd>{item.built}</dd>
                                        <dt>{copy.scope}</dt>
                                        <dd>{item.scope}</dd>
                                    </dl>
                                    <Link
                                        href={`/projects/${id}`}
                                        className={h.link}
                                        onClick={() => trackCardClick(`home_case_${id}`, `/projects/${id}`, locale)}
                                    >
                                        {copy.more}
                                    </Link>
                                </div>
                            </article>
                        )
                    })}
                </div>
                <Link href="/projects" className={`${h.link} ${s.all}`}>
                    {copy.all.replace('{count}', String(PROJECTS.length))}
                </Link>
            </div>
        </section>
    )
}
