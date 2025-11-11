import { Button } from "@/components/ui/button";

interface HowItWorksSectionProps {
  onShowAuth: (userType: 'student' | 'teacher' | 'parent' | 'admin') => void;
}

const HowItWorksSection = ({ onShowAuth }: HowItWorksSectionProps) => {
  const steps = [
    {
      number: "1",
      title: "Sign Up Free",
      description: "Create your account in 30 seconds. No credit card required.",
      gradient: "from-green-500 to-blue-500"
    },
    {
      number: "2",
      title: "Tell Us Your Goals",
      description: "Select your class level and exam targets (JAMB, WAEC, NECO).",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      number: "3",
      title: "Start Learning",
      description: "Chat with your AI tutor, take quizzes, and track your progress.",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 lg:mb-16">
          Getting Started is Easy
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg`}>
                <span className="text-2xl sm:text-3xl font-bold text-white">{step.number}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{step.title}</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8 sm:mt-12">
          <Button 
            size="lg" 
            className="w-full sm:w-auto min-h-11 py-3 px-6 sm:py-4 sm:px-8 text-sm sm:text-base touch-manipulation"
            onClick={() => onShowAuth('student')}
          >
            Start Your Free Trial
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
