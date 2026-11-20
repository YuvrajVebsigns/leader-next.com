import HeroSection from '@/components/HeroSection';
import FoundersMessage from '@/components/FoundersMessage';
import ExpertiseSection from '@/components/ExpertiseSection';
import PartnerSection from '@/components/PartnerSection';
// import KeyClient from '@/components/KeyClient';
import ProjectsSection from '@/components/ProjectsSection';
// import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import BlogsSection from '@/components/BlogsSection';
// import DialoguesSection from '@/components/DialoguesSection';
// import CIOPowerListProcess from '@/components/Process';

export default function Home() {
  return (
    <main>
      {/* <div className="max-w-[1480px] mx-auto"> */}
      <HeroSection />
      <FoundersMessage />
      <ExpertiseSection />
      <PartnerSection />
      {/* <TeamSection /> */}
      {/* <KeyClient /> */}
      {/* <CIOPowerListProcess /> */}
      <ProjectsSection />
      {/* <ResearchSection />
      <Brands /> */}
      {/* <FAQSection /> */}

      <BlogsSection />

      {/* <DialoguesSection /> */}
      <ContactSection />
      {/* <AssociateBrandsPage /> */}
      {/* </div> */}
    </main>
  );
}
