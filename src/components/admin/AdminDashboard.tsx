
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Users, TrendingDown, AlertTriangle, LogOut, DollarSign, BookOpen, Target, Settings, Home } from "lucide-react";
import EnterpriseAdminDashboard from "./EnterpriseAdminDashboard";
import PageHeader from "@/components/shared/PageHeader";

interface AdminDashboardProps {
  user: { type: 'admin'; name: string; institution: string };
  onLogout: () => void;
}

const AdminDashboard = ({ user, onLogout }: AdminDashboardProps) => {
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [showEnterprise, setShowEnterprise] = useState(false);
  const [activeTab, setActiveTab] = useState('performance');

  const handleBackToPerformance = () => {
    setActiveTab('performance');
  };

  // Check if this should show enterprise dashboard
  const institution = user.institution || '';
  const isEnterpriseInstitution = institution.toLowerCase().includes('university') || 
                                 institution.toLowerCase().includes('college') ||
                                 institution.toLowerCase().includes('institute');

  if (showEnterprise || isEnterpriseInstitution) {
    return (
      <EnterpriseAdminDashboard 
        user={{
          ...user,
          institutionType: institution.toLowerCase().includes('university') ? 'university' : 'secondary'
        }}
        onLogout={onLogout}
      />
    );
  }

  const institutionMetrics = [
    { title: 'Total Students', value: '1,247', icon: Users, change: '+12%', color: 'text-blue-600' },
    { title: 'Active Teachers', value: '45', icon: BookOpen, change: '+3%', color: 'text-green-600' },
    { title: 'Monthly Revenue', value: '₦487,500', icon: DollarSign, change: '+18%', color: 'text-purple-600' },
    { title: 'WAEC Pass Rate', value: '78%', icon: Target, change: '-5%', color: 'text-red-600' },
  ];

  const classPerformance = [
    { class: 'SS3A', students: 35, avgScore: 72, waecReadiness: 68, alerts: 3 },
    { class: 'SS3B', students: 38, avgScore: 69, waecReadiness: 65, alerts: 5 },
    { class: 'SS2A', students: 42, avgScore: 75, waecReadiness: 71, alerts: 2 },
    { class: 'SS2B', students: 40, avgScore: 71, waecReadiness: 67, alerts: 4 },
    { class: 'SS1A', students: 45, avgScore: 78, waecReadiness: 74, alerts: 1 },
  ];

  const flaggedContent = [
    { student: 'Adebayo Olamide', issue: 'Potential cheating detected', subject: 'Mathematics', time: '2 hours ago', severity: 'high' },
    { student: 'Fatima Hassan', issue: 'Essay writing assistance overuse', subject: 'English', time: '4 hours ago', severity: 'medium' },
    { student: 'Chinedu Okoro', issue: 'Unusual quiz completion pattern', subject: 'Physics', time: '1 day ago', severity: 'low' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Building2 className="h-8 w-8 text-purple-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">A1Score Admin</h1>
              <p className="text-sm text-gray-600">{user.institution} - {user.name}</p>
            </div>
          </div>
          <div className="flex gap-2">
            {activeTab !== 'performance' && (
              <Button variant="ghost" onClick={handleBackToPerformance} size="sm">
                <Home className="h-4 w-4 mr-2" />
                Performance
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => setShowEnterprise(!showEnterprise)}
              size="sm"
            >
              <Settings className="h-4 w-4 mr-2" />
              {showEnterprise ? 'Basic View' : 'Enterprise View'}
            </Button>
            <Button variant="outline" onClick={onLogout} size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Metrics Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {institutionMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <Card key={metric.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <p className={`text-sm ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {metric.change} from last month
                      </p>
                    </div>
                    <Icon className={`h-8 w-8 ${metric.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="performance" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">Class Performance</TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">Content Monitoring</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">Advanced Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <PageHeader
              title="Class Performance"
              description="Monitor student performance and WAEC readiness"
              breadcrumbs={[
                { label: "Dashboard" }
              ]}
            />
            {/* Performance Alert */}
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <TrendingDown className="h-5 w-5" />
                  Performance Alert: WAEC Readiness Declining
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-600 mb-4">
                  SS3 classes showing 5% decline in WAEC preparedness. Immediate intervention recommended.
                </p>
                <Button size="sm" className="bg-red-600 hover:bg-red-700">
                  Deploy AI Practice Modules
                </Button>
              </CardContent>
            </Card>

            {/* Filters */}
            <div className="flex gap-4">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="ss3">SS3 Classes</SelectItem>
                  <SelectItem value="ss2">SS2 Classes</SelectItem>
                  <SelectItem value="ss1">SS1 Classes</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Class Performance Table */}
            <Card>
              <CardHeader>
                <CardTitle>Class Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {classPerformance.map((classData) => (
                    <div key={classData.class} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-4">
                          <div className="font-semibold">{classData.class}</div>
                          <Badge variant="outline">{classData.students} students</Badge>
                          {classData.alerts > 0 && (
                            <Badge variant="destructive">{classData.alerts} alerts</Badge>
                          )}
                        </div>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600 w-32">Average Score:</span>
                            <Progress value={classData.avgScore} className="flex-1 max-w-48" />
                            <span className="text-sm font-medium">{classData.avgScore}%</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600 w-32">WAEC Readiness:</span>
                            <Progress value={classData.waecReadiness} className="flex-1 max-w-48" />
                            <span className="text-sm font-medium">{classData.waecReadiness}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <PageHeader
              title="Content Monitoring"
              description="Review flagged content and AI usage"
              breadcrumbs={[
                { label: "Dashboard", onClick: handleBackToPerformance },
                { label: "Content Monitoring" }
              ]}
            />
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  Flagged Content & Academic Integrity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {flaggedContent.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">{item.student}</div>
                        <div className="text-sm text-gray-600">{item.issue}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {item.subject} • {item.time}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={item.severity === 'high' ? 'destructive' : item.severity === 'medium' ? 'default' : 'secondary'}>
                          {item.severity}
                        </Badge>
                        <Button size="sm" variant="outline">Review</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <PageHeader
              title="Advanced Analytics"
              description="Detailed insights and institutional metrics"
              breadcrumbs={[
                { label: "Dashboard", onClick: handleBackToPerformance },
                { label: "Advanced Analytics" }
              ]}
            />
            <Card>
              <CardHeader>
                <CardTitle>Advanced Analytics Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Platform Usage</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Daily Active Users</span>
                        <span className="font-medium">892</span>
                      </div>
                      <div className="flex justify-between">
                        <span>AI Queries/Day</span>
                        <span className="font-medium">2,341</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Quiz Completions</span>
                        <span className="font-medium">456</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold">Growth Metrics</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>New Registrations</span>
                        <span className="font-medium text-green-600">+127</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Retention Rate</span>
                        <span className="font-medium">84%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Premium Upgrades</span>
                        <span className="font-medium text-green-600">+23</span>
                      </div>
                    </div>
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

export default AdminDashboard;
