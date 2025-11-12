
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, FlaskConical, Globe, BookOpen, Scale, Microscope, TrendingUp, Cpu } from "lucide-react";

const SubjectsSection = () => {
  const [currentLevel, setCurrentLevel] = useState(0);

  const academicLevels = [
    {
      title: "Secondary School Excellence",
      subtitle: "Master foundational concepts with AI guidance",
      subjects: [
        { name: 'Mathematics', icon: Calculator, color: 'bg-blue-500', topics: 'Algebra, Calculus, Statistics' },
        { name: 'Physics', icon: FlaskConical, color: 'bg-purple-500', topics: 'Mechanics, Electricity, Quantum' },
        { name: 'Chemistry', icon: FlaskConical, color: 'bg-green-500', topics: 'Organic, Inorganic, Physical' },
        { name: 'English Language', icon: Globe, color: 'bg-orange-500', topics: 'Literature, Writing, Analysis' },
      ]
    },
    {
      title: "University & Beyond",
      subtitle: "Advanced research and professional development",
      subjects: [
        { name: 'Computer Science', icon: Cpu, color: 'bg-indigo-500', topics: 'AI, Algorithms, Software Engineering' },
        { name: 'Law & Jurisprudence', icon: Scale, color: 'bg-red-500', topics: 'Constitutional, Criminal, International' },
        { name: 'Medical Sciences', icon: Microscope, color: 'bg-emerald-500', topics: 'Anatomy, Pathology, Pharmacology' },
        { name: 'Business Studies', icon: TrendingUp, color: 'bg-amber-500', topics: 'Finance, Marketing, Strategy' },
      ]
    },
    {
      title: "Research & Postgraduate",
      subtitle: "Specialized knowledge for advanced scholars",
      subjects: [
        { name: 'Literature & Humanities', icon: BookOpen, color: 'bg-pink-500', topics: 'Critical Theory, Research Methods' },
        { name: 'Engineering', icon: Calculator, color: 'bg-cyan-500', topics: 'Civil, Mechanical, Electrical' },
        { name: 'Social Sciences', icon: Globe, color: 'bg-violet-500', topics: 'Psychology, Sociology, Anthropology' },
        { name: 'Pure Sciences', icon: Microscope, color: 'bg-teal-500', topics: 'Advanced Physics, Biochemistry' },
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLevel((prev) => (prev + 1) % academicLevels.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentData = academicLevels[currentLevel];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Master Every Academic Level
          </h3>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
            From secondary school foundations to advanced university research -
            AI-powered assistance across all disciplines and academic levels.
          </p>

          {/* Dynamic Level Indicator */}
          <div className="flex justify-center space-x-2 mb-6 sm:mb-8">
            {academicLevels.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-6 sm:w-8 rounded-full transition-all duration-500 ${
                  index === currentLevel ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Animated Level Title */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12 min-h-[100px] sm:min-h-[120px] flex flex-col justify-center">
          <div
            key={currentLevel}
            className="animate-fade-in px-4"
          >
            <h4 className="text-xl sm:text-2xl font-bold text-blue-900 mb-2">
              {currentData.title}
            </h4>
            <p className="text-base sm:text-lg text-gray-600">
              {currentData.subtitle}
            </p>
          </div>
        </div>

        {/* Animated Subject Cards */}
        <div
          key={`level-${currentLevel}`}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 animate-fade-in"
        >
          {currentData.subjects.map((subject, index) => {
            const Icon = subject.icon;
            return (
              <Card
                key={`${currentLevel}-${index}`}
                className="hover:shadow-xl transition-all duration-500 cursor-pointer bg-white/80 backdrop-blur-sm border-2 border-transparent hover:border-blue-200"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <CardHeader className="text-center p-4 sm:p-6">
                  <div className={`w-14 h-14 sm:w-18 sm:h-18 ${subject.color} rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg`}>
                    <Icon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl font-bold text-gray-900">{subject.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center p-4 pt-0 sm:p-6 sm:pt-0">
                  <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">{subject.topics}</p>
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 text-xs sm:text-sm">
                    AI Tutor Ready
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Academic Journey Indicator */}
        <div className="text-center mt-10 sm:mt-12 lg:mt-16">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 bg-white/60 backdrop-blur-sm rounded-full px-4 sm:px-6 lg:px-8 py-3 sm:py-4 shadow-lg">
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm font-medium text-gray-700">Secondary</span>
            </div>
            <div className="w-4 sm:w-8 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 hidden xs:block"></div>
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              <span className="text-xs sm:text-sm font-medium text-gray-700">University</span>
            </div>
            <div className="w-4 sm:w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 hidden xs:block"></div>
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
              <span className="text-xs sm:text-sm font-medium text-gray-700">Research</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubjectsSection;
