import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Building2, Users, TrendingUp, TrendingDown, AlertTriangle, LogOut, 
  DollarSign, BookOpen, Target, GraduationCap, Shield, 
  BarChart3, Clock, CheckCircle, XCircle, Brain, Zap,
  FileText, MessageSquare, Settings, Download, Eye,
  Award, Lightbulb, Database, Network, Calendar
} from "lucide-react";
import BulkAssessmentScheduler from "./BulkAssessmentScheduler";
import BroadcastAnnouncement from "./BroadcastAnnouncement";
import AtRiskStudents from "./AtRiskStudents";
import SystemHealthDashboard from "./SystemHealthDashboard";
import CurriculumManagement from "./CurriculumManagement";
import TeacherTrainingHub from "./TeacherTrainingHub";

interface EnterpriseAdminDashboardProps {
  user: { 
    type: 'admin'; 
    name: string; 
    institution: string;
    institutionType: 'secondary' | 'university';
  };
  onLogout: () => void;
}

const EnterpriseAdminDashboard = ({ user, onLogout }: EnterpriseAdminDashboardProps) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [currentView, setCurrentView] = useState('dashboard');
  
  const isUniversity = user.institutionType === 'university';

  // Handle navigation
  if (currentView === 'bulk-assessment') {
    return <BulkAssessmentScheduler onBack={() => setCurrentView('dashboard')} institutionType={isUniversity ? 'university' : 'secondary'} />;
  }
  
  if (currentView === 'broadcast') {
    return <BroadcastAnnouncement onBack={() => setCurrentView('dashboard')} institutionType={isUniversity ? 'university' : 'secondary'} />;
  }
  
  if (currentView === 'at-risk-students') {
    return <AtRiskStudents onBack={() => setCurrentView('dashboard')} institutionType={isUniversity ? 'university' : 'secondary'} />;
  }
  
  if (currentView === 'system-health') {
    return <SystemHealthDashboard onBack={() => setCurrentView('dashboard')} />;
  }
  
  if (currentView === 'curriculum-management') {
    return <CurriculumManagement onBack={() => setCurrentView('dashboard')} institutionType={isUniversity ? 'university' : 'secondary'} />;
  }
  
  if (currentView === 'teacher-training') {
    return <TeacherTrainingHub onBack={() => setCurrentView('dashboard')} institutionType={isUniversity ? 'university' : 'secondary'} />;
  }

  // ROI and Cost Savings Metrics
  const roiMetrics = [
    { 
      title: 'Annual Cost Savings', 
      value: isUniversity ? '₦24.8M' : '₦3.2M', 
      icon: DollarSign, 
      change: '+32%',
      description: isUniversity ? 'Reduced faculty workload & admin costs' : 'Reduced tutoring & remedial costs'
    },
    { 
      title: isUniversity ? 'Research Efficiency' : 'WAEC Pass Rate', 
      value: isUniversity ? '89%' : '92%', 
      icon: Target, 
      change: isUniversity ? '+15%' : '+18%',
      description: isUniversity ? 'Faster research paper analysis' : 'Above national average'
    },
    { 
      title: 'Student Engagement', 
      value: '94%', 
      icon: Users, 
      change: '+28%',
      description: 'Active daily platform usage'
    },
    { 
      title: 'Faculty Productivity', 
      value: '67%', 
      icon: TrendingUp, 
      change: '+41%',
      description: 'Time saved on grading & feedback'
    },
  ];

  // Department/Class Performance
  const performanceData = isUniversity ? [
    { dept: 'Computer Science', students: 245, engagement: 96, research: 89, gpa: 3.4, alerts: 2 },
    { dept: 'Engineering', students: 312, engagement: 91, research: 85, gpa: 3.2, alerts: 5 },
    { dept: 'Medicine', students: 187, engagement: 94, research: 92, gpa: 3.6, alerts: 1 },
    { dept: 'Business', students: 428, engagement: 88, research: 78, gpa: 3.1, alerts: 8 },
    { dept: 'Sciences', students: 356, engagement: 93, research: 87, gpa: 3.3, alerts: 3 },
  ] : [
    { dept: 'SS3 Science', students: 78, engagement: 92, waecPrep: 87, avgScore: 78, alerts: 3 },
    { dept: 'SS3 Arts', students: 65, engagement: 89, waecPrep: 84, avgScore: 75, alerts: 5 },
    { dept: 'SS2 Science', students: 82, engagement: 94, waecPrep: 82, avgScore: 80, alerts: 2 },
    { dept: 'SS2 Arts', students: 71, engagement: 91, waecPrep: 79, avgScore: 77, alerts: 4 },
    { dept: 'SS1 Mixed', students: 95, engagement: 96, waecPrep: 85, avgScore: 82, alerts: 1 },
  ];

  // AI Usage Analytics
  const aiAnalytics = {
    totalQueries: isUniversity ? 45678 : 12340,
    costPerQuery: 0.02,
    topFeatures: isUniversity ? [
      { name: 'Research Assistant', usage: 34, cost: '₦312,000' },
      { name: 'Thesis Review', usage: 28, cost: '₦189,000' },
      { name: 'Citation Generator', usage: 22, cost: '₦156,000' },
      { name: 'Data Analysis', usage: 16, cost: '₦89,000' },
    ] : [
      { name: 'Homework Helper', usage: 42, cost: '₦98,000' },
      { name: 'WAEC Practice', usage: 31, cost: '₦72,000' },
      { name: 'Subject Tutoring', usage: 18, cost: '₦45,000' },
      { name: 'Essay Writing', usage: 9, cost: '₦23,000' },
    ]
  };

  // Operational Efficiency Metrics
  const operationalMetrics = [
    { metric: 'Automated Grading', current: '87%', target: '95%', savings: '340hrs/week' },
    { metric: 'Student Support Resolution', current: '92%', target: '95%', savings: '24hrs response' },
    { metric: 'Content Creation Speed', current: '78%', target: '85%', savings: '15hrs/week' },
    { metric: 'Parent Communication', current: '94%', target: '98%', savings: '12hrs/week' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Header */}
      <header className="bg-card shadow-sm border-b border-border">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              {isUniversity ? 
                <GraduationCap className="h-8 w-8 text-primary" /> : 
                <Building2 className="h-8 w-8 text-primary" />
              }
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  A1Score Enterprise {isUniversity ? 'University' : 'School'} Portal
                </h1>
                <p className="text-sm text-muted-foreground">{user.institution} - {user.name}</p>
              </div>
            </div>
            <Badge variant="secondary" className="ml-4">
              {isUniversity ? 'University Edition' : 'Secondary School Edition'}
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" onClick={onLogout} size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* ROI Dashboard */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <BarChart3 className="h-5 w-5" />
              Return on Investment Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {roiMetrics.map((metric) => {
                const Icon = metric.icon;
                return (
                  <div key={metric.title} className="bg-card p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <Icon className="h-6 w-6 text-primary" />
                      <span className={`text-sm font-medium ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {metric.change}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg">{metric.value}</h3>
                    <p className="text-sm font-medium text-foreground">{metric.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="performance">Performance Analytics</TabsTrigger>
            <TabsTrigger value="operations">Operations</TabsTrigger>
            <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
            <TabsTrigger value="compliance">Compliance & Safety</TabsTrigger>
            <TabsTrigger value="integration">Integration Hub</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            {/* Strategic Alerts */}
            <Card className="border-orange-200 bg-orange-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-700">
                  <Lightbulb className="h-5 w-5" />
                  Strategic Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Brain className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div>
                    <p className="font-medium">AI-Powered Intervention Suggested</p>
                    <p className="text-sm text-muted-foreground">
                      {isUniversity ? 
                        'Computer Science department showing high research potential. Consider allocating additional AI research tools.' :
                        'SS3 Arts students need WAEC focused practice. Deploy targeted AI modules.'
                      }
                    </p>
                    <Button size="sm" className="mt-2" onClick={() => setCurrentView('at-risk-students')}>
                      View At-Risk Students
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Table */}
            <Card>
              <CardHeader>
                <CardTitle>{isUniversity ? 'Department Performance Matrix' : 'Class Performance Analytics'}</CardTitle>
                <div className="flex gap-4">
                  <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7d">Last 7 days</SelectItem>
                      <SelectItem value="30d">Last 30 days</SelectItem>
                      <SelectItem value="90d">Last 90 days</SelectItem>
                      <SelectItem value="1y">Last year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{isUniversity ? 'Department' : 'Class'}</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Engagement</TableHead>
                      <TableHead>{isUniversity ? 'Research Score' : 'WAEC Prep'}</TableHead>
                      <TableHead>{isUniversity ? 'Avg GPA' : 'Avg Score'}</TableHead>
                      <TableHead>Alerts</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {performanceData.map((item) => (
                      <TableRow key={item.dept}>
                        <TableCell className="font-medium">{item.dept}</TableCell>
                        <TableCell>{item.students}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={item.engagement} className="w-16" />
                            <span className="text-sm">{item.engagement}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={isUniversity ? item.research : item.waecPrep} className="w-16" />
                            <span className="text-sm">{isUniversity ? item.research : item.waecPrep}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {isUniversity ? item.gpa : `${item.avgScore}%`}
                        </TableCell>
                        <TableCell>
                          {item.alerts > 0 ? (
                            <Badge variant="destructive">{item.alerts}</Badge>
                          ) : (
                            <Badge variant="secondary">0</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="operations" className="space-y-6">
            {/* Operational Efficiency */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Operational Efficiency Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {operationalMetrics.map((metric) => (
                    <div key={metric.metric} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{metric.metric}</h4>
                          <span className="text-sm text-muted-foreground">Saves {metric.savings}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Current: {metric.current}</span>
                              <span>Target: {metric.target}</span>
                            </div>
                            <Progress value={parseInt(metric.current)} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Administrative Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex-col" onClick={() => setCurrentView('bulk-assessment')}>
                    <Calendar className="h-6 w-6 mb-2" />
                    Schedule Bulk Assessments
                  </Button>
                  <Button variant="outline" className="h-20 flex-col" onClick={() => setCurrentView('broadcast')}>
                    <MessageSquare className="h-6 w-6 mb-2" />
                    Broadcast Announcement
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Award className="h-6 w-6 mb-2" />
                    Generate Performance Reports
                  </Button>
                  <Button variant="outline" className="h-20 flex-col" onClick={() => setCurrentView('curriculum-management')}>
                    <BookOpen className="h-6 w-6 mb-2" />
                    Curriculum Management
                  </Button>
                  <Button variant="outline" className="h-20 flex-col" onClick={() => setCurrentView('teacher-training')}>
                    <GraduationCap className="h-6 w-6 mb-2" />
                    Teacher Training Hub
                  </Button>
                  <Button variant="outline" className="h-20 flex-col" onClick={() => setCurrentView('system-health')}>
                    <Network className="h-6 w-6 mb-2" />
                    System Health Check
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-insights" className="space-y-6">
            {/* AI Usage & Cost Analysis */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI Usage Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Total AI Queries This Month</span>
                      <span className="font-bold text-lg">{aiAnalytics.totalQueries.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Average Cost Per Query</span>
                      <span className="font-medium">₦{aiAnalytics.costPerQuery}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Monthly AI Investment</span>
                      <span className="font-bold text-primary">
                        ₦{(aiAnalytics.totalQueries * aiAnalytics.costPerQuery).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top AI Features by Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {aiAnalytics.topFeatures.map((feature) => (
                      <div key={feature.name} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{feature.name}</p>
                          <div className="flex items-center gap-2">
                            <Progress value={feature.usage} className="w-24" />
                            <span className="text-sm text-muted-foreground">{feature.usage}%</span>
                          </div>
                        </div>
                        <span className="text-sm font-medium">{feature.cost}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Predictive Analytics */}
            <Card className="border-blue-200 bg-blue-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <Brain className="h-5 w-5" />
                  AI-Powered Predictive Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Student Success Predictions</h4>
                      <p className="text-sm text-muted-foreground">
                        {isUniversity ? 
                          '23 students at risk of failing final exams. Early intervention recommended.' :
                          '12 students predicted to struggle with WAEC. Targeted support suggested.'
                        }
                      </p>
                      <Button size="sm" onClick={() => setCurrentView('at-risk-students')}>View At-Risk Students</Button>
                    </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Resource Optimization</h4>
                    <p className="text-sm text-muted-foreground">
                      AI suggests reallocating 15% of math tutoring hours to physics for optimal outcomes.
                    </p>
                    <Button size="sm" variant="outline">Apply Suggestion</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            {/* Safety & Compliance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Academic Integrity & Safety Monitor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="font-semibold">97.8%</p>
                    <p className="text-sm text-muted-foreground">Compliance Score</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <p className="font-semibold">3</p>
                    <p className="text-sm text-muted-foreground">Active Alerts</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <Eye className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="font-semibold">1,247</p>
                    <p className="text-sm text-muted-foreground">Monitored Students</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Recent Compliance Events</h4>
                  {[
                    { type: 'Academic Integrity', message: 'Suspicious similarity detected in CS assignment submissions', severity: 'medium', time: '2h ago' },
                    { type: 'Data Privacy', message: 'All student data exports completed with proper authorization', severity: 'low', time: '4h ago' },
                    { type: 'Content Safety', message: 'AI content filter blocked inappropriate material attempt', severity: 'high', time: '6h ago' },
                  ].map((event, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <Badge variant={event.severity === 'high' ? 'destructive' : event.severity === 'medium' ? 'default' : 'secondary'} className="mb-1">
                          {event.type}
                        </Badge>
                        <p className="text-sm">{event.message}</p>
                        <p className="text-xs text-muted-foreground">{event.time}</p>
                      </div>
                      <Button size="sm" variant="outline">Investigate</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integration" className="space-y-6">
            {/* System Integration Hub */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="h-5 w-5" />
                  Enterprise Integration Hub
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: isUniversity ? 'Student Information System' : 'School Management System', status: 'connected', usage: 'Daily sync' },
                    { name: 'Learning Management System', status: 'connected', usage: 'Real-time' },
                    { name: 'Parent Portal', status: 'connected', usage: 'Live updates' },
                    { name: 'Finance System', status: 'connected', usage: 'Monthly reports' },
                    { name: 'Library System', status: 'pending', usage: 'Not configured' },
                    { name: 'Attendance System', status: 'connected', usage: 'Daily sync' },
                  ].map((integration) => (
                    <Card key={integration.name} className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-3 h-3 rounded-full ${integration.status === 'connected' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                        <h4 className="font-medium text-sm">{integration.name}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground">{integration.usage}</p>
                      <Button size="sm" variant="outline" className="w-full mt-2">
                        {integration.status === 'connected' ? 'Configure' : 'Connect'}
                      </Button>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* API Usage & Performance */}
            <Card>
              <CardHeader>
                <CardTitle>API Performance & Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">99.9%</p>
                    <p className="text-sm text-muted-foreground">Uptime</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">245ms</p>
                    <p className="text-sm text-muted-foreground">Avg Response Time</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">45,678</p>
                    <p className="text-sm text-muted-foreground">API Calls Today</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">12TB</p>
                    <p className="text-sm text-muted-foreground">Data Processed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnterpriseAdminDashboard;