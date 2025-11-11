import { Card } from "@/components/ui/card";
import { useTranslation } from 'react-i18next';
import { 
  Brain, 
  Camera, 
  BookOpen, 
  Target, 
  LineChart, 
  Trophy
} from "lucide-react";

const FeaturesSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Brain,
      title: t('features.aiTutor.title'),
      description: t('features.aiTutor.description'),
      gradient: "from-blue-600 to-purple-600"
    },
    {
      icon: Camera,
      title: t('features.homework.title'),
      description: t('features.homework.description'),
      gradient: "from-purple-600 to-pink-600"
    },
    {
      icon: Target,
      title: t('features.exam.title'),
      description: t('features.exam.description'),
      gradient: "from-orange-600 to-red-600"
    },
    {
      icon: BookOpen,
      title: t('features.personalized.title'),
      description: t('features.personalized.description'),
      gradient: "from-green-600 to-blue-600"
    },
    {
      icon: LineChart,
      title: t('features.progress.title'),
      description: t('features.progress.description'),
      gradient: "from-cyan-600 to-blue-600"
    },
    {
      icon: Trophy,
      title: t('features.gamification.title'),
      description: t('features.gamification.description'),
      gradient: "from-yellow-600 to-orange-600"
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-3 sm:mb-4">
          {t('features.title')}
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-center text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
          {t('features.subtitle')}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-4 sm:p-6 transition-shadow duration-300 md:hover:shadow-xl border-border">
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-md`}>
                <feature.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
