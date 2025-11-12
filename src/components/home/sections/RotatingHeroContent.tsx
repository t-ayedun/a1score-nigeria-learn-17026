
import { useState, useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Users, Heart, Building2, GraduationCap, Target, TrendingUp } from "lucide-react";

interface RotatingHeroContentProps {
  onShowAuth: (userType: 'student' | 'teacher' | 'parent' | 'admin') => void;
}

const RotatingHeroContent = ({ onShowAuth }: RotatingHeroContentProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null);

  const heroContent = [
    {
      slideKey: 'main' as const,
      icon: GraduationCap,
      gradient: "from-primary to-purple-600",
      showExamples: true
    },
    {
      slideKey: 'feature1' as const,
      icon: Target,
      gradient: "from-green-600 to-teal-600"
    },
    {
      slideKey: 'feature2' as const,
      icon: Heart,
      gradient: "from-pink-600 to-rose-600"
    },
    {
      slideKey: 'feature3' as const,
      icon: TrendingUp,
      gradient: "from-purple-600 to-indigo-600"
    }
  ];

  const navigateToSlide = (index: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setDirection(index > currentSlide ? 'forward' : 'backward');
    setCurrentSlide(index);
    
    // Reset auto-rotate timer
    if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current);
    }
    startAutoRotate();

    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const startAutoRotate = () => {
    autoRotateRef.current = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = prev + 1;
        if (next === heroContent.length) {
          // We're at the duplicate, after animation completes, jump to real first slide
          setTimeout(() => {
            setCurrentSlide(0);
          }, 1050); // Just after the 1s transition
          return next;
        }
        return next;
      });
    }, 8000);
  };

  useEffect(() => {
    startAutoRotate();

    return () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
      }
    };
  }, [heroContent.length]);

  const currentContent = heroContent[currentSlide % heroContent.length];
  const CurrentIcon = currentContent.icon;

  return (
    <div className="relative overflow-hidden">
      {/* Background gradient that changes with content */}
      <div className={`absolute inset-0 bg-gradient-to-br ${currentContent.gradient} opacity-5 transition-all duration-1000`} />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Icon */}
        <div className="mb-4 sm:mb-6">
          <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full bg-gradient-to-r ${currentContent.gradient} flex items-center justify-center transition-all duration-600`}>
            <CurrentIcon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </div>
        </div>

        {/* Carousel container with overflow hidden */}
        <div className="relative min-h-[400px] sm:min-h-[450px] md:min-h-[500px] overflow-hidden">
          <div
            className={`flex transition-transform duration-1000 ease-in-out`}
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {/* Render all slides plus duplicate of first slide at end */}
            {[...heroContent, heroContent[0]].map((content, index) => {
              const Icon = content.icon;
              const isLastDuplicate = index === heroContent.length;
              return (
                <div
                  key={isLastDuplicate ? 'duplicate-0' : content.slideKey}
                  className="min-w-full flex-shrink-0 px-4"
                >
                  <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-center">
                      {t(`hero.${content.slideKey}.title`)}
                    </h2>

                    <h3 className={`text-xl sm:text-2xl md:text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r ${content.gradient} text-center`}>
                      {t(`hero.${content.slideKey}.subtitle`)}
                    </h3>

                    <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-center px-4">
                      {t(`hero.${content.slideKey}.description`)}
                    </p>

                    {/* Examples for main slide */}
                    {content.showExamples && (
                      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mt-4 sm:mt-6">
                        <Badge variant="secondary" className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base">
                          📚 {t('hero.main.example1')}
                        </Badge>
                        <Badge variant="secondary" className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base">
                          🎓 {t('hero.main.example2')}
                        </Badge>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-6 sm:mt-8">
                      <Button
                        size="lg"
                        className={`w-full sm:w-auto bg-gradient-to-r ${content.gradient} hover:opacity-90 text-white px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base lg:text-lg hover:scale-105 transition-all duration-200 min-h-11 touch-manipulation`}
                        onClick={() => {
                          // For slide 4 (feature3), route to waitlist page
                          if (content.slideKey === 'feature3') {
                            navigate('/join-waitlist');
                          } else {
                            onShowAuth('student');
                          }
                        }}
                      >
                        {t(`hero.${content.slideKey}.primaryButton`)}
                        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base lg:text-lg border-2 hover:scale-105 transition-all duration-200 min-h-11 touch-manipulation"
                        onClick={() => {
                          // For slide 4 (feature3), route to stay updated page
                          if (content.slideKey === 'feature3') {
                            navigate('/stay-updated');
                          } else {
                            onShowAuth('student');
                          }
                        }}
                      >
                        {t(`hero.${content.slideKey}.secondaryButton`)}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Slide indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {heroContent.map((_, index) => (
            <button
              key={index}
              onClick={() => navigateToSlide(index)}
              disabled={isTransitioning}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === (currentSlide % heroContent.length)
                  ? `bg-gradient-to-r ${currentContent.gradient}` 
                  : 'bg-muted hover:bg-muted-foreground/40'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default RotatingHeroContent;
