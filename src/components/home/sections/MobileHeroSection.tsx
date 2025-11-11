import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap } from "lucide-react";

interface MobileHeroSectionProps {
  onShowAuth: (userType: 'student' | 'teacher' | 'parent' | 'admin') => void;
}

const MobileHeroSection = ({ onShowAuth }: MobileHeroSectionProps) => {
  const { t } = useTranslation();

  return (
    <section className="md:hidden py-8 px-4 bg-gradient-to-br from-primary/5 to-purple-600/5">
      <div className="container mx-auto max-w-lg text-center space-y-4">
        {/* Icon */}
        <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center shadow-lg">
          <GraduationCap className="h-7 w-7 text-white" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-foreground leading-tight">
          {t('hero.main.title')}
        </h1>

        {/* Subtitle */}
        <p className="text-base text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600 font-medium">
          {t('hero.main.subtitle')}
        </p>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t('hero.main.description')}
        </p>

        {/* CTA Button */}
        <Button 
          size="lg" 
          className="w-full bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 text-white py-3 text-base shadow-lg active:scale-95"
          onClick={() => onShowAuth('student')}
        >
          {t('hero.main.primaryButton')}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};

export default MobileHeroSection;
