
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Building2, Users, GraduationCap, TrendingUp } from "lucide-react";

const InstitutionalSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Transform Your School's Performance
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Help your students perform better while reducing teaching costs. Designed for Nigerian schools of all sizes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h4 className="text-2xl font-bold text-gray-900 mb-6">What Schools Get</h4>
            <ul className="space-y-4">
              {[
                "Better WAEC and JAMB results for your students",
                "Reduced need for expensive extra lessons",
                "Detailed reports on each student's progress",
                "Support for teachers to improve their methods",
                "24/7 homework help for all students",
                "Custom setup for your school's curriculum",
                "Training and ongoing support included",
                "Affordable pricing that fits school budgets"
              ].map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Building2, title: "200+ Schools", description: "Already Using A1Score" },
              { icon: Users, title: "25K+ Students", description: "Learning Daily" },
              { icon: GraduationCap, title: "1K+ Teachers", description: "Trained & Active" },
              { icon: TrendingUp, title: "40% Better", description: "Exam Performance" }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <CardHeader>
                    <Icon className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                    <CardTitle className="text-lg">{stat.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{stat.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstitutionalSection;
