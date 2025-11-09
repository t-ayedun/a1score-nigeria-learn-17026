import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, BookOpen, Video, MessageCircle, Users, Building2, Star } from "lucide-react";

interface HelpCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const helpCategories = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: BookOpen,
    articles: [
      { title: 'How to create your first account', views: 1250, rating: 4.8 },
      { title: 'Setting up your profile', views: 890, rating: 4.6 },
      { title: 'Understanding the dashboard', views: 2100, rating: 4.9 },
      { title: 'Choosing your learning path', views: 765, rating: 4.7 }
    ]
  },
  {
    id: 'students',
    title: 'For Students',
    icon: Users,
    articles: [
      { title: 'How to submit assignments', views: 3200, rating: 4.8 },
      { title: 'Using the AI tutor effectively', views: 2800, rating: 4.9 },
      { title: 'Tracking your progress', views: 1900, rating: 4.7 },
      { title: 'Joining study groups', views: 1200, rating: 4.5 }
    ]
  },
  {
    id: 'teachers',
    title: 'For Teachers',
    icon: Building2,
    articles: [
      { title: 'Creating and managing classes', views: 1800, rating: 4.8 },
      { title: 'Grading assignments', views: 2200, rating: 4.6 },
      { title: 'Communicating with parents', views: 1500, rating: 4.7 },
      { title: 'Using analytics dashboard', views: 980, rating: 4.5 }
    ]
  }
];

const faqs = [
  {
    question: "How do I reset my password?",
    answer: "You can reset your password by clicking 'Forgot Password' on the login page. We'll send you a reset link via email."
  },
  {
    question: "Is A1Score available in Nigerian languages?",
    answer: "Yes! A1Score supports English, Pidgin, Yoruba, Hausa, and Igbo. You can change your language in the settings."
  },
  {
    question: "How much does A1Score cost?",
    answer: "We offer a free tier for basic features. Premium plans start at ₦2,000 per month for students and ₦5,000 for schools."
  },
  {
    question: "Can I use A1Score offline?",
    answer: "Some features work offline, but you'll need an internet connection for AI tutoring and real-time collaboration."
  },
  {
    question: "How do I contact technical support?",
    answer: "You can reach us through live chat, email at support@a1score.com, or WhatsApp at +234 123 456 7890."
  }
];

const videoTutorials = [
  { title: "Getting Started with A1Score", duration: "5:32", views: 15200 },
  { title: "Using the AI Tutor", duration: "8:15", views: 22100 },
  { title: "Creating Your First Assignment", duration: "6:45", views: 8900 },
  { title: "Parent Dashboard Overview", duration: "4:20", views: 12300 }
];

const HelpCenterModal = ({ isOpen, onClose }: HelpCenterModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("getting-started");

  const filteredCategories = helpCategories.map(category => ({
    ...category,
    articles: category.articles.filter(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.articles.length > 0);

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Help Center</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search for help articles, FAQs, or guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs defaultValue="articles" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="articles">Help Articles</TabsTrigger>
              <TabsTrigger value="faqs">FAQs</TabsTrigger>
              <TabsTrigger value="videos">Video Tutorials</TabsTrigger>
            </TabsList>
            
            <TabsContent value="articles" className="space-y-4">
              <div className="grid md:grid-cols-3 gap-6">
                {filteredCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Card key={category.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-center space-x-2">
                          <Icon className="h-5 w-5 text-primary" />
                          <CardTitle className="text-lg">{category.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {category.articles.map((article, index) => (
                          <div key={index} className="flex items-center justify-between group cursor-pointer hover:text-primary">
                            <div className="flex-1">
                              <p className="text-sm font-medium group-hover:underline">
                                {article.title}
                              </p>
                              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                <span>{article.views} views</span>
                                <div className="flex items-center space-x-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span>{article.rating}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
            
            <TabsContent value="faqs" className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                {filteredFAQs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
            
            <TabsContent value="videos" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {videoTutorials.map((video, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Video className="h-5 w-5 text-primary" />
                        <Badge variant="secondary">{video.duration}</Badge>
                      </div>
                      <CardTitle className="text-base">{video.title}</CardTitle>
                      <CardDescription>{video.views.toLocaleString()} views</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Contact Support */}
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <span>Still need help?</span>
              </CardTitle>
              <CardDescription>
                Our support team is available 24/7 to help you succeed
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-3">
              <Button variant="default" onClick={onClose}>
                Start Live Chat
              </Button>
              <Button variant="outline">
                Email Support
              </Button>
              <Button variant="outline">
                WhatsApp Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpCenterModal;