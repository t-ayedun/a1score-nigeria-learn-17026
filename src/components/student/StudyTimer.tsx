import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, Pause, RotateCcw, Clock, Coffee, BookOpen, 
  Settings, Trophy, TrendingUp, BarChart3, Timer,
  Target, Zap, CheckCircle, Calendar
} from "lucide-react";
import { toast } from "sonner";

interface TimerSession {
  id: string;
  subject: string;
  duration: number;
  type: 'focus' | 'short-break' | 'long-break';
  completedAt: string;
  date: string;
}

interface TimerPreset {
  name: string;
  focus: number;
  shortBreak: number;
  longBreak: number;
  longBreakInterval: number;
}

const StudyTimer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [currentSession, setCurrentSession] = useState<'focus' | 'short-break' | 'long-break'>('focus');
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [preset, setPreset] = useState('classic');
  const [sessions, setSessions] = useState<TimerSession[]>([]);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const presets: Record<string, TimerPreset> = {
    classic: {
      name: 'Classic Pomodoro',
      focus: 25,
      shortBreak: 5,
      longBreak: 15,
      longBreakInterval: 4
    },
    extended: {
      name: 'Extended Focus',
      focus: 45,
      shortBreak: 10,
      longBreak: 20,
      longBreakInterval: 3
    },
    short: {
      name: 'Short Bursts',
      focus: 15,
      shortBreak: 3,
      longBreak: 10,
      longBreakInterval: 6
    },
    study: {
      name: 'Deep Study',
      focus: 50,
      shortBreak: 10,
      longBreak: 30,
      longBreakInterval: 2
    }
  };

  const subjects = [
    'Mathematics', 'Physics', 'Chemistry', 'English', 
    'Biology', 'Geography', 'History', 'Computer Science'
  ];

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    // Timer completion
    if (timeLeft === 0 && isRunning) {
      handleTimerComplete();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    
    // Play notification sound
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // Handle audio play failure silently
      });
    }

    // Save session
    const session: TimerSession = {
      id: Date.now().toString(),
      subject: selectedSubject,
      duration: currentSession === 'focus' ? presets[preset].focus : 
                currentSession === 'short-break' ? presets[preset].shortBreak :
                presets[preset].longBreak,
      type: currentSession,
      completedAt: new Date().toISOString(),
      date: new Date().toDateString()
    };
    
    setSessions(prev => [session, ...prev]);

    if (currentSession === 'focus') {
      setCompletedPomodoros(prev => prev + 1);
      toast(`🎉 Focus session completed! Great work on ${selectedSubject}!`);
      
      // Determine next session type
      const nextPomodoros = completedPomodoros + 1;
      if (nextPomodoros % presets[preset].longBreakInterval === 0) {
        setCurrentSession('long-break');
        setTimeLeft(presets[preset].longBreak * 60);
        toast('Time for a long break! You\'ve earned it.');
      } else {
        setCurrentSession('short-break');
        setTimeLeft(presets[preset].shortBreak * 60);
        toast('Take a short break and recharge!');
      }
    } else {
      toast('Break time is over. Ready for another focus session?');
      setCurrentSession('focus');
      setTimeLeft(presets[preset].focus * 60);
    }
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      toast('Timer started. Stay focused!');
    } else {
      toast('Timer paused.');
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setCurrentSession('focus');
    setTimeLeft(presets[preset].focus * 60);
    toast('Timer reset.');
  };

  const skipSession = () => {
    setTimeLeft(0);
    toast('Session skipped.');
  };

  const changePreset = (newPreset: string) => {
    setPreset(newPreset);
    setIsRunning(false);
    setCurrentSession('focus');
    setTimeLeft(presets[newPreset].focus * 60);
    setCompletedPomodoros(0);
    toast(`Switched to ${presets[newPreset].name}`);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentSessionInfo = () => {
    const currentPreset = presets[preset];
    switch (currentSession) {
      case 'focus':
        return {
          title: 'Focus Time',
          subtitle: `Studying ${selectedSubject}`,
          icon: BookOpen,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          totalTime: currentPreset.focus * 60
        };
      case 'short-break':
        return {
          title: 'Short Break',
          subtitle: 'Take a quick rest',
          icon: Coffee,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          totalTime: currentPreset.shortBreak * 60
        };
      case 'long-break':
        return {
          title: 'Long Break',
          subtitle: 'Enjoy your extended rest',
          icon: Trophy,
          color: 'text-purple-600',
          bgColor: 'bg-purple-50',
          totalTime: currentPreset.longBreak * 60
        };
    }
  };

  const sessionInfo = getCurrentSessionInfo();
  const SessionIcon = sessionInfo.icon;
  const progress = ((sessionInfo.totalTime - timeLeft) / sessionInfo.totalTime) * 100;

  // Statistics
  const todaySessions = sessions.filter(s => s.date === new Date().toDateString());
  const focusSessions = todaySessions.filter(s => s.type === 'focus');
  const totalFocusTime = focusSessions.reduce((sum, s) => sum + s.duration, 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Timer className="h-6 w-6 text-orange-600" />
            Study Timer
          </CardTitle>
          <p className="text-gray-600">
            Pomodoro technique for focused study sessions
          </p>
        </CardHeader>
      </Card>

      {/* Hidden audio element for notifications */}
      <audio ref={audioRef} preload="auto">
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmcaDDiHzfHOeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmcaDDiHzfHOeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmcaDDiHzfHOeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmcaDDiHzfHOeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmcaDDiHzfHOeSsFJHfH8N2QQAoUXrTp66hVFA==" type="audio/wav" />
      </audio>

      <Tabs defaultValue="timer" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="timer">Timer</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="timer" className="space-y-4">
          <Card className={`border-2 ${sessionInfo.bgColor} ${sessionInfo.color.replace('text-', 'border-')}`}>
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                {/* Session Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <SessionIcon className={`h-6 w-6 ${sessionInfo.color}`} />
                    <h2 className={`text-2xl font-bold ${sessionInfo.color}`}>
                      {sessionInfo.title}
                    </h2>
                  </div>
                  <p className="text-gray-600">{sessionInfo.subtitle}</p>
                  
                  {currentSession === 'focus' && (
                    <Badge variant="outline" className="text-sm">
                      Session {completedPomodoros + 1}
                    </Badge>
                  )}
                </div>

                {/* Timer Display */}
                <div className="space-y-4">
                  <div className={`text-8xl font-mono font-bold ${sessionInfo.color}`}>
                    {formatTime(timeLeft)}
                  </div>
                  
                  <Progress 
                    value={progress} 
                    className="h-3 w-full max-w-md mx-auto"
                  />
                </div>

                {/* Subject Selection (only during focus) */}
                {currentSession === 'focus' && (
                  <div className="space-y-2">
                    <Label htmlFor="subject">Studying:</Label>
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                      <SelectTrigger className="w-48 mx-auto">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Timer Controls */}
                <div className="flex justify-center gap-4">
                  <Button
                    onClick={toggleTimer}
                    size="lg"
                    className={`${sessionInfo.color.replace('text-', 'bg-')} hover:opacity-90 text-white`}
                  >
                    {isRunning ? (
                      <Pause className="h-6 w-6 mr-2" />
                    ) : (
                      <Play className="h-6 w-6 mr-2" />
                    )}
                    {isRunning ? 'Pause' : 'Start'}
                  </Button>
                  
                  <Button onClick={resetTimer} variant="outline" size="lg">
                    <RotateCcw className="h-5 w-5 mr-2" />
                    Reset
                  </Button>
                  
                  <Button onClick={skipSession} variant="outline" size="lg">
                    Skip
                  </Button>
                </div>

                {/* Completed Pomodoros */}
                <div className="flex justify-center items-center gap-2">
                  <span className="text-sm text-gray-600">Completed today:</span>
                  <div className="flex gap-1">
                    {Array.from({ length: Math.max(4, completedPomodoros) }, (_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full ${
                          i < completedPomodoros ? 'bg-blue-500' : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <Badge variant="secondary" className="ml-2">
                    {completedPomodoros}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Today's Goal</p>
                    <p className="text-sm text-gray-600">8 Pomodoros</p>
                    <Progress value={(completedPomodoros / 8) * 100} className="h-2 mt-1" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">Focus Time Today</p>
                    <p className="text-sm text-gray-600">{Math.round(totalFocusTime / 60)} minutes</p>
                    <p className="text-xs text-gray-500">{focusSessions.length} sessions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Timer Presets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(presets).map(([key, presetData]) => (
                  <Card 
                    key={key} 
                    className={`cursor-pointer transition-colors ${
                      preset === key ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => changePreset(key)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{presetData.name}</h3>
                          <p className="text-sm text-gray-600">
                            Focus: {presetData.focus}m | Short: {presetData.shortBreak}m | Long: {presetData.longBreak}m
                          </p>
                        </div>
                        {preset === key && (
                          <CheckCircle className="h-5 w-5 text-blue-500" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🎯 Pomodoro Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p>• <strong>Stay focused:</strong> Avoid distractions during focus sessions</p>
                <p>• <strong>Take real breaks:</strong> Step away from your study area</p>
                <p>• <strong>Stay hydrated:</strong> Drink water during breaks</p>
                <p>• <strong>Stretch regularly:</strong> Move your body during long breaks</p>
                <p>• <strong>Track progress:</strong> Monitor your daily achievements</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="text-2xl font-bold">{completedPomodoros}</p>
                    <p className="text-sm text-gray-600">Today</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">{Math.round(totalFocusTime / 60)}</p>
                    <p className="text-sm text-gray-600">Minutes</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">7</p>
                    <p className="text-sm text-gray-600">Day Streak</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-2xl font-bold">89%</p>
                    <p className="text-sm text-gray-600">Focus Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Weekly Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                  const sessionsCount = Math.floor(Math.random() * 8) + 2; // Demo data
                  return (
                    <div key={day} className="flex items-center gap-4">
                      <div className="w-12 text-sm font-medium">{day}</div>
                      <Progress value={(sessionsCount / 10) * 100} className="flex-1 h-3" />
                      <div className="text-sm text-gray-600 w-16">{sessionsCount} sessions</div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Sessions</CardTitle>
              <p className="text-gray-600">Your study session history</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sessions.length === 0 ? (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No sessions yet. Start your first timer!</p>
                  </div>
                ) : (
                  sessions.slice(0, 10).map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          session.type === 'focus' ? 'bg-blue-100 text-blue-600' :
                          session.type === 'short-break' ? 'bg-green-100 text-green-600' :
                          'bg-purple-100 text-purple-600'
                        }`}>
                          {session.type === 'focus' ? (
                            <BookOpen className="h-4 w-4" />
                          ) : (
                            <Coffee className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">
                            {session.type === 'focus' ? session.subject : 
                             session.type === 'short-break' ? 'Short Break' : 'Long Break'}
                          </p>
                          <p className="text-sm text-gray-600">
                            {session.duration} minutes • {new Date(session.completedAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {session.date}
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudyTimer;