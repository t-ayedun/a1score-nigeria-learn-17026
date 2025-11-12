
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  onShowAuth: (userType: 'student' | 'teacher') => void;
}

const CTASection = ({ onShowAuth }: CTASectionProps) => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
          Ready to Transform Your Learning?
        </h3>
        <p className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed px-4">
          Join thousands of students who are already seeing better grades and achieving their academic goals.
        </p>
        <Button
          size="lg"
          className="w-full sm:w-auto bg-white text-green-600 hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold min-h-11 hover:scale-105 transition-transform duration-200 touch-manipulation"
          onClick={() => onShowAuth('student')}
        >
          Start Free Today
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
