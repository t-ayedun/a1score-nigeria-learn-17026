import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Target, Plus, Calendar, Clock, CheckCircle, AlertCircle,
  Trophy, Star, TrendingUp, BookOpen, Calculator, FlaskConical,
  Atom, Globe, Edit2, Trash2, Flag
} from "lucide-react";
import { toast } from "sonner";
import BackToDashboard from "@/components/shared/BackToDashboard";
import PageHeader from "@/components/shared/PageHeader";

interface StudyGoal {
  id: string;
  title: string;
  description: string;
  category: 'daily' | 'weekly' | 'monthly' | 'exam';
  subject: string;
  targetValue: number;
  currentValue: number;
  unit: 'hours' | 'questions' | 'topics' | 'chapters';
  deadline: string;
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'completed' | 'paused';
  createdAt: string;
}

interface StudyGoalsProps {
  onBackToDashboard?: () => void;
}

const StudyGoals = ({ onBackToDashboard }: StudyGoalsProps = {}) => {
  const [goals, setGoals] = useState<StudyGoal[]>([
    {
      id: '1',
      title: 'Master Quadratic Equations',
      description: 'Complete all quadratic equation topics and practice 50 questions',
      category: 'weekly',
      subject: 'Mathematics',
      targetValue: 50,
      currentValue: 32,
      unit: 'questions',
      deadline: '2024-12-28',
      priority: 'high',
      status: 'active',
      createdAt: '2024-12-20'
    },
    {
      id: '2',
      title: 'Daily Study Routine',
      description: 'Study for at least 2 hours every day',
      category: 'daily',
      subject: 'All Subjects',
      targetValue: 2,
      currentValue: 1.5,
      unit: 'hours',
      deadline: '2024-12-22',
      priority: 'medium',
      status: 'active',
      createdAt: '2024-12-21'
    },
    {
      id: '3',
      title: 'Chemistry Lab Reports',
      description: 'Complete all pending chemistry lab reports',
      category: 'weekly',
      subject: 'Chemistry',
      targetValue: 5,
      currentValue: 5,
      unit: 'chapters',
      deadline: '2024-12-25',
      priority: 'high',
      status: 'completed',
      createdAt: '2024-12-18'
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'weekly' as const,
    subject: '',
    targetValue: 0,
    unit: 'hours' as const,
    deadline: '',
    priority: 'medium' as const
  });

  const subjects = [
    { name: 'Mathematics', icon: Calculator, color: 'text-blue-600' },
    { name: 'Physics', icon: FlaskConical, color: 'text-purple-600' },
    { name: 'Chemistry', icon: Atom, color: 'text-green-600' },
    { name: 'English', icon: Globe, color: 'text-orange-600' },
    { name: 'All Subjects', icon: BookOpen, color: 'text-gray-600' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'daily': return Calendar;
      case 'weekly': return Clock;
      case 'monthly': return TrendingUp;
      case 'exam': return Trophy;
      default: return Target;
    }
  };

  const getSubjectIcon = (subject: string) => {
    const subjectData = subjects.find(s => s.name === subject);
    return subjectData?.icon || BookOpen;
  };

  const createGoal = () => {
    if (!newGoal.title || !newGoal.subject || !newGoal.deadline) {
      toast("Please fill in all required fields");
      return;
    }

    const goal: StudyGoal = {
      id: Date.now().toString(),
      ...newGoal,
      currentValue: 0,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setGoals(prev => [...prev, goal]);
    setNewGoal({
      title: '',
      description: '',
      category: 'weekly',
      subject: '',
      targetValue: 0,
      unit: 'hours',
      deadline: '',
      priority: 'medium'
    });
    setIsCreateDialogOpen(false);
    toast("Study goal created successfully!");
  };

  const updateGoalProgress = (goalId: string, newValue: number) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === goalId) {
        const updatedGoal = { ...goal, currentValue: newValue };
        if (newValue >= goal.targetValue && goal.status !== 'completed') {
          updatedGoal.status = 'completed';
          toast(`🎉 Goal completed: ${goal.title}!`);
        }
        return updatedGoal;
      }
      return goal;
    }));
  };

  const deleteGoal = (goalId: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== goalId));
    toast("Goal deleted successfully");
  };

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const activeGoals = goals.filter(goal => goal.status === 'active');
  const completedGoals = goals.filter(goal => goal.status === 'completed');

  return (
    <div className="space-y-6">
      {onBackToDashboard && (
        <BackToDashboard onClick={onBackToDashboard} />
      )}

      <PageHeader
        title="Study Goals"
        description="Set and track your daily and weekly study targets"
        breadcrumbs={[
          { label: "Dashboard", onClick: onBackToDashboard },
          { label: "Goals" }
        ]}
      />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6 text-purple-600" />
                Study Goals
              </CardTitle>
              <p className="text-gray-600">
                Set and track your daily study targets
              </p>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Goal
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Study Goal</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Goal Title *</Label>
                    <Input
                      id="title"
                      value={newGoal.title}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., Master Algebra"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newGoal.description}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe your goal in detail..."
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Category</Label>
                      <Select value={newGoal.category} onValueChange={(value: any) => setNewGoal(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="exam">Exam Prep</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>Priority</Label>
                      <Select value={newGoal.priority} onValueChange={(value: any) => setNewGoal(prev => ({ ...prev, priority: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Subject *</Label>
                    <Select value={newGoal.subject} onValueChange={(value) => setNewGoal(prev => ({ ...prev, subject: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject.name} value={subject.name}>
                            {subject.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Target Value</Label>
                      <Input
                        type="number"
                        value={newGoal.targetValue || ''}
                        onChange={(e) => setNewGoal(prev => ({ ...prev, targetValue: parseInt(e.target.value) || 0 }))}
                        placeholder="e.g., 10"
                      />
                    </div>
                    
                    <div>
                      <Label>Unit</Label>
                      <Select value={newGoal.unit} onValueChange={(value: any) => setNewGoal(prev => ({ ...prev, unit: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hours">Hours</SelectItem>
                          <SelectItem value="questions">Questions</SelectItem>
                          <SelectItem value="topics">Topics</SelectItem>
                          <SelectItem value="chapters">Chapters</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="deadline">Deadline *</Label>
                    <Input
                      id="deadline"
                      type="date"
                      value={newGoal.deadline}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, deadline: e.target.value }))}
                    />
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button onClick={createGoal} className="flex-1">
                      Create Goal
                    </Button>
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      {/* Goal Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{activeGoals.length}</p>
                <p className="text-sm text-gray-600">Active Goals</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{completedGoals.length}</p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">
                  {Math.round((completedGoals.length / goals.length) * 100) || 0}%
                </p>
                <p className="text-sm text-gray-600">Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">
                  {activeGoals.filter(goal => getDaysRemaining(goal.deadline) <= 3).length}
                </p>
                <p className="text-sm text-gray-600">Due Soon</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Goals */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Active Goals</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {activeGoals.map((goal) => {
            const CategoryIcon = getCategoryIcon(goal.category);
            const SubjectIcon = getSubjectIcon(goal.subject);
            const progressPercentage = (goal.currentValue / goal.targetValue) * 100;
            const daysRemaining = getDaysRemaining(goal.deadline);
            
            return (
              <Card key={goal.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-2">
                        <SubjectIcon className="h-5 w-5 text-gray-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold">{goal.title}</h4>
                          <p className="text-sm text-gray-600">{goal.description}</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" className="p-1 h-8 w-8">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="p-1 h-8 w-8"
                          onClick={() => deleteGoal(goal.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <CategoryIcon className="h-4 w-4" />
                      <Badge variant="outline" className="text-xs">
                        {goal.category}
                      </Badge>
                      <Badge className={`text-xs ${getPriorityColor(goal.priority)}`}>
                        {goal.priority}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {goal.subject}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>
                          {goal.currentValue}/{goal.targetValue} {goal.unit}
                        </span>
                      </div>
                      <Progress value={Math.min(progressPercentage, 100)} className="h-2" />
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span className={daysRemaining <= 3 ? 'text-red-600 font-medium' : 'text-gray-600'}>
                          {daysRemaining > 0 ? `${daysRemaining} days left` : 'Overdue'}
                        </span>
                      </div>
                      {daysRemaining <= 3 && (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          const newValue = Math.min(goal.currentValue + 1, goal.targetValue);
                          updateGoalProgress(goal.id, newValue);
                        }}
                      >
                        Update Progress
                      </Button>
                      {progressPercentage >= 100 && (
                        <Button
                          size="sm"
                          className="bg-green-500 hover:bg-green-600"
                          onClick={() => updateGoalProgress(goal.id, goal.targetValue)}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Completed Goals */}
      {completedGoals.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Completed Goals</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedGoals.map((goal) => {
              const SubjectIcon = getSubjectIcon(goal.subject);
              
              return (
                <Card key={goal.id} className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <SubjectIcon className="h-4 w-4 text-green-600" />
                          <span className="font-medium text-green-800">{goal.title}</span>
                        </div>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      
                      <p className="text-sm text-green-700">{goal.description}</p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-green-600">
                          {goal.targetValue} {goal.unit} completed
                        </span>
                        <Badge className="bg-green-100 text-green-700">
                          Completed
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Tips for Goal Setting */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">💡 Goal Setting Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>Make goals specific and measurable</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>Set realistic deadlines you can achieve</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>Break large goals into smaller milestones</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>Review and update your progress regularly</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>Celebrate achievements to stay motivated</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>Adjust goals if circumstances change</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyGoals;