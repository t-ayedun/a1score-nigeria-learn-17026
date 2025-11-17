import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, LineChart, Shield, CheckCircle2, ArrowRight, Mail } from "lucide-react";
import LanguageSwitcher from "@/components/language/LanguageSwitcher";

const ForInstitutions = () => {
  const navigate = useNavigate();

  const handleNavigateToAuth = () => {
    // Save current page URL as origin before navigating to auth
    localStorage.setItem('a1score_signup_origin', window.location.href);
    navigate('/auth?type=admin');
  };

  const features = [
    {
      icon: Building2,
      title: "Enterprise-Grade Infrastructure",
      description: "Scalable platform that grows with your institution, supporting thousands of students and staff."
    },
    {
      icon: Users,
      title: "Multi-Level Management",
      description: "Comprehensive admin tools for principals, HODs, teachers, and support staff."
    },
    {
      icon: LineChart,
      title: "Institution-Wide Analytics",
      description: "Track performance across departments, classes, and individual students with powerful insights."
    },
    {
      icon: Shield,
      title: "Data Security & Compliance",
      description: "Bank-level security with full compliance to Nigerian data protection regulations."
    }
  ];

  const solutions = [
    {
      title: "Secondary Schools",
      description: "Complete WAEC/JAMB/NECO preparation with AI tutoring and progress tracking",
      features: ["Curriculum alignment", "Exam preparation", "Teacher support", "Parent engagement"]
    },
    {
      title: "Universities",
      description: "Support for undergraduate and postgraduate programs across all levels",
      features: ["Department management", "Research support", "Skills training", "Career preparation"]
    },
    {
      title: "Training Centers",
      description: "Perfect for coding bootcamps and professional upskilling programs",
      features: ["Course customization", "Skills assessment", "Certificate management", "Job readiness tracking"]
    }
  ];

  const benefits = [
    "Reduce operational costs by 40%",
    "Improve student outcomes by 35%",
    "Streamline teacher workflows",
    "Enhanced parent communication",
    "Real-time performance monitoring",
    "Customizable branding and curriculum",
    "Dedicated support team",
    "Training and onboarding included"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
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
              <Button onClick={() => window.location.href = 'mailto:enterprise@a1score.com'}>
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Transform Your Institution with AI-Powered Learning
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Join leading Nigerian schools, universities, and training centers using A1Score 
            to deliver world-class education at scale.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8"
              onClick={() => window.location.href = 'mailto:enterprise@a1score.com'}
            >
              Schedule Demo <ArrowRight className="ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8"
              onClick={handleNavigateToAuth}
            >
              Start Free Trial
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Enterprise Features</h2>
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

      {/* Solutions Section */}
      <section className="bg-white/50 backdrop-blur-sm py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Tailored Solutions for Every Institution</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {solutions.map((solution, index) => (
              <Card key={index} className="border-2">
                <CardHeader>
                  <CardTitle className="text-xl">{solution.title}</CardTitle>
                  <CardDescription className="text-base">{solution.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {solution.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Proven Results</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <span className="text-lg">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Flexible Enterprise Pricing</h2>
            <p className="text-xl mb-8 opacity-90">
              Custom plans designed for your institution's size and needs. 
              Contact us for a personalized quote.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg px-8"
              onClick={() => window.location.href = 'mailto:enterprise@a1score.com'}
            >
              <Mail className="mr-2" /> Contact Sales Team
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="max-w-3xl mx-auto border-2">
          <CardContent className="py-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Institution?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Schedule a personalized demo and see how A1Score can revolutionize learning at your institution
            </p>
            <Button 
              size="lg" 
              className="text-lg px-8"
              onClick={() => window.location.href = 'mailto:enterprise@a1score.com?subject=Schedule%20Demo'}
            >
              Schedule Your Demo
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">&copy; 2024 A1Score. Powering institutional excellence.</p>
        </div>
      </footer>
    </div>
  );
};

export default ForInstitutions;
