export type Locale = 'en' | 'ko' | 'de'

export const translations = {
    en: {
        nav: {
            home: 'Home',
            about: 'About',
            projects: 'Projects',
            skills: 'Skills',
            teaching: 'Teaching',
            contact: 'Contact',
        },
        hero: {
            title_1: 'Connecting Tech',
            title_2: 'with Possibility',
            slogan: 'Bridging development, education, and automation to expand potential.',
            sub_slogan: 'Developer & Educator extending the boundaries of learning and technology through AI, Automation, and Web Engineering.',
            btn_portfolio: 'Portfolio Overview',
            btn_build: 'What I Build',
            btn_teaching: 'Teaching Framework',
        },
        highlights: {
            title: 'Highlights',
            items: {
                project: {
                    title: 'Representative Domains',
                    desc: 'Practical platform engineering across AI, Automation, and Web Systems (Online exams, POS/ERP, AI analytics, ArtStage)',
                    link: 'View Projects'
                },
                course: {
                    title: 'Featured Course',
                    desc: 'Full Stack Web Development: From React to Database Architecture.',
                    link: 'Explore Courses'
                },
                stack: {
                    title: 'Core Tech Stack',
                    desc: 'Next.js, Three.js, Python, Automation Agents.',
                    link: 'View Skills'
                }
            }
        },
        specialized: {
            title: 'Specialized Areas',
            ai: {
                title: 'AI & Automation Engineering',
                desc: 'GPT API, Notion/Sheets integrations, and full workflow automation systems.',
            },
            web: {
                title: 'Fullstack Web Development',
                desc: 'Robust applications built with Next.js, FastAPI, and Supabase.',
            },
            platform: {
                title: 'Platform · ERP · CRM Architecture',
                desc: 'Designing robust platform architectures focusing on data structures and management tools.',
            },
            edu: {
                title: 'Tech Education & Mentoring',
                desc: 'Practical training for universities & bootcamps, and curriculum design.',
            }
        },
        experience: {
            exp: 'Years Dev Experience',
            desc_exp: 'Practical system design & operation',
            teaching: 'Years Teaching',
            desc_teaching: 'Practice-based curriculum lead',
            projects: 'Projects Completed',
            desc_projects: 'Solution-driven development',
            passion: 'Responsibility & Quality',
            desc_passion: 'Execution with ownership',
        },
        whatido: {
            title: 'Professional Responsibilities',
            fullstack: {
                title: 'System Architecture & CTO',
                desc: 'SaaS architecture design, tech strategy, and leading dev teams.',
            },
            ai: {
                title: 'AI Automation System Design',
                desc: 'Designing integrated automation with GPT, Notion, and Sheets.',
            },
            creative: {
                title: 'Web/Backoffice Platforms',
                desc: 'High-efficiency platform development focusing on ops and data flow.',
            },
            teaching: {
                title: 'IT Education Specialist',
                desc: 'Running corporate/uni courses and developing practical curricula.',
            }
        },
        teasers: {
            teaching_title: 'Recent Teaching Highlights',
            teaching_link: 'View all lectures',
            projects_title: 'Recent Projects',
            projects_link: 'Explore projects',
            tech_title: 'Core Technologies',
            tech_link: 'View full skillset',
            teaching_items: [],
            project_items: [],
            tech_items: []
        },
        cta: {
            title: 'Let’s Build Something Intelligent Together.',
            desc: 'Projects extending boundaries of tech and learning.\nWaiting for collaboration to expand your possibilities.',
            btn: 'Contact Me ->',
        }
    },
    ko: {
        nav: {
            home: '홈',
            about: '소개',
            projects: '프로젝트',
            skills: '기술스택',
            teaching: '강의',
            contact: '문의하기',
        },
        hero: {
            title_1: '기술과 가능성의',
            title_2: '경계를 설계합니다.',
            slogan: '기술과 배움을 연결하여, 가능성을 확장합니다.',
            sub_slogan: 'AI · Automation · Web Engineering 기반으로\n학습과 기술의 미래를 정의하는 개발자·교육자',
            btn_portfolio: '포트폴리오 보기',
            btn_build: '개발 영역',
            btn_teaching: '교육 프레임워크',
        },
        highlights: {
            title: '대표 경험 & 핵심 성과',
            items: {
                course: { // Mapped to Representative Teaching
                    title: '대표 강의 경험',
                    desc: '부산/울산/경남 ICT 특강, 서울과학기술대 Python 과정, 대구TP AI 실습 등 250명 이상 실전 교육 운영',
                    link: '강의 이력 보기'
                },
                project: { // Mapped to Recent Projects
                    title: '최근 프로젝트 구축',
                    desc: '실내 업무 자동화 시스템, AI 기반 라벨링 툴, 해외 규정 기반 POS 정산 API 등 실전 운영 시스템 개발',
                    link: '프로젝트 보기'
                },
                stack: { // Mapped to Core Tech
                    title: '핵심 기술 역량',
                    desc: 'Next.js, FastAPI, Supabase, GPT API와 LangChain을 활용한 AI·웹·자동화 통합 설계',
                    link: '기술 스택 상세'
                }
            }
        },
        specialized: {
            title: '전문 분야',
            ai: {
                title: 'AI & 자동화 엔지니어링',
                desc: 'GPT API, Notion/Sheets 자동화, 데이터 기반 업무 흐름 최적화 설계',
            },
            web: {
                title: '풀스택 웹 개발',
                desc: 'Next.js + FastAPI 기반의 확장 가능한 서비스 및 백오피스 개발',
            },
            platform: { // New 4th item
                title: '플랫폼·ERP·CRM 설계',
                desc: '운영 시스템, 관리 도구, 데이터 구조 중심의 견고한 플랫폼 아키텍처 설계',
            },
            edu: {
                title: '기술 교육 & 멘토링',
                desc: '대학·기업·부트캠프 대상 실습형 강의 운영 및 맞춤형 커리큘럼 설계',
            }
        },
        experience: {
            exp: '년 개발 경력',
            desc_exp: '실무 중심 아키텍처 설계',
            teaching: '년 강의 경력',
            desc_teaching: '실습형 커리큘럼 리딩',
            projects: '완료한 프로젝트',
            desc_projects: '문제 해결 중심의 개발',
            passion: '책임감과 품질',
            desc_passion: '끝까지 완수하는 실행력',
        },
        whatido: {
            title: '주요 업무 (Professional Responsibilities)',
            fullstack: { // Maps to System Arch
                title: '시스템 아키텍처 & CTO',
                desc: 'SaaS 아키텍처 설계, 기술 기획, 개발 조직 리딩 및 기술 전략 수립',
            },
            ai: { // Maps to AI Auto
                title: 'AI 자동화 시스템 설계',
                desc: 'GPT·Notion·Sheets 통합 자동화 설계 및 비즈니스 워크플로우 구축',
            },
            creative: { // Maps to Web/Backoffice (Reusing key to avoid changing component logic too much if possible)
                title: '웹/백오피스 플랫폼 개발',
                desc: '운영 시스템, 데이터 흐름, 인프라 구성 중심의 고효율 플랫폼 개발',
            },
            teaching: { // Maps to IT Edu
                title: 'IT 교육 전문가',
                desc: '기업/대학 실습 강의 운영 및 실무 중심 교육 콘텐츠/커리큘럼 개발',
            }
        },
        teasers: { // Legacy, keeping to prevent errors
            teaching_title: '최근 강의 하이라이트',
            teaching_link: '모든 강의 보기',
            projects_title: '최근 프로젝트',
            projects_link: '프로젝트 탐색',
            tech_title: '핵심 기술',
            tech_link: '기술 스택 보기',
            teaching_items: [],
            project_items: [],
            tech_items: []
        },
        cta: {
            title: '함께 지능적인 미래를 만들어갑시다.',
            desc: '기술과 배움의 경계를 확장하는 프로젝트,\n복잡한 문제를 해결하는 자동화 시스템,\n당신의 가능성을 현실로 만들 협업을 기다립니다.',
            btn: '문의하기 ->',
        }
    },
    de: {
        nav: {
            home: 'Startseite',
            about: 'Über mich',
            projects: 'Projekte',
            skills: 'Skills',
            teaching: 'Lehre',
            contact: 'Kontakt',
        },
        hero: {
            title_1: 'Technologie und',
            title_2: 'Möglichkeiten verbinden',
            slogan: 'Entwicklung, Bildung und Automatisierung verbinden, um Potenziale zu erweitern.',
            sub_slogan: 'Entwickler & Pädagoge, der die Grenzen von Lernen und Technologie durch KI, Automatisierung und Web-Engineering erweitert.',
            btn_portfolio: 'Portfolio Übersicht',
            btn_build: 'Was ich entwickle',
            btn_teaching: 'Lehr-Framework',
        },
        highlights: {
            title: 'Highlights',
            items: {
                project: {
                    title: 'Repräsentative Bereiche',
                    desc: 'Praxisorientierte Plattformentwicklung in AI, Automation und Websystemen (Online-Prüfungen, POS/ERP, AI-Analytics, usw.)',
                    link: 'Projekte ansehen'
                },
                course: {
                    title: 'Ausgewählter Kurs',
                    desc: 'Full Stack Webentwicklung: Von React zur Datenbankarchitektur.',
                    link: 'Kurse erkunden'
                },
                stack: {
                    title: 'Kerntechnologien',
                    desc: 'Next.js, FastAPI, Supabase, Python, GPT API, Automation Agents.',
                    link: 'Skills ansehen'
                }
            }
        },
        specialized: {
            title: 'Fachgebiete',
            ai: {
                title: 'KI & Automatisierungs-Engineering',
                desc: 'GPT-API, Notion/Sheets-Integrationen vollautomatisierte Workflows.',
            },
            web: {
                title: 'Fullstack Webentwicklung',
                desc: 'Robuste Anwendungen mit Next.js, FastAPI und Supabase.',
            },
            platform: {
                title: 'Plattform · ERP · CRM Architektur',
                desc: 'Entwicklung robuster Plattformarchitekturen für Betrieb und Daten.',
            },
            edu: {
                title: 'Technische Bildung & Mentoring',
                desc: 'Praxisorientiertes Training für Unis & Bootcamps.',
            }
        },
        experience: {
            exp: 'Jahre Entwicklung',
            desc_exp: 'Systemarchitektur design',
            teaching: 'Jahre Lehre',
            desc_teaching: 'Lehrplan-Leitung',
            projects: 'Abgeschlossene Projekte',
            desc_projects: 'Lösungsorientiert',
            passion: 'Verantwortung',
            desc_passion: 'Ausführung mit Ownership',
        },
        whatido: {
            title: 'Berufliche Verantwortlichkeiten',
            fullstack: {
                title: 'Systemarchitektur & CTO',
                desc: 'SaaS-Architektur, Technikstrategie und Leitung von Dev-Teams.',
            },
            ai: {
                title: 'KI-Automatisierungssysteme',
                desc: 'Design integrierter Automatisierung mit GPT & Notion.',
            },
            creative: {
                title: 'Web/Backoffice-Plattformen',
                desc: 'Hocheffiziente Plattformentwicklung Fokus auf Ops.',
            },
            teaching: {
                title: 'IT-Bildungsspezialist',
                desc: 'Durchführung von Firmen-/Uni-Kursen und Lehrplanentwicklung.',
            }
        },
        teasers: {
            teaching_title: 'Aktuelle Lehr-Highlights',
            teaching_link: 'Alle Vorlesungen ansehen',
            projects_title: 'Aktuelle Projekte',
            projects_link: 'Projekte erkunden',
            tech_title: 'Kerntechnologien',
            tech_link: 'Vollständiges Skillset ansehen',
            teaching_items: [],
            project_items: [],
            tech_items: []
        },
        cta: {
            title: 'Lassen Sie uns gemeinsam etwas Intelligentes bauen.',
            desc: 'Projekte, die die Grenzen von Technologie und Lernen überschreiten.\nIch warte auf eine Zusammenarbeit, um Ihre Möglichkeiten zu erweitern.',
            btn: 'Kontaktieren Sie mich ->',
        }
    }
}
