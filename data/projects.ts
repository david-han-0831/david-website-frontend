export type Category = 'Platform' | 'AI' | 'Enterprise' | 'Mobile';

export interface ProjectResource {
    type: 'Demo' | 'GitHub' | 'Video' | 'Figma' | 'Document';
    label: string;
    url?: string;
    isPrivate?: boolean;
}

export interface Project {
    id: number;
    title: string;
    category: Category;
    summary: string;
    role: string;
    techStack: string[];
    nda: boolean;
    year: string;
    // Detail Page Fields
    heroImage?: string; // Optional
    problem?: {
        background: string;
        requirements: string[];
        environment?: string;
    };
    approach?: {
        strategy: string;
        architecture?: string; // Diagram desc or text
        myRoleFocus: string;
    };
    outcome?: {
        result: string;
        performance?: string;
        learnings: string;
    };
    resources?: ProjectResource[];
}

export const CATEGORIES: Category[] = ['Platform', 'AI', 'Enterprise', 'Mobile'];

export const TECH_STACKS = [
    'Python', 'FastAPI', 'PostgreSQL', 'Supabase', 'AWS Lambda',
    'Stripe', 'React', 'TypeScript', 'Spring Boot', 'MySQL',
    'Firebase', 'GPT-4', 'Gemini', 'OpenCV', 'MediaPipe',
    'NumPy', 'Streamlit', 'Next.js', 'Flutter', 'React Native',
    'PHP', 'CodeIgniter', 'Nest.js', 'Vue.js', 'Node.js', 'JQuery'
];

/**
 * Extract all unique years from projects
 * Handles both single years (e.g., "2025") and year ranges (e.g., "2015–2020")
 * Returns years sorted in descending order (newest first)
 */
export function getAvailableYears(): string[] {
    const yearSet = new Set<string>();
    
    PROJECTS.forEach(project => {
        const yearStr = project.year;
        
        // Check if it's a range (contains – or -)
        if (yearStr.includes('–') || yearStr.includes('-')) {
            // Handle range like "2015–2020"
            const parts = yearStr.split(/[–-]/).map(s => s.trim());
            if (parts.length === 2) {
                const startYear = parseInt(parts[0]);
                const endYear = parseInt(parts[1]);
                
                // Add all years in the range
                if (!isNaN(startYear) && !isNaN(endYear)) {
                    for (let year = startYear; year <= endYear; year++) {
                        yearSet.add(year.toString());
                    }
                }
            }
        } else {
            // Single year
            const year = parseInt(yearStr);
            if (!isNaN(year)) {
                yearSet.add(year.toString());
            }
        }
    });
    
    // Convert to array and sort descending (newest first)
    return Array.from(yearSet).sort((a, b) => parseInt(b) - parseInt(a));
}

