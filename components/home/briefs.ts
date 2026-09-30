import type { ScreenKey } from './screens/markup'
import type { Locale } from '@/translations'

// 히어로 입력창의 예시 초안. API 를 붙이기 전까지 이 목록에서 가장 가까운 것을 보여준다.
// projectId 는 data/projects.ts 의 실제 작업 — "비슷하게 만든 적 있어요" 증거로 쓴다.
type Text = Record<Locale, string>

export type Brief = {
    key: string
    chip: Text
    prompt: Text
    title: Text
    weeks: string
    screens: Text
    builds: Text
    projectId: number
    screen: ScreenKey
    keywords: string[]
}

export const BRIEFS: Brief[] = [
    {
        key: 'clinic',
        chip: { ko: '병원 예약 앱', en: 'Clinic booking app', de: 'Praxis-Buchungsapp' },
        prompt: {
            ko: '동네 동물병원 예약 앱이 필요해요. 보호자가 진료 기록이랑 접종 일정도 볼 수 있으면 좋겠어요',
            en: 'We need a booking app for our vet clinic. Pet owners should see visit records and vaccination dates too',
            de: 'Wir brauchen eine Buchungsapp für unsere Tierarztpraxis. Halter sollen auch Befunde und Impftermine sehen',
        },
        title: { ko: '보호자용 예약 앱과 병원용 관리자 화면', en: 'Booking app for owners, admin for the clinic', de: 'Buchungsapp für Halter, Admin für die Praxis' },
        weeks: '8–10',
        screens: { ko: '12개 안팎', en: 'About 12', de: 'Etwa 12' },
        builds: { ko: 'iOS, 안드로이드, 웹', en: 'iOS, Android, web', de: 'iOS, Android, Web' },
        projectId: 9,
        screen: 'tele',
        keywords: ['병원', '진료', '예약', '의료', '환자', 'clinic', 'booking', 'patient', 'doctor', 'health', 'praxis', 'termin', 'arzt'],
    },
    {
        key: 'shop',
        chip: { ko: '쇼핑몰', en: 'Online store', de: 'Onlineshop' },
        prompt: {
            ko: '수제 디저트를 파는 쇼핑몰을 만들고 싶어요. 정기 구독 결제도 되면 좋겠어요',
            en: 'I want an online store for handmade desserts, with subscription payments',
            de: 'Ich möchte einen Onlineshop für handgemachte Desserts, mit Abo-Zahlungen',
        },
        title: { ko: '상품 판매와 정기 구독 결제가 되는 쇼핑몰', en: 'Store with product sales and subscriptions', de: 'Shop mit Produktverkauf und Abos' },
        weeks: '6–8',
        screens: { ko: '15개 안팎', en: 'About 15', de: 'Etwa 15' },
        builds: { ko: '웹, 관리자 화면', en: 'Web, admin', de: 'Web, Admin' },
        projectId: 6,
        screen: 'trade',
        keywords: ['쇼핑', '판매', '상품', '구독', '결제', '주문', '거래', '커머스', 'shop', 'store', 'commerce', 'sell', 'order', 'marketplace', 'subscription', 'verkauf', 'bestell'],
    },
    {
        key: 'hr',
        chip: { ko: '사내 관리 시스템', en: 'Internal system', de: 'Internes System' },
        prompt: {
            ko: '직원 근태랑 급여 정산을 엑셀 대신 한 곳에서 처리하고 싶어요',
            en: 'We want to handle attendance and payroll in one place instead of spreadsheets',
            de: 'Wir wollen Anwesenheit und Lohnabrechnung an einem Ort statt in Excel erledigen',
        },
        title: { ko: '근태와 급여를 한 번에 처리하는 사내 시스템', en: 'Internal system for attendance and payroll', de: 'Internes System für Anwesenheit und Lohn' },
        weeks: '8–12',
        screens: { ko: '20개 안팎', en: 'About 20', de: 'Etwa 20' },
        builds: { ko: '웹 관리자 화면', en: 'Web admin', de: 'Web-Admin' },
        projectId: 10,
        screen: 'erp',
        keywords: ['직원', '근태', '급여', '정산', '엑셀', '인사', '사내', '재고', 'erp', 'payroll', 'hr', 'staff', 'employee', 'internal', 'spreadsheet', 'excel', 'lohn', 'mitarbeiter'],
    },
    {
        key: 'vision',
        chip: { ko: 'AI 영상 분석', en: 'AI video analysis', de: 'KI-Videoanalyse' },
        prompt: {
            ko: '운동하는 영상을 올리면 자세를 분석해서 피드백해 주는 서비스를 만들고 싶어요',
            en: 'A service that analyses posture from uploaded workout videos and gives feedback',
            de: 'Ein Dienst, der aus Trainingsvideos die Haltung analysiert und Feedback gibt',
        },
        title: { ko: '영상 속 자세를 분석해 피드백하는 AI 서비스', en: 'AI service that reviews posture in videos', de: 'KI-Dienst, der Haltung in Videos bewertet' },
        weeks: '10–14',
        screens: { ko: '8개 안팎', en: 'About 8', de: 'Etwa 8' },
        builds: { ko: '웹, 영상 분석 모델', en: 'Web, vision model', de: 'Web, Bildmodell' },
        projectId: 5,
        screen: 'shot',
        keywords: ['ai', '영상', '분석', '자세', '카메라', '인공지능', '운동', 'video', 'vision', 'posture', 'camera', 'analysis', 'ki', 'analyse'],
    },
    {
        key: 'pos',
        chip: { ko: '매장 POS', en: 'Store POS', de: 'Kassensystem' },
        prompt: {
            ko: '카페 매장에서 쓸 주문·결제 POS가 필요해요. 인터넷이 끊겨도 결제가 되어야 해요',
            en: 'We need an ordering and payment POS for our café that keeps working offline',
            de: 'Wir brauchen ein Kassensystem für unser Café, das auch offline funktioniert',
        },
        title: { ko: '오프라인에서도 결제되는 매장 POS', en: 'Store POS that works offline', de: 'Kassensystem, das offline funktioniert' },
        weeks: '8–10',
        screens: { ko: '10개 안팎', en: 'About 10', de: 'Etwa 10' },
        builds: { ko: '태블릿 앱, 웹 관리자', en: 'Tablet app, web admin', de: 'Tablet-App, Web-Admin' },
        projectId: 3,
        screen: 'pos',
        keywords: ['pos', '매장', '카페', '포스', '키오스크', '결제기', '가게', 'cafe', 'café', 'store', 'kiosk', 'kasse', 'restaurant'],
    },
]

// 입력 문장에 들어 있는 키워드 수로 가장 가까운 예시를 고른다 (없으면 null)
export function matchBrief(text: string): Brief | null {
    const t = text.toLowerCase()
    let best: Brief | null = null
    let score = 0
    for (const b of BRIEFS) {
        const s = b.keywords.filter((k) => t.includes(k)).length
        if (s > score) {
            best = b
            score = s
        }
    }
    return best
}

// 문의 폼으로 넘기는 초안 (주소창에 남지 않도록 세션 저장소를 쓴다)
export const BRIEF_STORAGE_KEY = 'home-brief'
