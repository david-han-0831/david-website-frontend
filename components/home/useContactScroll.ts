'use client'

import { useLenis } from 'lenis/react'

// 문의 초안 영역이 미리 고를 항목을 전달받는 이벤트 이름
export const BRIEF_PRESET_EVENT = 'brief:preset'
// EndCard 의 "무엇을 만드나요" 선택지에서 강의 요청의 순번
export const KIND_LECTURE = 4

/**
 * 홈 맨 아래 문의 초안 영역으로 내려가는 클릭 핸들러를 돌려준다.
 * 그 영역이 없는 페이지에서는 아무것도 하지 않아 링크가 원래대로 /contact 로 간다.
 * preset 을 주면 내려가면서 그 항목을 미리 골라 둔다.
 */
export function useContactScroll() {
    const lenis = useLenis()
    return (e: React.MouseEvent, preset?: number) => {
        const target = document.getElementById('contact')
        if (!target) return
        e.preventDefault()
        if (preset !== undefined) window.dispatchEvent(new CustomEvent(BRIEF_PRESET_EVENT, { detail: preset }))
        // 섹션 위쪽의 큰 여백은 건너뛰고 제목이 헤더 바로 아래에 오게 한다
        const offset = parseFloat(getComputedStyle(target).paddingTop) - 120
        if (lenis) lenis.scrollTo(target, { duration: 1.8, offset })
        else window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY + offset, behavior: 'smooth' })
    }
}
