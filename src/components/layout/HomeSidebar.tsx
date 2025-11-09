
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, 
  X, 
  Home, 
  BookOpen, 
  Users, 
  Brain, 
  TrendingUp, 
  Building2, 
  Heart, 
  DollarSign, 
  Trophy, 
  Shield,
  Globe,
  MessageCircle
} from "lucide-react";

interface HomeSidebarProps {
  onNavigate: (section: string) => void;
  activeSection: string;
}

const HomeSidebar = ({ onNavigate, activeSection }: HomeSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { id: 'hero', label: 'Home', icon: Home, description: 'Welcome & Overview' },
    { id: 'features', label: 'Features', icon: Brain, description: 'AI-Powered Tools' },
    { id: 'subjects', label: 'Subjects', icon: BookOpen, description: 'Math, Physics, Chemistry' },
    { id: 'dashboards', label: 'Dashboards', icon: TrendingUp, description: 'Student & Teacher Portals' },
    { id: 'pricing', label: 'Pricing', icon: DollarSign, description: 'Plans & Monetization' },
    { id: 'gamification', label: 'Achievements', icon: Trophy, description: 'Badges & Rewards' },
    { id: 'ethics', label: 'AI Ethics', icon: Shield, description: 'Academic Integrity' },
    { id: 'multilingual', label: 'Languages', icon: Globe, description: 'Nigerian Languages' },
    { id: 'institutional', label: 'Institutions', icon: Building2, description: 'School Management' },
    { id: 'parental', label: 'Parents', icon: Heart, description: 'Child Monitoring' },
    { id: 'community', label: 'Community', icon: Users, description: 'Connect & Learn' },
    { id: 'support', label: 'Support', icon: MessageCircle, description: '24/7 AI Assistance' },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Sidebar Toggle Button - positioned below header */}
      <Button
        onClick={toggleSidebar}
        className="fixed top-20 left-4 z-50 bg-green-600 hover:bg-green-700 text-white shadow-lg transition-all duration-300 hover:scale-110"
        size="icon"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 h-full overflow-y-auto">
          {/* Header - with top padding to account for main header */}
          <div className="flex items-center space-x-3 mb-8 pt-20">
            <img 
              src="/lovable-uploads/cd2e80a3-ae02-4d77-b4b6-84f985045e4e.png" 
              alt="A1Score Logo" 
              className="h-10 w-auto object-contain"
            />
            <div>
              <h2 className="text-xl font-bold text-gray-900">A1Score</h2>
              <p className="text-sm text-gray-600">Explore Platform</p>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="space-y-3">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <Card 
                  key={item.id}
                  className={`
                    cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-105 border-2
                    ${isActive ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'}
                  `}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsOpen(false);
                  }}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center space-x-3">
                      <div className={`
                        p-2 rounded-lg transition-colors duration-200
                        ${isActive ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'}
                      `}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-sm font-semibold text-gray-900">
                          {item.label}
                        </CardTitle>
                        <p className="text-xs text-gray-500 mt-1">
                          {item.description}
                        </p>
                      </div>
                      {isActive && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Active
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center text-sm text-gray-500">
              <p className="mb-2">🚀 Enhanced Navigation</p>
              <p>Built for Nigerian Education</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeSidebar;
