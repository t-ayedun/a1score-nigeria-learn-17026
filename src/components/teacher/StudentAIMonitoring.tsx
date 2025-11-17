import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, TrendingUp, Users, Bot, MessageSquare, Clock } from 'lucide-react';
import BackToDashboard from "@/components/shared/BackToDashboard";
import PageHeader from "@/components/shared/PageHeader";

interface StudentAIUsage {
  id: string;
  name: string;
  totalQueries: number;
  aiDependencyScore: number;
  lastActivity: string;
  concerningPatterns: string[];
  ethicsScore: number;
  subjects: string[];
}

interface StudentAIMonitoringProps {
  onBackToDashboard?: () => void;
}

const StudentAIMonitoring = ({ onBackToDashboard }: StudentAIMonitoringProps = {}) => {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  // Sample data - in real implementation, this would come from API
  const studentsData: StudentAIUsage[] = [
    {
      id: '1',
      name: 'Adebayo Johnson',
      totalQueries: 45,
      aiDependencyScore: 75,
      lastActivity: '2 hours ago',
      concerningPatterns: ['High frequency homework queries', 'Avoiding step-by-step learning'],
      ethicsScore: 85,
      subjects: ['Mathematics', 'Physics']
    },
    {
      id: '2',
      name: 'Fatima Abdullahi',
      totalQueries: 23,
      aiDependencyScore: 45,
      lastActivity: '1 day ago',
      concerningPatterns: [],
      ethicsScore: 95,
      subjects: ['Chemistry', 'Biology']
    },
    {
      id: '3',
      name: 'Emeka Okafor',
      totalQueries: 67,
      aiDependencyScore: 85,
      lastActivity: '30 minutes ago',
      concerningPatterns: ['Direct answer seeking', 'Limited independent attempts'],
      ethicsScore: 70,
      subjects: ['Mathematics', 'Computer Science']
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getDependencyBadge = (score: number) => {
    if (score >= 80) return { variant: 'destructive' as const, label: 'High Dependency' };
    if (score >= 60) return { variant: 'secondary' as const, label: 'Moderate Dependency' };
    return { variant: 'default' as const, label: 'Healthy Usage' };
  };

  const overallStats = {
    totalStudents: studentsData.length,
    highDependency: studentsData.filter(s => s.aiDependencyScore >= 80).length,
    averageEthicsScore: Math.round(studentsData.reduce((acc, s) => acc + s.ethicsScore, 0) / studentsData.length),
    totalAIQueries: studentsData.reduce((acc, s) => acc + s.totalQueries, 0)
  };

  return (
    <div className="space-y-6">
      {onBackToDashboard && (
        <BackToDashboard onClick={onBackToDashboard} />
      )}

      <PageHeader
        title="AI Monitoring"
        description="Monitor student AI usage and academic integrity"
        breadcrumbs={[
          { label: "Dashboard", onClick: onBackToDashboard },
          { label: "AI Monitoring" }
        ]}
      />

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.totalStudents}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High AI Dependency</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overallStats.highDependency}</div>
            <p className="text-xs text-muted-foreground">Students needing attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Ethics Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getScoreColor(overallStats.averageEthicsScore)}`}>
              {overallStats.averageEthicsScore}%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total AI Queries</CardTitle>
            <Bot className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.totalAIQueries}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="concerns">Students of Concern</TabsTrigger>
          <TabsTrigger value="insights">Usage Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student AI Usage Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studentsData.map((student) => {
                  const dependencyBadge = getDependencyBadge(student.aiDependencyScore);
                  return (
                    <div key={student.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-medium">{student.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Subjects: {student.subjects.join(', ')}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={dependencyBadge.variant}>
                            {dependencyBadge.label}
                          </Badge>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedStudent(student.id)}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">AI Queries</p>
                          <p className="font-medium">{student.totalQueries}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Ethics Score</p>
                          <p className={`font-medium ${getScoreColor(student.ethicsScore)}`}>
                            {student.ethicsScore}%
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Last Activity</p>
                          <p className="font-medium">{student.lastActivity}</p>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">AI Dependency</span>
                          <span className="text-xs font-medium">{student.aiDependencyScore}%</span>
                        </div>
                        <Progress value={student.aiDependencyScore} className="h-2" />
                      </div>

                      {student.concerningPatterns.length > 0 && (
                        <div className="mt-3 p-2 bg-orange-50 rounded border-l-4 border-orange-500">
                          <p className="text-xs font-medium text-orange-800 mb-1">Concerning Patterns:</p>
                          <ul className="text-xs text-orange-700">
                            {student.concerningPatterns.map((pattern, index) => (
                              <li key={index}>• {pattern}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="concerns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Students Requiring Attention
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studentsData
                  .filter(student => student.aiDependencyScore >= 70 || student.concerningPatterns.length > 0)
                  .map((student) => (
                    <Card key={student.id} className="border-l-4 border-l-red-500">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-medium">{student.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {student.subjects.join(', ')}
                            </p>
                          </div>
                          <Badge variant="destructive">
                            High Risk
                          </Badge>
                        </div>

                        <div className="space-y-2 mb-3">
                          <div className="flex justify-between text-sm">
                            <span>AI Dependency:</span>
                            <span className="font-medium">{student.aiDependencyScore}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Ethics Score:</span>
                            <span className={`font-medium ${getScoreColor(student.ethicsScore)}`}>
                              {student.ethicsScore}%
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Recommended Actions:</h4>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• Schedule one-on-one meeting to discuss learning strategies</li>
                            <li>• Introduce more independent practice exercises</li>
                            <li>• Set AI usage guidelines and monitor progress</li>
                            <li>• Contact parents about AI dependency concerns</li>
                          </ul>
                        </div>

                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Contact Student
                          </Button>
                          <Button size="sm" variant="outline">
                            Schedule Meeting
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Usage Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Peak Usage Time:</span>
                    <span className="font-medium">7-9 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Most Queried Subject:</span>
                    <span className="font-medium">Mathematics</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Session Length:</span>
                    <span className="font-medium">12 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Healthy Usage Students:</span>
                    <span className="font-medium text-green-600">
                      {studentsData.filter(s => s.aiDependencyScore < 60).length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Intervention Success</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Students Improved:</span>
                    <span className="font-medium text-green-600">3/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Improvement:</span>
                    <span className="font-medium">+15% Ethics Score</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Parent Engagement:</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Follow-up Needed:</span>
                    <span className="font-medium text-orange-600">2 students</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentAIMonitoring;