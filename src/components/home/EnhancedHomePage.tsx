
import { useState, useRef } from "react";
import HomeSidebar from "../layout/HomeSidebar";
import HeroSection from "./sections/HeroSection";
import MobileHeroSection from "./sections/MobileHeroSection";
import InstallPrompt from "./InstallPrompt";

import SocialProofBar from "./sections/SocialProofBar";
import ProblemSolutionSection from "./sections/ProblemSolutionSection";
import FeaturesSection from "./sections/FeaturesSection";
import HowItWorksSection from "./sections/HowItWorksSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import PricingSection from "./sections/PricingSection";
import CTASection from "./sections/CTASection";

interface EnhancedHomePageProps {
  onLogin: (userType: 'student' | 'teacher' | 'parent' | 'admin', name: string) => void;
  onShowAuth: (userType: 'student' | 'teacher' | 'parent' | 'admin') => void;
}

const EnhancedHomePage = ({ onLogin, onShowAuth }: EnhancedHomePageProps) => {
  const [activeSection, setActiveSection] = useState('hero');
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = sectionsRef.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const setSectionRef = (id: string, element: HTMLElement | null) => {
    sectionsRef.current[id] = element;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <HomeSidebar onNavigate={handleNavigate} activeSection={activeSection} />
      <InstallPrompt />
      
      {/* Hero Section */}
      <section ref={(el) => setSectionRef('hero', el)}>
        <MobileHeroSection onShowAuth={onShowAuth} />
        <HeroSection onShowAuth={onShowAuth} />
      </section>

      {/* Social Proof Bar */}
      <SocialProofBar />

      {/* Problem/Solution Section */}
      <section ref={(el) => setSectionRef('problem', el)}>
        <ProblemSolutionSection onShowAuth={onShowAuth} />
      </section>

      {/* Features Section */}
      <section ref={(el) => setSectionRef('features', el)}>
        <FeaturesSection />
      </section>

      {/* How It Works Section */}
      <section ref={(el) => setSectionRef('how-it-works', el)}>
        <HowItWorksSection onShowAuth={onShowAuth} />
      </section>

      {/* Testimonials Section */}
      <section ref={(el) => setSectionRef('testimonials', el)}>
        <TestimonialsSection />
      </section>

      {/* Pricing Section */}
      <section ref={(el) => setSectionRef('pricing', el)}>
        <PricingSection onShowAuth={onShowAuth} />
      </section>

      {/* CTA Section */}
      <CTASection onShowAuth={onShowAuth} />
    </div>
  );
};

export default EnhancedHomePage;
