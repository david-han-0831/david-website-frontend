'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowDown } from '@phosphor-icons/react'
import clsx from 'clsx'
import h from './home.module.css'
import s from './Hero.module.css'
import { useLanguage } from '@/contexts/LanguageContext'
import { PROJECTS } from '@/data/projects'
import { trackButtonClick } from '@/lib/utils/gtm'
import { gsap, SplitText, useGSAP, MQ, BEAT, EIGHTH, SIXTEENTH, EASE_OUT } from '@/lib/motion'

// 기획 → 디자인 → 개발 → 출시 모션그래픽 (소스: motion/hero-reel)
const REEL = {
    poster: '/media/hero/poster.jpg',
    webm: '/media/hero/reel-1080.webm',
    mp4: '/media/hero/reel-1080.mp4',
    mobile: '/media/hero/reel-720.mp4',
}

export default function Hero() {
    const { t, locale } = useLanguage()
    const root = useRef<HTMLElement>(null)
    const video = useRef<HTMLVideoElement>(null)
    const home = t.home
    // 프로젝트 수는 문구에 적지 않고 데이터에서 센다
    const fill = (text: string) => text.replace('{count}', String(PROJECTS.length))

    // 화면 밖에서는 멈추고, 움직임 최소화 설정이면 포스터만 보여준다
    useEffect(() => {
        const el = video.current
        if (!el) return
        const reduced = window.matchMedia(MQ.reduced)
        const io = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !reduced.matches) el.play().catch(() => {})
            else el.pause()
        })
        io.observe(el)
        return () => io.disconnect()
    }, [])

    useGSAP(
        () => {
            const title = root.current!.querySelector(`.${s.title}`)!
            gsap.set(title, { autoAlpha: 1 })

            const mm = gsap.matchMedia()
            mm.add(MQ.motion, () => {
                const split = SplitText.create(title, { type: 'lines,words', mask: 'lines' })
                const tl = gsap.timeline({ defaults: { ease: EASE_OUT } })
                tl.from(split.words, { yPercent: 110, duration: BEAT * 2.4, stagger: SIXTEENTH })
                    .from(`.${s.reveal}`, { y: 24, autoAlpha: 0, duration: BEAT * 2, stagger: EIGHTH / 2 }, BEAT)
                    .from(`.${s.reel}`, { y: 60, autoAlpha: 0, duration: BEAT * 2.4 }, BEAT * 0.8)
                return () => split.revert()
            })

            // 스크롤하면 영상 패널이 화면 가득 펼쳐진다
            mm.add(MQ.desktop, () => {
                const reel = root.current!.querySelector<HTMLElement>(`.${s.reel}`)!
                const gutter = parseFloat(getComputedStyle(root.current!.querySelector(`.${h.container}`)!).paddingLeft)
                gsap.fromTo(
                    reel,
                    { clipPath: `inset(0px ${gutter}px 0px ${gutter}px round 24px)` },
                    {
                        clipPath: 'inset(0px 0px 0px 0px round 0px)',
                        ease: 'none',
                        scrollTrigger: { trigger: reel, start: 'top 45%', end: 'top top', scrub: true },
                    },
                )
            })
            return () => mm.revert()
        },
        { scope: root, dependencies: [locale], revertOnUpdate: true },
    )

    return (
        <section ref={root} className={s.hero} data-locale={locale}>
            <div className={clsx(h.container, s.head)}>
                <div className={s.titleCol}>
                    <p className={clsx(h.eyebrow, s.reveal)}>{home.eyebrow}</p>
                    {/* SplitText 가 내부 DOM 을 바꾸므로 언어가 바뀌면 통째로 교체 */}
                    <h1 key={locale} className={s.title}>
                        {home.title.map((line, i) => (
                            <span key={line} className={clsx(s.line, i === home.title.length - 1 && s.accent)}>
                                {line}
                            </span>
                        ))}
                    </h1>
                </div>

                <div className={s.aside}>
                    <p className={clsx(s.lead, s.reveal)}>{fill(home.lead)}</p>
                    <div className={clsx(s.ctas, s.reveal)}>
                        <Link
                            href="/contact"
                            className={h.btnPrimary}
                            onClick={() => trackButtonClick('contact', 'hero', '/contact', locale)}
                        >
                            {home.cta_primary}
                            <ArrowRight size={18} weight="bold" />
                        </Link>
                        <a
                            href="#work"
                            className={h.btnGhost}
                            onClick={() => trackButtonClick('work', 'hero', '#work', locale)}
                        >
                            {home.cta_secondary}
                            <ArrowDown size={16} weight="bold" />
                        </a>
                    </div>
                </div>
            </div>

            <div className={s.reel}>
                <video
                    ref={video}
                    className={s.video}
                    poster={REEL.poster}
                    muted
                    loop
                    playsInline
                    preload="auto"
                    aria-hidden
                    tabIndex={-1}
                >
                    <source src={REEL.mobile} type="video/mp4" media="(max-width: 899px)" />
                    <source src={REEL.webm} type="video/webm" />
                    <source src={REEL.mp4} type="video/mp4" />
                </video>
            </div>

            <div className={h.container}>
                <dl className={s.stats}>
                    {home.stats.map((stat) => (
                        <div key={stat.label} className={s.stat}>
                            <dt className={s.statLabel}>{stat.label}</dt>
                            <dd className={s.statValue}>{fill(stat.value)}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    )
}
