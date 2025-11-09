import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useGamification } from '@/hooks/useGamification';
import { Flame, Video, FileQuestion, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const StreakTab = () => {
  const { streak, loading, repairStreak } = useGamification();

  if (loading || !streak) {
    return <div className="py-8 text-center text-muted-foreground">Loading streak...</div>;
  }

  const activeDaysThisWeek = streak.weekly_activity_pattern.filter((day) => day === 1).length;
  const isStreakHealthy = activeDaysThisWeek >= 4;

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-6 py-4">
      {/* Current Streak */}
      <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-6">
        <div className="text-center">
          <Flame className="h-16 w-16 mx-auto mb-4" />
          <div className="text-6xl font-bold mb-2">{streak.current_streak}</div>
          <div className="text-xl mb-4">Day Learning Streak</div>
          <div className="text-sm opacity-90">
            Longest: {streak.longest_streak} days
          </div>
        </div>
      </Card>

      {/* How Streaks Work */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Flexible Streaks:</strong> Learn at least 4 days per week to maintain your streak.
          Life happens, and we understand! Miss a day? Use a streak repair below.
        </AlertDescription>
      </Alert>

      {/* Weekly Pattern */}
      <div>
        <h3 className="font-semibold mb-3">This Week's Activity</h3>
        <div className="grid grid-cols-7 gap-2">
          {streak.weekly_activity_pattern.map((isActive, index) => (
            <div key={index} className="text-center">
              <div
                className={`
                  h-12 rounded-lg flex items-center justify-center font-semibold mb-1
                  ${
                    isActive
                      ? 'bg-green-500 text-white'
                      : 'bg-muted text-muted-foreground'
                  }
                `}
              >
                {isActive ? '✓' : '—'}
              </div>
              <div className="text-xs text-muted-foreground">{dayNames[index]}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {activeDaysThisWeek}/7 days active
          </p>
          {isStreakHealthy ? (
            <Badge variant="default" className="bg-green-600">
              Streak Healthy
            </Badge>
          ) : (
            <Badge variant="destructive">
              Need {4 - activeDaysThisWeek} more day(s)
            </Badge>
          )}
        </div>
      </div>

      {/* Streak Repairs */}
      <div>
        <h3 className="font-semibold mb-3">Streak Repairs</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Missed a day? Use a streak repair to keep your streak alive. You have{' '}
          <strong>{streak.streak_repairs_available}</strong> repair(s) available.
        </p>

        <div className="grid gap-3">
          <Card className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <FileQuestion className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-1">Quick Learning Quiz</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Take a 5-question quiz on any subject to repair your streak
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={streak.streak_repairs_available === 0}
                  onClick={() => repairStreak('quiz')}
                >
                  Use Quiz Repair
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                <Video className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-1">Educational Video</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Watch a 2-minute educational video to repair your streak
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={streak.streak_repairs_available === 0}
                  onClick={() => repairStreak('video')}
                >
                  Use Video Repair
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {streak.streak_repairs_available === 0 && (
          <p className="text-xs text-muted-foreground mt-3 p-3 bg-muted/50 rounded">
            You've used all your repairs. Keep learning consistently to earn more!
          </p>
        )}
      </div>

      {/* What Counts as Learning */}
      <div className="rounded-lg border bg-card p-4">
        <h3 className="font-semibold mb-3">What Counts as Learning Activity?</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>Completing a practice quiz or test</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>Mastering a new concept</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>Having a meaningful tutoring session (5+ questions)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 font-bold">✗</span>
            <span>Just logging in (doesn't count!)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 font-bold">✗</span>
            <span>Browsing without active learning</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
