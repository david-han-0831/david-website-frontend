'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FaLaptopCode, FaServer, FaLayerGroup, FaRobot, FaCogs, FaGraduationCap } from 'react-icons/fa'
import { FiArrowRight, FiDownload, FiMail } from 'react-icons/fi'
import styles from './page.module.css'

// 3D removed in favor of 2D Flow Diagram
// const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })
// const LearningMap = dynamic(() => import('@/components/canvas/LearningMap'), { ssr: false })

// --- Data ---
const flowSteps = [
    { id: 'basics', title: 'Programming Fundamentals', desc: 'Code Logic & Syntax', icon: FaGraduationCap },
    { id: 'engineering', title: 'Frontend / Backend', desc: 'Web Engineering Core', icon: FaLaptopCode },
    { id: 'project', title: 'Full Stack Project', desc: 'Integrated Service Build', icon: FaLayerGroup },
    { id: 'ai', title: 'AI Integration', desc: 'LLM & Generative AI', icon: FaRobot },
    { id: 'automation', title: 'Automation', desc: 'Workflow Optimization', icon: FaCogs },
]

const summaryStats = [
    { label: '총 강의 경력', value: '3년+', sub: 'Since 2023' },
    { label: '강의 대상', value: '다양', sub: '대학 · 기업 · 관공서 · 개인' },
    { label: '주요 분야', value: '3+', sub: 'Web · AI · Automation' },
    { label: '운영 방식', value: '실습', sub: '프로젝트 중심 커리큘럼' },
]

const domains = [
    {
        title: 'Frontend Engineering',
        desc: '사용자 경험을 설계하는 프론트엔드 개발',
        content: 'HTML/CSS/JS, React, Next.js, UI 구현',
        target: '비전공자, 대학생, 취준생',
        result: '포트폴리오용 웹 서비스',
        icon: FaLaptopCode,
    },
    {
        title: 'Backend Engineering',
        desc: '서비스의 구조와 흐름을 만드는 백엔드 개발',
        content: 'FastAPI, Spring Boot, REST API, DB 설계',
        target: '백엔드 취준생, 실무 전환자',
        result: 'API 서버 및 DB 구조',
        icon: FaServer,
    },
    {
        title: 'Full Stack Project',
        desc: '프론트엔드와 백엔드를 연결하는 실전 프로젝트',
        content: 'React/Next.js + FastAPI, Supabase/Firebase',
        target: '취업 준비생, 부트캠프 수강생',
        result: '배포된 풀스택 웹 서비스',
        icon: FaLayerGroup,
    },
    {
        title: 'AI & Generative AI',
        desc: '생성형 AI를 실무에 연결하는 방법',
        content: 'ChatGPT, GPT API, GPTs, Agent',
        target: '기업 재직자, 기획자, 개발자',
        result: 'AI 기반 자동화 시나리오',
        icon: FaRobot,
    },
    {
        title: 'Automation & Workflow',
        desc: '반복 업무를 줄이는 자동화 설계',
        content: 'Notion API, Google Sheets, Make, Slack',
        target: '기업·공공기관 실무자',
        result: '조직 맞춤 자동화 흐름',
        icon: FaCogs,
    },
    {
        title: 'Programming Basics',
        desc: '개발을 시작하는 사람을 위한 기초와 진로',
        content: 'Python/Java 기초, 문제 해결 사고',
        target: '학생, 비전공 성인, 입문자',
        result: '기초 프로젝트 + 로드맵',
        icon: FaGraduationCap,
    },
]

const experience = [
    {
        year: '2025',
        items: [
            '동남권 ICT 취·창업 특강 (AI·AWS 부트캠프)',
            '서울과학기술대학교 파이썬 집중 강의',
            '대기업·공공기관 GPT 업무 자동화 특강',
        ]
    },
    {
        year: '2023–Current',
        items: [
            '프리랜서 맞춤 과외 (1:1 / 2:1)',
            '스타트업 기술 코칭 및 자문',
        ]
    }
]

