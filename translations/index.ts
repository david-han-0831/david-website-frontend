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
            title: "Let's Build Something Intelligent Together.",
            desc: 'Projects extending boundaries of tech and learning.\nWaiting for collaboration to expand your possibilities.',
            btn: 'Contact Me ->',
            contact_btn: 'Contact',
        },
        project_page: {
            title: 'Projects',
            subtitle: 'Selected works and experiments from 2015-{currentYear}.',
            role: 'Role',
            nda: 'NDA (Partial)',
            empty: 'No projects match the selected filters.',
            reset: 'Reset Filters',
            tech_stack: 'Tech Stack:',
            year: 'Year:',
            all: 'All',
            loading: 'Loading more projects...',
            allLoaded: 'All projects loaded',
            back_to_list: 'Back to List',
            scroll_to_explore: 'SCROLL TO EXPLORE',
            projects: 'Projects',
            categories: 'Categories',
            years: 'Years',
            inventor: 'Inventor:'
        },
        contact_page: {
            hero: {
                title: 'Get In Touch',
                subtitle_1: 'Let\'s discuss your project',
                subtitle_2: 'and explore possibilities together',
                scroll_to_explore: 'SCROLL TO EXPLORE'
            },
            info: {
                title: 'Let\'s Connect',
                email_label: 'Email',
                social_label: 'Socials',
                email: 'hdy20201004@gmail.com',
                github: 'GitHub',
                linkedin: 'LinkedIn'
            },
            form: {
                name_placeholder: 'Name',
                company_placeholder: 'Company / Organization (Optional)',
                email_placeholder: 'Email',
                phone_placeholder: 'Phone Number (Optional)',
                inquiry_type_label: 'Inquiry Type',
                inquiry_type_options: {
                    general: 'General Inquiry',
                    teaching: 'Teaching / Lecture Request',
                    collaboration: 'Project Collaboration',
                    other: 'Other'
                },
                message_placeholder: 'Message',
                send_button: 'Send Message',
                sending: 'Sending...',
                sent: 'Message Sent!',
                success_message: 'Thank you for your message. I\'ll get back to you soon!',
                error_message: 'Failed to send message. Please try again or contact directly via email.'
            }
        },
        project_detail_page: {
            not_found: 'Project not found',
            back_to_projects: '← Back to Projects',
            problem_context: 'Problem & Context',
            context: 'Context',
            requirements: 'Requirements',
            approach_architecture: 'Approach & Architecture',
            strategy: 'Strategy',
            my_role: 'My Role',
            tech_stack: 'Tech Stack',
            outcome_learnings: 'Outcome & Learnings',
            outcome: 'Outcome',
            learnings: 'Learnings',
            nda_notice: 'This project has been partially disclosed due to NDA. It is organized focusing on structure and approach.'
        },
        about_page: {
            intro: {
                title_1: 'Building structures with technology,',
                title_2: 'connecting with knowledge',
                desc_1: 'I am a developer and educator,',
                desc_2: 'who has been structuring and automating complex problems.',
                desc_3: 'I value creating code, designing systems,',
                desc_4: 'and sharing that process with people.'
            },
            perspective: {
                title: 'HOW I WORK',
                step_1: 'Understanding problems first',
                step_1_highlight: ['problems', 'understanding'],
                step_2: 'Transforming complexity into structure',
                step_2_highlight: ['complexity', 'structure'],
                step_3: 'Reducing repetition through automation',
                step_3_highlight: ['repetition', 'automation'],
                climax: 'Spending remaining time on people and creation',
                climax_highlight: ['people', 'creation'],
                climax_sub: 'This is why I work with technology.'
            },
            timeline: {
                quote_1: '"What was done" is not as important as',
                quote_2: '"What was focused on during that period"',
                sub_quote_1: 'Roles have changed over time,',
                sub_quote_2: 'but the attitude of thinking about structure has always been the same.',
                year_2025: 'Expansion & Integration',
                desc_2025: 'Designing interactive portfolios and digital experiences combining 3D, AR, and automation',
                year_2023: 'Education & Structuring',
                desc_2023: 'Conducting advanced web·AI education, designing enterprise system architecture',
                year_2020: 'System-Centered Development',
                desc_2020: 'Focusing on automation workflows and backend structures to reduce repetitive tasks',
                year_2015: 'Beginning & Exploration',
                desc_2015: 'Discovering the joy of problem-solving through code and algorithms'
            },
            closing: {
                text_1: 'If you have topics you\'d like to discuss together,',
                text_2: 'you\'re always welcome'
            }
        },
        teaching_page: {
            hero: {
                title: 'Teaching Journey',
                subtitle_1: 'Teaching technology and',
                subtitle_2: 'designing thinking',
                scroll: 'Scroll to Explore'
            },
            flow: {
                title: 'Curriculum Flow',
                desc: 'A systematic roadmap from basics to practical automation',
                steps: {
                    basics: {
                        title: 'Programming Fundamentals',
                        desc: 'Code Logic & Syntax'
                    },
                    engineering: {
                        title: 'Frontend / Backend',
                        desc: 'Web Engineering Core'
                    },
                    project: {
                        title: 'Full Stack Project',
                        desc: 'Integrated Service Build'
                    },
                    ai: {
                        title: 'AI Integration',
                        desc: 'LLM & Generative AI'
                    },
                    automation: {
                        title: 'Automation',
                        desc: 'Workflow Optimization'
                    }
                }
            },
            summary: {
                years: { label: 'Total Teaching Experience', value: '3+ Years', sub: 'Since 2023' },
                target: { label: 'Teaching Audience', value: 'Diverse', sub: 'Universities · Companies · Public · Individuals' },
                fields: { label: 'Main Fields', value: '3+', sub: 'Web · AI · Automation' },
                method: { label: 'Operation Method', value: 'Practice', sub: 'Project-based Curriculum' }
            },
            domains: {
                title: 'Teaching Domains',
                desc: '6 lecture areas connecting practice and education',
                frontend: {
                    title: 'Frontend Engineering',
                    desc: 'Frontend development that designs user experience',
                    content: 'HTML/CSS/JS, React, Next.js, UI Implementation',
                    target: 'Non-majors, University Students, Job Seekers',
                    result: 'Web Service for Portfolio'
                },
                backend: {
                    title: 'Backend Engineering',
                    desc: 'Backend development that creates service structure and flow',
                    content: 'FastAPI, Spring Boot, REST API, DB Design',
                    target: 'Backend Job Seekers, Career Changers',
                    result: 'API Server & DB Structure'
                },
                fullstack: {
                    title: 'Full Stack Project',
                    desc: 'Practical project connecting frontend and backend',
                    content: 'React/Next.js + FastAPI, Supabase/Firebase',
                    target: 'Job Seekers, Bootcamp Students',
                    result: 'Deployed Full Stack Web Service'
                },
                ai: {
                    title: 'AI & Generative AI',
                    desc: 'Connecting generative AI to practice',
                    content: 'ChatGPT, GPT API, GPTs, Agent',
                    target: 'Corporate Employees, Planners, Developers',
                    result: 'AI-based Automation Scenarios'
                },
                automation: {
                    title: 'Automation & Workflow',
                    desc: 'Automation design to reduce repetitive tasks',
                    content: 'Notion API, Google Sheets, Make, Slack',
                    target: 'Corporate & Public Sector Practitioners',
                    result: 'Organization-customized Automation Flow'
                },
                basics: {
                    title: 'Programming Basics',
                    desc: 'Basics and career path for those starting development',
                    content: 'Python/Java Basics, Problem-solving Thinking',
                    target: 'Students, Non-major Adults, Beginners',
                    result: 'Basic Project + Roadmap'
                },
                meta: {
                    content: 'Content',
                    target: 'Target',
                    result: 'Result'
                }
            },
            experience: {
                title: 'Experience',
                desc: 'Proven educational achievements in the field',
                items: {
                    '2025': [
                        'Southeast ICT Startup Special Lecture (AI·AWS Bootcamp)',
                        'Seoul National University of Science and Technology Python Intensive Course',
                        'Large Enterprise & Public Sector GPT Work Automation Special Lecture'
                    ],
                    '2023-current': [
                        'Freelance Custom Tutoring (1:1 / 2:1)',
                        'Startup Technical Coaching & Consulting'
                    ]
                }
            },
            style: {
                title: 'Teaching Style',
                philosophy: 'We focus on <strong>practice and results</strong> rather than theory.<br />Not just knowledge transfer,<br />but helping to design <strong>thinking</strong> that solves problems independently.',
                features: [
                    'Project → Presentation → Feedback Loop',
                    'Systematic Learning Management based on Notion',
                    'Practice based on Real-world Automation Cases'
                ]
            },
            operation: {
                title: 'Operation & Tools',
                format: {
                    label: 'Class Format',
                    items: ['Online (Zoom)', 'Offline On-site', 'Hybrid']
                },
                tools: {
                    label: 'Collaboration Tools',
                    items: ['Notion', 'GitHub', 'VSCode', 'Slack']
                }
            },
            cta: {
                title: 'Start Your Journey',
                text: 'Need on-site lectures, special lectures, or custom curriculum?',
                btn: 'Inquiry'
            }
        },
        skills_page: {
            hero: {
                title: 'Technical Skills',
                subtitle_1: 'Selecting optimal technologies',
                subtitle_2: 'for problem solving',
                scroll_to_explore: 'SCROLL TO EXPLORE'
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
                inventor: 'Inventor:',
                patents: [
                    {
                        title: 'B2B Chat Solution Architecture',
                        number: 'Patent-2023-0130063',
                        date: '2023.09.27',
                        inventors: 'Han Dongyun',
                        desc: 'Customized AI chatbot solution for B2B customer support.\nIncludes collecting consultation data, automated post-processing, synonym handling, and error retraining modules.'
                    },
                    {
                        title: 'Dried Laver Grade Determination Device',
                        number: '10-2025-0216295',
                        date: '2025.12.31',
                        inventors: 'Kwon Kiho, Han Dongyun',
                        desc: 'A device that automatically grades dried laver quality through deep learning-based image analysis.\nCombines image preprocessing modules that correct deviations according to shooting environments with machine learning models to quantitatively evaluate multiple quality indicators (gloss, color, foreign matter, wrinkles, clumping, texture) and enable consistent grade calculation.'
                    }
                ]
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
            contact_btn: '문의하기',
        },
        project_page: {
            title: '프로젝트',
            subtitle: '2015-{currentYear}년의 주요 프로젝트 및 실험작들.',
            role: '역할',
            nda: 'NDA (일부)',
            empty: '선택한 필터와 일치하는 프로젝트가 없습니다.',
            reset: '필터 초기화',
            tech_stack: '기술 스택:',
            year: '연도:',
            all: '전체',
            loading: '더 많은 프로젝트 로딩 중...',
            allLoaded: '모든 프로젝트가 로드되었습니다',
            back_to_list: '목록으로 돌아가기',
            scroll_to_explore: '스크롤하여 탐색하기',
            projects: '프로젝트',
            categories: '카테고리',
            years: '연도',
            inventor: '발명자:'
        },
        contact_page: {
            hero: {
                title: '문의하기',
                subtitle_1: '프로젝트를 함께 논의하고',
                subtitle_2: '가능성을 탐색해보세요',
                scroll_to_explore: 'SCROLL TO EXPLORE'
            },
            info: {
                title: '연락처',
                email_label: '이메일',
                social_label: '소셜',
                email: 'hdy20201004@gmail.com',
                github: 'GitHub',
                linkedin: 'LinkedIn'
            },
            form: {
                name_placeholder: '이름',
                company_placeholder: '회사 / 조직 (선택사항)',
                email_placeholder: '이메일',
                phone_placeholder: '연락처 (선택사항)',
                inquiry_type_label: '문의 유형',
                inquiry_type_options: {
                    general: '일반 문의',
                    teaching: '강의 / 출강 문의',
                    collaboration: '프로젝트 협업',
                    other: '기타'
                },
                message_placeholder: '메시지',
                send_button: '메시지 보내기',
                sending: '전송 중...',
                sent: '메시지 전송 완료!',
                success_message: '메시지를 보내주셔서 감사합니다. 곧 답변드리겠습니다!',
                error_message: '메시지 전송에 실패했습니다. 다시 시도하거나 이메일로 직접 연락해주세요.'
            }
        },
        project_detail_page: {
            not_found: '프로젝트를 찾을 수 없습니다',
            back_to_projects: '← 프로젝트 목록으로',
            problem_context: '문제 & 배경',
            context: '배경',
            requirements: '요구사항',
            approach_architecture: '접근 방식 & 아키텍처',
            strategy: '전략',
            my_role: '내 역할',
            tech_stack: '기술 스택',
            outcome_learnings: '결과 & 학습',
            outcome: '결과',
            learnings: '학습',
            nda_notice: '본 프로젝트는 NDA로 인해 일부 정보만 공개되었습니다. 구조와 접근 방식 중심으로 정리되어 있습니다.'
        },
        about_page: {
            intro: {
                title_1: '기술로 구조를 만들고,',
                title_2: '지식으로 연결합니다',
                desc_1: '저는 개발자이자 교육자이며,',
                desc_2: '복잡한 문제를 구조화하고 자동화하는 일을 해왔습니다.',
                desc_3: '코드를 만들고, 시스템을 설계하며,',
                desc_4: '그 과정을 사람들과 나누는 것을 중요하게 생각합니다.'
            },
            perspective: {
                title: 'HOW I WORK',
                step_1: '문제를 먼저 이해합니다',
                step_1_highlight: ['문제', '이해'],
                step_2: '복잡함을 구조로 바꿉니다',
                step_2_highlight: ['복잡함', '구조'],
                step_3: '반복은 자동화로 줄입니다',
                step_3_highlight: ['반복', '자동화'],
                climax: '남은 시간은 사람과 창작에 씁니다',
                climax_highlight: ['사람', '창작'],
                climax_sub: '이것이 제가 기술을 다루는 이유입니다.'
            },
            timeline: {
                quote_1: '"무엇을 했는가"가 아니라',
                quote_2: '"그 시기에 무엇에 집중했는가"',
                sub_quote_1: '시간이 흐르며 역할은 바뀌었지만,',
                sub_quote_2: '구조를 고민하는 태도는 늘 같았습니다.',
                year_2025: '확장과 통합',
                desc_2025: '3D, AR, 자동화를 결합한 인터랙티브 포트폴리오와 디지털 경험을 설계',
                year_2023: '교육과 구조화',
                desc_2023: '고급 웹·AI 교육 진행, 엔터프라이즈 시스템 아키텍처 설계',
                year_2020: '시스템 중심 개발',
                desc_2020: '반복 업무를 줄이기 위한 자동화 워크플로우와 백엔드 구조 집중',
                year_2015: '시작과 탐구',
                desc_2015: '코드와 알고리즘을 통해 문제 해결의 즐거움을 발견'
            },
            closing: {
                text_1: '함께 이야기해볼 주제가 있다면,',
                text_2: '언제든 환영합니다'
            }
        },
        teaching_page: {
            hero: {
                title: '강의 여정',
                subtitle_1: '기술을 가르치고',
                subtitle_2: '사고를 설계합니다',
                scroll: '스크롤하여 탐색하기'
            },
            flow: {
                title: '커리큘럼 플로우',
                desc: '기초부터 실무 자동화까지 이어지는 체계적 로드맵',
                steps: {
                    basics: {
                        title: '프로그래밍 기초',
                        desc: '코드 로직 & 문법'
                    },
                    engineering: {
                        title: '프론트엔드 / 백엔드',
                        desc: '웹 엔지니어링 핵심'
                    },
                    project: {
                        title: '풀스택 프로젝트',
                        desc: '통합 서비스 구축'
                    },
                    ai: {
                        title: 'AI 통합',
                        desc: 'LLM & 생성형 AI'
                    },
                    automation: {
                        title: '자동화',
                        desc: '워크플로우 최적화'
                    }
                }
            },
            summary: {
                years: { label: '총 강의 경력', value: '3년+', sub: 'Since 2023' },
                target: { label: '강의 대상', value: '다양', sub: '대학 · 기업 · 관공서 · 개인' },
                fields: { label: '주요 분야', value: '3+', sub: 'Web · AI · Automation' },
                method: { label: '운영 방식', value: '실습', sub: '프로젝트 중심 커리큘럼' }
            },
            domains: {
                title: '강의 영역',
                desc: '실무와 교육을 연결하는 6가지 강의 영역',
                frontend: {
                    title: '프론트엔드 엔지니어링',
                    desc: '사용자 경험을 설계하는 프론트엔드 개발',
                    content: 'HTML/CSS/JS, React, Next.js, UI 구현',
                    target: '비전공자, 대학생, 취준생',
                    result: '포트폴리오용 웹 서비스'
                },
                backend: {
                    title: '백엔드 엔지니어링',
                    desc: '서비스의 구조와 흐름을 만드는 백엔드 개발',
                    content: 'FastAPI, Spring Boot, REST API, DB 설계',
                    target: '백엔드 취준생, 실무 전환자',
                    result: 'API 서버 및 DB 구조'
                },
                fullstack: {
                    title: '풀스택 프로젝트',
                    desc: '프론트엔드와 백엔드를 연결하는 실전 프로젝트',
                    content: 'React/Next.js + FastAPI, Supabase/Firebase',
                    target: '취업 준비생, 부트캠프 수강생',
                    result: '배포된 풀스택 웹 서비스'
                },
                ai: {
                    title: 'AI & 생성형 AI',
                    desc: '생성형 AI를 실무에 연결하는 방법',
                    content: 'ChatGPT, GPT API, GPTs, Agent',
                    target: '기업 재직자, 기획자, 개발자',
                    result: 'AI 기반 자동화 시나리오'
                },
                automation: {
                    title: '자동화 & 워크플로우',
                    desc: '반복 업무를 줄이는 자동화 설계',
                    content: 'Notion API, Google Sheets, Make, Slack',
                    target: '기업·공공기관 실무자',
                    result: '조직 맞춤 자동화 흐름'
                },
                basics: {
                    title: '프로그래밍 기초',
                    desc: '개발을 시작하는 사람을 위한 기초와 진로',
                    content: 'Python/Java 기초, 문제 해결 사고',
                    target: '학생, 비전공 성인, 입문자',
                    result: '기초 프로젝트 + 로드맵'
                },
                meta: {
                    content: '내용',
                    target: '대상',
                    result: '결과'
                }
            },
            experience: {
                title: 'Experience',
                desc: '현장에서 증명한 교육 실적',
                items: {
                    '2025': [
                        '동남권 ICT 취·창업 특강 (AI·AWS 부트캠프)',
                        '서울과학기술대학교 파이썬 집중 강의',
                        '대기업·공공기관 GPT 업무 자동화 특강'
                    ],
                    '2023-current': [
                        '프리랜서 맞춤 과외 (1:1 / 2:1)',
                        '스타트업 기술 코칭 및 자문'
                    ]
                }
            },
            style: {
                title: '강의 스타일',
                philosophy: '이론보다 <strong>실습과 결과물</strong>을 지향합니다.<br />단순 지식 전달이 아닌,<br />스스로 문제를 해결하는 <strong>사고의 설계</strong>를 돕습니다.',
                features: [
                    '프로젝트 → 발표 → 피드백 루프',
                    'Notion 기반 체계적 학습 관리',
                    '현업 자동화 사례 기반 실습'
                ]
            },
            operation: {
                title: '운영 방식 & 도구',
                format: {
                    label: '수업 형태',
                    items: ['온라인(Zoom)', '오프라인 출강', '하이브리드']
                },
                tools: {
                    label: '협업 도구',
                    items: ['Notion', 'GitHub', 'VSCode', 'Slack']
                }
            },
            cta: {
                title: '여정을 시작하세요',
                text: '출강, 특강, 맞춤 커리큘럼이 필요하신가요?',
                btn: '강의 문의하기'
            }
        },
        skills_page: {
            hero: {
                title: '기술 스택',
                subtitle_1: '문제 해결을 위한',
                subtitle_2: '최적의 기술을 선택합니다',
                scroll_to_explore: 'SCROLL TO EXPLORE'
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
                inventor: '발명자:',
                patents: [
                    {
                        title: '맞춤형 AI챗봇 배포를 위한 B2B 채팅 솔루션',
                        number: '특허-2023-0130063',
                        date: '2023.09.27',
                        inventors: '한동윤',
                        desc: '기업 고객 응대를 위한 맞춤형 AI 챗봇 솔루션.\n상담내용 수집, 후처리 자동화, 동의어 처리, 오류 재학습 모듈 포함.'
                    },
                    {
                        title: '건조 김 등급 결정 장치',
                        number: '10-2025-0216295',
                        date: '2025.12.31',
                        inventors: '권기호, 한동윤',
                        desc: '딥러닝 기반 이미지 분석을 통해 건조 김의 품질을 자동으로 등급화하는 장치.\n촬영 환경에 따른 편차를 보정하는 이미지 전처리 모듈과 기계학습 모델을 결합하여 윤기, 색태, 이물, 주름, 뭉침, 골태 등 복수의 품질 지표를 정량적으로 평가하고 일관된 등급 산출을 가능하게 하는 기술.'
                    }
                ]
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
        about_page: {
            intro: {
                title_1: 'Strukturen mit Technologie bauen,',
                title_2: 'mit Wissen verbinden',
                desc_1: 'Ich bin Entwickler und Pädagoge,',
                desc_2: 'der komplexe Probleme strukturiert und automatisiert hat.',
                desc_3: 'Ich schätze es, Code zu erstellen, Systeme zu entwerfen,',
                desc_4: 'und diesen Prozess mit Menschen zu teilen.'
            },
            perspective: {
                title: 'WIE ICH ARBEITE',
                step_1: 'Probleme zuerst verstehen',
                step_1_highlight: ['Probleme', 'Verstehen'],
                step_2: 'Komplexität in Struktur verwandeln',
                step_2_highlight: ['Komplexität', 'Struktur'],
                step_3: 'Wiederholung durch Automatisierung reduzieren',
                step_3_highlight: ['Wiederholung', 'Automatisierung'],
                climax: 'Verbleibende Zeit für Menschen und Kreativität verwenden',
                climax_highlight: ['Menschen', 'Kreativität'],
                climax_sub: 'Deshalb arbeite ich mit Technologie.'
            },
            timeline: {
                quote_1: '"Was getan wurde" ist nicht so wichtig wie',
                quote_2: '"Worauf sich in dieser Zeit konzentriert wurde"',
                sub_quote_1: 'Rollen haben sich im Laufe der Zeit geändert,',
                sub_quote_2: 'aber die Einstellung, über Struktur nachzudenken, war immer gleich.',
                year_2025: 'Expansion & Integration',
                desc_2025: 'Entwerfen interaktiver Portfolios und digitaler Erfahrungen, die 3D, AR und Automatisierung kombinieren',
                year_2023: 'Bildung & Strukturierung',
                desc_2023: 'Durchführung fortgeschrittener Web·KI-Bildung, Entwerfen von Enterprise-Systemarchitekturen',
                year_2020: 'Systemzentrierte Entwicklung',
                desc_2020: 'Fokus auf Automatisierungs-Workflows und Backend-Strukturen zur Reduzierung repetitiver Aufgaben',
                year_2015: 'Anfang & Erkundung',
                desc_2015: 'Die Freude an der Problemlösung durch Code und Algorithmen entdecken'
            },
            closing: {
                text_1: 'Wenn Sie Themen haben, die Sie gemeinsam besprechen möchten,',
                text_2: 'sind Sie jederzeit willkommen'
            }
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
            contact_btn: 'Kontakt',
        },
        project_page: {
            title: 'Projekte',
            subtitle: 'Ausgewählte Arbeiten und Experimente von 2015-{currentYear}.',
            role: 'Rolle',
            nda: 'NDA (Teilweise)',
            empty: 'Keine Projekte entsprechen den ausgewählten Filtern.',
            reset: 'Filter zurücksetzen',
            tech_stack: 'Tech Stack:',
            year: 'Jahr:',
            all: 'Alle',
            loading: 'Weitere Projekte werden geladen...',
            allLoaded: 'Alle Projekte geladen',
            back_to_list: 'Zurück zur Liste',
            scroll_to_explore: 'SCROLLEN ZUM ERKUNDEN',
            projects: 'Projekte',
            categories: 'Kategorien',
            years: 'Jahre',
            inventor: 'Erfinder:'
        },
        contact_page: {
            hero: {
                title: 'Kontakt aufnehmen',
                subtitle_1: 'Lassen Sie uns Ihr Projekt besprechen',
                subtitle_2: 'und Möglichkeiten gemeinsam erkunden',
                scroll_to_explore: 'SCROLLEN ZUM ERKUNDEN'
            },
            info: {
                title: 'Kontakt',
                email_label: 'E-Mail',
                social_label: 'Soziale Medien',
                email: 'hdy20201004@gmail.com',
                github: 'GitHub',
                linkedin: 'LinkedIn'
            },
            form: {
                name_placeholder: 'Name',
                company_placeholder: 'Firma / Organisation (Optional)',
                email_placeholder: 'E-Mail',
                phone_placeholder: 'Telefonnummer (Optional)',
                inquiry_type_label: 'Anfrageart',
                inquiry_type_options: {
                    general: 'Allgemeine Anfrage',
                    teaching: 'Lehre / Vortragsanfrage',
                    collaboration: 'Projektzusammenarbeit',
                    other: 'Sonstiges'
                },
                message_placeholder: 'Nachricht',
                send_button: 'Nachricht senden',
                sending: 'Wird gesendet...',
                sent: 'Nachricht gesendet!',
                success_message: 'Vielen Dank für Ihre Nachricht. Ich werde mich bald bei Ihnen melden!',
                error_message: 'Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie mich direkt per E-Mail.'
            }
        },
        project_detail_page: {
            not_found: 'Projekt nicht gefunden',
            back_to_projects: '← Zurück zu Projekten',
            problem_context: 'Problem & Kontext',
            context: 'Kontext',
            requirements: 'Anforderungen',
            approach_architecture: 'Ansatz & Architektur',
            strategy: 'Strategie',
            my_role: 'Meine Rolle',
            tech_stack: 'Tech Stack',
            outcome_learnings: 'Ergebnis & Lernen',
            outcome: 'Ergebnis',
            learnings: 'Lernen',
            nda_notice: 'Dieses Projekt wurde aufgrund einer NDA nur teilweise offengelegt. Es konzentriert sich auf Struktur und Ansatz.'
        },
        teaching_page: {
            hero: {
                title: 'Lehrreise',
                subtitle_1: 'Technologie lehren und',
                subtitle_2: 'Denken gestalten',
                scroll: 'Scrollen zum Erkunden'
            },
            flow: {
                title: 'Lehrplan-Ablauf',
                desc: 'Systematische Roadmap von Grundlagen bis zur praktischen Automatisierung',
                steps: {
                    basics: {
                        title: 'Programmiergrundlagen',
                        desc: 'Code-Logik & Syntax'
                    },
                    engineering: {
                        title: 'Frontend / Backend',
                        desc: 'Web-Engineering-Kern'
                    },
                    project: {
                        title: 'Full Stack Projekt',
                        desc: 'Integrierter Service-Aufbau'
                    },
                    ai: {
                        title: 'KI-Integration',
                        desc: 'LLM & Generative KI'
                    },
                    automation: {
                        title: 'Automatisierung',
                        desc: 'Workflow-Optimierung'
                    }
                }
            },
            summary: {
                years: { label: 'Gesamte Lehrerfahrung', value: '3+ Jahre', sub: 'Seit 2023' },
                target: { label: 'Zielgruppe', value: 'Vielfältig', sub: 'Universitäten · Unternehmen · Öffentlich · Einzelpersonen' },
                fields: { label: 'Hauptbereiche', value: '3+', sub: 'Web · KI · Automatisierung' },
                method: { label: 'Betriebsmethode', value: 'Praxis', sub: 'Projektbasiertes Curriculum' }
            },
            domains: {
                title: 'Lehrbereiche',
                desc: '6 Vorlesungsbereiche, die Praxis und Bildung verbinden',
                frontend: {
                    title: 'Frontend-Engineering',
                    desc: 'Frontend-Entwicklung, die Benutzererfahrung gestaltet',
                    content: 'HTML/CSS/JS, React, Next.js, UI-Implementierung',
                    target: 'Nicht-Fachleute, Universitätsstudenten, Jobsuchende',
                    result: 'Web-Service für Portfolio'
                },
                backend: {
                    title: 'Backend-Engineering',
                    desc: 'Backend-Entwicklung, die Servicestruktur und -fluss erstellt',
                    content: 'FastAPI, Spring Boot, REST API, DB-Design',
                    target: 'Backend-Jobsuchende, Karrierewechsler',
                    result: 'API-Server & DB-Struktur'
                },
                fullstack: {
                    title: 'Full-Stack-Projekt',
                    desc: 'Praktisches Projekt, das Frontend und Backend verbindet',
                    content: 'React/Next.js + FastAPI, Supabase/Firebase',
                    target: 'Jobsuchende, Bootcamp-Studenten',
                    result: 'Bereitgestellter Full Stack Web-Service'
                },
                ai: {
                    title: 'KI & Generative KI',
                    desc: 'Generative KI mit der Praxis verbinden',
                    content: 'ChatGPT, GPT API, GPTs, Agent',
                    target: 'Unternehmensmitarbeiter, Planer, Entwickler',
                    result: 'KI-basierte Automatisierungsszenarien'
                },
                automation: {
                    title: 'Automatisierung & Workflow',
                    desc: 'Automatisierungsdesign zur Reduzierung wiederholender Aufgaben',
                    content: 'Notion API, Google Sheets, Make, Slack',
                    target: 'Unternehmens- und öffentliche Praktiker',
                    result: 'Organisationsspezifischer Automatisierungsfluss'
                },
                basics: {
                    title: 'Programmiergrundlagen',
                    desc: 'Grundlagen und Karriereweg für Entwicklungsanfänger',
                    content: 'Python/Java Grundlagen, Problemlösungsdenken',
                    target: 'Studenten, Nicht-Fachleute Erwachsene, Anfänger',
                    result: 'Grundprojekt + Roadmap'
                },
                meta: {
                    content: 'Inhalt',
                    target: 'Ziel',
                    result: 'Ergebnis'
                }
            },
            experience: {
                title: 'Erfahrung',
                desc: 'Bewährte Bildungserfolge im Feld',
                items: {
                    '2025': [
                        'Südost-ICT-Startup-Spezialvorlesung (KI·AWS Bootcamp)',
                        'Seoul National University of Science and Technology Python Intensivkurs',
                        'Großunternehmen & öffentlicher Sektor GPT-Arbeitsautomatisierung Spezialvorlesung'
                    ],
                    '2023-current': [
                        'Freelance maßgeschneiderte Nachhilfe (1:1 / 2:1)',
                        'Startup-Technik-Coaching & Beratung'
                    ]
                }
            },
            style: {
                title: 'Lehrstil',
                philosophy: 'Wir konzentrieren uns auf <strong>Praxis und Ergebnisse</strong> statt Theorie.<br />Nicht nur Wissensvermittlung,<br />sondern Hilfe beim Gestalten von <strong>Denken</strong>, das Probleme selbstständig löst.',
                features: [
                    'Projekt → Präsentation → Feedback-Schleife',
                    'Systematisches Lernmanagement basierend auf Notion',
                    'Praxis basierend auf realen Automatisierungsfällen'
                ]
            },
            operation: {
                title: 'Betrieb & Tools',
                format: {
                    label: 'Kursformat',
                    items: ['Online (Zoom)', 'Offline Vor-Ort', 'Hybrid']
                },
                tools: {
                    label: 'Kollaborationstools',
                    items: ['Notion', 'GitHub', 'VSCode', 'Slack']
                }
            },
            cta: {
                title: 'Beginnen Sie Ihre Reise',
                text: 'Benötigen Sie Vor-Ort-Vorlesungen, Spezialvorlesungen oder maßgeschneiderte Curricula?',
                btn: 'Anfrage stellen'
            }
        },
        skills_page: {
            hero: {
                title: 'Technische Fähigkeiten',
                subtitle_1: 'Auswahl optimaler Technologien',
                subtitle_2: 'für Problemlösung',
                scroll_to_explore: 'SCROLLEN ZUM ERKUNDEN'
            },
            core: {
                title: 'Kernkompetenzen',
                problem_solving: {
                    title: 'Problemlösung',
                    desc: 'Von der Planung bis zur Bereitstellung und zum Betrieb. Vollständige Implementierungsfähigkeit.'
                },
                architecture: {
                    title: 'Architektur',
                    desc: 'Integriertes Design über Frontend, Backend, KI und Infrastruktur.'
                },
                scalability: {
                    title: 'Skalierbarkeit',
                    desc: 'Erfahrung bei der Erweiterung von MVP auf Service-Ebene.'
                },
                education: {
                    title: 'Bildung',
                    desc: 'Praxisorientiertes Lehren und Dokumentationsfähigkeiten.'
                }
            },
            stack: {
                title: 'Technischer Stack',
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
                title: 'Anwendungsszenarien',
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
                inventor: 'Erfinder:',
                patents: [
                    {
                        title: 'B2B Chat Solution Architecture',
                        number: 'Patent-2023-0130063',
                        date: '2023.09.27',
                        inventors: 'Han Dongyun',
                        desc: 'Maßgeschneiderte KI-Chatbot-Lösung für den B2B-Kundensupport.\nBeinhaltet Module für Datenerfassung, Nachbearbeitung, Synonymverarbeitung und Fehlertraining.'
                    },
                    {
                        title: 'Gerät zur Bestimmung der Trockenalgengrade',
                        number: '10-2025-0216295',
                        date: '2025.12.31',
                        inventors: 'Kwon Kiho, Han Dongyun',
                        desc: 'Ein Gerät, das die Qualität von getrockneten Algen automatisch durch Deep-Learning-basierte Bildanalyse einstuft.\nKombiniert Bildvorverarbeitungsmodule, die Abweichungen je nach Aufnahmeumgebung korrigieren, mit maschinellen Lernmodellen, um mehrere Qualitätsindikatoren (Glanz, Farbe, Fremdkörper, Falten, Klumpen, Textur) quantitativ zu bewerten und eine konsistente Einstufung zu ermöglichen.'
                    }
                ]
            }
        }
    }
}
