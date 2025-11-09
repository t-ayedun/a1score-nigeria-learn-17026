import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Calculator, FlaskConical, Globe, BookOpen, TrendingUp, Target, Clock, Star, Brain, Zap, Award, BarChart } from "lucide-react";
import { useSubjectProgress } from "@/hooks/useSubjectProgress";

const SubjectHub = () => {
  const navigate = useNavigate();
  const { subjects: userSubjects, loading, weeklyStats } = useSubjectProgress();

  // Map subjects to icons and colors
  const getSubjectIcon = (subject: string) => {
    const lower = subject.toLowerCase();
    if (lower.includes('math') || lower.includes('algebra') || lower.includes('calculus')) return Calculator;
    if (lower.includes('physics') || lower.includes('mechanics')) return Zap;
    if (lower.includes('chemistry') || lower.includes('biology')) return FlaskConical;
    if (lower.includes('english') || lower.includes('literature')) return Globe;
    if (lower.includes('economics') || lower.includes('commerce')) return TrendingUp;
    return BookOpen;
  };

  const getSubjectColor = (index: number) => {
    const colors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-orange-500', 'bg-red-500', 'bg-indigo-500'];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-6">Your Subjects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-8 w-48" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-24 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
      {/* Subject Cards - Real Data */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Your Subjects</h2>
            <p className="text-sm text-gray-600">Based on your actual study activity</p>
          </div>
          {userSubjects.length === 0 && (
            <Badge variant="outline" className="text-xs">
              Start studying to see your progress!
            </Badge>
          )}
        </div>

        {userSubjects.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">No Subjects Yet</h3>
                <p className="text-gray-600 mb-4">
                  Start taking quizzes or study sessions to track your progress
                </p>
                <div className="flex gap-2 justify-center">
                  <Button onClick={() => navigate('/student/quiz')}>
                    <Brain className="h-4 w-4 mr-2" />
                    Take a Quiz
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/student/study-timer')}>
                    <Clock className="h-4 w-4 mr-2" />
                    Start Studying
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {userSubjects.map((subject, index) => {
              const Icon = getSubjectIcon(subject.subject);
              const color = getSubjectColor(index);
              const progressPercent = Math.min(100, Math.round((subject.totalQuizzes * 10) + (subject.totalStudyHours * 2)));
              
              return (
                <Card key={subject.subject} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 ${color} rounded-lg`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{subject.subject}</CardTitle>
                          <div className="text-sm text-gray-600">
                            {subject.totalStudyHours}h studied • {subject.totalQuizzes} quizzes
                          </div>
                        </div>
                      </div>
                      <Badge variant={subject.averageScore >= 80 ? "default" : "secondary"}>
                        {subject.averageScore}% avg
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Overall Progress</span>
                        <span className="text-gray-600">{progressPercent}%</span>
                      </div>
                      <Progress value={progressPercent} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1">
                        <div className="text-gray-600">Study Time</div>
                        <div className="font-semibold flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {subject.totalStudyHours}h total
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-gray-600">This Week</div>
                        <div className="font-semibold flex items-center gap-1">
                          <TrendingUp className="h-4 w-4" />
                          {subject.weeklyHours}h
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-gray-600">Questions</div>
                        <div className="font-semibold flex items-center gap-1">
                          <Target className="h-4 w-4" />
                          {subject.questionsAnswered}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-gray-600">Last Study</div>
                        <div className="font-semibold text-xs">
                          {subject.lastStudied}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs">
                          <Award className="h-3 w-3 mr-1" />
                          {subject.topicsCompleted} topics
                        </Badge>
                        {subject.averageScore >= 80 && (
                          <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                            Strong subject
                          </Badge>
                        )}
                        {subject.averageScore < 60 && subject.totalQuizzes >= 3 && (
                          <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700">
                            Needs practice
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1" onClick={() => navigate('/student/study-timer')}>
                        Study Now
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => navigate('/student/quiz')}>
                        Practice Quiz
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
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

      {/* Performance Summary - Real Data */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5 text-blue-600" />
            This Week's Performance
          </CardTitle>
          <p className="text-sm text-gray-600">Your actual study statistics from the past 7 days</p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{weeklyStats.questionsAnswered}</div>
              <div className="text-sm text-gray-600">Questions Solved</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{weeklyStats.totalHours}h</div>
              <div className="text-sm text-gray-600">Study Time</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {weeklyStats.averageScore > 0 ? `${weeklyStats.averageScore}%` : '--'}
              </div>
              <div className="text-sm text-gray-600">Avg Quiz Score</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{weeklyStats.topicsCompleted}</div>
              <div className="text-sm text-gray-600">Topics Completed</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubjectHub;
