import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  ArrowLeft, GraduationCap, Play, BookOpen, Award, 
  TrendingUp, Users, Clock, CheckCircle, AlertCircle,
  BarChart3, Target, FileText, MessageSquare, Star
} from "lucide-react";

interface TeacherTrainingHubProps {
  onBack: () => void;
  institutionType: 'secondary' | 'university';
}

const TeacherTrainingHub = ({ onBack, institutionType }: TeacherTrainingHubProps) => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [showNewTrainingDialog, setShowNewTrainingDialog] = useState(false);

  const trainingModules = [
    {
      id: 1,
      title: "AI-Assisted Teaching Fundamentals",
      description: "Learn how to effectively integrate AI tools in classroom instruction",
      duration: "2 hours",
      difficulty: "Beginner",
      enrolled: 23,
      completed: 18,
      rating: 4.8,
      status: "active",
      category: "AI Integration"
    },
    {
      id: 2,
      title: "Student Performance Analytics",
      description: "Understanding and acting on student performance data",
      duration: "1.5 hours",
      difficulty: "Intermediate",
      enrolled: 31,
      completed: 28,
      rating: 4.9,
      status: "active",
      category: "Analytics"
    },
    {
      id: 3,
      title: "Digital Classroom Management",
      description: "Best practices for managing hybrid learning environments",
      duration: "3 hours",
      difficulty: "Advanced",
      enrolled: 15,
      completed: 12,
      rating: 4.7,
      status: "active",
      category: "Classroom Management"
    },
    {
      id: 4,
      title: "WAEC Preparation Strategies",
      description: "Optimize student outcomes for WAEC examinations",
      duration: "2.5 hours",
      difficulty: "Intermediate",
      enrolled: 28,
      completed: 22,
      rating: 4.6,
      status: "active",
      category: "Exam Prep"
    }
  ];

  const teacherProgress = [
    {
      id: 1,
      name: "Mrs. Adebayo Folake",
      department: institutionType === 'university' ? 'Computer Science' : 'Science',
      completedModules: 8,
      totalModules: 12,
      certifications: 3,
      lastActivity: "2 days ago",
      impactScore: 89,
      status: "excellent"
    },
    {
      id: 2,
      name: "Mr. Okafor Chinedu",
      department: institutionType === 'university' ? 'Engineering' : 'Mathematics',
      completedModules: 6,
      totalModules: 12,
      certifications: 2,
      lastActivity: "1 week ago",
      impactScore: 76,
      status: "good"
    },
    {
      id: 3,
      name: "Dr. Fatima Hassan",
      department: institutionType === 'university' ? 'Medicine' : 'Biology',
      completedModules: 10,
      totalModules: 12,
      certifications: 4,
      lastActivity: "1 day ago",
      impactScore: 94,
      status: "excellent"
    },
    {
      id: 4,
      name: "Mr. John Emeka",
      department: institutionType === 'university' ? 'Business' : 'English',
      completedModules: 3,
      totalModules: 12,
      certifications: 1,
      lastActivity: "2 weeks ago",
      impactScore: 52,
      status: "needs-attention"
    }
  ];

  const teachingAnalytics = [
    {
      teacher: "Mrs. Adebayo",
      metric: "Student Engagement",
      before: 72,
      after: 89,
      improvement: 17
    },
    {
      teacher: "Mr. Okafor",
      metric: "Assignment Completion",
      before: 68,
      after: 84,
      improvement: 16
    },
    {
      teacher: "Dr. Hassan",
      metric: "Quiz Performance",
      before: 75,
      after: 91,
      improvement: 16
    },
    {
      teacher: "Mr. Emeka",
      metric: "Class Participation",
      before: 61,
      after: 73,
      improvement: 12
    }
  ];

  const professionalDevelopment = [
    {
      id: 1,
      title: "AI Teaching Certification",
      provider: "A1Score Academy",
      duration: "6 weeks",
      enrolled: 12,
      nextCohort: "March 15, 2024",
      cost: "₦45,000",
      description: "Comprehensive certification in AI-assisted teaching methodologies"
    },
    {
      id: 2,
      title: "Data-Driven Education Workshop",
      provider: "EdTech Nigeria",
      duration: "3 days",
      enrolled: 8,
      nextCohort: "February 28, 2024",
      cost: "₦25,000",
      description: "Learn to use analytics for improved student outcomes"
    },
    {
      id: 3,
      title: "Digital Assessment Mastery",
      provider: "A1Score Academy",
      duration: "4 weeks",
      enrolled: 15,
      nextCohort: "April 1, 2024",
      cost: "₦35,000",
      description: "Advanced techniques for online assessment and feedback"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'needs-attention': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold">Teacher Training & Support Hub</h1>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={showNewTrainingDialog} onOpenChange={setShowNewTrainingDialog}>
            <DialogTrigger asChild>
              <Button>
                <BookOpen className="h-4 w-4 mr-2" />
                Create Training
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Training Module</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="training-title">Training Title</Label>
                  <Input id="training-title" placeholder="Enter training title" />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ai-integration">AI Integration</SelectItem>
                      <SelectItem value="analytics">Analytics</SelectItem>
                      <SelectItem value="classroom">Classroom Management</SelectItem>
                      <SelectItem value="exam-prep">Exam Preparation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowNewTrainingDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setShowNewTrainingDialog(false)}>
                    Create Training
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="progress" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="progress">Training Progress</TabsTrigger>
          <TabsTrigger value="modules">Training Modules</TabsTrigger>
          <TabsTrigger value="analytics">Teaching Analytics</TabsTrigger>
          <TabsTrigger value="professional">Professional Development</TabsTrigger>
          <TabsTrigger value="resources">Resource Library</TabsTrigger>
        </TabsList>

        <TabsContent value="progress" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <span className="font-medium">Total Teachers</span>
                </div>
                <p className="text-2xl font-bold">45</p>
                <p className="text-sm text-muted-foreground">Enrolled in training</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Certifications</span>
                </div>
                <p className="text-2xl font-bold">127</p>
                <p className="text-sm text-muted-foreground">Awarded this year</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Avg. Impact Score</span>
                </div>
                <p className="text-2xl font-bold">78%</p>
                <p className="text-sm text-muted-foreground">+12% from last term</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <span className="font-medium">Training Hours</span>
                </div>
                <p className="text-2xl font-bold">342</p>
                <p className="text-sm text-muted-foreground">Completed this month</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Teacher Training Progress</CardTitle>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="arts">Arts</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teacherProgress.map((teacher) => (
                  <div key={teacher.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{teacher.name}</h3>
                        <p className="text-sm text-muted-foreground">{teacher.department} • Last active: {teacher.lastActivity}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(teacher.status)}>
                          {teacher.status.replace('-', ' ')}
                        </Badge>
                        <Badge variant="outline">{teacher.certifications} certs</Badge>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Training Progress</span>
                          <span>{teacher.completedModules}/{teacher.totalModules}</span>
                        </div>
                        <Progress value={(teacher.completedModules / teacher.totalModules) * 100} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Impact Score</span>
                          <span>{teacher.impactScore}%</span>
                        </div>
                        <Progress value={teacher.impactScore} className="h-2" />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Message
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <BarChart3 className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="modules" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Training Modules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {trainingModules.map((module) => (
                  <Card key={module.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{module.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{module.description}</p>
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="outline">{module.category}</Badge>
                            <Badge className={getDifficultyColor(module.difficulty)}>
                              {module.difficulty}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Duration: {module.duration}</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span>{module.rating}</span>
                          </div>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span>Enrolled: {module.enrolled}</span>
                          <span>Completed: {module.completed}</span>
                        </div>

                        <Progress value={(module.completed / module.enrolled) * 100} className="h-2" />

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Play className="h-4 w-4 mr-1" />
                            Preview
                          </Button>
                          <Button size="sm" className="flex-1">
                            Assign to Teachers
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Teaching Impact Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teachingAnalytics.map((analytic, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{analytic.teacher}</h3>
                        <p className="text-sm text-muted-foreground">{analytic.metric}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        +{analytic.improvement}% improvement
                      </Badge>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Before Training</span>
                          <span>{analytic.before}%</span>
                        </div>
                        <Progress value={analytic.before} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>After Training</span>
                          <span>{analytic.after}%</span>
                        </div>
                        <Progress value={analytic.after} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="professional" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Professional Development Programs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {professionalDevelopment.map((program) => (
                  <div key={program.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold">{program.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{program.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Provider: {program.provider}</span>
                          <span>Duration: {program.duration}</span>
                          <span>Cost: {program.cost}</span>
                        </div>
                      </div>
                      <Badge variant="outline">{program.enrolled} enrolled</Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="font-medium">Next cohort: </span>
                        <span>{program.nextCohort}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                        <Button size="sm">
                          Enroll Teachers
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Teaching Resource Library</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <BookOpen className="h-8 w-8 text-blue-600 mb-3" />
                    <h3 className="font-semibold mb-2">AI Teaching Guides</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Step-by-step guides for integrating AI in your teaching
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Browse Guides
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <Play className="h-8 w-8 text-green-600 mb-3" />
                    <h3 className="font-semibold mb-2">Video Tutorials</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Video walkthroughs of A1Score features and best practices
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Watch Videos
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <FileText className="h-8 w-8 text-purple-600 mb-3" />
                    <h3 className="font-semibold mb-2">Templates & Worksheets</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Ready-to-use templates for lesson planning and assessment
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Download Templates
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherTrainingHub;