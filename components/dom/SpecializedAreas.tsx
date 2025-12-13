'use client'

import styles from './SpecializedAreas.module.css'
import { useLanguage } from '@/contexts/LanguageContext'

import { FiCpu, FiGlobe, FiLayers, FiBookOpen } from 'react-icons/fi'

export default function SpecializedAreas() {
    const { t } = useLanguage()

    const areas = [
        {
            title: t.specialized.ai.title,
            desc: t.specialized.ai.desc,
            icon: <FiCpu />
        },
        {
            title: t.specialized.web.title,
            desc: t.specialized.web.desc,
            icon: <FiGlobe />
        },
        {
            title: t.specialized.platform.title,
            desc: t.specialized.platform.desc,
            icon: <FiLayers />
        },
        {
            title: t.specialized.edu.title,
            desc: t.specialized.edu.desc,
            icon: <FiBookOpen />
        }
    ]

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>{t.specialized.title}</h1>
            <div className={styles.grid}>
                {areas.map((area, i) => (
                    <div key={i} className={styles.card}>
                        <div className={styles.icon}>{area.icon}</div>
                        <h3 className={styles.title}>{area.title}</h3>
                        <p className={styles.desc}>{area.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
