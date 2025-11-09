import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, Target, TrendingUp, CheckCircle, AlertCircle, 
  Clock, Users, MessageSquare, BookOpen, Lightbulb, Edit3,
  Calendar, Save, Download, RotateCcw, PlusCircle
} from "lucide-react";

interface Chapter {
  id: string;
  title: string;
  wordCount: number;
  targetWords: number;
  status: 'not-started' | 'in-progress' | 'draft' | 'review' | 'completed';
  lastModified: string;
  content: string;
  comments: Comment[];
}

interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
  resolved: boolean;
}

interface WritingGoal {
  id: string;
  type: 'daily' | 'weekly' | 'chapter';
  target: number;
  current: number;
  deadline: string;
  description: string;
}

const ThesisWritingAssistant = () => {
  const [activeChapter, setActiveChapter] = useState<string | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([
    {
      id: "1",
      title: "Introduction",
      wordCount: 2400,
      targetWords: 3000,
      status: "in-progress",
      lastModified: "2024-01-20",
      content: "The rapid advancement of artificial intelligence in educational technology has transformed...",
      comments: [
        {
          id: "c1",
          author: "Dr. Smith",
          text: "Consider adding more recent statistics here",
          timestamp: "2024-01-19",
          resolved: false
        }
      ]
    },
    {
      id: "2",
      title: "Literature Review",
      wordCount: 5200,
      targetWords: 8000,
      status: "draft",
      lastModified: "2024-01-18",
      content: "This chapter provides a comprehensive review of existing literature...",
      comments: []
    },
    {
      id: "3",
      title: "Methodology",
      wordCount: 0,
      targetWords: 4000,
      status: "not-started",
      lastModified: "",
      content: "",
      comments: []
    }
  ]);

  const [writingGoals, setWritingGoals] = useState<WritingGoal[]>([
    {
      id: "1",
      type: "daily",
      target: 500,
      current: 320,
      deadline: "2024-01-21",
      description: "Daily writing target"
    },
    {
      id: "2",
      type: "weekly",
      target: 3000,
      current: 1800,
      deadline: "2024-01-28",
      description: "Weekly writing goal"
    }
  ]);

  const [writingSession, setWritingSession] = useState({
    isActive: false,
    startTime: null as Date | null,
    wordsAtStart: 0,
    currentWords: 0
  });

  const [suggestions, setSuggestions] = useState([
    "Consider adding transition sentences between paragraphs",
    "The argument in paragraph 3 could be strengthened with additional evidence",
    "Check for passive voice usage in the methodology section"
  ]);

  const totalWords = chapters.reduce((sum, ch) => sum + ch.wordCount, 0);
  const totalTargetWords = chapters.reduce((sum, ch) => sum + ch.targetWords, 0);
  const overallProgress = (totalWords / totalTargetWords) * 100;

  const getStatusColor = (status: Chapter['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'review': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const startWritingSession = () => {
    setWritingSession({
      isActive: true,
      startTime: new Date(),
      wordsAtStart: totalWords,
      currentWords: totalWords
    });
  };

  const endWritingSession = () => {
    setWritingSession({
      isActive: false,
      startTime: null,
      wordsAtStart: 0,
      currentWords: 0
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Thesis Writing Assistant
          </CardTitle>
          <p className="text-muted-foreground">
            AI-powered thesis writing support with progress tracking and collaboration tools
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="chapters">Chapters</TabsTrigger>
          <TabsTrigger value="goals">Goals & Progress</TabsTrigger>
          <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
          <TabsTrigger value="ai-assistant">AI Assistant</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Overall Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Total Words</span>
                    <span className="font-semibold">{totalWords.toLocaleString()} / {totalTargetWords.toLocaleString()}</span>
                  </div>
                  <Progress value={overallProgress} className="h-3" />
                  <div className="text-sm text-muted-foreground">
                    {Math.round(overallProgress)}% complete
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Daily Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Words Today</span>
                    <span className="font-semibold">{writingGoals[0]?.current} / {writingGoals[0]?.target}</span>
                  </div>
                  <Progress value={(writingGoals[0]?.current / writingGoals[0]?.target) * 100} className="h-3" />
                  <div className="text-sm text-muted-foreground">
                    {writingGoals[0]?.target - writingGoals[0]?.current} words remaining
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Writing Session
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!writingSession.isActive ? (
                  <Button onClick={startWritingSession} className="w-full">
                    Start Writing Session
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {writingSession.startTime && Math.floor((new Date().getTime() - writingSession.startTime.getTime()) / 60000)}min
                      </div>
                      <div className="text-sm text-muted-foreground">Active session</div>
                    </div>
                    <Button onClick={endWritingSession} variant="outline" className="w-full">
                      End Session
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Chapter Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {chapters.map(chapter => (
                    <div key={chapter.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{chapter.title}</span>
                          <Badge className={getStatusColor(chapter.status)}>
                            {chapter.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {chapter.wordCount.toLocaleString()} / {chapter.targetWords.toLocaleString()} words
                        </div>
                        <Progress value={(chapter.wordCount / chapter.targetWords) * 100} className="h-2 mt-1" />
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setActiveChapter(chapter.id)}>
                        <Edit3 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  AI Writing Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {suggestions.map((suggestion, index) => (
                    <div key={index} className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                      <p className="text-sm">{suggestion}</p>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline" className="text-xs">
                          Apply
                        </Button>
                        <Button size="sm" variant="ghost" className="text-xs">
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="chapters" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Chapter Management</h3>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Chapter
            </Button>
          </div>

          <div className="grid gap-6">
            {chapters.map(chapter => (
              <Card key={chapter.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {chapter.title}
                        <Badge className={getStatusColor(chapter.status)}>
                          {chapter.status.replace('-', ' ')}
                        </Badge>
                      </CardTitle>
                      <div className="text-sm text-muted-foreground mt-1">
                        Last modified: {chapter.lastModified || 'Never'}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Word Count Progress</label>
                      <div className="flex justify-between text-sm text-muted-foreground mb-1">
                        <span>{chapter.wordCount.toLocaleString()} words</span>
                        <span>Target: {chapter.targetWords.toLocaleString()}</span>
                      </div>
                      <Progress value={(chapter.wordCount / chapter.targetWords) * 100} />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Status</label>
                      <select className="w-full mt-1 p-2 border rounded-md">
                        <option value="not-started">Not Started</option>
                        <option value="in-progress">In Progress</option>
                        <option value="draft">Draft Complete</option>
                        <option value="review">Under Review</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Content</label>
                    <Textarea
                      value={chapter.content}
                      onChange={(e) => {
                        const newChapters = chapters.map(ch =>
                          ch.id === chapter.id 
                            ? { ...ch, content: e.target.value, wordCount: e.target.value.split(' ').length }
                            : ch
                        );
                        setChapters(newChapters);
                      }}
                      className="min-h-[200px] mt-1"
                      placeholder="Start writing your chapter content here..."
                    />
                  </div>

                  {chapter.comments.length > 0 && (
                    <div>
                      <label className="text-sm font-medium">Comments & Feedback</label>
                      <div className="space-y-2 mt-2">
                        {chapter.comments.map(comment => (
                          <div key={comment.id} className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-medium text-sm">{comment.author}</span>
                              <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                            </div>
                            <p className="text-sm">{comment.text}</p>
                            <Button size="sm" variant="outline" className="mt-2 text-xs">
                              Mark as Resolved
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Writing Goals & Milestones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {writingGoals.map(goal => (
                  <Card key={goal.id} className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold capitalize">{goal.type} Goal</h3>
                      <Badge variant={goal.current >= goal.target ? "default" : "secondary"}>
                        {Math.round((goal.current / goal.target) * 100)}%
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{goal.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{goal.current} / {goal.target} words</span>
                      </div>
                      <Progress value={(goal.current / goal.target) * 100} />
                      <div className="text-xs text-muted-foreground">
                        Deadline: {goal.deadline}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="p-4">
                <h3 className="font-semibold mb-4">Set New Goal</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <select className="p-2 border rounded-md">
                    <option>Daily Goal</option>
                    <option>Weekly Goal</option>
                    <option>Chapter Goal</option>
                  </select>
                  <Input placeholder="Target words" type="number" />
                  <Input placeholder="Deadline" type="date" />
                </div>
                <Button className="mt-4">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Goal
                </Button>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="collaboration" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Supervisor Communication
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Dr. Sarah Wilson</span>
                    <span className="text-sm text-muted-foreground">2 hours ago</span>
                  </div>
                  <p className="text-sm mb-3">
                    Great progress on Chapter 2! Please revise the methodology section and schedule our next meeting.
                  </p>
                  <Button size="sm" variant="outline">
                    Reply
                  </Button>
                </div>
                
                <div className="border rounded-lg p-4">
                  <Textarea placeholder="Send a message to your supervisor..." className="mb-3" />
                  <Button size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Meetings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">Thesis Progress Review</span>
                    <Badge variant="outline">Tomorrow</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">With Dr. Sarah Wilson</p>
                  <p className="text-sm text-muted-foreground">10:00 AM - 11:00 AM</p>
                </div>
                
                <Button variant="outline" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule New Meeting
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai-assistant" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                AI Writing Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-4">
                  <h3 className="font-semibold mb-3">Grammar & Style Checker</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Analyze your writing for grammar, style, and academic tone
                  </p>
                  <Button variant="outline" className="w-full">
                    Run Analysis
                  </Button>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold mb-3">Paraphrasing Assistant</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Rephrase sentences while maintaining meaning and avoiding plagiarism
                  </p>
                  <Button variant="outline" className="w-full">
                    Open Paraphraser
                  </Button>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold mb-3">Abstract Generator</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Generate structured abstracts from your thesis content
                  </p>
                  <Button variant="outline" className="w-full">
                    Generate Abstract
                  </Button>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold mb-3">Argument Analyzer</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Evaluate the strength and coherence of your arguments
                  </p>
                  <Button variant="outline" className="w-full">
                    Analyze Arguments
                  </Button>
                </Card>
              </div>

              <Card className="p-4">
                <h3 className="font-semibold mb-3">AI Writing Chat</h3>
                <div className="h-64 border rounded-lg p-4 mb-4 bg-gray-50">
                  <p className="text-sm text-muted-foreground">
                    AI chat interface for writing assistance will appear here...
                  </p>
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Ask the AI assistant for writing help..." className="flex-1" />
                  <Button>Send</Button>
                </div>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ThesisWritingAssistant;