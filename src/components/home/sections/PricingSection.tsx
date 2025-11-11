
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PricingSectionProps {
  onShowAuth: (userType: 'student' | 'teacher') => void;
}

const PricingSection = ({ onShowAuth }: PricingSectionProps) => {
  const plans = [
    {
      name: "Free Trial",
      price: "₦0",
      period: "/month",
      description: "Perfect to get started",
      features: ["5 questions per day", "Basic homework help", "Secondary school subjects", "Email support"],
      popular: false,
      color: "border-gray-200"
    },
    {
      name: "Family Plan",
      price: "₦2,500",
      period: "/month",
      description: "Best value for families",
      features: ["Unlimited questions", "All education levels covered", "Progress reports", "Multiple children supported", "Priority support"],
      popular: true,
      color: "border-green-500"
    },
    {
      name: "Teacher Plus",
      price: "₦5,000",
      period: "/month",
      description: "Earn while you teach",
      features: ["All family features", "Earn from validating answers", "Create paid content", "Analytics dashboard", "Institution partnerships"],
      popular: false,
      color: "border-blue-500"
    }
  ];

  return (
    <section className="py-8 px-4 md:py-12 md:px-6 lg:py-20 lg:px-8 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight">
            Affordable Plans for Every Student
          </h3>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            From secondary school to university graduation. Start free and upgrade when you're ready.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`md:hover:shadow-lg md:hover:scale-105 transition-all duration-300 border-2 ${plan.color} ${plan.popular ? 'relative md:col-span-2 lg:col-span-1' : ''} flex flex-col`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-green-600 text-white px-3 py-1 md:px-4 text-xs md:text-sm">Most Popular</Badge>
                </div>
              )}
              <CardHeader className="text-center p-4 md:p-6">
                <CardTitle className="text-xl md:text-2xl mb-2">{plan.name}</CardTitle>
                <div className="mb-3 md:mb-4">
                  <span className="text-3xl md:text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-sm md:text-base text-gray-600">{plan.period}</span>
                </div>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">{plan.description}</p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-4 md:p-6">
                <ul className="space-y-2 md:space-y-3 mb-4 md:mb-6 flex-1">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start md:items-center">
                      <Check className="h-4 w-4 md:h-5 md:w-5 text-green-600 mr-2 md:mr-3 flex-shrink-0 mt-0.5 md:mt-0" />
                      <span className="text-sm md:text-base text-gray-700 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full mt-auto min-h-12 text-sm md:text-base ${plan.popular ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-900 hover:bg-gray-800'}`}
                  onClick={() => onShowAuth('student')}
                >
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
