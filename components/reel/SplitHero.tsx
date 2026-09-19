'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Footage from './Footage'
import { REEL_CLIPS } from '@/data/reel'
import { useLanguage } from '@/contexts/LanguageContext'
import { trackButtonClick } from '@/lib/utils/gtm'
import styles from './SplitHero.module.css'

type Side = 'build' | 'teach' | null

// 24fps slate timecode, written straight to the DOM to keep React out of the frame loop
function Timecode() {
    const ref = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        const start = performance.now()
        const pad = (n: number) => String(n).padStart(2, '0')
        const id = window.setInterval(() => {
            const frames = Math.floor(((performance.now() - start) / 1000) * 24)
            const s = Math.floor(frames / 24)
            if (ref.current) {
                ref.current.textContent = `00:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}:${pad(frames % 24)}`
            }
        }, 1000 / 24)
        return () => window.clearInterval(id)
    }, [])

    return <span ref={ref}>00:00:00:00</span>
}

export default function SplitHero() {
    const { t, locale } = useLanguage()
    const [active, setActive] = useState<Side>(null)
    const copy = t.reel.hero

    const sideProps = (side: Exclude<Side, null>) => ({
        onMouseEnter: () => setActive(side),
        onMouseLeave: () => setActive(null),
        onFocus: () => setActive(side),
        onBlur: () => setActive(null),
    })

    return (
        <section className={styles.hero} data-active={active ?? undefined}>
            <Link
                href="/projects"
                className={`${styles.panel} ${styles.build}`}
                onClick={() => trackButtonClick('portfolio', 'hero', '/projects', locale)}
                {...sideProps('build')}
            >
                <Footage variant="code" src={REEL_CLIPS.heroBuild} />
                <span className={styles.panelLabel}>
                    <em>A</em> Build
                </span>
                <span className={styles.panelCta}>{copy.build_cta} →</span>
            </Link>

            <Link
                href="/teaching"
                className={`${styles.panel} ${styles.teach}`}
                onClick={() => trackButtonClick('teaching', 'hero', '/teaching', locale)}
                {...sideProps('teach')}
            >
                <Footage variant="seats" src={REEL_CLIPS.heroTeach} />
                <span className={styles.panelLabel}>
                    Teach <em>B</em>
                </span>
                <span className={styles.panelCta}>{copy.teach_cta} →</span>
            </Link>

            <div className={styles.shade} />
            <div className={styles.letterbox} aria-hidden="true" />

            <div className={styles.content}>
                <p className={styles.slate}>
                    <span>Reel {new Date().getFullYear()}</span>
                    <Timecode />
                </p>
                <h1 className={styles.title}>{copy.title}</h1>
                <p className={styles.sub}>{copy.sub}</p>
            </div>

            <p className={styles.wordmark} aria-hidden="true">
                David Han
            </p>
        </section>
    )
}
