'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowDown } from '@phosphor-icons/react'
import clsx from 'clsx'
import h from './home.module.css'
import s from './Hero.module.css'
import { useLanguage } from '@/contexts/LanguageContext'
import { trackButtonClick } from '@/lib/utils/gtm'
import { gsap, SplitText, useGSAP, MQ, BEAT, EIGHTH, SIXTEENTH, EASE_OUT } from '@/lib/motion'

export default function Hero() {
    const { t, locale } = useLanguage()
    const root = useRef<HTMLElement>(null)
    const home = t.home

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
                    .from(`.${s.stat}`, { y: 16, autoAlpha: 0, duration: BEAT * 2, stagger: SIXTEENTH }, BEAT * 1.5)
                return () => split.revert()
            })
            return () => mm.revert()
        },
        { scope: root, dependencies: [locale], revertOnUpdate: true },
    )

    return (
        <section ref={root} className={s.hero} data-locale={locale}>
            <div className={clsx(h.container, s.inner)}>
                <p className={clsx(h.eyebrow, s.reveal)}>{home.eyebrow}</p>

                {/* SplitText 가 내부 DOM 을 바꾸므로 언어가 바뀌면 통째로 교체 */}
                <h1 key={locale} className={s.title}>
                    {home.title.map((line, i) => (
                        <span key={line} className={clsx(s.line, i === home.title.length - 1 && s.accent)}>
                            {line}
                        </span>
                    ))}
                </h1>

                <div className={s.row}>
                    <p className={clsx(s.lead, s.reveal)}>{home.lead}</p>
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

                <dl className={s.stats}>
                    {home.stats.map((stat) => (
                        <div key={stat.label} className={s.stat}>
                            <dt className={s.statLabel}>{stat.label}</dt>
                            <dd className={s.statValue}>{stat.value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    )
}
