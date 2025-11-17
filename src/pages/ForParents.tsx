import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Bell, TrendingUp, Shield, CheckCircle2, ArrowRight } from "lucide-react";
import LanguageSwitcher from "@/components/language/LanguageSwitcher";

const ForParents = () => {
  const navigate = useNavigate();

  const handleNavigateToAuth = () => {
    // Save current page URL as origin before navigating to auth
    localStorage.setItem('a1score_signup_origin', window.location.href);
    navigate('/auth?type=parent');
  };

  const features = [
    {
      icon: Eye,
      title: "Real-Time Progress Monitoring",
      description: "Track your child's learning journey with detailed insights into their study habits and performance."
    },
    {
      icon: Bell,
      title: "Instant Notifications",
      description: "Stay informed about assignments, achievements, and areas that need attention."
    },
    {
      icon: TrendingUp,
      title: "Performance Analytics",
      description: "View comprehensive reports on your child's strengths, weaknesses, and improvement trends."
    },
    {
      icon: Shield,
      title: "Safe Learning Environment",
      description: "AI-monitored platform ensures ethical use and protects against academic dishonesty."
    }
  ];

  const benefits = [
    "Monitor study time and habits",
    "Receive weekly progress reports",
    "Track JAMB/WAEC preparation",
    "Access learning resources at home",
    "Communicate with teachers easily",
    "Set and track learning goals together"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Support Your Child's Learning Journey
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Stay connected to your child's education with real-time insights, 
            progress tracking, and tools to help them succeed.
          </p>
          <Button
            size="lg"
            className="text-lg px-8"
            onClick={handleNavigateToAuth}
          >
            Create Parent Account <ArrowRight className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Everything Parents Need</h2>
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
            <h2 className="text-3xl font-bold text-center mb-12">How A1Score Helps You Stay Involved</h2>
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

      {/* Testimonial Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <Card className="border-2">
            <CardContent className="py-8">
              <blockquote className="text-lg italic mb-4">
                "A1Score has completely changed how I support my daughter's education. 
                I can see exactly where she needs help and celebrate her wins in real-time. 
                Her JAMB scores improved by 40 points!"
              </blockquote>
              <p className="font-semibold">- Mrs. Adebayo, Parent of SS3 Student</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="max-w-3xl mx-auto bg-gradient-to-r from-pink-600 to-purple-600 text-white border-0">
          <CardContent className="py-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Be Part of Your Child's Success Story</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of Nigerian parents using A1Score to support their children
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8"
              onClick={handleNavigateToAuth}
            >
              Get Started Free
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">&copy; 2024 A1Score. Empowering families through education.</p>
        </div>
      </footer>
    </div>
  );
};

export default ForParents;
