import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';
import type {
  ConceptMastery,
  LearningPoints,
  LearningStreak,
  SubjectLevel,
  Achievement,
  AchievementDefinition,
} from '@/types/gamification';
import { ACHIEVEMENT_DEFINITIONS } from '@/types/gamification';

export const useGamification = () => {
  const { user } = useAuth();
  const [gamificationEnabled, setGamificationEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [totalPoints, setTotalPoints] = useState(0);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [streak, setStreak] = useState<LearningStreak | null>(null);
  const [subjectLevels, setSubjectLevels] = useState<SubjectLevel[]>([]);

  const fetchGamificationPreference = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('gamification_enabled')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      setGamificationEnabled(data?.gamification_enabled ?? true);
    } catch (error) {
      console.error('Error fetching gamification preference:', error);
    }
  }, [user]);

  const fetchTotalPoints = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('learning_points')
        .select('points')
        .eq('user_id', user.id);

      if (error) throw error;
      
      const total = data?.reduce((sum, record) => sum + record.points, 0) || 0;
      setTotalPoints(total);
    } catch (error) {
      console.error('Error fetching points:', error);
    }
  }, [user]);

  const fetchAchievements = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', user.id)
        .order('earned_at', { ascending: false });

      if (error) throw error;
      setAchievements(data as Achievement[]);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    }
  }, [user]);

  const fetchStreak = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('learning_streaks')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (!data) {
        // Create initial streak
        const { data: newStreak, error: insertError } = await supabase
          .from('learning_streaks')
          .insert({
            user_id: user.id,
            current_streak: 0,
            longest_streak: 0,
            weekly_activity_pattern: [0, 0, 0, 0, 0, 0, 0],
          })
          .select()
          .single();

        if (insertError) throw insertError;
        setStreak(newStreak as LearningStreak);
      } else {
        setStreak(data as LearningStreak);
      }
    } catch (error) {
      console.error('Error fetching streak:', error);
    }
  }, [user]);

  const fetchSubjectLevels = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('subject_levels')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      setSubjectLevels(data as SubjectLevel[]);
    } catch (error) {
      console.error('Error fetching subject levels:', error);
    }
  }, [user]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchGamificationPreference(),
        fetchTotalPoints(),
        fetchAchievements(),
        fetchStreak(),
        fetchSubjectLevels(),
      ]);
      setLoading(false);
    };

    if (user) {
      loadData();
    }
  }, [user, fetchGamificationPreference, fetchTotalPoints, fetchAchievements, fetchStreak, fetchSubjectLevels]);

  const toggleGamification = async (enabled: boolean) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ gamification_enabled: enabled })
        .eq('user_id', user.id);

      if (error) throw error;
      
      setGamificationEnabled(enabled);
      toast.success(enabled ? 'Gamification enabled' : 'Gamification disabled');
    } catch (error) {
      console.error('Error toggling gamification:', error);
      toast.error('Failed to update preference');
    }
  };

  const awardPoints = async (
    points: number,
    reason: string,
    activityType: 'question_asked' | 'test_completed' | 'concept_mastered' | 'achievement_unlocked',
    subject?: string,
    metadata?: Record<string, any>
  ) => {
    if (!user || !gamificationEnabled) return;

    try {
      const { error } = await supabase
        .from('learning_points')
        .insert({
          user_id: user.id,
          points,
          reason,
          activity_type: activityType,
          subject,
          metadata: metadata || {},
        });

      if (error) throw error;
      
      await fetchTotalPoints();
      toast.success(`+${points} points earned!`, { description: reason });
    } catch (error) {
      console.error('Error awarding points:', error);
    }
  };

  const recordConceptMastery = async (subject: string, conceptName: string, masteryLevel: number) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('concept_mastery')
        .upsert({
          user_id: user.id,
          subject,
          concept_name: conceptName,
          mastery_level: masteryLevel,
          evidence_count: 1,
          last_practiced_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,subject,concept_name',
        })
        .select()
        .single();

      if (error) throw error;

      // Award points for mastery milestone
      if (masteryLevel >= 80 && gamificationEnabled) {
        await awardPoints(
          15,
          `Mastered "${conceptName}"`,
          'concept_mastered',
          subject,
          { concept: conceptName, mastery_level: masteryLevel }
        );
      }

      // Check for achievements
      await checkAchievements();
      
      // Update subject level
      await updateSubjectLevel(subject);
    } catch (error) {
      console.error('Error recording concept mastery:', error);
    }
  };

  const updateStreak = async (hadLearningActivity: boolean) => {
    if (!user || !streak) return;

    try {
      const today = new Date().toISOString().split('T')[0];
      const lastActivity = streak.last_activity_date;
      
      if (lastActivity === today) return; // Already counted today

      const daysDiff = lastActivity 
        ? Math.floor((new Date(today).getTime() - new Date(lastActivity).getTime()) / (1000 * 60 * 60 * 24))
        : 1;

      let newStreak = streak.current_streak;
      
      if (hadLearningActivity) {
        if (daysDiff === 1) {
          newStreak += 1;
        } else if (daysDiff > 1) {
          newStreak = 1; // Reset streak
        }
      }

      // Update weekly pattern (last 7 days)
      const dayOfWeek = new Date().getDay();
      const newPattern = [...streak.weekly_activity_pattern];
      newPattern[dayOfWeek] = hadLearningActivity ? 1 : 0;

      const { error } = await supabase
        .from('learning_streaks')
        .update({
          current_streak: newStreak,
          longest_streak: Math.max(newStreak, streak.longest_streak),
          last_activity_date: today,
          weekly_activity_pattern: newPattern,
        })
        .eq('user_id', user.id);

      if (error) throw error;
      
      await fetchStreak();
    } catch (error) {
      console.error('Error updating streak:', error);
    }
  };

  const repairStreak = async (method: 'quiz' | 'video') => {
    if (!user || !streak || streak.streak_repairs_available <= 0) return;

    try {
      const { error } = await supabase
        .from('learning_streaks')
        .update({
          streak_repairs_used: streak.streak_repairs_used + 1,
          streak_repairs_available: streak.streak_repairs_available - 1,
          current_streak: streak.current_streak + 1,
        })
        .eq('user_id', user.id);

      if (error) throw error;
      
      toast.success('Streak repaired!', {
        description: `Used ${method} repair. ${streak.streak_repairs_available - 1} repairs remaining.`,
      });
      
      await fetchStreak();
    } catch (error) {
      console.error('Error repairing streak:', error);
      toast.error('Failed to repair streak');
    }
  };

  const updateSubjectLevel = async (subject: string) => {
    if (!user) return;

    try {
      // Get concept mastery count for subject
      const { data: concepts, error: conceptError } = await supabase
        .from('concept_mastery')
        .select('mastery_level')
        .eq('user_id', user.id)
        .eq('subject', subject)
        .gte('mastery_level', 80);

      if (conceptError) throw conceptError;

      const masteredCount = concepts?.length || 0;

      // Determine level based on concept count
      let levelName: 'beginner' | 'intermediate' | 'advanced' | 'expert' = 'beginner';
      let conceptsRequired = 10;

      if (masteredCount >= 51) {
        levelName = 'expert';
        conceptsRequired = 51;
      } else if (masteredCount >= 26) {
        levelName = 'advanced';
        conceptsRequired = 50;
      } else if (masteredCount >= 11) {
        levelName = 'intermediate';
        conceptsRequired = 25;
      } else {
        levelName = 'beginner';
        conceptsRequired = 10;
      }

      // Upsert level
      const { error } = await supabase
        .from('subject_levels')
        .upsert({
          user_id: user.id,
          subject,
          level_name: levelName,
          concepts_mastered: masteredCount,
          concepts_required: conceptsRequired,
          progress_percentage: Math.min(100, Math.floor((masteredCount / conceptsRequired) * 100)),
          achieved_at: masteredCount >= conceptsRequired ? new Date().toISOString() : null,
        }, {
          onConflict: 'user_id,subject,level_name',
        });

      if (error) throw error;
      
      await fetchSubjectLevels();
    } catch (error) {
      console.error('Error updating subject level:', error);
    }
  };

  const checkAchievements = async () => {
    if (!user || !gamificationEnabled) return;

    try {
      // Get all concept mastery
      const { data: allConcepts, error: conceptError } = await supabase
        .from('concept_mastery')
        .select('*')
        .eq('user_id', user.id)
        .gte('mastery_level', 80);

      if (conceptError) throw conceptError;

      const totalMastered = allConcepts?.length || 0;

      // Check each achievement definition
      for (const def of ACHIEVEMENT_DEFINITIONS) {
        // Check if already earned
        const alreadyEarned = achievements.some(a => a.achievement_type === def.id);
        if (alreadyEarned) continue;

        let shouldAward = false;

        if (def.criteria.type === 'concept_mastery') {
          if (def.criteria.subject) {
            const subjectCount = allConcepts?.filter(c => c.subject === def.criteria.subject).length || 0;
            shouldAward = subjectCount >= def.criteria.count;
          } else {
            shouldAward = totalMastered >= def.criteria.count;
          }
        }

        if (shouldAward) {
          const { error: achievementError } = await supabase
            .from('user_achievements')
            .insert({
              user_id: user.id,
              achievement_type: def.id,
              title: def.title,
              description: def.description,
              icon: def.icon,
              concept_count: def.criteria.count,
              subject: def.criteria.subject,
              rarity: def.rarity,
              metadata: { auto_awarded: true },
            });

          if (achievementError) throw achievementError;

          await awardPoints(
            def.points,
            `Achievement unlocked: ${def.title}`,
            'achievement_unlocked'
          );

          toast.success(`🏆 Achievement Unlocked!`, {
            description: def.title,
          });
        }
      }

      await fetchAchievements();
    } catch (error) {
      console.error('Error checking achievements:', error);
    }
  };

  return {
    gamificationEnabled,
    loading,
    totalPoints,
    achievements,
    streak,
    subjectLevels,
    toggleGamification,
    awardPoints,
    recordConceptMastery,
    updateStreak,
    repairStreak,
    checkAchievements,
  };
};
