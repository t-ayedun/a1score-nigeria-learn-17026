// @ts-nocheck
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface StudySession {
  id: string;
  subject_id: string;
  session_type: string;
  duration_minutes: number;
  points_earned: number;
  started_at: string;
  ended_at: string | null;
  metadata: any;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  badge_icon: string;
  badge_color: string;
  criteria: any;
  points: number;
  earned_at?: string;
}

interface ProgressStats {
  totalQuizzes: number;
  averageScore: number;
  streakDays: number;
  totalStudyHours: number;
  totalPoints: number;
  leagueRank?: number;
  leagueName?: string;
  achievements: Achievement[];
  weeklyProgress: { subject: string; hours: number; points: number }[];
}

export const useProgressTracking = () => {
  const { user } = useAuth();
  const [progressStats, setProgressStats] = useState<ProgressStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentSession, setCurrentSession] = useState<StudySession | null>(null);

  useEffect(() => {
    if (user) {
      loadProgressStats();
    }
  }, [user]);

  const loadProgressStats = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Get quiz attempts for quiz stats
      const { data: quizAttempts } = await supabase
        .from('quiz_attempts')
        .select('*')
        .eq('user_id', user.id);

      const totalQuizzes = quizAttempts?.length || 0;
      const averageScore = quizAttempts && quizAttempts.length > 0
        ? quizAttempts.reduce((sum, q) => sum + (q.score || 0), 0) / quizAttempts.length
        : 0;

      // Get user achievements
      const { data: userAchievements } = await supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', user.id);

      // Get learning sessions for weekly progress
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const { data: recentSessions } = await supabase
        .from('learning_sessions')
        .select('*')
        .eq('user_id', user.id)
        .gte('started_at', oneWeekAgo.toISOString());

      // Calculate total study hours from sessions
      const totalStudyHours = recentSessions?.reduce((total, session) => 
        total + (session.duration_minutes || 0), 0) || 0;

      // Get learning points for total points
      const { data: pointsData } = await supabase
        .from('learning_points')
        .select('points')
        .eq('user_id', user.id);

      const totalPoints = pointsData?.reduce((sum, p) => sum + (p.points || 0), 0) || 0;

      // Group weekly progress by subject from sessions
      const weeklyProgress = recentSessions?.reduce((acc: any[], session: any) => {
        const subjectName = session.subject || 'General';
        const existing = acc.find(item => item.subject === subjectName);
        
        if (existing) {
          existing.hours += session.duration_minutes || 0;
          existing.points += 0; // Points are tracked separately
        } else {
          acc.push({
            subject: subjectName,
            hours: session.duration_minutes || 0,
            points: 0
          });
        }
        
        return acc;
      }, []) || [];

      // Get streak from learning_streaks table
      const { data: streakData } = await supabase
        .from('learning_streaks')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      const streakDays = streakData?.current_streak || 0;

      // Calculate league rank based on total points
      const { data: allUsersPoints } = await supabase
        .from('learning_points')
        .select('user_id, points');

      // Aggregate points by user
      const userPointsMap = new Map<string, number>();
      allUsersPoints?.forEach(p => {
        const current = userPointsMap.get(p.user_id) || 0;
        userPointsMap.set(p.user_id, current + (p.points || 0));
      });

      // Sort users by points
      const sortedUsers = Array.from(userPointsMap.entries())
        .sort((a, b) => b[1] - a[1]);

      const userRank = sortedUsers.findIndex(([userId]) => userId === user.id);
      const leagueName = totalPoints < 500 ? 'Bronze League' :
                        totalPoints < 1500 ? 'Silver League' :
                        totalPoints < 3000 ? 'Gold League' : 'Diamond League';

      setProgressStats({
        totalQuizzes,
        averageScore: Math.round(averageScore),
        streakDays,
        totalStudyHours: Math.round(totalStudyHours / 60), // Convert to hours
        totalPoints,
        leagueRank: userRank >= 0 ? userRank + 1 : undefined,
        leagueName,
        achievements: userAchievements || [],
        weeklyProgress
      });

    } catch (error) {
      console.error('Error loading progress stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStreakDays = (sessions: any[]) => {
    if (!sessions.length) return 0;

    const uniqueDays = [...new Set(sessions.map(session => 
      new Date(session.started_at).toDateString()
    ))].sort();

    let streak = 0;
    const today = new Date().toDateString();
    
    // Count consecutive days ending with today or yesterday
    for (let i = uniqueDays.length - 1; i >= 0; i--) {
      const daysDiff = Math.floor((new Date(today).getTime() - new Date(uniqueDays[i]).getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === streak) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const startStudySession = async (subject: string, sessionType: string) => {
    if (!user) return null;

    try {
      const { data: session, error } = await supabase
        .from('learning_sessions')
        .insert({
          user_id: user.id,
          subject: subject,
          session_type: sessionType,
          started_at: new Date().toISOString(),
          duration_minutes: 0
        })
        .select()
        .single();

      if (error) throw error;

      setCurrentSession(session);
      return session;
    } catch (error) {
      console.error('Error starting study session:', error);
      return null;
    }
  };

  const endStudySession = async (pointsEarned: number = 0) => {
    if (!currentSession || !user) return;

    try {
      const endTime = new Date();
      const startTime = new Date(currentSession.started_at);
      const durationMinutes = Math.floor((endTime.getTime() - startTime.getTime()) / (1000 * 60));

      await supabase
        .from('learning_sessions')
        .update({
          ended_at: endTime.toISOString(),
          duration_minutes: durationMinutes
        })
        .eq('id', currentSession.id);

      // Award points separately if provided
      if (pointsEarned > 0) {
        await supabase
          .from('learning_points')
          .insert({
            user_id: user.id,
            activity_type: currentSession.session_type,
            subject: currentSession.subject,
            points: pointsEarned,
            reason: 'Study session completed'
          });
      }

      setCurrentSession(null);
      loadProgressStats(); // Refresh stats
    } catch (error) {
      console.error('Error ending study session:', error);
    }
  };

  const checkAndAwardAchievements = async () => {
    if (!user || !progressStats) return;

    try {
      // Award achievements based on progress
      const achievements = [];

      // Quiz milestones
      if (progressStats.totalQuizzes >= 1 && !progressStats.achievements.some(a => a.achievement_type === 'first_quiz')) {
        achievements.push({
          user_id: user.id,
          achievement_type: 'first_quiz',
          title: 'First Quiz',
          description: 'Completed your first quiz'
        });
      }
      if (progressStats.totalQuizzes >= 10 && !progressStats.achievements.some(a => a.achievement_type === 'quiz_master')) {
        achievements.push({
          user_id: user.id,
          achievement_type: 'quiz_master',
          title: 'Quiz Master',
          description: 'Completed 10 quizzes'
        });
      }

      // Streak milestones
      if (progressStats.streakDays >= 7 && !progressStats.achievements.some(a => a.achievement_type === 'week_streak')) {
        achievements.push({
          user_id: user.id,
          achievement_type: 'week_streak',
          title: '7 Day Streak',
          description: 'Maintained a 7-day learning streak'
        });
      }

      if (achievements.length > 0) {
        await supabase.from('user_achievements').insert(achievements);
        loadProgressStats(); // Refresh to show new achievements
      }
    } catch (error) {
      console.error('Error checking achievements:', error);
    }
  };

  return {
    progressStats,
    loading,
    currentSession,
    startStudySession,
    endStudySession,
    checkAndAwardAchievements,
    refreshStats: loadProgressStats
  };
};