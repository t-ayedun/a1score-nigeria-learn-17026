import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, BookOpen, Code, GraduationCap, CheckCircle2 } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const learnerStages = [
  {
    icon: BookOpen,
    title: "SS3 Students",
    description: "Ace JAMB, WAEC, and NECO with AI-powered tutoring tailored to the Nigerian curriculum",
    features: ["Past questions practice", "Exam strategies", "Subject mastery"]
  },
  {
    icon: GraduationCap,
    title: "University Students",
    description: "Excel in your courses with personalized study support and exam prep",
    features: ["Course materials", "Assignment help", "Exam preparation"]
  },
  {
    icon: Brain,
    title: "Postgraduate Students",
    description: "Research support, thesis writing, and advanced learning for Masters and PhD students",
    features: ["Research tools", "Literature review", "Thesis assistance"]
  },
  {
    icon: Code,
    title: "Professional Development",
    description: "Master new skills and stay competitive in your field with hands-on, practical learning",
    features: ["Skill development", "Project guidance", "Career advancement"]
  }
];

const LearningStageCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center"
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
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
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="text-center mb-12 md:mb-16 lg:mb-20">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
          Built for Every Learning Stage
        </h2>
        <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto px-4 leading-relaxed">
          AI-powered learning that adapts to your unique needs - from secondary school to professional development
        </p>
      </div>

      <div className="relative">
        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 md:gap-6">
            {learnerStages.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <div
                  key={index}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                >
                  <Card className="border-2 hover:shadow-xl transition-all h-full">
                    <CardHeader className="p-4 md:p-6">
                      <Icon className="w-8 h-8 md:w-10 md:h-10 text-primary mb-3 sm:mb-4" />
                      <CardTitle className="text-base md:text-lg leading-tight">{stage.title}</CardTitle>
                      <CardDescription className="text-sm md:text-base leading-relaxed">
                        {stage.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
                      <ul className="space-y-2">
                        {stage.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm">
                            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
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
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg hover:bg-gray-100 rounded-full min-w-11 min-h-11"
          onClick={scrollPrev}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg hover:bg-gray-100 rounded-full min-w-11 min-h-11"
          onClick={scrollNext}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>

        {/* Dot Indicators - Larger touch targets */}
        <div className="flex justify-center gap-2 mt-6">
          {learnerStages.map((_, index) => (
            <button
              key={index}
              className={`min-w-11 min-h-11 flex items-center justify-center touch-manipulation ${
                index === selectedIndex ? "" : ""
              }`}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
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
    </section>
  );
};

export default LearningStageCarousel;
