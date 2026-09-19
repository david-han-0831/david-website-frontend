'use client'

import Link from 'next/link'
import Reveal from './Reveal'
import ArCard from './ArCard'
import { useLanguage } from '@/contexts/LanguageContext'
import { trackButtonClick } from '@/lib/utils/gtm'
import KineticText from './KineticText'
import styles from './reel.module.css'

export default function EndCard() {
    const { t, locale } = useLanguage()
    const copy = t.reel.end

    return (
        <Reveal as="section" className={styles.end} bg="#ff5b2e" tone="accent">
            <div className={styles.endInner}>
                <p className={styles.kicker}>End of reel</p>
                <KineticText text={copy.title} className={styles.endTitle} />
                <div className={styles.endActions}>
                    <Link
                        href="/contact"
                        className={styles.buttonPrimary}
                        onClick={() => trackButtonClick('contact_project', 'cta', '/contact', locale)}
                    >
                        {copy.project} →
                    </Link>
                    <Link
                        href="/contact"
                        className={styles.buttonGhost}
                        onClick={() => trackButtonClick('contact_lecture', 'cta', '/contact', locale)}
                    >
                        {copy.lecture} →
                    </Link>
                    <ArCard className={styles.buttonGhost} />
                </div>
            </div>
            <div className={styles.endAnchor} data-stage-anchor aria-hidden="true" />
        </Reveal>
    )
}
