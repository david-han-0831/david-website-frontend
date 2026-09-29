# han-david.com 포트폴리오 리뉴얼 PRD

2026-09-30 · @david · 작업 브랜치 `renewal` (main 기준, `redesign`은 참고용 보관)

## 개요

han-david.com을 웹 에이전시급 시각 임팩트를 가진 포트폴리오로 리뉴얼해, 외주 문의와 해외 영업의 도착지로 만든다.

| 항목 | 내용 |
|---|---|
| 배경 | 기존 사이트는 시각적 인상이 약해 영업 도구로 쓰기 어려움. 9/19 `redesign` 브랜치 홈 리디자인은 방향이 맞지 않아 새로 설계 |
| 목표 1 | 첫 5초 안에 "이 사람에게 맡기면 화려한 결과물이 나온다"는 인상 |
| 목표 2 | 방문 → 프로젝트 탐색 → 문의 전환 동선 |
| 목표 3 | 모션·영상·3D 구성 요소를 고객사·자사 서비스 랜딩에 재사용 |
| 성공 지표 | 문의 전환율, 평균 체류 시간, 프로젝트 상세 조회 수, Lighthouse 성능, 채널별 유입(GA4·UTM). 수치 목표는 기존 GA4·PostHog 데이터 확인 후 확정 |

## 현황 분석

redesign 디자인은 쓰지 않고 새로 설계한다. main의 스택과 데이터·문의·분석 기능만 재사용.

| 구분 | main (2026-01-09) | redesign (2026-09-19, 커밋 5개) |
|---|---|---|
| 콘셉트 | 다크 톤, 파티클·별 배경 | "시네마틱 릴", 밝은 스테이지 + 섹션별 다크·액센트 전환 |
| 홈 구성 | 인트로, 하이라이트 카드, 섹션 티저 | GlassHero, StatsStrip, Showreel, ColumnRun, BuildList, LiveLab, TeachMosaic, Patents, TechMarquee, EndCard |
| 3D | StarField, TechSphere 등 | 유리(MeshTransmission) DH 모노그램·중괄호가 워드마크 굴절, AR 명함(card.glb) |
| 영상 | 없음 | Pexels 클립 3종 + 코드로 그린 대체 영상(Footage) |
| 인터랙션 | MediaPipe 손 파티클 | LiveLab 손 추적을 3D 스테이지와 공유 |
| 토큰 | 퍼플·블루 | #f6f4ef / #0b0a09 / #ff5b2e, Archivo + Pretendard |
| 범위 | 전체 | 홈만 |

**재사용**: Next.js 16 + React 19 + R3F(drei, postprocessing) + Lenis + Framer Motion / redesign의 R3F 유리 굴절 재질·DOM↔3D 공유 상태(`lib/stage.ts`) / ko·en·de 3개 언어, 프로젝트 데이터 37건 (id 11 결번) / Notion 문의 API(분당 5회), GTM·Clarity·PostHog

**바꿀 것**
1. 전 페이지를 새 디자인 시스템으로 재설계
2. drei 기본 도형·폰트 → Blender 전용 모델·로고
3. Pexels 스톡 → 실제 프로젝트 시연 영상 + HyperFrames 모션그래픽
4. CSS·Framer 중심 스크롤 → GSAP ScrollTrigger
5. 서브 페이지 클라이언트 컴포넌트 → 검색 노출용 서버 렌더링 보강
6. 메타 기본값 `your-domain.com` → `han-david.com` 고정
7. 브랜드 로고 신규 제작
8. 문의: Notion → + 사이(sai)·디스코드 알림

## 타깃과 전환

| 사용자 | 방문 경로 | 확인하려는 것 | 전환 |
|---|---|---|---|
| 국내 외주 고객(비주얼 업종 포함) | SNS 릴스, 검색, 소개 | 결과물 품질, 유사 업종 사례 | 문의폼, 카카오톡 |
| 해외 에이전시·스타트업 | Apollo 제안 메일, LinkedIn | 영문 사례, 스택, 속도 | 영문 문의, 미팅 예약 |
| 크몽 파트너의 고객 | 파트너 공유 링크 | 개발 역량 신뢰 | 파트너 통한 계약 |
| 강의 의뢰 기관 | 검색, 기존 기관 | 강의 이력, 커리큘럼 | 강의 문의 |

