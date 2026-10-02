'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import s from './HeroStudio.module.css'
import { useLanguage } from '@/contexts/LanguageContext'
import { PROJECTS } from '@/data/projects'
import { trackButtonClick } from '@/lib/utils/gtm'
import type { Locale } from '@/translations'

// 미니어처 작업실 영상 히어로 (시안 확인용 — 문구는 확정되면 translations 로 옮긴다)
const COPY: Record<Locale, { title: string[]; lead: string; cta: string; count: string }> = {
    ko: {
        title: ['아이디어를 제품으로', '만드는 작업실.'],
        lead: '한동윤은 기획, 디자인, 개발, 배포를 혼자 맡는 외주 개발자입니다. 웹, 앱, AI 제품을 처음부터 끝까지 만듭니다.',
        cta: '프로젝트 문의하기',
        count: '2015년부터 {count}개 제품',
    },
    en: {
        title: ['A small studio that turns', 'ideas into products.'],
        lead: 'David Han is a freelance developer who handles planning, design, engineering and launch himself, for web, app and AI products.',
        cta: 'Start a project',
        count: '{count} products since 2015',
    },
    de: {
        title: ['Ein kleines Studio, das aus', 'Ideen Produkte macht.'],
        lead: 'David Han ist freiberuflicher Entwickler und übernimmt Konzept, Design, Entwicklung und Launch selbst, für Web-, App- und KI-Produkte.',
        cta: 'Projekt anfragen',
        count: '{count} Produkte seit 2015',
    },
}

export default function HeroStudio() {
    const { locale } = useLanguage()
    const copy = COPY[locale]
    const video = useRef<HTMLVideoElement>(null)

    // 화면 밖에서는 멈추고, 움직임 최소화 설정이면 첫 장면만 보여준다
    useEffect(() => {
        const el = video.current
        if (!el) return
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
        const io = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !reduced.matches) el.play().catch(() => {})
            else el.pause()
        })
        io.observe(el)
        return () => io.disconnect()
    }, [])

    return (
        <section className={s.hero}>
            <div className={s.stage}>
                <video
                    ref={video}
                    className={s.video}
                    poster="/media/hero/studio-poster.jpg"
                    muted
                    loop
                    playsInline
                    preload="auto"
                    aria-hidden
                    tabIndex={-1}
                >
                    <source src="/media/hero/studio.mp4" type="video/mp4" />
                </video>
            </div>
            <div className={s.copy}>
                <h1 className={s.title}>
                    {copy.title.map((line) => (
                        <span key={line}>{line}</span>
                    ))}
                </h1>
                <p className={s.lead}>{copy.lead}</p>
                <div className={s.actions}>
                    <Link
                        href="/contact"
                        className={s.button}
                        onClick={() => trackButtonClick('contact', 'hero', '/contact', locale)}
                    >
                        {copy.cta}
                    </Link>
                    <span>{copy.count.replace('{count}', String(PROJECTS.length))}</span>
                </div>
            </div>
        </section>
    )
}
