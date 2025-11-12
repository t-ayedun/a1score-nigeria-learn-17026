
import RotatingHeroContent from "./RotatingHeroContent";

interface HeroSectionProps {
  onShowAuth: (userType: 'student' | 'teacher' | 'parent' | 'admin') => void;
}

const HeroSection = ({ onShowAuth }: HeroSectionProps) => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <RotatingHeroContent onShowAuth={onShowAuth} />
      </div>
    </section>
  );
};

export default HeroSection;
