import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useGamification } from '@/hooks/useGamification';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Target, Zap, Trophy, Star } from 'lucide-react';
import type { LearningPoints } from '@/types/gamification';

export const PointsTab = () => {
  const { user } = useAuth();
  const { totalPoints, loading } = useGamification();
  const [recentActivity, setRecentActivity] = useState<LearningPoints[]>([]);
  const [activityLoading, setActivityLoading] = useState(true);

  useEffect(() => {
    const fetchRecentActivity = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('learning_points')
          .select('*')
          .eq('user_id', user.id)
          .order('earned_at', { ascending: false })
          .limit(20);

        if (error) throw error;
        setRecentActivity(data as LearningPoints[]);
      } catch (error) {
        console.error('Error fetching activity:', error);
      } finally {
        setActivityLoading(false);
      }
    };

    fetchRecentActivity();
  }, [user]);

  if (loading || activityLoading) {
    return <div className="py-8 text-center text-muted-foreground">Loading points...</div>;
  }

  const activityIcons = {
    question_asked: Target,
    test_completed: Trophy,
    concept_mastered: Zap,
    achievement_unlocked: Star,
  };

  const activityColors = {
    question_asked: 'text-blue-600 bg-blue-100',
    test_completed: 'text-yellow-600 bg-yellow-100',
    concept_mastered: 'text-green-600 bg-green-100',
    achievement_unlocked: 'text-purple-600 bg-purple-100',
  };

  return (
    <div className="space-y-6 py-4">
      {/* Total Points Card */}
      <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-6">
        <div className="text-center">
          <div className="text-5xl font-bold mb-2">{totalPoints.toLocaleString()}</div>
          <div className="text-lg opacity-90">Total Learning Points</div>
          <div className="text-sm opacity-75 mt-2">
            Earned through meaningful learning activities
          </div>
        </div>
      </Card>

      {/* How Points Work */}
      <div className="rounded-lg border bg-card p-4 space-y-3">
        <h3 className="font-semibold mb-3">How You Earn Points</h3>
        <div className="grid gap-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-600" />
              <span>Ask a learning question</span>
            </div>
            <Badge variant="secondary">+5 pts</Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-green-600" />
              <span>Master a concept</span>
            </div>
            <Badge variant="secondary">+15 pts</Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-yellow-600" />
              <span>Complete practice test</span>
            </div>
            <Badge variant="secondary">+25 pts</Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-purple-600" />
              <span>Unlock achievement</span>
            </div>
            <Badge variant="secondary">Varies</Badge>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3 p-3 bg-muted/50 rounded">
          💡 Points reward learning outcomes, not time spent. Quality over quantity!
        </p>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="font-semibold mb-3">Recent Activity</h3>
        <div className="space-y-2">
          {recentActivity.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No activity yet.</p>
              <p className="text-sm mt-2">Start learning to earn points!</p>
            </div>
          ) : (
            recentActivity.map((activity) => {
              const Icon = activityIcons[activity.activity_type];
              const colorClass = activityColors[activity.activity_type];

              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-lg border bg-card"
                >
                  <div className={`p-2 rounded-full ${colorClass}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.reason}</p>
                    {activity.subject && (
                      <p className="text-xs text-muted-foreground">{activity.subject}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(activity.earned_at).toLocaleDateString()} at{' '}
                      {new Date(activity.earned_at).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <Badge variant="secondary" className="flex-shrink-0">
                    +{activity.points}
                  </Badge>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
