'use client'

import Link from 'next/link'
import h from '@/components/home/home.module.css'
import s from './SkillsPage.module.css'
import HomeShell from '@/components/home/HomeShell'
import Sentences from '@/components/home/Sentences'
import { GROUP_ORDER, stackByGroup, type Group } from './stack'
import { PROJECTS } from '@/data/projects'
import { useLanguage } from '@/contexts/LanguageContext'
import type { Locale } from '@/translations'

// 기술 스택 페이지. 기술 목록과 숫자는 프로젝트 데이터에서 센다 (stack.ts)
// (문구는 확정되면 translations 로 옮긴다)
type Copy = {
    title: string
    intro: string
    groups: Record<Group, string>
    unit: string
    patentsTitle: string
    patents: { name: string; meta: string }[]
    certsTitle: string
    certs: string[]
    endTitle: string
    endText: string
    endCta: string
}

const COPY: Record<Locale, Copy> = {
    ko: {
        title: '기술 스택',
        intro: '{count}개 프로젝트에서 실제로 쓴 기술입니다. 옆의 숫자는 그 기술을 쓴 프로젝트 수입니다.',
        groups: {
            language: '언어',
            frontend: '웹 화면',
            backend: '서버',
            mobile: '모바일 앱',
            data: '데이터',
            ai: 'AI',
            infra: '배포와 인프라',
            other: '그 외',
        },
        unit: '개 프로젝트',
        patentsTitle: '특허',
        patents: [
            { name: '맞춤형 AI 챗봇 배포를 위한 B2B 채팅 솔루션', meta: '2023년 출원, 특허-2023-0130063' },
            { name: '건조 김 등급 결정 장치', meta: '2025년 출원, 10-2025-0216295, 공동 발명' },
        ],
        certsTitle: '자격',
        certs: ['TensorFlow Developer Certificate (Google, 2023)', '연세대학교 공학대학원 인공지능 전공 (석사 재학)'],
        endTitle: '쓰고 싶은 기술이 정해져 있다면',
        endText: '정해진 기술이나 기존 시스템이 있어도 괜찮습니다. 지금 쓰는 것을 알려 주시면 거기에 맞춰 만듭니다.',
        endCta: '문의하기',
    },
    en: {
        title: 'Tech stack',
        intro: 'Technologies used in {count} real projects. The number is how many projects used it.',
        groups: {
            language: 'Languages',
            frontend: 'Web front end',
            backend: 'Back end',
            mobile: 'Mobile apps',
            data: 'Data',
            ai: 'AI',
            infra: 'Deployment and infrastructure',
            other: 'Other',
        },
        unit: ' projects',
        patentsTitle: 'Patents',
        patents: [
            { name: 'B2B chat solution for deploying custom AI chatbots', meta: 'Filed 2023, 10-2023-0130063' },
            { name: 'Grading device for dried laver', meta: 'Filed 2025, 10-2025-0216295, co-inventor' },
        ],
        certsTitle: 'Credentials',
        certs: ['TensorFlow Developer Certificate (Google, 2023)', 'Yonsei University, M.S. in Artificial Intelligence (in progress)'],
        endTitle: 'Already have a stack in mind?',
        endText: 'Existing technology or systems are fine. Tell me what you use and I will build around it.',
        endCta: 'Get in touch',
    },
    de: {
        title: 'Technik',
        intro: 'Technologien aus {count} echten Projekten. Die Zahl zeigt, in wie vielen Projekten sie eingesetzt wurden.',
        groups: {
            language: 'Sprachen',
            frontend: 'Web-Frontend',
            backend: 'Backend',
            mobile: 'Mobile Apps',
            data: 'Daten',
            ai: 'KI',
            infra: 'Deployment und Infrastruktur',
            other: 'Weitere',
        },
        unit: ' Projekte',
        patentsTitle: 'Patente',
        patents: [
            { name: 'B2B-Chatlösung für individuelle KI-Chatbots', meta: 'Angemeldet 2023, 10-2023-0130063' },
            { name: 'Vorrichtung zur Qualitätsbestimmung von getrocknetem Seetang', meta: 'Angemeldet 2025, 10-2025-0216295, Miterfinder' },
        ],
        certsTitle: 'Nachweise',
        certs: ['TensorFlow Developer Certificate (Google, 2023)', 'Yonsei University, Master Künstliche Intelligenz (laufend)'],
        endTitle: 'Steht die Technik schon fest?',
        endText: 'Vorhandene Technik oder Systeme sind kein Problem. Sagen Sie mir, was Sie nutzen, und ich baue darauf auf.',
        endCta: 'Kontakt aufnehmen',
    },
}

const STACK = stackByGroup()

export default function SkillsPage() {
    const { locale } = useLanguage()
    const copy = COPY[locale]

    return (
        <HomeShell>
            <section className={s.intro}>
                <div className={h.container}>
                    <h1 className={s.title}>{copy.title}</h1>
                    <p className={s.lead}>
                        <Sentences text={copy.intro.replace('{count}', String(PROJECTS.length))} />
                    </p>
                </div>
            </section>

            <section className={s.body}>
                <div className={h.container}>
                    {GROUP_ORDER.filter((g) => STACK[g].length > 0).map((g) => (
                        <div key={g} className={s.group}>
                            <h2 className={s.groupName}>{copy.groups[g]}</h2>
                            <ul className={s.techs}>
                                {STACK[g].map((tech) => (
                                    <li key={tech.name} className={s.tech} data-major={tech.count >= 5 ? '' : undefined}>
                                        <span className={s.techName}>{tech.name}</span>
                                        <span className={s.techCount} aria-label={`${tech.count}${copy.unit}`}>
                                            {tech.count}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div className={s.records}>
                        <div>
                            <h2 className={h.h2}>{copy.patentsTitle}</h2>
                            <ul className={s.list}>
                                {copy.patents.map((p) => (
                                    <li key={p.name}>
                                        <strong>{p.name}</strong>
                                        <span>{p.meta}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h2 className={h.h2}>{copy.certsTitle}</h2>
                            <ul className={s.list}>
                                {copy.certs.map((c) => (
                                    <li key={c}>
                                        <strong>{c}</strong>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className={s.end}>
                <div className={h.container}>
                    <h2 className={s.endTitle}>{copy.endTitle}</h2>
                    <p className={s.endText}>
                        <Sentences text={copy.endText} />
                    </p>
                    <Link href="/contact" className={h.button}>
                        {copy.endCta}
                    </Link>
                </div>
            </section>
        </HomeShell>
    )
}
