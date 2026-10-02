'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import h from '@/components/home/home.module.css'
import s from './TeachingPage.module.css'
import HomeShell from '@/components/home/HomeShell'
import Sentences from '@/components/home/Sentences'
import { useLanguage } from '@/contexts/LanguageContext'
import { trackButtonClick } from '@/lib/utils/gtm'
import type { Locale } from '@/translations'
import { TEACHING_RECORD } from '@/data/teaching'

// 강의 페이지. 강의 이력은 data/teaching.ts 에 있고 홈의 강의 영역과 같이 쓴다
// (문구는 확정되면 translations 로 옮긴다)
type Copy = {
    title: string[]
    intro: string
    ask: string
    topicsTitle: string
    topics: { name: string; who: string; what: string }[]
    recordTitle: string
    howTitle: string
    how: { name: string; body: string }[]
    endTitle: string
    endText: string
}

const COPY: Record<Locale, Copy> = {
    ko: {
        title: ['지금 만들고 있는', '사람이 가르칩니다'],
        intro: '2023년부터 대학, 공공 교육사업, 기업에서 가르쳤습니다. 서울과학기술대학교와 대구테크노파크는 다음 해에 같은 과정을 다시 맡겨 주셨습니다. 기관 강의와 1:1 수업을 합쳐, 2024년 10월부터 기록한 수업만 250회가 넘습니다.',
        ask: '강의 문의하기',
        topicsTitle: '강의 주제',
        topics: [
            { name: '파이썬 프로그래밍', who: '대학생, 입문자', what: '기초 문법부터 데이터 수집과 분석, 팀 프로젝트 발표까지' },
            { name: '생성형 AI 실무 활용', who: '기업 재직자, 취업 준비생', what: 'ChatGPT와 Gemini로 보고서, 기획서, 업무 문서를 만드는 방법과 프롬프트 설계' },
            { name: 'AI를 활용한 취업 준비', who: '대학생, 외국인 유학생', what: '이력서와 자기소개서, 기업 분석, 모의 면접, 지원 이메일 작성' },
            { name: '데이터 라벨링 실무', who: '비전공자, 실무 입문자', what: '라벨링 도구 사용, 의료 이미지 실습, 품질 검수, 학습 데이터 형식' },
            { name: '웹 개발', who: '취업 준비생, 부트캠프 수강생', what: 'React, Next.js, FastAPI, Spring Boot로 만드는 풀스택 프로젝트' },
            { name: '포트폴리오와 기획서', who: '취업·창업 준비생', what: '프로젝트 정리, 기획서 구조, GitHub와 Notion 포트폴리오 구성' },
        ],
        recordTitle: '강의 이력',
        howTitle: '수업 방식',
        how: [
            { name: '실습이 먼저', body: '설명을 듣는 시간보다 직접 만드는 시간이 깁니다. 수업이 끝나면 각자 결과물이 남습니다.' },
            { name: '지금 쓰는 도구로', body: '현업에서 실제로 쓰는 도구와 방식으로 가르칩니다. 제가 만들고 운영하는 서비스의 사례를 그대로 씁니다.' },
            { name: '대상에 맞춰', body: '비전공자, 외국인 유학생, 재직자 등 대상에 따라 예제와 속도를 다시 짭니다.' },
            { name: '형태', body: '온라인 실시간, 오프라인 출강, 둘을 섞은 방식 모두 가능합니다.' },
        ],
        endTitle: '강의가 필요하다면',
        endText: '대상, 인원, 희망 일정을 알려 주세요. 맞는 커리큘럼을 정리해 답장드립니다.',
    },
    en: {
        title: ['Taught by someone', 'who is still building'],
        intro: 'Since 2023 I have taught at universities, public training programs and companies. SeoulTech and Daegu Technopark both asked me back for the same course the following year. Counting institutional courses and one-to-one lessons, I have logged more than 250 sessions since October 2024.',
        ask: 'Ask about a course',
        topicsTitle: 'What I teach',
        topics: [
            { name: 'Python programming', who: 'University students, beginners', what: 'From basic syntax to data collection, analysis and a team project presentation' },
            { name: 'Generative AI at work', who: 'Employees, job seekers', what: 'Reports, proposals and work documents with ChatGPT and Gemini, and prompt design' },
            { name: 'Job preparation with AI', who: 'University and international students', what: 'Résumés and cover letters, company research, mock interviews, application emails' },
            { name: 'Data labeling practice', who: 'Non-majors, newcomers to the field', what: 'Labeling tools, medical image practice, quality review, training data formats' },
            { name: 'Web development', who: 'Job seekers, bootcamp students', what: 'Full-stack projects with React and Next.js, FastAPI and Spring Boot' },
            { name: 'Portfolios and proposals', who: 'People preparing for jobs or startups', what: 'Organizing projects, proposal structure, portfolios on GitHub and Notion' },
        ],
        recordTitle: 'Teaching history',
        howTitle: 'How I teach',
        how: [
            { name: 'Practice first', body: 'More time is spent building than listening. Everyone leaves with something they made.' },
            { name: 'With today’s tools', body: 'I teach with the tools and methods used on the job, using cases from services I build and run.' },
            { name: 'Fitted to the audience', body: 'Examples and pace are rebuilt for non-majors, international students or employees.' },
            { name: 'Format', body: 'Live online, on site, or a mix of both.' },
        ],
        endTitle: 'If you need a course',
        endText: 'Tell me the audience, group size and preferred dates. I will reply with a fitting curriculum.',
    },
    de: {
        title: ['Unterricht von jemandem,', 'der selbst noch entwickelt'],
        intro: 'Seit 2023 unterrichte ich an Hochschulen, in öffentlichen Bildungsprogrammen und Unternehmen. SeoulTech und Daegu Technopark haben mich im Folgejahr erneut für denselben Kurs beauftragt. Kurse an Einrichtungen und Einzelunterricht zusammengezählt, habe ich seit Oktober 2024 mehr als 250 Termine dokumentiert.',
        ask: 'Kurs anfragen',
        topicsTitle: 'Themen',
        topics: [
            { name: 'Python-Programmierung', who: 'Studierende, Einsteiger', what: 'Von den Grundlagen bis zu Datenerfassung, Analyse und Teamprojekt' },
            { name: 'Generative KI im Beruf', who: 'Berufstätige, Bewerber', what: 'Berichte, Konzepte und Dokumente mit ChatGPT und Gemini, dazu Prompt-Design' },
            { name: 'Bewerbung mit KI', who: 'Studierende, internationale Studierende', what: 'Lebenslauf und Anschreiben, Firmenrecherche, Probeinterview, Bewerbungs-E-Mail' },
            { name: 'Datenannotation in der Praxis', who: 'Fachfremde, Einsteiger', what: 'Annotationswerkzeuge, medizinische Bilder, Qualitätsprüfung, Datenformate' },
            { name: 'Webentwicklung', who: 'Bewerber, Bootcamp-Teilnehmende', what: 'Full-Stack-Projekte mit React und Next.js, FastAPI und Spring Boot' },
            { name: 'Portfolio und Konzept', who: 'Bewerber und Gründer', what: 'Projekte aufbereiten, Konzeptstruktur, Portfolio auf GitHub und Notion' },
        ],
        recordTitle: 'Lehrtätigkeit',
        howTitle: 'So unterrichte ich',
        how: [
            { name: 'Praxis zuerst', body: 'Es wird mehr gebaut als zugehört. Am Ende hat jede Person ein eigenes Ergebnis.' },
            { name: 'Mit heutigen Werkzeugen', body: 'Ich unterrichte mit den Werkzeugen aus der Praxis und mit Fällen aus Diensten, die ich selbst baue und betreibe.' },
            { name: 'Passend zur Gruppe', body: 'Beispiele und Tempo werden für Fachfremde, internationale Studierende oder Berufstätige neu aufgebaut.' },
            { name: 'Format', body: 'Live online, vor Ort oder gemischt.' },
        ],
        endTitle: 'Wenn Sie einen Kurs brauchen',
        endText: 'Nennen Sie mir Zielgruppe, Gruppengröße und Wunschtermine. Ich antworte mit einem passenden Lehrplan.',
    },
}

// 글을 덩어리로 묶어 줄이 덩어리 사이에서 먼저 바뀌게 한다.
// 문장으로 된 글은 마침표 뒤에서, 쉼표로 늘어놓은 글은 쉼표 뒤에서 나눈다
const chunks = (text: string, after: '.' | ',') =>
    text.split(after === '.' ? /(?<=\.) / : /(?<=,) /).map((part) => (
        // 띄어쓰기는 덩어리 밖에 둔다 (안에 두면 줄 끝 공백으로 사라진다)
        <Fragment key={part}>
            <span className={s.chunk}>{part}</span>{' '}
        </Fragment>
    ))

export default function TeachingPage() {
    const { locale } = useLanguage()
    const copy = COPY[locale]
    const ask = (place: string) => (
        <Link
            href="/contact"
            className={h.button}
            onClick={() => trackButtonClick(`contact_teaching_${place}`, 'cta', '/contact', locale)}
        >
            {copy.ask}
        </Link>
    )

    return (
        <HomeShell>
            <section className={s.intro}>
                <div className={h.container}>
                    <h1 className={s.title}>
                        {copy.title.map((line) => (
                            <span key={line}>{line} </span>
                        ))}
                    </h1>
                    <p className={s.lead}>
                        <Sentences text={copy.intro} countUp={250} />
                    </p>
                    <div className={s.introAction}>{ask('top')}</div>
                </div>
            </section>

            <section className={h.section}>
                <div className={`${h.container} ${s.split}`}>
                    <h2 className={`${h.h2} ${s.sticky}`}>{copy.recordTitle}</h2>
                    <div>
                        {TEACHING_RECORD[locale].map((group) => (
                            <div key={group.year} className={s.year}>
                                <h3 className={s.yearNum}>{group.year}</h3>
                                <ul className={s.items}>
                                    {group.items.map((item) => (
                                        <li key={item.name} className={s.item}>
                                            <span className={s.when}>{item.when}</span>
                                            <div>
                                                <strong>{item.name}</strong>
                                                <p className={s.note}>{chunks(item.note, '.')}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={h.section}>
                <div className={h.container}>
                    <h2 className={h.h2}>{copy.topicsTitle}</h2>
                    <ul className={s.topics}>
                        {copy.topics.map((topic) => (
                            <li key={topic.name} className={s.topic}>
                                <h3>{topic.name}</h3>
                                <p className={s.who}>{topic.who}</p>
                                <p>{chunks(topic.what, ',')}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className={h.section}>
                <div className={`${h.container} ${s.split}`}>
                    <h2 className={h.h2}>{copy.howTitle}</h2>
                    <dl className={s.rows}>
                        {copy.how.map((item) => (
                            <div key={item.name} className={s.row}>
                                <dt>{item.name}</dt>
                                <dd>{chunks(item.body, '.')}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            <section className={s.end}>
                <div className={h.container}>
                    <h2 className={s.endTitle}>{copy.endTitle}</h2>
                    <p className={s.endText}>{chunks(copy.endText, '.')}</p>
                    {ask('bottom')}
                </div>
            </section>
        </HomeShell>
    )
}
