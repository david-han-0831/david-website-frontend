# David Han - Interactive Portfolio Website

한동윤(David Han)의 인터랙티브 포트폴리오 웹사이트입니다.  
개발자, 교육자, 창업가로서의 경험과 프로젝트를 소개하는 개인 포트폴리오 플랫폼입니다.

---

## 🎯 프로젝트 개요

기술과 가능성을 연결하는 개발자·교육자의 포트폴리오 웹사이트로, AI, 자동화, 웹 엔지니어링을 기반으로 학습과 기술의 미래를 정의하는 작업들을 소개합니다.

### 주요 특징

- 🌍 **다국어 지원**: 한국어, 영어, 독일어 완전 지원
- 🎨 **인터랙티브 3D 요소**: Three.js 기반 3D 배경 및 인터랙션
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 완벽 지원
- 🎭 **부드러운 애니메이션**: Framer Motion 기반 스크롤 애니메이션
- 📧 **통합 문의 시스템**: Notion + Slack 연동 문의 폼
- 🎯 **프로젝트 관리**: 연도별, 카테고리별, 기술스택별 필터링

---

## 📋 주요 페이지

### 홈 (`/`)
- 인터랙티브 3D 배경 (StarField, InteractiveParticles, TechSphere)
- 경력 요약 및 전문 영역 소개
- 주요 프로젝트 하이라이트

### 소개 (`/about`)
- 인터랙티브 네트워크 배경
- 경력 타임라인 (2015년부터 현재까지)
- "How I Work" 섹션

### 프로젝트 (`/projects`)
- 프로젝트 목록 및 상세 페이지
- 연도별, 카테고리별, 기술스택별 필터링
- 무한 스크롤 + 페이드인 애니메이션

### 기술스택 (`/skills`)
- 핵심 역량 소개
- 기술 스택 시각화
- 사용 시나리오 및 특허 정보

### 강의 (`/teaching`)
- 커리큘럼 플로우 시각화
- 강의 영역 및 경험 소개
- 스타필드 배경 효과

### 문의하기 (`/contact`)
- Notion + Slack 연동 문의 폼
- 소셜 링크 (GitHub, LinkedIn)

---

## 🛠 기술 스택

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules, CSS Variables
- **Animation**: Framer Motion
- **3D Graphics**: Three.js, React Three Fiber, @react-three/drei
- **Smooth Scroll**: @studio-freight/lenis

### Backend & Integration
- **API Routes**: Next.js API Routes
- **Database Integration**: Notion API (@notionhq/client)
- **Notifications**: Slack Incoming Webhooks

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint
- **Fonts**: Inter, Poppins, JetBrains Mono (Google Fonts)

---

## 🚀 시작하기

### 필수 요구사항

- Node.js 20.x 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

---

## ⚙️ 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 환경 변수를 설정하세요:

```env
# Notion API (문의 폼용)
NOTION_API_KEY=secret_xxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Slack Webhook (문의 알림용)
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxxxx/xxxxx/xxxxx
```

### 환경 변수 설정 가이드

자세한 설정 방법은 다음 문서를 참고하세요:
- [Notion + Slack 설정 가이드](./docs/notion-slack-setup-guide.md)
- [문의 폼 통합 가이드](./docs/contact-form-integration-guide.md)

---

## 📁 프로젝트 구조

```
frontend/
├── app/                    # Next.js App Router 페이지
│   ├── about/             # 소개 페이지
│   ├── projects/          # 프로젝트 목록 및 상세
│   ├── skills/            # 기술스택 페이지
│   ├── teaching/          # 강의 페이지
│   ├── contact/           # 문의하기 페이지
│   └── api/               # API Routes
│       └── contact/       # 문의 폼 API
├── components/
│   ├── canvas/            # 3D 컴포넌트 (Three.js)
│   └── dom/               # 일반 DOM 컴포넌트
├── contexts/              # React Context (Language)
├── data/                  # 정적 데이터 (프로젝트 목록 등)
├── translations/          # 다국어 번역 파일
├── public/                # 정적 파일
│   └── logo/              # 로고 이미지
└── docs/                  # 문서
    ├── notion-slack-setup-guide.md
    ├── contact-form-integration-guide.md
    └── contact-form-test-guide.md
```

---

## 🌍 다국어 지원

프로젝트는 한국어, 영어, 독일어를 지원합니다.

- **번역 파일**: `translations/index.ts`
- **언어 전환**: 헤더의 언어 선택기 사용
- **지원 언어**: `ko` (한국어), `en` (영어), `de` (독일어)

---

## 📧 문의 폼 통합

문의 폼은 Notion 데이터베이스와 Slack을 연동하여 작동합니다.

### 기능
- Notion 데이터베이스에 문의 내용 저장
- Slack 채널로 실시간 알림
- Rate Limiting (1분당 5회 제한)
- 입력값 검증 및 에러 처리

### 설정
자세한 설정 방법은 [문의 폼 통합 가이드](./docs/contact-form-integration-guide.md)를 참고하세요.

---

## 🎨 주요 기능

### 인터랙티브 요소
- **3D 배경**: StarField, InteractiveParticles, TechSphere
- **마우스 추적**: Canvas 기반 인터랙티브 네트워크
- **스크롤 애니메이션**: Framer Motion 기반 부드러운 전환

### 프로젝트 관리
- **필터링**: 연도, 카테고리, 기술스택별 필터
- **무한 스크롤**: 자동 로딩 및 페이드인 애니메이션
- **상세 페이지**: 프로젝트별 상세 정보 및 기술 스택

### 반응형 디자인
- 모바일, 태블릿, 데스크톱 최적화
- 햄버거 메뉴 (모바일)
- 유연한 레이아웃 및 그리드 시스템

---

## 📚 문서

- [Notion + Slack 설정 가이드](./docs/notion-slack-setup-guide.md)
- [문의 폼 통합 가이드](./docs/contact-form-integration-guide.md)
- [문의 폼 테스트 가이드](./docs/contact-form-test-guide.md)

---

## 🔧 개발 스크립트

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 린트 검사
npm run lint
```

---

## 📝 라이선스

이 프로젝트는 개인 포트폴리오용으로 제작되었습니다.

---

## 👤 작성자

**한동윤 (David Han)**
- Full-stack Developer
- Educator
- Startup Founder

---

## 🔗 링크

- **GitHub**: [https://github.com/david-han-0831](https://github.com/david-han-0831)
- **LinkedIn**: [https://www.linkedin.com/in/davidhan88](https://www.linkedin.com/in/davidhan88)
- **Email**: hdy20201004@gmail.com

---

## 🙏 감사의 말

이 프로젝트는 Next.js, Three.js, Framer Motion 등 오픈소스 라이브러리를 사용하여 제작되었습니다.
