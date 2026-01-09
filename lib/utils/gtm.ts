'use client'

/**
 * GTM 이벤트 추적 타입 정의
 */
export interface GTMEventParams {
  event: 'button_click' | 'link_click' | 'card_click' | 'form_submit' | 'scroll_depth' | 'language_change'
  button_name?: string
  button_location?: 'hero' | 'navigation' | 'highlight_card' | 'footer' | 'cta' | 'contact_form'
  destination?: string
  language?: string
  category?: string
  value?: string | number
  [key: string]: string | number | undefined
}

/**
 * GTM 이벤트를 전송하는 유틸리티 함수
 * dataLayer에 직접 push하여 모든 커스텀 파라미터를 전달합니다.
 * 
 * @param params - GTM 이벤트 파라미터
 * 
 * @example
 * ```tsx
 * trackGTMEvent({
 *   event: 'button_click',
 *   button_name: 'portfolio',
 *   button_location: 'hero',
 *   destination: '/projects',
 *   language: 'ko'
 * })
 * ```
 */
export function trackGTMEvent(params: GTMEventParams): void {
  try {
    // 클라이언트 사이드에서만 실행
    if (typeof window === 'undefined') {
      return
    }

    // dataLayer 타입 단언 (이미 @next/third-parties/google에서 선언됨)
    const dataLayer = (window as any).dataLayer as Array<Record<string, any>>

    // dataLayer가 초기화되지 않았다면 초기화
    if (!dataLayer) {
      ;(window as any).dataLayer = []
    }

    // undefined 값 제거하여 깔끔한 객체 생성
    const cleanParams: Record<string, any> = {}
    Object.keys(params).forEach((key) => {
      const value = params[key]
      if (value !== undefined && value !== null) {
        cleanParams[key] = value
      }
    })

    // dataLayer에 직접 push
    dataLayer.push(cleanParams)

    // 개발 환경에서 디버깅용 로그
    if (process.env.NODE_ENV === 'development') {
      console.log('GTM Event pushed:', cleanParams)
    }
  } catch (error) {
    // 프로덕션에서 에러가 발생해도 앱이 중단되지 않도록
    if (process.env.NODE_ENV === 'development') {
      console.error('GTM Event tracking error:', error)
    }
  }
}

/**
 * 버튼 클릭 이벤트 추적 헬퍼
 */
export function trackButtonClick(
  buttonName: string,
  location: GTMEventParams['button_location'],
  destination?: string,
  language?: string
): void {
  trackGTMEvent({
    event: 'button_click',
    button_name: buttonName,
    button_location: location,
    destination,
    language,
  })
}

/**
 * 링크 클릭 이벤트 추적 헬퍼
 */
export function trackLinkClick(
  linkName: string,
  location: GTMEventParams['button_location'],
  destination: string,
  language?: string
): void {
  trackGTMEvent({
    event: 'link_click',
    button_name: linkName,
    button_location: location,
    destination,
    language,
  })
}

/**
 * 카드 클릭 이벤트 추적 헬퍼
 */
export function trackCardClick(
  cardName: string,
  destination: string,
  language?: string
): void {
  trackGTMEvent({
    event: 'card_click',
    button_name: cardName,
    button_location: 'highlight_card',
    destination,
    language,
  })
}
