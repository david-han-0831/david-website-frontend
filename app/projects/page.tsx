'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS, Category } from '@/data/projects';
import ProjectFilter from '@/components/dom/projects/ProjectFilter';
import ProjectCard from '@/components/dom/projects/ProjectCard';
import styles from './page.module.css';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ProjectsPage() {
    const { t } = useLanguage();
    const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const filteredProjects = useMemo(() => {
        return PROJECTS.filter((project) => {
            // 1. Category Filter
            if (selectedCategory !== 'All' && project.category !== selectedCategory) {
                return false;
            }
            // 2. Tech Stack Filter (AND Logic: Project must have ALL selected tags)
            if (selectedTags.length > 0) {
                const hasAllTags = selectedTags.every((tag) => project.techStack.includes(tag));
                if (!hasAllTags) return false;
            }
            return true;
        });
    }, [selectedCategory, selectedTags]);

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className={styles.title}>{t?.project_page?.title || 'Projects'}</h1>
                        <p className={styles.description}>
                            {t?.project_page?.subtitle || 'Selected works and experiments from 2021-2025.'}
                        </p>
                    </motion.div>
                </header>

                <ProjectFilter
                    selectedCategory={selectedCategory}
                    selectedTags={selectedTags}
                    onSelectCategory={setSelectedCategory}
                    onToggleTag={toggleTag}
                />

                <motion.div
                    className={styles.projectGrid}
                    layout
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map((project) => (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ProjectCard project={project} />
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                className={styles.emptyState}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <p>{t?.project_page?.empty || 'No projects match the selected filters.'}</p>
                                <button
                                    className={styles.resetBtn}
                                    onClick={() => {
                                        setSelectedCategory('All');
                                        setSelectedTags([]);
                                    }}
                                >
                                    {t?.project_page?.reset || 'Reset Filters'}
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </main>
    );
}
