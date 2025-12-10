'use client'

import styles from './SkillFlow.module.css'
import {
    SiNextdotjs, SiFastapi, SiPython, SiSupabase, SiTypescript,
    SiOpenai, SiNodedotjs, SiThreedotjs, SiTailwindcss, SiDocker,
    SiAmazon, SiLangchain
} from 'react-icons/si'
import { FaReact, FaRobot } from 'react-icons/fa'
import { BsChatSquareText } from 'react-icons/bs'
import { BiAtom } from 'react-icons/bi'

const skills = [
    { name: "Next.js", icon: SiNextdotjs },
    { name: "React", icon: FaReact },
    { name: "FastAPI", icon: SiFastapi },
    { name: "Python", icon: SiPython },
    { name: "Supabase", icon: SiSupabase },
    { name: "TypeScript", icon: SiTypescript },
    { name: "GPT API", icon: SiOpenai },
    { name: "LangChain", icon: SiLangchain },
    { name: "Node.js", icon: SiNodedotjs },
    { name: "Three.js", icon: SiThreedotjs },
    { name: "Recoil", icon: BiAtom },
    { name: "TailwindCSS", icon: SiTailwindcss },
    { name: "Docker", icon: SiDocker },
    { name: "AWS", icon: SiAmazon },
    { name: "Automation", icon: FaRobot },
    { name: "Prompt Engineering", icon: BsChatSquareText }
]

export default function SkillFlow() {
    return (
        <div className={styles.container}>
            <div className={styles.track}>
                {/* Double the list for seamless scrolling */}
                {[...skills, ...skills].map((skill, i) => (
                    <div key={i} className={styles.item}>
                        <span className={styles.iconWrapper}>
                            <skill.icon size={20} />
                        </span>
                        {skill.name}
                    </div>
                ))}
            </div>
        </div>
    )
}
