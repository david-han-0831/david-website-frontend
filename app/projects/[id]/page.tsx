import ProjectDetail from '@/components/projects/ProjectDetail'

// 검색·공유용 정보와 구조화 데이터는 같은 폴더의 layout.tsx 에 있다
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    return <ProjectDetail id={Number(id)} />
}
