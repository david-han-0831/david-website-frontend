'use client';

import { useParams, useRouter } from 'next/navigation';
import { PROJECTS } from '@/data/projects';
import { useLanguage } from '@/contexts/LanguageContext';
import styles from './page.module.css';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ProjectDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { t } = useLanguage();

    const id = Number(params?.id);
    const project = PROJECTS.find((p) => p.id === id);

    if (!project) {
        return (
            <div className={styles.main}>
                <div className={styles.container}>
                    <h1>Project not found</h1>
                    <button onClick={() => router.back()} className={styles.backBtn}>
                        ← Back to Projects
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
                            🔒 Partial Disclosure (NDA)
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
                        <h2 className={styles.sectionTitle}>Problem & Context</h2>
                        <div className={styles.contentRow}>
                            <div className={styles.label}>Context</div>
                            <div className={styles.text}>{project.problem.background}</div>
                        </div>
                        <div className={styles.contentRow}>
                            <div className={styles.label}>Requirements</div>
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
                        <h2 className={styles.sectionTitle}>Approach & Architecture</h2>
                        <div className={styles.approachBox}>
                            <div className={styles.contentRow}>
                                <div className={styles.label}>Strategy</div>
                                <div className={styles.text}>{project.approach.strategy}</div>
                            </div>
                            <div className={styles.roleFocus}>
                                <div className={styles.contentRow}>
                                    <div className={styles.label}>My Role</div>
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
                    <h2 className={styles.sectionTitle}>Tech Stack</h2>
                    <div className={styles.techGrid}>
                        {project.techStack.map((tech) => (
                            <span key={tech} className={styles.techTag}>
                                {tech}
                            </span>
                        ))}
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
                        <h2 className={styles.sectionTitle}>Outcome & Learnings</h2>
                        <div className={styles.contentRow}>
                            <div className={styles.label}>Outcome</div>
                            <div className={styles.text}>{project.outcome.result}</div>
                        </div>
                        <div className={styles.contentRow}>
                            <div className={styles.label}>Learnings</div>
                            <div className={styles.text}>{project.outcome.learnings}</div>
                        </div>
                    </motion.section>
                )}

                {/* 7. NDA Notice */}
                {project.nda && (
                    <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', fontSize: '0.9rem', color: '#888', textAlign: 'center' }}>
                        <p>본 프로젝트는 NDA로 인해 일부 정보만 공개되었습니다. 구조와 접근 방식 중심으로 정리되어 있습니다.</p>
                    </div>
                )}

                {/* 8. Navigation */}
                <nav className={styles.nav}>
                    <Link href="/projects" className={styles.backBtn}>
                        ← Back to List
                    </Link>
                    {/* Logic for Next Project can be added here */}
                </nav>
            </article>
        </main>
    );
}
