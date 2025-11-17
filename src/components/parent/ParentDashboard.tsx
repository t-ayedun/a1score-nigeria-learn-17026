
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Users, BookOpen, Clock, TrendingUp, LogOut, Target, AlertCircle, CheckCircle, CreditCard, MessageSquare, Star, Shield, Calendar, DollarSign, Award, Bell, Home } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";

interface ParentDashboardProps {
  user: { type: 'parent'; name: string };
  onLogout: () => void;
}

const ParentDashboard = ({ user, onLogout }: ParentDashboardProps) => {
  const [selectedChild, setSelectedChild] = useState('david');
  const [timeFrame, setTimeFrame] = useState('week');
  const [activeTab, setActiveTab] = useState('overview');

  const handleBackToOverview = () => {
    setActiveTab('overview');
  };

  const children = [
    { id: 'david', name: 'Davi Adebayo', class: 'SS2', age: 16 },
    { id: 'sarah', name: 'Sarah Adebayo', class: 'SS1', age: 15 }
  ];

  const weeklyReport = {
    david: {
      studyTime: '12.5 hours',
      improvement: '+14%',
      topSubject: 'Chemistry',
      concernSubject: 'English',
      quizzesCompleted: 8,
      avgScore: 78,
      streak: 5,
      badges: ['Study Streak', 'Chemistry Star'],
      recentActivity: [
        { subject: 'Chemistry', activity: 'Completed Organic Chemistry quiz', score: '92%', time: '2 hours ago' },
        { subject: 'Mathematics', activity: 'Solved 15 algebra problems', score: '85%', time: '1 day ago' },
        { subject: 'Physics', activity: 'Studied Motion and Forces', score: '76%', time: '2 days ago' },
      ],
      goals: [
        { subject: 'English', target: 'Complete 3 essay practices', progress: 67 },
        { subject: 'Mathematics', target: 'Solve 50 problems this week', progress: 80 },
        { subject: 'Physics', target: 'Review all SS2 topics', progress: 45 }
      ]
    }
  };

  const subscriptionInfo = {
    plan: 'Family Plan',
    status: 'Active',
    nextBilling: '2024-12-15',
    amount: '₦2,500',
    children: 2,
    remaining: 'Unlimited questions',
    usage: {
      questions: 1247,
      tutorSessions: 23,
      pdfAnalyses: 8
    }
  };

  const teacherMessages = [
    {
      teacher: 'Mrs. Funmi Adesanya',
      subject: 'Chemistry',
      message: 'David showed excellent understanding in today\'s organic chemistry lesson. Keep up the great work!',
      time: '2 hours ago',
      priority: 'normal'
    },
    {
      teacher: 'Mr. James Okafor',
      subject: 'English',
      message: 'I\'d like to schedule a meeting to discuss David\'s essay writing progress.',
      time: '1 day ago',
      priority: 'high'
    }
  ];

  const achievements = [
    { title: 'Math Champion', description: 'Scored 95%+ on 5 consecutive math quizzes', icon: Award, color: 'text-yellow-600' },
    { title: 'Study Streak', description: '7-day consistent study streak', icon: Target, color: 'text-green-600' },
    { title: 'Chemistry Star', description: 'Top performer in Chemistry this week', icon: Star, color: 'text-blue-600' }
  ];

  const paymentHistory = [
    { date: '2024-11-15', amount: '₦2,500', plan: 'Family Plan', status: 'Paid' },
    { date: '2024-10-15', amount: '₦2,500', plan: 'Family Plan', status: 'Paid' },
    { date: '2024-09-15', amount: '₦2,500', plan: 'Family Plan', status: 'Paid' }
  ];

  const currentChild = weeklyReport[selectedChild] || weeklyReport.david;

  const usageLimits = [
    { day: 'Monday', limit: 2, used: 1.5, status: 'good' },
    { day: 'Tuesday', limit: 2, used: 2.2, status: 'exceeded' },
    { day: 'Wednesday', limit: 2, used: 1.8, status: 'good' },
    { day: 'Thursday', limit: 2, used: 1.3, status: 'good' },
    { day: 'Friday', limit: 2, used: 2.5, status: 'exceeded' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Users className="h-8 w-8 text-green-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">A1Score Parent Portal</h1>
              <p className="text-sm text-gray-600">Welcome back, {user.name}!</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {activeTab !== 'overview' && (
              <Button variant="ghost" onClick={handleBackToOverview} size="sm">
                <Home className="h-4 w-4 mr-2" />
                Overview
              </Button>
            )}
            <Button variant="outline" onClick={onLogout} size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-6xl mx-auto space-y-6">
        {/* Child Selector */}
        <div className="flex gap-4 items-center">
          <Select value={selectedChild} onValueChange={setSelectedChild}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select child" />
            </SelectTrigger>
            <SelectContent>
              {children.map((child) => (
                <SelectItem key={child.id} value={child.id}>
                  {child.name} ({child.class})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={timeFrame} onValueChange={setTimeFrame}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Time frame" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="term">This Term</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Weekly Summary Card */}
        <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
          <CardHeader>
            <CardTitle className="text-2xl">
              {children.find(c => c.id === selectedChild)?.name} - Weekly Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{currentChild.studyTime}</div>
                <div className="text-sm opacity-90">Study Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-200">{currentChild.improvement}</div>
                <div className="text-sm opacity-90">Improvement</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{currentChild.avgScore}%</div>
                <div className="text-sm opacity-90">Avg Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{currentChild.streak}</div>
                <div className="text-sm opacity-90">Day Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="safety">Safety</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <PageHeader
              title="Child Overview"
              description={`Monitoring ${children.find(c => c.id === selectedChild)?.name}'s learning progress`}
              breadcrumbs={[
                { label: "Dashboard", onClick: handleBackToOverview },
                { label: "Overview" }
              ]}
            />
            <div className="grid md:grid-cols-2 gap-6">
              {/* Subject Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    Subject Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <div className="font-medium text-green-800">Best Subject: {currentChild.topSubject}</div>
                      <div className="text-sm text-green-600">Strong performance, keep it up!</div>
                    </div>
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div>
                      <div className="font-medium text-orange-800">Need Focus: {currentChild.concernSubject}</div>
                      <div className="text-sm text-orange-600">Consider extra practice time</div>
                    </div>
                    <AlertCircle className="h-6 w-6 text-orange-600" />
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Mathematics</span>
                        <span className="text-sm">85%</span>
                      </div>
                      <Progress value={85} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Chemistry</span>
                        <span className="text-sm">92%</span>
                      </div>
                      <Progress value={92} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Physics</span>
                        <span className="text-sm">76%</span>
                      </div>
                      <Progress value={76} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">English</span>
                        <span className="text-sm">68%</span>
                      </div>
                      <Progress value={68} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-yellow-600" />
                    Recent Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {currentChild.badges.map((badge, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                        <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                          <Target className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="font-medium">{badge}</div>
                          <div className="text-sm text-gray-600">Earned this week</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <PageHeader
              title="Recent Activity"
              description="Track your child's learning activities and performance"
              breadcrumbs={[
                { label: "Dashboard", onClick: handleBackToOverview },
                { label: "Activity" }
              ]}
            />
            <Card>
              <CardHeader>
                <CardTitle>Recent Learning Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentChild.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-medium">{activity.activity}</div>
                          <div className="text-sm text-gray-600">{activity.subject}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={activity.score >= '85%' ? 'default' : 'secondary'}>
                          {activity.score}
                        </Badge>
                        <div className="text-sm text-gray-500 mt-1">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="teachers" className="space-y-6">
            <PageHeader
              title="Teacher Communications"
              description="View messages and schedule meetings with teachers"
              breadcrumbs={[
                { label: "Dashboard", onClick: handleBackToOverview },
                { label: "Teachers" }
              ]}
            />
            {/* Teacher Communications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  Messages from Teachers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teacherMessages.map((msg, index) => (
                    <div key={index} className={`p-4 rounded-lg border-l-4 ${msg.priority === 'high' ? 'border-red-500 bg-red-50' : 'border-blue-500 bg-blue-50'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{msg.teacher}</h4>
                          <span className="text-sm text-gray-600">{msg.subject}</span>
                        </div>
                        <div className="text-right">
                          <Badge variant={msg.priority === 'high' ? 'destructive' : 'secondary'}>
                            {msg.priority === 'high' ? 'High Priority' : 'Normal'}
                          </Badge>
                          <div className="text-sm text-gray-500 mt-1">{msg.time}</div>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">{msg.message}</p>
                      <Button size="sm" variant="outline">Reply to Teacher</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Schedule Meeting */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-600" />
                  Schedule Parent-Teacher Meeting
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Teacher</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose teacher" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chemistry">Mrs. Funmi Adesanya (Chemistry)</SelectItem>
                        <SelectItem value="english">Mr. James Okafor (English)</SelectItem>
                        <SelectItem value="math">Mr. Tunde Balogun (Mathematics)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Preferred Date</label>
                    <Input type="date" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Message (Optional)</label>
                    <Textarea placeholder="What would you like to discuss?" />
                  </div>
                  <Button className="md:col-span-2">Request Meeting</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscription" className="space-y-6">
            <PageHeader
              title="Subscription Management"
              description="Manage your subscription, billing, and payment history"
              breadcrumbs={[
                { label: "Dashboard", onClick: handleBackToOverview },
                { label: "Subscription" }
              ]}
            />
            {/* Current Subscription */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-purple-600" />
                  Current Subscription
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Plan:</span>
                      <Badge variant="default">{subscriptionInfo.plan}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <Badge variant="default" className="bg-green-600">{subscriptionInfo.status}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly Cost:</span>
                      <span className="font-semibold">{subscriptionInfo.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Next Billing:</span>
                      <span>{subscriptionInfo.nextBilling}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Children Covered:</span>
                      <span>{subscriptionInfo.children}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold">This Month's Usage</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Questions Asked:</span>
                        <span>{subscriptionInfo.usage.questions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>AI Tutor Sessions:</span>
                        <span>{subscriptionInfo.usage.tutorSessions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>PDF Analyses:</span>
                        <span>{subscriptionInfo.usage.pdfAnalyses}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex gap-3">
                  <Button>Manage Subscription</Button>
                  <Button variant="outline">Upgrade Plan</Button>
                  <Button variant="outline">Download Invoice</Button>
                </div>
              </CardContent>
            </Card>

            {/* Payment History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  Payment History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {paymentHistory.map((payment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{payment.date}</div>
                        <div className="text-sm text-gray-600">{payment.plan}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{payment.amount}</div>
                        <Badge variant="default" className="bg-green-600">{payment.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="safety" className="space-y-6">
            <PageHeader
              title="Safety & Screen Time"
              description="Manage safety controls and monitor screen time usage"
              breadcrumbs={[
                { label: "Dashboard", onClick: handleBackToOverview },
                { label: "Safety" }
              ]}
            />
            {/* Safety Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  Safety & Screen Time Controls
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Daily Limits */}
                  <div>
                    <h4 className="font-semibold mb-4">Daily Usage Limits</h4>
                    <div className="space-y-3">
                      {usageLimits.map((day) => (
                        <div key={day.day} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium">{day.day}</span>
                          <div className="flex items-center gap-4">
                            <span className="text-sm">{day.used}h / {day.limit}h</span>
                            <Badge variant={day.status === 'good' ? 'default' : 'destructive'}>
                              {day.status === 'good' ? 'Within Limit' : 'Exceeded'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Content Filtering */}
                  <div>
                    <h4 className="font-semibold mb-4">Content Safety Settings</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Safe Search</span>
                          <Badge variant="default" className="bg-green-600">Enabled</Badge>
                        </div>
                        <p className="text-sm text-gray-600">All AI responses are filtered for age-appropriate content</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Activity Monitoring</span>
                          <Badge variant="default" className="bg-green-600">Active</Badge>
                        </div>
                        <p className="text-sm text-gray-600">Real-time monitoring of all learning activities</p>
                      </div>
                    </div>
                  </div>

                  {/* Notification Settings */}
                  <div>
                    <h4 className="font-semibold mb-4">Notification Preferences</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span>Daily Progress Reports</span>
                        <Badge variant="default">Enabled</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span>Teacher Messages</span>
                        <Badge variant="default">Enabled</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span>Achievement Alerts</span>
                        <Badge variant="default">Enabled</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <PageHeader
              title="Comprehensive Reports"
              description="Detailed analytics and AI-powered learning recommendations"
              breadcrumbs={[
                { label: "Dashboard", onClick: handleBackToOverview },
                { label: "Reports" }
              ]}
            />
            {/* Comprehensive Reports */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Comprehensive Learning Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4">Monthly Performance Trends</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Total Study Hours</span>
                        <span className="text-green-600 font-semibold">↑ 23% (48.5h)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Quiz Accuracy</span>
                        <span className="text-green-600 font-semibold">↑ 12% (78%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>AI Tutor Sessions</span>
                        <span className="text-blue-600 font-semibold">→ 23 sessions</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Study Consistency</span>
                        <span className="text-green-600 font-semibold">↑ 8% (5.2 days/week)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Homework Completion</span>
                        <span className="text-green-600 font-semibold">↑ 15% (92%)</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Subject-Specific Insights</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="font-medium text-green-800">Chemistry - Excellent</div>
                        <div className="text-sm text-green-600">Consistent A-grade performance, understanding complex concepts</div>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="font-medium text-blue-800">Mathematics - Good</div>
                        <div className="text-sm text-blue-600">Strong in algebra, needs practice in geometry</div>
                      </div>
                      <div className="p-3 bg-orange-50 rounded-lg">
                        <div className="font-medium text-orange-800">English - Needs Attention</div>
                        <div className="text-sm text-orange-600">Essay writing needs improvement, consider tutor support</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements & Milestones */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-600" />
                  Recent Achievements & Milestones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {achievements.map((achievement, index) => {
                    const Icon = achievement.icon;
                    return (
                      <div key={index} className="p-4 border rounded-lg text-center">
                        <Icon className={`h-8 w-8 mx-auto mb-2 ${achievement.color}`} />
                        <h4 className="font-semibold mb-1">{achievement.title}</h4>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-purple-600" />
                  AI-Powered Learning Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4">Immediate Actions</h3>
                    <div className="space-y-3">
                      <div className="p-3 border-l-4 border-red-500 bg-red-50">
                        <div className="font-medium text-red-800">Schedule English Tutor</div>
                        <div className="text-sm text-red-600">Essay writing skills need professional guidance</div>
                      </div>
                      <div className="p-3 border-l-4 border-orange-500 bg-orange-50">
                        <div className="font-medium text-orange-800">Increase Physics Practice</div>
                        <div className="text-sm text-orange-600">Add 30 minutes daily for mechanics topics</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Growth Opportunities</h3>
                    <div className="space-y-3">
                      <div className="p-3 border-l-4 border-green-500 bg-green-50">
                        <div className="font-medium text-green-800">Advanced Chemistry Track</div>
                        <div className="text-sm text-green-600">Ready for SS3 level chemistry concepts</div>
                      </div>
                      <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
                        <div className="font-medium text-blue-800">Math Competition Prep</div>
                        <div className="text-sm text-blue-600">Strong foundation for regional competitions</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Premium Feature: Personal Learning Coach</h4>
                  <p className="text-sm text-purple-600 mb-3">
                    Upgrade to Teacher Plus plan to get a dedicated AI learning coach that provides daily personalized study plans and real-time progress adjustments.
                  </p>
                  <Button variant="outline" className="border-purple-500 text-purple-700">Learn More</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ParentDashboard;
