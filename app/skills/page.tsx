'use client'

import dynamic from 'next/dynamic'
import styles from './page.module.css'

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })
const SkillConstellation = dynamic(() => import('@/components/canvas/SkillConstellation'), { ssr: false })

export default function SkillsPage() {
    return (
        <main className={styles.main}>
            <div className={styles.canvasContainer}>
                <Scene>
                    <SkillConstellation />
                </Scene>
            </div>

            <div className={styles.overlay}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Skills Universe</h1>
                    <p className={styles.subtitle}>
                        Drag to explore the constellation of technologies I use.
                    </p>
                </div>
            </div>
        </main>
    )
}
