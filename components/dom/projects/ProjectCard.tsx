import { useRef } from 'react';
import { Project } from '@/data/projects';
import styles from './ProjectCard.module.css';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
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

// Icon Mapping (same as skills page)
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

// Brand Colors (same as skills page)
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
    'Git/GitHub': '#F05032',
    'VSCode': '#007ACC',
    'IntelliJ': '#FE315D',
    'Slack': '#4A154B',
    'Notion': '#fff',
    'Postman': '#FF6C37',
    'Figma': '#F24E1E',
    'Google Colab': '#F9AB00',
    'Stripe': '#635BFF',
    'Streamlit': '#FF4B4B'
};

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
                        {project.techStack.slice(0, 5).map((tech) => {
                            const Icon = (iconMap as any)[tech] || FaCode;
                            const brandColor = (brandColors as any)[tech] || '#ccc';
                            return (
                                <span key={tech} className={styles.tag}>
                                    <Icon className={styles.tagIcon} style={{ color: brandColor }} />
                                    {tech}
                                </span>
                            );
                        })}
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
