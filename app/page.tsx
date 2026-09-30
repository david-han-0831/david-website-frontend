import HomeShell from '@/components/home/HomeShell'
import Hero from '@/components/home/Hero'
import WorkIndex from '@/components/home/WorkIndex'
import Process from '@/components/home/Process'
import Services from '@/components/home/Services'
import EndCard from '@/components/home/EndCard'

// 디자인 기준: docs/renewal/DESIGN.md
export default function Home() {
  return (
    <HomeShell>
      <Hero />
      <WorkIndex />
      <Process />
      <Services />
      <EndCard />
    </HomeShell>
  )
}