첫 화면 주 메시지는 외주·솔루션 개발. 강의는 teaching 흐름 유지.

## 콘셉트·디자인 방향

redesign 피드백(9/30): 모션·효과가 허접해 보였고 영상과 함께 써야 함 → **실제 영상 중심, 효과는 영상을 돋보이게 하는 역할로 제한.**

| 후보 | 핵심 연출 | 영상 활용 | 참고 |
|---|---|---|---|
| **A. 시네마틱 필름형 (추천)** | 스크롤=카메라 이동, 조명·분위기 | 풀스크린 쇼릴, 타이포 마스크 속 영상, 스크롤 연동 재생 | Iventions, Uncommon Studio |
| B. 원 오브젝트형 | 3D 로고 하나에 무게감·관성, Z축 스크롤 | 오브젝트 주변 패널·반사면에 영상 투영 | Hubtown (Unseen Studio) |
| C. 에디토리얼 타이포형 | 키네틱 타이포, 절제된 전환 | 호버·스크롤 시 썸네일 풀스크린 확장 | Mat Voyce, By-Kin |

A 기본 + 히어로에 B의 3D 로고 오브젝트 결합을 우선 검토.

**전체 은유** (네비 이름·전환·모티프·영상 톤을 모두 여기서 가져옴)

| 후보 | 은유 | 페이지 | 모티프 |
|---|---|---|---|
| **1. The Build (추천)** | 아이디어가 제품으로 완성되는 과정 | Home 아이디어→완성품 · Work 완성된 빌드 · Services 제작 공정 · About 빌더 · Teaching 빌드를 가르치다 · Contact 다음 빌드 시작 | 와이어프레임이 실제 화면·3D로 채워지는 전환 |
| 2. Mission Control | 관제실, 프로젝트=미션 | 관제 화면 · 완료 미션 · 미션 유형 · 관제사 · 훈련 · 미션 요청 | 실시간 지표, 카운트다운 |
| 3. The Lab | 실험실 | 실험 시작 · 결과 · 의뢰 · 연구자 · 실습 · 새 실험 | 격자·측정값 |

음악은 콘셉트에 넣지 않고 About 이력으로만.

| 원칙 | 내용 |
|---|---|
| 첫 화면 임팩트 | 3D 로고·유리 굴절 + 풀스크린 쇼릴로 5초 안에 시선 확보 |
| 스크롤 연출 | 섹션 배경 전환(밝음→다크→액센트), 텍스트 분할 등장, 핀 고정 가로 스크롤 |
| 절제된 강조 | 강한 효과는 히어로·쇼릴·프로젝트 전환 3곳만 |
| 실제 결과물 중심 | 스톡 대신 실제 시연 영상 |
| 음악 전공 정체성 | 리듬·템포를 모션 타이밍에 (섹션 전환을 박자처럼) |

**디자인 시스템**: 색·폰트 신규 정의 후 `DESIGN.md`에 기록(한글 Pretendard 유지 검토) / Awesome DESIGN.md 레퍼런스 1개 규칙화 / Taste Skill로 컴포넌트 감사 / 아이콘은 Phosphor 한 세트. 레퍼런스: Awwwards·Godly 수상작 중 3D 히어로 + 스크롤 전환 5개.

## 로고·브랜드

| 산출물 | 요구사항 |
|---|---|
| 심볼 | 이니셜·개발·음악 모티프 중 선택, 단색에서도 식별 |
| 워드마크 | "David Han" + "한동윤" 조합 |
| 3D | Blender GLB (유리·금속 2종), 히어로·영상 인트로 |
| 모션 | 3~5초 (HyperFrames 또는 Lottie) |
| 파비콘·OG | 16~512px, OG 1200×630 |
| 사용 범위 | 포트폴리오, SNS, 제안서, 명함(AR), 릴스 워터마크 |

