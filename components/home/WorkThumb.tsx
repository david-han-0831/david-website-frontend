import { useId } from 'react'
import s from './WorkThumb.module.css'

export type ThumbVariant = 'market' | 'pos' | 'exam' | 'vision' | 'coach' | 'gallery' | 'phones' | 'sheet'

// NDA 로 화면을 공개할 수 없어, 프로젝트마다 화면 구조를 설계선으로 그린다
export default function WorkThumb({ variant }: { variant: ThumbVariant }) {
    const gridId = 'tg' + useId().replace(/[^a-zA-Z0-9]/g, '')
    const Art = ART[variant]
    return (
        <svg className={s.thumbSvg} viewBox="0 0 320 200" aria-hidden>
            <defs>
                <pattern id={gridId} width="16" height="16" patternUnits="userSpaceOnUse">
                    <path d="M16 0H0V16" fill="none" className={s.thumbGrid} />
                </pattern>
            </defs>
            <rect width="320" height="200" fill={`url(#${gridId})`} />
            <g className={s.thumbLines}>
                <Art />
            </g>
        </svg>
    )
}

const range = (n: number) => Array.from({ length: n }, (_, i) => i)

// 거래 플랫폼: 상품 카드 목록 + 견적 패널
const Market = () => (
    <>
        <rect x="28" y="26" width="264" height="150" rx="8" />
        <path d="M28 44H292" />
        {range(3).map((i) => (
            <g key={i}>
                <rect x={40 + i * 60} y="56" width="50" height="40" rx="4" />
                <rect x={40 + i * 60} y="102" width="34" height="6" rx="3" />
                <rect x={40 + i * 60} y="114" width="22" height="6" rx="3" className={s.thumbAccent} />
            </g>
        ))}
        <rect x="224" y="56" width="56" height="108" rx="6" />
        <rect x="232" y="66" width="40" height="6" rx="3" />
        <path d="M232 90H272 M232 102H272 M232 114H262" />
        <rect x="232" y="142" width="40" height="14" rx="7" className={s.thumbAccent} />
        <rect x="40" y="132" width="170" height="32" rx="4" />
        <path d="M50 154 L80 146 L110 150 L140 140 L170 144 L200 136" className={s.thumbStroke} />
    </>
)

// POS: 주문 목록 + 결제 키패드
const Pos = () => (
    <>
        <rect x="28" y="30" width="170" height="140" rx="8" />
        {range(6).map((i) => (
            <path key={i} d={`M28 ${54 + i * 20}H198`} />
        ))}
        <path d="M84 30V170 M142 30V170" />
        <rect x="210" y="30" width="82" height="140" rx="8" />
        <rect x="218" y="40" width="66" height="26" rx="3" className={s.thumbAccent} />
        {range(3).map((r) => range(3).map((c) => <rect key={`${r}${c}`} x={218 + c * 23} y={74 + r * 24} width="18" height="18" rx="3" />))}
        <rect x="218" y="146" width="64" height="16" rx="3" />
    </>
)

// 온라인 시험: 문제 카드 + 보기 + 남은 시간
const Exam = () => (
    <>
        <rect x="40" y="24" width="240" height="152" rx="8" />
        <rect x="56" y="40" width="120" height="8" rx="4" />
        <rect x="56" y="56" width="170" height="6" rx="3" />
        {range(4).map((i) => (
            <g key={i}>
                <circle cx="64" cy={86 + i * 20} r="5" className={i === 2 ? s.thumbAccent : undefined} />
                <rect x="76" y={82 + i * 20} width={90 + ((i * 37) % 50)} height="8" rx="4" className={i === 2 ? s.thumbAccent : undefined} />
            </g>
        ))}
        <circle cx="244" cy="58" r="18" />
        <path d="M244 40 A18 18 0 1 1 226 58" className={s.thumbStroke} />
        <rect x="216" y="148" width="48" height="16" rx="8" />
    </>
)

