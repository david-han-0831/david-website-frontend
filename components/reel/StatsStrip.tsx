'use client'

import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import styles from './reel.module.css'

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

/** Odometer: each digit is a reel of 0-9 that rolls to its value, later digits rolling longer. */
function Odometer({ value, run }: { value: number; run: boolean }) {
    return (
        <span className={styles.odometer} aria-hidden="true">
            {String(value)
                .split('')
                .map((digit, i) => (
                    <span key={i} className={styles.reel}>
                        <span
                            className={styles.reelTrack}
                            style={{
                                transform: `translateY(-${run ? Number(digit) * 10 : 0}%)`,
                                transitionDelay: `${i * 120}ms`,
                            }}
                        >
                            {DIGITS.map((d) => (
                                <span key={d}>{d}</span>
                            ))}
                        </span>
                    </span>
                ))}
        </span>
    )
}

export default function StatsStrip() {
    const { t } = useLanguage()
    const ref = useRef<HTMLDListElement>(null)
    const inView = useInView(ref, { once: true, amount: 0.5 })

    return (
        <dl ref={ref} className={styles.stats}>
            {t.reel.stats.map((stat) => (
                <div key={stat.label} className={styles.stat}>
                    <dd className={styles.statValue}>
                        <span className={styles.srOnly}>{stat.value}+</span>
                        <Odometer value={stat.value} run={inView} />
                        <span aria-hidden="true">+</span>
                    </dd>
                    <dt className={styles.statLabel}>{stat.label}</dt>
                </div>
            ))}
        </dl>
    )
}
