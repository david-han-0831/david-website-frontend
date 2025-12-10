import styles from './page.module.css'
import Timeline from '@/components/dom/Timeline'

export default function AboutPage() {
    return (
        <main className={styles.main}>
            <section className={styles.header}>
                <h1 className={styles.title}>About Me</h1>
                <p className={styles.intro}>
                    I am a developer who teaches, and a teacher who codes. <br />
                    My journey is defined by a passion for automation, clean architecture, and sharing knowledge.
                </p>
            </section>

            <section className={styles.section}>
                <Timeline />
            </section>
        </main>
    )
}
