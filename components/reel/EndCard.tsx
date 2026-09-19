'use client'

import Link from 'next/link'
import Footage from './Footage'
import Reveal from './Reveal'
import { REEL_CLIPS } from '@/data/reel'
import { useLanguage } from '@/contexts/LanguageContext'
import { trackButtonClick } from '@/lib/utils/gtm'
import styles from './reel.module.css'

export default function EndCard() {
    const { t, locale } = useLanguage()
    const copy = t.reel.end

    return (
        <Reveal as="section" className={styles.end}>
            <Footage variant="flow" src={REEL_CLIPS.end} className={styles.endFootage} />
            <div className={styles.endInner}>
                <p className={styles.kicker}>End of reel</p>
                <h2 className={styles.endTitle}>{copy.title}</h2>
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
                </div>
            </div>
        </Reveal>
    )
}
