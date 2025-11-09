
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
    <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Affordable Plans for Every Student
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From secondary school to university graduation. Start free and upgrade when you're ready.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`hover:shadow-lg hover:scale-105 transition-all duration-300 border-2 ${plan.color} ${plan.popular ? 'relative' : ''} flex flex-col`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-green-600 text-white px-4 py-1">Most Popular</Badge>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-3 mb-6 flex-1">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full mt-auto ${plan.popular ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-900 hover:bg-gray-800'}`}
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
