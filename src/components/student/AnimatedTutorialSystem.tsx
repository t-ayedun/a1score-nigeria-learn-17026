import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, BookOpen, Calculator, FlaskConical, Atom, Code2, Brain } from "lucide-react";

interface TutorialStep {
  id: number;
  title: string;
  description: string;
  animation: string;
  duration: number;
  interactive?: boolean;
}

interface Tutorial {
  id: string;
  title: string;
  subject: string;
  level: string;
  description: string;
  steps: TutorialStep[];
  estimatedTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  icon: any;
  color: string;
}

const AnimatedTutorialSystem = () => {
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(1);

  const tutorials: Tutorial[] = [
    {
      id: 'dsa-binary-search',
      title: 'Binary Search Algorithm',
      subject: 'Data Structures & Algorithms',
      level: 'Undergraduate',
      description: 'Visualize how binary search efficiently finds elements in sorted arrays with O(log n) complexity',
      estimatedTime: 20,
      difficulty: 'intermediate',
      icon: Code2,
      color: 'from-cyan-500 to-blue-600',
      steps: [
        {
          id: 1,
          title: 'Linear Search Review',
          description: 'Understanding the limitation of linear search with O(n) complexity',
          animation: 'linear-search',
          duration: 3000
        },
        {
          id: 2,
          title: 'Binary Search Concept',
          description: 'Learn the divide-and-conquer approach to searching sorted arrays',
          animation: 'binary-search-intro',
          duration: 4000,
          interactive: true
        },
        {
          id: 3,
          title: 'Step-by-Step Execution',
          description: 'Watch how the search space is halved in each iteration',
          animation: 'binary-search-steps',
          duration: 4500,
          interactive: true
        },
        {
          id: 4,
          title: 'Time Complexity Analysis',
          description: 'Understand why binary search is O(log n)',
          animation: 'complexity-analysis',
          duration: 3000
        }
      ]
    },
    {
      id: 'dsa-linked-list',
      title: 'Linked List Operations',
      subject: 'Data Structures & Algorithms',
      level: 'Undergraduate',
      description: 'Visualize node insertion, deletion, and traversal in singly and doubly linked lists',
      estimatedTime: 25,
      difficulty: 'intermediate',
      icon: Code2,
      color: 'from-purple-500 to-pink-600',
      steps: [
        {
          id: 1,
          title: 'Node Structure',
          description: 'Understanding the building block: data and pointer',
          animation: 'node-structure',
          duration: 3000
        },
        {
          id: 2,
          title: 'Insertion Operations',
          description: 'Insert at head, tail, and middle positions',
          animation: 'linked-list-insert',
          duration: 4500,
          interactive: true
        },
        {
          id: 3,
          title: 'Deletion Operations',
          description: 'Remove nodes and update pointers correctly',
          animation: 'linked-list-delete',
          duration: 4000,
          interactive: true
        },
        {
          id: 4,
          title: 'Traversal & Search',
          description: 'Navigate through the list to find elements',
          animation: 'linked-list-traversal',
          duration: 3500
        }
      ]
    },
    {
      id: 'dsa-graph-bfs',
      title: 'Graph Traversal: BFS',
      subject: 'Data Structures & Algorithms',
      level: 'Undergraduate',
      description: 'Visualize Breadth-First Search exploring graphs level by level using queues',
      estimatedTime: 20,
      difficulty: 'intermediate',
      icon: Code2,
      color: 'from-green-500 to-teal-600',
      steps: [
        {
          id: 1,
          title: 'Graph Representation',
          description: 'Understanding adjacency lists and matrices',
          animation: 'graph-representation',
          duration: 3000
        },
        {
          id: 2,
          title: 'Queue Data Structure',
          description: 'Learn how BFS uses FIFO queue for traversal',
          animation: 'queue-concept',
          duration: 3500
        },
        {
          id: 3,
          title: 'BFS Algorithm',
          description: 'Watch nodes being visited level by level',
          animation: 'bfs-traversal',
          duration: 5000,
          interactive: true
        },
        {
          id: 4,
          title: 'Applications',
          description: 'Shortest path, web crawling, and social networks',
          animation: 'bfs-applications',
          duration: 3000
        }
      ]
    },
    {
      id: 'ml-linear-regression',
      title: 'Linear Regression Fundamentals',
      subject: 'Machine Learning',
      level: 'Undergraduate',
      description: 'Visualize how linear regression finds the best-fit line through gradient descent',
      estimatedTime: 22,
      difficulty: 'advanced',
      icon: Brain,
      color: 'from-orange-500 to-red-600',
      steps: [
        {
          id: 1,
          title: 'Problem Setup',
          description: 'Understanding supervised learning and regression tasks',
          animation: 'ml-intro',
          duration: 3000
        },
        {
          id: 2,
          title: 'Cost Function',
          description: 'Visualize Mean Squared Error (MSE) across different line slopes',
          animation: 'cost-function',
          duration: 4500,
          interactive: true
        },
        {
          id: 3,
          title: 'Gradient Descent',
          description: 'Watch the algorithm iteratively minimize the cost function',
          animation: 'gradient-descent',
          duration: 5000,
          interactive: true
        },
        {
          id: 4,
          title: 'Model Evaluation',
          description: 'Assess prediction accuracy with R² and RMSE metrics',
          animation: 'model-evaluation',
          duration: 3500
        }
      ]
    },
    {
      id: 'ml-neural-network',
      title: 'Neural Network Basics',
      subject: 'Machine Learning',
      level: 'Postgraduate',
      description: 'Understand forward propagation and backpropagation in a simple neural network',
      estimatedTime: 28,
      difficulty: 'advanced',
      icon: Brain,
      color: 'from-indigo-500 to-purple-600',
      steps: [
        {
          id: 1,
          title: 'Neuron Structure',
          description: 'Learn about weights, biases, and activation functions',
          animation: 'neuron-structure',
          duration: 3500
        },
        {
          id: 2,
          title: 'Forward Propagation',
          description: 'Watch data flow through layers to generate predictions',
          animation: 'forward-prop',
          duration: 5000,
          interactive: true
        },
        {
          id: 3,
          title: 'Loss Calculation',
          description: 'See how prediction error is quantified',
          animation: 'loss-calc',
          duration: 3000
        },
        {
          id: 4,
          title: 'Backpropagation',
          description: 'Visualize gradient flow and weight updates',
          animation: 'backprop',
          duration: 5500,
          interactive: true
        }
      ]
    },
    {
      id: 'dsa-stack-queue',
      title: 'Stack & Queue Fundamentals',
      subject: 'Data Structures & Algorithms',
      level: 'Undergraduate',
      description: 'Learn LIFO and FIFO data structures with push, pop, enqueue, and dequeue operations',
      estimatedTime: 18,
      difficulty: 'beginner',
      icon: Code2,
      color: 'from-blue-500 to-indigo-600',
      steps: [
        {
          id: 1,
          title: 'Stack Basics (LIFO)',
          description: 'Last In First Out - like a stack of plates',
          animation: 'stack-intro',
          duration: 3000
        },
        {
          id: 2,
          title: 'Stack Operations',
          description: 'Push, Pop, Peek operations with animations',
          animation: 'stack-operations',
          duration: 4000,
          interactive: true
        },
        {
          id: 3,
          title: 'Queue Basics (FIFO)',
          description: 'First In First Out - like a queue at the bank',
          animation: 'queue-intro',
          duration: 3000
        },
        {
          id: 4,
          title: 'Queue Operations',
          description: 'Enqueue, Dequeue operations with animations',
          animation: 'queue-operations',
          duration: 4000,
          interactive: true
        }
      ]
    }
  ];

  const AnimationCanvas = ({ step, tutorial }: { step: TutorialStep; tutorial: Tutorial }) => {
    const [animationProgress, setAnimationProgress] = useState(0);

    useEffect(() => {
      let interval: NodeJS.Timeout;
      if (isPlaying && step.duration > 0) {
        interval = setInterval(() => {
          setAnimationProgress(prev => {
            const newProgress = prev + (100 / (step.duration / 100));
            if (newProgress >= 100) {
              setIsPlaying(false);
              return 100;
            }
            return newProgress;
          });
        }, 100 * animationSpeed);
      }
      return () => clearInterval(interval);
    }, [isPlaying, step.duration, animationSpeed]);

    const renderAnimation = () => {
      // Placeholder animations - these would be replaced with actual animated visualizations
      return (
        <div className="w-full h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
          <div className="text-center p-8">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">{step.title}</h3>
            <p className="text-gray-600 text-sm max-w-md">{step.description}</p>
            <div className="mt-4">
              <Badge variant="outline" className="text-xs">
                Animation: {step.animation}
              </Badge>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="space-y-4">
        {renderAnimation()}
        {step.duration > 0 && (
          <Progress value={animationProgress} className="w-full" />
        )}
      </div>
    );
  };

  if (!selectedTutorial) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🎬 Interactive Learning Studio
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Master complex concepts through interactive visualizations. From DSA to Machine Learning, experience learning that adapts to your level.
          </p>
        </div>

        {/* Tutorial Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map((tutorial) => {
            const Icon = tutorial.icon;
            return (
              <motion.div
                key={tutorial.id}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="h-full cursor-pointer hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${tutorial.color} flex items-center justify-center mb-4`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{tutorial.title}</CardTitle>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="secondary">{tutorial.subject}</Badge>
                      <Badge variant="outline">{tutorial.level}</Badge>
                      <Badge 
                        variant={tutorial.difficulty === 'beginner' ? 'default' : 
                               tutorial.difficulty === 'intermediate' ? 'secondary' : 'destructive'}
                      >
                        {tutorial.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm">{tutorial.description}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>⏱️ {tutorial.estimatedTime} min</span>
                      <span>📚 {tutorial.steps.length} steps</span>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => setSelectedTutorial(tutorial)}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Tutorial
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Coming Soon */}
        <Card className="bg-gradient-to-r from-muted/50 to-muted border-dashed">
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <div className="text-4xl">🚀</div>
              <h3 className="text-xl font-semibold">More Tutorials Coming Soon!</h3>
              <p className="text-muted-foreground">
                We're developing animations for Dynamic Programming, Deep Learning, NLP, and more advanced topics.
              </p>
              <div className="flex justify-center gap-2 mt-4">
                <Badge variant="outline">Dynamic Programming</Badge>
                <Badge variant="outline">Deep Learning</Badge>
                <Badge variant="outline">Computer Vision</Badge>
                <Badge variant="outline">NLP</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentTutorialStep = selectedTutorial.steps[currentStep];

  return (
    <div className="space-y-6">
      {/* Tutorial Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setSelectedTutorial(null)}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Tutorials
        </Button>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {selectedTutorial.steps.length}
          </span>
        </div>
      </div>

      {/* Tutorial Content */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl mb-2">{selectedTutorial.title}</CardTitle>
              <div className="flex gap-2">
                <Badge>{selectedTutorial.subject}</Badge>
                <Badge variant="outline">{selectedTutorial.level}</Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Step */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">{currentTutorialStep.title}</h3>
              <p className="text-muted-foreground">{currentTutorialStep.description}</p>
            </div>

            <AnimationCanvas step={currentTutorialStep} tutorial={selectedTutorial} />
          </div>

          {/* Playback Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="default"
              size="icon"
              onClick={() => setIsPlaying(!isPlaying)}
              disabled={currentTutorialStep.duration === 0}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setProgress(0)}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentStep(Math.min(selectedTutorial.steps.length - 1, currentStep + 1))}
              disabled={currentStep === selectedTutorial.steps.length - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Step Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Tutorial Progress</span>
              <span>{Math.round(((currentStep + 1) / selectedTutorial.steps.length) * 100)}%</span>
            </div>
            <Progress value={((currentStep + 1) / selectedTutorial.steps.length) * 100} />
          </div>
        </CardContent>
      </Card>

      {/* Steps Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Tutorial Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {selectedTutorial.steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(index)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  index === currentStep
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background hover:bg-muted border-border'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    index === currentStep ? 'bg-primary-foreground text-primary' : 'bg-muted'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{step.title}</div>
                    <div className={`text-sm ${
                      index === currentStep ? 'text-primary-foreground/80' : 'text-muted-foreground'
                    }`}>
                      {step.description}
                    </div>
                  </div>
                  {step.interactive && (
                    <Badge variant={index === currentStep ? 'secondary' : 'outline'}>
                      Interactive
                    </Badge>
                  )}
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnimatedTutorialSystem;
