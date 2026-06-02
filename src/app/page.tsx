import CursorEffect from '@/components/CursorEffect'
import LoaderWipe from '@/components/LoaderWipe'
import Spotlight from '@/components/Spotlight'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import StatsRow from '@/components/StatsRow'
import Marquee from '@/components/Marquee'
import ResearchSection from '@/components/ResearchSection'
import PublicationsSection from '@/components/PublicationsSection'
import AwardsSection from '@/components/AwardsSection'
import ProjectsSection from '@/components/ProjectsSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <LoaderWipe />
      <CursorEffect />
      <Spotlight />
      <Nav />
      <Hero />
      <StatsRow />
      <Marquee />
      <ResearchSection />
      <PublicationsSection />
      <AwardsSection />
      <ProjectsSection />
      <Footer />
    </main>
  )
}
