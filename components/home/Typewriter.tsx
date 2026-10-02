'use client'

import { useEffect, useState } from 'react'
import s from './Typewriter.module.css'

type Props = {
    lines: string[]
    /** 전체를 쓰는 데 걸리는 시간(ms) */
    total?: number
    /** 다 쓴 뒤 지우고 다시 쓰기를 반복한다 */
    loop?: boolean
    /** 반복할 때 다 쓴 상태로 머무는 시간(ms) */
    hold?: number
}

// 제목을 한 글자씩 써 내려간다.
// 아직 안 쓴 글자도 자리는 차지하게 두어(보이지만 않게) 쓰는 동안 아래 내용이 밀리지 않는다
export default function Typewriter({ lines, total = 1100, loop = false, hold = 3200 }: Props) {
    const length = lines.reduce((sum, line) => sum + line.length, 0)
    const [typed, setTyped] = useState(0)
    const [erasing, setErasing] = useState(false)
    const done = typed >= length

    useEffect(() => {
        // 움직임 최소화 설정이면 다음 프레임에 바로 전부 보여주고 멈춘다
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            const frame = requestAnimationFrame(() => setTyped(length))
            return () => cancelAnimationFrame(frame)
        }
        const step = Math.max(16, total / length)
        let delay = step
        let next = () => setTyped((n) => n + 1)
        if (erasing) {
            // 지울 때는 쓸 때보다 빠르게
            delay = step / 2.5
            next = () => (typed <= 0 ? setErasing(false) : setTyped((n) => n - 1))
        } else if (typed >= length) {
            if (!loop) return
            delay = hold
            next = () => setErasing(true)
        } else if (typed === 0) {
            delay = 350
        }
        const timer = setTimeout(next, delay)
        return () => clearTimeout(timer)
    }, [typed, erasing, length, total, loop, hold])

    return (
        <>
            {lines.map((line, i) => {
                // 이 줄 앞까지의 글자 수
                const before = lines.slice(0, i).reduce((sum, prev) => sum + prev.length, 0)
                const shown = Math.max(0, Math.min(line.length, typed - before))
                // 커서는 지금 쓰고 있는 줄 끝에 둔다 (다 쓴 뒤에는 마지막 줄 끝)
                const here = typed >= before && (typed < before + line.length || before + line.length === length)
                return (
                    <span key={line} className={s.line} aria-label={line}>
                        <span aria-hidden>{line.slice(0, shown)}</span>
                        {here && (
                            <span
                                className={s.cursor}
                                data-state={done && !erasing ? (loop ? 'hold' : 'done') : undefined}
                                aria-hidden
                            />
                        )}
                        <span className={s.rest} aria-hidden>
                            {line.slice(shown)}
                        </span>
                    </span>
                )
            })}
        </>
    )
}
