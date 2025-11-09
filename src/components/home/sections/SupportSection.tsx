
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, HelpCircle, Users, Brain, BookOpen, Building2 } from "lucide-react";
import LiveChatWidget from "@/components/support/LiveChatWidget";
import HelpCenterModal from "@/components/support/HelpCenterModal";

const SupportSection = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isHelpCenterOpen, setIsHelpCenterOpen] = useState(false);

  return (
    <>
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Help is Always Available
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Whether you need technical help or academic support, we're here for you 24 hours a day.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: MessageCircle,
              title: "Chat with Us Anytime",
              description: "Get instant help from our support team in English or any Nigerian language you prefer.",
              color: "text-blue-600"
            },
            {
              icon: HelpCircle,
              title: "Easy-to-Follow Guides",
              description: "Step-by-step instructions and answers to common questions, all written in simple language.",
              color: "text-green-600"
            },
            {
              icon: Users,
              title: "Community Support",
              description: "Ask questions and get answers from other students, parents, and teachers in Nigeria.",
              color: "text-purple-600"
            },
            {
              icon: Brain,
              title: "Smart Help Assistant",
              description: "Our AI can answer simple questions immediately, any time of day or night.",
              color: "text-orange-600"
            },
            {
              icon: BookOpen,
              title: "Video Tutorials",
              description: "Watch short videos that show you exactly how to use every feature of the platform.",
              color: "text-red-600"
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
              <Card key={index} className="hover:shadow-lg hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <Icon className={`h-12 w-12 ${support.color} mb-4`} />
                  <CardTitle>{support.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{support.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gray-50 rounded-lg p-8">
            <MessageCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h4 className="text-2xl font-bold text-gray-900 mb-4">Need Help Right Now?</h4>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Don't worry if you're stuck or confused. Our friendly support team is ready to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => setIsChatOpen(true)}
              >
                Start Live Chat
              </Button>
              <Button 
                size="lg" 
                variant="outline"
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
