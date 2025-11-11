import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TestimonialsSection = () => {
  const testimonials = [
    {
      initials: "CB",
      name: "Chioma B.",
      location: "SS3, Lagos",
      rating: 5,
      text: "I went from 180 to 267 in JAMB practice tests! The AI tutor explains math better than my teacher.",
      badge: "+87 Points Improvement",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      initials: "AM",
      name: "Ahmed M.",
      location: "SS2, Kano",
      rating: 5,
      text: "Physics was my weakest subject. Now it's my strongest! The step-by-step explanations are amazing.",
      badge: "Physics Grade: D → A",
      gradient: "from-green-500 to-blue-500"
    },
    {
      initials: "ON",
      name: "Ola N.",
      location: "SS3, Ibadan",
      rating: 5,
      text: "I study at my own pace, anytime I want. The AI never gets tired of my questions like my siblings do!",
      badge: "250+ Hours Studied",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  const trustBadges = [
    { icon: "🔒", text: "Data Privacy Certified" },
    { icon: "✅", text: "Curriculum Aligned (WAEC/JAMB/NECO)" },
    { icon: "🌍", text: "Available in 5 Languages" },
    { icon: "👨‍🏫", text: "Teacher Verified Content" }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-3 sm:mb-4">
          Real Students, Real Results
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-center text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto">
          Join thousands of Nigerian students achieving their academic goals
        </p>
        
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.initials} className="p-4 sm:p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${testimonial.gradient} flex items-center justify-center text-white font-bold text-base sm:text-lg flex-shrink-0`}>
                  {testimonial.initials}
                </div>
                <div className="ml-3 min-w-0">
                  <div className="font-semibold text-sm sm:text-base truncate">{testimonial.name}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground truncate">{testimonial.location}</div>
                </div>
              </div>
              <div className="text-yellow-500 mb-2 text-base sm:text-lg">★★★★★</div>
              <p className="text-sm sm:text-base text-gray-700 mb-3 leading-relaxed">
                {testimonial.text}
              </p>
              <Badge className="bg-green-100 text-green-800 text-xs sm:text-sm border-green-200">
                {testimonial.badge}
              </Badge>
            </Card>
          ))}
        </div>
        
        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 lg:gap-8 pt-8 border-t">
          {trustBadges.map((badge) => (
            <Badge key={badge.text} variant="outline" className="text-xs sm:text-sm px-3 sm:px-4 py-2">
              {badge.icon} {badge.text}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
