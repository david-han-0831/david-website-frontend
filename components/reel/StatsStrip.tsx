'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import styles from './reel.module.css'

function CountUp({ to, run }: { to: number; run: boolean }) {
    const [value, setValue] = useState(0)

    useEffect(() => {
        if (!run) return
        const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 1400
        let raf = 0
        const start = performance.now()
        const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration)
            setValue(Math.round(to * (1 - Math.pow(1 - p, 4))))
            if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
    }, [to, run])

    return <>{value}</>
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
                        <CountUp to={stat.value} run={inView} />
                        <span>+</span>
                    </dd>
                    <dt className={styles.statLabel}>{stat.label}</dt>
                </div>
            ))}
        </dl>
    )
}
