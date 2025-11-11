
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  onShowAuth: (userType: 'student' | 'teacher') => void;
}

const CTASection = ({ onShowAuth }: CTASectionProps) => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
          Ready to Transform Your Learning?
        </h3>
        <p className="text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
          Join thousands of students who are already seeing better grades and achieving their academic goals.
        </p>
        <Button 
          size="lg" 
          className="bg-white text-green-600 hover:bg-gray-100 w-full sm:w-auto min-h-11 py-3 px-6 sm:py-4 sm:px-8 text-sm sm:text-base lg:text-lg font-semibold md:hover:scale-105 transition-transform duration-200 touch-manipulation"
          onClick={() => onShowAuth('student')}
        >
          Start Free Today
        </Button>
        <p className="text-xs sm:text-sm opacity-80 mt-3 sm:mt-4">
          No Credit Card Required • 7-Day Free Trial
        </p>
      </div>
    </section>
  );
};

export default CTASection;
