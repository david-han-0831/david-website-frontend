'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import styles from './page.module.css'

// Icons
import {
    SiPython, SiJavascript, SiTypescript, SiHtml5, SiCss3, SiDart,
    SiReact, SiNextdotjs, SiVuedotjs, SiSvelte, SiJquery, SiTailwindcss, SiBootstrap,
    SiVite, SiFramer, SiThreedotjs,
    SiFastapi, SiSpringboot, SiNodedotjs, SiExpress, SiDjango, SiFlask, SiFirebase,
    SiFlutter,
    SiMysql, SiPostgresql, SiMongodb, SiSupabase,
    SiAmazonwebservices, SiVercel, SiGooglecloud, SiNaver,
    SiDocker, SiNginx, SiGithubactions,
    SiOpenai, SiGoogle, SiTensorflow, SiPytorch, SiOpencv,
    SiPandas, SiNumpy, SiPlotly, SiChartdotjs,
    SiSelenium, SiNotion, SiSlack, SiPostman, SiFigma,
    SiGit, SiIntellijidea
} from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'
// Fallback / Generic Icons
import { FaDatabase, FaServer, FaCloud, FaRobot, FaTools, FaCode, FaJava } from 'react-icons/fa'

// Icon Mapping
const iconMap: { [key: string]: React.ElementType } = {
    // Language
    'Python': SiPython,
    'Java': FaJava,
    'JavaScript': SiJavascript,
    'TypeScript': SiTypescript,
    'HTML': SiHtml5,
    'CSS': SiCss3,
    'Dart': SiDart,
    'SQL': FaDatabase,

    // Frontend
    'React': SiReact,
    'Next.js': SiNextdotjs,
    'Vue.js': SiVuedotjs,
    'Svelte': SiSvelte,
    'JQuery': SiJquery,
    'TailwindCSS': SiTailwindcss,
    'Bootstrap': SiBootstrap,
    'Vite': SiVite,
    'Framer Motion': SiFramer,
    'AR.js': FaCode, // No specific icon
    'Three.js': SiThreedotjs,

    // Backend
    'FastAPI': SiFastapi,
    'Spring Boot': SiSpringboot,
    'Node.js': SiNodedotjs,
    'Express': SiExpress,
    'Django': SiDjango,
    'Flask': SiFlask,
    'Firebase Functions': SiFirebase,
    'RESTful API Design': FaServer,
    'Serverless': FaCloud,

    // App
    'Flutter': SiFlutter,
    'React Native': SiReact, // Reuse React icon

    // Database
    'MySQL': SiMysql,
    'PostgreSQL': SiPostgresql,
    'Firebase': SiFirebase,
    'MongoDB': SiMongodb,
    'Supabase': SiSupabase,
    'MS SQL': FaDatabase,

    // Cloud
    'AWS': SiAmazonwebservices,
    'Google Cloud': SiGooglecloud,
    'Naver Cloud': SiNaver, // Might not exist in all versions, fallback safely if error?
    'Vercel': SiVercel,
    'PythonAnywhere': FaServer,
    'Docker': SiDocker,
    'Nginx': SiNginx,
    'GitHub Actions': SiGithubactions,

    // AI
    'OpenAI API': SiOpenai,
    'Gemini': SiGoogle, // Use Google icon for Gemini
    'Prompt Engineering': FaRobot,
    'TensorFlow': SiTensorflow,
    'PyTorch': SiPytorch,
    'MediaPipe': FaRobot,
    'OpenCV': SiOpencv,

    // Data
    'Pandas': SiPandas,
    'NumPy': SiNumpy,
    'Matplotlib': FaChartPie, // Need to import
    'Seaborn': FaChartPie,
    'Plotly': SiPlotly,
    'Chart.js': SiChartdotjs,
    'ApexChart': FaChartLine, // Need to import

    // Automation & Tools
    'BeautifulSoup': FaCode,
    'Selenium': SiSelenium,
    'Notion API': SiNotion,
    'Notion': SiNotion,
    'Google Apps Script': SiGoogle,
    'Git/GitHub': SiGit,
    'VSCode': VscVscode,
    'IntelliJ': SiIntellijidea,
    'Google Colab': SiGoogle, // Colab icon usually fits Google
    'Slack': SiSlack,
    'Postman': SiPostman,
    'Figma': SiFigma
}

