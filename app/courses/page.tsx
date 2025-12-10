'use client'

import styles from './page.module.css'
import { motion } from 'framer-motion'
import Link from 'next/link'

const courses = [
    {
        id: 1,
        title: 'Full Stack Mastery',
        desc: 'Complete guide to building scalable web applications with Next.js and Supabase.',
        modules: ['React Deep Dive', 'Server Components', 'DB Arch', 'Deployment']
    },
    {
        id: 2,
        title: 'Automated Workflows',
        desc: 'Learn to build autonomous agents and automation scripts with Python.',
        modules: ['Python Basics', 'API Integration', 'LLM Agents', 'Deploying Bots']
    },
    {
        id: 3,
        title: 'Interactive 3D Web',
        desc: 'Create immersive web experiences using Three.js and React Three Fiber.',
        modules: ['WebGL Fundamentals', 'R3F Hooks', 'Shaders', 'Optimization']
    },
]

export default function CoursesPage() {
    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <h1 className={styles.title}>Premium Courses</h1>
                <p style={{ color: 'var(--text-dim)' }}>
                    Deep dives into modern technology.
                </p>
            </header>

            <div className={styles.slider}>
                {courses.map((course, i) => (
                    <motion.div
                        key={course.id}
                        className={styles.card}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <div>
                            <h2 className={styles.courseTitle}>{course.title}</h2>
                            <p className={styles.courseDesc}>{course.desc}</p>

                            <ul className={styles.modules}>
                                {course.modules.map((m) => (
                                    <li key={m} className={styles.module}>{m}</li>
                                ))}
                            </ul>
                        </div>

                        <Link href="/contact" style={{ width: '100%' }}>
                            <button className={styles.applyBtn}>Apply Now</button>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </main>
    )
}
