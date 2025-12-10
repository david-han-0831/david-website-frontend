'use client'


import dynamic from 'next/dynamic'
import Link from 'next/link'
import styles from './page.module.css'
import HighlightCards from '@/components/dom/HighlightCards'
import ARButton from '@/components/dom/ARButton'
import SpecializedAreas from '@/components/dom/SpecializedAreas'
import ExperienceSnapshot from '@/components/dom/ExperienceSnapshot'
import WhatIDo from '@/components/dom/WhatIDo'
import SectionTeasers from '@/components/dom/SectionTeasers'
import FinalCTA from '@/components/dom/FinalCTA'
import TextReveal from '@/components/dom/TextReveal'
import TextSplit from '@/components/dom/TextSplit'
import SkillFlow from '@/components/dom/SkillFlow'
import MotionSection from '@/components/dom/MotionSection'

import { useLanguage } from '@/contexts/LanguageContext'

// Dynamic import for 3D components to avoid hydration mismatch and improve perf
const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })
const TechSphere = dynamic(() => import('@/components/canvas/TechSphere'), { ssr: false })
const StarField = dynamic(() => import('@/components/canvas/StarField'), { ssr: false })
const InteractiveParticles = dynamic(() => import('@/components/canvas/InteractiveParticles'), { ssr: false })
const FloatingIcons = dynamic(() => import('@/components/canvas/FloatingIcons'), { ssr: false })

// Fog removed based on feedback

export default function Home() {
  const { t } = useLanguage()

  return (
    <main className={styles.main}>
      <div className={styles.gradientBg} />

      {/* 3D Background */}
      <div className={styles.canvasContainer}>
        <Scene className={styles.canvas}>
          <StarField />
          <InteractiveParticles count={100} />
          {/* FloatingIcons removed for cleaner look */}
          <group position={[0, 0, -3]} scale={0.8}>
            <TechSphere />
          </group>
          <ambientLight intensity={0.5} />
          {/* Postprocessing effects can be added here if needed */}
        </Scene>
      </div>

      {/* Interactive Hand Particle Section - New Feature */}


      {/* Hero Content */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.titleWrapper}>
            <TextSplit
              text={t.hero.title_1}
              direction="left"
              className={styles.title}
              delay={0}
            />
            <TextSplit
              text={t.hero.title_2}
              direction="right"
              className={styles.title}
              delay={0.2}
            />
          </div>
          <div className={styles.sloganWrapper}>
            <TextReveal
              text={t.hero.sub_slogan}
              className={styles.slogan}
              delay={0.8}
            />
          </div>

          <div className={styles.buttons}>
            <Link href="/portfolio-overview" className={styles.primaryButton}>
              {t.hero.btn_portfolio}
            </Link>
            <Link href="/what-i-build" className={styles.secondaryButton}>
              {t.hero.btn_build}
            </Link>
            <Link href="/teaching-framework" className={styles.secondaryButton}>
              {t.hero.btn_teaching}
            </Link>
          </div>
        </div>
        <ARButton />
      </div>

      <MotionSection className={styles.sectionSpacing}>
        <ExperienceSnapshot />
      </MotionSection>

      <MotionSection className={styles.sectionSpacingSmall}>
        <SpecializedAreas />
      </MotionSection>

      <MotionSection delay={0.2} className={styles.sectionSpacingLarge}>
        <SkillFlow />
      </MotionSection>

      {/* Highlights Section */}
      <MotionSection className={`${styles.section} ${styles.sectionSpacingLarge}`}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '3rem', fontFamily: 'var(--font-poppins)' }}>
          {t.highlights.title}
        </h2>
        <HighlightCards />
      </MotionSection>

      <MotionSection className={styles.sectionSpacingLarge}>
        <WhatIDo />
      </MotionSection>


      <MotionSection>
        <FinalCTA />
      </MotionSection>
    </main>
  )
}
