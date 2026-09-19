'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Footage from './Footage'
import { REEL_CLIPS } from '@/data/reel'
import { useLanguage } from '@/contexts/LanguageContext'
import styles from './Showreel.module.css'

/** A small card pinned to the viewport grows into a full-bleed dark screening room as you scroll. */
export default function Showreel() {
    const { t } = useLanguage()
    const ref = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
    const scale = useTransform(scrollYProgress, [0, 0.55], [0.38, 1])
    const captionOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1])
    const captionY = useTransform(scrollYProgress, [0.5, 0.7], [40, 0])

    return (
        <section ref={ref} className={styles.showreel} data-bg="#0a0908" data-tone="dark">
            <div className={styles.pin}>
                {/* the braces part and wrap the screen: { reel } */}
                <div className={styles.anchor} data-stage-anchor data-split="1.25" aria-hidden="true" />

                <motion.div className={styles.screen} style={{ scale }}>
                    <div className={styles.main}>
                        <Footage variant="code" src={REEL_CLIPS.heroBuild} />
                    </div>
                    <div className={styles.side}>
                        <Footage variant="seats" src={REEL_CLIPS.heroTeach} />
                    </div>
                    <div className={styles.side}>
                        <Footage variant="flow" src={REEL_CLIPS.end} />
                    </div>
                </motion.div>

                <motion.div className={styles.caption} style={{ opacity: captionOpacity, y: captionY }}>
                    <p className={styles.kicker}>Showreel</p>
                    <h2 className={styles.title}>{t.reel.showreel.title}</h2>
                    <p className={styles.note}>{t.reel.showreel.note}</p>
                </motion.div>
            </div>
        </section>
    )
}