흐름: 스케치 3안(Claude Design) → 1안 → SVG → Blender 3D → 모션.

## 정보 구조

7개 → 6개 페이지 (Home · Work · Services(신설) · About(+Skills) · Teaching(+Courses) · Contact). 모든 페이지 하단은 Contact로 잇는 EndCard.

## 기능 요구사항

| ID | 기능 | 설명 | 우선순위 |
|---|---|---|---|
| F-01 | 3D 로고 히어로 | Blender 로고 GLB가 유리 굴절로 워드마크를 비추고 마우스·스크롤 반응 | P0 |
| F-02 | 쇼릴 | 실제 시연 30~60초, 히어로 아래 풀스크린 무음 자동재생 | P0 |
| F-03 | 스크롤 섹션 전환 | GSAP ScrollTrigger 배경 전환, 핀, 가로 스크롤 갤러리 | P0 |
| F-04 | 키네틱 타이포 | SplitText 분할 등장, 스크롤 강조 | P0 |
| F-05 | 케이스 스터디 | 대표 6~8건: 문제·해결·결과 + 시연 영상 + 기기 목업 | P0 |
| F-06 | 문의 폼 | 예산·일정·유형 선택형, Notion + 사이 + 디스코드 | P0 |
| F-07 | 부드러운 스크롤 | Lenis 유지, GSAP 동기화 | P0 |
| F-08 | 커스텀 커서 | "Play", "View" 형태 변화 | P1 |
| F-09 | 페이지 전환 | 커튼·마스크 | P1 |
| F-10 | LiveLab | 손 추적 데모 유지, 3D 스테이지 연동 | P1 |
| F-11 | AR 명함 | card.glb → 새 로고 | P2 |
| F-12 | 업종별 쇼케이스 | 360 뷰어, Before/After, 셰이더 | P2 |

모든 모션은 `prefers-reduced-motion`에서 정지 이미지·단순 페이드로.

## 기술 스택

| 영역 | 유지 | 추가 |
|---|---|---|
| 프레임워크 | Next.js 16, React 19, TS | - |
| 3D | three, R3F, drei, postprocessing | Blender 공식 MCP |
| 모션 | Framer Motion, Lenis | GSAP (ScrollTrigger, SplitText) |
| 영상 | 코드 생성 Footage | HyperFrames, Playwright(녹화), FFmpeg |
| 컴포넌트 | 자체 | Originkit, React Bits (필요 구간만) |
| 이미지 | Pexels | 로컬 ComfyUI, Upscayl |
| 디자인 기준 | - | DESIGN.md, Taste Skill, Web Design Guidelines |
| 검수 | - | Agent Browser, Playwright MCP, Chrome DevTools MCP, Lighthouse |
| 배포·분석 | Vercel, GTM, Clarity, PostHog | GA4 MCP, Search Console MCP |

작업 환경: 데스크탑(RTX 4090) Claude Code. 영상 렌더·3D도 데스크탑.

### 3D 파이프라인 (Blender → GLB → Three.js)
1. Blender MCP로 로고 심볼·보조 오브젝트 모델링
2. 유리·금속 재질, 그림자·조명 텍스처 베이크
3. GLB → gltf-transform (Draco·meshopt), 텍스처 KTX2 — **히어로 GLB 1MB 이하**
4. `useGLTF` 로드, 유리 굴절 재질
5. GSAP ScrollTrigger + `lib/stage.ts` 공유 상태로 스크롤·마우스·손 추적 반응
6. 저사양·모바일은 Blender 렌더 정지 이미지

| 3D 에셋 | 용도 | 우선순위 |
|---|---|---|
| 로고 심볼(유리) | 히어로 메인, 워드마크 굴절 | P0 |
| 보조 오브젝트 | 개발자·음악 정체성 (디자인 확정 후) | P0 |
| 섹션 전환 오브젝트 | 강의·특허·기술 섹션 형태 변형 | P1 |
| AR 명함 | card.glb 교체 | P2 |

