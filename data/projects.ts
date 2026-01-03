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
        id: 1,
        title: "온라인 시험 및 문제 풀이 플랫폼",
        category: "Platform",
        summary: "실시간 시험 운영과 자동 채점을 지원하는 온라인 평가 플랫폼",
        role: "백엔드 설계·개발, DB·보안 시스템 구축",
        techStack: ["Python", "FastAPI", "PostgreSQL", "Supabase", "AWS Lambda"],
        nda: true,
        year: "2025",
        problem: {
            background: "기존 오프라인 시험의 한계와 실시간 채점 시스템의 부재로 인한 운영 비용 증가.",
            requirements: ["대규모 동시 접속 처리 (1000명+)", "부정행위 방지 시스템", "실시간 채점 및 결과 리포트"],
            environment: "대학 및 교육 기관 대상 SaaS"
        },
        approach: {
            strategy: "예측 불가능한 트래픽에 대응하기 위해 서버리스 아키텍처를 도입하여 자동 확장성을 확보했습니다.",
            myRoleFocus: "FastAPI를 활용한 비동기 백엔드 설계 및 AWS Lambda 기반 채점 트리거 최적화."
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
        title: "대회·챌린지 관리 플랫폼",
        category: "Platform",
        summary: "참가·팀·조직 단위 대회 운영과 결제를 지원하는 관리 시스템",
        role: "백엔드 개발, 서버리스 배포",
        techStack: ["Python", "FastAPI", "PostgreSQL", "Stripe", "AWS Lambda"],
        nda: true,
        year: "2025",
        problem: {
            background: "복잡한 대회 규정과 다양한 결제 방식 지원의 어려움.",
            requirements: ["팀 빌딩 및 조 편성 자동화", "글로벌 결제 지원 (Stripe)", "단계별 심사 프로세스"],
        },
        approach: {
            strategy: "규정이 자주 바뀌는 특성을 고려하여, 워크플로우 엔진 기반의 유연한 심사 프로세스를 설계했습니다.",
            myRoleFocus: "결제 모듈 연동 및 상태 머신(State Machine) 기반 대회 진행 로직 구현."
        },
        outcome: {
            result: "연간 50회 이상의 대회 운영 자동화 달성.",
            learnings: "Stripe API의 복잡한 결제/환불 시나리오 처리 노하우 축적."
        }
    },
    {
        id: 3,
        title: "해외 시장용 POS 시스템",
        category: "Enterprise",
        summary: "해외 정산 규정을 반영한 POS 및 매출 리포트 시스템",
        role: "프론트·백엔드 개발",
        techStack: ["React", "TypeScript", "Spring Boot", "MySQL"],
        nda: true,
        year: "2025",
        problem: {
            background: "국가별 상이한 세금 규정과 오프라인 환경에서의 안정성 확보 필요.",
            requirements: ["오프라인 모드 지원", "다국어/다통화 영수증", "실시간 매출 대시보드"],
        },
        approach: {
            strategy: "로컬 퍼스트(Local-First) 아키텍처를 적용하여 오프라인 시 로컬 DB에 저장하고 네트워크 복구 시 동기화.",
            myRoleFocus: "Electron 기반 데스크탑 앱 패키징 및 데이터 동기화 로직 구현."
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
        summary: "선수 컨디션 분석과 AI 기반 맞춤 트레이닝 제공",
        role: "PM, 풀스택 개발",
        techStack: ["React", "TypeScript", "Firebase", "GPT-4", "Gemini"],
        nda: true,
        year: "2025",
        problem: {
            background: "선수별 데이터 파편화로 인한 체계적 관리 부재.",
            requirements: ["웨어러블 데이터 연동", "LLM 기반 코멘트 생성", "모바일 최적화 UI"],
        },
        approach: {
            strategy: "RAG(Retrieval-Augmented Generation) 패턴을 활용하여 선수 과거 데이터를 기반으로 개인화된 피드백 생성.",
            myRoleFocus: "프롬프트 엔지니어링 및 Firebase 실시간 데이터 바인딩."
        },
        outcome: {
            result: "코치진의 데이터 분석 시간 70% 단축.",
            learnings: "생성형 AI의 환각(Hallucination) 제어 및 응답 속도 최적화."
        }
    },
    {
        id: 5,
        title: "농구 슛폼 분석 시스템",
        category: "AI",
        summary: "컴퓨터 비전 기반 슛 자세 분석 및 스코어링",
        role: "AI/ML 엔지니어링",
        techStack: ["Python", "OpenCV", "MediaPipe", "NumPy", "Streamlit"],
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
        summary: "일반·입찰 거래를 지원하는 글로벌 B2B 플랫폼",
        role: "기획, 풀스택 개발",
        techStack: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL"],
        nda: true,
        year: "2024",
        problem: {
            background: "복잡한 무역 절차와 불투명한 가격 정보 해소.",
            requirements: ["실시간 경매/입찰 시스템", "다국어 채팅 번역", "문서 관리 시스템"],
        },
        approach: {
            strategy: "WebSocket을 이용한 실시간 입찰 현황판 구현 및 도메인 주도 설계(DDD) 적용.",
            myRoleFocus: "실시간 통신 서버 구축 및 거래 트랜잭션 안전성 보장."
        },
        outcome: {
            result: "초기 거래액 100만 달러 달성 및 안심 거래 프로세스 정착.",
            learnings: "복잡한 비즈니스 로직을 코드로 녹여내는 도메인 모델링 경험."
        }
    },
    {
        id: 7,
        title: "문화예술 플랫폼",
        category: "Platform",
        summary: "예술인·공연·지원사업 데이터를 통합 관리하는 플랫폼",
        role: "PM, 백엔드 개발",
        techStack: ["Spring Boot", "MySQL", "Python"],
        nda: true,
        year: "2024",
        problem: {
            background: "예술인 DB 관리의 비효율성과 지원 사업 정보 접근성 부족.",
            requirements: ["공공 데이터 수집 및 가공", "통합 검색 엔진", "CMS 구축"],
        },
        approach: {
            strategy: "Python 크롤러를 통한 데이터 파이프라인 구축 및 ElasticSearch 도입을 통한 검색 고도화 검토.",
            myRoleFocus: "데이터 스키마 정규화 및 어드민 대시보드 API 설계."
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
        title: "비대면 진료 관리 앱",
        category: "Mobile",
        summary: "병원 예약·상담·CRM을 통합한 의료 관리 시스템",
        role: "PM, 백엔드 개발",
        techStack: ["Spring Boot", "MySQL", "Flutter", "React Native"],
        nda: true,
        year: "2023",
        problem: {
            background: "팬데믹 이후 비대면 진료 수요 급증에 따른 플랫폼 필요.",
            requirements: ["화상 통화 연동", "처방전 전송 보안", "실시간 예약 관리"],
        },
        approach: {
            strategy: "WebRTC 기반의 안정적인 화상 진료 환경 구축 및 민감 개인정보 암호화 저장.",
            myRoleFocus: "API Gateway 구축 및 인증/인가(OAuth) 보안 강화."
        },
        outcome: {
            result: "일 평균 예약 500건 처리 가능한 안정성 확보.",
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
        id: 11,
        title: "성형외과 CRM 시스템",
        category: "Enterprise",
        summary: "환자·예약·상담·매출 관리 CRM",
        role: "기획, 풀스택 개발",
        techStack: ["Nest.js", "Vue.js", "MySQL"],
        nda: true,
        year: "2021",
        problem: {
            background: "병원 특수성(시술, 상담, 예약, 사진 관리)을 반영한 통합 솔루션 필요.",
            requirements: ["사진 전후 비교 뷰어", "상담 이력 타임라인", "매출 통계"],
        },
        approach: {
            strategy: "SPA(Single Page Application)로 빠른 반응성을 제공하고, 이미지 처리에 최적화된 스토리지 설계.",
            myRoleFocus: "Nest.js 모듈 구조 설계 및 TypeORM을 활용한 데이터 관계 정립."
        },
        outcome: {
            result: "데스크/상담실 업무 혼선 90% 감소.",
            learnings: "풀스택 프레임워크(Nest+Vue)의 효율성 및 대용량 이미지 처리."
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
    }
];
