'use client'

import React from 'react'
import styles from './HandParticleControls.module.css'

interface HandParticleControlsProps {
    onTemplateChange: (template: 'hearts' | 'flowers' | 'saturn' | 'fireworks') => void
    onColorChange: (color: string) => void
    onToggleCamera: () => void
    currentTemplate: string
    currentColor: string
    showCamera: boolean
}

export default function HandParticleControls({
    onTemplateChange,
    onColorChange,
    onToggleCamera,
    currentTemplate,
    currentColor,
    showCamera
}: HandParticleControlsProps) {

    const templates = [
        { id: 'hearts', label: 'Hearts' },
        { id: 'flowers', label: 'Flowers' },
        { id: 'saturn', label: 'Saturn' },
        { id: 'fireworks', label: 'Fireworks' },
    ]

    const colors = [
        '#00ffff', // Cyan
        '#ff00ff', // Magenta
        '#ffff00', // Yellow
        '#ff0000', // Red
        '#00ff00', // Green
        '#ffffff', // White
    ]

    return (
        <div className={styles.controlsContainer}>
            <div className={styles.glassPanel}>
                <h3 className={styles.title}>Magic Particles</h3>

                <div className={styles.section}>
                    <span className={styles.label}>Mode</span>
                    <div className={styles.templateGrid}>
                        {templates.map((t) => (
                            <button
                                key={t.id}
                                onClick={() => onTemplateChange(t.id as any)}
                                className={`${styles.templateBtn} ${currentTemplate === t.id ? styles.active : ''}`}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.section}>
                    <span className={styles.label}>Color</span>
                    <div className={styles.colorGrid}>
                        {colors.map((c) => (
                            <button
                                key={c}
                                onClick={() => onColorChange(c)}
                                className={`${styles.colorBtn} ${currentColor === c ? styles.activeColor : ''}`}
                                style={{ backgroundColor: c }}
                                aria-label={`Select color ${c}`}
                            />
                        ))}
                    </div>
                </div>
                <div className={styles.section}>
                    <button
                        onClick={onToggleCamera}
                        className={styles.templateBtn}
                        style={{ width: '100%', marginTop: '0.5rem', background: showCamera ? 'rgba(255, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.1)' }}
                    >
                        {showCamera ? 'Hide Camera' : 'Show Camera / Debug'}
                    </button>
                </div>
            </div>
        </div>
    )
}
