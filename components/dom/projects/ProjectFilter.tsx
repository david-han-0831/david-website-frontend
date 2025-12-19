import { CATEGORIES, Category, TECH_STACKS } from '@/data/projects';
import styles from './ProjectFilter.module.css';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProjectFilterProps {
    selectedCategory: Category | 'All';
    selectedTags: string[];
    onSelectCategory: (category: Category | 'All') => void;
    onToggleTag: (tag: string) => void;
}

export default function ProjectFilter({
    selectedCategory,
    selectedTags,
    onSelectCategory,
    onToggleTag,
}: ProjectFilterProps) {
    const { t } = useLanguage();

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

            {/* Tech Stack Filter */}
            <div className={styles.techStackGroup}>
                <span className={styles.filterLabel}>{t?.project_page?.tech_stack || 'Tech Stack:'}</span>
                <div className={styles.tagCloud}>
                    {TECH_STACKS.map((tech) => (
                        <button
                            key={tech}
                            className={`${styles.techTag} ${selectedTags.includes(tech) ? styles.activeTag : ''}`}
                            onClick={() => onToggleTag(tech)}
                        >
                            {tech}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
