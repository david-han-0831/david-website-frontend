'use client'

import { useRef } from 'react'
import { motion, useInView, Variants } from 'framer-motion'
import styles from './Timeline.module.css'

const history = [
    {
        year: '2025',
        step: '확장과 통합',
        desc: '3D, AR, 자동화를 결합한 인터랙티브 포트폴리오와 디지털 경험을 설계'
    },
    {
        year: '2023',
        step: '교육과 구조화',
        desc: '고급 웹·AI 교육 진행, 엔터프라이즈 시스템 아키텍처 설계'
    },
    {
        year: '2020',
        step: '시스템 중심 개발',
        desc: '반복 업무를 줄이기 위한 자동화 워크플로우와 백엔드 구조 집중'
    },
    {
        year: '2017',
        step: '시작과 탐구',
        desc: '코드와 알고리즘을 통해 문제 해결의 즐거움을 발견'
    },
]

function TimelineItem({ item, index }: { item: typeof history[0], index: number }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    // 교차 슬라이드 효과를 위한 x값 설정 (짝수: 왼쪽에서, 홀수: 오른쪽에서)
    // 인덱스 0(2025) -> Left Style -> x: -50 (왼쪽에서 등장)
    // 인덱스 1(2023) -> Right Style -> x: 50 (오른쪽에서 등장)
    // CSS 클래스와 매칭: index % 2 === 0 ? itemLeft : itemRight
    const isLeft = index % 2 === 0

    const variants: Variants = {
        hidden: {
            opacity: 0,
            x: isLeft ? -50 : 50,
            y: 20
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    }

    return (
        <motion.div
            ref={ref}
            className={`${styles.item} ${isLeft ? styles.itemLeft : styles.itemRight}`}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
        >
            <div className={styles.itemContent}>
                <span className={styles.year}>{item.year}</span>
                <h3 className={styles.title}>{item.step}</h3>
                <p className={styles.description}>{item.desc}</p>
            </div>
            <div className={styles.node} />
        </motion.div>
    )
}

export default function Timeline() {
    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <p className={styles.quote}>
                    “무엇을 했는가”가 아니라<br />
                    <strong>“그 시기에 무엇에 집중했는가”</strong>
                </p>
                <h2 className={styles.subQuote}>
                    시간이 흐르며 역할은 바뀌었지만,<br />
                    구조를 고민하는 태도는 늘 같았습니다.
                </h2>
            </div>

            <div className={styles.line} />

            {history.map((item, i) => (
                <TimelineItem key={i} item={item} index={i} />
            ))}
        </section>
    )
}