### 영상 파이프라인
1. 소재: 운영 서비스는 Playwright 녹화, 로컬 재현 서비스는 Cap
2. 목업 합성 (Screenhance, 필요 시 Rotato)
3. HyperFrames로 타이틀·자막·줌·전환 (사이트와 같은 GSAP 모션·토큰)
4. Blender 로고 렌더를 쇼릴 첫 3초에
5. FFmpeg: 웹 1080p ≤10MB · 모바일 720p · 릴스 9:16
6. 사이트 영상 슬롯 교체 (스톡 사용 안 함)

| 영상 | 길이 | 위치 |
|---|---|---|
| 메인 쇼릴 | 30~60초 | 홈 히어로 아래 |
| 로고 인트로 | 3~5초 | 쇼릴 시작, 릴스 인트로 |
| 케이스 시연 | 15~30초/건 | 프로젝트 상세 |
| 서비스 루프 | 5~8초 | 카드 호버 미리보기 |

## 비기능 요구사항

| 영역 | 기준 |
|---|---|
| 성능 | Lighthouse 모바일 80+, LCP ≤ 2.5s |
| 3D | 히어로 GLB ≤ 1MB, KTX2 |
| 영상 | 쇼릴 웹 ≤ 10MB, 모바일 720p 별도, 포스터 이미지 |
| 모바일 | 저사양은 3D → 정지 이미지, 포스트프로세싱 끔 |
| 접근성 | reduced-motion, 키보드, 영상 자막, WCAG AA |
| SEO | 페이지별 서버 메타데이터, 사이트맵·구조화 데이터, 기본 도메인 han-david.com |
| 다국어 | ko·en·de 유지, 신규 문구 3개 언어 동시 작성 |
| 브라우저 | Chrome·Safari·Edge·Samsung Internet, iOS Safari WebGL |

## 문의·전환·분석

| 항목 | 내용 |
|---|---|
| 문의 항목 | 이름, 이메일, 회사, 유형(웹·앱·AI·랜딩·기타), 예산, 일정, 참고 링크, 내용 |
| 처리 | 제출 → Notion(기존) → 사이 등록 → 디스코드 알림 |
| 선별 | 예산·일정·명확도 기준 우선순위 (sales:lead-triage) |
| CTA | 히어로, 케이스 스터디 하단, EndCard, 고정 문의 버튼 |
| 이벤트 | CTA 클릭, 폼 시작·제출, 영상 재생, 프로젝트 상세 조회 |
| 유입 | SNS·제안 메일 UTM → GA4 MCP 채널별 전환 비교 |
| 스팸 | 분당 5회 제한 + 허니팟 |

## 마일스톤

**2026-12-14 P0 1차 출시.** P1·P2는 출시 후 업데이트. 홈 개발과 케이스 스터디 영상 제작은 병행.

## 리스크

| 리스크 | 대응 |
|---|---|
| 3D·영상이 무거워 모바일 이탈 | 지연 로딩, 모바일 경량 분기, 성능 예산 |
| 효과가 내용을 가림 | 강한 효과 3곳만, 케이스 스터디는 읽기 중심 |
| 범위 확대 | P0만 1차 출시 |
| 시연 소재 부족 | Playwright 녹화, 종료 서비스는 로컬·더미 재현 |
| 고객사 공개 제한 | 확인 후 불가 시 익명 사례 |

## 결정 필요 사항

- [ ] 로고: 개인(David Han)과 콜론비 법인 로고 분리 vs 통일
- [ ] 첫 화면 주 메시지: 외주 개발 vs 솔루션·서비스
- [x] 케이스 스터디 대표 8건 (2026-09-30 확정): #6 수산물 B2B · #3 해외 POS · #1 온라인 시험 · #5 농구 슛폼 분석 · #4 운동선수 트레이닝 · #7 아트스테이지 · #9 비대면 진료 앱·CRM · #10 ERP/HR — 고객사 공개 가능 여부 확인 필요
- [ ] DESIGN.md 레퍼런스 1개
- [ ] redesign에서 마음에 안 들었던 점 정리
- [x] 작업 브랜치: main → `renewal` (2026-09-30 생성), redesign 참고용 보관
