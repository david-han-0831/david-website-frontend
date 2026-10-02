import HomeShell from '@/components/home/HomeShell'
import HeroStudio from '@/components/home/HeroStudio'
import Answers from '@/components/home/Answers'
import HookLine from '@/components/home/HookLine'
import Cases from '@/components/home/Cases'
import Teaching from '@/components/home/Teaching'
import Process from '@/components/home/Process'
import Services from '@/components/home/Services'
import EndCard from '@/components/home/EndCard'

// 디자인 기준: docs/renewal/DESIGN.md
export default function Home() {
  return (
    <HomeShell>
      <HeroStudio />
      <HookLine />
      <Answers />
      <Cases />
      <Services />
      <Process />
      <Teaching />
      <EndCard />
    </HomeShell>
  )
}
