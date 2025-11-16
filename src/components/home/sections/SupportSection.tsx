
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, BookOpen, Building2 } from "lucide-react";
import LiveChatWidget from "@/components/support/LiveChatWidget";
import HelpCenterModal from "@/components/support/HelpCenterModal";

const SupportSection = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isHelpCenterOpen, setIsHelpCenterOpen] = useState(false);

  return (
    <>
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            Help is Always Available
          </h3>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Whether you need technical help or academic support, we're here for you 24 hours a day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              icon: MessageCircle,
              title: "24/7 AI Chat Support",
              description: "Get instant help from our AI assistant or support team anytime, in English or any Nigerian language you prefer.",
              color: "text-blue-600"
            },
            {
              icon: BookOpen,
              title: "Help Center & Community",
              description: "Access video tutorials, step-by-step guides, and get answers from other students, parents, and teachers.",
              color: "text-green-600"
            },
            {
              icon: Building2,
              title: "School Support Team",
              description: "Special support for teachers and school administrators, including training and setup help.",
              color: "text-teal-600"
            }
          ].map((support, index) => {
            const Icon = support.icon;
            return (
              <Card key={index} className="border border-gray-200 md:hover:border-indigo-300 transition-all duration-300">
                <CardHeader className="p-4 md:p-6">
                  <Icon className={`h-10 w-10 sm:h-12 sm:w-12 ${support.color} mb-3 sm:mb-4`} />
                  <CardTitle className="text-lg sm:text-xl">{support.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
                  <p className="text-sm md:text-base text-gray-600">{support.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-10 sm:mt-12 lg:mt-16 text-center">
          <div className="bg-gray-50 rounded-lg p-6 sm:p-8">
            <MessageCircle className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-green-600 mx-auto mb-3 sm:mb-4" />
            <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Need Help Right Now?</h4>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6 max-w-2xl mx-auto px-4">
              Don't worry if you're stuck or confused. Our friendly support team is ready to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 min-h-11 text-sm sm:text-base touch-manipulation"
                onClick={() => setIsChatOpen(true)}
              >
                Start Live Chat
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto min-h-11 text-sm sm:text-base touch-manipulation"
                onClick={() => setIsHelpCenterOpen(true)}
              >
                Browse Help Center
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <LiveChatWidget 
      isOpen={isChatOpen} 
      onClose={() => setIsChatOpen(false)} 
    />
    
    <HelpCenterModal 
      isOpen={isHelpCenterOpen} 
      onClose={() => setIsHelpCenterOpen(false)} 
    />
    </>
  );
};

export default SupportSection;
