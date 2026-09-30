import { AboutSection } from '@/components/about/AboutSection'
import { ContactSection, SiteFooter } from '@/components/contact/ContactSection'
import { ExperienceSection } from '@/components/experience/ExperienceSection'
import { HeroSection } from '@/components/hero/HeroSection'
import { LeadershipSection } from '@/components/leadership/LeadershipSection'
import { CaseStudiesSection } from '@/components/projects/CaseStudiesSection'
import { CaseStudyOverlay } from '@/components/projects/CaseStudyOverlay'
import { ProductsSection } from '@/components/projects/ProductsSection'
import { WorkSection } from '@/components/projects/WorkSection'
import { EnterpriseSection } from '@/components/sections/EnterpriseSection'
import { GovernmentSection } from '@/components/sections/GovernmentSection'
import { IdentitySection } from '@/components/sections/IdentitySection'
import { MobileWebSection } from '@/components/sections/MobileWebSection'
import { UniverseSection } from '@/components/sections/UniverseSection'
import { StackSection } from '@/components/technology/StackSection'
import { getPortraitAssets, getResumeHref } from '@/lib/assets'

export default function Page() {
  const portrait = getPortraitAssets()
  const resume = getResumeHref()

  // Order follows the spec: person → engineer → technology → projects → enterprise →
  // government → mobile → leadership → work → contact.
  return (
    <>
      <main id="main">
        <HeroSection portrait={portrait} />
        <IdentitySection />
        <UniverseSection />
        <ExperienceSection />
        <WorkSection />
        <ProductsSection />
        <EnterpriseSection />
        <GovernmentSection />
        <MobileWebSection />
        <StackSection />
        <LeadershipSection />
        <CaseStudiesSection />
        <AboutSection portrait={portrait} />
        <ContactSection resume={resume} />
      </main>
      <SiteFooter portrait={portrait} />
      <CaseStudyOverlay />
    </>
  )
}
