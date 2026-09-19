'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { trackButtonClick } from '@/lib/utils/gtm'
import KineticText from './KineticText'
import styles from './GlassHero.module.css'

export default function GlassHero() {
    const { t, locale } = useLanguage()
    const copy = t.reel.hero

    return (
        <section className={styles.hero}>
            <div className={styles.copy}>
                <p className={styles.slate}>
                    <span>Portfolio {new Date().getFullYear()}</span>
                    <span>Developer · Educator</span>
                </p>
                <KineticText as="h1" trigger="load" text={copy.title} className={styles.title} />
                <p className={styles.sub}>{copy.sub}</p>
                <div className={styles.actions}>
                    <Link
                        href="/projects"
                        className={styles.primary}
                        onClick={() => trackButtonClick('portfolio', 'hero', '/projects', locale)}
                    >
                        {copy.build_cta} →
                    </Link>
                    <Link
                        href="/teaching"
                        className={styles.ghost}
                        onClick={() => trackButtonClick('teaching', 'hero', '/teaching', locale)}
                    >
                        {copy.teach_cta} →
                    </Link>
                </div>
            </div>

            {/* Where the glass rings park; it overlaps the wordmark on purpose so the letters bend */}
            <div className={styles.anchor} data-stage-anchor aria-hidden="true" />

            {/* Painted into the WebGL scene once it is ready; this copy is the first paint and the fallback */}
            <p className={styles.wordmark} data-stage-wordmark aria-hidden="true">
                David Han
            </p>
        </section>
    )
}
