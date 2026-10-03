import { PROJECTS } from '@/data/projects'

// 기술 스택을 프로젝트 데이터에서 직접 센다. 프로젝트를 추가하면 숫자가 따라 바뀐다.
// 버전 표기("React 19")는 떼고, 같은 것을 다르게 적은 이름은 하나로 모은다
const ALIAS: Record<string, string> = {
    Tailwind: 'Tailwind CSS',
    TailwindCSS: 'Tailwind CSS',
    'OpenAI API': 'OpenAI',
    'GPT-4': 'OpenAI',
    'Django REST Framework': 'Django',
}

export type Group = 'frontend' | 'backend' | 'mobile' | 'data' | 'ai' | 'infra' | 'language' | 'other'

// 어느 묶음에 넣을지. 여기에 없는 이름은 '그 외'로 간다
const GROUP: Record<string, Group> = {
    'Next.js': 'frontend', React: 'frontend', 'Vue.js': 'frontend', Svelte: 'frontend', JQuery: 'frontend',
    'Tailwind CSS': 'frontend', Vite: 'frontend', Bootstrap: 'frontend', 'Three.js': 'frontend', 'AR.js': 'frontend',
    'Chart.js': 'frontend', ApexCharts: 'frontend', Leaflet: 'frontend', VexFlow: 'frontend', HTML: 'frontend', CSS: 'frontend',
    FastAPI: 'backend', 'Spring Boot': 'backend', 'Node.js': 'backend', 'Nest.js': 'backend', Django: 'backend', Flask: 'backend',
    PHP: 'backend', CodeIgniter: 'backend', '.NET': 'backend', SQLAlchemy: 'backend', Alembic: 'backend', JPA: 'backend',
    'REST API': 'backend', Stripe: 'backend',
    SwiftUI: 'mobile', Swift: 'mobile', Kotlin: 'mobile', 'React Native': 'mobile', Flutter: 'mobile', WebView: 'mobile',
    MySQL: 'data', PostgreSQL: 'data', Firebase: 'data', Supabase: 'data', 'MS SQL': 'data', MariaDB: 'data', MinIO: 'data',
    Pandas: 'data', NumPy: 'data', Matplotlib: 'data', Plotly: 'data', Streamlit: 'data',
    OpenAI: 'ai', Gemini: 'ai', OpenCV: 'ai', MediaPipe: 'ai',
    'AWS Lambda': 'infra', PythonAnywhere: 'infra',
    TypeScript: 'language', JavaScript: 'language', Python: 'language', Java: 'language',
}

export const GROUP_ORDER: Group[] = ['language', 'frontend', 'backend', 'mobile', 'data', 'ai', 'infra', 'other']

const normalize = (name: string) => {
    const bare = name.replace(/\s+\d+(\.\d+)*(\.x)?$/, '').trim()
    return ALIAS[bare] ?? bare
}

export type Tech = { name: string; count: number }

// 묶음별로, 많이 쓴 순서대로
export function stackByGroup(): Record<Group, Tech[]> {
    const counts = new Map<string, number>()
    for (const project of PROJECTS) {
        // 한 프로젝트에서 같은 기술을 두 번 세지 않는다
        for (const name of new Set(project.techStack.map(normalize))) counts.set(name, (counts.get(name) ?? 0) + 1)
    }
    const groups = Object.fromEntries(GROUP_ORDER.map((g) => [g, [] as Tech[]])) as Record<Group, Tech[]>
    for (const [name, count] of counts) groups[GROUP[name] ?? 'other'].push({ name, count })
    for (const g of GROUP_ORDER) groups[g].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    return groups
}
