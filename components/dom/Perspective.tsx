'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import styles from './Perspective.module.css'

// 텍스트를 파싱하여 강조 단어에 스타일 적용
function HighlightText({ text, highlights }: { text: string; highlights: string[] }) {
    const parts: Array<{ text: string; isHighlight: boolean }> = []
    let lastIndex = 0

    // 강조할 단어들의 위치를 찾아서 정렬
    const highlightPositions = highlights
        .map(highlight => {
            const index = text.indexOf(highlight, lastIndex)
            return index !== -1 ? { index, length: highlight.length, word: highlight } : null
        })
        .filter((pos): pos is { index: number; length: number; word: string } => pos !== null)
        .sort((a, b) => a.index - b.index)

    // 텍스트를 분할
    highlightPositions.forEach(({ index, length, word }) => {
        // 강조 전 텍스트
        if (index > lastIndex) {
            parts.push({ text: text.substring(lastIndex, index), isHighlight: false })
        }
        // 강조 텍스트
        parts.push({ text: word, isHighlight: true })
        lastIndex = index + length
    })

    // 남은 텍스트
    if (lastIndex < text.length) {
        parts.push({ text: text.substring(lastIndex), isHighlight: false })
    }

    // 강조 단어가 없으면 원본 텍스트 반환
    if (parts.length === 0) {
        return <>{text}</>
    }

    return (
        <>
            {parts.map((part, i) => (
                part.isHighlight ? (
                    <span key={i} className={styles.highlight}>
                        {part.text}
                    </span>
                ) : (
                    <span key={i}>{part.text}</span>
                )
            ))}
        </>
    )
}

export default function Perspective() {
    const { t } = useLanguage()
    
    const narrative = [
        { 
            text: t?.about_page?.perspective?.step_1 || "문제를 먼저 이해합니다", 
            highlights: t?.about_page?.perspective?.step_1_highlight || ["문제", "이해"] 
        },
        { 
            text: t?.about_page?.perspective?.step_2 || "복잡함을 구조로 바꿉니다", 
            highlights: t?.about_page?.perspective?.step_2_highlight || ["복잡함", "구조"] 
        },
        { 
            text: t?.about_page?.perspective?.step_3 || "반복은 자동화로 줄입니다", 
            highlights: t?.about_page?.perspective?.step_3_highlight || ["반복", "자동화"] 
        }
    ]

    const climax = { 
        text: t?.about_page?.perspective?.climax || "남은 시간은 사람과 창작에 씁니다", 
        highlights: t?.about_page?.perspective?.climax_highlight || ["사람", "창작"] 
    }
    
    return (
        <section className={styles.section}>
            <motion.h2
                className={styles.introTitle}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                {t?.about_page?.perspective?.title || 'HOW I WORK'}
            </motion.h2>

            <div className={styles.list}>
                {narrative.map((item, index) => (
                    <motion.div
                        key={index}
                        className={styles.sentenceWrapper}
                        initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                            filter: 'blur(0px)',
                            transition: { duration: 0.8, ease: 'easeOut' }
                        }}
                        viewport={{ margin: "-100px", amount: 0.5 }}
                    >
                        <p className={styles.sentence}>
                            <HighlightText text={item.text} highlights={item.highlights} />
                        </p>
                    </motion.div>
                ))}

                {/* 대망의 클라이맥스 */}
                <motion.div
                    className={styles.climaxWrapper}
                    initial={{ opacity: 0, scale: 0.8, y: 100 }}
                    whileInView={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } // Custom easing
                    }}
                    viewport={{ margin: "-50px" }}
                >
                    <div className={styles.glow} />
                    <h3 className={styles.climaxText}>
                        <HighlightText text={climax.text} highlights={climax.highlights} />
                    </h3>
                    <motion.p
                        className={styles.climaxSub}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1, transition: { delay: 1 } }}
                    >
                        {t?.about_page?.perspective?.climax_sub || '이것이 제가 기술을 다루는 이유입니다.'}
                    </motion.p>
                </motion.div>
            </div>
        </section>
    )
}
