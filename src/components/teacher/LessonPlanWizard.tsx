import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Save
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BackToDashboard from "@/components/shared/BackToDashboard";
import PageHeader from "@/components/shared/PageHeader";

interface LessonPlanWizardProps {
  onBackToDashboard?: () => void;
}

const LessonPlanWizard = ({ onBackToDashboard }: LessonPlanWizardProps = {}) => {
  const { toast } = useToast();
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
  const [showExitWarning, setShowExitWarning] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);

  // Load draft from localStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('lessonPlanDraft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setLessonData(draft.lessonData);
        setGeneratedPlan(draft.generatedPlan);
        setActiveStep(draft.activeStep);
        setLastSavedAt(new Date(draft.savedAt));
      } catch (e) {
        console.error('Failed to load draft:', e);
      }
    }
  }, []);

  // Track form modifications
  useEffect(() => {
    const hasData = lessonData.title || lessonData.subject || lessonData.objectives || lessonData.description;
    setHasUnsavedChanges(hasData && !generatedPlan);
  }, [lessonData, generatedPlan]);

  // Browser unload warning
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

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
    setActiveStep("customize");
  };

  const handleBackToDashboardClick = () => {
    if (hasUnsavedChanges) {
      setShowExitWarning(true);
    } else if (onBackToDashboard) {
      onBackToDashboard();
    }
  };

  const handleConfirmExit = () => {
    setShowExitWarning(false);
    if (onBackToDashboard) {
      onBackToDashboard();
    }
  };

  const canProceedFromSetup = () => {
    return lessonData.title && lessonData.subject && lessonData.grade && lessonData.duration;
  };

  const handleNextStep = () => {
    if (activeStep === "setup") {
      if (canProceedFromSetup()) {
        handleGenerate();
      }
    } else if (activeStep === "customize") {
      setActiveStep("preview");
    }
  };

  const handlePreviousStep = () => {
    if (activeStep === "customize") {
      setActiveStep("setup");
    } else if (activeStep === "preview") {
      setActiveStep("customize");
    }
  };

  const handleSaveDraft = () => {
    const draft = {
      lessonData,
      generatedPlan,
      activeStep,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem('lessonPlanDraft', JSON.stringify(draft));
    setLastSavedAt(new Date());
    toast({
      title: "Draft Saved",
      description: "Your lesson plan has been saved as a draft.",
    });
  };

  const handleClearDraft = () => {
    localStorage.removeItem('lessonPlanDraft');
    setLessonData({
      title: "",
      subject: "",
      grade: "",
      duration: "",
      objectives: "",
      description: "",
      difficulty: "intermediate"
    });
    setGeneratedPlan(null);
    setActiveStep("setup");
    setLastSavedAt(null);
    toast({
      title: "Draft Cleared",
      description: "Started a new lesson plan.",
    });
  };

  // Auto-save every 30 seconds if there are changes
  useEffect(() => {
    const hasData = lessonData.title || generatedPlan;
    if (!hasData) return;

    const autoSaveInterval = setInterval(() => {
      handleSaveDraft();
    }, 30000); // 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [lessonData, generatedPlan, activeStep]);

  return (
    <div className="space-y-6">
      {onBackToDashboard && (
        <BackToDashboard onClick={handleBackToDashboardClick} />
      )}

      <PageHeader
        title="Lesson Plan Wizard"
        description="Create AI-powered lesson plans quickly"
        breadcrumbs={[
          { label: "Dashboard", onClick: handleBackToDashboardClick },
          { label: "Lesson Plan Wizard" }
        ]}
      />

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-purple-600" />
                AI Lesson Plan Wizard
              </CardTitle>
              <p className="text-gray-600 mt-2">Create comprehensive, engaging lesson plans tailored to your students' needs.</p>
              {lastSavedAt && (
                <p className="text-sm text-gray-500 mt-1">
                  Last saved: {lastSavedAt.toLocaleTimeString()}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleSaveDraft}
                variant="outline"
                size="sm"
                disabled={!lessonData.title && !generatedPlan}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              {(lessonData.title || generatedPlan) && (
                <Button
                  onClick={handleClearDraft}
                  variant="ghost"
                  size="sm"
                >
                  New
                </Button>
              )}
            </div>
          </div>
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
              <div className="flex justify-end">
                <Button
                  onClick={handleNextStep}
                  disabled={!canProceedFromSetup() || isGenerating}
                  className="min-h-[44px]"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Generating Your Lesson Plan...
                    </>
                  ) : (
                    <>
                      Next: Generate Plan
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customize" className="space-y-6">
          {generatedPlan && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Customize Your Lesson Plan</CardTitle>
                  <p className="text-sm text-gray-600">Review and edit the AI-generated lesson plan before finalizing.</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Lesson Title</label>
                    <Input
                      value={generatedPlan.title}
                      onChange={(e) => setGeneratedPlan({...generatedPlan, title: e.target.value})}
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Subject</label>
                      <Select value={generatedPlan.subject} onValueChange={(value) => setGeneratedPlan({...generatedPlan, subject: value})}>
                        <SelectTrigger>
                          <SelectValue />
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
                      <Select value={generatedPlan.grade} onValueChange={(value) => setGeneratedPlan({...generatedPlan, grade: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {grades.map((grade) => (
                            <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Duration</label>
                      <Select value={generatedPlan.duration} onValueChange={(value) => setGeneratedPlan({...generatedPlan, duration: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {durations.map((duration) => (
                            <SelectItem key={duration} value={duration}>{duration}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Learning Objectives</label>
                    <Textarea
                      value={generatedPlan.objectives.join('\n')}
                      onChange={(e) => setGeneratedPlan({...generatedPlan, objectives: e.target.value.split('\n')})}
                      rows={4}
                      placeholder="Enter each objective on a new line"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Homework Assignment</label>
                    <Textarea
                      value={generatedPlan.homework}
                      onChange={(e) => setGeneratedPlan({...generatedPlan, homework: e.target.value})}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between">
                    <Button
                      onClick={handlePreviousStep}
                      variant="outline"
                      className="min-h-[44px]"
                      size="lg"
                    >
                      <ArrowLeft className="h-5 w-5 mr-2" />
                      Previous
                    </Button>
                    <Button
                      onClick={handleNextStep}
                      className="min-h-[44px]"
                      size="lg"
                    >
                      Next: Preview & Export
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          {generatedPlan && (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold">{generatedPlan.title}</h2>
                <p className="text-sm text-gray-600 mt-1">Review your complete lesson plan below</p>
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

              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between">
                    <Button
                      onClick={handlePreviousStep}
                      variant="outline"
                      className="min-h-[44px]"
                      size="lg"
                    >
                      <ArrowLeft className="h-5 w-5 mr-2" />
                      Previous: Customize
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" size="lg" className="min-h-[44px]">
                        <Download className="h-4 w-4 mr-2" />
                        Export PDF
                      </Button>
                      <Button variant="outline" size="lg" className="min-h-[44px]">
                        <Share className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>

      {/* Exit Warning Dialog */}
      <AlertDialog open={showExitWarning} onOpenChange={setShowExitWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes to your lesson plan. If you leave now, all your work will be lost.
              Are you sure you want to exit?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue Editing</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmExit} className="bg-red-600 hover:bg-red-700">
              Exit Without Saving
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default LessonPlanWizard;