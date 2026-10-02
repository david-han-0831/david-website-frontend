import HomeShell from '@/components/home/HomeShell'
import HeroStudio from '@/components/home/HeroStudio'
import WorkIndex from '@/components/home/WorkIndex'
import Process from '@/components/home/Process'
import Services from '@/components/home/Services'
import EndCard from '@/components/home/EndCard'

// 디자인 기준: docs/renewal/DESIGN.md
export default function Home() {
  return (
    <HomeShell>
      <HeroStudio />
      <WorkIndex />
      <Process />
      <Services />
      <EndCard />
    </HomeShell>
  )
}
