
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, TrendingUp, LogOut, DollarSign, CheckCircle, Clock } from "lucide-react";
import ClassAnalytics from "./ClassAnalytics";
import ContentCreation from "./ContentCreation";
import AnswerValidation from "./AnswerValidation";
import StudentAIMonitoring from "./StudentAIMonitoring";
import MonetizationDemo from "../monetization/MonetizationDemo";
import TeacherSidebar from "./TeacherSidebar";
import LessonPlanWizard from "./LessonPlanWizard";
import SyllabusBuilder from "./SyllabusBuilder";
import AssessmentGenerator from "./AssessmentGenerator";
import ParentCommunication from "./ParentCommunication";

interface TeacherDashboardProps {
  user: { type: 'student' | 'teacher'; name: string };
  onLogout: () => void;
}

const TeacherDashboard = ({ user, onLogout }: TeacherDashboardProps) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleBackToDashboard = () => {
    setActiveTab('dashboard');
  };

  const teacherStats = [
    { title: 'Active Students', value: '127', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Lessons Created', value: '45', icon: BookOpen, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Monthly Earnings', value: '₦25,400', icon: DollarSign, color: 'text-purple-600', bg: 'bg-purple-50' },
    { title: 'Validation Tasks', value: '18', icon: CheckCircle, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  const recentActivity = [
    { action: 'New student enrolled', student: 'Adebayo Olamide', time: '2 hours ago', type: 'enrollment' },
    { action: 'Quiz completed', student: 'Fatima Hassan', time: '4 hours ago', type: 'quiz', score: '85%' },
    { action: 'Lesson accessed', student: 'Chinedu Okoro', time: '6 hours ago', type: 'lesson', lesson: 'Quadratic Equations' },
    { action: 'Answer flagged for review', student: 'Aisha Musa', time: '1 day ago', type: 'validation' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b fixed top-0 left-0 right-0 z-30">
        <div className="px-2 sm:px-4 py-2 sm:py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3 ml-12 sm:ml-16 min-w-0 flex-1">
            <img 
              src="/lovable-uploads/cd2e80a3-ae02-4d77-b4b6-84f985045e4e.png" 
              alt="A1Score Logo" 
              className="h-6 sm:h-8 w-auto object-contain flex-shrink-0"
            />
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">A1Score Teacher</h1>
              <p className="text-xs sm:text-sm text-gray-600 truncate">Welcome back, {user.name}!</p>
            </div>
          </div>
          <Button variant="outline" onClick={onLogout} size="sm" className="text-xs sm:text-sm px-2 sm:px-3">
            <LogOut className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Logout</span>
            <span className="sm:hidden">Exit</span>
          </Button>
        </div>
      </header>

      {/* Sidebar */}
      <TeacherSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <div className="pt-16 sm:pt-20 px-3 sm:px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="dashboard" className="space-y-4 sm:space-y-6">
            {/* Welcome Card */}
            <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-xl sm:text-2xl">Welcome back, {user.name}!</CardTitle>
                <p className="opacity-90 text-sm sm:text-base leading-relaxed">Your students are making great progress. Keep up the excellent work!</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between sm:justify-start sm:space-x-8 gap-4">
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold">95%</div>
                    <div className="text-xs sm:text-sm opacity-90">Student Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold">4.8⭐</div>
                    <div className="text-xs sm:text-sm opacity-90">Average Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold">12</div>
                    <div className="text-xs sm:text-sm opacity-90">Days Active</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {teacherStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <Card key={stat.title}>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                          <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{stat.title}</p>
                          <p className="text-lg sm:text-2xl font-bold truncate">{stat.value}</p>
                        </div>
                        <div className={`p-2 sm:p-3 ${stat.bg} rounded-full flex-shrink-0`}>
                          <Icon className={`h-4 w-4 sm:h-6 sm:w-6 ${stat.color}`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg gap-3">
                      <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                        <div className="p-1.5 sm:p-2 bg-white rounded-full flex-shrink-0">
                          {activity.type === 'enrollment' && <Users className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />}
                          {activity.type === 'quiz' && <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />}
                          {activity.type === 'lesson' && <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />}
                          {activity.type === 'validation' && <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-sm sm:text-base truncate">{activity.action}</div>
                          <div className="text-xs sm:text-sm text-gray-600 truncate">
                            {activity.student}
                            {activity.score && ` • Score: ${activity.score}`}
                            {activity.lesson && ` • ${activity.lesson}`}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 flex-shrink-0">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4 sm:p-6 text-center">
                  <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mx-auto mb-2 sm:mb-3" />
                  <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Create New Lesson</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">Generate lesson plans with AI assistance</p>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4 sm:p-6 text-center">
                  <Users className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mx-auto mb-2 sm:mb-3" />
                  <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">View Class Performance</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">Analyze student progress and trends</p>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4 sm:p-6 text-center">
                  <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 mx-auto mb-2 sm:mb-3" />
                  <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Validate AI Answers</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">Review flagged responses and earn</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <ClassAnalytics onBackToDashboard={handleBackToDashboard} />
          </TabsContent>

          <TabsContent value="lesson-wizard">
            <LessonPlanWizard onBackToDashboard={handleBackToDashboard} />
          </TabsContent>

          <TabsContent value="syllabus-builder">
            <SyllabusBuilder onBackToDashboard={handleBackToDashboard} />
          </TabsContent>

          <TabsContent value="assessment-gen">
            <AssessmentGenerator onBackToDashboard={handleBackToDashboard} />
          </TabsContent>

          <TabsContent value="content">
            <ContentCreation onBackToDashboard={handleBackToDashboard} />
          </TabsContent>

          <TabsContent value="parent-comm">
            <ParentCommunication onBackToDashboard={handleBackToDashboard} />
          </TabsContent>

          <TabsContent value="validation">
            <AnswerValidation onBackToDashboard={handleBackToDashboard} />
          </TabsContent>

          <TabsContent value="ai-monitoring">
            <StudentAIMonitoring onBackToDashboard={handleBackToDashboard} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TeacherDashboard;
