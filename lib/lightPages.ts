// 리뉴얼한 밝은 톤(크림·갈색)을 쓰는 페이지. 헤더와 푸터가 이 목록을 보고 색을 맞춘다.
// 끝이 '/'인 항목은 그 아래 경로 전부를 뜻한다
const LIGHT_PAGES = ['/', '/about', '/teaching', '/projects', '/projects/']

export function isLightPage(pathname: string | null): boolean {
    if (pathname === null) return false
    return LIGHT_PAGES.some((page) => (page.length > 1 && page.endsWith('/') ? pathname.startsWith(page) : pathname === page))
}
