'use client'

import Link from 'next/link'
import h from './home.module.css'
import s from './Services.module.css'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Services() {
    const { t } = useLanguage()
    const { services, teaching } = t.home
    return (
        <section className={h.section}>
            <div className={h.container}>
                <h2 className={h.h2}>{services.title}</h2>
                <dl className={s.list}>
                    {services.items.map((item) => (
                        <div key={item.title} className={s.row}>
                            <dt className={s.title}>{item.title}</dt>
                            <dd className={s.desc}>
                                {item.desc}
                                <span className={s.stack}>{item.stack}</span>
                            </dd>
                        </div>
                    ))}
                </dl>
                <p className={s.teaching}>
                    {teaching.text}{' '}
                    <Link href="/teaching" className={h.link}>
                        {teaching.link}
                    </Link>
                </p>
            </div>
        </section>
    )
}
