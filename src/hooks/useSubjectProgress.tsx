import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface SubjectProgress {
  subject: string;
  totalQuizzes: number;
  averageScore: number;
  totalStudyHours: number;
  lastStudied: string;
  weeklyHours: number;
  topicsCompleted: number;
  questionsAnswered: number;
}

export const useSubjectProgress = () => {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState<SubjectProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [weeklyStats, setWeeklyStats] = useState({
    totalHours: 0,
    questionsAnswered: 0,
    topicsCompleted: 0,
    averageScore: 0
  });

  useEffect(() => {
    if (user) {
      fetchSubjectProgress();
    }
  }, [user]);

  const fetchSubjectProgress = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Get quiz attempts by subject
      const { data: quizAttempts } = await supabase
        .from('quiz_attempts')
        .select('*')
        .eq('user_id', user.id);

      // Get learning sessions by subject
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const { data: allSessions } = await supabase
        .from('learning_sessions')
        .select('*')
        .eq('user_id', user.id);

      const { data: recentSessions } = await supabase
        .from('learning_sessions')
        .select('*')
        .eq('user_id', user.id)
        .gte('started_at', oneWeekAgo.toISOString());

      // Group data by subject
      const subjectMap = new Map<string, {
        quizzes: any[];
        sessions: any[];
        recentSessions: any[];
      }>();

      // Process quiz attempts
      quizAttempts?.forEach(quiz => {
        const subject = quiz.subject || 'General';
        if (!subjectMap.has(subject)) {
          subjectMap.set(subject, { quizzes: [], sessions: [], recentSessions: [] });
        }
        subjectMap.get(subject)!.quizzes.push(quiz);
      });

      // Process all sessions
      allSessions?.forEach(session => {
        const subject = session.subject || 'General';
        if (!subjectMap.has(subject)) {
          subjectMap.set(subject, { quizzes: [], sessions: [], recentSessions: [] });
        }
        subjectMap.get(subject)!.sessions.push(session);
      });

      // Process recent sessions
      recentSessions?.forEach(session => {
        const subject = session.subject || 'General';
        if (subjectMap.has(subject)) {
          subjectMap.get(subject)!.recentSessions.push(session);
        }
      });

      // Calculate progress for each subject
      const subjectProgress: SubjectProgress[] = Array.from(subjectMap.entries()).map(([subject, data]) => {
        const avgScore = data.quizzes.length > 0
          ? data.quizzes.reduce((sum, q) => sum + (q.score || 0), 0) / data.quizzes.length
          : 0;

        const totalMinutes = data.sessions.reduce((sum, s) => sum + (s.duration_minutes || 0), 0);
        const weeklyMinutes = data.recentSessions.reduce((sum, s) => sum + (s.duration_minutes || 0), 0);

        const totalQuestions = data.quizzes.reduce((sum, q) => sum + (q.questions_count || 0), 0);

        // Get last studied date
        const lastSession = data.sessions.length > 0
          ? data.sessions.sort((a, b) => 
              new Date(b.started_at).getTime() - new Date(a.started_at).getTime()
            )[0]
          : null;

        const lastStudied = lastSession
          ? getRelativeTime(new Date(lastSession.started_at))
          : 'Never';

        // Estimate topics completed (1 topic per 30 minutes of study + 1 per quiz)
        const topicsCompleted = Math.floor(totalMinutes / 30) + data.quizzes.length;

        return {
          subject,
          totalQuizzes: data.quizzes.length,
          averageScore: Math.round(avgScore),
          totalStudyHours: Math.round(totalMinutes / 60 * 10) / 10,
          weeklyHours: Math.round(weeklyMinutes / 60 * 10) / 10,
          lastStudied,
          topicsCompleted,
          questionsAnswered: totalQuestions
        };
      });

      // Sort by total study hours (most studied first)
      subjectProgress.sort((a, b) => b.totalStudyHours - a.totalStudyHours);

      // Calculate overall weekly stats
      const totalWeeklyMinutes = recentSessions?.reduce((sum, s) => sum + (s.duration_minutes || 0), 0) || 0;
      const recentQuizzes = quizAttempts?.filter(q => {
        const quizDate = new Date(q.completed_at);
        return quizDate >= oneWeekAgo;
      }) || [];
      const weeklyQuestions = recentQuizzes.reduce((sum, q) => sum + (q.questions_count || 0), 0);
      const weeklyAvgScore = recentQuizzes.length > 0
        ? Math.round(recentQuizzes.reduce((sum, q) => sum + (q.score || 0), 0) / recentQuizzes.length)
        : 0;
      const weeklyTopics = Math.floor(totalWeeklyMinutes / 30) + recentQuizzes.length;

      setWeeklyStats({
        totalHours: Math.round(totalWeeklyMinutes / 60 * 10) / 10,
        questionsAnswered: weeklyQuestions,
        topicsCompleted: weeklyTopics,
        averageScore: weeklyAvgScore
      });

      setSubjects(subjectProgress);
    } catch (error) {
      console.error('Error fetching subject progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
    return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
  };

  return {
    subjects,
    loading,
    weeklyStats,
    refreshProgress: fetchSubjectProgress
  };
};
