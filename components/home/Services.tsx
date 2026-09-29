'use client'

import { useRef } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import h from './home.module.css'
import s from './Services.module.css'
import { useLanguage } from '@/contexts/LanguageContext'
import { trackButtonClick } from '@/lib/utils/gtm'
import { gsap, useGSAP, MQ, BEAT, EIGHTH } from '@/lib/motion'

export default function Services() {
    const { t, locale } = useLanguage()
    const { services, teaching } = t.home
    const root = useRef<HTMLElement>(null)

    useGSAP(
        () => {
            const mm = gsap.matchMedia()
            mm.add(MQ.motion, () => {
                // 줄이 한 박자씩 그어지고 내용이 뒤따른다
                gsap.utils.toArray<HTMLElement>(`.${s.row}`).forEach((row) => {
                    const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 88%' } })
                    tl.from(row.querySelector(`.${s.rule}`), { scaleX: 0, duration: BEAT * 2, ease: 'expo.inOut' }).from(
                        row.querySelectorAll(`.${s.cell}`),
                        { y: 24, autoAlpha: 0, duration: BEAT * 1.6, ease: 'expo.out', stagger: EIGHTH / 2 },
                        BEAT * 0.6,
                    )
                })
            })
            return () => mm.revert()
        },
        { scope: root, dependencies: [locale], revertOnUpdate: true },
    )

    return (
        <section ref={root} className={s.services} aria-labelledby="services-title">
            <div className={h.container}>
                <div className={s.head}>
                    <p className={h.eyebrow}>{services.eyebrow}</p>
                    <h2 id="services-title" className={h.sectionTitle}>
                        {services.title}
                    </h2>
                </div>

                <ul className={s.list}>
                    {services.items.map((item, i) => (
                        <li key={item.title} className={s.row}>
                            <span className={s.rule} aria-hidden />
                            <Link
                                href="/contact"
                                className={s.link}
                                onClick={() => trackButtonClick(`service_${i + 1}`, 'cta', '/contact', locale)}
                            >
                                <span className={clsx(s.cell, s.num)}>{String(i + 1).padStart(2, '0')}</span>
                                <span className={clsx(s.cell, s.title)}>{item.title}</span>
                                <span className={clsx(s.cell, s.body)}>
                                    <span className={s.desc}>{item.desc}</span>
                                    <span className={s.stack}>{item.stack}</span>
                                </span>
                                <span className={clsx(s.cell, s.arrow)}>
                                    <span className={s.arrowLabel}>{services.cta}</span>
                                    <ArrowUpRight size={20} weight="bold" />
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className={s.teaching}>
                    <p>{teaching.text}</p>
                    <Link href="/teaching" className={h.btnGhost}>
                        {teaching.link}
                        <ArrowRight size={16} weight="bold" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
