import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface UserPreferences {
  // Onboarding data
  learningSubjects: string[];
  examDate: string | null;
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading' | null;
  explanationPreference: 'visual' | 'technical' | 'simple' | null;
  onboardingCompleted: boolean;
  
  // Profile data
  academicLevel: string | null;
  userType: string | null;
  fullName: string | null;
  
  // Computed
  hasPreferences: boolean;
  daysUntilExam: number | null;
}

export const useUserPreferences = () => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchPreferences();
    }
  }, [user]);

  const fetchPreferences = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Fetch onboarding progress
      const { data: onboarding } = await supabase
        .from('onboarding_progress')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      // Fetch profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      // Calculate days until exam
      let daysUntilExam: number | null = null;
      if (onboarding?.exam_date) {
        const examDate = new Date(onboarding.exam_date);
        const today = new Date();
        const diffTime = examDate.getTime() - today.getTime();
        daysUntilExam = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      }

      const userPreferences: UserPreferences = {
        learningSubjects: onboarding?.learning_subjects || [],
        examDate: onboarding?.exam_date || null,
        learningStyle: onboarding?.learning_style as 'visual' | 'auditory' | 'kinesthetic' | 'reading' || null,
        explanationPreference: onboarding?.explanation_preference as 'visual' | 'technical' | 'simple' || null,
        onboardingCompleted: onboarding?.onboarding_completed || false,
        academicLevel: profile?.academic_level || null,
        userType: profile?.user_type || null,
        fullName: profile?.full_name || null,
        hasPreferences: !!(onboarding?.learning_subjects?.length || profile?.academic_level),
        daysUntilExam,
      };

      setPreferences(userPreferences);
    } catch (error) {
      console.error('Error fetching user preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    preferences,
    loading,
    refetch: fetchPreferences,
  };
};