// 슛폼 분석: 관절 추적 + 공 궤적
const JOINTS = [
    [150, 58],
    [150, 74],
    [128, 92],
    [118, 114],
    [174, 88],
    [188, 66],
    [150, 106],
    [136, 134],
    [130, 162],
    [166, 134],
    [176, 160],
]
const Vision = () => (
    <>
        <rect x="48" y="24" width="224" height="156" rx="8" />
        <rect x="108" y="42" width="84" height="128" className={s.thumbDash} />
        <path
            className={s.thumbStroke}
            d="M150 64 L150 106 M150 74 L128 92 L118 114 M150 74 L174 88 L188 66 M150 106 L136 134 L130 162 M150 106 L166 134 L176 160"
        />
        <path d="M192 60 Q226 18 254 52" className={s.thumbDash} />
        <circle cx="254" cy="56" r="6" />
        {JOINTS.map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="3" className={s.thumbDot} />
        ))}
        <rect x="200" y="148" width="60" height="14" rx="3" className={s.thumbAccent} />
    </>
)

// 트레이닝 관리: 주간 일정표 + 컨디션 게이지 + 부하 그래프
const Coach = () => (
    <>
        <rect x="28" y="26" width="264" height="150" rx="8" />
        {range(7).map((c) => (
            <g key={c}>
                <rect x={40 + c * 26} y="40" width="20" height="6" rx="3" />
                {range(3).map((r) => (
                    <rect
                        key={r}
                        x={40 + c * 26}
                        y={54 + r * 18}
                        width="20"
                        height="12"
                        rx="3"
                        className={(c + r * 2) % 5 === 0 ? s.thumbAccent : undefined}
                    />
                ))}
            </g>
        ))}
        <rect x="228" y="40" width="52" height="66" rx="6" />
        <circle cx="254" cy="72" r="14" />
        <path d="M254 58 A14 14 0 0 1 266 79" className={s.thumbStroke} />
        <rect x="40" y="116" width="240" height="48" rx="4" />
        <path d="M50 150 L80 138 L110 144 L140 126 L170 132 L200 122 L230 130 L270 120" className={s.thumbStroke} />
    </>
)

// 문화예술 플랫폼: 공연 포스터 갤러리
const POSTERS = [
    [40, 54, 58, 78],
    [106, 54, 58, 50],
    [172, 54, 58, 78],
    [238, 54, 42, 50],
    [106, 112, 58, 52],
    [238, 112, 42, 52],
]
const Gallery = () => (
    <>
        <rect x="28" y="24" width="264" height="152" rx="8" />
        <rect x="40" y="36" width="80" height="8" rx="4" />
        {POSTERS.map(([x, y, w, h], i) => (
            <rect key={i} x={x} y={y} width={w} height={h} rx="4" className={i === 2 ? s.thumbAccent : undefined} />
        ))}
        <rect x="40" y="140" width="58" height="8" rx="4" />
        <rect x="40" y="154" width="40" height="8" rx="4" />
        <rect x="172" y="140" width="58" height="8" rx="4" />
        <rect x="172" y="154" width="40" height="8" rx="4" />
    </>
)

// 비대면 진료: 환자 앱 + 예약 현황 앱
const Phones = () => (
    <>
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
    </>
)

// ERP·HR: 인사 테이블 + 정산 요약 막대
const Sheet = () => (
    <>
        <rect x="28" y="26" width="264" height="150" rx="8" />
        <rect x="28" y="26" width="264" height="20" rx="8" className={s.thumbAccent} />
        {range(6).map((i) => (
            <path key={i} d={`M28 ${66 + i * 18}H200`} />
        ))}
        <path d="M76 46V176 M124 46V176 M162 46V176 M200 46V176" />
        {[46, 74, 58, 90].map((h, i) => (
            <rect key={i} x={214 + i * 18} y={164 - h} width="10" height={h} rx="2" className={i === 3 ? s.thumbAccent : undefined} />
        ))}
    </>
)

const ART: Record<ThumbVariant, () => React.JSX.Element> = {
    market: Market,
    pos: Pos,
    exam: Exam,
    vision: Vision,
    coach: Coach,
    gallery: Gallery,
    phones: Phones,
    sheet: Sheet,
}
