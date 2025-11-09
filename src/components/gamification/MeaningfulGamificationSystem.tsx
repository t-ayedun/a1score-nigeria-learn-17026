import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AchievementsTab } from './tabs/AchievementsTab';
import { PointsTab } from './tabs/PointsTab';
import { StreakTab } from './tabs/StreakTab';
import { LevelsTab } from './tabs/LevelsTab';
import { LeaderboardTab } from './tabs/LeaderboardTab';
import { useGamification } from '@/hooks/useGamification';
import { EyeOff } from 'lucide-react';

export const MeaningfulGamificationSystem = () => {
  const { gamificationEnabled, loading, toggleGamification } = useGamification();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!gamificationEnabled) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Gamification</span>
            <div className="flex items-center gap-2">
              <Label htmlFor="gamification-toggle" className="text-sm font-normal">
                Enable
              </Label>
              <Switch
                id="gamification-toggle"
                checked={gamificationEnabled}
                onCheckedChange={toggleGamification}
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <EyeOff className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">
              Gamification is currently hidden. Focus on learning without distractions.
            </p>
            <p className="text-sm text-muted-foreground">
              You can re-enable it anytime using the toggle above.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Your Learning Journey</span>
            <div className="flex items-center gap-2">
              <Label htmlFor="gamification-toggle" className="text-sm font-normal text-muted-foreground">
                Hide gamification
              </Label>
              <Switch
                id="gamification-toggle"
                checked={gamificationEnabled}
                onCheckedChange={toggleGamification}
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="achievements" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="points">Points</TabsTrigger>
              <TabsTrigger value="streak">Streak</TabsTrigger>
              <TabsTrigger value="levels">Levels</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            </TabsList>

            <TabsContent value="achievements">
              <AchievementsTab />
            </TabsContent>

            <TabsContent value="points">
              <PointsTab />
            </TabsContent>

            <TabsContent value="streak">
              <StreakTab />
            </TabsContent>

            <TabsContent value="levels">
              <LevelsTab />
            </TabsContent>

            <TabsContent value="leaderboard">
              <LeaderboardTab />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
