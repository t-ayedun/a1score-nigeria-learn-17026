import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

interface PricingCarouselProps {
  onShowAuth: (userType: 'student' | 'teacher') => void;
}

const plans = [
  {
    name: "Free Trial",
    price: "₦0",
    period: "/7 days",
    description: "Perfect to get started",
    features: ["5 questions per day", "Basic homework help", "Secondary school subjects", "Email support"],
    popular: false,
    color: "border-gray-200"
  },
  {
    name: "Monthly Plan",
    price: "₦2,500",
    period: "/month",
    description: "Best value for students",
    features: ["Unlimited questions", "All education levels", "Progress reports", "Priority support", "Study groups"],
    popular: true,
    color: "border-green-500"
  },
  {
    name: "Annual Plan",
    price: "₦25,000",
    period: "/year",
    description: "Save 17% with annual billing",
    features: ["Everything in Monthly", "2 months free", "Exam prep materials", "One-on-one tutoring sessions", "Certificate of completion"],
    popular: false,
    color: "border-blue-500"
  }
];

const PricingCarousel = ({ onShowAuth }: PricingCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
    skipSnaps: false,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const [selectedIndex, setSelectedIndex] = useState(1); // Start with middle card (popular plan)

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    // Scroll to popular plan on mount
    emblaApi.scrollTo(1);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            Affordable Plans for Every Student
          </h3>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            From secondary school to university graduation. Start free and upgrade when you're ready.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_85%] lg:flex-[0_0_45%] px-2 sm:px-4"
                >
                  <Card className={`hover:shadow-xl transition-all duration-300 border-2 ${plan.color} ${plan.popular ? 'relative scale-105' : ''} flex flex-col h-full`}>
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                        <Badge className="bg-green-600 text-white px-3 py-1 sm:px-4 text-xs sm:text-sm shadow-lg">
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    <CardHeader className="text-center p-4 sm:p-6 pt-6 sm:pt-8">
                      <CardTitle className="text-xl sm:text-2xl mb-2">{plan.name}</CardTitle>
                      <div className="mb-3 sm:mb-4">
                        <span className="text-3xl sm:text-4xl font-bold text-gray-900">{plan.price}</span>
                        <span className="text-sm sm:text-base text-gray-600">{plan.period}</span>
                      </div>
                      <p className="text-sm sm:text-base text-gray-600">{plan.description}</p>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col p-4 pt-0 sm:p-6 sm:pt-0">
                      <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 flex-1">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                            <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className={`w-full mt-auto min-h-11 text-sm sm:text-base touch-manipulation ${
                          plan.popular ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-900 hover:bg-gray-800'
                        }`}
                        onClick={() => onShowAuth('student')}
                      >
                        Start Free Trial
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows - Hidden on mobile, visible on tablet+ */}
          <Button
            variant="outline"
            size="icon"
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 bg-white shadow-lg hover:bg-gray-100 rounded-full w-10 h-10 z-10 disabled:opacity-30"
            onClick={scrollPrev}
            disabled={selectedIndex === 0}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 bg-white shadow-lg hover:bg-gray-100 rounded-full w-10 h-10 z-10 disabled:opacity-30"
            onClick={scrollNext}
            disabled={selectedIndex === plans.length - 1}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-6 sm:mt-8">
            {plans.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === selectedIndex
                    ? "bg-purple-600 w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => scrollTo(index)}
                aria-label={`Go to ${plans[index].name}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCarousel;
