import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, animate } from 'framer-motion'
import styles from './ExperienceSnapshot.module.css'
import { useLanguage } from '@/contexts/LanguageContext'

function Counter({ value }: { value: string }) {
    const ref = useRef<HTMLDivElement>(null)
    const motionValue = useMotionValue(0)

    // Extract number and suffix (e.g., "8+" -> 8, "+")
    const match = value.match(/([\d\.]+)(.*)/)
    const number = match ? parseFloat(match[1]) : 0
    const suffix = match ? match[2] : ""

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0]
                if (entry.isIntersecting) {
                    // Enter view: Animate to number
                    animate(motionValue, number, { duration: 1.5, ease: "easeOut" })
                } else {
                    // Leave view
                    if (entry.boundingClientRect.y > 0) {
                        motionValue.set(0)
                    }
                }
            },
            { threshold: 0.1, rootMargin: "-20% 0px" }
        )

        observer.observe(element)
        return () => observer.disconnect()
    }, [number, motionValue])

    useEffect(() => {
        // Subscribe to value changes
        const unsubscribe = motionValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = `${Math.floor(latest)}${suffix}`
            }
        })
        return unsubscribe
    }, [motionValue, suffix])

    return <div ref={ref} className={styles.value}>0{suffix}</div>
}

export default function ExperienceSnapshot() {
    const { t } = useLanguage()

    // Professional Stats: 8+ Years, 3+ Years Teaching, 30+ Projects, 100% Quality
    const stats = [
        { value: "8+", label: t.experience.exp, desc: t.experience.desc_exp },
        { value: "3+", label: t.experience.teaching, desc: t.experience.desc_teaching },
        { value: "30+", label: t.experience.projects, desc: t.experience.desc_projects },
        { value: "100%", label: t.experience.passion, desc: t.experience.desc_passion },
    ]

    return (
        <div className={styles.wrapper}>
            <div className={styles.grid}>
                {stats.map((stat, i) => (
                    <div key={i} className={styles.item}>
                        <Counter value={stat.value} />
                        <div className={styles.label}>{stat.label}</div>
                        <div className={styles.desc}>{stat.desc}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
