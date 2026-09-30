'use client'

import h from './home.module.css'
import s from './Process.module.css'
import { useLanguage } from '@/contexts/LanguageContext'

// 실제로 순서가 있는 내용이라 번호를 쓴다
export default function Process() {
    const { t } = useLanguage()
    const { process } = t.home
    return (
        <section className={h.section}>
            <div className={h.container}>
                <h2 className={h.h2}>{process.title}</h2>
                <ol className={s.steps}>
                    {process.steps.map((step, i) => (
                        <li key={step.title} className={s.step}>
                            <span className={s.num}>{i + 1}</span>
                            <h3 className={s.title}>{step.title}</h3>
                            <p className={s.desc}>{step.desc}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    )
}
