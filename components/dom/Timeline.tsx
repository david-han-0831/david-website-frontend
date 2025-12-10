'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './Timeline.module.css'

const history = [
    { year: '2025', title: 'Interactive Portfolio Platform', desc: 'Launched a new digital brand experience integrating 3D and AR.' },
    { year: '2023', title: 'Senior Developer & Instructor', desc: 'Led advanced web development courses and architected enterprise solutions.' },
    { year: '2020', title: 'Full Stack Developer', desc: 'Specialized in automated workflows and scalable backend systems.' },
    { year: '2017', title: 'Started Journey', desc: 'Began exploring the world of code, focusing on algorithm efficiency.' },
]

function TimelineItem({ item, index }: { item: any, index: number }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <motion.div
            ref={ref}
            className={styles.item}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
        >
            <div className={styles.itemContent}>
                <span className={styles.year}>{item.year}</span>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.description}>{item.description || item.desc}</p>
            </div>
            <div className={styles.node} />
        </motion.div>
    )
}

export default function Timeline() {
    return (
        <div className={styles.container}>
            <div className={styles.line} />
            {history.map((item, i) => (
                <TimelineItem key={i} item={item} index={i} />
            ))}
        </div>
    )
}
