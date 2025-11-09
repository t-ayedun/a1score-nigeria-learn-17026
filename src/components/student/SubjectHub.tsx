import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, FlaskConical, Globe, BookOpen, TrendingUp, Target, Clock, Star } from "lucide-react";

const SubjectHub = () => {
  const navigate = useNavigate();
  const subjects = [
    {
      name: 'Mathematics',
      icon: Calculator,
      color: 'bg-blue-500',
      progress: 78,
      topics: ['Algebra', 'Geometry', 'Trigonometry', 'Calculus', 'Statistics'],
      resources: [
        { name: 'Formula Sheet', type: 'PDF' },
        { name: 'Practice Calculator', type: 'Tool' },
        { name: 'Graph Plotter', type: 'Tool' }
      ]
    },
    {
      name: 'Physics',
      icon: FlaskConical,
      color: 'bg-purple-500',
      progress: 65,
      topics: ['Mechanics', 'Electricity', 'Waves', 'Thermodynamics', 'Modern Physics'],
      resources: [
        { name: 'Physics Formulas', type: 'PDF' },
        { name: 'Unit Converter', type: 'Tool' },
        { name: 'Experiment Simulations', type: 'Interactive' }
      ]
    },
    {
      name: 'Chemistry',
      icon: FlaskConical,
      color: 'bg-green-500',
      progress: 72,
      topics: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Analytical Chemistry'],
      resources: [
        { name: 'Periodic Table', type: 'Reference' },
        { name: 'Reaction Equations', type: 'PDF' },
        { name: 'Molecular Models', type: 'Interactive' }
      ]
    },
    {
      name: 'English Language',
      icon: Globe,
      color: 'bg-orange-500',
      progress: 84,
      topics: ['Grammar', 'Literature', 'Essay Writing', 'Comprehension', 'Vocabulary'],
      resources: [
        { name: 'Grammar Guide', type: 'PDF' },
        { name: 'Essay Templates', type: 'Document' },
        { name: 'Vocabulary Builder', type: 'Interactive' }
      ]
    }
  ];

  const examFocus = [
    {
      name: 'JAMB Preparation',
      description: 'Complete preparation for Joint Admissions and Matriculation Board',
      subjects: ['Mathematics', 'English', 'Physics', 'Chemistry'],
      questions: '5,000+ Past Questions',
      badge: 'Popular'
    },
    {
      name: 'WAEC Preparation',
      description: 'West African Examinations Council preparation materials',
      subjects: ['All Core Subjects', 'Electives Available'],
      questions: '3,000+ Past Questions',
      badge: 'Essential'
    },
    {
      name: 'NECO Preparation',
      description: 'National Examinations Council focused content',
      subjects: ['Mathematics', 'English', 'Sciences'],
      questions: '2,000+ Past Questions',
      badge: 'Updated'
    }
  ];

  const studyTools = [
    {
      name: 'Formula Quick Reference',
      description: 'Essential formulas for Math, Physics, and Chemistry',
      icon: BookOpen,
      color: 'text-blue-600',
      route: '/student/formula-reference'
    },
    {
      name: 'Progress Tracker',
      description: 'Monitor your learning across all subjects',
      icon: TrendingUp,
      color: 'text-green-600',
      route: '/student/progress-tracker'
    },
    {
      name: 'Study Goals',
      description: 'Set and track your daily study targets',
      icon: Target,
      color: 'text-purple-600',
      route: '/student/study-goals'
    },
    {
      name: 'Study Timer',
      description: 'Pomodoro technique for focused study sessions',
      icon: Clock,
      color: 'text-orange-600',
      route: '/student/study-timer'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Subject Cards */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Your Subjects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {subjects.map((subject) => {
            const Icon = subject.icon;
            return (
              <Card key={subject.name} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 ${subject.color} rounded-lg`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{subject.name}</CardTitle>
                        <div className="text-sm text-gray-600">{subject.progress}% Complete</div>
                      </div>
                    </div>
                    <Badge variant="secondary">{subject.topics.length} Topics</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Recent Topics:</div>
                    <div className="flex flex-wrap gap-2">
                      {subject.topics.slice(0, 3).map((topic) => (
                        <Badge key={topic} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                      {subject.topics.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{subject.topics.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Resources:</div>
                    <div className="space-y-1">
                      {subject.resources.map((resource, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span>{resource.name}</span>
                          <Badge variant="outline" className="text-xs">{resource.type}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1">Study Now</Button>
                    <Button size="sm" variant="outline">Practice Quiz</Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Nigerian Exam Preparation */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Nigerian Exam Preparation</h2>
        <div className="space-y-4">
          {examFocus.map((exam) => (
            <Card key={exam.name}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{exam.name}</h3>
                      <Badge variant="secondary">{exam.badge}</Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{exam.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>📚 {Array.isArray(exam.subjects) ? exam.subjects.join(', ') : exam.subjects}</span>
                      <span>❓ {exam.questions}</span>
                    </div>
                  </div>
                  <Button>Start Prep</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Study Tools */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Study Tools</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {studyTools.map((tool) => {
            const Icon = tool.icon;
            
            return (
              <Card key={tool.name} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="text-center space-y-3">
                    <div className="mx-auto w-fit p-3 bg-gray-100 rounded-full">
                      <Icon className={`h-6 w-6 ${tool.color}`} />
                    </div>
                    <div>
                      <div className="font-medium">{tool.name}</div>
                      <div className="text-sm text-gray-600">{tool.description}</div>
                    </div>
                    <Button 
                      size="sm" 
                      className="mt-2"
                      onClick={() => navigate(tool.route)}
                    >
                      Open Tool
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            This Week's Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">45</div>
              <div className="text-sm text-gray-600">Questions Solved</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">8.5h</div>
              <div className="text-sm text-gray-600">Study Time</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">92%</div>
              <div className="text-sm text-gray-600">Accuracy Rate</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">7</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubjectHub;
