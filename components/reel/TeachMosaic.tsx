'use client'

import Link from 'next/link'
import Footage, { FootageVariant } from './Footage'
import Reveal from './Reveal'
import { useLanguage } from '@/contexts/LanguageContext'
import styles from './reel.module.css'

const VARIANTS: FootageVariant[] = ['seats', 'code', 'flow', 'bars', 'track', 'ledger']
const SLATS = 7

export default function TeachMosaic() {
    const { t } = useLanguage()
    const copy = t.reel.teach

    return (
        <section className={styles.section}>
            <header className={styles.sectionHead}>
                <p className={styles.kicker}>
                    <em>B</em> Teach
                </p>
                <h2 className={styles.h2}>{copy.title}</h2>
            </header>

            {/* ShutterWipe opens onto a MosaicSix grid, then the number punches in */}
            <Reveal className={styles.mosaicWrap}>
                <ul className={styles.mosaic}>
                    {copy.tiles.map((tile, i) => (
                        <li key={tile.title} className={styles.tile}>
                            <Footage variant={VARIANTS[i]} />
                            <p className={styles.tileCaption}>
                                <strong>{tile.title}</strong>
                                <span>{tile.place}</span>
                            </p>
                        </li>
                    ))}
                </ul>

                <p className={styles.punch}>
                    <strong>250+</strong>
                    <span>{copy.punch_label}</span>
                </p>

                <div className={styles.shutter} aria-hidden="true">
                    {Array.from({ length: SLATS }, (_, i) => (
                        <span key={i} style={{ '--i': i } as React.CSSProperties} />
                    ))}
                </div>
            </Reveal>

            <Link href="/teaching" className={styles.textLink}>
                {copy.cta} →
            </Link>
        </section>
    )
}
