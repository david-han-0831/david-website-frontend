'use client'

import { motion, Variants } from 'framer-motion'
import styles from './Intro.module.css'

export default function Intro() {
    // 애니메이션 설정: 순차적 등장을 위한 variants
    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3, // 0.3초 간격으로 자식 요소 등장
                delayChildren: 0.2,   // 0.2초 대기 후 시작
            }
        }
    }

    const item: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.04, 0.62, 0.23, 0.98] // 부드러운 이징
            }
        }
    }

    return (
        <motion.section
            className={styles.intro}
            variants={container}
            initial="hidden"
            animate="show"
        >
            <motion.h1 className={styles.title} variants={item}>
                기술로 구조를 만들고,<br />
                지식으로 연결합니다
            </motion.h1>

            <motion.p className={styles.description} variants={item}>
                저는 개발자이자 교육자이며,<br />
                복잡한 문제를 구조화하고 자동화하는 일을 해왔습니다.
            </motion.p>

            <motion.p className={styles.description} variants={item}>
                코드를 만들고, 시스템을 설계하며,<br />
                그 과정을 사람들과 나누는 것을 중요하게 생각합니다.
            </motion.p>
        </motion.section>
    )
}
