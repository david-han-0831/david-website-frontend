'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Footage, { FootageVariant } from './Footage'
import { useLanguage } from '@/contexts/LanguageContext'
import KineticText from './KineticText'
import styles from './reel.module.css'

export default function BuildList() {
    const { t } = useLanguage()
    const [active, setActive] = useState(0)
    const listRef = useRef<HTMLOListElement>(null)

    // The row crossing the middle of the viewport drives the frame, so touch and keyboard get it too
    useEffect(() => {
        const items = Array.from(listRef.current?.children ?? [])
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(items.indexOf(entry.target))
                })
            },
            { rootMargin: '-45% 0px -45% 0px' }
        )
        items.forEach((item) => io.observe(item))
        return () => io.disconnect()
    }, [])

    const rows: { title: string; desc: string; tags: string; variant: FootageVariant }[] = [
        { ...t.whatido.fullstack, tags: 'SaaS Architecture · Tech Strategy · Team Lead', variant: 'bars' },
        { ...t.whatido.ai, tags: 'GPT · LangChain · Workflow Automation', variant: 'flow' },
        { ...t.whatido.creative, tags: 'Admin Tools · Data Pipelines · Cloud Infra', variant: 'code' },
        { ...t.specialized.platform, tags: 'ERP · CRM · Data Modeling', variant: 'ledger' },
    ]

    return (
        <section className={styles.section}>
            <header className={styles.sectionHead}>
                <p className={styles.kicker}>
                    <em>A</em> Build
                </p>
                <KineticText text={t.reel.build.title} className={styles.h2} />
            </header>

            <div className={styles.build}>
                <div className={styles.buildFrame}>
                    {rows.map((row, i) => (
                        <div key={row.variant} className={styles.buildClip} data-active={i === active || undefined}>
                            <Footage variant={row.variant} />
                        </div>
                    ))}
                    <span className={styles.frameCorner}>CLIP 0{active + 1} / 0{rows.length}</span>
                </div>

                <ol ref={listRef} className={styles.buildRows}>
                    {rows.map((row, i) => (
                        <li
                            key={row.variant}
                            className={styles.buildRow}
                            data-active={i === active || undefined}
                            onMouseEnter={() => setActive(i)}
                        >
                            <span className={styles.rowIndex}>0{i + 1}</span>
                            <div>
                                <h3 className={styles.rowTitle}>{row.title}</h3>
                                <p className={styles.rowDesc}>{row.desc}</p>
                                <p className={styles.rowTags}>{row.tags}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>

            <Link href="/skills" className={styles.textLink}>
                {t.reel.build.cta} →
            </Link>
        </section>
    )
}
