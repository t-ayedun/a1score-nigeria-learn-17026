
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, Heart, Building2 } from "lucide-react";

interface RotatingHeroContentProps {
  onShowAuth: (userType: 'student' | 'teacher' | 'parent' | 'admin') => void;
}

const RotatingHeroContent = ({ onShowAuth }: RotatingHeroContentProps) => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroContent = [
    {
      userType: 'student' as const,
      icon: BookOpen,
      gradient: "from-blue-600 to-purple-600"
    },
    {
      userType: 'teacher' as const,
      icon: Users,
      gradient: "from-green-600 to-teal-600"
    },
    {
      userType: 'parent' as const,
      icon: Heart,
      gradient: "from-pink-600 to-rose-600"
    },
    {
      userType: 'admin' as const,
      icon: Building2,
      gradient: "from-purple-600 to-indigo-600"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroContent.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentContent = heroContent[currentSlide];
  const CurrentIcon = currentContent.icon;

  return (
    <div className="relative overflow-hidden">
      {/* Background gradient that changes with content */}
      <div className={`absolute inset-0 bg-gradient-to-br ${currentContent.gradient} opacity-5 transition-all duration-1000`} />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Icon */}
        <div className="mb-6">
          <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${currentContent.gradient} flex items-center justify-center transition-all duration-500`}>
            <CurrentIcon className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Main content with smooth transitions */}
        <div className="space-y-6 transition-all duration-700 ease-in-out">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            {t(`hero.${currentContent.userType}.title`)}
          </h2>
          
          <h3 className={`text-2xl md:text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r ${currentContent.gradient}`}>
            {t(`hero.${currentContent.userType}.subtitle`)}
          </h3>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t(`hero.${currentContent.userType}.description`)}
          </p>
        </div>
        
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button 
            size="lg" 
            className={`bg-gradient-to-r ${currentContent.gradient} hover:opacity-90 text-white px-8 py-4 text-lg hover:scale-105 transition-all duration-200`}
            onClick={() => onShowAuth(currentContent.userType)}
          >
            {t(`hero.${currentContent.userType}.primaryButton`)}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className={`px-8 py-4 text-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:scale-105 transition-all duration-200`}
            onClick={() => onShowAuth(currentContent.userType)}
          >
            {t(`hero.${currentContent.userType}.secondaryButton`)}
          </Button>
        </div>

        {/* Slide indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {heroContent.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? `bg-gradient-to-r ${currentContent.gradient}` 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* User type labels */}
        <div className="flex justify-center mt-4 space-x-6 text-sm text-gray-500">
          {heroContent.map((content, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`capitalize transition-all duration-300 ${
                index === currentSlide 
                  ? 'text-gray-800 font-medium' 
                  : 'hover:text-gray-700'
              }`}
            >
              {content.userType === 'admin' ? 'Institution' : content.userType}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RotatingHeroContent;
