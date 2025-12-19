import { useRef } from 'react';
import { Project } from '@/data/projects';
import styles from './ProjectCard.module.css';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const { t } = useLanguage();
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        cardRef.current.style.setProperty('--mouse-x', `${x}px`);
        cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <Link href={`/projects/${project.id}`} style={{ textDecoration: 'none', display: 'block' }}>
            <div
                className={styles.card}
                ref={cardRef}
                onMouseMove={handleMouseMove}
            >
                <div className={styles.cardHeader}>
                    <div className={styles.categoryBadge}>{project.category}</div>
                    <span className={styles.year}>{project.year}</span>
                </div>

                <div className={styles.content}>
                    <h3 className={styles.title}>{project.title}</h3>
                    <p className={styles.summary}>{project.summary}</p>

                    <div className={styles.metaInfo}>
                        <div className={styles.roleWrapper}>
                            <span className={styles.label}>{t?.project_page?.role || 'Role'}</span>
                            <span className={styles.role}>{project.role}</span>
                        </div>
                    </div>

                    <div className={styles.tags}>
                        {project.techStack.slice(0, 5).map((tech) => (
                            <span key={tech} className={styles.tag}>
                                {tech}
                            </span>
                        ))}
                        {project.techStack.length > 5 && (
                            <span className={styles.moreTag}>+{project.techStack.length - 5}</span>
                        )}
                    </div>
                </div>

                <div className={styles.cardFooter}>
                    {project.nda && (
                        <div className={styles.ndaBadge} title="Partial NDA applies">
                            <span className={styles.lockIcon}>🔒</span> {t?.project_page?.nda || 'NDA (Partial)'}
                        </div>
                    )}
                </div>

                {/* Glow effect background */}
                <div className={styles.glow} />
            </div>
        </Link>
    );
}
