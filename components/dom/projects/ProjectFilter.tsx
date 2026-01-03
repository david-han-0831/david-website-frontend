import { CATEGORIES, Category, TECH_STACKS, getAvailableYears } from '@/data/projects';
import styles from './ProjectFilter.module.css';
import { useLanguage } from '@/contexts/LanguageContext';
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

interface ProjectFilterProps {
    selectedCategory: Category | 'All';
    selectedYear: string | 'All';
    selectedTags: string[];
    onSelectCategory: (category: Category | 'All') => void;
    onSelectYear: (year: string | 'All') => void;
    onToggleTag: (tag: string) => void;
}

export default function ProjectFilter({
    selectedCategory,
    selectedYear,
    selectedTags,
    onSelectCategory,
    onSelectYear,
    onToggleTag,
}: ProjectFilterProps) {
    const { t } = useLanguage();
    const availableYears = getAvailableYears();

    return (
        <div className={styles.filterContainer}>
            {/* Category Filter */}
            <div className={styles.categoryGroup}>
                <button
                    className={`${styles.categoryBtn} ${selectedCategory === 'All' ? styles.active : ''}`}
                    onClick={() => onSelectCategory('All')}
                >
                    {t?.project_page?.all || 'All'}
                </button>
                {CATEGORIES.map((category) => (
                    <button
                        key={category}
                        className={`${styles.categoryBtn} ${selectedCategory === category ? styles.active : ''}`}
                        onClick={() => onSelectCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Year Filter */}
            <div className={styles.yearGroup}>
                <span className={styles.filterLabel}>{t?.project_page?.year || 'Year:'}</span>
                <div className={styles.yearButtons}>
                    <button
                        className={`${styles.yearBtn} ${selectedYear === 'All' ? styles.active : ''}`}
                        onClick={() => onSelectYear('All')}
                    >
                        {t?.project_page?.all || 'All'}
                    </button>
                    {availableYears.map((year) => (
                        <button
                            key={year}
                            className={`${styles.yearBtn} ${selectedYear === year ? styles.active : ''}`}
                            onClick={() => onSelectYear(year)}
                        >
                            {year}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tech Stack Filter */}
            <div className={styles.techStackGroup}>
                <span className={styles.filterLabel}>{t?.project_page?.tech_stack || 'Tech Stack:'}</span>
                <div className={styles.tagCloud}>
                    {TECH_STACKS.map((tech) => {
                        const Icon = (iconMap as any)[tech] || FaCode;
                        const brandColor = (brandColors as any)[tech] || '#ccc';
                        return (
                            <button
                                key={tech}
                                className={`${styles.techTag} ${selectedTags.includes(tech) ? styles.activeTag : ''}`}
                                onClick={() => onToggleTag(tech)}
                            >
                                <Icon className={styles.techTagIcon} style={{ color: brandColor }} />
                                {tech}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
