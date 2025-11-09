import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useGamification } from '@/hooks/useGamification';
import { supabase } from '@/integrations/supabase/client';
import { Crown, EyeOff, Trophy } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface LeaderboardEntry {
  user_id: string;
  full_name: string;
  total_points: number;
  rank: number;
}

export const LeaderboardTab = () => {
  const { user } = useAuth();
  const { totalPoints } = useGamification();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [anonymousMode, setAnonymousMode] = useState(false);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      if (!user) return;

      try {
        // Fetch leaderboard preferences
        const { data: prefs, error: prefsError } = await supabase
          .from('leaderboard_preferences')
          .select('is_visible, anonymous_mode')
          .eq('user_id', user.id)
          .single();

        if (prefsError && prefsError.code !== 'PGRST116') throw prefsError;

        if (prefs) {
          setIsVisible(prefs.is_visible);
          setAnonymousMode(prefs.anonymous_mode);
        }

        // Fetch top users by points
        const { data: pointsData, error: pointsError } = await supabase
          .from('learning_points')
          .select('user_id, points');

        if (pointsError) throw pointsError;

        // Aggregate points by user
        const userPoints = new Map<string, number>();
        pointsData?.forEach((record) => {
          const current = userPoints.get(record.user_id) || 0;
          userPoints.set(record.user_id, current + record.points);
        });

        // Get user profiles
        const userIds = Array.from(userPoints.keys());
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('user_id, full_name')
          .in('user_id', userIds);

        if (profilesError) throw profilesError;

        // Combine and sort
        const entries: LeaderboardEntry[] = userIds
          .map((userId, index) => {
            const profile = profiles?.find((p) => p.user_id === userId);
            return {
              user_id: userId,
              full_name: profile?.full_name || 'Anonymous User',
              total_points: userPoints.get(userId) || 0,
              rank: 0, // Will be set after sorting
            };
          })
          .sort((a, b) => b.total_points - a.total_points)
          .slice(0, 50)
          .map((entry, index) => ({
            ...entry,
            rank: index + 1,
          }));

        setLeaderboard(entries);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [user]);

  const updatePreferences = async (updates: { is_visible?: boolean; anonymous_mode?: boolean }) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('leaderboard_preferences')
        .upsert(
          {
            user_id: user.id,
            ...updates,
          },
          { onConflict: 'user_id' }
        );

      if (error) throw error;
    } catch (error) {
      console.error('Error updating preferences:', error);
    }
  };

  const handleVisibilityToggle = (checked: boolean) => {
    setIsVisible(checked);
    updatePreferences({ is_visible: checked });
  };

  const handleAnonymousToggle = (checked: boolean) => {
    setAnonymousMode(checked);
    updatePreferences({ anonymous_mode: checked });
  };

  if (loading) {
    return <div className="py-8 text-center text-muted-foreground">Loading leaderboard...</div>;
  }

  const currentUserEntry = leaderboard.find((entry) => entry.user_id === user?.id);

  return (
    <div className="space-y-6 py-4">
      {/* Privacy Controls */}
      <div className="rounded-lg border bg-card p-4 space-y-4">
        <h3 className="font-semibold">Leaderboard Privacy</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label htmlFor="visibility-toggle" className="font-normal">
                Show me on leaderboard
              </Label>
              <p className="text-xs text-muted-foreground">
                Others can see your rank and points
              </p>
            </div>
            <Switch
              id="visibility-toggle"
              checked={isVisible}
              onCheckedChange={handleVisibilityToggle}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label htmlFor="anonymous-toggle" className="font-normal">
                Anonymous mode
              </Label>
              <p className="text-xs text-muted-foreground">
                Show as "Anonymous User" instead of your name
              </p>
            </div>
            <Switch
              id="anonymous-toggle"
              checked={anonymousMode}
              onCheckedChange={handleAnonymousToggle}
              disabled={!isVisible}
            />
          </div>
        </div>
      </div>

      {!isVisible && (
        <Alert>
          <EyeOff className="h-4 w-4" />
          <AlertDescription>
            You're hidden from the leaderboard. Enable visibility above to participate.
          </AlertDescription>
        </Alert>
      )}

      {/* Your Rank */}
      {currentUserEntry && (
        <div className="rounded-lg border-2 border-primary bg-primary/5 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                #{currentUserEntry.rank}
              </div>
              <div>
                <p className="font-semibold">Your Rank</p>
                <p className="text-sm text-muted-foreground">
                  {anonymousMode ? 'Anonymous User' : currentUserEntry.full_name}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{currentUserEntry.total_points}</div>
              <div className="text-xs text-muted-foreground">points</div>
            </div>
          </div>
        </div>
      )}

      {/* Top Learners */}
      <div>
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-600" />
          Top Learners
        </h3>
        <div className="space-y-2">
          {leaderboard.slice(0, 10).map((entry) => {
            const isCurrentUser = entry.user_id === user?.id;
            const rankColor =
              entry.rank === 1
                ? 'bg-yellow-500 text-white'
                : entry.rank === 2
                ? 'bg-gray-400 text-white'
                : entry.rank === 3
                ? 'bg-orange-500 text-white'
                : 'bg-muted text-muted-foreground';

            return (
              <div
                key={entry.user_id}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  isCurrentUser
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-card'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${rankColor}`}
                  >
                    {entry.rank === 1 && <Crown className="h-5 w-5" />}
                    {entry.rank !== 1 && `#${entry.rank}`}
                  </div>
                  <div>
                    <p className="font-medium">
                      {entry.full_name}
                      {isCurrentUser && (
                        <Badge variant="outline" className="ml-2">
                          You
                        </Badge>
                      )}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{entry.total_points.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">points</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info */}
      <div className="rounded-lg border bg-muted/50 p-4">
        <p className="text-sm text-muted-foreground">
          💡 The leaderboard ranks users by total learning points earned through meaningful
          activities like mastering concepts, completing tests, and asking thoughtful questions.
        </p>
      </div>
    </div>
  );
};
