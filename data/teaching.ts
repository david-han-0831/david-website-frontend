import type { Locale } from '@/translations'

// 강의 이력. 홈의 강의 영역과 강의 페이지가 같이 쓴다.
// 출처는 노션의 수업 이력 DB(회차 기록, 2026-10-02 조회)와 외부 공유용 강의 경력서.
// 개인·학원 수업은 이름을 쓰지 않고 횟수만 쓴다. 새 강의는 해당 연도 맨 위에 추가한다
export type TeachingYear = { year: string; items: { when: string; name: string; note: string }[] }

export const TEACHING_RECORD: Record<Locale, TeachingYear[]> = {
    ko: [
        {
            year: '2026',
            items: [
                { when: '9월', name: '동아대학교 STEP-UP 프로그램', note: '외국인 유학생 대상 생성형 AI 취업 준비 교육. 이틀, 8시간' },
                { when: '9월', name: '동남권 ICT AI 업무활용 특강', note: '생성형 AI 업무 활용. 이틀, 온라인. 2년 연속' },
                {
                    when: '8월',
                    name: '대구테크노파크 데이터 라벨링 실무 교육',
                    note: '의료 데이터 라벨링 실습과 기업 과제 멘토링. 10명, 15시간, 온라인. 2년 연속',
                },
                { when: '8월', name: '구미대학교 G-AI Training', note: '외국인 유학생 40명, 한국어와 영어 두 반. 이틀, 8시간' },
                { when: '8월', name: '서울과학기술대학교 파이썬 비교과 특강', note: 'ITM 전공 13명, 40시간. 기초부터 데이터 수집·분석 프로젝트까지. 2년 연속' },
                { when: '5월', name: '벤처스타트업 아카데미 QA·QC 양성과정 특강', note: '생성형 AI 직무 활용. 3시간, 온라인' },
            ],
        },
        {
            year: '2025',
            items: [
                {
                    when: '10월',
                    name: '동남권 ICT 취·창업 역량강화교육 특강',
                    note: 'ChatGPT 업무 활용, 포트폴리오와 기획서 제작법. AI·AWS 부트캠프 참여자 40여 명, 이틀',
                },
                { when: '9월', name: '데이터 라벨러 교육 2차', note: '데이터 라벨링 실무 교육' },
                {
                    when: '8월',
                    name: '대구테크노파크 데이터 라벨링 교육과 ChatGPT 활용 교육',
                    note: '비전공자 20여 명. 의료 이미지 라벨링 실습 나흘, ChatGPT 활용 하루',
                },
                { when: '7월', name: '충청권 ICT 취·창업 역량강화교육 특강', note: '생성형 AI와 취업 전략, 포트폴리오와 기획 전략. 재직자 25명, 이틀, 온라인' },
                { when: '7월', name: 'KJC미디어 ChatGPT 실무 활용 특강', note: '재직자 25명. 업무 자동화와 최신 AI 도구' },
                { when: '6월', name: '서울과학기술대학교 파이썬 집중 강의', note: '산업공학과, ITM과 학생 대상. 초급과 중급 각 닷새, 40시간' },
                { when: '6월', name: '서울도시가스 GPT 업무 자동화 특강', note: '본사 재직자 대상. 프롬프트 설계와 엑셀 자동화 실습' },
            ],
        },
        {
            year: '2023',
            items: [
                {
                    when: '3월부터',
                    name: '1:1과 소그룹 수업',
                    note: '성인, 직장인, 중·고등학생, 부트캠프 수강생 대상. 파이썬, 자바, 웹 개발, 프로젝트 지도. 2024년 10월 이후 기록만 200회 이상',
                },
            ],
        },
    ],
    en: [
        {
            year: '2026',
            items: [
                {
                    when: 'Sep',
                    name: 'Dong-A University STEP-UP program',
                    note: 'Job preparation with generative AI for international students. Two days, 8 hours',
                },
                { when: 'Sep', name: 'Southeast region ICT, AI at work', note: 'Generative AI for everyday work. Two days, online. Second year running' },
                {
                    when: 'Aug',
                    name: 'Daegu Technopark data labeling training',
                    note: 'Medical data labeling practice and mentoring on company tasks. 10 people, 15 hours, online. Second year running',
                },
                { when: 'Aug', name: 'Gumi University G-AI Training', note: '40 international students in Korean and English tracks. Two days, 8 hours' },
                { when: 'Aug', name: 'SeoulTech Python course', note: '13 ITM majors, 40 hours. From basics to a data project. Second year running' },
                { when: 'May', name: 'Venture Startup Academy, QA/QC course lecture', note: 'Generative AI on the job. 3 hours, online' },
            ],
        },
        {
            year: '2025',
            items: [
                {
                    when: 'Oct',
                    name: 'Southeast region ICT career program',
                    note: 'ChatGPT at work, portfolios and proposals. About 40 AI and AWS bootcamp participants, two days',
                },
                { when: 'Sep', name: 'Data labeler training, second round', note: 'Data labeling practice' },
                {
                    when: 'Aug',
                    name: 'Daegu Technopark data labeling and ChatGPT training',
                    note: 'About 20 non-majors. Four days of medical image labeling, one day of ChatGPT',
                },
                {
                    when: 'Jul',
                    name: 'Central region ICT career program',
                    note: 'Generative AI and career strategy, portfolios and planning. 25 employees, two days, online',
                },
                { when: 'Jul', name: 'KJC Media ChatGPT session', note: '25 employees. Work automation and current AI tools' },
                {
                    when: 'Jun',
                    name: 'SeoulTech intensive Python course',
                    note: 'Industrial engineering and ITM students. Five days each of beginner and intermediate, 40 hours',
                },
                { when: 'Jun', name: 'Seoul City Gas GPT automation session', note: 'Head-office staff. Prompt design and spreadsheet automation' },
            ],
        },
        {
            year: '2023',
            items: [
                {
                    when: 'Since Mar',
                    name: 'One-to-one and small-group lessons',
                    note: 'Adults, employees, students and bootcamp participants. Python, Java, web development, project coaching. More than 200 sessions logged since October 2024',
                },
            ],
        },
    ],
    de: [
        {
            year: '2026',
            items: [
                {
                    when: 'Sep',
                    name: 'Dong-A University, STEP-UP-Programm',
                    note: 'Bewerbungsvorbereitung mit generativer KI für internationale Studierende. Zwei Tage, 8 Stunden',
                },
                {
                    when: 'Sep',
                    name: 'ICT-Programm Südostregion, KI im Beruf',
                    note: 'Generative KI im Arbeitsalltag. Zwei Tage, online. Zweites Jahr in Folge',
                },
                {
                    when: 'Aug',
                    name: 'Daegu Technopark, Datenannotation',
                    note: 'Praxis mit medizinischen Daten und Mentoring. 10 Personen, 15 Stunden, online. Zweites Jahr in Folge',
                },
                {
                    when: 'Aug',
                    name: 'Gumi University, G-AI Training',
                    note: '40 internationale Studierende, koreanische und englische Gruppe. Zwei Tage, 8 Stunden',
                },
                {
                    when: 'Aug',
                    name: 'SeoulTech, Python-Kurs',
                    note: '13 ITM-Studierende, 40 Stunden. Von den Grundlagen bis zum Datenprojekt. Zweites Jahr in Folge',
                },
                { when: 'Mai', name: 'Venture Startup Academy, QA/QC-Kurs', note: 'Generative KI im Beruf. 3 Stunden, online' },
            ],
        },
        {
            year: '2025',
            items: [
                {
                    when: 'Okt',
                    name: 'ICT-Karriereprogramm Südostregion',
                    note: 'ChatGPT im Beruf, Portfolio und Konzept. Rund 40 Teilnehmende eines KI- und AWS-Bootcamps, zwei Tage',
                },
                { when: 'Sep', name: 'Schulung für Datenannotation, zweite Runde', note: 'Datenannotation in der Praxis' },
                {
                    when: 'Aug',
                    name: 'Daegu Technopark, Datenannotation und ChatGPT',
                    note: 'Rund 20 Fachfremde. Vier Tage Annotation medizinischer Bilder, ein Tag ChatGPT',
                },
                {
                    when: 'Jul',
                    name: 'ICT-Karriereprogramm Zentralregion',
                    note: 'Generative KI und Karrierestrategie, Portfolio und Planung. 25 Berufstätige, zwei Tage, online',
                },
                { when: 'Jul', name: 'KJC Media, ChatGPT in der Praxis', note: '25 Mitarbeitende. Arbeitsautomatisierung und aktuelle KI-Werkzeuge' },
                {
                    when: 'Jun',
                    name: 'SeoulTech, Python-Intensivkurs',
                    note: 'Studierende aus Industrial Engineering und ITM. Je fünf Tage Grund- und Mittelstufe, 40 Stunden',
                },
                { when: 'Jun', name: 'Seoul City Gas, GPT-Automatisierung', note: 'Mitarbeitende der Zentrale. Prompt-Design und Tabellenautomatisierung' },
            ],
        },
        {
            year: '2023',
            items: [
                {
                    when: 'Seit März',
                    name: 'Einzel- und Kleingruppenunterricht',
                    note: 'Erwachsene, Berufstätige, Schüler und Bootcamp-Teilnehmende. Python, Java, Webentwicklung, Projektbetreuung. Seit Oktober 2024 über 200 dokumentierte Termine',
                },
            ],
        },
    ],
}