export default function TeachingPage() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    const y = useTransform(scrollYProgress, [0, 0.2], [0, 200])
    const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])

    return (
        <main className={styles.main} ref={containerRef}>
            {/* ① Hero Text Section (Clean, Typographic) */}
            <section className={styles.heroTextSection}>
                <motion.div
                    className={styles.heroContent}
                    style={{ y, opacity }}
                >
                    <h1 className={styles.heroTitle}>Teaching Journey</h1>
                    <p className={styles.heroSubtitle}>
                        기술을 가르치고<br />
                        <span className={styles.highlightText}>사고를 설계합니다</span>
                    </p>
                    <div className={styles.scrollIndicator}>
                        <span>SCROLL TO EXPLORE</span>
                        <div className={styles.scrollLine}></div>
                    </div>
                </motion.div>
            </section>

            {/* ①-2 Learning Flow Diagram (Replaces 3D Map) */}
            <section className={styles.flowSection}>
                <div className={styles.flowHeader}>
                    <h2 className={styles.flowTitle}>Curriculum Flow</h2>
                    <p className={styles.flowDesc}>기초부터 실무 자동화까지 이어지는 체계적 로드맵</p>
                </div>
                <div className={styles.flowContainer}>
                    {/* Vertical Line */}
                    <div className={styles.flowLine}>
                        <motion.div
                            className={styles.flowLineFill}
                            initial={{ height: 0 }}
                            whileInView={{ height: '100%' }}
                            viewport={{ margin: "-20% 0px -20% 0px" }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                    </div>

                    {/* Flow Steps */}
                    {flowSteps.map((step, i) => (
                        <motion.div
                            key={step.id}
                            className={styles.flowStep}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2, duration: 0.5 }}
                            viewport={{ margin: "-50px" }}
                        >
                            <div className={styles.stepMarker}>
                                <step.icon className={styles.stepIcon} />
                            </div>
                            <div className={styles.stepContent}>
                                <h3 className={styles.stepTitle}>{step.title}</h3>
                                <p className={styles.stepDesc}>{step.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <div className={styles.contentSections}>
                {/* ② Teaching Summary */}
                <section className={styles.section} id="summary">
                    <div className={styles.summaryGrid}>
                        {summaryStats.map((stat, i) => (
                            <motion.div
                                key={i}
                                className={styles.summaryCard}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <span className={styles.summaryValue}>{stat.value}</span>
                                <span className={styles.summaryLabel}>{stat.label}</span>
                                <span className={styles.summarySub}>{stat.sub}</span>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ③ Teaching Domains */}
                <section className={styles.section} id="domains">
                    <header className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Teaching Domains</h2>
                        <p className={styles.sectionDesc}>실무와 교육을 연결하는 6가지 강의 영역</p>
                    </header>

                    <div className={styles.grid3x2}>
                        {domains.map((domain, i) => (
                            <motion.div
                                key={i}
                                className={styles.domainCard}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05, duration: 0.5 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.08)' }}
                            >
                                <div className={styles.cardIcon}>
                                    <domain.icon />
                                </div>
                                <h3 className={styles.cardTitle}>{domain.title}</h3>
                                <p className={styles.cardDesc}>{domain.desc}</p>

                                <div className={styles.cardMeta}>
                                    <div className={styles.metaRow}>
                                        <span className={styles.metaLabel}>내용</span>
                                        <span className={styles.metaValue}>{domain.content}</span>
                                    </div>
                                    <div className={styles.metaRow}>
                                        <span className={styles.metaLabel}>대상</span>
                                        <span className={styles.metaValue}>{domain.target}</span>
                                    </div>
                                    <div className={styles.metaRow}>
                                        <span className={styles.metaLabel}>결과</span>
                                        <span className={styles.metaValue}>{domain.result}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ④ Teaching Experience */}
                <section className={styles.section} id="experience">
                    <header className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Experience</h2>
                        <p className={styles.sectionDesc}>현장에서 증명한 교육 실적</p>
                    </header>

                    <div className={styles.timeline}>
                        {experience.map((exp, i) => (
                            <motion.div
                                key={i}
                                className={styles.timelineItem}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.2 }}
                                viewport={{ once: true }}
                            >
                                <div className={styles.yearCol}>{exp.year}</div>
                                <div className={styles.contentCol}>
                                    <ul className={styles.expList}>
                                        {exp.items.map((item, j) => (
                                            <li key={j}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ⑤ Teaching Style & ⑥ Operation */}
                <section className={styles.dualSection}>
                    <motion.div
                        className={styles.infoBlock}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className={styles.subTitle}>Teaching Style</h3>
                        <p className={styles.philosophy}>
                            이론보다 <strong>실습과 결과물</strong>을 지향합니다.<br />
                            단순 지식 전달이 아닌, <br />
                            스스로 문제를 해결하는 <strong>사고의 설계</strong>를 돕습니다.
                        </p>
                        <ul className={styles.featureList}>
                            <li>프로젝트 → 발표 → 피드백 루프</li>
                            <li>Notion 기반 체계적 학습 관리</li>
                            <li>현업 자동화 사례 기반 실습</li>
                        </ul>
                    </motion.div>

                    <motion.div
                        className={styles.infoBlock}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <h3 className={styles.subTitle}>Operation & Tools</h3>
                        <div className={styles.toolsGroup}>
                            <h4>수업 형태</h4>
                            <div className={styles.tags}>
                                <span>온라인(Zoom)</span>
                                <span>오프라인 출강</span>
                                <span>하이브리드</span>
                            </div>
                        </div>
                        <div className={styles.toolsGroup}>
                            <h4>협업 도구</h4>
                            <div className={styles.tags}>
                                <span>Notion</span>
                                <span>GitHub</span>
                                <span>VSCode</span>
                                <span>Slack</span>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* ⑦ Call To Action */}
                <section className={styles.ctaSection}>
                    <motion.div
                        className={styles.ctaCard}
                        initial={{ scale: 0.95, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className={styles.ctaTitle}>Start Your Journey</h2>
                        <p className={styles.ctaText}>출강, 특강, 맞춤 커리큘럼이 필요하신가요?</p>
                        <div className={styles.ctaButtons}>
                            <a href="mailto:contact@example.com" className={styles.primaryBtn}>
                                <FiMail style={{ marginRight: '8px' }} />
                                기업·기관 출강 문의
                            </a>
                            <a href="mailto:contact@example.com" className={styles.secondaryBtn}>
                                <FiArrowRight style={{ marginRight: '8px' }} />
                                개인 과외 문의
                            </a>
                        </div>
                    </motion.div>
                </section>

                <footer className={styles.footerSpacing} />
            </div>
        </main>
    )
}
