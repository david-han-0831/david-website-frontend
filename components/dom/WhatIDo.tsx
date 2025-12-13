'use client'

import styles from './WhatIDo.module.css'
import { useLanguage } from '@/contexts/LanguageContext'

export default function WhatIDo() {
    const { t } = useLanguage()

    const areas = [
        {
            category: t.whatido.fullstack.title,
            skills: "SaaS Architecture · Tech Strategy · Team Lead",
            desc: t.whatido.fullstack.desc
        },
        {
            category: t.whatido.ai.title,
            skills: "GPT-4o · LangChain · Zapier · Workflow Automation",
            desc: t.whatido.ai.desc
        },
        {
            category: t.whatido.creative.title, // Mapped to Web/Backoffice Platforms
            skills: "Admin Tools · Data Pipelines · Cloud Infra",
            desc: t.whatido.creative.desc
        },
        {
            category: t.whatido.teaching.title,
            skills: "Curriculum Design · Corporate Training · Mentoring",
            desc: t.whatido.teaching.desc
        }
    ]

    return (
        <section className={styles.section}>
            <h1 className={styles.heading}>{t.whatido.title}</h1>
            <div className={styles.grid}>
                {areas.map((area, i) => (
                    <div key={i} className={styles.item}>
                        <h3 className={styles.category}>{area.category}</h3>
                        <p className={styles.skills}>{area.skills}</p>
                        <p className={styles.desc}>{area.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
