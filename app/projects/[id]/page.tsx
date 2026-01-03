'use client';

import { useParams, useRouter } from 'next/navigation';
import { PROJECTS } from '@/data/projects';
import { useLanguage } from '@/contexts/LanguageContext';
import styles from './page.module.css';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
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
    SiGit, SiIntellijidea, SiNestjs, SiPhp, SiCodeigniter
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { FaDatabase, FaServer, FaCloud, FaRobot, FaTools, FaCode, FaJava } from 'react-icons/fa';

// Icon Mapping (same as ProjectCard)
const iconMap: { [key: string]: React.ElementType } = {
    'Python': SiPython,
    'Java': FaJava,
    'JavaScript': SiJavascript,
    'TypeScript': SiTypescript,
    'HTML': SiHtml5,
    'CSS': SiCss3,
    'Dart': SiDart,
    'SQL': FaDatabase,
    'React': SiReact,
    'Next.js': SiNextdotjs,
    'Vue.js': SiVuedotjs,
    'Svelte': SiSvelte,
    'JQuery': SiJquery,
    'TailwindCSS': SiTailwindcss,
    'Bootstrap': SiBootstrap,
    'Vite': SiVite,
    'Framer Motion': SiFramer,
    'Three.js': SiThreedotjs,
    'FastAPI': SiFastapi,
    'Spring Boot': SiSpringboot,
    'Node.js': SiNodedotjs,
    'Express': SiExpress,
    'Django': SiDjango,
    'Flask': SiFlask,
    'Firebase Functions': SiFirebase,
    'RESTful API Design': FaServer,
    'Serverless': FaCloud,
    'Flutter': SiFlutter,
    'React Native': SiReact,
    'MySQL': SiMysql,
    'PostgreSQL': SiPostgresql,
    'Firebase': SiFirebase,
    'MongoDB': SiMongodb,
    'Supabase': SiSupabase,
    'MS SQL': FaDatabase,
    'AWS': SiAmazonwebservices,
    'AWS Lambda': SiAmazonwebservices,
    'Google Cloud': SiGooglecloud,
    'Naver Cloud': SiNaver,
    'Vercel': SiVercel,
    'PythonAnywhere': FaServer,
    'Docker': SiDocker,
    'Nginx': SiNginx,
    'GitHub Actions': SiGithubactions,
    'OpenAI API': SiOpenai,
    'GPT-4': SiOpenai,
    'Gemini': SiGoogle,
    'Prompt Engineering': FaRobot,
    'TensorFlow': SiTensorflow,
    'PyTorch': SiPytorch,
    'MediaPipe': FaRobot,
    'OpenCV': SiOpencv,
    'Pandas': SiPandas,
    'NumPy': SiNumpy,
    'Plotly': SiPlotly,
    'Chart.js': SiChartdotjs,
    'BeautifulSoup': FaCode,
    'Selenium': SiSelenium,
    'Notion API': SiNotion,
    'Notion': SiNotion,
    'Google Apps Script': SiGoogle,
    'Git/GitHub': SiGit,
    'VSCode': VscVscode,
    'IntelliJ': SiIntellijidea,
    'Google Colab': SiGoogle,
    'Slack': SiSlack,
    'Postman': SiPostman,
    'Figma': SiFigma,
    'Stripe': FaTools,
    'CodeIgniter': SiCodeigniter,
    'Nest.js': SiNestjs,
    'PHP': SiPhp,
    'Streamlit': SiPython
};

// Brand Colors (same as ProjectCard)
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
    'Next.js': '#fff',
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
    'AWS Lambda': '#FF9900',
    'Google Cloud': '#4285F4',
    'Naver Cloud': '#03C75A',
    'Vercel': '#fff',
    'Docker': '#2496ED',
    'Nginx': '#009639',
    'GitHub Actions': '#2088FF',
    'OpenAI API': '#412991',
    'GPT-4': '#412991',
    'Gemini': '#8E75B2',
    'TensorFlow': '#FF6F00',
    'PyTorch': '#EE4C2C',
    'OpenCV': '#5C3EE8',
    'Pandas': '#150458',
    'NumPy': '#013243',
    'Plotly': '#3F4F75',
    'Chart.js': '#FF6384',
    'BeautifulSoup': '#fff',
    'Selenium': '#43B02A',
    'Notion API': '#000',
    'Notion': '#000',
    'Google Apps Script': '#4285F4',
    'Git/GitHub': '#181717',
    'VSCode': '#007ACC',
    'IntelliJ': '#000',
    'Google Colab': '#F9AB00',
    'Slack': '#4A154B',
    'Postman': '#FF6C37',
    'Figma': '#F24E1E',
    'Stripe': '#635BFF',
    'CodeIgniter': '#EE4323',
    'Nest.js': '#E0234E',
    'PHP': '#777BB4',
    'Streamlit': '#FF4B4B'
};

