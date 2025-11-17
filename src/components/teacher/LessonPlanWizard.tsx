import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Users,
  Clock,
  Target,
  CheckCircle,
  Download,
  Share,
  Lightbulb,
  Presentation,
  ClipboardList,
  Sparkles
} from "lucide-react";
import BackToDashboard from "@/components/shared/BackToDashboard";
import PageHeader from "@/components/shared/PageHeader";

interface LessonPlanWizardProps {
  onBackToDashboard?: () => void;
}

const LessonPlanWizard = ({ onBackToDashboard }: LessonPlanWizardProps = {}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeStep, setActiveStep] = useState("setup");
  const [lessonData, setLessonData] = useState({
    title: "",
    subject: "",
    grade: "",
    duration: "",
    objectives: "",
    description: "",
    difficulty: "intermediate"
  });
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);

  const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Geography", "History", "Economics"];
  const grades = ["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"];
  const durations = ["30 minutes", "45 minutes", "60 minutes", "90 minutes"];

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockPlan = {
      title: lessonData.title,
      subject: lessonData.subject,
      grade: lessonData.grade,
      duration: lessonData.duration,
      objectives: [
        `Students will understand core concepts of ${lessonData.title}`,
        `Students will apply knowledge through practical examples`,
        `Students will solve related problems independently`
      ],
      materials: [
        "Whiteboard and markers",
        "Textbook: Chapter relevant to topic",
        "Digital presentation slides",
        "Practice worksheets",
        "Calculator (if applicable)"
      ],
      structure: {
        introduction: {
          time: "10 minutes",
          activities: [
            "Warm-up review of previous lesson",
            "Introduction of today's topic",
            "Learning objectives overview"
          ]
        },
        mainContent: {
          time: "30 minutes",
          activities: [
            "Concept explanation with examples",
            "Interactive demonstration",
            "Guided practice with students"
          ]
        },
        practice: {
          time: "15 minutes",
          activities: [
            "Individual/group problem solving",
            "Student presentations",
            "Peer discussions"
          ]
        },
        closure: {
          time: "5 minutes",
          activities: [
            "Summary of key points",
            "Quick assessment questions",
            "Preview of next lesson"
          ]
        }
      },
      assessment: [
        "Exit ticket with 3 key questions",
        "Observation of student participation",
        "Review of practice work completion"
      ],
      homework: `Complete practice exercises 1-5 from textbook. Research one real-world application of ${lessonData.title}.`,
      differentiation: [
        "Provide visual aids for visual learners",
        "Offer additional practice for struggling students",
        "Challenge advanced students with extension problems"
      ]
    };
    
    setGeneratedPlan(mockPlan);
    setIsGenerating(false);
    setActiveStep("preview");
  };

  return (
    <div className="space-y-6">
      {onBackToDashboard && (
        <BackToDashboard onClick={onBackToDashboard} />
      )}

      <PageHeader
        title="Lesson Plan Wizard"
        description="Create AI-powered lesson plans quickly"
        breadcrumbs={[
          { label: "Dashboard", onClick: onBackToDashboard },
          { label: "Lesson Plan Wizard" }
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-600" />
            AI Lesson Plan Wizard
          </CardTitle>
          <p className="text-gray-600">Create comprehensive, engaging lesson plans tailored to your students' needs.</p>
        </CardHeader>
      </Card>

      <Tabs value={activeStep} onValueChange={setActiveStep}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="setup">Setup</TabsTrigger>
          <TabsTrigger value="customize" disabled={!lessonData.title}>Customize</TabsTrigger>
          <TabsTrigger value="preview" disabled={!generatedPlan}>Preview & Export</TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Lesson Title</label>
                  <Input
                    placeholder="e.g., Introduction to Quadratic Equations"
                    value={lessonData.title}
                    onChange={(e) => setLessonData({...lessonData, title: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Subject</label>
                    <Select value={lessonData.subject} onValueChange={(value) => setLessonData({...lessonData, subject: value})}>
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
                    <Select value={lessonData.grade} onValueChange={(value) => setLessonData({...lessonData, grade: value})}>
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

                <div>
                  <label className="text-sm font-medium mb-2 block">Duration</label>
                  <Select value={lessonData.duration} onValueChange={(value) => setLessonData({...lessonData, duration: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      {durations.map((duration) => (
                        <SelectItem key={duration} value={duration}>{duration}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Lesson Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Learning Objectives</label>
                  <Textarea
                    placeholder="What should students learn from this lesson?"
                    value={lessonData.objectives}
                    onChange={(e) => setLessonData({...lessonData, objectives: e.target.value})}
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Lesson Description</label>
                  <Textarea
                    placeholder="Brief overview of the lesson content and approach..."
                    value={lessonData.description}
                    onChange={(e) => setLessonData({...lessonData, description: e.target.value})}
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Difficulty Level</label>
                  <Select value={lessonData.difficulty} onValueChange={(value) => setLessonData({...lessonData, difficulty: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Button 
                onClick={handleGenerate}
                disabled={!lessonData.title || !lessonData.subject || isGenerating}
                className="w-full h-12 text-lg"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Generating Your Lesson Plan...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 mr-3" />
                    Generate AI Lesson Plan
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          {generatedPlan && (
            <>
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{generatedPlan.title}</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Grade</div>
                    <div className="font-semibold">{generatedPlan.grade}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Clock className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Duration</div>
                    <div className="font-semibold">{generatedPlan.duration}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <BookOpen className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Subject</div>
                    <div className="font-semibold">{generatedPlan.subject}</div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-blue-600" />
                      Learning Objectives
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {generatedPlan.objectives.map((objective: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ClipboardList className="h-5 w-5 text-purple-600" />
                      Materials Needed
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {generatedPlan.materials.map((material: string, index: number) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0"></div>
                          <span className="text-sm">{material}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Presentation className="h-5 w-5 text-orange-600" />
                    Lesson Structure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Object.entries(generatedPlan.structure).map(([phase, details]: [string, any]) => (
                      <div key={phase} className="border-l-4 border-orange-200 pl-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold capitalize">{phase.replace(/([A-Z])/g, ' $1').trim()}</h4>
                          <Badge variant="outline">{details.time}</Badge>
                        </div>
                        <ul className="space-y-1">
                          {details.activities.map((activity: string, index: number) => (
                            <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Assessment Methods
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {generatedPlan.assessment.map((method: string, index: number) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          {method}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-yellow-600" />
                      Differentiation Strategies
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {generatedPlan.differentiation.map((strategy: string, index: number) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <Lightbulb className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                          {strategy}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Homework Assignment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm bg-gray-50 p-4 rounded-lg">{generatedPlan.homework}</p>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LessonPlanWizard;