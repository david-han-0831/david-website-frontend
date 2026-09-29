'use client'

import { useId } from 'react'
import { Check, LockSimple, DownloadSimple } from '@phosphor-icons/react'
import clsx from 'clsx'
import s from './BuildStage.module.css'

type AppCopy = {
    title: string
    action: string
    kpis: string[]
    chart: string
    list: string
    url: string
    deployed: string
}

const KPI_VALUES = [
    { value: '48.2K', delta: '+12.4%' },
    { value: '1,284', delta: '+8.1%' },
    { value: '3.8%', delta: '+0.6p' },
]
const BARS = [38, 52, 44, 61, 57, 72, 66, 80, 74, 88, 83, 96]
const ORDERS = [
    { id: '#1042', amount: '128,000' },
    { id: '#1041', amount: '64,500' },
    { id: '#1040', amount: '212,000' },
    { id: '#1039', amount: '39,900' },
]
// 블록마다 설계 단계에서 붙는 치수 주석
const TAGS = { side: '240', head: 'H1 · 28/1.2', kpi: 'col-4 × 3', chart: 'col-8', list: 'col-4' }

// 설계선 → 스켈레톤 → 완성 화면을 겹쳐 두고, 부모 타임라인이 레이어 투명도를 바꾼다
function Block({
    className,
    tag,
    skeleton,
    children,
}: {
    className?: string
    tag?: string
    skeleton?: React.ReactNode
    children: React.ReactNode
}) {
    return (
        <div className={clsx(s.blk, className)}>
            <span className={s.surface} />
            <span className={s.outline} />
            {tag && <span className={s.tag}>{tag}</span>}
            <div className={s.sk} aria-hidden>
                {skeleton}
            </div>
            <div className={s.real}>{children}</div>
        </div>
    )
}

const Bars = ({ n, widths }: { n: number; widths?: string[] }) => (
    <>
        {Array.from({ length: n }, (_, i) => (
            <i key={i} style={{ width: widths?.[i % widths.length] ?? '100%' }} />
        ))}
    </>
)

export default function BuildStage({ app }: { app: AppCopy }) {
    const clipId = 'trend' + useId().replace(/[^a-zA-Z0-9]/g, '')
    return (
        <div className={s.stage} aria-hidden>
            <div className={s.chrome}>
                <span className={s.dots}>
                    <i />
                    <i />
                    <i />
                </span>
                <span className={s.address}>
                    <LockSimple size={11} weight="bold" />
                    <span className={s.url}>{app.url}</span>
                </span>
                <span className={s.live}>
                    <i />
                    {app.deployed}
                </span>
            </div>

            <div className={s.canvas}>
                <div className={s.grid} />

                <div className={s.app}>
                    <Block className={s.side} tag={TAGS.side} skeleton={<Bars n={5} widths={['70%', '55%', '62%', '48%', '58%']} />}>
                        <span className={s.logo} />
                        {[0, 1, 2, 3, 4].map((i) => (
                            <span key={i} className={clsx(s.navItem, i === 0 && s.navActive)}>
                                <i />
                                <b />
                            </span>
                        ))}
                    </Block>

                    <div className={s.main}>
                        <Block className={s.head} tag={TAGS.head} skeleton={<Bars n={1} widths={['32%']} />}>
                            <span className={s.headTitle}>{app.title}</span>
                            <span className={s.button} data-stage="button">
                                <DownloadSimple size={12} weight="bold" />
                                {app.action}
                            </span>
                        </Block>

                        <div className={s.kpis}>
                            {app.kpis.map((label, i) => (
                                <Block
                                    key={label}
                                    className={s.kpi}
                                    tag={i === 0 ? TAGS.kpi : undefined}
                                    skeleton={<Bars n={2} widths={['45%', '70%']} />}
                                >
                                    <span className={s.kpiLabel}>{label}</span>
                                    <span className={s.kpiValue}>{KPI_VALUES[i].value}</span>
                                    <span className={s.kpiDelta}>{KPI_VALUES[i].delta}</span>
                                </Block>
                            ))}
                        </div>

                        <div className={s.content}>
                            <Block className={s.chart} tag={TAGS.chart} skeleton={<Bars n={1} widths={['30%']} />}>
                                <span className={s.cardTitle}>{app.chart}</span>
                                <svg className={s.chartSvg} viewBox="0 0 300 120" preserveAspectRatio="none">
                                    {BARS.map((v, i) => (
                                        // 막대는 높이 0 에서 시작해 data-* 값까지 자란다
                                        <rect key={i} className={s.bar} x={i * 25 + 4} y={120} width={15} height={0} rx={2} data-y={120 - v} data-h={v} />
                                    ))}
                                    <clipPath id={clipId}>
                                        <rect className={s.trendClip} x={0} y={0} width={0} height={120} />
                                    </clipPath>
                                    <path
                                        className={s.trend}
                                        clipPath={`url(#${clipId})`}
                                        d={`M ${BARS.map((v, i) => `${i * 25 + 11.5} ${120 - v - 10}`).join(' L ')}`}
                                    />
                                </svg>
                            </Block>

                            <Block className={s.list} tag={TAGS.list} skeleton={<Bars n={4} widths={['80%', '65%', '75%', '60%']} />}>
                                <span className={s.cardTitle}>{app.list}</span>
                                {ORDERS.map((o) => (
                                    <span key={o.id} className={s.row}>
                                        <span className={s.rowId}>{o.id}</span>
                                        <span className={s.rowAmount}>{o.amount}</span>
                                        <span className={s.rowOk}>
                                            <Check size={9} weight="bold" />
                                        </span>
                                    </span>
                                ))}
                            </Block>
                        </div>
                    </div>
                </div>

                <svg className={s.cursor} viewBox="0 0 24 24" width="22" height="22">
                    <path d="M4 2 L4 19 L8.5 14.8 L11.6 21.5 L14.4 20.3 L11.4 13.7 L17.5 13.7 Z" />
                </svg>
            </div>
        </div>
    )
}

// 타임라인이 참조할 선택자 모음
export const stageSel = {
    grid: `.${s.grid}`,
    outline: `.${s.outline}`,
    tag: `.${s.tag}`,
    sk: `.${s.sk}`,
    real: `.${s.real}`,
    surface: `.${s.surface}`,
    bar: `.${s.bar}`,
    trendClip: `.${s.trendClip}`,
    url: `.${s.url}`,
    live: `.${s.live}`,
    cursor: `.${s.cursor}`,
    button: `.${s.button}`,
    stage: `.${s.stage}`,
    canvas: `.${s.canvas}`,
}
