
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, UserCheck, Brain, Users, Award } from "lucide-react";

const EthicsSection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            Safe and Responsible Learning
          </h3>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            We help students learn properly, not cheat. Parents can trust that their children are building real knowledge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              icon: Shield,
              title: "No Cheating Allowed",
              description: "We teach students how to solve problems step-by-step instead of just giving them answers to copy.",
              color: "text-blue-600"
            },
            {
              icon: Lock,
              title: "Your Child's Data is Safe",
              description: "We protect all student information and never share personal details with anyone outside our platform.",
              color: "text-green-600"
            },
            {
              icon: UserCheck,
              title: "Real Teachers Check Everything",
              description: "Nigerian teachers verify all our AI responses to make sure they're accurate and appropriate for our curriculum.",
              color: "text-purple-600"
            },
            {
              icon: Brain,
              title: "Clear About AI Help",
              description: "Students always know when they're getting AI assistance versus help from human teachers.",
              color: "text-orange-600"
            },
            {
              icon: Users,
              title: "Learning Together",
              description: "AI helps students understand concepts better so they can participate more in class and study groups.",
              color: "text-red-600"
            },
            {
              icon: Award,
              title: "Building Character",
              description: "We encourage honest learning, hard work, and helping others succeed - values important to Nigerian families.",
              color: "text-teal-600"
            }
          ].map((principle, index) => {
            const Icon = principle.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="p-4 sm:p-6">
                  <Icon className={`h-10 w-10 sm:h-12 sm:w-12 ${principle.color} mb-3 sm:mb-4`} />
                  <CardTitle className="text-lg sm:text-xl">{principle.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
                  <p className="text-sm sm:text-base text-gray-600">{principle.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EthicsSection;
