'use client'

import { useRef } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { ArrowRight, EnvelopeSimple } from '@phosphor-icons/react'
import h from './home.module.css'
import s from './EndCard.module.css'
import { useLanguage } from '@/contexts/LanguageContext'
import { trackButtonClick } from '@/lib/utils/gtm'
import { gsap, SplitText, useGSAP, MQ, BEAT, SIXTEENTH, EASE_OUT } from '@/lib/motion'

const EMAIL = 'hdy20201004@gmail.com'

export default function EndCard() {
    const { t, locale } = useLanguage()
    const end = t.home.end
    const root = useRef<HTMLElement>(null)

    useGSAP(
        () => {
            const title = root.current!.querySelector(`.${s.title}`)!
            gsap.set(title, { autoAlpha: 1 })
            const mm = gsap.matchMedia()
            mm.add(MQ.motion, () => {
                const split = SplitText.create(title, { type: 'lines,words', mask: 'lines' })
                gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top 60%' }, defaults: { ease: EASE_OUT } })
                    .from(split.words, { yPercent: 110, duration: BEAT * 2.4, stagger: SIXTEENTH })
                    .from(`.${s.after}`, { y: 20, autoAlpha: 0, duration: BEAT * 2, stagger: SIXTEENTH }, BEAT)
                return () => split.revert()
            })
            return () => mm.revert()
        },
        { scope: root, dependencies: [locale], revertOnUpdate: true },
    )

    return (
        <section ref={root} className={s.end} aria-labelledby="end-title">
            <div className={s.grid} aria-hidden />
            <div className={clsx(h.container, s.inner)}>
                <p className={clsx(h.eyebrow, s.eyebrow, s.after)}>{end.eyebrow}</p>
                <h2 key={locale} id="end-title" className={s.title}>
                    {end.title.map((line) => (
                        <span key={line} className={s.line}>
                            {line}
                        </span>
                    ))}
                </h2>
                <div className={s.row}>
                    <p className={clsx(s.desc, s.after)}>{end.desc}</p>
                    <div className={clsx(s.actions, s.after)}>
                        <Link
                            href="/contact"
                            className={s.cta}
                            onClick={() => trackButtonClick('contact', 'cta', '/contact', locale)}
                        >
                            {end.cta}
                            <ArrowRight size={18} weight="bold" />
                        </Link>
                        <a href={`mailto:${EMAIL}`} className={s.mail}>
                            <EnvelopeSimple size={18} />
                            <span>
                                <small>{end.email_label}</small>
                                {EMAIL}
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
