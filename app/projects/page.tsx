'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { PROJECTS, Category } from '@/data/projects';
import ProjectFilter from '@/components/dom/projects/ProjectFilter';
import ProjectCard from '@/components/dom/projects/ProjectCard';
import styles from './page.module.css';
import { useLanguage } from '@/contexts/LanguageContext';

const ITEMS_PER_PAGE = 6;

export default function ProjectsPage() {
    const { t } = useLanguage();
    const containerRef = useRef<HTMLElement>(null);
    const heroRef = useRef<HTMLElement>(null);
    const loadMoreRef = useRef<HTMLDivElement>(null);
    const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
    const [selectedYear, setSelectedYear] = useState<string | 'All'>('All');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
    const [isLoading, setIsLoading] = useState(false);
    
    // Get current year dynamically
    const currentYear = new Date().getFullYear();
    const yearRange = `2015-${currentYear}`;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 0.2], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

    // Mouse Spotlight Effect
    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        if (!heroRef.current) return;
        const { left, top } = heroRef.current.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        heroRef.current.style.setProperty('--mouse-x', `${x}px`);
        heroRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

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
            // 2. Year Filter
            if (selectedYear !== 'All') {
                const projectYear = project.year;
                const selectedYearNum = parseInt(selectedYear);
                
                // Check if project year matches or is in range
                if (projectYear.includes('–') || projectYear.includes('-')) {
                    // Handle range like "2015–2020"
                    const parts = projectYear.split(/[–-]/).map(s => s.trim());
                    if (parts.length === 2) {
                        const startYear = parseInt(parts[0]);
                        const endYear = parseInt(parts[1]);
                        if (isNaN(startYear) || isNaN(endYear) || 
                            selectedYearNum < startYear || selectedYearNum > endYear) {
                            return false;
                        }
                    }
                } else {
                    // Single year
                    const projectYearNum = parseInt(projectYear);
                    if (isNaN(projectYearNum) || projectYearNum !== selectedYearNum) {
                        return false;
                    }
                }
            }
            // 3. Tech Stack Filter (AND Logic: Project must have ALL selected tags)
            if (selectedTags.length > 0) {
                const hasAllTags = selectedTags.every((tag) => project.techStack.includes(tag));
                if (!hasAllTags) return false;
            }
            return true;
        });
    }, [selectedCategory, selectedYear, selectedTags]);

    // Reset visible count when filters change
    useEffect(() => {
        setVisibleCount(ITEMS_PER_PAGE);
    }, [selectedCategory, selectedYear, selectedTags]);

    // Infinite Scroll with Intersection Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const firstEntry = entries[0];
                if (firstEntry.isIntersecting && !isLoading) {
                    setIsLoading(true);
                    // Simulate loading delay for smooth experience
                    setTimeout(() => {
                        setVisibleCount((prev) => {
                            const newCount = prev + ITEMS_PER_PAGE;
                            setIsLoading(false);
                            return newCount;
                        });
                    }, 300);
                }
            },
            {
                root: null,
                rootMargin: '200px', // Start loading before reaching the bottom
                threshold: 0.1,
            }
        );

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => {
            if (loadMoreRef.current) {
                observer.unobserve(loadMoreRef.current);
            }
        };
    }, [isLoading, filteredProjects.length, visibleCount]);

    const visibleProjects = useMemo(() => {
        return filteredProjects.slice(0, visibleCount);
    }, [filteredProjects, visibleCount]);

    const hasMore = visibleCount < filteredProjects.length;

    // Project statistics
    const totalProjects = PROJECTS.length;
    const categories = [...new Set(PROJECTS.map(p => p.category))].length;

    return (
        <main className={styles.main} ref={containerRef}>
            {/* Hero Section */}
            <section 
                className={styles.heroTextSection}
                ref={heroRef}
                onMouseMove={handleMouseMove}
            >
                {/* Grid Background */}
                <div className={styles.heroBackground}></div>

                {/* Spotlight Overlay */}
                <div className={styles.spotlightOverlay}></div>

                {/* Foreground Content */}
                <motion.div
                    className={styles.heroContent}
                    style={{ y, opacity }}
                >
                    <motion.h1 
                        className={styles.heroTitle}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {t?.project_page?.title || 'Projects'}
                    </motion.h1>
                    <motion.p 
                        className={styles.heroSubtitle}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        {t?.project_page?.subtitle?.replace('{currentYear}', currentYear.toString()) || `Selected works and experiments from ${yearRange}.`}
                    </motion.p>
                    
                    {/* Project Stats */}
                    <motion.div 
                        className={styles.projectStats}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    >
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>{totalProjects}+</span>
                            <span className={styles.statLabel}>{t?.project_page?.projects || 'Projects'}</span>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>{categories}</span>
                            <span className={styles.statLabel}>{t?.project_page?.categories || 'Categories'}</span>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>{yearRange}</span>
                            <span className={styles.statLabel}>{t?.project_page?.years || 'Years'}</span>
                        </div>
                    </motion.div>

                    <div className={styles.scrollIndicator}>
                        <span>{t?.project_page?.scroll_to_explore || 'SCROLL TO EXPLORE'}</span>
                        <div className={styles.scrollLine}></div>
                    </div>
                </motion.div>
            </section>

            {/* Content Section */}
            <section className={styles.contentSection}>
                <div className={styles.contentContainer}>
                    <ProjectFilter
                        selectedCategory={selectedCategory}
                        selectedYear={selectedYear}
                        selectedTags={selectedTags}
                        onSelectCategory={setSelectedCategory}
                        onSelectYear={setSelectedYear}
                        onToggleTag={toggleTag}
                    />

                    <div className={styles.projectGridWrapper}>
                        <motion.div
                            className={styles.projectGrid}
                            layout
                        >
                            <AnimatePresence mode='popLayout'>
                                {visibleProjects.length > 0 ? (
                                    visibleProjects.map((project, index) => (
                                        <motion.div
                                            key={project.id}
                                            layout
                                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{
                                                duration: 0.5,
                                                delay: (index % ITEMS_PER_PAGE) * 0.05, // Stagger effect within each batch
                                                ease: [0.25, 0.46, 0.45, 0.94]
                                            }}
                                            whileHover={{
                                                scale: 1.02,
                                                zIndex: 10,
                                                transition: { duration: 0.2 }
                                            }}
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
                                                setSelectedYear('All');
                                                setSelectedTags([]);
                                            }}
                                        >
                                            {t?.project_page?.reset || 'Reset Filters'}
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Infinite Scroll Observer Target */}
                        {hasMore && (
                            <div ref={loadMoreRef} className={styles.observerTarget}>
                                {isLoading && (
                                    <motion.div
                                        className={styles.loadingIndicator}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <div className={styles.loadingSpinner}></div>
                                        <span className={styles.loadingText}>
                                            {t?.project_page?.loading || 'Loading more projects...'}
                                        </span>
                                    </motion.div>
                                )}
                            </div>
                        )}

                        {/* All Projects Loaded Indicator */}
                        {!hasMore && filteredProjects.length > ITEMS_PER_PAGE && (
                            <motion.div
                                className={styles.allLoadedIndicator}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <p>{t?.project_page?.allLoaded || 'All projects loaded'}</p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
