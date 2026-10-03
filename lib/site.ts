/**
 * 사이트 기본 URL (SEO 메타데이터, sitemap, robots, 구조화 데이터에 사용)
 * 환경변수가 없어도 실제 도메인으로 떨어지도록 기본값을 고정한다.
 * han-david.com 은 www 로 리다이렉트되므로 www 가 정식 주소다.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.han-david.com').replace(/\/$/, '')

// 문의를 받는 이메일 (문의 작성기·푸터)
export const EMAIL = 'hdy20201004@gmail.com'
