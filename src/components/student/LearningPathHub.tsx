import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Target, Clock, TrendingUp, Star, ChevronRight, Play, CheckCircle } from "lucide-react";

interface LearningPath {
  id: string;
  title: string;
  description: string;
  subject: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  progress: number;
  modules: Module[];
  prerequisites?: string[];
  outcomes: string[];
  color: string;
}

interface Module {
  id: string;
  title: string;
  type: 'tutorial' | 'practice' | 'quiz' | 'project';
  duration: number;
  completed: boolean;
  locked: boolean;
}

const LearningPathHub = () => {
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);

  const learningPaths: LearningPath[] = [
    {
      id: 'jamb-math-mastery',
      title: 'JAMB Mathematics Mastery',
      description: 'Complete preparation path for JAMB mathematics, covering all topics with practice tests',
      subject: 'Mathematics',
      difficulty: 'intermediate',
      estimatedTime: 240,
      progress: 45,
      color: 'from-blue-500 to-blue-600',
      prerequisites: ['Basic Algebra', 'Number Systems'],
      outcomes: [
        'Score 80+ on JAMB Mathematics',
        'Master all JAMB math topics',
        'Build problem-solving confidence'
      ],
      modules: [
        { id: '1', title: 'Number & Numeration', type: 'tutorial', duration: 30, completed: true, locked: false },
        { id: '2', title: 'Algebraic Processes', type: 'tutorial', duration: 45, completed: true, locked: false },
        { id: '3', title: 'Practice: Algebra Problems', type: 'practice', duration: 20, completed: false, locked: false },
        { id: '4', title: 'Geometric Concepts', type: 'tutorial', duration: 40, completed: false, locked: false },
        { id: '5', title: 'Trigonometry Basics', type: 'tutorial', duration: 35, completed: false, locked: true },
        { id: '6', title: 'Statistics & Probability', type: 'tutorial', duration: 25, completed: false, locked: true },
        { id: '7', title: 'Final Mock Test', type: 'quiz', duration: 60, completed: false, locked: true }
      ]
    },
    {
      id: 'physics-mechanics',
      title: 'Physics: Mechanics Fundamentals',
      description: 'Build strong foundation in physics mechanics with animated explanations and real-world applications',
      subject: 'Physics',
      difficulty: 'intermediate',
      estimatedTime: 180,
      progress: 20,
      color: 'from-purple-500 to-purple-600',
      prerequisites: ['Basic Mathematics', 'Vector Knowledge'],
      outcomes: [
        'Understand motion principles',
        'Solve force and energy problems',
        'Apply physics to real situations'
      ],
      modules: [
        { id: '1', title: 'Motion in One Dimension', type: 'tutorial', duration: 25, completed: true, locked: false },
        { id: '2', title: 'Interactive: Motion Graphs', type: 'tutorial', duration: 20, completed: false, locked: false },
        { id: '3', title: 'Forces and Newton\'s Laws', type: 'tutorial', duration: 35, completed: false, locked: false },
        { id: '4', title: 'Work, Energy & Power', type: 'tutorial', duration: 30, completed: false, locked: true },
        { id: '5', title: 'Lab Simulation Project', type: 'project', duration: 45, completed: false, locked: true },
        { id: '6', title: 'Mechanics Assessment', type: 'quiz', duration: 25, completed: false, locked: true }
      ]
    },
    {
      id: 'chemistry-bonding',
      title: 'Chemical Bonding & Structure',
      description: 'Master chemical bonding through 3D molecular visualizations and interactive simulations',
      subject: 'Chemistry',
      difficulty: 'advanced',
      estimatedTime: 200,
      progress: 0,
      color: 'from-green-500 to-green-600',
      prerequisites: ['Atomic Structure', 'Electron Configuration'],
      outcomes: [
        'Visualize molecular structures',
        'Predict bonding patterns',
        'Understand intermolecular forces'
      ],
      modules: [
        { id: '1', title: 'Ionic Bonding Animation', type: 'tutorial', duration: 30, completed: false, locked: false },
        { id: '2', title: 'Covalent Bond Formation', type: 'tutorial', duration: 35, completed: false, locked: true },
        { id: '3', title: 'Molecular Geometry 3D', type: 'tutorial', duration: 40, completed: false, locked: true },
        { id: '4', title: 'Bonding Practice Lab', type: 'practice', duration: 25, completed: false, locked: true },
        { id: '5', title: 'Intermolecular Forces', type: 'tutorial', duration: 30, completed: false, locked: true },
        { id: '6', title: 'Final Structure Project', type: 'project', duration: 40, completed: false, locked: true }
      ]
    }
  ];

  const getTypeIcon = (type: Module['type']) => {
    switch (type) {
      case 'tutorial': return <Play className="h-4 w-4" />;
      case 'practice': return <Target className="h-4 w-4" />;
      case 'quiz': return <CheckCircle className="h-4 w-4" />;
      case 'project': return <BookOpen className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: Module['type']) => {
    switch (type) {
      case 'tutorial': return 'bg-blue-100 text-blue-700';
      case 'practice': return 'bg-green-100 text-green-700';
      case 'quiz': return 'bg-purple-100 text-purple-700';
      case 'project': return 'bg-orange-100 text-orange-700';
    }
  };

  if (!selectedPath) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            🎯 Smart Learning Paths
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Structured learning journeys designed to help you master subjects step-by-step. Each path includes tutorials, practice, and assessments.
          </p>
        </div>

        {/* Path Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningPaths.map((path) => (
            <motion.div
              key={path.id}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="h-full cursor-pointer hover:shadow-xl transition-all duration-300 group">
                <CardHeader>
                  <div className={`w-full h-2 bg-gradient-to-r ${path.color} rounded-full mb-4`} />
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                        {path.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <Badge variant="secondary">{path.subject}</Badge>
                        <Badge 
                          variant={path.difficulty === 'beginner' ? 'default' : 
                                 path.difficulty === 'intermediate' ? 'secondary' : 'destructive'}
                        >
                          {path.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm leading-relaxed">{path.description}</p>
                  
                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Progress</span>
                      <span className="text-gray-600">{path.progress}%</span>
                    </div>
                    <Progress value={path.progress} className="h-2" />
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <Clock className="h-4 w-4 mx-auto mb-1 text-gray-600" />
                      <div className="text-sm font-medium">{path.estimatedTime}min</div>
                      <div className="text-xs text-gray-500">Total Time</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <BookOpen className="h-4 w-4 mx-auto mb-1 text-gray-600" />
                      <div className="text-sm font-medium">{path.modules.length}</div>
                      <div className="text-xs text-gray-500">Modules</div>
                    </div>
                  </div>

                  {/* Outcomes Preview */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium">You'll Learn:</div>
                    <div className="space-y-1">
                      {path.outcomes.slice(0, 2).map((outcome, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm text-gray-600">
                          <Star className="h-3 w-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <span>{outcome}</span>
                        </div>
                      ))}
                      {path.outcomes.length > 2 && (
                        <div className="text-xs text-gray-500">+{path.outcomes.length - 2} more outcomes</div>
                      )}
                    </div>
                  </div>

                  <Button 
                    className="w-full group-hover:shadow-md transition-shadow"
                    onClick={() => setSelectedPath(path)}
                  >
                    {path.progress > 0 ? 'Continue Path' : 'Start Learning'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold text-blue-600">89%</div>
                <div className="text-sm text-gray-600">Average Success Rate</div>
              </div>
              <div>
                <Clock className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold text-green-600">45min</div>
                <div className="text-sm text-gray-600">Average Study Time</div>
              </div>
              <div>
                <Target className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold text-purple-600">92%</div>
                <div className="text-sm text-gray-600">Path Completion</div>
              </div>
              <div>
                <Star className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                <div className="text-2xl font-bold text-orange-600">4.8</div>
                <div className="text-sm text-gray-600">Student Rating</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Path Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setSelectedPath(null)}
          className="flex items-center gap-2"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
          Back to Paths
        </Button>
        <div className="text-center">
          <h2 className="text-2xl font-bold">{selectedPath.title}</h2>
          <p className="text-gray-600">{selectedPath.subject} • {selectedPath.difficulty}</p>
        </div>
        <div className="text-sm text-gray-500">
          {selectedPath.progress}% Complete
        </div>
      </div>

      {/* Overall Progress */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Learning Progress</h3>
              <Badge className="bg-green-100 text-green-700">
                {selectedPath.modules.filter(m => m.completed).length} of {selectedPath.modules.length} completed
              </Badge>
            </div>
            <Progress value={selectedPath.progress} className="h-3" />
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span>Est. {selectedPath.estimatedTime} minutes total</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-gray-500" />
                <span>{selectedPath.difficulty} level</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-gray-500" />
                <span>{selectedPath.modules.length} modules</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Module List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Learning Modules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedPath.modules.map((module, index) => (
                  <div
                    key={module.id}
                    className={`p-4 rounded-lg border transition-all duration-200 ${
                      module.locked 
                        ? 'bg-gray-50 border-gray-200 opacity-60' 
                        : module.completed 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-sm cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          module.completed 
                            ? 'bg-green-500 text-white' 
                            : module.locked 
                              ? 'bg-gray-300 text-gray-500' 
                              : 'bg-blue-500 text-white'
                        }`}>
                          {module.completed ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <span className="text-sm font-bold">{index + 1}</span>
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{module.title}</div>
                          <div className="text-sm text-gray-600 flex items-center gap-2">
                            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getTypeColor(module.type)}`}>
                              {getTypeIcon(module.type)}
                              {module.type}
                            </div>
                            <span>•</span>
                            <span>{module.duration} min</span>
                          </div>
                        </div>
                      </div>
                      {!module.locked && !module.completed && (
                        <Button size="sm">
                          Start
                        </Button>
                      )}
                      {module.completed && (
                        <Badge variant="outline" className="text-green-600 border-green-300">
                          Completed
                        </Badge>
                      )}
                      {module.locked && (
                        <Badge variant="outline" className="text-gray-500">
                          Locked
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Path Info */}
        <div className="space-y-4">
          {/* Learning Outcomes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Learning Outcomes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {selectedPath.outcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Prerequisites */}
          {selectedPath.prerequisites && selectedPath.prerequisites.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Prerequisites</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {selectedPath.prerequisites.map((prereq, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{prereq}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                <Button className="w-full">
                  Continue Learning
                </Button>
                <Button variant="outline" className="w-full">
                  Download Path Guide
                </Button>
                <Button variant="outline" className="w-full">
                  Track Progress
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LearningPathHub;