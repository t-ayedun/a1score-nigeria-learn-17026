
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, MessageCircle, Trophy, Star } from "lucide-react";

interface CommunitySectionProps {
  onShowAuth: (userType: 'student' | 'teacher' | 'parent' | 'admin') => void;
}

const CommunitySection = ({ onShowAuth }: CommunitySectionProps) => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-indigo-50 to-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            Join the A1Score Community
          </h3>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Connect with other students, share knowledge, and learn together in a supportive environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10 lg:mb-12">
          {[
            { icon: Users, title: "Study Groups", description: "Join groups with classmates", count: "150+ Active Groups" },
            { icon: MessageCircle, title: "Share Knowledge", description: "Collaborate and learn from peers", count: "5K+ Active Members" },
            { icon: Trophy, title: "Friendly Competition", description: "Compete in academic challenges", count: "Weekly Contests" },
            { icon: Star, title: "Help Others", description: "Earn points by helping classmates", count: "Top Helper Awards" }
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border border-gray-200 md:hover:border-indigo-300 transition-colors min-h-[120px] text-center">
                <CardHeader className="p-4 md:p-6">
                  <Icon className="h-8 w-8 md:h-10 md:w-10 text-green-600 mx-auto mb-3 sm:mb-4" />
                  <CardTitle className="text-base sm:text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
                  <p className="text-gray-600 text-sm md:text-base mb-2">{feature.description}</p>
                  <Badge className="bg-green-100 text-green-800 text-xs">{feature.count}</Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 sm:p-8 text-white text-center">
          <Users className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 mx-auto mb-3 sm:mb-4 opacity-90" />
          <h4 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Learn Better Together</h4>
          <p className="text-sm sm:text-base lg:text-lg opacity-90 mb-4 sm:mb-6 max-w-2xl mx-auto px-4">
            Join thousands of students who are helping each other succeed in school and prepare for university.
          </p>
          <Button
            size="lg"
            className="w-full sm:w-auto bg-white text-green-600 hover:bg-gray-100 min-h-11 text-sm sm:text-base touch-manipulation"
            onClick={() => onShowAuth('student')}
          >
            Join Our Community
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
