'use client'

import Link from 'next/link'
import styles from './SectionTeasers.module.css'
import { useLanguage } from '@/contexts/LanguageContext'

export default function SectionTeasers() {
    const { t } = useLanguage()

    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <div className={styles.col}>
                    <h3>🔮 {t.teasers.teaching_title}</h3>
                    <ul>
                        {t.teasers.teaching_items.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                    <Link href="/teaching" className={styles.link}>{t.teasers.teaching_link} →</Link>
                </div>

                <div className={styles.col}>
                    <h3>🚀 {t.teasers.projects_title}</h3>
                    <ul>
                        {t.teasers.project_items.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                    <Link href="/projects" className={styles.link}>{t.teasers.projects_link} →</Link>
                </div>

                <div className={styles.col}>
                    <h3>🛠 {t.teasers.tech_title}</h3>
                    <ul>
                        {t.teasers.tech_items.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                    <Link href="/skills" className={styles.link}>{t.teasers.tech_link} →</Link>
                </div>
            </div>
        </div>
    )
}
