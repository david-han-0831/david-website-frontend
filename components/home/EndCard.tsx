'use client'

import h from './home.module.css'
import s from './EndCard.module.css'
import Inquiry from './Inquiry'
import { useLanguage } from '@/contexts/LanguageContext'

// 홈 맨 아래 문의 영역. 헤더와 각 섹션의 문의 버튼이 #contact 로 내려온다
export default function EndCard() {
    const { t } = useLanguage()
    const { end } = t.home
    return (
        <section className={s.end} id="contact">
            <div className={h.container}>
                <h2 className={s.title}>{end.title}</h2>
                <p className={s.desc}>{end.desc}</p>
                <Inquiry />
            </div>
        </section>
    )
}
