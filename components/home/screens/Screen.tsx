import './screens.css'
import { SCREENS, type ScreenKey } from './markup'

// 원본 크기로 그린 화면을 주어진 폭에 맞춰 축소한다
export default function Screen({ name, width, offsetY = 0 }: { name: ScreenKey; width: number; offsetY?: number }) {
    const s = SCREENS[name]
    const scale = width / s.w
    return (
        <div className="ws" style={{ width, height: s.h * scale + offsetY, overflow: 'hidden' }} aria-hidden>
            <div
                style={{ width: s.w, transform: `translateY(${offsetY}px) scale(${scale})`, transformOrigin: '0 0' }}
                // 고정 마크업 문자열 (markup.ts) — 외부 입력이 섞이지 않는다
                dangerouslySetInnerHTML={{ __html: s.html }}
            />
        </div>
    )
}
