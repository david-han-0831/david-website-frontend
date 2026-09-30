'use client'

import Link from 'next/link'
import h from './home.module.css'
import s from './EndCard.module.css'
import { EMAIL } from './Hero'
import { useLanguage } from '@/contexts/LanguageContext'
import { trackButtonClick } from '@/lib/utils/gtm'

export default function EndCard() {
    const { t, locale } = useLanguage()
    const { end } = t.home
    return (
        <section className={s.end}>
            <div className={h.container}>
                <h2 className={s.title}>{end.title}</h2>
                <p className={s.desc}>{end.desc}</p>
                <div className={s.actions}>
                    <Link
                        href="/contact"
                        className={h.button}
                        onClick={() => trackButtonClick('contact', 'cta', '/contact', locale)}
                    >
                        {end.cta}
                    </Link>
                    <a href={`mailto:${EMAIL}`} className={h.link}>
                        {EMAIL}
                    </a>
                </div>
            </div>
        </section>
    )
}
