import styles from './reel.module.css'

const STACK = [
    'Next.js', 'FastAPI', 'Python', 'TypeScript', 'Supabase', 'GPT API', 'LangChain',
    'React', 'Node.js', 'Flutter', 'Docker', 'AWS', 'PostgreSQL', 'OpenCV',
]

export default function TechMarquee() {
    return (
        <div className={styles.marquee}>
            <ul className={styles.marqueeTrack}>
                {[...STACK, ...STACK].map((name, i) => (
                    <li key={i} aria-hidden={i >= STACK.length || undefined}>
                        {name}
                    </li>
                ))}
            </ul>
        </div>
    )
}
