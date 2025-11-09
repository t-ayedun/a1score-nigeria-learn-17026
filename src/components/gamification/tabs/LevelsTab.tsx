import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useGamification } from '@/hooks/useGamification';
import { LEVEL_REQUIREMENTS } from '@/types/gamification';
import { TrendingUp, Award, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export const LevelsTab = () => {
  const { subjectLevels, loading } = useGamification();

  if (loading) {
    return <div className="py-8 text-center text-muted-foreground">Loading levels...</div>;
  }

  const levelNames = ['beginner', 'intermediate', 'advanced', 'expert'] as const;

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'beginner':
        return TrendingUp;
      case 'intermediate':
        return Star;
      case 'advanced':
        return Award;
      case 'expert':
        return Award;
      default:
        return TrendingUp;
    }
  };

  return (
    <div className="space-y-6 py-4">
      {/* Overview */}
      <div className="rounded-lg border bg-card p-6">
        <h3 className="text-lg font-semibold mb-4">How Levels Work</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Progress through levels by mastering concepts in each subject. Levels are based on
          demonstrated understanding, not just time spent.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {levelNames.map((level) => {
            const Icon = getLevelIcon(level);
            const req = LEVEL_REQUIREMENTS[level];
            return (
              <div
                key={level}
                className="text-center p-3 rounded-lg border bg-muted/30"
              >
                <div
                  className={cn(
                    'w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center bg-gradient-to-br',
                    req.color
                  )}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="font-medium capitalize">{level}</div>
                <div className="text-xs text-muted-foreground">
                  {req.max === Infinity ? `${req.min}+` : `${req.min}-${req.max}`} concepts
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subject Levels */}
      <div>
        <h3 className="font-semibold mb-4">Your Subject Levels</h3>
        {subjectLevels.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No subject levels yet.</p>
            <p className="text-sm mt-2">
              Start mastering concepts to unlock your first level!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {subjectLevels.map((subjectLevel) => {
              const Icon = getLevelIcon(subjectLevel.level_name);
              const req = LEVEL_REQUIREMENTS[subjectLevel.level_name];
              const isAchieved = subjectLevel.achieved_at !== null;

              return (
                <div
                  key={subjectLevel.id}
                  className={cn(
                    'rounded-lg border p-4 transition-all',
                    isAchieved
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-card'
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        'w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br',
                        req.color
                      )}
                    >
                      <Icon className="h-7 w-7 text-white" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-lg">{subjectLevel.subject}</h4>
                          <Badge
                            variant={isAchieved ? 'default' : 'secondary'}
                            className="capitalize mt-1"
                          >
                            {subjectLevel.level_name}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">
                            {subjectLevel.concepts_mastered}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            /{subjectLevel.concepts_required}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">
                            {subjectLevel.progress_percentage}%
                          </span>
                        </div>
                        <Progress value={subjectLevel.progress_percentage} className="h-2" />
                      </div>

                      {isAchieved && subjectLevel.achieved_at && (
                        <p className="text-xs text-muted-foreground mt-3">
                          Achieved on{' '}
                          {new Date(subjectLevel.achieved_at).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Next Level Preview */}
      <div className="rounded-lg border bg-muted/50 p-4">
        <h3 className="font-semibold mb-3">Level Up Tips</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span>Complete practice tests to demonstrate concept mastery</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span>Ask questions and engage with the AI tutor deeply</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span>Review spaced repetition cards regularly</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span>Focus on understanding, not just memorization</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
