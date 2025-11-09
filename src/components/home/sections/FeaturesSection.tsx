
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, BookOpen, TrendingUp, Users, Star, Globe } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    { 
      icon: Brain, 
      title: "Smart Homework Helper", 
      description: "Get step-by-step solutions for Math, Physics, Chemistry, and English. Never get stuck on assignments again.", 
      color: "text-green-600" 
    },
    { 
      icon: BookOpen, 
      title: "Exam Preparation", 
      description: "Practice with real past questions and track your improvement. Identify weak areas before exam day.", 
      color: "text-blue-600" 
    },
    { 
      icon: TrendingUp, 
      title: "Progress Tracking", 
      description: "See exactly how you're performing with detailed reports on study time, scores, and areas for improvement.", 
      color: "text-purple-600" 
    },
    { 
      icon: Users, 
      title: "Earn While Teaching", 
      description: "Help students succeed while earning extra income. Validate answers, create content, and build your reputation.", 
      color: "text-orange-600" 
    },
    { 
      icon: Star, 
      title: "Curriculum Aligned", 
      description: "Built for local education standards with familiar examples and content that matches your syllabus.", 
      color: "text-red-600" 
    },
    { 
      icon: Globe, 
      title: "Multiple Languages", 
      description: "Available in English, Yoruba, Hausa, Igbo, and Pidgin. Learn in the language that works best for you.", 
      color: "text-teal-600" 
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Everything You Need for Academic Success
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From homework help to exam preparation, A1Score supports students, parents, and teachers every step of the way.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                <CardHeader>
                  <Icon className={`h-12 w-12 ${feature.color} mb-4`} />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
