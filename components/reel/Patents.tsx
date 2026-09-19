'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import KineticText from './KineticText'
import styles from './reel.module.css'

/** Deliberately still: a breath between the loud scenes. */
export default function Patents() {
    const { t } = useLanguage()

    return (
        <section className={styles.section}>
            <header className={styles.sectionHead}>
                <p className={styles.kicker}>Patents</p>
                <KineticText text={t.reel.patents.title} className={styles.h2} />
            </header>
            <ul className={styles.patents}>
                {t.skills_page.trust.patents.map((patent) => (
                    <li key={patent.number} className={styles.patent}>
                        <span className={styles.patentNumber}>{patent.number}</span>
                        <span className={styles.patentTitle}>{patent.title}</span>
                        <span className={styles.patentDate}>{patent.date}</span>
                    </li>
                ))}
            </ul>
        </section>
    )
}
