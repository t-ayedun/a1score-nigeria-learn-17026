import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Calendar,
  Target,
  BookOpen,
  Award,
  Download,
  Plus,
  Edit3,
  Trash2,
  Clock
} from "lucide-react";
import BackToDashboard from "@/components/shared/BackToDashboard";
import PageHeader from "@/components/shared/PageHeader";

interface Week {
  week: number;
  topic: string;
  objectives: string[];
  activities: string[];
  assessment: string;
}

interface SyllabusBuilderProps {
  onBackToDashboard?: () => void;
}

const SyllabusBuilder = ({ onBackToDashboard }: SyllabusBuilderProps = {}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [syllabusData, setSyllabusData] = useState({
    courseTitle: "",
    subject: "",
    grade: "",
    term: "",
    duration: "",
    description: "",
    instructor: "",
    prerequisites: ""
  });
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [generatedSyllabus, setGeneratedSyllabus] = useState<any>(null);

  const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Geography", "History", "Economics"];
  const grades = ["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"];
  const terms = ["First Term", "Second Term", "Third Term"];

  const handleGenerateSyllabus = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockSyllabus = {
      ...syllabusData,
      weeks: [
        {
          week: 1,
          topic: "Introduction and Foundations",
          objectives: ["Understand basic concepts", "Review prerequisites"],
          activities: ["Diagnostic assessment", "Interactive introduction"],
          assessment: "Formative quiz"
        },
        {
          week: 2,
          topic: "Core Concepts Part 1",
          objectives: ["Master fundamental principles", "Apply basic formulas"],
          activities: ["Guided practice", "Group discussions"],
          assessment: "Practice exercises"
        },
        {
          week: 3,
          topic: "Core Concepts Part 2",
          objectives: ["Expand understanding", "Connect related topics"],
          activities: ["Problem-solving sessions", "Peer teaching"],
          assessment: "Mini project"
        },
        {
          week: 4,
          topic: "Practical Applications",
          objectives: ["Apply knowledge to real situations", "Develop problem-solving skills"],
          activities: ["Case studies", "Laboratory work"],
          assessment: "Practical test"
        },
        {
          week: 5,
          topic: "Advanced Topics",
          objectives: ["Explore complex scenarios", "Synthesize information"],
          activities: ["Research projects", "Presentations"],
          assessment: "Research presentation"
        },
        {
          week: 6,
          topic: "Integration and Review",
          objectives: ["Connect all concepts", "Prepare for assessment"],
          activities: ["Comprehensive review", "Practice tests"],
          assessment: "Mock examination"
        },
        {
          week: 7,
          topic: "Assessment Week",
          objectives: ["Demonstrate mastery", "Apply knowledge comprehensively"],
          activities: ["Final examination", "Portfolio review"],
          assessment: "Final exam"
        }
      ],
      gradingScheme: [
        { component: "Continuous Assessment", percentage: 40, description: "Quizzes, assignments, and class participation" },
        { component: "Mid-term Examination", percentage: 20, description: "Comprehensive test covering first half of term" },
        { component: "Final Examination", percentage: 40, description: "Comprehensive test covering entire term" }
      ],
      resources: [
        `${syllabusData.subject} Textbook - Latest Edition`,
        "Scientific calculator (if applicable)",
        "Laboratory equipment and materials",
        "Digital learning platform access",
        "Supplementary reading materials"
      ],
      policies: {
        attendance: "90% attendance required. More than 3 unexcused absences may result in course failure.",
        lateness: "Consistent lateness will be recorded and may affect participation grades.",
        assignments: "All assignments must be submitted on time. Late submissions will incur penalties.",
        examinations: "Make-up exams only available for documented emergencies."
      }
    };
    
    setGeneratedSyllabus(mockSyllabus);
    setWeeks(mockSyllabus.weeks);
    setIsGenerating(false);
  };

  const addWeek = () => {
    const newWeek: Week = {
      week: weeks.length + 1,
      topic: "",
      objectives: [""],
      activities: [""],
      assessment: ""
    };
    setWeeks([...weeks, newWeek]);
  };

  const updateWeek = (index: number, field: keyof Week, value: any) => {
    const updatedWeeks = [...weeks];
    updatedWeeks[index] = { ...updatedWeeks[index], [field]: value };
    setWeeks(updatedWeeks);
  };

  const removeWeek = (index: number) => {
    const updatedWeeks = weeks.filter((_, i) => i !== index);
    setWeeks(updatedWeeks);
  };

  return (
    <div className="space-y-6">
      {onBackToDashboard && (
        <BackToDashboard onClick={onBackToDashboard} />
      )}

      <PageHeader
        title="Syllabus Builder"
        description="Design and organize your course syllabus"
        breadcrumbs={[
          { label: "Dashboard", onClick: onBackToDashboard },
          { label: "Syllabus Builder" }
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-600" />
            Smart Syllabus Builder
          </CardTitle>
          <p className="text-gray-600">Create professional, comprehensive syllabi aligned with curriculum standards.</p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="setup" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="setup">Course Setup</TabsTrigger>
          <TabsTrigger value="schedule">Weekly Schedule</TabsTrigger>
          <TabsTrigger value="preview">Preview & Export</TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Course Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Course Title</label>
                  <Input
                    placeholder="e.g., Advanced Mathematics"
                    value={syllabusData.courseTitle}
                    onChange={(e) => setSyllabusData({...syllabusData, courseTitle: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Subject</label>
                    <Select value={syllabusData.subject} onValueChange={(value) => setSyllabusData({...syllabusData, subject: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Grade Level</label>
                    <Select value={syllabusData.grade} onValueChange={(value) => setSyllabusData({...syllabusData, grade: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        {grades.map((grade) => (
                          <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Term</label>
                    <Select value={syllabusData.term} onValueChange={(value) => setSyllabusData({...syllabusData, term: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select term" />
                      </SelectTrigger>
                      <SelectContent>
                        {terms.map((term) => (
                          <SelectItem key={term} value={term}>{term}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Duration</label>
                    <Input
                      placeholder="e.g., 12 weeks"
                      value={syllabusData.duration}
                      onChange={(e) => setSyllabusData({...syllabusData, duration: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Instructor Name</label>
                  <Input
                    placeholder="Teacher's name"
                    value={syllabusData.instructor}
                    onChange={(e) => setSyllabusData({...syllabusData, instructor: e.target.value})}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Course Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Course Description</label>
                  <Textarea
                    placeholder="Describe the course content, goals, and approach..."
                    value={syllabusData.description}
                    onChange={(e) => setSyllabusData({...syllabusData, description: e.target.value})}
                    rows={4}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Prerequisites</label>
                  <Textarea
                    placeholder="List any required prior knowledge or courses..."
                    value={syllabusData.prerequisites}
                    onChange={(e) => setSyllabusData({...syllabusData, prerequisites: e.target.value})}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Button 
                onClick={handleGenerateSyllabus}
                disabled={!syllabusData.courseTitle || !syllabusData.subject || isGenerating}
                className="w-full h-12 text-lg"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Generating Syllabus...
                  </>
                ) : (
                  <>
                    <FileText className="h-5 w-5 mr-3" />
                    Generate AI Syllabus
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Weekly Schedule</h3>
            <Button onClick={addWeek} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Week
            </Button>
          </div>

          {weeks.length > 0 ? (
            <div className="space-y-4">
              {weeks.map((week, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Week {week.week}</CardTitle>
                      <Button 
                        onClick={() => removeWeek(index)}
                        variant="ghost" 
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Topic</label>
                      <Input
                        value={week.topic}
                        onChange={(e) => updateWeek(index, 'topic', e.target.value)}
                        placeholder="Week topic or theme"
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Learning Objectives</label>
                        <Textarea
                          value={week.objectives.join('\n')}
                          onChange={(e) => updateWeek(index, 'objectives', e.target.value.split('\n'))}
                          placeholder="Learning objectives (one per line)"
                          rows={3}
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Activities</label>
                        <Textarea
                          value={week.activities.join('\n')}
                          onChange={(e) => updateWeek(index, 'activities', e.target.value.split('\n'))}
                          placeholder="Learning activities (one per line)"
                          rows={3}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Assessment</label>
                      <Input
                        value={week.assessment}
                        onChange={(e) => updateWeek(index, 'assessment', e.target.value)}
                        placeholder="Assessment method for this week"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No weeks added yet</p>
                <p className="text-sm">Generate a syllabus or add weeks manually</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          {generatedSyllabus && (
            <>
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{generatedSyllabus.courseTitle}</h2>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <BookOpen className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Subject</div>
                    <div className="font-semibold">{generatedSyllabus.subject}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Award className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Grade</div>
                    <div className="font-semibold">{generatedSyllabus.grade}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Clock className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Duration</div>
                    <div className="font-semibold">{generatedSyllabus.duration}</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Course Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{generatedSyllabus.description}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Grading Scheme</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {generatedSyllabus.gradingScheme.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{item.component}</div>
                          <div className="text-sm text-gray-600">{item.description}</div>
                        </div>
                        <Badge variant="outline" className="font-semibold">
                          {item.percentage}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Weekly Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeks.map((week, index) => (
                      <div key={index} className="border-l-4 border-blue-200 pl-4 py-3">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">Week {week.week}: {week.topic}</h4>
                          <Badge variant="outline">{week.assessment}</Badge>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>
                            <strong>Objectives:</strong>
                            <ul className="list-disc list-inside mt-1">
                              {week.objectives.map((obj, i) => (
                                <li key={i}>{obj}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <strong>Activities:</strong>
                            <ul className="list-disc list-inside mt-1">
                              {week.activities.map((activity, i) => (
                                <li key={i}>{activity}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SyllabusBuilder;