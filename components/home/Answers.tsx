'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import s from './Answers.module.css'
import { useLanguage } from '@/contexts/LanguageContext'
import { gsap, useGSAP, MQ, ScrollTrigger } from '@/lib/motion'
import type { Locale } from '@/translations'

// 문의 전에 망설이게 되는 질문에 먼저 답한다 (문구는 확정되면 translations 로 옮긴다)
const SCENES = ['notes', 'design', 'weekly', 'handover', 'ai'] as const

const COPY: Record<Locale, { q: string; a: string }[]> = {
    ko: [
        {
            q: '기획서가 없는데 괜찮나요?',
            a: '괜찮습니다. 이야기를 듣고 필요한 화면과 기능 목록부터 같이 정리합니다.',
        },
        {
            q: '디자인은 어떻게 하나요?',
            a: '시안이 있으면 그대로 만듭니다. 없으면 AI 도구로 시안을 잡거나 디자이너와 협업합니다.',
        },
        {
            q: '진행 상황은 어떻게 아나요?',
            a: '매주 실제로 동작하는 화면을 보여드립니다.',
        },
        {
            q: '만들고 나서는요?',
            a: '문서와 권한을 정리해 넘겨드리고, 유지보수는 별도 계약으로 이어갈 수 있습니다.',
        },
        {
            q: 'AI 기능도 되나요?',
            a: '음성 인식, 문서 읽기, 영상 분석을 실제 서비스에 넣어 운영하고 있습니다.',
        },
    ],
    en: [
        {
            q: 'I have no spec. Is that okay?',
            a: 'Yes. I listen first, then we list the screens and features you need together.',
        },
        {
            q: 'What about design?',
            a: 'If you have designs, I build them as they are. If not, I draft them with AI tools or work with a designer.',
        },
        {
            q: 'How will I know the progress?',
            a: 'Every week you see screens that actually work.',
        },
        {
            q: 'What happens after launch?',
            a: 'I hand over the documents and access. Maintenance can continue under a separate contract.',
        },
        {
            q: 'Can you add AI features?',
            a: 'Speech recognition, document reading and video analysis already run in services I operate.',
        },
    ],
    de: [
        {
            q: 'Ich habe kein Konzept. Geht das?',
            a: 'Ja. Ich höre zuerst zu, dann listen wir gemeinsam die nötigen Screens und Funktionen auf.',
        },
        {
            q: 'Und das Design?',
            a: 'Vorhandene Entwürfe setze ich genau so um. Sonst entwerfe ich mit KI-Tools oder arbeite mit einem Designer.',
        },
        {
            q: 'Wie sehe ich den Fortschritt?',
            a: 'Jede Woche zeige ich Screens, die wirklich funktionieren.',
        },
        {
            q: 'Was passiert nach dem Launch?',
            a: 'Ich übergebe Dokumente und Zugänge. Wartung ist über einen separaten Vertrag möglich.',
        },
        {
            q: 'Gehen auch KI-Funktionen?',
            a: 'Spracherkennung, Dokumentenanalyse und Videoanalyse laufen bereits in Diensten, die ich betreibe.',
        },
    ],
}

export default function Answers() {
    const { locale } = useLanguage()
    const items = COPY[locale]
    const root = useRef<HTMLElement>(null)
    const pin = useRef<HTMLDivElement>(null)
    const [active, setActive] = useState(0)

    // 넓은 화면에서는 화면을 고정하고 스크롤에 따라 질문과 장면을 하나씩 넘긴다
    useGSAP(
        () => {
            const mm = gsap.matchMedia()
            mm.add(MQ.desktop, () => {
                ScrollTrigger.create({
                    trigger: pin.current,
                    start: 'top top',
                    end: `+=${SCENES.length * 55}%`,
                    pin: true,
                    anticipatePin: 1,
                    onUpdate: (self) =>
                        setActive(Math.min(SCENES.length - 1, Math.floor(self.progress * SCENES.length))),
                })
            })
            return () => mm.revert()
        },
        { scope: root },
    )

    return (
        // 고정용 칸이 React 형제 자리에 끼어들지 않도록 안쪽 div 를 고정한다 (HookLine 과 같은 이유)
        <section ref={root}>
            <div ref={pin} className={s.answers}>
                <ul className={s.list}>
                    {items.map((item, i) => (
                        <li key={item.q} className={clsx(s.item, i === active && s.on)}>
                            <div className={s.mobileScene}>
                                <Image
                                    src={`/media/hook/${SCENES[i]}.webp`}
                                    alt=""
                                    width={1120}
                                    height={907}
                                    sizes="100vw"
                                />
                            </div>
                            <h3 className={s.q}>{item.q}</h3>
                            <p className={s.a}>{item.a}</p>
                        </li>
                    ))}
                </ul>
                <div className={s.stage} aria-hidden>
                    {SCENES.map((name, i) => (
                        <Image
                            key={name}
                            src={`/media/hook/${name}.webp`}
                            alt=""
                            width={1120}
                            height={907}
                            sizes="(min-width: 900px) 50vw, 100vw"
                            className={clsx(s.scene, i === active && s.on)}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
