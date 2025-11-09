import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useGamification } from '@/hooks/useGamification';
import { ACHIEVEMENT_DEFINITIONS } from '@/types/gamification';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';

export const AchievementsTab = () => {
  const { achievements, loading } = useGamification();

  if (loading) {
    return <div className="py-8 text-center text-muted-foreground">Loading achievements...</div>;
  }

  const earnedIds = new Set(achievements.map((a) => a.achievement_type));

  const rarityColors = {
    common: 'from-gray-400 to-gray-600',
    rare: 'from-purple-400 to-purple-600',
    epic: 'from-orange-400 to-red-600',
    legendary: 'from-amber-400 via-yellow-500 to-amber-600',
  };

  return (
    <div className="space-y-6 py-4">
      <div className="grid gap-4">
        {ACHIEVEMENT_DEFINITIONS.map((achievement) => {
          const isEarned = earnedIds.has(achievement.id);
          const IconComponent = (LucideIcons as any)[achievement.icon] || LucideIcons.Star;
          
          return (
            <div
              key={achievement.id}
              className={cn(
                'relative overflow-hidden rounded-lg border p-4 transition-all',
                isEarned
                  ? 'border-primary bg-primary/5 shadow-md'
                  : 'border-border bg-muted/50 opacity-60'
              )}
            >
              <div className="flex items-start gap-4">
                {/* Icon with gradient */}
                <div
                  className={cn(
                    'flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br',
                    rarityColors[achievement.rarity],
                    !isEarned && 'opacity-50 grayscale'
                  )}
                >
                  <IconComponent className="h-8 w-8 text-white" />
                </div>

                {/* Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-semibold text-lg flex items-center gap-2">
                        {achievement.title}
                        {isEarned && <Badge variant="default">Unlocked</Badge>}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        'capitalize',
                        achievement.rarity === 'legendary' && 'border-amber-500 text-amber-600',
                        achievement.rarity === 'epic' && 'border-orange-500 text-orange-600',
                        achievement.rarity === 'rare' && 'border-purple-500 text-purple-600'
                      )}
                    >
                      {achievement.rarity}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm font-medium">
                      +{achievement.points} points
                    </span>
                    {!isEarned && (
                      <span className="text-xs text-muted-foreground">
                        {achievement.criteria.type === 'concept_mastery' &&
                          `Master ${achievement.criteria.count} ${achievement.criteria.subject || ''} concepts`}
                        {achievement.criteria.type === 'test_completion' &&
                          `Complete ${achievement.criteria.count} tests`}
                        {achievement.criteria.type === 'streak' &&
                          `Maintain ${achievement.criteria.count}-day streak`}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Earned timestamp */}
              {isEarned && (
                <div className="mt-3 pt-3 border-t border-border/50">
                  <span className="text-xs text-muted-foreground">
                    Unlocked {new Date(achievements.find(a => a.achievement_type === achievement.id)?.earned_at || '').toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="rounded-lg border bg-card p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">{achievements.length}</div>
            <div className="text-sm text-muted-foreground">Unlocked</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{ACHIEVEMENT_DEFINITIONS.length}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </div>
          <div>
            <div className="text-2xl font-bold">
              {achievements.filter(a => {
                const def = ACHIEVEMENT_DEFINITIONS.find(d => d.id === a.achievement_type);
                return def?.rarity === 'rare' || def?.rarity === 'epic' || def?.rarity === 'legendary';
              }).length}
            </div>
            <div className="text-sm text-muted-foreground">Rare+</div>
          </div>
          <div>
            <div className="text-2xl font-bold">
              {Math.round((achievements.length / ACHIEVEMENT_DEFINITIONS.length) * 100)}%
            </div>
            <div className="text-sm text-muted-foreground">Complete</div>
          </div>
        </div>
      </div>
    </div>
  );
};
