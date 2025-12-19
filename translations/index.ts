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
        },
        project_page: {
            title: 'Projects',
            subtitle: 'Selected works and experiments from 2021-2025.',
            role: 'Role',
            nda: 'NDA (Partial)',
            empty: 'No projects match the selected filters.',
            reset: 'Reset Filters',
            tech_stack: 'Tech Stack:',
            all: 'All'
        },
        skills_page: {
            hero: {
                title: 'Skills Universe',
                subtitle: 'Wide spectrum of technologies bridged for problem solving.\nNot just a list, but a proven ecosystem.'
            },
            core: {
                title: 'Core Competencies',
                problem_solving: {
                    title: 'Problem Solving',
                    desc: 'From planning to deployment & operation. Full-cycle implementation capability.'
                },
                architecture: {
                    title: 'Architecture',
                    desc: 'Integrated design across Frontend, Backend, AI, and Infrastructure.'
                },
                scalability: {
                    title: 'Scalability',
                    desc: 'Experience expanding from MVP to service-level scale.'
                },
                education: {
                    title: 'Education',
                    desc: 'Practical-based teaching and documentation skills.'
                }
            },
            stack: {
                title: 'Technical Stack',
                language: { title: 'Language', row1: 'Languages', row2: 'Focus', focus_desc: 'Maintenance, Scalability, Automation' },
                frontend: { title: 'Frontend', row1: 'Frameworks', row2: 'Tools & Creative' },
                backend: { title: 'Backend', row1: 'Server', row2: 'Concepts & Serverless' },
                app: { title: 'App', row1: 'Mobile' },
                database: { title: 'Database', row1: 'DB Systems' },
                cloud: { title: 'Cloud & Server', row1: 'Cloud Providers', row2: 'DevOps' },
                ai: { title: 'AI & Machine Learning', row1: 'Models & API', row2: 'Engineering' },
                data: { title: 'Data Analysis & Visualization', row1: 'Analysis', row2: 'Visualization' },
                automation: { title: 'Automation & Crawling', row1: 'Tools' },
                tools: { title: 'Development Tools', row1: 'Tools' }
            },
            scenarios: {
                title: 'Usage Scenarios',
                pos: {
                    title: 'Global POS & Billing API',
                    desc: 'Abstracting complex local tax regulations into a single API,\nreducing settlement errors to 0% for global stores.'
                },
                chatbot: {
                    title: 'Enterprise AI Chatbot',
                    desc: 'Patent-based hybrid bot that understands context from enterprise data\nand self-coaches on incorrect answers.'
                },
                labeling: {
                    title: 'AI Data Labeling Tool',
                    desc: 'High-efficiency web workflow for loading massive datasets\nand validating AI-labeled results without installation.'
                },
                edu: {
                    title: 'Automated Education System',
                    desc: 'Automating 100% of repetitive grading and feedback tasks,\nallowing educators to focus solely on teaching quality.'
                },
                web: {
                    title: 'Immersive 3D Web',
                    desc: 'Interactive 3D web experiences using React and Three.js.\nOptimized frontend development considering performance and SEO.'
                },
                mobile: {
                    title: 'Cross-Platform MVP',
                    desc: 'Rapid iOS/Android app launch using Flutter and Firebase\nwith real-time data synchronization.'
                }
            },
            trust: {
                badge: 'PATENT PENDING',
                title: 'B2B Chat Solution Architecture',
                desc: 'Patent-2023-0130063\nCustomized AI chatbot solution for B2B customer support.\nIncludes collecting consultation data, automated post-processing, synonym handling, and error retraining modules.'
            }
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
            title_1: '기술과 가능성을',
            title_2: '설계합니다',
            slogan: '기술과 배움을 연결하여, 가능성을 확장합니다.',
            sub_slogan: 'AI · Automation · Web Engineering 기반으로\n학습과 기술의 미래를 정의하는 개발자·교육자',
            btn_portfolio: '포트폴리오 보기',
            btn_build: '개발 영역',
            btn_teaching: '교육 프레임워크',
        },
        highlights: {
            title: '대표 경험 & 핵심 성과',
            items: {
                course: {
                    title: '대표 강의 경험',
                    desc: '부산/울산/경남 ICT 특강, 서울과학기술대 Python 과정, 대구TP AI 실습 등 250명 이상 실전 교육 운영',
                    link: '강의 이력 보기'
                },
                project: {
                    title: '최근 프로젝트 구축',
                    desc: '실내 업무 자동화 시스템, AI 기반 라벨링 툴, 해외 규정 기반 POS 정산 API 등 실전 운영 시스템 개발',
                    link: '프로젝트 보기'
                },
                stack: {
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
            platform: {
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
            title: '주요 업무',
            fullstack: {
                title: '시스템 아키텍처 & CTO',
                desc: 'SaaS 아키텍처 설계, 기술 기획, 개발 조직 리딩 및 기술 전략 수립',
            },
            ai: {
                title: 'AI 자동화 시스템 설계',
                desc: 'GPT·Notion·Sheets 통합 자동화 설계 및 비즈니스 워크플로우 구축',
            },
            creative: {
                title: '웹/백오피스 플랫폼 개발',
                desc: '운영 시스템, 데이터 흐름, 인프라 구성 중심의 고효율 플랫폼 개발',
            },
            teaching: {
                title: 'IT 교육 전문가',
                desc: '기업/대학 실습 강의 운영 및 실무 중심 교육 콘텐츠/커리큘럼 개발',
            }
        },
        teasers: {
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
            title: '지능적인 미래를 만듭니다.',
            desc: '기술과 배움의 경계를 확장하는 프로젝트,\n복잡한 문제를 해결하는 자동화 시스템,\n당신의 가능성을 현실로 만들 협업을 기다립니다.',
            btn: '문의하기 ->',
        },
        project_page: {
            title: '프로젝트',
            subtitle: '2021-2025년의 주요 프로젝트 및 실험작들.',
            role: '역할',
            nda: 'NDA (일부)',
            empty: '선택한 필터와 일치하는 프로젝트가 없습니다.',
            reset: '필터 초기화',
            tech_stack: '기술 스택:',
            all: '전체'
        },
        skills_page: {
            hero: {
                title: 'Skills Universe',
                subtitle: '문제 해결을 위해 연결된 광범위한 기술 스펙트럼.\n단순한 나열이 아닌, 검증된 에코시스템입니다.'
            },
            core: {
                title: '핵심 역량',
                problem_solving: {
                    title: '문제 해결',
                    desc: '기획부터 배포, 운영까지.\n전체 사이클 구현 능력.'
                },
                architecture: {
                    title: '아키텍처',
                    desc: 'Frontend, Backend, AI,\n인프라를 아우르는 통합 설계.'
                },
                scalability: {
                    title: '확장성',
                    desc: 'MVP부터 대규모 서비스까지,\n유연한 확장을 설계합니다.'
                },
                education: {
                    title: '지식 전달',
                    desc: '실무 기반의 교육 및\n문서화 능력.'
                }
            },
            stack: {
                title: '기술 스택',
                language: { title: '언어', row1: 'Languages', row2: '주요 경험', focus_desc: '유지보수, 확장성, 자동화' },
                frontend: { title: '프론트엔드', row1: 'Frameworks', row2: '도구 및 크리에이티브' },
                backend: { title: '백엔드', row1: 'Server', row2: '개념 및 서버리스' },
                app: { title: '앱 개발', row1: 'Mobile' },
                database: { title: '데이터베이스', row1: 'DB Systems' },
                cloud: { title: '클라우드 & 서버', row1: 'Cloud Providers', row2: 'DevOps' },
                ai: { title: 'AI & 머신러닝', row1: '모델 및 API', row2: '엔지니어링' },
                data: { title: '데이터 분석 & 시각화', row1: '분석 도구', row2: '시각화' },
                automation: { title: '자동화 & 크롤링', row1: '도구' },
                tools: { title: '개발 도구', row1: '협업 및 기타' }
            },
            scenarios: {
                title: '활용 시나리오',
                pos: {
                    title: 'Global POS & Billing API',
                    desc: '복잡한 해외 세금 규정과 결제 로직을 단일 API로 추상화하여,\n글로벌 매장의 정산 오류를 0%로 줄이는 백엔드 시스템 구축.'
                },
                chatbot: {
                    title: 'Enterprise AI Chatbot',
                    desc: '기업 상담 데이터를 학습하여 문맥을 파악하고,\n오답을 스스로 코칭하는 특허 기술 기반의 하이브리드 상담 봇.'
                },
                labeling: {
                    title: 'AI Data Labeling Tool',
                    desc: '별도 설치 없이 웹에서 대용량 데이터를 로드하고,\nAI 라벨링 결과를 사람이 빠르게 검수하는 고효율 워크플로우.'
                },
                edu: {
                    title: 'Automated Education System',
                    desc: '과제 제출, 채점, 피드백 발송까지의 반복 업무를 100% 자동화하여,\n교육자가 오직 교육의 질에만 집중할 수 있는 환경 제공.'
                },
                web: {
                    title: 'Immersive 3D Web',
                    desc: 'React와 Three.js를 활용한 인터랙티브 3D 웹 경험.\n성능 최적화와 SEO를 고려한 몰입형 프론트엔드 개발.'
                },
                mobile: {
                    title: 'Cross-Platform MVP',
                    desc: 'Flutter와 Firebase를 활용하여 iOS/Android 앱을\n빠르게 출시하고 실시간 데이터 동기화를 구현.'
                }
            },
            trust: {
                badge: '특허 출원',
                title: '맞춤형 AI챗봇 배포를 위한 B2B 채팅 솔루션',
                desc: '출원번호 특허-2023-0130063 (2023.09.27)\n기업 고객 응대를 위한 맞춤형 AI 챗봇 솔루션.\n상담내용 수집, 후처리 자동화, 동의어 처리, 오류 재학습 모듈 포함.'
            }
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
        },
        project_page: {
            title: 'Projekte',
            subtitle: 'Ausgewählte Arbeiten und Experimente von 2021-2025.',
            role: 'Rolle',
            nda: 'NDA (Teilweise)',
            empty: 'Keine Projekte entsprechen den ausgewählten Filtern.',
            reset: 'Filter zurücksetzen',
            tech_stack: 'Tech Stack:',
            all: 'Alle'
        },
        skills_page: {
            hero: {
                title: 'Skills Universe',
                subtitle: 'Wide spectrum of technologies bridged for problem solving.\nNot just a list, but a proven ecosystem.'
            },
            core: {
                title: 'Core Competencies',
                problem_solving: {
                    title: 'Problem Solving',
                    desc: 'From planning to deployment & operation. Full-cycle implementation capability.'
                },
                architecture: {
                    title: 'Architecture',
                    desc: 'Integrated design across Frontend, Backend, AI, and Infrastructure.'
                },
                scalability: {
                    title: 'Scalability',
                    desc: 'Experience expanding from MVP to service-level scale.'
                },
                education: {
                    title: 'Education',
                    desc: 'Practical-based teaching and documentation skills.'
                }
            },
            stack: {
                title: 'Technical Stack',
                language: { title: 'Sprache', row1: 'Sprachen', row2: 'Fokus', focus_desc: 'Wartung, Skalierbarkeit, Automatisierung' },
                frontend: { title: 'Frontend', row1: 'Frameworks', row2: 'Tools & Creative' },
                backend: { title: 'Backend', row1: 'Server', row2: 'Konzepte & Serverless' },
                app: { title: 'App', row1: 'Mobile' },
                database: { title: 'Datenbank', row1: 'DB-Systeme' },
                cloud: { title: 'Cloud & Server', row1: 'Cloud-Anbieter', row2: 'DevOps' },
                ai: { title: 'KI & Maschinelles Lernen', row1: 'Modelle & API', row2: 'Engineering' },
                data: { title: 'Datenanalyse & Visualisierung', row1: 'Analyse', row2: 'Visualisierung' },
                automation: { title: 'Automatisierung & Crawling', row1: 'Tools' },
                tools: { title: 'Entwicklungstools', row1: 'Tools' }
            },
            scenarios: {
                title: 'Usage Scenarios',
                chatbot: {
                    title: 'B2B AI Chatbot',
                    desc: 'High-performance API server for enterprise AI solutions with scalable infrastructure.'
                },
                automation: {
                    title: 'Course Automation',
                    desc: 'Automating student management and content distribution workflows.'
                },
                web: {
                    title: 'Interactive Web',
                    desc: 'Immersive 3D web experiences with optimized performance and SEO.'
                },
                app: {
                    title: 'Cross-Platform App',
                    desc: 'Rapid MVP development for both iOS and Android with real-time database sync.'
                }
            },
            trust: {
                badge: 'PATENT PENDING',
                title: 'B2B Chat Solution Architecture',
                desc: 'Patent-2023-0130063\nMaßgeschneiderte KI-Chatbot-Lösung für den B2B-Kundensupport.\nBeinhaltet Module für Datenerfassung, Nachbearbeitung, Synonymverarbeitung und Fehlertraining.'
            }
        }
    }
}
