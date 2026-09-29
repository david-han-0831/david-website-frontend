import { useId } from 'react'
import type { Category } from '@/data/projects'
import s from './Work.module.css'

// NDA 로 화면을 공개할 수 없어, 분야별 화면 구조를 설계선으로 그린다
export default function WorkThumb({ category }: { category: Category }) {
    const gridId = 'tg' + useId().replace(/[^a-zA-Z0-9]/g, '')
    return (
        <svg className={s.thumbSvg} viewBox="0 0 320 200" aria-hidden>
            <defs>
                <pattern id={gridId} width="16" height="16" patternUnits="userSpaceOnUse">
                    <path d="M16 0H0V16" fill="none" className={s.thumbGrid} />
                </pattern>
            </defs>
            <rect width="320" height="200" fill={`url(#${gridId})`} />
            {category === 'Platform' && <Platform />}
            {category === 'AI' && <Vision />}
            {category === 'Enterprise' && <Terminal />}
            {category === 'Mobile' && <Phones />}
        </svg>
    )
}

const Platform = () => (
    <g className={s.thumbLines}>
        <rect x="36" y="28" width="248" height="150" rx="8" />
        <path d="M36 44H284" />
        <circle cx="46" cy="36" r="2" />
        <circle cx="54" cy="36" r="2" />
        <circle cx="62" cy="36" r="2" />
        <rect x="46" y="54" width="44" height="114" rx="4" />
        <rect x="100" y="54" width="174" height="22" rx="4" />
        <rect x="100" y="84" width="54" height="34" rx="4" />
        <rect x="160" y="84" width="54" height="34" rx="4" />
        <rect x="220" y="84" width="54" height="34" rx="4" className={s.thumbAccent} />
        <rect x="100" y="126" width="174" height="42" rx="4" />
        <path d="M108 158 L130 148 L150 152 L172 138 L196 142 L220 132 L246 136 L266 128" className={s.thumbStroke} />
    </g>
)

const Vision = () => (
    <g className={s.thumbLines}>
        <rect x="60" y="24" width="200" height="156" rx="8" />
        <rect x="118" y="40" width="84" height="128" className={s.thumbDash} />
        <g className={s.thumbStroke}>
            <path d="M160 62 L160 104 M160 72 L138 90 L128 112 M160 72 L184 86 L198 70 M160 104 L146 132 L140 160 M160 104 L176 132 L186 158" />
        </g>
        {[
            [160, 56],
            [160, 72],
            [138, 90],
            [128, 112],
            [184, 86],
            [198, 70],
            [160, 104],
            [146, 132],
            [140, 160],
            [176, 132],
            [186, 158],
        ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="3" className={s.thumbDot} />
        ))}
        <rect x="206" y="40" width="46" height="14" rx="3" className={s.thumbAccent} />
    </g>
)

const Terminal = () => (
    <g className={s.thumbLines}>
        <rect x="28" y="30" width="170" height="140" rx="8" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
            <path key={i} d={`M28 ${54 + i * 20}H198`} />
        ))}
        <path d="M84 30V170 M142 30V170" />
        <rect x="210" y="30" width="82" height="140" rx="8" />
        <rect x="218" y="40" width="66" height="26" rx="3" className={s.thumbAccent} />
        {[0, 1, 2].map((r) =>
            [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={218 + c * 23} y={74 + r * 24} width="18" height="18" rx="3" />),
        )}
        <rect x="218" y="146" width="64" height="16" rx="3" />
    </g>
)

const Phones = () => (
    <g className={s.thumbLines}>
        <rect x="92" y="22" width="72" height="156" rx="12" />
        <rect x="170" y="36" width="72" height="142" rx="12" />
        <path d="M118 30H138" />
        <rect x="100" y="42" width="56" height="48" rx="4" className={s.thumbAccent} />
        <rect x="100" y="98" width="56" height="10" rx="3" />
        <rect x="100" y="114" width="40" height="10" rx="3" />
        <rect x="100" y="150" width="56" height="18" rx="9" />
        <circle cx="206" cy="78" r="22" />
        <path d="M206 56 A22 22 0 0 1 228 78" className={s.thumbStroke} />
        <rect x="178" y="112" width="56" height="10" rx="3" />
        <rect x="178" y="128" width="56" height="10" rx="3" />
        <rect x="178" y="144" width="56" height="10" rx="3" />
    </g>
)
