'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import s from './HeroStudio.module.css'
import { useLanguage } from '@/contexts/LanguageContext'
import { PROJECTS } from '@/data/projects'
import { trackButtonClick } from '@/lib/utils/gtm'
import { useContactScroll } from './useContactScroll'
import type { Locale } from '@/translations'

// 미니어처 작업실 영상 히어로 (시안 확인용 — 문구는 확정되면 translations 로 옮긴다)
const COPY: Record<Locale, { title: string[]; lead: string[]; cta: string; count: string }> = {
    ko: {
        title: ['제 서비스도 만들고,', '남의 서비스도 만듭니다.'],
        lead: ['한동윤입니다. 서비스를 직접 운영하며 배운 것으로', '웹, 앱, AI 제품을 기획부터 출시까지 만듭니다.'],
        cta: '프로젝트 문의하기',
        count: '2015년부터 {count}개 제품',
    },
    en: {
        title: ['I build my own products,', 'and I build yours.'],
        lead: ['I am David Han. What I learn from running my own services', 'goes into every web, app and AI product I build.'],
        cta: 'Start a project',
        count: '{count} products since 2015',
    },
    de: {
        title: ['Meine Produkte.', 'Und Ihre.'],
        lead: ['Ich bin David Han. Was ich im Betrieb eigener Dienste lerne,', 'steckt in jedem Web-, App- und KI-Produkt, das ich baue.'],
        cta: 'Projekt anfragen',
        count: '{count} Produkte seit 2015',
    },
}

export default function HeroStudio() {
    const { locale } = useLanguage()
    const copy = COPY[locale]
    const video = useRef<HTMLVideoElement>(null)
    const toContact = useContactScroll()

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
                <p className={s.lead}>
                    {copy.lead.map((line) => (
                        <span key={line}>{line} </span>
                    ))}
                </p>
                <div className={s.actions}>
                    <Link
                        href="/contact"
                        className={s.button}
                        onClick={(e) => {
                            toContact(e)
                            trackButtonClick('contact', 'hero', '/contact', locale)
                        }}
                    >
                        {copy.cta}
                    </Link>
                    <span>{copy.count.replace('{count}', String(PROJECTS.length))}</span>
                </div>
            </div>
        </section>
    )
}
