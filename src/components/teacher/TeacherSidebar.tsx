
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Menu,
  X,
  TrendingUp,
  Users,
  BookOpen,
  CheckCircle,
  DollarSign,
  FileText,
  FileQuestion,
  MessageSquare,
  Sparkles,
  Presentation,
  Shield,
  Home
} from "lucide-react";

interface TeacherSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TeacherSidebar = ({ activeTab, onTabChange }: TeacherSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Sidebar Toggle Button */}
      <Button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all duration-300 hover:scale-110"
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
        fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-4 h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-8 pt-16">
            <img
              src="/lovable-uploads/cd2e80a3-ae02-4d77-b4b6-84f985045e4e.png"
              alt="A1Score Logo"
              className="h-8 w-auto object-contain"
            />
            <div>
              <h2 className="text-lg font-bold text-gray-900">Teacher Portal</h2>
            </div>
          </div>

          {/* Quick Home Button */}
          {activeTab !== 'dashboard' && (
            <Button
              variant="outline"
              className="w-full mb-4 justify-start"
              onClick={() => {
                onTabChange('dashboard');
                setIsOpen(false);
              }}
            >
              <Home className="h-4 w-4 mr-2" />
              Back to Dashboard Home
            </Button>
          )}

          {/* Navigation */}
          <nav className="space-y-2">
            <Tabs value={activeTab} onValueChange={onTabChange} orientation="vertical" className="w-full">
              <TabsList className="grid w-full grid-rows-8 h-auto bg-transparent">
                <TabsTrigger 
                  value="dashboard" 
                  className="justify-start w-full data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
                  onClick={() => setIsOpen(false)}
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Dashboard
                </TabsTrigger>
                <TabsTrigger 
                  value="analytics" 
                  className="justify-start w-full data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
                  onClick={() => setIsOpen(false)}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Class Analytics
                </TabsTrigger>
                <TabsTrigger 
                  value="lesson-wizard" 
                  className="justify-start w-full data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
                  onClick={() => setIsOpen(false)}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Lesson Wizard
                </TabsTrigger>
                <TabsTrigger 
                  value="syllabus-builder" 
                  className="justify-start w-full data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
                  onClick={() => setIsOpen(false)}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Syllabus Builder
                </TabsTrigger>
                <TabsTrigger 
                  value="assessment-gen" 
                  className="justify-start w-full data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
                  onClick={() => setIsOpen(false)}
                >
                  <FileQuestion className="h-4 w-4 mr-2" />
                  Assessment Gen
                </TabsTrigger>
                <TabsTrigger 
                  value="content" 
                  className="justify-start w-full data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
                  onClick={() => setIsOpen(false)}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Content Studio
                </TabsTrigger>
                <TabsTrigger 
                  value="parent-comm" 
                  className="justify-start w-full data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
                  onClick={() => setIsOpen(false)}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Parent Comm
                </TabsTrigger>
                <TabsTrigger 
                  value="validation" 
                  className="justify-start w-full data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
                  onClick={() => setIsOpen(false)}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Validate Answers
                </TabsTrigger>
                <TabsTrigger 
                  value="ai-monitoring" 
                  className="justify-start w-full data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
                  onClick={() => setIsOpen(false)}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  AI Monitoring
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </nav>
        </div>
      </div>
    </>
  );
};

export default TeacherSidebar;