// Extra imports for mapping
import { FaChartPie, FaChartLine } from 'react-icons/fa'

export default function SkillsPage() {
    const { t } = useLanguage()
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    const y = useTransform(scrollYProgress, [0, 0.2], [0, 200])
    const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])

    // Brand Color Mapping
    const brandColors: { [key: string]: string } = {
        'Python': '#3776AB',
        'Java': '#007396',
        'JavaScript': '#F7DF1E',
        'TypeScript': '#3178C6',
        'HTML': '#E34F26',
        'CSS': '#1572B6',
        'Dart': '#0175C2',
        'SQL': '#4479A1',
        'React': '#61DAFB',
        'Next.js': '#fff', // Dark mode assumption
        'Vue.js': '#4FC08D',
        'Svelte': '#FF3E00',
        'JQuery': '#0769AD',
        'TailwindCSS': '#06B6D4',
        'Bootstrap': '#7952B3',
        'Vite': '#646CFF',
        'Framer Motion': '#0055FF',
        'Three.js': '#fff',
        'FastAPI': '#009688',
        'Spring Boot': '#6DB33F',
        'Node.js': '#339933',
        'Express': '#fff',
        'Django': '#092E20',
        'Flask': '#fff',
        'Firebase Functions': '#FFCA28',
        'Flutter': '#02569B',
        'React Native': '#61DAFB',
        'MySQL': '#4479A1',
        'PostgreSQL': '#4169E1',
        'Firebase': '#FFCA28',
        'MongoDB': '#47A248',
        'Supabase': '#3ECF8E',
        'MS SQL': '#CC2927',
        'AWS': '#FF9900',
        'Google Cloud': '#4285F4',
        'Naver Cloud': '#03C75A',
        'Vercel': '#fff',
        'Docker': '#2496ED',
        'Nginx': '#009639',
        'GitHub Actions': '#2088FF',
        'OpenAI API': '#412991',
        'Gemini': '#8E75B2',
        'TensorFlow': '#FF6F00',
        'PyTorch': '#EE4C2C',
        'OpenCV': '#5C3EE8',
        'Pandas': '#150458',
        'NumPy': '#013243',
        'Git/GitHub': '#F05032',
        'VSCode': '#007ACC',
        'IntelliJ': '#FE315D',
        'Slack': '#4A154B',
        'Notion': '#fff',
        'Postman': '#FF6C37',
        'Figma': '#F24E1E',
        'Google Colab': '#F9AB00'
    }

    // Helper to render tech badges
    const renderTechBadge = (name: string) => {
        // Clean text for mapping
        let cleanName = name.split(' (')[0]
        if (cleanName === 'AWS') cleanName = 'AWS'

        const Icon = (iconMap as any)[cleanName] || (iconMap as any)[name] || FaCode
        const brandColor = (brandColors as any)[cleanName] || (brandColors as any)[name] || '#ccc' // Default gray if not found

        return (
            <div className={styles.techBadge} key={name}>
                <Icon className={styles.techIcon} style={{ color: brandColor }} />
                <span className={styles.techName}>{name}</span>
            </div>
        )
    }

    // --- Mouse Spotlight Logic ---
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return
        const { left, top } = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - left
        const y = e.clientY - top
        e.currentTarget.style.setProperty('--mouse-x', `${x}px`)
        e.currentTarget.style.setProperty('--mouse-y', `${y}px`)
    }

    return (
        <main
            className={styles.main}
            ref={containerRef}
            onMouseMove={handleMouseMove} // Track mouse over the entire main container
        >

            {/* Hero Section (Spotlight Grid) */}
            <section className={styles.heroTextSection}>
                {/* 1. Grid Background */}
                <div className={styles.heroBackground}></div>

                {/* 2. Spotlight Overlay (Controlled by CSS vars) */}
                <div className={styles.spotlightOverlay}></div>

                {/* 3. Foreground Content */}
                <motion.div
                    className={styles.heroContent}
                    style={{ y, opacity }}
                >
                    <h2 className={styles.heroTitle}>Technical Skills</h2>
                    <p className={styles.heroSubtitle}>
                        문제 해결을 위한<br />
                        <span className={styles.highlightText}>최적의 기술을 선택합니다</span>
                    </p>
                </motion.div>

                <div className={styles.scrollIndicator}>
                    <span>SCROLL TO EXPLORE</span>
                    <div className={styles.scrollLine}></div>
                </div>
            </section>

            <div className={styles.contentContainer}>
                {/* 1. Core Stack Summary */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>{t.skills_page.core.title}</h2>
                    <div className={styles.coreGrid}>
                        <div className={styles.coreCard}>
                            <h3 className={styles.coreCardTitle}>{t.skills_page.core.problem_solving.title}</h3>
                            <p className={styles.coreCardText}>{t.skills_page.core.problem_solving.desc}</p>
                        </div>
                        <div className={styles.coreCard}>
                            <h3 className={styles.coreCardTitle}>{t.skills_page.core.architecture.title}</h3>
                            <p className={styles.coreCardText}>{t.skills_page.core.architecture.desc}</p>
                        </div>
                        <div className={styles.coreCard}>
                            <h3 className={styles.coreCardTitle}>{t.skills_page.core.scalability.title}</h3>
                            <p className={styles.coreCardText}>{t.skills_page.core.scalability.desc}</p>
                        </div>
                        <div className={styles.coreCard}>
                            <h3 className={styles.coreCardTitle}>{t.skills_page.core.education.title}</h3>
                            <p className={styles.coreCardText}>{t.skills_page.core.education.desc}</p>
                        </div>
                    </div>
                </section>

                {/* 2. Technical Categories */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>{t.skills_page.stack.title}</h2>
                    <div className={styles.categoryGrid}>

                        {/* 1. Language */}
                        <div className={styles.categoryGroup}>
                            <h3 className={styles.categoryTitle}>{t.skills_page.stack.language.title}</h3>
                            <div className={styles.techTags}>
                                {['Python', 'Java', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Dart', 'SQL'].map(renderTechBadge)}
                            </div>
                        </div>

                        {/* 2. Frontend */}
                        <div className={styles.categoryGroup}>
                            <h3 className={styles.categoryTitle}>{t.skills_page.stack.frontend.title}</h3>
                            <div className={styles.techTags}>
                                {['React', 'Next.js', 'Vue.js', 'Svelte', 'JQuery', 'TailwindCSS', 'Bootstrap', 'Vite', 'Framer Motion', 'Three.js'].map(renderTechBadge)}
                            </div>
                        </div>

                        {/* 3. Backend */}
                        <div className={styles.categoryGroup}>
                            <h3 className={styles.categoryTitle}>{t.skills_page.stack.backend.title}</h3>
                            <div className={styles.techTags}>
                                {[
                                    'FastAPI', 'Spring Boot', 'Node.js', 'Express', 'Django', 'Flask', 'Firebase Functions',
                                    'RESTful API Design', 'Serverless'
                                ].map(renderTechBadge)}
                            </div>
                        </div>

                        {/* 4. App */}
                        <div className={styles.categoryGroup}>
                            <h3 className={styles.categoryTitle}>{t.skills_page.stack.app.title}</h3>
                            <div className={styles.techTags}>
                                {['Flutter', 'React Native'].map(renderTechBadge)}
                            </div>
                        </div>

                        {/* 5. Database */}
                        <div className={styles.categoryGroup}>
                            <h3 className={styles.categoryTitle}>{t.skills_page.stack.database.title}</h3>
                            <div className={styles.techTags}>
                                {['MySQL', 'PostgreSQL', 'Firebase', 'MongoDB', 'Supabase', 'MS SQL'].map(renderTechBadge)}
                            </div>
                        </div>

                        {/* 6. Cloud & Server */}
                        <div className={styles.categoryGroup}>
                            <h3 className={styles.categoryTitle}>{t.skills_page.stack.cloud.title}</h3>
                            <div className={styles.techTags}>
                                {[
                                    'AWS', 'Firebase', 'Vercel', 'Google Cloud', 'Naver Cloud', 'PythonAnywhere',
                                    'Docker', 'Nginx', 'GitHub Actions'
                                ].map(renderTechBadge)}
                            </div>
                        </div>

                        {/* 7. AI & ML */}
                        <div className={styles.categoryGroup}>
                            <h3 className={styles.categoryTitle}>{t.skills_page.stack.ai.title}</h3>
                            <div className={styles.techTags}>
                                {[
                                    'OpenAI API', 'Gemini', 'Prompt Engineering',
                                    'TensorFlow', 'PyTorch', 'MediaPipe', 'OpenCV'
                                ].map(renderTechBadge)}
                            </div>
                        </div>

                        {/* 8. Data */}
                        <div className={styles.categoryGroup}>
                            <h3 className={styles.categoryTitle}>{t.skills_page.stack.data.title}</h3>
                            <div className={styles.techTags}>
                                {['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Plotly', 'Chart.js'].map(renderTechBadge)}
                            </div>
                        </div>

                        {/* 9. Tools */}
                        <div className={styles.categoryGroup}>
                            <h3 className={styles.categoryTitle}>{t.skills_page.stack.tools.title}</h3>
                            <div className={styles.techTags}>
                                {['Git/GitHub', 'VSCode', 'IntelliJ', 'Google Colab', 'Slack', 'Notion', 'Postman', 'Figma'].map(renderTechBadge)}
                            </div>
                        </div>

                    </div>
                </section>

                {/* 3. Usage Scenarios */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>{t.skills_page.scenarios.title}</h2>
                    <div className={styles.scenarioGrid}>
                        {/* 1. Global POS (Spring Boot) */}
                        <div className={styles.scenarioCard}>
                            <h3 className={styles.scenarioTitle}>{t.skills_page.scenarios.pos.title}</h3>
                            <div className={styles.scenarioStack}>
                                {['Spring Boot', 'Java', 'AWS'].map(renderTechBadge)}
                            </div>
                            <p className={styles.coreCardText}>{t.skills_page.scenarios.pos.desc}</p>
                        </div>

                        {/* 2. Enterprise Chatbot */}
                        <div className={styles.scenarioCard}>
                            <h3 className={styles.scenarioTitle}>{t.skills_page.scenarios.chatbot.title}</h3>
                            <div className={styles.scenarioStack}>
                                {['OpenAI API', 'Python', 'PostgreSQL'].map(renderTechBadge)}
                            </div>
                            <p className={styles.coreCardText}>{t.skills_page.scenarios.chatbot.desc}</p>
                        </div>

                        {/* 3. Labeling Tool */}
                        <div className={styles.scenarioCard}>
                            <h3 className={styles.scenarioTitle}>{t.skills_page.scenarios.labeling.title}</h3>
                            <div className={styles.scenarioStack}>
                                {['React', 'TypeScript', 'Python'].map(renderTechBadge)}
                            </div>
                            <p className={styles.coreCardText}>{t.skills_page.scenarios.labeling.desc}</p>
                        </div>

                        {/* 4. Edu System */}
                        <div className={styles.scenarioCard}>
                            <h3 className={styles.scenarioTitle}>{t.skills_page.scenarios.edu.title}</h3>
                            <div className={styles.scenarioStack}>
                                {['Google Cloud', 'Python', 'Notion'].map(renderTechBadge)}
                            </div>
                            <p className={styles.coreCardText}>{t.skills_page.scenarios.edu.desc}</p>
                        </div>

                        {/* 5. 3D Web */}
                        <div className={styles.scenarioCard}>
                            <h3 className={styles.scenarioTitle}>{t.skills_page.scenarios.web.title}</h3>
                            <div className={styles.scenarioStack}>
                                {['Three.js', 'React', 'Next.js'].map(renderTechBadge)}
                            </div>
                            <p className={styles.coreCardText}>{t.skills_page.scenarios.web.desc}</p>
                        </div>

                        {/* 6. Mobile MVP */}
                        <div className={styles.scenarioCard}>
                            <h3 className={styles.scenarioTitle}>{t.skills_page.scenarios.mobile.title}</h3>
                            <div className={styles.scenarioStack}>
                                {['Flutter', 'Firebase', 'Dart'].map(renderTechBadge)}
                            </div>
                            <p className={styles.coreCardText}>{t.skills_page.scenarios.mobile.desc}</p>
                        </div>
                    </div>
                </section>

                {/* 4. Trust & Patents */}
                <section className={styles.section}>
                    <div className={styles.trustCard}>
                        <span className={styles.patentBadge}>{t.skills_page.trust.badge}</span>
                        <h3 className={styles.trustTitle}>{t.skills_page.trust.title}</h3>
                        <p className={styles.trustText}>
                            {t.skills_page.trust.desc}
                        </p>
                    </div>
                </section>
            </div>
        </main>
    )
}
