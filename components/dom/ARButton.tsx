'use client'

import styles from './ARButton.module.css'

export default function ARButton() {
    const handleARClick = () => {
        alert("AR Mode: Point your camera to see the Tech Sphere in your room! (Mock Interaction)")
    }

    return (
        <div className={styles.arWrapper}>
            <span className={styles.tooltip}>View in AR (Developing)</span>
            <button className={styles.arButton} onClick={handleARClick} aria-label="View in AR">
                <span>🧊</span>
            </button>
        </div>
    )
}
