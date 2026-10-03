'use client'

import { useRef } from 'react'
import Link from 'next/link'
import h from '@/components/home/home.module.css'
import s from './About.module.css'
import HomeShell from '@/components/home/HomeShell'
import Sentences from '@/components/home/Sentences'
import { useLanguage } from '@/contexts/LanguageContext'
import { trackButtonClick } from '@/lib/utils/gtm'
import type { Locale } from '@/translations'
import { gsap, useGSAP, MQ, ScrollTrigger } from '@/lib/motion'

// 소개 페이지. 내용은 본인 이력 문서(노션)와 본인이 직접 말한 것만 쓴다.
// 음악 이력은 개발 소개와 동떨어져 보여 본인 요청으로 뺐다 (2026-10-02)
// (문구는 확정되면 translations 로 옮긴다)
type Copy = {
    title: string[]
    intro: string
    pathTitle: string
    path: { year: string; head: string; body: string }[]
    nowTitle: string
    now: { name: string; body: string; link?: { label: string; href: string } }[]
    recordTitle: string
    record: { label: string; items: string[] }[]
    endTitle: string
    endText: string
    endCta: string
}

const COPY: Record<Locale, Copy> = {
    ko: {
        title: ['직접 만들고, 운영하고,', '가르칩니다'],
        intro: '안녕하세요, 한동윤입니다. 2015년 프리랜서 외주 개발로 시작해, 지금은 ㈜콜론비 대표로 웹, 앱, AI 제품을 만듭니다. 직접 만든 서비스를 운영하고, 대학과 기업에서 가르칩니다.',
        pathTitle: '걸어온 길',
        path: [
            { year: '2015', head: '첫 외주', body: '제 사업에 쓸 사이트와 자동화 프로그램을 직접 만들었습니다. 그걸 본 다른 회사들의 사이트와 프로그램을 만들어 주면서 프리랜서 개발을 시작했습니다.' },
            { year: '2021', head: '스타트업 개발자', body: '스타트업에 개발자로 취직해 병원 CRM과 데이터 수집 프로그램을 만들었습니다. 외주로 하던 개발이 이때부터 본업이 됐습니다.' },
            { year: '2022', head: '㈜콜론비 창업', body: '이듬해 문화예술인을 위한 플랫폼을 만들었고, AI 챗봇 솔루션으로 특허를 출원했습니다. 2024년 서울 청년창업사관학교에 선정됐습니다.' },
            { year: '2023', head: '개발을 가르치기 시작', body: '1:1 수업으로 시작해 지금은 대학과 기업에서 강의합니다. 같은 해 구글 텐서플로 개발자 자격을 땄습니다.' },
            { year: '2024', head: '연세대학교 공학대학원 입학', body: '인공지능 전공 석사 과정을 다니고 있습니다.' },
            { year: '2026', head: '직접 만든 서비스를 운영', body: '현장실사 앱 Prism과 딜러용 CRM 핀세일즈를 운영합니다. 서울과기대, 구미대, 동아대에서 강의했습니다.' },
        ],
        nowTitle: '지금 하는 일',
        now: [
            { name: '외주 개발', body: '웹, 앱, AI 제품을 기획부터 출시까지 만듭니다.', link: { label: '프로젝트 보기', href: '/projects' } },
            { name: '서비스 운영', body: '직접 만든 Prism과 핀세일즈를 고객과 함께 운영합니다.' },
            { name: '강의', body: '대학, 공공 교육사업, 기업에서 파이썬과 생성형 AI를 가르칩니다.', link: { label: '강의 보기', href: '/teaching' } },
        ],
        recordTitle: '학력과 자격',
        record: [
            { label: '학력', items: ['연세대학교 공학대학원 인공지능 전공 (석사 재학)'] },
            { label: '자격', items: ['TensorFlow Developer Certificate (Google, 2023)', 'Goethe-Zertifikat B2 (독일어)'] },
            { label: '특허', items: ['맞춤형 AI 챗봇 배포를 위한 B2B 채팅 솔루션 (2023년 출원)', '건조 김 등급 결정 장치 (2025년 출원, 공동 발명)'] },
        ],
        endTitle: '함께 만들 것이 있다면',
        endText: '만들고 싶은 것이나 강의 주제를 알려 주세요. 범위와 일정을 정리해 답장드립니다.',
        endCta: '문의하기',
    },
    en: {
        title: ['I build, I operate,', 'and I teach'],
        intro: 'Hello, I am David Han. I started with freelance client work in 2015, and today I build web, app and AI products as CEO of ColonB Inc. I run services I built myself and teach at universities and companies.',
        pathTitle: 'The path so far',
        path: [
            { year: '2015', head: 'The first client work', body: 'I built a website and automation tools for my own business. Other companies saw them and asked for their own, and freelance development began.' },
            { year: '2021', head: 'Startup developer', body: 'I joined a startup as a developer and built a hospital CRM and data collection tools. Development, until then client work on the side, became my main job.' },
            { year: '2022', head: 'Founded ColonB Inc.', body: 'The next year I built a platform for artists and filed a patent for an AI chatbot solution. In 2024 the company was selected for the Seoul Youth Startup Academy.' },
            { year: '2023', head: 'Started teaching development', body: 'It began with one-to-one lessons and now includes universities and companies. I earned the Google TensorFlow Developer Certificate the same year.' },
            { year: '2024', head: 'Entered Yonsei Graduate School of Engineering', body: 'I am in the master’s program in artificial intelligence.' },
            { year: '2026', head: 'Running services I built', body: 'I operate Prism, a field inspection app, and PinSales, a CRM for car dealers. I taught at SeoulTech, Gumi University and Dong-A University.' },
        ],
        nowTitle: 'What I do now',
        now: [
            { name: 'Client development', body: 'Web, app and AI products from planning to launch.', link: { label: 'See projects', href: '/projects' } },
            { name: 'Running services', body: 'I operate Prism and PinSales, which I built, together with their customers.' },
            { name: 'Teaching', body: 'Python and generative AI at universities, public programs and companies.', link: { label: 'See teaching', href: '/teaching' } },
        ],
        recordTitle: 'Education and credentials',
        record: [
            { label: 'Education', items: ['Yonsei University Graduate School of Engineering, Artificial Intelligence (M.S. in progress)'] },
            { label: 'Certificates', items: ['TensorFlow Developer Certificate (Google, 2023)', 'Goethe-Zertifikat B2 (German)'] },
            { label: 'Patents', items: ['B2B chat solution for deploying custom AI chatbots (filed 2023)', 'Grading device for dried laver (filed 2025, co-inventor)'] },
        ],
        endTitle: 'If there is something to build together',
        endText: 'Tell me what you want to make or what you want taught. I will reply with scope and schedule.',
        endCta: 'Get in touch',
    },
    de: {
        title: ['Ich baue, betreibe', 'und unterrichte'],
        intro: 'Guten Tag, ich bin David Han. 2015 begann ich mit freiberuflicher Auftragsentwicklung, heute baue ich als Geschäftsführer der ColonB Inc. Web-, App- und KI-Produkte. Ich betreibe selbst gebaute Dienste und unterrichte an Hochschulen und in Unternehmen.',
        pathTitle: 'Der bisherige Weg',
        path: [
            { year: '2015', head: 'Die ersten Aufträge', body: 'Für mein eigenes Geschäft baute ich Website und Automatisierung selbst. Andere Firmen wollten dasselbe, so begann die freiberufliche Entwicklung.' },
            { year: '2021', head: 'Entwickler im Start-up', body: 'Als angestellter Entwickler in einem Start-up baute ich ein Klinik-CRM und Datenerfassung. Aus Nebenprojekten wurde der Hauptberuf.' },
            { year: '2022', head: 'Gründung der ColonB Inc.', body: 'Im Folgejahr entstand eine Plattform für Kunstschaffende, dazu eine Patentanmeldung für eine KI-Chatbot-Lösung. 2024 Aufnahme in die Seoul Youth Startup Academy.' },
            { year: '2023', head: 'Beginn der Lehrtätigkeit', body: 'Aus Einzelunterricht wurden Kurse an Hochschulen und in Unternehmen. Im selben Jahr das Google TensorFlow Developer Certificate.' },
            { year: '2024', head: 'Yonsei Graduate School of Engineering', body: 'Masterstudium im Fach Künstliche Intelligenz.' },
            { year: '2026', head: 'Eigene Dienste im Betrieb', body: 'Ich betreibe Prism, eine App für Vor-Ort-Prüfungen, und PinSales, ein CRM für Autohändler. Lehre an SeoulTech, Gumi University und Dong-A University.' },
        ],
        nowTitle: 'Was ich heute mache',
        now: [
            { name: 'Auftragsentwicklung', body: 'Web-, App- und KI-Produkte von der Planung bis zum Launch.', link: { label: 'Projekte ansehen', href: '/projects' } },
            { name: 'Eigene Dienste', body: 'Ich betreibe Prism und PinSales gemeinsam mit ihren Kunden.' },
            { name: 'Lehre', body: 'Python und generative KI an Hochschulen, in öffentlichen Programmen und Unternehmen.', link: { label: 'Lehre ansehen', href: '/teaching' } },
        ],
        recordTitle: 'Ausbildung und Nachweise',
        record: [
            { label: 'Ausbildung', items: ['Yonsei University Graduate School of Engineering, Künstliche Intelligenz (Master, laufend)'] },
            { label: 'Zertifikate', items: ['TensorFlow Developer Certificate (Google, 2023)', 'Goethe-Zertifikat B2'] },
            { label: 'Patente', items: ['B2B-Chatlösung für individuelle KI-Chatbots (Anmeldung 2023)', 'Vorrichtung zur Qualitätsbestimmung von getrocknetem Seetang (Anmeldung 2025, Miterfinder)'] },
        ],
        endTitle: 'Wenn es etwas gemeinsam zu bauen gibt',
        endText: 'Schreiben Sie mir, was Sie bauen oder unterrichtet haben möchten. Ich antworte mit Umfang und Zeitplan.',
        endCta: 'Kontakt aufnehmen',
    },
}

