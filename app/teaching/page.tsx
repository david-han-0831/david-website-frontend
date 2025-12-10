'use client'

import dynamic from 'next/dynamic'
import styles from './page.module.css'

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })
const LearningMap = dynamic(() => import('@/components/canvas/LearningMap'), { ssr: false })

const courses = [
    { title: 'Full Stack Web', desc: 'From React to Database mastery.' },
    { title: 'AI & Automation', desc: 'Integrating LLMs into workflows.' },
    { title: 'Creative Coding', desc: 'Three.js and WebGL visuals.' },
]

export default function TeachingPage() {
    return (
        <main className={styles.main}>
            <div className={styles.canvasContainer}>
                <Scene>
                    <LearningMap />
                </Scene>
            </div>

            <div className={styles.contentWrapper}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Teaching Journey</h1>
                    <p style={{ color: 'var(--text-dim)' }}>
                        Curriculum designed for the future of tech.
                    </p>
                </header>

                <div className={styles.cardContainer}>
                    {courses.map((c, i) => (
                        <div key={i} className={styles.card}>
                            <h3 className={styles.cardTitle}>{c.title}</h3>
                            <p className={styles.cardText}>{c.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}
