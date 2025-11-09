import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  ArrowLeft, BookOpen, Plus, Edit3, Trash2, Save, 
  Calendar, Target, MapPin, CheckCircle, Clock, Users 
} from "lucide-react";

interface CurriculumManagementProps {
  onBack: () => void;
  institutionType: 'secondary' | 'university';
}

const CurriculumManagement = ({ onBack, institutionType }: CurriculumManagementProps) => {
  const [selectedTerm, setSelectedTerm] = useState('first-term');
  const [showNewSubjectDialog, setShowNewSubjectDialog] = useState(false);

  const curriculumData = institutionType === 'university' ? [
    {
      id: 1,
      name: "Computer Science Fundamentals",
      department: "Computer Science",
      semester: "First Semester",
      topics: 24,
      completed: 18,
      students: 245,
      status: "active"
    },
    {
      id: 2,
      name: "Advanced Mathematics",
      department: "Mathematics",
      semester: "First Semester", 
      topics: 16,
      completed: 12,
      students: 189,
      status: "active"
    },
    {
      id: 3,
      name: "Research Methodology",
      department: "General Studies",
      semester: "Second Semester",
      topics: 12,
      completed: 8,
      students: 567,
      status: "active"
    }
  ] : [
    {
      id: 1,
      name: "Further Mathematics",
      class: "SS3",
      term: "First Term",
      topics: 18,
      completed: 14,
      students: 78,
      waecTopics: 16,
      status: "active"
    },
    {
      id: 2,
      name: "English Language",
      class: "SS3",
      term: "First Term",
      topics: 22,
      completed: 18,
      students: 143,
      waecTopics: 20,
      status: "active"
    },
    {
      id: 3,
      name: "Physics",
      class: "SS2",
      term: "First Term",
      topics: 20,
      completed: 12,
      students: 89,
      waecTopics: 18,
      status: "active"
    }
  ];

  const learningPaths = [
    {
      id: 1,
      name: "WAEC Preparation Track",
      subjects: ["Mathematics", "English", "Physics", "Chemistry"],
      duration: "6 months",
      students: 234,
      completion: 78
    },
    {
      id: 2,
      name: "JAMB Fast Track",
      subjects: ["Use of English", "Mathematics", "Physics", "Chemistry"],
      duration: "3 months",
      students: 156,
      completion: 82
    },
    {
      id: 3,
      name: "Science Foundation",
      subjects: ["Biology", "Chemistry", "Physics", "Mathematics"],
      duration: "4 months",
      students: 178,
      completion: 71
    }
  ];

  const academicCalendar = [
    { event: "First Term Begins", date: "2024-09-16", type: "term-start" },
    { event: "Mid-term Break", date: "2024-10-28", type: "break" },
    { event: "First Term Ends", date: "2024-12-13", type: "term-end" },
    { event: "WAEC Registration", date: "2024-11-01", type: "exam" },
    { event: "Mock WAEC Exams", date: "2024-02-15", type: "exam" },
    { event: "WAEC Exams Begin", date: "2024-05-06", type: "exam" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold">Curriculum Management</h1>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={showNewSubjectDialog} onOpenChange={setShowNewSubjectDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Subject
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Subject</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="subject-name">Subject Name</Label>
                  <Input id="subject-name" placeholder="Enter subject name" />
                </div>
                <div>
                  <Label htmlFor="class-level">Class/Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ss1">SS1</SelectItem>
                      <SelectItem value="ss2">SS2</SelectItem>
                      <SelectItem value="ss3">SS3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Subject description" />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowNewSubjectDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setShowNewSubjectDialog(false)}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Subject
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="subjects" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="subjects">Subject Mapping</TabsTrigger>
          <TabsTrigger value="paths">Learning Paths</TabsTrigger>
          <TabsTrigger value="calendar">Academic Calendar</TabsTrigger>
          <TabsTrigger value="sync">A1Score Sync</TabsTrigger>
        </TabsList>

        <TabsContent value="subjects" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Subject Configuration</CardTitle>
              <div className="flex gap-4">
                <Select value={selectedTerm} onValueChange={setSelectedTerm}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="first-term">First Term</SelectItem>
                    <SelectItem value="second-term">Second Term</SelectItem>
                    <SelectItem value="third-term">Third Term</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {curriculumData.map((subject) => (
                  <div key={subject.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{subject.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {institutionType === 'university' ? subject.department : subject.class} • 
                          {institutionType === 'university' ? subject.semester : subject.term}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{subject.students} students</Badge>
                        <Button variant="outline" size="sm">
                          <Edit3 className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <MapPin className="h-4 w-4 mr-1" />
                          Map to A1Score
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Curriculum Progress</span>
                          <span>{subject.completed}/{subject.topics} topics</span>
                        </div>
                        <Progress value={(subject.completed / subject.topics) * 100} className="h-2" />
                      </div>
                      
                      {institutionType !== 'university' && 'waecTopics' in subject && (
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>WAEC Coverage</span>
                            <span>{subject.waecTopics}/{subject.topics} WAEC topics</span>
                          </div>
                          <Progress value={(subject.waecTopics / subject.topics) * 100} className="h-2" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="paths" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Custom Learning Paths</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {learningPaths.map((path) => (
                  <Card key={path.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">{path.name}</h3>
                        <Badge variant="outline">{path.duration}</Badge>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-muted-foreground">Subjects:</p>
                        <div className="flex flex-wrap gap-1">
                          {path.subjects.map((subject) => (
                            <Badge key={subject} variant="secondary" className="text-xs">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Students Enrolled</span>
                          <span className="font-medium">{path.students}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Completion Rate</span>
                          <span className="font-medium">{path.completion}%</span>
                        </div>
                        <Progress value={path.completion} className="h-2" />
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit3 className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Users className="h-4 w-4 mr-1" />
                          Assign
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Academic Calendar Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {academicCalendar.map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{event.event}</p>
                        <p className="text-sm text-muted-foreground">{event.date}</p>
                      </div>
                    </div>
                    <Badge variant={
                      event.type === 'exam' ? 'destructive' : 
                      event.type === 'break' ? 'default' : 'secondary'
                    }>
                      {event.type.replace('-', ' ')}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sync" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>A1Score Content Synchronization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Sync Status</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Mathematics Topics</span>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Synced</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>English Topics</span>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Synced</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Physics Topics</span>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm">Pending</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Custom Configurations</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Difficulty Adjustment</span>
                        <Badge variant="outline">Enabled</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Local Content Priority</span>
                        <Badge variant="outline">High</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>WAEC Focus Mode</span>
                        <Badge variant="outline">Active</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex gap-4">
                    <Button>
                      <Target className="h-4 w-4 mr-2" />
                      Sync All Content
                    </Button>
                    <Button variant="outline">
                      <Edit3 className="h-4 w-4 mr-2" />
                      Configure Mapping
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CurriculumManagement;