export default function About() {
    const { locale } = useLanguage()
    const copy = COPY[locale]
    const path = useRef<HTMLOListElement>(null)

    // 스크롤이 닿는 연도마다 위쪽 줄이 왼쪽에서 그어지고 글이 올라온다. 지나온 연도는 진하게 남는다
    useGSAP(
        () => {
            const mm = gsap.matchMedia()
            mm.add(MQ.motion, () => {
                gsap.utils.toArray<HTMLElement>('[data-step]').forEach((step) => {
                    gsap.fromTo(
                        step,
                        { '--line': 0, '--rise': '18px', '--show': 0 },
                        {
                            '--line': 1,
                            '--rise': '0px',
                            '--show': 1,
                            duration: 0.8,
                            ease: 'power3.out',
                            scrollTrigger: { trigger: step, start: 'top 86%', toggleActions: 'play none none reverse' },
                        }
                    )
                    // 한 번 지나면 페이지 끝까지 진하게 두고, 위로 되돌아갈 때만 다시 흐리게 한다
                    ScrollTrigger.create({
                        trigger: step,
                        start: 'top 62%',
                        onEnter: () => step.classList.add(s.passed),
                        onLeaveBack: () => step.classList.remove(s.passed),
                    })
                })
            })
            return () => mm.revert()
        },
        { scope: path, dependencies: [locale], revertOnUpdate: true }
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
                        <Sentences text={copy.intro} />
                    </p>
                </div>
            </section>

            <section className={h.section}>
                <div className={`${h.container} ${s.split}`}>
                    <h2 className={`${h.h2} ${s.sticky}`}>{copy.pathTitle}</h2>
                    <ol ref={path} className={s.path}>
                        {copy.path.map((item) => (
                            <li key={item.year} className={s.step} data-step>
                                <span className={s.year}>{item.year}</span>
                                <div>
                                    <h3 className={s.stepHead}>{item.head}</h3>
                                    <p className={s.stepBody}>{item.body}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <section className={h.section}>
                <div className={`${h.container} ${s.split}`}>
                    <h2 className={h.h2}>{copy.nowTitle}</h2>
                    <dl className={s.rows}>
                        {copy.now.map((item) => (
                            <div key={item.name} className={s.row}>
                                <dt>{item.name}</dt>
                                <dd>
                                    {item.body}
                                    {item.link && (
                                        <Link href={item.link.href} className={`${h.link} ${s.rowLink}`}>
                                            {item.link.label}
                                        </Link>
                                    )}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            <section className={h.section}>
                <div className={`${h.container} ${s.split}`}>
                    <h2 className={h.h2}>{copy.recordTitle}</h2>
                    <dl className={s.rows}>
                        {copy.record.map((group) => (
                            <div key={group.label} className={s.row}>
                                <dt>{group.label}</dt>
                                <dd>
                                    {group.items.map((item) => (
                                        <span key={item} className={s.rowItem}>
                                            {item}
                                        </span>
                                    ))}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            <section className={s.end}>
                <div className={h.container}>
                    <h2 className={s.endTitle}>{copy.endTitle}</h2>
                    <p className={s.endText}>{copy.endText}</p>
                    <Link
                        href="/contact"
                        className={h.button}
                        onClick={() => trackButtonClick('contact_about', 'cta', '/contact', locale)}
                    >
                        {copy.endCta}
                    </Link>
                </div>
            </section>
        </HomeShell>
    )
}
