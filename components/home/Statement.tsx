'use client'

import h from './home.module.css'
import s from './Statement.module.css'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Statement() {
    const { t } = useLanguage()
    return (
        <section className={h.section}>
            <div className={h.container}>
                <p className={s.statement}>{t.home.statement}</p>
            </div>
        </section>
    )
}
