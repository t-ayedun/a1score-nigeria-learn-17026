import { Button } from "@/components/ui/button";
import { X, Check } from "lucide-react";

interface ProblemSolutionSectionProps {
  onShowAuth: (userType: 'student' | 'teacher' | 'parent' | 'admin') => void;
}

const ProblemSolutionSection = ({ onShowAuth }: ProblemSolutionSectionProps) => {
  const problems = [
    "Private lessons cost ₦5,000+ per hour",
    "Teachers are too busy for individual attention",
    "Past questions don't explain solutions",
    "Studying alone without help"
  ];

  const solutions = [
    "Unlimited AI tutoring 24/7 for ₦2,500/month",
    "Personal AI tutor for every subject",
    "Step-by-step explanations for every answer",
    "Join study groups with thousands of students"
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-red-50 to-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-3 sm:mb-4">
          Struggling with JAMB Prep? Can't Afford Private Tutoring?
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-center text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto">
          Get unlimited AI tutoring for less than ₦100/day
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto mb-8 sm:mb-10">
          {/* Problems */}
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 sm:p-6 lg:p-8 border border-red-100">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 text-red-600">
              The Problem
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              {problems.map((problem, index) => (
                <li key={index} className="flex items-start gap-3">
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-gray-700">{problem}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 sm:p-6 lg:p-8 border border-green-100 shadow-lg">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 text-green-600">
              The A1Score Solution
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              {solutions.map((solution, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-gray-700">{solution}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="w-full sm:w-auto min-h-11 py-3 px-6 sm:py-4 sm:px-8 text-sm sm:text-base touch-manipulation"
            onClick={() => onShowAuth('student')}
          >
            Try Free for 7 Days
          </Button>
          <p className="text-xs sm:text-sm text-muted-foreground mt-3">
            No credit card required • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
