'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import clsx from 'clsx'
import h from './home.module.css'
import s from './Hero.module.css'
import { useLanguage } from '@/contexts/LanguageContext'
import { PROJECTS } from '@/data/projects'
import { trackButtonClick } from '@/lib/utils/gtm'

const KeycapField = dynamic(() => import('./KeycapField'), { ssr: false })

export const EMAIL = 'hdy20201004@gmail.com'

export default function Hero() {
    const { t, locale } = useLanguage()
    const home = t.home
    // 프로젝트 수는 문구에 적지 않고 데이터에서 센다
    const lead = home.lead.replace('{count}', String(PROJECTS.length))

    return (
        <section className={s.hero}>
            <KeycapField className={s.stage} />
            <div className={clsx(h.container, s.inner)}>
                <h1 className={s.title}>
                    {home.title.map((line) => (
                        <span key={line} className={s.line}>
                            {line}
                        </span>
                    ))}
                </h1>
                <p className={s.lead}>{lead}</p>
                <div className={s.actions}>
                    <Link
                        href="/contact"
                        className={h.button}
                        onClick={() => trackButtonClick('contact', 'hero', '/contact', locale)}
                    >
                        {home.cta_primary}
                    </Link>
                    <a href={`mailto:${EMAIL}`} className={h.link}>
                        {home.email_label}
                    </a>
                </div>
                <p className={s.hint}>{home.enter_hint}</p>
            </div>
        </section>
    )
}
