import CursorEffect from '@/components/CursorEffect'
import TargetCursor from '@/components/TargetCursor'
import MouseTrail from '@/components/MouseTrail'
import LoaderWipe from '@/components/LoaderWipe'
import Spotlight from '@/components/Spotlight'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import StatsRow from '@/components/StatsRow'
import Marquee from '@/components/Marquee'
import ResearchSection from '@/components/ResearchSection'
import EducationSection from '@/components/EducationSection'
import PublicationsSection from '@/components/PublicationsSection'
import AwardsSection from '@/components/AwardsSection'
import ProjectsSection from '@/components/ProjectsSection'
import Footer from '@/components/Footer'
import CVModal from '@/components/CVModal'

export default function Home() {
  return (
    <main>
      <LoaderWipe />
      <MouseTrail />
      <CursorEffect />
      <TargetCursor />
      <Spotlight />
      <Nav />
      <Hero />
      <StatsRow />
      <Marquee />
      <EducationSection />
      <ResearchSection />
      <PublicationsSection />
      <AwardsSection />
      <ProjectsSection />
      <Footer />
      <CVModal />
    </main>
  )
}
