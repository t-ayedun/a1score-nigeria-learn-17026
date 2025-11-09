
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Users, Heart, Building2 } from "lucide-react";

const DashboardsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Made for Every Level of Education
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Different tools for students, parents, teachers, and institutions to work together across all educational levels.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              title: "For Students", 
              icon: Brain, 
              description: "Get help with assignments, exam prep, and research from secondary school through postgraduate studies", 
              color: "text-blue-600" 
            },
            { 
              title: "For Teachers", 
              icon: Users, 
              description: "Earn money helping students at all levels, create content for any subject or academic level", 
              color: "text-green-600" 
            },
            { 
              title: "For Parents", 
              icon: Heart, 
              description: "Monitor your child's academic journey from secondary school through university and beyond", 
              color: "text-pink-600" 
            },
            { 
              title: "For Institutions", 
              icon: Building2, 
              description: "Manage students across all levels, track performance, and reduce tutoring costs effectively", 
              color: "text-purple-600" 
            },
          ].map((dashboard, index) => {
            const Icon = dashboard.icon;
            return (
              <Card key={index} className="hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                <CardHeader className="text-center">
                  <Icon className={`h-12 w-12 ${dashboard.color} mx-auto mb-4`} />
                  <CardTitle className="text-lg">{dashboard.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 text-sm">{dashboard.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DashboardsSection;
