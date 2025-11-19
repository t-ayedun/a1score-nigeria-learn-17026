import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
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
  FileQuestion,
  CheckCircle,
  Edit3,
  Download,
  Clock,
  Target,
  Zap,
  RotateCcw,
  Plus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BackToDashboard from "@/components/shared/BackToDashboard";
import PageHeader from "@/components/shared/PageHeader";

interface Question {
  id: string;
  type: 'multiple-choice' | 'short-answer' | 'essay' | 'true-false';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

interface AssessmentGeneratorProps {
  onBackToDashboard?: () => void;
}

const AssessmentGenerator = ({ onBackToDashboard }: AssessmentGeneratorProps = {}) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showRegenerateWarning, setShowRegenerateWarning] = useState(false);
  const [assessmentData, setAssessmentData] = useState({
    title: "",
    subject: "",
    grade: "",
    type: "",
    duration: "",
    instructions: "",
    totalPoints: 100
  });
  const [requirements, setRequirements] = useState({
    multipleChoice: 10,
    shortAnswer: 5,
    essay: 2,
    trueFalse: 5,
    difficulty: {
      easy: 40,
      medium: 40,
      hard: 20
    }
  });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);

  const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Geography", "History", "Economics"];
  const grades = ["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"];
  const assessmentTypes = ["Quiz", "Test", "Mid-term Exam", "Final Exam", "Assignment"];
  const durations = ["30 minutes", "45 minutes", "60 minutes", "90 minutes", "120 minutes"];

  const handleGenerateQuestions = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockQuestions: Question[] = [
      {
        id: "q1",
        type: "multiple-choice",
        question: "What is the derivative of x² + 3x + 2?",
        options: ["2x + 3", "x² + 3", "2x + 2", "x + 3"],
        correctAnswer: "2x + 3",
        explanation: "Using the power rule: d/dx(x²) = 2x and d/dx(3x) = 3, d/dx(2) = 0",
        difficulty: "medium",
        points: 5
      },
      {
        id: "q2",
        type: "short-answer",
        question: "Solve for x: 2x + 5 = 13",
        correctAnswer: "x = 4",
        explanation: "Subtract 5 from both sides: 2x = 8, then divide by 2: x = 4",
        difficulty: "easy",
        points: 3
      },
      {
        id: "q3",
        type: "true-false",
        question: "The quadratic formula can be used to solve any quadratic equation.",
        correctAnswer: "True",
        explanation: "The quadratic formula works for all quadratic equations, even when factoring is difficult.",
        difficulty: "easy",
        points: 2
      },
      {
        id: "q4",
        type: "essay",
        question: "Explain the relationship between algebra and geometry. Provide at least two examples.",
        correctAnswer: "Sample response covering coordinate geometry, graphing functions, and geometric proofs using algebraic methods.",
        difficulty: "hard",
        points: 15
      },
      {
        id: "q5",
        type: "multiple-choice",
        question: "Which of the following is equivalent to (x + 3)²?",
        options: ["x² + 6x + 9", "x² + 3x + 9", "x² + 6x + 6", "x² + 9"],
        correctAnswer: "x² + 6x + 9",
        explanation: "(x + 3)² = (x + 3)(x + 3) = x² + 3x + 3x + 9 = x² + 6x + 9",
        difficulty: "medium",
        points: 4
      }
    ];
    
    setQuestions(mockQuestions);
    setSelectedQuestions(mockQuestions.map(q => q.id));
    setIsGenerating(false);
  };

  const handleQuestionSelect = (questionId: string, checked: boolean) => {
    if (checked) {
      setSelectedQuestions([...selectedQuestions, questionId]);
    } else {
      setSelectedQuestions(selectedQuestions.filter(id => id !== questionId));
    }
  };

  const getSelectedQuestions = () => {
    return questions.filter(q => selectedQuestions.includes(q.id));
  };

  const getTotalPoints = () => {
    return getSelectedQuestions().reduce((total, q) => total + q.points, 0);
  };

  const getDifficultyBreakdown = () => {
    const selected = getSelectedQuestions();
    const total = selected.length;
    if (total === 0) return { easy: 0, medium: 0, hard: 0 };

    const counts = {
      easy: selected.filter(q => q.difficulty === 'easy').length,
      medium: selected.filter(q => q.difficulty === 'medium').length,
      hard: selected.filter(q => q.difficulty === 'hard').length
    };

    return {
      easy: Math.round((counts.easy / total) * 100),
      medium: Math.round((counts.medium / total) * 100),
      hard: Math.round((counts.hard / total) * 100)
    };
  };

  const handleRegenerateClick = () => {
    if (questions.length > 0) {
      setShowRegenerateWarning(true);
    } else {
      handleGenerateQuestions();
    }
  };

  const handleConfirmRegenerate = () => {
    setShowRegenerateWarning(false);
    handleGenerateQuestions();
  };

  return (
    <div className="space-y-6">
      {onBackToDashboard && (
        <BackToDashboard onClick={onBackToDashboard} />
      )}

      <PageHeader
        title="Assessment Generator"
        description="Generate quizzes and assessments with AI"
        breadcrumbs={[
          { label: "Dashboard", onClick: onBackToDashboard },
          { label: "Assessment Generator" }
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileQuestion className="h-6 w-6 text-green-600" />
            Precision Assessment Generator
          </CardTitle>
          <p className="text-gray-600">Create customized quizzes and tests with AI-powered question generation.</p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="setup" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="setup">Setup</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Assessment Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Assessment Title</label>
                  <Input
                    placeholder="e.g., Chapter 5 Quiz"
                    value={assessmentData.title}
                    onChange={(e) => setAssessmentData({...assessmentData, title: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Subject</label>
                    <Select value={assessmentData.subject} onValueChange={(value) => setAssessmentData({...assessmentData, subject: value})}>
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
                    <Select value={assessmentData.grade} onValueChange={(value) => setAssessmentData({...assessmentData, grade: value})}>
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
                    <label className="text-sm font-medium mb-2 block">Assessment Type</label>
                    <Select value={assessmentData.type} onValueChange={(value) => setAssessmentData({...assessmentData, type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {assessmentTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Duration</label>
                    <Select value={assessmentData.duration} onValueChange={(value) => setAssessmentData({...assessmentData, duration: value})}>
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
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Instructions & Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Assessment Instructions</label>
                  <Textarea
                    placeholder="Instructions for students taking this assessment..."
                    value={assessmentData.instructions}
                    onChange={(e) => setAssessmentData({...assessmentData, instructions: e.target.value})}
                    rows={4}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Total Points</label>
                  <Input
                    type="number"
                    placeholder="100"
                    value={assessmentData.totalPoints}
                    onChange={(e) => setAssessmentData({...assessmentData, totalPoints: parseInt(e.target.value) || 100})}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="requirements" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Question Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Multiple Choice</label>
                    <Input
                      type="number"
                      value={requirements.multipleChoice}
                      onChange={(e) => setRequirements({...requirements, multipleChoice: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Short Answer</label>
                    <Input
                      type="number"
                      value={requirements.shortAnswer}
                      onChange={(e) => setRequirements({...requirements, shortAnswer: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Essay Questions</label>
                    <Input
                      type="number"
                      value={requirements.essay}
                      onChange={(e) => setRequirements({...requirements, essay: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">True/False</label>
                    <Input
                      type="number"
                      value={requirements.trueFalse}
                      onChange={(e) => setRequirements({...requirements, trueFalse: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Difficulty Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Easy Questions (%)</label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={requirements.difficulty.easy}
                    onChange={(e) => setRequirements({
                      ...requirements, 
                      difficulty: { ...requirements.difficulty, easy: parseInt(e.target.value) || 0 }
                    })}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Medium Questions (%)</label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={requirements.difficulty.medium}
                    onChange={(e) => setRequirements({
                      ...requirements, 
                      difficulty: { ...requirements.difficulty, medium: parseInt(e.target.value) || 0 }
                    })}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Hard Questions (%)</label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={requirements.difficulty.hard}
                    onChange={(e) => setRequirements({
                      ...requirements, 
                      difficulty: { ...requirements.difficulty, hard: parseInt(e.target.value) || 0 }
                    })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Button 
                onClick={handleGenerateQuestions}
                disabled={!assessmentData.title || !assessmentData.subject || isGenerating}
                className="w-full h-12 text-lg"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Generating Questions...
                  </>
                ) : (
                  <>
                    <Zap className="h-5 w-5 mr-3" />
                    Generate AI Questions
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="questions" className="space-y-6">
          {questions.length > 0 && (
            <>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-semibold">Generated Questions</h3>
                  <Badge variant="outline">
                    {selectedQuestions.length} of {questions.length} selected
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Total Points: {getTotalPoints()}</span>
                  <Button variant="outline" size="sm" onClick={handleRegenerateClick}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                </div>
              </div>

              <div className="grid gap-4">
                {questions.map((question, index) => (
                  <Card key={question.id} className={`transition-all ${selectedQuestions.includes(question.id) ? 'ring-2 ring-blue-500' : ''}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Checkbox
                            checked={selectedQuestions.includes(question.id)}
                            onCheckedChange={(checked) => handleQuestionSelect(question.id, checked as boolean)}
                          />
                          <div>
                            <CardTitle className="text-base">Question {index + 1}</CardTitle>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {question.type.replace('-', ' ')}
                              </Badge>
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${
                                  question.difficulty === 'easy' ? 'text-green-600' :
                                  question.difficulty === 'medium' ? 'text-yellow-600' : 'text-red-600'
                                }`}
                              >
                                {question.difficulty}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {question.points} pts
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="font-medium">{question.question}</p>
                        
                        {question.options && (
                          <div className="space-y-1">
                            {question.options.map((option, optIndex) => (
                              <div 
                                key={optIndex} 
                                className={`p-2 rounded text-sm ${
                                  option === question.correctAnswer ? 'bg-green-50 text-green-800 font-medium' : 'bg-gray-50'
                                }`}
                              >
                                {String.fromCharCode(65 + optIndex)}. {option}
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {question.type === 'short-answer' && (
                          <div className="p-2 bg-green-50 text-green-800 text-sm rounded">
                            <strong>Answer:</strong> {question.correctAnswer}
                          </div>
                        )}
                        
                        {question.type === 'true-false' && (
                          <div className="p-2 bg-green-50 text-green-800 text-sm rounded">
                            <strong>Answer:</strong> {question.correctAnswer}
                          </div>
                        )}
                        
                        {question.explanation && (
                          <div className="p-2 bg-blue-50 text-blue-800 text-sm rounded">
                            <strong>Explanation:</strong> {question.explanation}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          {getSelectedQuestions().length > 0 && (
            <>
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{assessmentData.title}</h2>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                  </Button>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Assessment
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <FileQuestion className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Questions</div>
                    <div className="font-semibold">{getSelectedQuestions().length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Target className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Total Points</div>
                    <div className="font-semibold">{getTotalPoints()}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Clock className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Duration</div>
                    <div className="font-semibold">{assessmentData.duration}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <CheckCircle className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Difficulty</div>
                    <div className="font-semibold text-xs">
                      E: {getDifficultyBreakdown().easy}% M: {getDifficultyBreakdown().medium}% H: {getDifficultyBreakdown().hard}%
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Assessment Preview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-semibold mb-2">{assessmentData.title}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div><strong>Subject:</strong> {assessmentData.subject}</div>
                      <div><strong>Grade:</strong> {assessmentData.grade}</div>
                      <div><strong>Duration:</strong> {assessmentData.duration}</div>
                      <div><strong>Points:</strong> {getTotalPoints()}</div>
                    </div>
                    {assessmentData.instructions && (
                      <div className="mt-3">
                        <strong>Instructions:</strong> {assessmentData.instructions}
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    {getSelectedQuestions().map((question, index) => (
                      <div key={question.id} className="border-l-4 border-gray-200 pl-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">Question {index + 1}</h4>
                          <Badge variant="outline">{question.points} pts</Badge>
                        </div>
                        <p className="mb-3">{question.question}</p>
                        
                        {question.options && (
                          <div className="space-y-1 ml-4">
                            {question.options.map((option, optIndex) => (
                              <div key={optIndex} className="text-sm">
                                {String.fromCharCode(65 + optIndex)}. {option}
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {(question.type === 'short-answer' || question.type === 'essay') && (
                          <div className="ml-4 mt-2">
                            <div className="border border-gray-300 rounded p-3 bg-gray-50 text-gray-500 text-sm">
                              Answer space...
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>

      {/* Regenerate Confirmation Dialog */}
      <AlertDialog open={showRegenerateWarning} onOpenChange={setShowRegenerateWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Regenerate Questions?</AlertDialogTitle>
            <AlertDialogDescription>
              This will replace all current questions with a new set of AI-generated questions.
              Any customizations or edits you've made will be lost. Are you sure you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmRegenerate} className="bg-orange-600 hover:bg-orange-700">
              Regenerate Questions
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AssessmentGenerator;