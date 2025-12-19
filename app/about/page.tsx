import styles from './page.module.css'
import Timeline from '@/components/dom/Timeline'
import Intro from '@/components/dom/Intro'
import Perspective from '@/components/dom/Perspective'
import Closing from '@/components/dom/Closing'

export default function AboutPage() {
    return (
        <main className={styles.main}>
            <Intro />

            <Perspective />

            <section className={styles.section}>
                <Timeline />
            </section>

            <Closing />
        </main>
    )
}
