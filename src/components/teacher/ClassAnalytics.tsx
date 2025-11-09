
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Award, AlertCircle } from "lucide-react";
import { useClassAnalytics } from "@/hooks/useClassAnalytics";

const ClassAnalytics = () => {
  const { 
    classStats, 
    studentPerformance, 
    subjectAnalytics, 
    loading, 
    teacherClasses, 
    selectedClass, 
    setSelectedClass 
  } = useClassAnalytics();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-64" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <Skeleton className="h-16 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!classStats) return null;

  // Transform data for charts
  const studentDistribution = [
    { 
      name: 'Excellent (80-100)', 
      value: studentPerformance.filter(s => s.averageScore >= 80).length, 
      color: '#10b981' 
    },
    { 
      name: 'Good (70-79)', 
      value: studentPerformance.filter(s => s.averageScore >= 70 && s.averageScore < 80).length, 
      color: '#3b82f6' 
    },
    { 
      name: 'Average (60-69)', 
      value: studentPerformance.filter(s => s.averageScore >= 60 && s.averageScore < 70).length, 
      color: '#f59e0b' 
    },
    { 
      name: 'Needs Help (<60)', 
      value: studentPerformance.filter(s => s.averageScore < 60).length, 
      color: '#ef4444' 
    },
  ];

  const topStudents = studentPerformance
    .filter(s => s.averageScore >= 80)
    .sort((a, b) => b.averageScore - a.averageScore)
    .slice(0, 5)
    .map(s => ({
      name: s.studentName,
      average: s.averageScore,
      subjects: Object.keys(s.subjects).slice(0, 3)
    }));

  const strugglingStudents = studentPerformance
    .filter(s => s.averageScore < 60)
    .sort((a, b) => a.averageScore - b.averageScore)
    .slice(0, 5)
    .map(s => ({
      name: s.studentName,
      average: s.averageScore,
      weakSubjects: Object.keys(s.subjects).slice(0, 2)
    }));

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Class Analytics</h2>
          <p className="text-gray-600">Monitor student performance and identify areas for improvement</p>
        </div>
        <div className="flex gap-3">
          <Select value={selectedClass || ''} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-60">
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent>
              {teacherClasses.map(cls => (
                <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select defaultValue="this-month">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="this-term">This Term</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold">{classStats.totalStudents}</p>
                <p className="text-sm text-green-600">Active in class</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Class Average</p>
                <p className="text-2xl font-bold">{classStats.classAverage}%</p>
                <p className="text-sm text-green-600">Overall performance</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Top Performers</p>
                <p className="text-2xl font-bold">{classStats.topPerformers}</p>
                <p className="text-sm text-gray-600">80%+ average</p>
              </div>
              <Award className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Need Attention</p>
                <p className="text-2xl font-bold">{classStats.needsAttention}</p>
                <p className="text-sm text-red-600">Below 60%</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Subject Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectAnalytics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="averageScore" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Progress Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Progress Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={classStats.weeklyProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="average" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="participation" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Student Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Student Performance Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={studentDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {studentDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Subject Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Subject Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subjectAnalytics.map((subject) => (
                <div key={subject.subject} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{subject.subject}</div>
                    <div className="text-sm text-gray-600">{subject.totalStudents} students</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{subject.averageScore}%</div>
                    <Badge variant="secondary" className="text-green-600">+{subject.improvement}%</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-600" />
              Top Performing Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topStudents.map((student, index) => (
                <div key={student.name} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-sm font-bold text-green-600">
                      #{index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{student.name}</div>
                      <div className="text-sm text-gray-600">{student.subjects.join(', ')}</div>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-green-600">{student.average}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Students Needing Help */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              Students Needing Attention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {strugglingStudents.map((student) => (
                <div key={student.name} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <div className="font-medium">{student.name}</div>
                    <div className="text-sm text-gray-600">Student</div>
                    <div className="text-sm text-red-600">Weak in: {student.weakSubjects.join(', ')}</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-red-600">{student.average}%</div>
                    <Button size="sm" variant="outline" className="mt-1">
                      Intervene
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClassAnalytics;
