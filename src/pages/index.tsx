import HeroSection from '@/components/portfolio/HeroSection';
import AboutSection from '@/components/portfolio/AboutSection';
import ProjectsSection from '@/components/portfolio/ProjectsSection';
import SkillsSection from '@/components/portfolio/SkillsSection';
import ContactSection from '@/components/portfolio/ContactSection';
import NavDots from '@/components/portfolio/NavDots';
import ChatBot from '@/components/portfolio/ChatBot';
import MorphSection from '@/components/portfolio/MorphSection';

export default function HomePage() {
  return (
    <>
      <title>Ayush Kumar Srivastava — AI/ML Engineer</title>
      <meta
        name="description"
        content="Portfolio of Ayush Kumar Srivastava — AI/ML Engineer specializing in NLP, Reinforcement Learning, RAG systems, and full-stack development."
      />

      <div className="relative">
        {/* Fixed nav dots */}
        <NavDots />

        {/* Hero — no morph, it's the entry point */}
        <HeroSection />

        {/* Each subsequent section morphs in on scroll */}
        <MorphSection index={0}>
          <AboutSection />
        </MorphSection>

        <MorphSection index={1}>
          <ProjectsSection />
        </MorphSection>

        <MorphSection index={2}>
          <SkillsSection />
        </MorphSection>

        <MorphSection index={3}>
          <ContactSection />
        </MorphSection>

        {/* Floating chatbot — always on top */}
        <ChatBot />
      </div>
    </>
  );
}
