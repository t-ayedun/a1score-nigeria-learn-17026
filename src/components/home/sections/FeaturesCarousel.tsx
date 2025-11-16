import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MessageCircle,
  Camera,
  ClipboardCheck,
  Target,
  TrendingUp,
  Award
} from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: MessageCircle,
    title: "AI Tutor Chat",
    description: "Get instant help 24/7. Your personal tutor that never gets tired.",
    gradient: "from-primary to-purple-600"
  },
  {
    icon: Camera,
    title: "Homework Scanner",
    description: "Snap a photo and get step-by-step solutions with detailed explanations.",
    gradient: "from-green-600 to-teal-600"
  },
  {
    icon: ClipboardCheck,
    title: "Exam Preparation",
    description: "Practice with past WAEC, JAMB, and NECO questions. Build confidence with timed mocks.",
    gradient: "from-blue-600 to-cyan-600"
  },
  {
    icon: Target,
    title: "Personalized Learning",
    description: "AI adapts to your learning style and pace. Focus on what you need most.",
    gradient: "from-orange-600 to-amber-600"
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Watch yourself improve with visual analytics and performance insights.",
    gradient: "from-purple-600 to-pink-600"
  },
  {
    icon: Award,
    title: "Achievements & Badges",
    description: "Earn badges, maintain streaks, and compete with friends as you master concepts.",
    gradient: "from-yellow-600 to-orange-600"
  },
];

const FeaturesCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
    },
    [Autoplay({ delay: 6000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
            Everything You Need to Succeed
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto px-4 leading-relaxed">
            From homework help to exam preparation, A1Score has you covered.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 md:gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                  >
                    <Card className="group hover:shadow-xl transition-all duration-300 border border-border bg-card h-full">
                      <CardHeader className="space-y-3 sm:space-y-4 p-4 md:p-6">
                        <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center mx-auto`}>
                          <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                        </div>
                        <CardTitle className="text-base md:text-lg lg:text-xl font-semibold text-foreground group-hover:text-primary transition-colors text-center leading-tight">
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed text-center">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Arrows - Larger touch targets */}
          <Button
            variant="outline"
            size="icon"
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 bg-white shadow-lg hover:bg-gray-100 rounded-full min-w-11 min-h-11 z-10"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 bg-white shadow-lg hover:bg-gray-100 rounded-full min-w-11 min-h-11 z-10"
            onClick={scrollNext}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Dot Indicators - Larger touch targets */}
          <div className="flex justify-center gap-2 mt-6 sm:mt-8">
            {features.map((_, index) => (
              <button
                key={index}
                className={`min-w-11 min-h-11 flex items-center justify-center touch-manipulation`}
                onClick={() => scrollTo(index)}
                aria-label={`Go to feature ${index + 1}`}
              >
                <div
                  className={`rounded-full transition-all ${
                    index === selectedIndex
                      ? "bg-primary w-8 h-3"
                      : "bg-gray-300 hover:bg-gray-400 w-3 h-3"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesCarousel;
