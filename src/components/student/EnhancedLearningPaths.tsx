import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, Target, Clock, Star, TrendingUp, BookOpen, 
  Calculator, FlaskConical, Globe, Award, Zap, CheckCircle,
  Play, Pause, RotateCcw, Timer, Lightbulb, Repeat, 
  MessageSquare, PenTool, Eye, Users, Trophy
} from "lucide-react";

interface StudyTechnique {
  id: string;
  name: string;
  description: string;
  icon: any;
  effectiveness: number;
  timeRequired: string;
  bestFor: string[];
  color: string;
}

interface LearningPath {
  id: string;
  subject: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  progress: number;
  recommendedTechniques: string[];
  topics: Topic[];
  icon: any;
  color: string;
}

interface Topic {
  id: string;
  name: string;
  completed: boolean;
  difficulty: number;
  estimatedMinutes: number;
  type: 'lesson' | 'practice' | 'quiz' | 'project';
  recommendedTechnique: string;
}

const EnhancedLearningPaths = () => {
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
  const [selectedTechnique, setSelectedTechnique] = useState<StudyTechnique | null>(null);
  const [pomodoroTimer, setPomodoroTimer] = useState(25 * 60); // 25 minutes
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  const studyTechniques: StudyTechnique[] = [
    {
      id: 'feynman',
      name: 'Feynman Technique',
      description: 'Explain concepts in simple terms as if teaching a child. Identify gaps in understanding and revisit complex areas.',
      icon: MessageSquare,
      effectiveness: 95,
      timeRequired: '15-30 min per topic',
      bestFor: ['Complex concepts', 'Theory understanding', 'Memory retention'],
      color: 'bg-blue-100 text-blue-700 border-blue-200'
    },
    {
      id: 'pomodoro',
      name: 'Pomodoro Technique',
      description: 'Study in focused 25-minute intervals followed by 5-minute breaks. Take longer breaks after 4 sessions.',
      icon: Timer,
      effectiveness: 90,
      timeRequired: '25 min focus + 5 min break',
      bestFor: ['Maintaining focus', 'Large topics', 'Avoiding burnout'],
      color: 'bg-red-100 text-red-700 border-red-200'
    },
    {
      id: 'active-recall',
      name: 'Active Recall',
      description: 'Test yourself frequently without looking at notes. Use flashcards, practice questions, and self-quizzing.',
      icon: Brain,
      effectiveness: 88,
      timeRequired: '10-20 min per session',
      bestFor: ['Facts & formulas', 'Exam preparation', 'Long-term retention'],
      color: 'bg-green-100 text-green-700 border-green-200'
    },
    {
      id: 'spaced-repetition',
      name: 'Spaced Repetition',
      description: 'Review material at increasing intervals. Study today, tomorrow, in 3 days, then weekly.',
      icon: Repeat,
      effectiveness: 85,
      timeRequired: '5-15 min per review',
      bestFor: ['Vocabulary', 'Formulas', 'Key concepts'],
      color: 'bg-purple-100 text-purple-700 border-purple-200'
    },
    {
      id: 'elaborative-interrogation',
      name: 'Elaborative Interrogation',
      description: 'Ask "why" and "how" questions about the material. Connect new information to existing knowledge.',
      icon: Lightbulb,
      effectiveness: 82,
      timeRequired: '10-20 min per topic',
      bestFor: ['Deep understanding', 'Critical thinking', 'Essay subjects'],
      color: 'bg-yellow-100 text-yellow-700 border-yellow-200'
    },
    {
      id: 'dual-coding',
      name: 'Dual Coding',
      description: 'Combine visual and verbal information. Use diagrams, mind maps, and visual representations alongside text.',
      icon: Eye,
      effectiveness: 80,
      timeRequired: '20-30 min per topic',
      bestFor: ['Visual learners', 'Complex processes', 'Science subjects'],
      color: 'bg-orange-100 text-orange-700 border-orange-200'
    }
  ];

  const learningPaths: LearningPath[] = [
    {
      id: 'jamb-math',
      subject: 'Mathematics',
      title: 'JAMB Mathematics Mastery',
      description: 'Master JAMB Math using proven study techniques tailored for mathematical concepts',
      difficulty: 'Intermediate',
      estimatedTime: '6 weeks',
      progress: 65,
      icon: Calculator,
      color: 'bg-blue-100 text-blue-700 border-blue-200',
      recommendedTechniques: ['active-recall', 'spaced-repetition', 'feynman'],
      topics: [
        { id: '1', name: 'Algebraic Expressions', completed: true, difficulty: 3, estimatedMinutes: 45, type: 'lesson', recommendedTechnique: 'feynman' },
        { id: '2', name: 'Quadratic Equations', completed: true, difficulty: 4, estimatedMinutes: 60, type: 'practice', recommendedTechnique: 'active-recall' },
        { id: '3', name: 'Geometry - Angles & Triangles', completed: false, difficulty: 3, estimatedMinutes: 50, type: 'lesson', recommendedTechnique: 'dual-coding' },
        { id: '4', name: 'Trigonometry Basics', completed: false, difficulty: 5, estimatedMinutes: 75, type: 'quiz', recommendedTechnique: 'spaced-repetition' }
      ]
    },
    {
      id: 'waec-physics',
      subject: 'Physics',
      title: 'WAEC Physics Excellence',
      description: 'Master Physics concepts using visualization and active learning techniques',
      difficulty: 'Advanced',
      estimatedTime: '8 weeks',
      progress: 45,
      icon: Zap,
      color: 'bg-purple-100 text-purple-700 border-purple-200',
      recommendedTechniques: ['dual-coding', 'elaborative-interrogation', 'feynman'],
      topics: [
        { id: '1', name: 'Motion & Forces', completed: true, difficulty: 4, estimatedMinutes: 70, type: 'lesson', recommendedTechnique: 'dual-coding' },
        { id: '2', name: 'Energy & Power', completed: false, difficulty: 4, estimatedMinutes: 65, type: 'practice', recommendedTechnique: 'elaborative-interrogation' },
        { id: '3', name: 'Electricity & Magnetism', completed: false, difficulty: 5, estimatedMinutes: 90, type: 'lesson', recommendedTechnique: 'feynman' }
      ]
    },
    {
      id: 'english-mastery',
      subject: 'English',
      title: 'English Language Proficiency',
      description: 'Improve English skills using spaced repetition and elaborative techniques',
      difficulty: 'Beginner',
      estimatedTime: '5 weeks',
      progress: 30,
      icon: Globe,
      color: 'bg-green-100 text-green-700 border-green-200',
      recommendedTechniques: ['spaced-repetition', 'elaborative-interrogation', 'active-recall'],
      topics: [
        { id: '1', name: 'Grammar Fundamentals', completed: true, difficulty: 2, estimatedMinutes: 40, type: 'lesson', recommendedTechnique: 'spaced-repetition' },
        { id: '2', name: 'Essay Structure', completed: false, difficulty: 3, estimatedMinutes: 50, type: 'practice', recommendedTechnique: 'elaborative-interrogation' },
        { id: '3', name: 'Reading Comprehension', completed: false, difficulty: 3, estimatedMinutes: 45, type: 'quiz', recommendedTechnique: 'active-recall' }
      ]
    }
  ];

  const startTechniqueDemo = (techniqueId: string, pathId?: string) => {
    setActiveDemo(techniqueId);
    const technique = studyTechniques.find(t => t.id === techniqueId);
    if (technique) {
      setSelectedTechnique(technique);
      // Switch to demo tab
      setTimeout(() => {
        const demoTab = document.querySelector('[data-value="demo"]') as HTMLElement;
        if (demoTab) {
          demoTab.click();
        }
      }, 100);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-600" />
            🎯 Smart Learning Paths with Study Techniques
          </CardTitle>
          <p className="text-gray-600">
            Experience how effective study techniques enhance your learning journey
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="techniques" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="techniques">🧠 Study Techniques</TabsTrigger>
          <TabsTrigger value="paths">📚 Smart Paths</TabsTrigger>
          <TabsTrigger value="demo">🎮 Interactive Demo</TabsTrigger>
          <TabsTrigger value="analytics">📊 Effectiveness</TabsTrigger>
        </TabsList>

        <TabsContent value="techniques" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {studyTechniques.map((technique) => {
              const Icon = technique.icon;
              return (
                <Card key={technique.id} className={`border-2 ${technique.color} hover:shadow-lg transition-shadow`}>
                  <CardContent className="p-4 h-full">
                    <div className="flex flex-col h-full space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="h-5 w-5" />
                          <Badge variant="secondary">{technique.effectiveness}% effective</Badge>
                        </div>
                        <Badge className="bg-gray-100 text-gray-700">
                          {technique.timeRequired}
                        </Badge>
                      </div>
                      
                      <div className="flex-grow">
                        <h3 className="font-semibold text-lg">{technique.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{technique.description}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Best for:</h4>
                        <div className="flex flex-wrap gap-1">
                          {technique.bestFor.map((item, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-auto pt-2">
                        <Button 
                          onClick={() => startTechniqueDemo(technique.id)}
                          className="w-full"
                          size="sm"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Try This Technique
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="paths" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {learningPaths.map((path) => {
              const Icon = path.icon;
              const recommendedTechs = studyTechniques.filter(t => 
                path.recommendedTechniques.includes(t.id)
              );
              
              return (
                <Card key={path.id} className={`border-2 ${path.color} hover:shadow-lg transition-shadow`}>
                  <CardContent className="p-4 h-full">
                    <div className="flex flex-col h-full space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="h-5 w-5" />
                          <Badge variant="secondary">{path.subject}</Badge>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-700">
                          {path.difficulty}
                        </Badge>
                      </div>
                      
                      <div className="flex-grow">
                        <h3 className="font-semibold">{path.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{path.description}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{path.progress}%</span>
                        </div>
                        <Progress value={path.progress} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Recommended Techniques:</h4>
                        <div className="flex flex-wrap gap-1">
                          {recommendedTechs.slice(0, 2).map((tech) => (
                            <Badge key={tech.id} variant="outline" className="text-xs">
                              {tech.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-auto pt-2">
                        <Button 
                          onClick={() => {
                            setSelectedPath(path);
                            // Switch to demo tab to show the learning path content
                            const demoTab = document.querySelector('[data-value="demo"]') as HTMLElement;
                            if (demoTab) {
                              demoTab.click();
                            }
                          }}
                          className="w-full"
                          variant={path.progress > 0 ? "default" : "outline"}
                        >
                          {path.progress > 0 ? "Continue Learning" : "Start Smart Path"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="demo" className="space-y-4">
          {selectedPath && (
            <Card className={`border-2 ${selectedPath.color}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <selectedPath.icon className="h-6 w-6" />
                  {selectedPath.title} - Interactive Learning
                </CardTitle>
                <p className="text-gray-600">{selectedPath.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedPath.topics.map((topic, index) => {
                    const techniqueForTopic = studyTechniques.find(t => t.id === topic.recommendedTechnique);
                    const TypeIcon = topic.type === 'lesson' ? BookOpen : 
                                   topic.type === 'practice' ? Target :
                                   topic.type === 'quiz' ? Brain : Star;
                    
                    return (
                      <Card key={topic.id} className={`${topic.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50'}`}>
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <TypeIcon className="h-4 w-4" />
                                <span className="font-medium">{topic.name}</span>
                              </div>
                              {topic.completed && <CheckCircle className="h-4 w-4 text-green-500" />}
                            </div>
                            
                            <div className="text-sm text-gray-600">
                              <p>⏱️ {topic.estimatedMinutes} minutes</p>
                              <p>📊 Difficulty: {topic.difficulty}/5</p>
                            </div>
                            
                            {techniqueForTopic && (
                              <div className="bg-white p-3 rounded border">
                                <div className="flex items-center gap-2 mb-2">
                                  <techniqueForTopic.icon className="h-4 w-4" />
                                  <span className="font-medium text-sm">Recommended: {techniqueForTopic.name}</span>
                                </div>
                                <p className="text-xs text-gray-600">{techniqueForTopic.description}</p>
                              </div>
                            )}
                            
                            <Button 
                              size="sm" 
                              className="w-full"
                              variant={topic.completed ? "outline" : "default"}
                              onClick={() => {
                                if (techniqueForTopic) {
                                  setSelectedTechnique(techniqueForTopic);
                                }
                              }}
                            >
                              {topic.completed ? "Review" : `Start with ${techniqueForTopic?.name}`}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
                
                <div className="text-center mt-6">
                  <Button 
                    onClick={() => setSelectedPath(null)}
                    variant="outline"
                  >
                    Choose Different Path
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {selectedTechnique && !selectedPath && (
            <Card className={`border-2 ${selectedTechnique.color}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <selectedTechnique.icon className="h-6 w-6" />
                  {selectedTechnique.name} Demo
                </CardTitle>
                <p className="text-gray-600">{selectedTechnique.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedTechnique.id === 'pomodoro' && (
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="text-center space-y-4">
                      <div className="text-4xl font-bold text-red-600">
                        {formatTime(pomodoroTimer)}
                      </div>
                      <div className="text-sm text-gray-600">
                        Focus Time: Study Mathematics - Quadratic Equations
                      </div>
                      <div className="flex gap-2 justify-center">
                        <Button 
                          onClick={() => setIsTimerRunning(!isTimerRunning)}
                          size="sm"
                          className="bg-red-500 hover:bg-red-600"
                        >
                          {isTimerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          {isTimerRunning ? 'Pause' : 'Start'}
                        </Button>
                        <Button 
                          onClick={() => setPomodoroTimer(25 * 60)}
                          size="sm"
                          variant="outline"
                        >
                          <RotateCcw className="h-4 w-4" />
                          Reset
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTechnique.id === 'feynman' && (
                  <div className="bg-blue-50 p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold">Try explaining: "What is a quadratic equation?"</h4>
                    <div className="bg-white p-3 rounded border">
                      <p className="text-sm text-gray-600 italic">
                        "A quadratic equation is like a mathematical recipe that creates a curved line called a parabola. 
                        It has three ingredients: x², x, and a number. When you solve it, you're finding where this curved line crosses the x-axis..."
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Practice Explaining
                      </Button>
                      <Button size="sm" variant="outline">
                        <Lightbulb className="h-4 w-4 mr-2" />
                        Identify Gaps
                      </Button>
                    </div>
                  </div>
                )}

                {selectedTechnique.id === 'active-recall' && (
                  <div className="bg-green-50 p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold">Quick Quiz: Quadratic Formula</h4>
                    <div className="bg-white p-3 rounded border">
                      <p className="font-medium">What is the quadratic formula?</p>
                      <div className="mt-2 space-y-1">
                        <button className="block w-full text-left p-2 bg-gray-100 rounded hover:bg-gray-200">
                          A) x = (-b ± √(b² - 4ac)) / 2a
                        </button>
                        <button className="block w-full text-left p-2 bg-gray-100 rounded hover:bg-gray-200">
                          B) x = (b ± √(b² + 4ac)) / 2a
                        </button>
                      </div>
                    </div>
                    <Button size="sm" className="bg-green-500 hover:bg-green-600">
                      <Brain className="h-4 w-4 mr-2" />
                      Generate More Questions
                    </Button>
                  </div>
                )}

                {selectedTechnique.id === 'spaced-repetition' && (
                  <div className="bg-purple-50 p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold">Spaced Repetition Schedule</h4>
                    <div className="bg-white p-3 rounded border space-y-2">
                      <div className="flex justify-between items-center p-2 bg-green-100 rounded">
                        <span className="text-sm">Today: Quadratic Formula</span>
                        <Badge className="bg-green-500">✓ Completed</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-yellow-100 rounded">
                        <span className="text-sm">Tomorrow: Review Quadratics</span>
                        <Badge className="bg-yellow-500">Scheduled</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-blue-100 rounded">
                        <span className="text-sm">In 3 days: Practice Problems</span>
                        <Badge className="bg-blue-500">Upcoming</Badge>
                      </div>
                    </div>
                    <Button size="sm" className="bg-purple-500 hover:bg-purple-600">
                      <Repeat className="h-4 w-4 mr-2" />
                      Set Reminder
                    </Button>
                  </div>
                )}

                <div className="text-center">
                  <Button 
                    onClick={() => {
                      setSelectedTechnique(null);
                      setActiveDemo(null);
                    }}
                    variant="outline"
                  >
                    Try Another Technique
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {!selectedTechnique && !selectedPath && (
            <Card>
              <CardContent className="p-8 text-center">
                <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Choose a Study Technique or Learning Path</h3>
                <p className="text-gray-600 mb-4">
                  Experience how each technique works with interactive demonstrations
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {studyTechniques.map((technique) => (
                    <Button
                      key={technique.id}
                      onClick={() => startTechniqueDemo(technique.id)}
                      variant="outline"
                      size="sm"
                    >
                      <technique.icon className="h-4 w-4 mr-2" />
                      {technique.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {studyTechniques.map((technique) => {
              const Icon = technique.icon;
              return (
                <Card key={technique.id}>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="h-5 w-5 text-gray-600" />
                          <span className="font-medium">{technique.name}</span>
                        </div>
                        <Badge variant="secondary">{technique.effectiveness}%</Badge>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Effectiveness</span>
                          <span>{technique.effectiveness}%</span>
                        </div>
                        <Progress value={technique.effectiveness} className="h-2" />
                      </div>
                      
                      <div className="text-xs text-gray-600">
                        <p><strong>Time:</strong> {technique.timeRequired}</p>
                        <p><strong>Best for:</strong> {technique.bestFor.join(', ')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>🏆 Technique Effectiveness Rankings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {studyTechniques
                  .sort((a, b) => b.effectiveness - a.effectiveness)
                  .map((technique, index) => {
                    const Icon = technique.icon;
                    return (
                      <div key={technique.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-yellow-600">#{index + 1}</span>
                          </div>
                          <Icon className="h-5 w-5 text-gray-600" />
                          <span className="font-medium">{technique.name}</span>
                        </div>
                        <Badge variant="secondary">{technique.effectiveness}% effective</Badge>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedLearningPaths;