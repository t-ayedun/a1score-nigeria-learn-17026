import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, GraduationCap, ArrowRight } from "lucide-react";
import HeroSection from "./sections/HeroSection";
import LearningStageCarousel from "./sections/LearningStageCarousel";
import FeaturesSection from "./sections/FeaturesSection";
import SubjectsSection from "./sections/SubjectsSection";
import PricingSection from "./sections/PricingSection";
import GamificationSection from "./sections/GamificationSection";
import EthicsSection from "./sections/EthicsSection";
import MultilingualSection from "./sections/MultilingualSection";
import CommunitySection from "./sections/CommunitySection";
import SupportSection from "./sections/SupportSection";
import CTASection from "./sections/CTASection";

interface StudentFocusedHomePageProps {
  onLogin: (userType: 'student' | 'teacher' | 'parent' | 'admin', name: string) => void;
  onShowAuth: (userType: 'student' | 'teacher' | 'parent' | 'admin') => void;
}

const StudentFocusedHomePage = ({ onLogin, onShowAuth }: StudentFocusedHomePageProps) => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('hero');
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});

  const setSectionRef = (id: string, element: HTMLElement | null) => {
    sectionsRef.current[id] = element;
  };


  const otherAudiences = [
    {
      title: "For Teachers",
      description: "AI-powered tools for lesson planning, class management, and student monitoring",
      link: "/for-teachers",
      icon: BookOpen
    },
    {
      title: "For Parents",
      description: "Track your child's progress and stay involved in their learning journey",
      link: "/for-parents",
      icon: Users
    },
    {
      title: "For Institutions",
      description: "Enterprise solutions for schools, universities, and training centers",
      link: "/for-institutions",
      icon: GraduationCap
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section ref={(el) => setSectionRef('hero', el)}>
        <HeroSection onShowAuth={onShowAuth} />
      </section>

      {/* Learning Stage Carousel */}
      <LearningStageCarousel />


      {/* Features Section */}
      <section ref={(el) => setSectionRef('features', el)}>
        <FeaturesSection />
      </section>

      {/* Subjects Section */}
      <section ref={(el) => setSectionRef('subjects', el)}>
        <SubjectsSection />
      </section>

      {/* Gamification Section */}
      <section ref={(el) => setSectionRef('gamification', el)}>
        <GamificationSection />
      </section>

      {/* Ethics Section */}
      <section ref={(el) => setSectionRef('ethics', el)}>
        <EthicsSection />
      </section>

      {/* Multilingual Section */}
      <section ref={(el) => setSectionRef('multilingual', el)}>
        <MultilingualSection />
      </section>

      {/* Community Section */}
      <section ref={(el) => setSectionRef('community', el)}>
        <CommunitySection onShowAuth={onShowAuth} />
      </section>

      {/* Pricing Section */}
      <section ref={(el) => setSectionRef('pricing', el)}>
        <PricingSection onShowAuth={onShowAuth} />
      </section>

      {/* Other Audiences */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-3 sm:mb-4">Are You a Teacher, Parent, or Institution?</h2>
          <p className="text-base sm:text-lg lg:text-xl text-center mb-8 sm:mb-10 lg:mb-12 opacity-90 px-4">
            We have specialized solutions for you too
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {otherAudiences.map((audience, index) => (
              <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all flex flex-col h-full">
                <CardHeader className="flex-grow p-4 sm:p-6">
                  <audience.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white mb-3 sm:mb-4" />
                  <CardTitle className="text-white text-lg sm:text-xl">{audience.title}</CardTitle>
                  <CardDescription className="text-white/80 text-sm sm:text-base">{audience.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
                  <Button
                    variant="secondary"
                    className="w-full min-h-11 text-sm sm:text-base touch-manipulation"
                    onClick={() => navigate(audience.link)}
                  >
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section ref={(el) => setSectionRef('support', el)}>
        <SupportSection />
      </section>

      {/* CTA Section */}
      <CTASection onShowAuth={onShowAuth} />
    </div>
  );
};

export default StudentFocusedHomePage;