export const PROJECTS: Project[] = [
    {
        id: 39,
        title: "Prism · 기업 현장실사 자동화 플랫폼",
        category: "AI",
        summary: "실사요원이 앱으로 녹음하면 AI가 조사표를 채우고, 매니저가 웹 콘솔에서 검수·배분하는 플랫폼",
        role: "기획, 백엔드, 웹, Android·iOS·태블릿 앱 개발",
        techStack: ["FastAPI", "Next.js", "Kotlin", "SwiftUI", "Supabase", "AWS Lambda", "Gemini"],
        nda: false,
        year: "2026",
        problem: {
            background: "현장실사는 방문 면담 내용을 손으로 조사표에 옮기는 일이 대부분이라 시간이 오래 걸리고 누락이 잦았다.",
            requirements: ["현장 녹음과 사진·서류 수집", "음성 인식 후 조사표 자동 작성", "매니저 검수·배분 콘솔", "휴대폰과 태블릿 앱"],
        },
        approach: {
            strategy: "웹과 앱이 하나의 API만 바라보도록 단일 관문 구조로 설계하고, 녹음 파일이 올라오면 음성 인식과 조사표 채움, 푸시 알림까지 자동으로 이어지게 했다.",
            architecture: "FastAPI(AWS Lambda) + Supabase Postgres + S3, Whisper 음성 인식과 Gemini 조사표 채움 파이프라인",
            myRoleFocus: "기획부터 백엔드, 매니저 웹 콘솔, Android·iOS·태블릿 네이티브 앱까지 전체 개발."
        },
        outcome: {
            result: "Android 앱이 현장에서 실사용 중이며, 매니저 웹 콘솔을 함께 운영하고 있다.",
            learnings: "여러 클라이언트를 하나의 API 계약으로 묶어 관리하는 경험."
        }
    },
    {
        id: 40,
        title: "핀세일즈 · 차량 딜러용 사진·녹음 기반 CRM",
        category: "AI",
        summary: "사진과 녹음에서 고객 정보를 AI로 추출해 등록하는 딜러용 CRM. Android 앱과 웹 SaaS",
        role: "기획, 백엔드, Android 앱, 웹 개발",
        techStack: ["Kotlin", "Next.js", "FastAPI", "PostgreSQL"],
        nda: false,
        year: "2026",
        problem: {
            background: "차량 딜러는 현장에서 고객을 만나는 시간이 길어 CRM에 내용을 입력할 여유가 없다.",
            requirements: ["사진 촬영과 자동 판별", "녹음과 음성 인식", "AI 고객 정보 추출", "홈 화면 위젯과 빠른 설정 타일"],
        },
        approach: {
            strategy: "앱은 사진·녹음·오늘 할 일에 집중한 현장 입력기로, 웹은 관리 화면으로 역할을 나눴다. 앱을 열지 않고도 위젯에서 바로 녹음과 촬영을 시작할 수 있게 했다.",
            myRoleFocus: "기획, Android 앱(Jetpack Compose), 웹 SaaS, 백엔드 개발."
        }
    },
    {
        id: 41,
        title: "부부 캘린더·계획표·가계부 앱",
        category: "Mobile",
        summary: "구글 캘린더와 연동되는 iOS 앱(위젯, Live Activity)과 PC 웹 클라이언트",
        role: "기획, iOS 앱, 웹, 백엔드 개발",
        techStack: ["Swift", "SwiftUI", "React", "FastAPI", "PostgreSQL"],
        nda: true,
        year: "2026",
        problem: {
            background: "부부가 일정, 계획표, 가계부를 각각 다른 앱에서 관리하고 있었다.",
            requirements: ["구글 캘린더 양방향 연동", "계획표·가계부·목표 관리", "위젯과 Live Activity", "PC 웹 클라이언트"],
        },
        approach: {
            strategy: "일정은 구글 캘린더를 원본으로 두고 보기와 입력만 직접 만들었다. 구글이 담지 못하는 계획표·가계부·목표는 자체 백엔드에 저장했다.",
            myRoleFocus: "기획과 문서화, iOS 앱, PC 웹, FastAPI 백엔드와 MCP 서버 개발."
        }
    },
    {
        id: 42,
        title: "반려견 유치원 운영 SaaS",
        category: "Platform",
        summary: "원장은 웹과 iOS로 등원·알림장·픽업·매출을 관리하고, 보호자는 iOS 앱으로 반려견의 하루를 확인",
        role: "웹, iOS 앱 2종, 백엔드 개발",
        techStack: ["Next.js", "SwiftUI", "FastAPI", "PostgreSQL", "MinIO"],
        nda: true,
        year: "2026",
        problem: {
            background: "반려견 유치원은 등원 관리와 알림장 작성, 보호자 연락을 메신저와 수기로 처리하고 있었다.",
            requirements: ["원장용 웹 어드민", "원장용 iOS 앱", "보호자용 iOS 앱", "사진 알림장과 푸시 알림"],
        },
        approach: {
            strategy: "모든 클라이언트가 하나의 API로만 통신하게 하고, 환경 변수만 바꾸면 스테이징과 운영 양쪽에서 같은 코드가 돌도록 구성했다.",
            myRoleFocus: "원장 웹, 원장·보호자 iOS 앱, FastAPI 백엔드와 푸시 알림 개발."
        }
    },
    {
        id: 43,
        title: "브랜드사 올인원 운영 SaaS",
        category: "Enterprise",
        summary: "제품·마진, 주문 변환, 발주·송장, 정산, 재고를 한 콘솔에서 처리. 웹과 iPhone·iPad 앱",
        role: "웹, iOS·iPad 앱, 백엔드 개발",
        techStack: ["Next.js", "TypeScript", "SwiftUI", "FastAPI", "PostgreSQL", "Firebase"],
        nda: true,
        year: "2026",
        problem: {
            background: "건강기능식품·화장품 브랜드사는 주문서 변환과 발주, 정산을 엑셀로 반복 처리하고 있었다.",
            requirements: ["주문서 엑셀 변환", "발주·송장 관리", "정산과 재고", "모바일 앱"],
        },
        approach: {
            strategy: "실제 주문서 엑셀을 분석해 출력 템플릿을 설계하고, 시안을 실측해 디자인 토큰 한 곳에서 전체 톤을 관리하도록 옮겼다.",
            myRoleFocus: "웹 프론트엔드, iPhone·iPad 네이티브 앱, FastAPI 백엔드 개발."
        },
        outcome: {
            result: "베타 고객이 실제 업무에 사용하고 있다.",
            learnings: "엑셀 중심 업무를 화면 흐름으로 옮기는 설계 경험."
        }
    },
    {
        id: 44,
        title: "K-POP 성지순례 여행 플래너 앱",
        category: "Mobile",
        summary: "아이돌 관련 장소를 찾아 여행 일정으로 묶는 iOS 네이티브 앱과 관리자 웹",
        role: "iOS 앱, 관리자 웹, 백엔드 개발",
        techStack: ["Swift", "SwiftUI", "FastAPI", "PostgreSQL"],
        nda: true,
        year: "2026",
        problem: {
            background: "웹으로 먼저 만든 서비스를 iOS 네이티브 앱으로 옮겨야 했다.",
            requirements: ["화면 19종 이식", "기존 API 계약 유지", "JWT 인증", "관리자 웹"],
        },
        approach: {
            strategy: "기존 백엔드의 API 계약을 그대로 재현한 FastAPI 서버를 세워 앱 개발과 테스트를 독립적으로 진행했다.",
            myRoleFocus: "SwiftUI 앱 전체 화면, 관리자 웹, API 서버 개발."
        }
    },
    {
        id: 45,
        title: "AI 옷장 기록 앱",
        category: "AI",
        summary: "매일 착장 사진 한 장으로 옷장이 정리되는 서비스",
        role: "기획, 웹, 백엔드 개발",
        techStack: ["Next.js", "FastAPI", "PostgreSQL"],
        nda: true,
        year: "2026",
        problem: {
            background: "옷장 앱은 옷을 하나씩 등록해야 해서 대부분 처음에 포기한다.",
            requirements: ["착장 사진 기록", "옷 자동 인식", "화면 22종 시안", "데이터 모델과 동기화 설계"],
        },
        approach: {
            strategy: "제품 개요, 화면 정의서, 데이터 모델을 먼저 문서로 정리한 뒤 웹 MVP로 가설을 검증하는 순서로 진행했다.",
            myRoleFocus: "기획 문서와 UI 시안, 웹 MVP, FastAPI 백엔드 개발."
        }
    },
    {
        id: 46,
        title: "배리어프리 콘텐츠 제작 플랫폼",
        category: "AI",
        summary: "화면해설과 자막해설을 AI 초안, 봉사자 검수, 당사자 모니터링 3단계로 제작하고 바로 감상",
        role: "기획, 풀스택 개발",
        techStack: ["Next.js", "TypeScript", "Firebase"],
        nda: true,
        year: "2026",
        problem: {
            background: "시각·청각장애인을 위한 해설 콘텐츠는 제작에 손이 많이 가 공급이 부족하다.",
            requirements: ["AI 해설 초안 생성", "자원봉사자 검수", "당사자 모니터링", "완성 콘텐츠 감상"],
        },
        approach: {
            strategy: "기능 정리와 화면정의서 38화면을 먼저 확정하고, 제작 단계별 역할에 맞춰 화면을 나눴다.",
            myRoleFocus: "기획 정리, 화면 설계, Next.js와 Firebase 기반 풀스택 개발."
        }
    },
    {
        id: 47,
        title: "수입 무역 서류 AI 변환 SaaS",
        category: "AI",
        summary: "형식이 제각각인 송장과 포장명세서를 AI로 읽고 검증해 관세청 대량등록 엑셀로 변환",
        role: "기획, 풀스택 개발",
        techStack: ["Next.js", "TypeScript", "FastAPI", "Python"],
        nda: true,
        year: "2026",
        problem: {
            background: "수입 신고를 위해 거래처마다 다른 양식의 서류를 사람이 직접 옮겨 적고 있었다.",
            requirements: ["서류 이미지 파싱", "검증 규칙 8종", "대량등록 엑셀 출력", "작업 공간 화면"],
        },
        approach: {
            strategy: "Vision-LLM으로 서류를 구조화하고, 별도 OCR 서버와 검증 규칙으로 값을 교차 확인하도록 했다.",
            myRoleFocus: "기획 문서 작성, 웹 앱과 OCR 서버 개발."
        }
    },
    {
        id: 48,
        title: "AI 악보 생성·합주·연습 웹 앱",
        category: "AI",
        summary: "말로 설명하면 악보를 만들고, 드래그 편집과 파트별 합주, 마이크 채점까지 하는 웹 앱",
        role: "풀스택 개발",
        techStack: ["Next.js", "TypeScript", "Firebase", "OpenAI", "VexFlow"],
        nda: true,
        year: "2026",
        problem: {
            background: "악보를 만들고 고치고 함께 연주해 보는 과정이 서로 다른 도구에 흩어져 있었다.",
            requirements: ["자연어 악보 생성", "드래그 편집", "트랙 합주와 녹음", "마이크·MIDI 채점", "PDF·MIDI·MusicXML 내보내기"],
        },
        approach: {
            strategy: "VexFlow로 조판한 악보 위에서 음높이·위치·길이를 직접 끌어 편집하게 하고, AI 키가 없어도 규칙 기반으로 끝까지 동작하도록 만들었다.",
            myRoleFocus: "악보 편집기, 합주·연습 화면, AI 생성 연동 등 풀스택 개발."
        }
    },
    {
        id: 49,
        title: "키워드 수요·경쟁 분석 SaaS",
        category: "Platform",
        summary: "시장검증 리포트를 만드는 분석 서비스. SaaS 3종을 하나의 계정·DB·어드민으로 운영",
        role: "백엔드, 웹, 통합 어드민 개발",
        techStack: ["FastAPI", "Next.js", "TypeScript", "Supabase", "AWS Lambda"],
        nda: true,
        year: "2026",
        problem: {
            background: "여러 SaaS를 따로 만들면 계정과 결제, 관리 화면이 제품마다 중복된다.",
            requirements: ["키워드 수요·경쟁 분석", "시장검증 리포트", "공통 계정과 DB", "전 제품 통합 어드민"],
        },
        approach: {
            strategy: "공통 부문을 플랫폼으로 분리한 백엔드 모노레포를 두고, 프론트는 제품별로 나눠 배포했다.",
            myRoleFocus: "공통 API와 제품 API, 분석 서비스 웹, 통합 어드민 개발."
        }
    },
    {
        id: 50,
        title: "교육기관 내부 CRM",
        category: "Enterprise",
        summary: "학생·학부모·강사 관리를 위한 내부 업무 도구",
        role: "풀스택 개발",
        techStack: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL"],
        nda: true,
        year: "2026",
        problem: {
            background: "범용 업무 관리 도구로 학생과 강사를 관리하다 보니 기관 업무에 맞지 않는 부분이 많았다.",
            requirements: ["학생·학부모·강사 관리", "권한별 접근", "기존 도구 대체"],
        },
        approach: {
            strategy: "요구사항과 DB 설계를 문서로 먼저 정리하고, 내부망에서만 접근 가능한 DB 위에 구축했다.",
            myRoleFocus: "요구사항 정리, DB 설계, 프론트엔드와 백엔드 개발."
        }
    },
    {
        id: 51,
        title: "미국 한인 미용실 예약·고객관리 플랫폼",
        category: "Platform",
        summary: "소규모 미용실 원장을 위한 예약과 CRM 자동화. 원장용, 고객용, 통합 관리자 웹 3종",
        role: "백엔드, 프론트엔드 개발",
        techStack: ["Next.js", "TypeScript", "PostgreSQL"],
        nda: true,
        year: "2026",
        problem: {
            background: "미국의 1~5인 규모 한인 미용실은 예약과 고객 관리를 전화와 메모로 처리하고 있었다.",
            requirements: ["원장용 예약·고객관리", "고객용 예약 화면", "통합 관리자", "한국어·영어 환경"],
        },
        approach: {
            strategy: "원장용, 고객용, 관리자용을 각각 독립된 프론트로 나누고 API와 DB 스키마를 문서로 먼저 검토했다.",
            myRoleFocus: "백엔드 구축과 인증, 원장용 화면 재설계."
        }
    },
    {
        id: 52,
        title: "음성 인식 배구 경기 기록·분석 플랫폼",
        category: "AI",
        summary: "경기 중 말로 기록하면 통계와 리포트가 자동으로 만들어지는 태블릿용 웹 앱",
        role: "풀스택 개발",
        techStack: ["React", "Firebase", "Tailwind CSS", "OpenAI"],
        nda: true,
        year: "2026",
        problem: {
            background: "배구 경기 기록은 손으로 적기에는 진행이 너무 빨라 놓치는 플레이가 많다.",
            requirements: ["음성 명령 기록", "선수·팀 분석", "경기 리포트와 PDF", "영상 보관", "팀·권한 관리"],
        },
        approach: {
            strategy: "브라우저 음성 인식으로 짧은 명령을 받아 기록하고, 인식이 불확실한 항목은 검토 대상으로 따로 표시했다.",
            myRoleFocus: "음성 기록, 분석 화면, 리포트, 팀 관리까지 풀스택 개발."
        }
    },
    {
        id: 53,
        title: "점자 영화 접근성 플랫폼",
        category: "AI",
        summary: "AI가 영화 장면을 묘사하고, 재생에 맞춰 점자 기기로 출력하는 웹 서비스",
        role: "웹 개발, 하드웨어 연동",
        techStack: ["Next.js", "TypeScript", "Firebase", "Gemini"],
        nda: true,
        year: "2026",
        problem: {
            background: "시각장애인은 영화의 대사는 들을 수 있지만 화면에서 일어나는 일은 알기 어렵다.",
            requirements: ["영상 장면 분석과 설명 생성", "점자 기기 연결", "재생 동기화", "검수 화면과 시청 후 퀴즈"],
        },
        approach: {
            strategy: "Gemini로 장면별 설명을 세 가지 길이로 만들고, 브라우저에서 USB로 점자 기기에 직접 보내도록 했다. 기기 없이도 개발할 수 있게 목 모드를 뒀다.",
            myRoleFocus: "웹 전체 개발과 점자 하드웨어 통신 구현."
        }
    },
    {
        id: 54,
        title: "자전거 발전 충전 모니터링 웹",
        category: "Platform",
        summary: "페달 발전 충전 장치의 데이터를 받아 보여주는 랜딩과 관리자 대시보드",
        role: "웹 개발, 하드웨어 연동",
        techStack: ["Next.js", "TypeScript", "Firebase"],
        nda: true,
        year: "2026",
        problem: {
            background: "하드웨어가 보내는 충전 데이터를 확인하고 소개할 웹이 필요했다.",
            requirements: ["기기 데이터 수신 API", "관리자 대시보드", "GPS 경로 기록", "제품 랜딩"],
        },
        approach: {
            strategy: "하드웨어 개발자에게 연동 가이드와 예제를 제공하고, 인수인계 문서를 남겨 이후 유지보수가 가능하게 했다.",
            myRoleFocus: "랜딩과 대시보드, 기기 연동 API 개발."
        }
    },
    {
        id: 55,
        title: "비닐하우스 제설 로봇 관제 대시보드",
        category: "Platform",
        summary: "지붕 적설 위험도를 판정하고 로봇 상태를 확인하는 랜딩과 어드민",
        role: "웹 개발, 하드웨어 연동",
        techStack: ["Next.js", "TypeScript", "Firebase"],
        nda: true,
        year: "2026",
        problem: {
            background: "폭설 때 비닐하우스 지붕이 무너지는 사고를 막기 위한 제설 로봇의 상태를 원격으로 확인해야 했다.",
            requirements: ["기기 등록과 상태 수신", "적설 위험도 판정", "작동·고장 기록", "기기 상세 화면"],
        },
        approach: {
            strategy: "DB 접근을 모두 서버에서만 하도록 하고, 기기용 API 5종과 연동 가이드를 하드웨어 개발자에게 제공했다.",
            myRoleFocus: "랜딩과 어드민, 기기용 API 개발."
        }
    },
    {
        id: 56,
        title: "쓰레기 수거 로버 운행 대시보드",
        category: "Platform",
        summary: "자율주행 로버의 운행 기록을 지도, 영상, 이벤트로 조회하는 웹",
        role: "웹 개발",
        techStack: ["Next.js", "TypeScript"],
        nda: true,
        year: "2026",
        problem: {
            background: "로버가 수거 운행 중 남기는 데이터를 사람이 확인할 화면이 없었다.",
            requirements: ["운행 데이터 수신 API", "운행 목록과 누적 통계", "지도·영상·이벤트 상세", "제품 랜딩"],
        },
        approach: {
            strategy: "저장소 계층을 한 파일로 분리해 나중에 DB를 바꿔도 그 파일만 교체하면 되도록 했다.",
            myRoleFocus: "랜딩, 대시보드, 데이터 수신 API 개발."
        }
    },
    {
        id: 57,
        title: "축구 훈련 영상 추천 플랫폼",
        category: "Platform",
        summary: "축구를 배우는 사용자에게 포지션별 맞춤 훈련 영상을 추천",
        role: "풀스택 개발",
        techStack: ["React", "Firebase", "Tailwind CSS"],
        nda: true,
        year: "2026",
        problem: {
            background: "훈련 영상은 많지만 자기 포지션에 맞는 것을 고르기 어렵다.",
            requirements: ["포지션별 추천", "회원 인증", "영상 목록 관리"],
        },
        approach: {
            strategy: "React와 Firebase로 빠르게 구축해 추천 흐름을 먼저 검증했다.",
            myRoleFocus: "프론트엔드와 Firebase 연동 개발."
        }
    },
    {
        id: 58,
        title: "K-POP 팬덤 여행 코스 추천 MVP",
        category: "Platform",
        summary: "팬덤 관심사를 바탕으로 지역 여행 코스를 추천하는 웹 MVP",
        role: "기획, 풀스택 개발",
        techStack: ["Next.js", "TypeScript", "FastAPI"],
        nda: true,
        year: "2026",
        problem: {
            background: "공모사업 내부 검토를 위해 아이디어를 실제로 보여줄 MVP가 필요했다.",
            requirements: ["여행 코스 추천", "공공 관광 데이터 연동", "지도 표시"],
        },
        approach: {
            strategy: "관광 공공 데이터와 지도 API를 연결해 핵심 흐름만 빠르게 구현했다.",
            myRoleFocus: "기획 정리, 웹과 API 개발."
        }
    },
    {
        id: 59,
        title: "기업 소개 사이트와 상담 접수 시스템",
        category: "Platform",
        summary: "기업 소개 랜딩과 상담문의 접수 API",
        role: "디자인 제안, 웹, 백엔드 개발",
        techStack: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL"],
        nda: true,
        year: "2026",
        problem: {
            background: "회사를 소개하고 상담 문의를 받을 사이트가 필요했다.",
            requirements: ["브랜드 분석과 디자인 제안", "소개 랜딩", "상담문의 접수"],
        },
        approach: {
            strategy: "시안 세 가지를 만들어 비교한 뒤 하나로 확정했고, 문구와 수치를 한 파일에 모아 수정 요청에 바로 대응할 수 있게 했다.",
            myRoleFocus: "브랜드 분석, 시안 제작, 랜딩과 문의 API 개발."
        }
    },
    {
        id: 60,
        title: "음악콩쿠르 온라인 신청 시스템",
        category: "Platform",
        summary: "참가 신청, 관리자 대시보드, 알림까지 콩쿠르 접수를 온라인으로 처리",
        role: "풀스택 개발",
        techStack: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
        nda: true,
        year: "2026",
        problem: {
            background: "콩쿠르 참가 신청을 수작업으로 받아 정리하고 있었다.",
            requirements: ["회원가입과 부문별 신청", "관리자 대시보드", "신청 알림"],
        },
        approach: {
            strategy: "신청이 들어오면 운영진 메신저로 바로 알림이 가도록 서버리스 함수를 연결했다.",
            myRoleFocus: "신청 화면, 관리자 대시보드, 알림 연동 개발."
        }
    },
    {
        id: 1,
        title: "온라인 시험 및 문제 풀이 플랫폼 백엔드 개발",
        category: "Platform",
        summary: "온라인 시험 운영을 위한 백엔드 API 개발. 실시간 시험 진행, 자동 채점, 사용자 인증, 팀/조직 기반 협업 기능 구현. 결제 및 환불 프로세스 구축.",
        role: "백엔드 API 설계·구현, DB 설계, 보안(암호화) 시스템 구축, 서버리스 환경 구성",
        techStack: ["Python", "FastAPI", "PostgreSQL", "Supabase", "AWS Lambda"],
        nda: true,
        year: "2025",
        problem: {
            background: "기존 오프라인 시험의 한계와 실시간 채점 시스템의 부재로 인한 운영 비용 증가.",
            requirements: ["대규모 동시 접속 처리 (1000명+)", "부정행위 방지 시스템", "실시간 채점 및 결과 리포트", "팀/조직 기반 협업", "결제 및 환불 프로세스"],
            environment: "대학 및 교육 기관 대상 SaaS"
        },
        approach: {
            strategy: "예측 불가능한 트래픽에 대응하기 위해 서버리스 아키텍처를 도입하여 자동 확장성을 확보했습니다.",
            myRoleFocus: "FastAPI를 활용한 비동기 백엔드 설계, DB 설계, 보안(암호화) 시스템 구축, AWS Lambda 기반 채점 트리거 최적화."
        },
        outcome: {
            result: "시험 운영 인력 50% 절감 및 결과 처리 시간 1일 -> 1분 단축.",
            learnings: "RDB와 NoSQL의 적절한 혼용을 통한 읽기/쓰기 성능 최적화 경험."
        },
        resources: [
            { type: 'Demo', label: 'Service Demo', isPrivate: true },
            { type: 'Document', label: 'Architecture Docs', isPrivate: true }
        ]
    },
    {
        id: 2,
        title: "대회 및 챌린지 관리 플랫폼 백엔드 개발",
        category: "Platform",
        summary: "대회·챌린지 운영을 위한 참가자·팀·조직 관리 API 개발. 결제(주문·환불), 자료 제출, 평가 시스템 제공. AES256+RSA 기반 보안 미들웨어 적용.",
        role: "백엔드 개발, DB 설계, 서버리스 배포",
        techStack: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Alembic", "AWS Lambda", "Stripe"],
        nda: true,
        year: "2025",
        problem: {
            background: "복잡한 대회 규정과 다양한 결제 방식 지원의 어려움.",
            requirements: ["팀 빌딩 및 조 편성 자동화", "글로벌 결제 지원 (Stripe)", "단계별 심사 프로세스", "자료 제출 및 평가 시스템", "AES256+RSA 기반 보안"],
        },
        approach: {
            strategy: "규정이 자주 바뀌는 특성을 고려하여, 워크플로우 엔진 기반의 유연한 심사 프로세스를 설계했습니다. AES256+RSA 기반 보안 미들웨어 적용.",
            myRoleFocus: "결제 모듈 연동, 상태 머신(State Machine) 기반 대회 진행 로직 구현, DB 설계, 서버리스 배포."
        },
        outcome: {
            result: "연간 50회 이상의 대회 운영 자동화 달성.",
            learnings: "Stripe API의 복잡한 결제/환불 시나리오 처리 노하우 축적."
        }
    },
    {
        id: 3,
        title: "POS 시스템 개발 (해외 시장용)",
        category: "Enterprise",
        summary: "해외 정산 규정(BIR 기준)을 반영한 POS 시스템 개발. Settlement, Sales Summary, X-Reading, Z-Reading, 매출 리포트 기능 포함.",
        role: "프론트·백엔드 개발, API 설계, DB 설계",
        techStack: ["React", "TypeScript", "Vite", "Java 17", "Spring Boot 3.5.3", "MySQL", "JPA", "POS 프린터 SDK(JNA)", "XLSX"],
        nda: true,
        year: "2025",
        problem: {
            background: "국가별 상이한 세금 규정(BIR 기준)과 오프라인 환경에서의 안정성 확보 필요.",
            requirements: ["오프라인 모드 지원", "다국어/다통화 영수증", "실시간 매출 대시보드", "Settlement, Sales Summary, X-Reading, Z-Reading", "매출 리포트"],
        },
        approach: {
            strategy: "로컬 퍼스트(Local-First) 아키텍처를 적용하여 오프라인 시 로컬 DB에 저장하고 네트워크 복구 시 동기화.",
            myRoleFocus: "프론트엔드 및 백엔드 개발, API 설계, DB 설계, POS 프린터 SDK 연동."
        },
        outcome: {
            result: "네트워크 불안정 환경에서도 결제 데이터 유실 0건 달성.",
            learnings: "분산 시스템에서의 데이터 일관성 유지 전략 심화."
        }
    },
    {
        id: 4,
        title: "운동선수 트레이닝 관리 플랫폼",
        category: "AI",
        summary: "선수 컨디션 관리, 트레이닝 계획, 부상 위험 예측, AI 기반 맞춤 프로그램 생성",
        role: "PM, 프론트·백엔드 개발",
        techStack: ["React 19", "TypeScript", "Vite", "Tailwind", "Firebase", "Gemini", "GPT-4", "ApexCharts"],
        nda: true,
        year: "2025",
        problem: {
            background: "선수별 데이터 파편화로 인한 체계적 관리 부재.",
            requirements: ["웨어러블 데이터 연동", "LLM 기반 코멘트 생성", "모바일 최적화 UI", "부상 위험 예측", "AI 기반 맞춤 프로그램 생성"],
        },
        approach: {
            strategy: "RAG(Retrieval-Augmented Generation) 패턴을 활용하여 선수 과거 데이터를 기반으로 개인화된 피드백 생성.",
            myRoleFocus: "프로젝트 관리, 프론트엔드 및 백엔드 개발, 프롬프트 엔지니어링 및 Firebase 실시간 데이터 바인딩."
        },
        outcome: {
            result: "코치진의 데이터 분석 시간 70% 단축.",
            learnings: "생성형 AI의 환각(Hallucination) 제어 및 응답 속도 최적화."
        }
    },
    {
        id: 5,
        title: "농구 슛폼 분석 프로그램",
        category: "AI",
        summary: "컴퓨터 비전 기반 자세 분석·스코어링",
        role: "AI/ML 엔지니어링",
        techStack: ["Python", "OpenCV", "MediaPipe", "NumPy", "Pandas", "Plotly", "Streamlit"],
        nda: true,
        year: "2025",
        problem: {
            background: "고가의 장비 없이 스마트폰으로 슛 자세를 교정받고 싶은 니즈.",
            requirements: ["신체 관절 포인트 실시간 추적", "이상적인 폼과 비교 분석", "웹 기반 시각화"],
        },
        approach: {
            strategy: "MediaPipe Pose를 활용하여 경량화된 모델로 브라우저(또는 모바일) 환경에서도 추론 가능하도록 설계.",
            myRoleFocus: "벡터 연산을 통한 관절 각도 계산 알고리즘 및 시각화 파이프라인 구축."
        },
        outcome: {
            result: "15fps 이상의 실시간 자세 추적 성능 확보.",
            learnings: "엣지 디바이스에서의 AI 모델 최적화 및 UX 개선."
        }
    },
    {
        id: 6,
        title: "해외 수산물 B2B 거래 플랫폼",
        category: "Platform",
        summary: "일반 거래·입찰 거래가 가능한 B2B 플랫폼",
        role: "기획, 프론트·백엔드 개발",
        techStack: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL"],
        nda: true,
        year: "2024",
        problem: {
            background: "복잡한 무역 절차와 불투명한 가격 정보 해소.",
            requirements: ["실시간 경매/입찰 시스템", "다국어 채팅 번역", "문서 관리 시스템"],
        },
        approach: {
            strategy: "WebSocket을 이용한 실시간 입찰 현황판 구현 및 도메인 주도 설계(DDD) 적용.",
            myRoleFocus: "기획, 프론트엔드 및 백엔드 개발, 실시간 통신 서버 구축 및 거래 트랜잭션 안전성 보장."
        },
        outcome: {
            result: "초기 거래액 100만 달러 달성 및 안심 거래 프로세스 정착.",
            learnings: "복잡한 비즈니스 로직을 코드로 녹여내는 도메인 모델링 경험."
        }
    },
    {
        id: 7,
        title: "문화예술 플랫폼 '아트스테이지'",
        category: "Platform",
        summary: "예술인 회원관리, 공연/행사 관리, 지원사업 데이터 자동 수집을 포함한 문화예술 플랫폼",
        role: "PM, 기획, 백엔드 개발",
        techStack: ["Java", "Spring Boot", "MySQL", "Python"],
        nda: true,
        year: "2024",
        problem: {
            background: "예술인 DB 관리의 비효율성과 지원 사업 정보 접근성 부족.",
            requirements: ["예술인 회원관리", "공연/행사 관리", "지원사업 데이터 자동 수집"],
        },
        approach: {
            strategy: "Python 크롤러를 통한 데이터 파이프라인 구축 및 ElasticSearch 도입을 통한 검색 고도화 검토.",
            myRoleFocus: "프로젝트 관리, 기획, 데이터 스키마 정규화 및 어드민 대시보드 API 설계."
        },
        outcome: {
            result: "데이터 업데이트 주기 자동화 (월 1회 -> 일 1회).",
            learnings: "레거시 시스템 마이그레이션 및 데이터 정합성 관리."
        }
    },
    {
        id: 8,
        title: "AI 개발자 프로젝트 매칭 플랫폼",
        category: "Platform",
        summary: "AI 개발자와 프로젝트를 연결하는 매칭 서비스",
        role: "PM, 백엔드 개발",
        techStack: ["Spring Boot", "React", "MySQL"],
        nda: true,
        year: "2023",
        problem: {
            background: "특수 직군(AI)에 맞는 상세한 스킬 매칭 시스템 부재.",
            requirements: ["이력서 파싱 및 키워드 추출", "유사도 기반 매칭 알고리즘", "채팅 기능"],
        },
        approach: {
            strategy: "형태소 분석기를 활용한 이력서 내 기술 스택 추출 및 매칭 점수 산정 로직 구현.",
            myRoleFocus: "매칭 알고리즘 튜닝 및 알림 서비스(Notification) 설계."
        },
        outcome: {
            result: "매칭 성사율 20% 증가.",
            learnings: "추천 시스템의 기초 로직 구현 및 사용자 피드백 루프 설계."
        }
    },
    {
        id: 9,
        title: "비대면 진료 앱 & CRM",
        category: "Mobile",
        summary: "병원 진료·예약·상담 관리, CRM 운영을 통합한 의료 관리 시스템",
        role: "PM, 백엔드 개발",
        techStack: ["Spring Boot", "MySQL", "Flutter", "React Native"],
        nda: true,
        year: "2023",
        problem: {
            background: "팬데믹 이후 비대면 진료 수요 급증에 따른 플랫폼 필요 및 병원 CRM 통합 관리 필요성.",
            requirements: ["화상 통화 연동", "처방전 전송 보안", "실시간 예약 관리", "CRM 운영"],
        },
        approach: {
            strategy: "WebRTC 기반의 안정적인 화상 진료 환경 구축 및 민감 개인정보 암호화 저장. CRM 기능 통합.",
            myRoleFocus: "API Gateway 구축 및 인증/인가(OAuth) 보안 강화, CRM 시스템 설계 및 구현."
        },
        outcome: {
            result: "일 평균 예약 500건 처리 가능한 안정성 확보 및 통합 CRM 운영.",
            learnings: "의료 데이터 보안 규정(HIPAA 등 참조) 준수 및 WebRTC 기술 이해."
        }
    },
    {
        id: 10,
        title: "ERP / HR 관리 시스템",
        category: "Enterprise",
        summary: "사내 인사·ERP 관리 및 자동화 시스템",
        role: "PM",
        techStack: ["PHP", "CodeIgniter", "MySQL"],
        nda: true,
        year: "2022",
        problem: {
            background: "수기 및 엑셀 기반 인사 관리의 비효율성.",
            requirements: ["근태 관리", "급여 자동 계산", "결재 승인 라인"],
        },
        approach: {
            strategy: "기존 업무 프로세스를 그대로 웹으로 옮기되, 반복 작업(급여 계산 등)을 자동화하는 데 초점.",
            myRoleFocus: "요구사항 분석 및 DB 모델링, 레거시 코드 리팩토링."
        },
        outcome: {
            result: "급여 정산 시간 3일 -> 3시간 단축.",
            learnings: "B2B 내부 시스템의 복잡한 비즈니스 로직 처리 및 UI/UX 개선."
        }
    },
    {
        id: 12,
        title: "물류 재고 관리 시스템",
        category: "Enterprise",
        summary: "회원관리, 상품관리, 매출, 통계 기능을 갖춘 물류 재고 관리 시스템",
        role: "서비스 기획, 설계, 프론트 및 백엔드 개발",
        techStack: ["JavaScript", "Node.js", "Vue.js", "MySQL"],
        nda: true,
        year: "2018",
        problem: {
            background: "수기 기반 재고 관리의 비효율성과 실시간 재고 현황 파악의 어려움.",
            requirements: ["회원 관리 시스템", "상품 및 재고 관리", "매출 통계 및 리포트"],
        },
        approach: {
            strategy: "Vue.js 기반 SPA로 빠른 반응성을 제공하고, Node.js 백엔드로 실시간 재고 동기화 구현.",
            myRoleFocus: "전체 시스템 기획 및 설계, 프론트엔드와 백엔드 개발, 데이터베이스 설계."
        },
        outcome: {
            result: "재고 관리 시간 60% 단축 및 실시간 재고 현황 파악 가능.",
            learnings: "Vue.js 프레임워크 활용 및 RESTful API 설계 경험."
        }
    },
    {
        id: 13,
        title: "밀키트 판매 사이트",
        category: "Platform",
        summary: "회원관리, 상품관리, 결제 기능을 갖춘 밀키트 전용 쇼핑몰",
        role: "백엔드 개발, 운영, 유지보수",
        techStack: ["Java", "Spring Boot", "HTML", "CSS", "JavaScript", "JQuery", "MySQL"],
        nda: true,
        year: "2017",
        problem: {
            background: "밀키트 특성상 신선도 관리와 배송 일정 관리의 복잡성.",
            requirements: ["회원 관리", "상품 관리 및 재고 추적", "결제 시스템 연동"],
        },
        approach: {
            strategy: "Spring Boot 기반 안정적인 백엔드 구축 및 JSP/JQuery를 활용한 전통적인 웹 개발 방식 적용.",
            myRoleFocus: "백엔드 API 개발, 결제 모듈 연동, 운영 및 유지보수."
        },
        outcome: {
            result: "안정적인 주문 처리 시스템 구축 및 운영 효율성 향상.",
            learnings: "Spring Boot 프레임워크 심화 학습 및 전통적인 웹 개발 패턴 이해."
        }
    },
    {
        id: 14,
        title: "중고거래 웹 서비스",
        category: "Platform",
        summary: "회원관리, 상품관리 기능을 갖춘 중고거래 플랫폼",
        role: "백엔드 개발, 운영, 유지보수",
        techStack: ["Java", "Spring Boot", "HTML", "CSS", "JavaScript", "JQuery", "MySQL"],
        nda: true,
        year: "2016",
        problem: {
            background: "중고거래 시장의 신뢰성 확보와 사용자 간 거래 매칭의 어려움.",
            requirements: ["회원 관리 및 인증", "상품 등록 및 검색", "거래 안전성 보장"],
        },
        approach: {
            strategy: "Spring Boot 기반 RESTful API 설계 및 JQuery를 활용한 동적 UI 구현.",
            myRoleFocus: "백엔드 API 개발, 데이터베이스 설계, 운영 및 유지보수."
        },
        outcome: {
            result: "안정적인 중고거래 플랫폼 구축 및 사용자 만족도 향상.",
            learnings: "웹 서비스 운영 경험 및 사용자 피드백 기반 개선 프로세스 이해."
        }
    },
    {
        id: 15,
        title: "학생 관리 시스템",
        category: "Enterprise",
        summary: "학생 출결 관리, 교육 자료 크롤링, Excel/PPT 자동화 기능을 갖춘 교육 관리 시스템",
        role: "백엔드 개발, 운영, 유지보수",
        techStack: ["Java", "Spring Boot", "HTML", "CSS", "JavaScript", "JQuery", "Python", "MySQL"],
        nda: true,
        year: "2015",
        problem: {
            background: "수기 기반 출결 관리의 비효율성과 교육 자료 수집의 번거로움.",
            requirements: ["학생 출결 관리", "교육 자료 크롤링", "Excel/PPT 자동화"],
        },
        approach: {
            strategy: "Spring Boot로 핵심 관리 시스템을 구축하고, Python 스크립트를 활용한 자동화 기능 추가.",
            myRoleFocus: "백엔드 개발, Python 크롤러 및 자동화 스크립트 작성, 운영 및 유지보수."
        },
        outcome: {
            result: "출결 관리 시간 70% 단축 및 교육 자료 수집 자동화 달성.",
            learnings: "다양한 기술 스택(Java, Python) 혼용 경험 및 자동화 도구 개발 능력 향상."
        }
    },
    {
        id: 16,
        title: "성형외과 CRM 시스템 개발",
        category: "Enterprise",
        summary: "환자관리, 예약관리, 접수, 상담, 매출, 통계 기능을 포함한 성형외과 전용 CRM 시스템",
        role: "서비스 기획, 설계, 프론트 및 백엔드 개발",
        techStack: ["JavaScript", "Nest.js", "Vue.js", "MySQL"],
        nda: true,
        year: "2021",
        problem: {
            background: "성형외과 병원의 환자 관리 및 예약 시스템의 비효율성과 수기 기반 업무 처리의 한계.",
            requirements: ["환자 정보 관리", "예약 시스템", "접수 및 상담 관리", "매출 및 통계 분석"],
            environment: "성형외과 병원"
        },
        approach: {
            strategy: "Nest.js 기반의 견고한 백엔드 아키텍처와 Vue.js를 활용한 반응형 프론트엔드 구축. 환자 데이터 보안 및 예약 시스템 최적화.",
            myRoleFocus: "전체 시스템 기획 및 설계, Nest.js 백엔드 API 개발, Vue.js 프론트엔드 구현, 데이터베이스 설계 및 최적화."
        },
        outcome: {
            result: "환자 관리 효율성 향상 및 예약 시스템 자동화로 업무 시간 단축.",
            learnings: "Nest.js 프레임워크 활용 경험 및 의료 분야 특화 시스템 개발 경험."
        }
    },
    {
        id: 17,
        title: "데이터 수집 앱 유지보수",
        category: "Platform",
        summary: "회원관리, 댓글, 코멘트, 데이터 관리 기능을 제공하는 데이터 수집 플랫폼",
        role: "백엔드 개발, 유지보수",
        techStack: ["JavaScript", "Node.js", "Vue.js", "MySQL"],
        nda: true,
        year: "2022",
        problem: {
            background: "기존 데이터 수집 앱의 안정성 개선 및 기능 확장 필요성.",
            requirements: ["회원 관리 시스템 개선", "댓글 및 코멘트 기능 최적화", "데이터 관리 효율화"],
            environment: "스타트업 데이터 수집 플랫폼"
        },
        approach: {
            strategy: "Node.js 기반 백엔드 시스템의 성능 최적화 및 버그 수정. Vue.js 프론트엔드와의 연동 개선.",
            myRoleFocus: "백엔드 API 개선 및 최적화, 데이터베이스 쿼리 성능 향상, 시스템 안정성 강화."
        },
        outcome: {
            result: "시스템 안정성 향상 및 사용자 경험 개선.",
            learnings: "레거시 시스템 유지보수 경험 및 성능 최적화 기법 습득."
        }
    },
    {
        id: 18,
        title: "골프 라운드 분석·코스 안내 모바일 앱",
        category: "Mobile",
        summary: "골프 라운드 데이터를 기반으로 코스 정보, 거리 안내, 샷 위치 기록 등을 제공하는 모바일 애플리케이션",
        role: "PM",
        techStack: ["React Native", ".NET", "MS SQL"],
        nda: true,
        year: "2022",
        problem: {
            background: "골프 라운드 중 실시간 코스 정보 및 거리 안내의 부재, 라운드 이력 관리의 어려움.",
            requirements: ["실시간 코스 정보 제공", "거리 안내 기능", "샷 위치 기록", "라운드 이력 관리"],
            environment: "골프 애호가 대상 모바일 서비스"
        },
        approach: {
            strategy: "React Native로 크로스 플랫폼 모바일 앱 개발, .NET 백엔드와 연동하여 실시간 데이터 처리.",
            myRoleFocus: "프로젝트 관리, 요구사항 정의 및 일정 관리."
        },
        outcome: {
            result: "골프 라운드 중 실시간 정보 제공으로 사용자 만족도 향상.",
            learnings: "모바일 앱 프로젝트 관리 및 .NET 백엔드 연동 경험."
        }
    },
    {
        id: 19,
        title: "성형외과 관리 & 광고 앱",
        category: "Mobile",
        summary: "병원 회원관리, 예약/상담, 광고관리 기능을 제공하는 모바일 애플리케이션",
        role: "앱 개발",
        techStack: ["Flutter"],
        nda: true,
        year: "2022",
        problem: {
            background: "성형외과 병원의 회원 관리 및 예약 시스템의 모바일화 필요성, 광고 관리 기능 통합 요구.",
            requirements: ["회원 관리", "예약 및 상담 관리", "광고 관리"],
            environment: "성형외과 병원"
        },
        approach: {
            strategy: "Flutter를 활용한 크로스 플랫폼 모바일 앱 개발로 iOS와 Android 동시 지원.",
            myRoleFocus: "Flutter 앱 개발 및 UI/UX 구현."
        },
        outcome: {
            result: "모바일 환경에서의 효율적인 회원 및 예약 관리 시스템 구축.",
            learnings: "Flutter 프레임워크 활용 경험 및 모바일 앱 개발 역량 강화."
        }
    },
    {
        id: 20,
        title: "어린이 교육 앱 & 어드민",
        category: "Platform",
        summary: "강사관리, 회원관리, 콘텐츠 관리, 게시판, 결제 기능을 포함한 어린이 교육 플랫폼",
        role: "PM",
        techStack: ["PHP", "CodeIgniter"],
        nda: true,
        year: "2022",
        problem: {
            background: "어린이 교육 서비스의 통합 관리 시스템 부재 및 콘텐츠 관리의 비효율성.",
            requirements: ["강사 관리", "회원 관리", "콘텐츠 관리", "게시판", "결제 시스템"],
            environment: "어린이 교육 서비스"
        },
        approach: {
            strategy: "CodeIgniter 프레임워크를 활용한 웹 기반 관리 시스템 구축 및 결제 모듈 연동.",
            myRoleFocus: "프로젝트 관리, 요구사항 분석 및 일정 관리."
        },
        outcome: {
            result: "통합 관리 시스템 구축으로 운영 효율성 향상.",
            learnings: "교육 서비스 도메인 이해 및 PHP 기반 시스템 관리 경험."
        }
    },
    {
        id: 21,
        title: "키오스크 연동 프린팅 서비스",
        category: "Platform",
        summary: "프린팅 서비스 앱, 어드민, 사용자 관리 기능을 제공하는 키오스크 연동 시스템",
        role: "PM",
        techStack: ["PHP", "MariaDB", "React Native"],
        nda: true,
        year: "2022",
        problem: {
            background: "키오스크를 통한 프린팅 서비스의 자동화 및 사용자 관리 시스템 필요성.",
            requirements: ["프린팅 서비스 앱", "어드민 시스템", "사용자 관리"],
            environment: "키오스크 프린팅 서비스"
        },
        approach: {
            strategy: "React Native로 모바일 앱 개발, PHP 기반 어드민 시스템 구축, MariaDB로 데이터 관리.",
            myRoleFocus: "프로젝트 관리 및 전체 시스템 아키텍처 설계."
        },
        outcome: {
            result: "키오스크 연동 프린팅 서비스 자동화 달성.",
            learnings: "하드웨어(키오스크) 연동 시스템 개발 경험."
        }
    },
    {
        id: 22,
        title: "팝업스토어 매칭 서비스",
        category: "Platform",
        summary: "공간, 회원, 업체 관리, 결제, 구독 기반 플랫폼을 제공하는 팝업스토어 매칭 서비스",
        role: "PM, 백엔드 개발",
        techStack: ["Spring Boot", "MySQL"],
        nda: true,
        year: "2022",
        problem: {
            background: "팝업스토어 공간과 업체 간 매칭 플랫폼 부재 및 구독 기반 서비스 모델 필요성.",
            requirements: ["공간 관리", "회원 관리", "업체 관리", "결제 시스템", "구독 관리"],
            environment: "팝업스토어 매칭 플랫폼"
        },
        approach: {
            strategy: "Spring Boot 기반 RESTful API 설계 및 구독 기반 결제 시스템 구현.",
            myRoleFocus: "프로젝트 관리, 백엔드 API 개발, 데이터베이스 설계."
        },
        outcome: {
            result: "팝업스토어 매칭 플랫폼 구축 및 구독 기반 서비스 런칭.",
            learnings: "구독 기반 비즈니스 모델 구현 및 매칭 플랫폼 개발 경험."
        }
    },
    {
        id: 23,
        title: "반려동물 쇼핑몰 웹/앱",
        category: "Platform",
        summary: "반려동물용품 쇼핑몰 시스템",
        role: "PM",
        techStack: ["Spring Boot", "MySQL"],
        nda: true,
        year: "2022",
        problem: {
            background: "반려동물용품 전용 쇼핑몰 플랫폼 필요성 및 웹/앱 통합 서비스 요구.",
            requirements: ["상품 관리", "주문 관리", "결제 시스템", "회원 관리"],
            environment: "반려동물용품 쇼핑몰"
        },
        approach: {
            strategy: "Spring Boot 기반 백엔드 시스템 구축 및 웹/앱 통합 API 제공.",
            myRoleFocus: "프로젝트 관리, 요구사항 분석 및 일정 관리."
        },
        outcome: {
            result: "반려동물용품 쇼핑몰 플랫폼 구축 및 서비스 런칭.",
            learnings: "이커머스 플랫폼 개발 경험 및 반려동물 시장 이해."
        }
    },
    {
        id: 24,
        title: "문화재단·박물관·기념관 웹사이트·어드민",
        category: "Platform",
        summary: "기관 웹사이트 개발 및 관리자 페이지 구축",
        role: "PM, 백엔드 개발",
        techStack: ["Spring Boot", "MySQL"],
        nda: true,
        year: "2022",
        problem: {
            background: "문화재단, 박물관, 기념관의 디지털 전시 및 정보 제공 플랫폼 필요성.",
            requirements: ["기관 웹사이트", "관리자 페이지", "콘텐츠 관리", "전시 정보 관리"],
            environment: "문화재단, 박물관, 기념관"
        },
        approach: {
            strategy: "Spring Boot 기반 백엔드 시스템과 관리자 페이지 구축, 웹사이트 콘텐츠 관리 기능 제공.",
            myRoleFocus: "프로젝트 관리, 백엔드 API 개발, 데이터베이스 설계."
        },
        outcome: {
            result: "문화기관 웹사이트 및 관리 시스템 구축으로 디지털 전시 환경 조성.",
            learnings: "공공기관 프로젝트 경험 및 문화 콘텐츠 관리 시스템 개발."
        }
    },
    {
        id: 25,
        title: "자기소개서 첨삭 서비스 웹",
        category: "Platform",
        summary: "회원관리, 구독 결제, 강사 피드백 시스템을 포함한 자기소개서 첨삭 서비스",
        role: "PM",
        techStack: ["Spring Boot", "JQuery", "MySQL"],
        nda: true,
        year: "2023",
        problem: {
            background: "자기소개서 첨삭 서비스의 디지털화 및 구독 기반 비즈니스 모델 필요성.",
            requirements: ["회원 관리", "구독 결제 시스템", "강사 피드백 시스템"],
            environment: "자기소개서 첨삭 서비스"
        },
        approach: {
            strategy: "Spring Boot 기반 백엔드 시스템 구축 및 구독 결제 모듈 연동, 강사 피드백 워크플로우 설계.",
            myRoleFocus: "프로젝트 관리, 요구사항 분석 및 일정 관리."
        },
        outcome: {
            result: "구독 기반 자기소개서 첨삭 서비스 플랫폼 구축 및 서비스 런칭.",
            learnings: "구독 기반 비즈니스 모델 구현 및 교육 서비스 플랫폼 개발 경험."
        }
    },
    {
        id: 26,
        title: "국회 앱 프론트엔드 개발",
        category: "Mobile",
        summary: "국회 관련 앱 프론트 기능 구현 및 패키징",
        role: "프론트엔드 개발",
        techStack: ["React", "JavaScript"],
        nda: true,
        year: "2023",
        problem: {
            background: "국회 관련 정보를 제공하는 모바일 앱의 프론트엔드 개발 필요성.",
            requirements: ["프론트엔드 기능 구현", "앱 패키징"],
            environment: "국회 관련 모바일 서비스"
        },
        approach: {
            strategy: "React를 활용한 모바일 앱 프론트엔드 개발 및 앱 패키징 프로세스 구현.",
            myRoleFocus: "React 기반 프론트엔드 개발 및 UI/UX 구현."
        },
        outcome: {
            result: "국회 앱 프론트엔드 개발 완료 및 앱 패키징 성공.",
            learnings: "React 기반 모바일 앱 개발 및 공공기관 프로젝트 경험."
        }
    },
    {
        id: 27,
        title: "세무 자동화 프로그램",
        category: "Enterprise",
        summary: "세무 처리 자동화 시스템",
        role: "PM",
        techStack: ["Spring Boot", "MySQL"],
        nda: true,
        year: "2023",
        problem: {
            background: "수기 기반 세무 처리의 비효율성 및 자동화 필요성.",
            requirements: ["세무 처리 자동화", "데이터 관리"],
            environment: "세무 처리 시스템"
        },
        approach: {
            strategy: "Spring Boot 기반 자동화 시스템 구축 및 세무 처리 프로세스 최적화.",
            myRoleFocus: "프로젝트 관리, 요구사항 분석 및 일정 관리."
        },
        outcome: {
            result: "세무 처리 자동화로 업무 효율성 향상.",
            learnings: "세무 도메인 이해 및 자동화 시스템 개발 경험."
        }
    },
    {
        id: 28,
        title: "이미지 분석 AI GUI",
        category: "AI",
        summary: "이미지 분석 ML 모델용 GUI 개발",
        role: "PM",
        techStack: ["Python"],
        nda: true,
        year: "2023",
        problem: {
            background: "이미지 분석 ML 모델의 사용자 친화적인 인터페이스 필요성.",
            requirements: ["GUI 개발", "ML 모델 연동"],
            environment: "이미지 분석 AI 서비스"
        },
        approach: {
            strategy: "Python 기반 GUI 개발 및 ML 모델 연동 인터페이스 구현.",
            myRoleFocus: "프로젝트 관리, 요구사항 분석 및 일정 관리."
        },
        outcome: {
            result: "이미지 분석 AI 모델용 GUI 개발 완료.",
            learnings: "AI 모델 GUI 개발 경험 및 Python 기반 인터페이스 구현."
        }
    },
    {
        id: 29,
        title: "한국어 AI 분석 서비스 앱",
        category: "AI",
        summary: "한국어 분석 모델 기반 모바일 서비스 및 관리자 페이지",
        role: "PM, 백엔드 개발",
        techStack: ["Spring Boot", "MySQL", "WebView"],
        nda: true,
        year: "2023",
        problem: {
            background: "한국어 분석 AI 모델을 활용한 모바일 서비스 및 관리 시스템 필요성.",
            requirements: ["모바일 서비스", "관리자 페이지", "한국어 분석 모델 연동"],
            environment: "한국어 AI 분석 서비스"
        },
        approach: {
            strategy: "Spring Boot 기반 백엔드 시스템 구축 및 WebView를 활용한 모바일 앱 개발, 한국어 분석 모델 API 연동.",
            myRoleFocus: "프로젝트 관리, 백엔드 API 개발, 데이터베이스 설계."
        },
        outcome: {
            result: "한국어 AI 분석 서비스 앱 및 관리자 페이지 구축 완료.",
            learnings: "AI 모델 연동 경험 및 WebView 기반 모바일 앱 개발."
        }
    },
    {
        id: 30,
        title: "건강기능식품 분석 서비스 앱",
        category: "AI",
        summary: "상품 데이터 분석·관리, 어드민 시스템을 포함한 건강기능식품 분석 서비스",
        role: "PM, 백엔드 개발",
        techStack: ["Spring Boot", "MySQL", "Python"],
        nda: true,
        year: "2023",
        problem: {
            background: "건강기능식품 상품 데이터 분석 및 관리 시스템 필요성.",
            requirements: ["상품 데이터 분석", "데이터 관리", "어드민 시스템"],
            environment: "건강기능식품 분석 서비스"
        },
        approach: {
            strategy: "Spring Boot 기반 백엔드 시스템 구축 및 Python을 활용한 데이터 분석 모듈 개발.",
            myRoleFocus: "프로젝트 관리, 백엔드 API 개발, 데이터베이스 설계, Python 분석 스크립트 개발."
        },
        outcome: {
            result: "건강기능식품 분석 서비스 앱 및 어드민 시스템 구축 완료.",
            learnings: "데이터 분석 시스템 개발 경험 및 Python과 Spring Boot 연동."
        }
    },
    {
        id: 31,
        title: "천문학 학습 플랫폼",
        category: "Platform",
        summary: "우주 탐험·천문학 학습을 위한 인터랙티브 교육 플랫폼",
        role: "프론트엔드 개발",
        techStack: ["React 18", "TypeScript", "Tailwind", "Firebase"],
        nda: true,
        year: "2025",
        problem: {
            background: "천문학 학습을 위한 인터랙티브하고 시각적으로 매력적인 교육 플랫폼 필요성.",
            requirements: ["인터랙티브 학습 콘텐츠", "우주 탐험 시뮬레이션", "사용자 학습 이력 관리"],
            environment: "교육 플랫폼"
        },
        approach: {
            strategy: "React 18과 Tailwind를 활용한 현대적인 UI/UX 구현 및 Firebase를 통한 실시간 데이터 관리.",
            myRoleFocus: "프론트엔드 개발, 인터랙티브 UI 구현, Firebase 연동."
        },
        outcome: {
            result: "천문학 학습 플랫폼 구축 및 사용자 만족도 향상.",
            learnings: "교육 콘텐츠 플랫폼 개발 경험 및 인터랙티브 UI 구현."
        }
    },
    {
        id: 32,
        title: "수질 안전 모니터링 시스템",
        category: "Platform",
        summary: "실시간 수질 데이터 모니터링, 지도 기반 가정별 상태 표시",
        role: "프론트·백엔드 개발",
        techStack: ["React", "TypeScript", "Google Maps API", "Firebase"],
        nda: true,
        year: "2025",
        problem: {
            background: "수질 안전 모니터링의 실시간성 및 지도 기반 시각화 필요성.",
            requirements: ["실시간 수질 데이터 모니터링", "지도 기반 가정별 상태 표시", "데이터 시각화"],
            environment: "수질 모니터링 서비스"
        },
        approach: {
            strategy: "Google Maps API를 활용한 지도 기반 시각화 및 Firebase를 통한 실시간 데이터 처리.",
            myRoleFocus: "프론트엔드 및 백엔드 개발, Google Maps API 연동, Firebase 실시간 데이터 처리."
        },
        outcome: {
            result: "실시간 수질 모니터링 시스템 구축 및 사용자 접근성 향상.",
            learnings: "지도 기반 데이터 시각화 및 실시간 모니터링 시스템 개발 경험."
        }
    },
    {
        id: 33,
        title: "AR 기반 블록 찾기 게임",
        category: "Mobile",
        summary: "QR 기반 AR 게임, 3D 모델 표시",
        role: "프론트엔드 개발",
        techStack: ["React 19", "Bootstrap", "AR.js", "Three.js", "html5-qrcode", "Firebase"],
        nda: true,
        year: "2025",
        problem: {
            background: "AR 기술을 활용한 인터랙티브 게임 경험 제공 필요성.",
            requirements: ["QR 코드 기반 AR 기능", "3D 모델 표시", "게임 로직 구현"],
            environment: "AR 게임 서비스"
        },
        approach: {
            strategy: "AR.js와 Three.js를 활용한 AR 환경 구축 및 html5-qrcode를 통한 QR 코드 인식.",
            myRoleFocus: "프론트엔드 개발, AR.js 및 Three.js 연동, QR 코드 인식 기능 구현."
        },
        outcome: {
            result: "AR 기반 블록 찾기 게임 구축 및 사용자 참여도 향상.",
            learnings: "AR 기술 활용 경험 및 3D 모델 렌더링."
        }
    },
    {
        id: 34,
        title: "벌 관련 데이터 플랫폼",
        category: "Platform",
        summary: "벌 생태 및 지도 기반 위치 정보 관리 서비스",
        role: "풀스택 개발",
        techStack: ["React", "TypeScript", "Leaflet", "Chart.js", "Firebase", "FastAPI"],
        nda: true,
        year: "2025",
        problem: {
            background: "벌 생태 데이터의 체계적 관리 및 지도 기반 위치 정보 시각화 필요성.",
            requirements: ["벌 생태 데이터 관리", "지도 기반 위치 정보", "데이터 시각화"],
            environment: "벌 생태 데이터 플랫폼"
        },
        approach: {
            strategy: "Leaflet을 활용한 지도 기반 시각화 및 Chart.js를 통한 데이터 차트 구현, FastAPI 백엔드 구축.",
            myRoleFocus: "풀스택 개발, Leaflet 및 Chart.js 연동, FastAPI 백엔드 개발."
        },
        outcome: {
            result: "벌 생태 데이터 플랫폼 구축 및 데이터 접근성 향상.",
            learnings: "지도 기반 데이터 플랫폼 개발 경험 및 생태 데이터 관리."
        }
    },
    {
        id: 35,
        title: "영양 분석 서비스",
        category: "AI",
        summary: "AI 기반 영양 분석 및 추천 서비스",
        role: "풀스택 개발",
        techStack: ["React", "Django REST Framework", "OpenAI API"],
        nda: true,
        year: "2025",
        problem: {
            background: "개인 맞춤형 영양 분석 및 추천 서비스 필요성.",
            requirements: ["AI 기반 영양 분석", "개인 맞춤 추천", "사용자 데이터 관리"],
            environment: "영양 분석 서비스"
        },
        approach: {
            strategy: "OpenAI API를 활용한 AI 기반 영양 분석 및 Django REST Framework를 통한 백엔드 구축.",
            myRoleFocus: "풀스택 개발, OpenAI API 연동, Django REST Framework 백엔드 개발."
        },
        outcome: {
            result: "AI 기반 영양 분석 서비스 구축 및 사용자 만족도 향상.",
            learnings: "AI API 연동 경험 및 영양 도메인 이해."
        }
    },
    {
        id: 36,
        title: "배달 주문 관리 시스템",
        category: "Platform",
        summary: "주문 관리, 상품 관리, 매출 통계 대시보드",
        role: "프론트·백엔드 개발",
        techStack: ["React", "Chart.js", "Firebase"],
        nda: true,
        year: "2025",
        problem: {
            background: "배달 주문 관리의 효율성 및 매출 통계 시각화 필요성.",
            requirements: ["주문 관리", "상품 관리", "매출 통계 대시보드"],
            environment: "배달 주문 관리 서비스"
        },
        approach: {
            strategy: "Firebase를 활용한 실시간 주문 관리 및 Chart.js를 통한 매출 통계 시각화.",
            myRoleFocus: "프론트엔드 및 백엔드 개발, Firebase 연동, Chart.js를 활용한 대시보드 구현."
        },
        outcome: {
            result: "배달 주문 관리 시스템 구축 및 운영 효율성 향상.",
            learnings: "이커머스 주문 관리 시스템 개발 경험 및 실시간 데이터 처리."
        }
    },
    {
        id: 37,
        title: "학교 동아리 클럽 관리 시스템",
        category: "Platform",
        summary: "동아리 조회/신청, 관리자 기능, 출석체크, 마이페이지",
        role: "풀스택 개발",
        techStack: ["Svelte", "Vite", "Firebase"],
        nda: true,
        year: "2025",
        problem: {
            background: "학교 동아리 관리의 디지털화 및 출석 관리 자동화 필요성.",
            requirements: ["동아리 조회/신청", "관리자 기능", "출석체크", "마이페이지"],
            environment: "학교 동아리 관리 시스템"
        },
        approach: {
            strategy: "Svelte와 Vite를 활용한 현대적인 프론트엔드 구축 및 Firebase를 통한 실시간 데이터 관리.",
            myRoleFocus: "풀스택 개발, Svelte 프론트엔드 개발, Firebase 연동."
        },
        outcome: {
            result: "학교 동아리 관리 시스템 구축 및 관리 효율성 향상.",
            learnings: "Svelte 프레임워크 활용 경험 및 교육 기관 시스템 개발."
        }
    },
    {
        id: 38,
        title: "야구 외야수 포지셔닝 최적화 시스템",
        category: "AI",
        summary: "타구 데이터 분석 기반 외야수 최적 배치 계산 및 시각화 웹 애플리케이션",
        role: "풀스택 개발, API 연동, 최적화 알고리즘 구현, 클라우드 배포",
        techStack: ["Python", "Flask", "Matplotlib", "NumPy", "Pandas", "JavaScript", "REST API", "PythonAnywhere"],
        nda: true,
        year: "2025",
        problem: {
            background: "야구 경기에서 외야수 포지셔닝의 최적화 필요성 및 데이터 기반 의사결정 지원.",
            requirements: ["타구 데이터 분석", "외야수 최적 배치 계산", "시각화 웹 애플리케이션"],
            environment: "야구 분석 서비스"
        },
        approach: {
            strategy: "타구 데이터를 분석하여 최적화 알고리즘을 구현하고, Flask 기반 웹 애플리케이션으로 시각화.",
            myRoleFocus: "풀스택 개발, API 연동, 최적화 알고리즘 구현, 클라우드 배포, Matplotlib을 활용한 시각화."
        },
        outcome: {
            result: "야구 외야수 포지셔닝 최적화 시스템 구축 및 데이터 기반 의사결정 지원.",
            learnings: "스포츠 데이터 분석 및 최적화 알고리즘 구현 경험."
        }
    }
];
