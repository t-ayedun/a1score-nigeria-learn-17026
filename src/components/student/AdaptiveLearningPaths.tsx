
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, Target, Clock, Star, TrendingUp, BookOpen, 
  Calculator, FlaskConical, Globe, Award, Zap, CheckCircle 
} from "lucide-react";

interface LearningPath {
  id: string;
  subject: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  progress: number;
  topics: Topic[];
  icon: any;
  color: string;
  prerequisites?: string[];
  skills: string[];
}

interface Topic {
  id: string;
  name: string;
  completed: boolean;
  difficulty: number;
  estimatedMinutes: number;
  type: 'lesson' | 'practice' | 'quiz' | 'project';
}

interface UserStats {
  totalHours: number;
  completedPaths: number;
  currentStreak: number;
  strongSubjects: string[];
  improvementAreas: string[];
  weeklyGoal: number;
  weeklyProgress: number;
}

const AdaptiveLearningPaths = () => {
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
  const [userStats, setUserStats] = useState<UserStats>({
    totalHours: 47,
    completedPaths: 3,
    currentStreak: 12,
    strongSubjects: ['Mathematics', 'Physics'],
    improvementAreas: ['Chemistry', 'English Essays'],
    weeklyGoal: 15,
    weeklyProgress: 8
  });

  const learningPaths: LearningPath[] = [
    {
      id: 'jamb-math',
      subject: 'Mathematics',
      title: 'JAMB Mathematics Mastery',
      description: 'Complete preparation for JAMB Mathematics with adaptive practice',
      difficulty: 'Intermediate',
      estimatedTime: '6 weeks',
      progress: 65,
      icon: Calculator,
      color: 'bg-blue-100 text-blue-700 border-blue-200',
      prerequisites: ['Basic Algebra', 'Geometry Fundamentals'],
      skills: ['Algebra', 'Geometry', 'Trigonometry', 'Statistics'],
      topics: [
        { id: '1', name: 'Algebraic Expressions', completed: true, difficulty: 3, estimatedMinutes: 45, type: 'lesson' },
        { id: '2', name: 'Quadratic Equations', completed: true, difficulty: 4, estimatedMinutes: 60, type: 'practice' },
        { id: '3', name: 'Geometry - Angles & Triangles', completed: false, difficulty: 3, estimatedMinutes: 50, type: 'lesson' },
        { id: '4', name: 'Trigonometry Basics', completed: false, difficulty: 5, estimatedMinutes: 75, type: 'quiz' },
        { id: '5', name: 'Statistics & Probability', completed: false, difficulty: 4, estimatedMinutes: 55, type: 'project' }
      ]
    },
    {
      id: 'waec-physics',
      subject: 'Physics',
      title: 'WAEC Physics Excellence',
      description: 'Master all WAEC Physics topics with practical applications',
      difficulty: 'Advanced',
      estimatedTime: '8 weeks',
      progress: 45,
      icon: Zap,
      color: 'bg-purple-100 text-purple-700 border-purple-200',
      prerequisites: ['Basic Mathematics', 'Scientific Method'],
      skills: ['Mechanics', 'Electricity', 'Waves', 'Modern Physics'],
      topics: [
        { id: '1', name: 'Motion & Forces', completed: true, difficulty: 4, estimatedMinutes: 70, type: 'lesson' },
        { id: '2', name: 'Energy & Power', completed: false, difficulty: 4, estimatedMinutes: 65, type: 'practice' },
        { id: '3', name: 'Electricity & Magnetism', completed: false, difficulty: 5, estimatedMinutes: 90, type: 'lesson' },
        { id: '4', name: 'Waves & Sound', completed: false, difficulty: 4, estimatedMinutes: 55, type: 'quiz' }
      ]
    },
    {
      id: 'english-mastery',
      subject: 'English',
      title: 'English Language Proficiency',
      description: 'Improve grammar, essay writing, and literature comprehension',
      difficulty: 'Beginner',
      estimatedTime: '5 weeks',
      progress: 30,
      icon: Globe,
      color: 'bg-green-100 text-green-700 border-green-200',
      skills: ['Grammar', 'Essay Writing', 'Comprehension', 'Literature'],
      topics: [
        { id: '1', name: 'Grammar Fundamentals', completed: true, difficulty: 2, estimatedMinutes: 40, type: 'lesson' },
        { id: '2', name: 'Essay Structure', completed: false, difficulty: 3, estimatedMinutes: 50, type: 'practice' },
        { id: '3', name: 'Reading Comprehension', completed: false, difficulty: 3, estimatedMinutes: 45, type: 'quiz' },
        { id: '4', name: 'Literature Analysis', completed: false, difficulty: 4, estimatedMinutes: 60, type: 'project' }
      ]
    },
    {
      id: 'chemistry-basics',
      subject: 'Chemistry',
      title: 'Chemistry Foundation',
      description: 'Build strong fundamentals in chemical concepts and reactions',
      difficulty: 'Intermediate',
      estimatedTime: '7 weeks',
      progress: 20,
      icon: FlaskConical,
      color: 'bg-orange-100 text-orange-700 border-orange-200',
      prerequisites: ['Basic Mathematics', 'Scientific Method'],
      skills: ['Atomic Structure', 'Chemical Bonding', 'Reactions', 'Organic Chemistry'],
      topics: [
        { id: '1', name: 'Atomic Structure', completed: false, difficulty: 4, estimatedMinutes: 60, type: 'lesson' },
        { id: '2', name: 'Chemical Bonding', completed: false, difficulty: 5, estimatedMinutes: 75, type: 'practice' },
        { id: '3', name: 'Chemical Reactions', completed: false, difficulty: 4, estimatedMinutes: 65, type: 'quiz' },
        { id: '4', name: 'Organic Chemistry Intro', completed: false, difficulty: 5, estimatedMinutes: 80, type: 'project' }
      ]
    }
  ];

  const getRecommendedPaths = () => {
    // AI-based recommendations based on user performance and goals
    return learningPaths.filter(path => {
      // Recommend paths in improvement areas
      if (userStats.improvementAreas.some(area => path.subject.includes(area))) {
        return true;
      }
      // Recommend intermediate paths for strong subjects
      if (userStats.strongSubjects.includes(path.subject) && path.difficulty === 'Intermediate') {
        return true;
      }
      return false;
    }).slice(0, 2);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lesson': return BookOpen;
      case 'practice': return Target;
      case 'quiz': return Brain;
      case 'project': return Star;
      default: return BookOpen;
    }
  };

  const startLearningPath = (path: LearningPath) => {
    setSelectedPath(path);
    // Here you would typically navigate to the learning interface
    console.log('Starting learning path:', path.title);
  };

  const markTopicComplete = (pathId: string, topicId: string) => {
    // Update topic completion status
    console.log('Marking topic complete:', pathId, topicId);
    // This would typically update the backend and local state
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-600" />
            🎯 Adaptive Learning Paths
          </CardTitle>
          <p className="text-gray-600">
            Personalized study paths that adapt to your performance and learning style
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="recommended" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="recommended">🎯 Recommended</TabsTrigger>
          <TabsTrigger value="all">📚 All Paths</TabsTrigger>
          <TabsTrigger value="progress">📊 My Progress</TabsTrigger>
          <TabsTrigger value="stats">📈 Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="recommended" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🤖 AI Recommendations for You</CardTitle>
              <p className="text-gray-600">Based on your performance and goals</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {getRecommendedPaths().map((path) => {
                  const Icon = path.icon;
                  return (
                    <Card key={path.id} className={`border-2 ${path.color}`}>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <Icon className="h-5 w-5" />
                              <Badge variant="secondary">{path.subject}</Badge>
                            </div>
                            <Badge className={getDifficultyColor(path.difficulty)}>
                              {path.difficulty}
                            </Badge>
                          </div>
                          
                          <div>
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
                          
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {path.estimatedTime}
                            </span>
                            <span>{path.topics.length} topics</span>
                          </div>
                          
                          <Button 
                            onClick={() => startLearningPath(path)}
                            className="w-full"
                            variant={path.progress > 0 ? "default" : "outline"}
                          >
                            {path.progress > 0 ? "Continue Learning" : "Start Path"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {learningPaths.map((path) => {
              const Icon = path.icon;
              return (
                <Card key={path.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="h-5 w-5 text-gray-600" />
                          <Badge variant="secondary">{path.subject}</Badge>
                        </div>
                        <Badge className={getDifficultyColor(path.difficulty)}>
                          {path.difficulty}
                        </Badge>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold">{path.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{path.description}</p>
                      </div>
                      
                      {path.progress > 0 && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{path.progress}%</span>
                          </div>
                          <Progress value={path.progress} className="h-2" />
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-1">
                        {path.skills.slice(0, 3).map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button 
                        onClick={() => startLearningPath(path)}
                        className="w-full"
                        size="sm"
                      >
                        {path.progress > 0 ? "Continue" : "Start"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {learningPaths.filter(p => p.progress > 0).map((path) => {
              const Icon = path.icon;
              return (
                <Card key={path.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="h-5 w-5" />
                        <CardTitle className="text-lg">{path.title}</CardTitle>
                      </div>
                      <Badge className={getDifficultyColor(path.difficulty)}>
                        {path.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Overall Progress</span>
                          <span>{path.progress}%</span>
                        </div>
                        <Progress value={path.progress} className="h-3" />
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Topics</h4>
                        {path.topics.map((topic) => {
                          const TypeIcon = getTypeIcon(topic.type);
                          return (
                            <div key={topic.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <div className="flex items-center gap-2">
                                <TypeIcon className="h-4 w-4 text-gray-400" />
                                <span className="text-sm">{topic.name}</span>
                                {topic.completed && <CheckCircle className="h-4 w-4 text-green-500" />}
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {topic.estimatedMinutes}m
                              </Badge>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">{userStats.totalHours}</p>
                    <p className="text-sm text-gray-600">Total Hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">{userStats.completedPaths}</p>
                    <p className="text-sm text-gray-600">Completed Paths</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="text-2xl font-bold">{userStats.currentStreak}</p>
                    <p className="text-sm text-gray-600">Day Streak</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-2xl font-bold">{userStats.weeklyProgress}/{userStats.weeklyGoal}</p>
                    <p className="text-sm text-gray-600">Weekly Goal</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>📊 Learning Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2 text-green-700">💪 Strong Subjects</h4>
                  <div className="space-y-2">
                    {userStats.strongSubjects.map((subject, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-green-50 rounded">
                        <span className="text-sm">{subject}</span>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          Strong
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 text-orange-700">📈 Improvement Areas</h4>
                  <div className="space-y-2">
                    {userStats.improvementAreas.map((area, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-orange-50 rounded">
                        <span className="text-sm">{area}</span>
                        <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                          Focus
                        </Badge>
                      </div>
                    ))}
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

export default AdaptiveLearningPaths;
