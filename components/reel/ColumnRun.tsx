'use client'

import Link from 'next/link'
import Footage, { FootageVariant } from './Footage'
import Reveal from './Reveal'
import { PROJECTS } from '@/data/projects'
import { useLanguage } from '@/contexts/LanguageContext'
import styles from './reel.module.css'

// ColumnRun: five uneven columns that rise from below, one after another
const RATIO = [0.26, 0.16, 0.24, 0.14, 0.2]
const VARIANTS: FootageVariant[] = ['ledger', 'track', 'code', 'flow', 'bars']

export default function ColumnRun() {
    const { t } = useLanguage()
    const copy = t.reel.work

    return (
        <section className={styles.section}>
            <header className={styles.sectionHead}>
                <p className={styles.kicker}>Selected work</p>
                <h2 className={styles.h2}>{copy.title}</h2>
                <p className={styles.note}>{copy.note}</p>
            </header>

            <Reveal as="ol" className={styles.columns}>
                {copy.items.map((item, i) => {
                    const project = PROJECTS.find((p) => p.id === item.id)
                    return (
                        <li
                            key={item.id}
                            className={styles.column}
                            style={{ '--ratio': RATIO[i], '--i': i } as React.CSSProperties}
                        >
                            <Link href={`/projects/${item.id}`} className={styles.columnLink}>
                                <Footage variant={VARIANTS[i]} />
                                <span className={styles.columnIndex}>0{i + 1}</span>
                                <span className={styles.columnMeta}>
                                    <span className={styles.columnTag}>
                                        {item.tag} · {project?.year}
                                    </span>
                                    <span className={styles.columnTitle}>{item.title}</span>
                                </span>
                            </Link>
                        </li>
                    )
                })}
            </Reveal>

            <Link href="/projects" className={styles.textLink}>
                {copy.all} →
            </Link>
        </section>
    )
}
