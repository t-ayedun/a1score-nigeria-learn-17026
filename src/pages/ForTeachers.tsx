import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, BarChart3, DollarSign, CheckCircle2, ArrowRight } from "lucide-react";
import LanguageSwitcher from "@/components/language/LanguageSwitcher";

const ForTeachers = () => {
  const navigate = useNavigate();

  const handleNavigateToAuth = () => {
    // Save current page URL as origin before navigating to auth
    localStorage.setItem('a1score_signup_origin', window.location.href);
    navigate('/auth?type=teacher');
  };

  const features = [
    {
      icon: BookOpen,
      title: "AI-Powered Content Creation",
      description: "Generate lesson plans, quizzes, and assessments in minutes with our intelligent content tools."
    },
    {
      icon: Users,
      title: "Class Management",
      description: "Monitor student progress, track engagement, and identify at-risk learners with real-time analytics."
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Get detailed insights into class performance, learning patterns, and individual student needs."
    },
    {
      icon: DollarSign,
      title: "Earn Through Validation",
      description: "Monetize your expertise by validating AI-generated content and helping improve the platform."
    }
  ];

  const benefits = [
    "Reduce lesson planning time by 70%",
    "Track student progress in real-time",
    "Automated assessment grading",
    "Customizable curriculum alignment",
    "Parent communication tools",
    "Professional development resources"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src="/lovable-uploads/cd2e80a3-ae02-4d77-b4b6-84f985045e4e.png" 
                alt="A1Score Logo" 
                className="h-12 w-auto object-contain cursor-pointer"
                onClick={() => navigate('/')}
              />
              <Button variant="ghost" onClick={() => navigate('/')}>
                Back to Home
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <Button onClick={handleNavigateToAuth}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Empower Your Teaching with AI
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of Nigerian educators using A1Score to create engaging lessons, 
            track student progress, and reduce administrative workload.
          </p>
          <Button
            size="lg"
            className="text-lg px-8"
            onClick={handleNavigateToAuth}
          >
            Start Teaching Smarter <ArrowRight className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Everything You Need to Teach Effectively</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white/50 backdrop-blur-sm py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Teachers Love A1Score</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="max-w-3xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardContent className="py-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Classroom?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join A1Score today and experience the future of teaching
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8"
              onClick={handleNavigateToAuth}
            >
              Create Teacher Account
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">&copy; 2024 A1Score. Empowering Nigerian educators.</p>
        </div>
      </footer>
    </div>
  );
};

export default ForTeachers;
