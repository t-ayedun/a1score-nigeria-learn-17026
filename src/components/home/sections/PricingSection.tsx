import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface PricingSectionProps {
  onShowAuth: (userType: 'student' | 'teacher' | 'parent' | 'admin') => void;
}

const PricingSection = ({ onShowAuth }: PricingSectionProps) => {
  const plans = [
    {
      name: "Free Trial",
      price: "₦0",
      period: "7 days",
      description: "Try all features free",
      features: [
        "Full platform access",
        "AI tutor for all subjects",
        "Practice tests",
        "Progress tracking",
        "Limited to 50 questions"
      ]
    },
    {
      name: "Monthly",
      price: "₦2,500",
      period: "per month",
      description: "Perfect for trying it out",
      popular: true,
      features: [
        "Unlimited AI tutoring",
        "All subjects covered",
        "Unlimited practice tests",
        "Progress tracking",
        "Study communities",
        "Homework help",
        "24/7 access"
      ]
    },
    {
      name: "Annual",
      price: "₦25,000",
      period: "per year",
      description: "Save ₦5,000 (2 months free)",
      features: [
        "Everything in Monthly",
        "Priority support",
        "Offline study materials",
        "Early access to features",
        "Certificate on completion"
      ]
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-3 sm:mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-center text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
          Choose the plan that works best for you
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`p-4 sm:p-6 relative transition-shadow duration-300 md:hover:shadow-xl ${
                plan.popular ? 'ring-2 ring-primary shadow-lg' : ''
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-purple-600 text-white text-xs sm:text-sm">
                  Most Popular
                </Badge>
              )}
              <div className="text-center mb-6">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-3xl sm:text-4xl font-bold">{plan.price}</span>
                  <span className="text-sm sm:text-base text-muted-foreground">/{plan.period}</span>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground">{plan.description}</p>
              </div>
              <ul className="space-y-2.5 sm:space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2 text-sm sm:text-base">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full min-h-11 text-sm sm:text-base touch-manipulation"
                variant={plan.popular ? "default" : "outline"}
                onClick={() => onShowAuth('student')}
              >
                Start Free Trial
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
