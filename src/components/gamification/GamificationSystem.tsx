
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Trophy, Star, Target, Zap, Award, TrendingUp, Users, Crown } from "lucide-react";

interface GamificationSystemProps {
  studentId: string;
  onBadgeEarned?: (badge: string) => void;
}

const GamificationSystem = ({ studentId, onBadgeEarned }: GamificationSystemProps) => {
  const [studentProgress, setStudentProgress] = useState({
    level: 5,
    xp: 2450,
    xpToNext: 500,
    streak: 12,
    badges: ['Math Master', 'Quiz Champion', 'Study Streak', 'Essay Ace'],
    weeklyGoal: 80,
    weeklyProgress: 65
  });

  const [leaderboard] = useState([
    { name: 'Adebayo Olamide', xp: 3200, level: 7, badge: 'Math Genius' },
    { name: 'Fatima Hassan', xp: 2850, level: 6, badge: 'Quiz Master' },
    { name: 'You', xp: 2450, level: 5, badge: 'Study Streak' },
    { name: 'Chinedu Okoro', xp: 2150, level: 5, badge: 'Essay Ace' },
    { name: 'Aisha Musa', xp: 1980, level: 4, badge: 'Science Star' },
  ]);

  const availableBadges = [
    { name: 'Math Master', description: 'Solve 50 math problems', icon: Target, progress: 87, color: 'bg-blue-500' },
    { name: 'Quiz Champion', description: 'Score 90%+ on 10 quizzes', icon: Trophy, progress: 70, color: 'bg-yellow-500' },
    { name: 'Study Streak', description: '14 days consecutive study', icon: Zap, progress: 86, color: 'bg-green-500' },
    { name: 'WAEC Warrior', description: 'Complete WAEC prep module', icon: Award, progress: 45, color: 'bg-purple-500' },
    { name: 'AI Tutor Friend', description: 'Ask 100 AI questions', icon: Star, progress: 92, color: 'bg-pink-500' },
  ];

  const achievements = [
    { title: 'Level Up!', description: 'Reached Level 5', time: '2 hours ago', icon: TrendingUp },
    { title: 'Study Streak', description: '12 days in a row!', time: '1 day ago', icon: Zap },
    { title: 'Quiz Master', description: 'Scored 95% in Physics', time: '3 days ago', icon: Trophy },
  ];

  const handleClaimReward = (badgeName: string) => {
    if (onBadgeEarned) {
      onBadgeEarned(badgeName);
    }
    // Simulate badge claiming
    setStudentProgress(prev => ({
      ...prev,
      badges: [...prev.badges, badgeName],
      xp: prev.xp + 100
    }));
  };

  return (
    <div className="space-y-6">
      {/* Level & XP Progress */}
      <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-6 w-6" />
            Level {studentProgress.level} Scholar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span>XP Progress</span>
                <span>{studentProgress.xp} / {studentProgress.xp + studentProgress.xpToNext}</span>
              </div>
              <Progress 
                value={(studentProgress.xp / (studentProgress.xp + studentProgress.xpToNext)) * 100} 
                className="h-3"
              />
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">{studentProgress.streak}</div>
                <div className="text-sm opacity-90">Day Streak</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{studentProgress.badges.length}</div>
                <div className="text-sm opacity-90">Badges</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{studentProgress.weeklyProgress}%</div>
                <div className="text-sm opacity-90">Weekly Goal</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Badges Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-600" />
              Badge Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {availableBadges.map((badge) => {
              const Icon = badge.icon;
              const isEarned = studentProgress.badges.includes(badge.name);
              return (
                <div key={badge.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 ${badge.color} rounded-full ${isEarned ? '' : 'opacity-50'}`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {badge.name}
                        {isEarned && <Badge variant="secondary">Earned</Badge>}
                      </div>
                      <div className="text-sm text-gray-600">{badge.description}</div>
                      {!isEarned && (
                        <Progress value={badge.progress} className="w-32 h-2 mt-1" />
                      )}
                    </div>
                  </div>
                  {!isEarned && badge.progress >= 100 && (
                    <Button size="sm" onClick={() => handleClaimReward(badge.name)}>
                      Claim!
                    </Button>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-600" />
              School Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaderboard.map((student, index) => (
                <div key={student.name} className={`flex items-center justify-between p-3 rounded-lg ${
                  student.name === 'You' ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      index === 0 ? 'bg-yellow-500 text-white' :
                      index === 1 ? 'bg-gray-400 text-white' :
                      index === 2 ? 'bg-orange-500 text-white' :
                      'bg-gray-200'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{student.name}</div>
                      <div className="text-sm text-gray-600">Level {student.level} • {student.badge}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{student.xp.toLocaleString()} XP</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-600" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <div className="p-2 bg-green-500 rounded-full">
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-green-800">{achievement.title}</div>
                    <div className="text-sm text-green-600">{achievement.description}</div>
                  </div>
                  <div className="text-sm text-gray-500">{achievement.time}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GamificationSystem;
