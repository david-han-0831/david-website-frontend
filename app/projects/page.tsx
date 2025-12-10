'use client'

import { useState } from 'react'
import styles from './page.module.css'
import ProjectCard from '@/components/dom/ProjectCard'
import clsx from 'clsx'

const projects = [
    { id: 1, title: 'AI Automation Platform', category: 'AI', desc: 'Enterprise automated workflow system using Python & FastAPI.', tags: ['Python', 'FastAPI', 'React'] },
    { id: 2, title: 'E-Learning Hub', category: 'Web', desc: 'Interactive learning management system for coding bootcamps.', tags: ['Next.js', 'Supabase', 'WebRTC'] },
    { id: 3, title: 'Smart Finance Dashboard', category: 'Web', desc: 'Real-time financial data visualization with D3.js.', tags: ['Vue', 'D3.js', 'Firebase'] },
    { id: 4, title: 'Portfolio VR', category: 'XR', desc: 'Experimental VR portfolio experience using WebXR.', tags: ['Three.js', 'WebXR', 'R3F'] },
]

const categories = ['All', 'Web', 'AI', 'XR']

export default function ProjectsPage() {
    const [filter, setFilter] = useState('All')

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.category === filter)

    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <h1 className={styles.title}>Projects</h1>
                <p style={{ color: 'var(--text-dim)' }}>Selected works and experiments.</p>

                <div className={styles.filters}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={clsx(styles.filterBtn, filter === cat && styles.activeFilter)}
                            onClick={() => setFilter(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </header>

            <div className={styles.grid}>
                {filteredProjects.map(p => (
                    <ProjectCard key={p.id} project={p} />
                ))}
            </div>
        </main>
    )
}