export default function ProjectDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { t } = useLanguage();
    const [showFloatingBtn, setShowFloatingBtn] = useState(false);

    const id = Number(params?.id);
    const project = PROJECTS.find((p) => p.id === id);

    // Scroll detection for floating button
    useEffect(() => {
        const handleScroll = () => {
            setShowFloatingBtn(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!project) {
        return (
            <div className={styles.main}>
                <div className={styles.container}>
                    <h1>{t?.project_detail_page?.not_found || 'Project not found'}</h1>
                    <button onClick={() => router.back()} className={styles.backBtn}>
                        ← {t?.project_detail_page?.back_to_projects || 'Back to Projects'}
                    </button>
                </div>
            </div>
        );
    }

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <main className={styles.main}>
            <article className={styles.container}>
                {/* Top Back Button */}
                <motion.div
                    className={styles.topBackBtn}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Link href="/projects" className={styles.backBtn}>
                        ← {t?.project_page?.back_to_list || 'Back to List'}
                    </Link>
                </motion.div>

                {/* 1. Hero / Overview */}
                <motion.section
                    className={styles.heroSection}
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    transition={{ duration: 0.6 }}
                >
                    <div className={styles.metaRow}>
                        <span className={styles.categoryBadge}>{project.category}</span>
                        <span>{project.year}</span>
                    </div>

                    <h1 className={styles.title}>{project.title}</h1>
                    <p className={styles.summary}>{project.summary}</p>

                    {project.nda && (
                        <div className={styles.ndaBadge}>
                            🔒 {t?.project_page?.nda || 'Partial Disclosure (NDA)'}
                        </div>
                    )}
                </motion.section>

                {/* 2. Problem & Context */}
                {project.problem && (
                    <motion.section
                        className={styles.section}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className={styles.sectionTitle}>{t?.project_detail_page?.problem_context || 'Problem & Context'}</h2>
                        <div className={styles.contentRow}>
                            <div className={styles.label}>{t?.project_detail_page?.context || 'Context'}</div>
                            <div className={styles.text}>{project.problem.background}</div>
                        </div>
                        <div className={styles.contentRow}>
                            <div className={styles.label}>{t?.project_detail_page?.requirements || 'Requirements'}</div>
                            <ul className={styles.list}>
                                {project.problem.requirements.map((req, i) => (
                                    <li key={i}>{req}</li>
                                ))}
                            </ul>
                        </div>
                    </motion.section>
                )}

                {/* 3. Approach & Architecture */}
                {project.approach && (
                    <motion.section
                        className={styles.section}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className={styles.sectionTitle}>{t?.project_detail_page?.approach_architecture || 'Approach & Architecture'}</h2>
                        <div className={styles.approachBox}>
                            <div className={styles.contentRow}>
                                <div className={styles.label}>{t?.project_detail_page?.strategy || 'Strategy'}</div>
                                <div className={styles.text}>{project.approach.strategy}</div>
                            </div>
                            <div className={styles.roleFocus}>
                                <div className={styles.contentRow}>
                                    <div className={styles.label}>{t?.project_detail_page?.my_role || 'My Role'}</div>
                                    <div className={styles.text}>{project.approach.myRoleFocus}</div>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                )}

                {/* 4. Tech Stack */}
                <motion.section
                    className={styles.section}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className={styles.sectionTitle}>{t?.project_detail_page?.tech_stack || 'Tech Stack'}</h2>
                    <div className={styles.techGrid}>
                        {project.techStack.map((tech) => {
                            const Icon = iconMap[tech] || FaCode;
                            const brandColor = brandColors[tech] || '#ccc';
                            return (
                                <span key={tech} className={styles.techTag}>
                                    <Icon className={styles.techIcon} style={{ color: brandColor }} />
                                    {tech}
                                </span>
                            );
                        })}
                    </div>
                </motion.section>

                {/* 5. Outcome & Learnings */}
                {project.outcome && (
                    <motion.section
                        className={styles.section}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className={styles.sectionTitle}>{t?.project_detail_page?.outcome_learnings || 'Outcome & Learnings'}</h2>
                        <div className={styles.contentRow}>
                            <div className={styles.label}>{t?.project_detail_page?.outcome || 'Outcome'}</div>
                            <div className={styles.text}>{project.outcome.result}</div>
                        </div>
                        <div className={styles.contentRow}>
                            <div className={styles.label}>{t?.project_detail_page?.learnings || 'Learnings'}</div>
                            <div className={styles.text}>{project.outcome.learnings}</div>
                        </div>
                    </motion.section>
                )}

                {/* 7. NDA Notice */}
                {project.nda && (
                    <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', fontSize: '0.9rem', color: '#888', textAlign: 'center' }}>
                        <p>{t?.project_detail_page?.nda_notice || '본 프로젝트는 NDA로 인해 일부 정보만 공개되었습니다. 구조와 접근 방식 중심으로 정리되어 있습니다.'}</p>
                    </div>
                )}

                {/* 8. Navigation */}
                <nav className={styles.nav}>
                    <Link href="/projects" className={styles.backBtn}>
                        ← {t?.project_page?.back_to_list || 'Back to List'}
                    </Link>
                    {/* Logic for Next Project can be added here */}
                </nav>
            </article>

            {/* Floating Back Button (appears on scroll) */}
            {showFloatingBtn && (
                <motion.div
                    className={styles.floatingBackBtn}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                >
                    <Link href="/projects" className={styles.floatingBtn}>
                        ← {t?.project_page?.back_to_list || 'Back to List'}
                    </Link>
                </motion.div>
            )}
        </main>
    );
}
