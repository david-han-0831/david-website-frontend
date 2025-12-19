'use client'

import { motion } from 'framer-motion'
import styles from './Perspective.module.css'

const narrative = [
    "문제를 먼저 이해합니다",
    "복잡함을 구조로 바꿉니다",
    "반복은 자동화로 줄입니다"
]

const climax = "남은 시간은 사람과 창작에 씁니다"

export default function Perspective() {
    return (
        <section className={styles.section}>
            <motion.h2
                className={styles.introTitle}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                HOW I WORK
            </motion.h2>

            <div className={styles.list}>
                {narrative.map((text, index) => (
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
                        <p className={styles.sentence}>{text}</p>
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
                    <h3 className={styles.climaxText}>{climax}</h3>
                    <motion.p
                        className={styles.climaxSub}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1, transition: { delay: 1 } }}
                    >
                        이것이 제가 기술을 다루는 이유입니다.
                    </motion.p>
                </motion.div>
            </div>
        </section>
    )
}
