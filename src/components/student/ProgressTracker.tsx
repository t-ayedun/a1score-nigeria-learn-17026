import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  TrendingUp, Calendar, Target, Clock, Award, BarChart3,
  Calculator, FlaskConical, Atom, Globe, BookOpen, Star,
  ArrowUp, ArrowDown, Minus, CheckCircle, AlertCircle
} from "lucide-react";
import { useProgressTracking } from "@/hooks/useProgressTracking";
import BackToDashboard from "@/components/shared/BackToDashboard";
import PageHeader from "@/components/shared/PageHeader";

interface SubjectProgress {
  subject: string;
  icon: any;
  color: string;
  totalTopics: number;
  completedTopics: number;
  weeklyHours: number;
  averageScore: number;
  lastStudied: string;
  trend: 'up' | 'down' | 'stable';
  strongAreas: string[];
  improvementAreas: string[];
}

interface WeeklyGoal {
  subject: string;
  target: number;
  completed: number;
  unit: 'hours' | 'topics' | 'questions';
}

interface ProgressTrackerProps {
  onBackToDashboard?: () => void;
}

const ProgressTracker = ({ onBackToDashboard }: ProgressTrackerProps = {}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const { progressStats, loading } = useProgressTracking();

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-96" />
          </CardHeader>
        </Card>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <Skeleton className="h-16 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!progressStats) return null;

  // Mock subject data (in real app, this would come from database)
  const subjectProgress: SubjectProgress[] = progressStats.weeklyProgress.map((wp, index) => ({
    subject: wp.subject,
    icon: [Calculator, FlaskConical, Atom, Globe, BookOpen][index] || BookOpen,
    color: ['text-blue-600', 'text-purple-600', 'text-green-600', 'text-orange-600', 'text-red-600'][index] || 'text-gray-600',
    totalTopics: 20,
    completedTopics: Math.floor(20 * 0.7), // Mock completion
    weeklyHours: Math.round(wp.hours / 60 * 10) / 10, // Convert minutes to hours
    averageScore: progressStats.averageScore || 80,
    lastStudied: '2 hours ago', // Mock - would be calculated from sessions
    trend: 'up' as const,
    strongAreas: ['Area 1', 'Area 2'], // Mock - would come from analytics
    improvementAreas: ['Area 3'] // Mock - would come from analytics
  }));

  const weeklyGoals: WeeklyGoal[] = progressStats.weeklyProgress.map(wp => ({
    subject: wp.subject,
    target: 10,
    completed: Math.round(wp.hours / 60 * 10) / 10,
    unit: 'hours' as const
  }));

  const studyStreak = {
    current: progressStats.streakDays,
    longest: progressStats.streakDays + 5, // Mock longest
    thisWeek: Math.min(progressStats.streakDays, 7)
  };

  const weeklyStats = {
    totalHours: progressStats.totalStudyHours,
    questionsAnswered: progressStats.totalQuizzes * 10, // Mock calculation
    topicsCompleted: 8, // Mock
    averageScore: progressStats.averageScore
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp className="h-4 w-4 text-green-500" />;
      case 'down': return <ArrowDown className="h-4 w-4 text-red-500" />;
      default: return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600 bg-green-50';
      case 'down': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {onBackToDashboard && (
        <BackToDashboard onClick={onBackToDashboard} />
      )}

      <PageHeader
        title="Progress Tracker"
        description="Monitor your learning progress across all subjects"
        breadcrumbs={[
          { label: "Dashboard", onClick: onBackToDashboard },
          { label: "Progress" }
        ]}
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{weeklyStats.totalHours}h</p>
                <p className="text-sm text-gray-600">This Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{weeklyStats.questionsAnswered}</p>
                <p className="text-sm text-gray-600">Questions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">{weeklyStats.topicsCompleted}</p>
                <p className="text-sm text-gray-600">Topics Done</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">{weeklyStats.averageScore}%</p>
                <p className="text-sm text-gray-600">Avg Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="subjects" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="subjects">Subject Progress</TabsTrigger>
          <TabsTrigger value="goals">Weekly Goals</TabsTrigger>
          <TabsTrigger value="streaks">Study Streaks</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="subjects" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {subjectProgress.map((subject) => {
              const Icon = subject.icon;
              const completionRate = (subject.completedTopics / subject.totalTopics) * 100;
              
              return (
                <Card key={subject.subject} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className={`h-5 w-5 ${subject.color}`} />
                          <span className="font-semibold">{subject.subject}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {getTrendIcon(subject.trend)}
                          <Badge className={getTrendColor(subject.trend)}>
                            {subject.averageScore}%
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Topics Progress</span>
                          <span>{subject.completedTopics}/{subject.totalTopics}</span>
                        </div>
                        <Progress value={completionRate} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Weekly Hours</p>
                          <p className="font-semibold">{subject.weeklyHours}h</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Last Studied</p>
                          <p className="font-semibold">{subject.lastStudied}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm font-medium text-green-600">Strong Areas:</p>
                          <div className="flex flex-wrap gap-1">
                            {subject.strongAreas.map((area, index) => (
                              <Badge key={index} variant="outline" className="text-xs bg-green-50 text-green-700">
                                {area}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-orange-600">Needs Improvement:</p>
                          <div className="flex flex-wrap gap-1">
                            {subject.improvementAreas.map((area, index) => (
                              <Badge key={index} variant="outline" className="text-xs bg-orange-50 text-orange-700">
                                {area}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <Button size="sm" className="w-full">
                        Continue Studying
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Weekly Study Goals</CardTitle>
              <p className="text-gray-600">Track your progress towards weekly targets</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyGoals.map((goal) => {
                  const completionRate = (goal.completed / goal.target) * 100;
                  const isCompleted = completionRate >= 100;
                  
                  return (
                    <div key={goal.subject} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{goal.subject}</span>
                        <div className="flex items-center gap-2">
                          {isCompleted && <CheckCircle className="h-4 w-4 text-green-500" />}
                          <span className="text-sm">
                            {goal.completed}/{goal.target} {goal.unit}
                          </span>
                        </div>
                      </div>
                      <Progress 
                        value={Math.min(completionRate, 100)} 
                        className={`h-2 ${isCompleted ? 'bg-green-100' : ''}`}
                      />
                      <div className="text-xs text-gray-600">
                        {completionRate >= 100 ? (
                          <span className="text-green-600 font-medium">Goal achieved! 🎉</span>
                        ) : (
                          <span>{Math.round(100 - completionRate)}% remaining</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Goal Achievement Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Break larger goals into daily targets</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Study consistently rather than cramming</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Adjust goals based on your schedule</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="streaks" className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="space-y-2">
                  <Award className="h-8 w-8 text-yellow-500 mx-auto" />
                  <p className="text-2xl font-bold text-yellow-600">{studyStreak.current}</p>
                  <p className="text-sm text-gray-600">Current Streak</p>
                  <p className="text-xs text-gray-500">Days in a row</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="space-y-2">
                  <Star className="h-8 w-8 text-purple-500 mx-auto" />
                  <p className="text-2xl font-bold text-purple-600">{studyStreak.longest}</p>
                  <p className="text-sm text-gray-600">Longest Streak</p>
                  <p className="text-xs text-gray-500">Personal best</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="space-y-2">
                  <Calendar className="h-8 w-8 text-blue-500 mx-auto" />
                  <p className="text-2xl font-bold text-blue-600">{studyStreak.thisWeek}</p>
                  <p className="text-sm text-gray-600">This Week</p>
                  <p className="text-xs text-gray-500">Days studied</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Streak Calendar</CardTitle>
              <p className="text-gray-600">Your study activity over the past weeks</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 text-center text-xs">
                <div className="font-medium">Mon</div>
                <div className="font-medium">Tue</div>
                <div className="font-medium">Wed</div>
                <div className="font-medium">Thu</div>
                <div className="font-medium">Fri</div>
                <div className="font-medium">Sat</div>
                <div className="font-medium">Sun</div>
                
                {Array.from({ length: 21 }, (_, i) => (
                  <div
                    key={i}
                    className={`h-8 w-8 rounded flex items-center justify-center ${
                      i % 3 === 0 ? 'bg-green-200 text-green-800' :
                      i % 4 === 0 ? 'bg-blue-200 text-blue-800' :
                      i % 5 === 0 ? 'bg-gray-100 text-gray-400' :
                      'bg-green-100 text-green-600'
                    }`}
                  >
                    {21 - i}
                  </div>
                ))}
              </div>
              
              <div className="flex items-center gap-4 mt-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 bg-gray-100 rounded"></div>
                  <span>No study</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 bg-green-100 rounded"></div>
                  <span>Light study</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 bg-green-200 rounded"></div>
                  <span>Good study</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 bg-blue-200 rounded"></div>
                  <span>Intensive study</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Performance Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Study Time Distribution</h4>
                    <div className="space-y-2">
                      {subjectProgress.map((subject) => (
                        <div key={subject.subject} className="flex items-center gap-2">
                          <div className="w-20 text-sm">{subject.subject}</div>
                          <Progress 
                            value={(subject.weeklyHours / 24) * 100} 
                            className="flex-1 h-2"
                          />
                          <div className="text-sm w-12">{subject.weeklyHours}h</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Score Trends</h4>
                    <div className="space-y-2">
                      {subjectProgress.map((subject) => (
                        <div key={subject.subject} className="flex items-center justify-between">
                          <span className="text-sm">{subject.subject}</span>
                          <div className="flex items-center gap-2">
                            {getTrendIcon(subject.trend)}
                            <span className="text-sm font-medium">{subject.averageScore}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">📊 Insights & Recommendations</h4>
                  <div className="space-y-1 text-sm text-blue-700">
                    <p>• Your English performance is strongest - consider helping others in this subject</p>
                    <p>• Mathematics shows good progress - maintain current study routine</p>
                    <p>• Consider spending more time on Chemistry concepts that need improvement</p>
                    <p>• Your study consistency is excellent - keep up the daily habit!</p>
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

export default ProgressTracker;