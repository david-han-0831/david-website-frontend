'use client'

import Link from 'next/link'
import styles from './FinalCTA.module.css'
import { useLanguage } from '@/contexts/LanguageContext'

export default function FinalCTA() {
    const { t } = useLanguage()

    return (
        <section className={styles.section}>
            <div className={styles.content}>
                <h2 className={styles.title}>{t.cta.title}</h2>
                <p className={styles.desc} style={{ whiteSpace: 'pre-line' }}>
                    {t.cta.desc}
                </p>
                <Link href="/contact" className={styles.button}>
                    {t.cta.btn}
                </Link>
            </div>
        </section>
    )
}
