export type AchievementRarity = 'common' | 'rare' | 'epic' | 'legendary';
export type LevelName = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface ConceptMastery {
  id: string;
  user_id: string;
  subject: string;
  concept_name: string;
  mastery_level: number;
  evidence_count: number;
  first_learned_at: string;
  last_practiced_at: string;
  created_at: string;
  updated_at: string;
}

export interface LearningPoints {
  id: string;
  user_id: string;
  points: number;
  reason: string;
  activity_type: 'question_asked' | 'test_completed' | 'concept_mastered' | 'achievement_unlocked';
  subject?: string;
  metadata: Record<string, any>;
  earned_at: string;
  created_at: string;
}

export interface LearningStreak {
  id: string;
  user_id: string;
  current_streak: number;
  longest_streak: number;
  last_activity_date: string;
  weekly_activity_pattern: number[]; // 7 days, 1 = active, 0 = inactive
  streak_repairs_used: number;
  streak_repairs_available: number;
  created_at: string;
  updated_at: string;
}

export interface SubjectLevel {
  id: string;
  user_id: string;
  subject: string;
  level_name: LevelName;
  concepts_mastered: number;
  concepts_required: number;
  progress_percentage: number;
  achieved_at?: string;
  created_at: string;
  updated_at: string;
}

export interface LeaderboardPreferences {
  id: string;
  user_id: string;
  is_visible: boolean;
  anonymous_mode: boolean;
  created_at: string;
  updated_at: string;
}

export interface Achievement {
  id: string;
  user_id: string;
  achievement_type: string;
  title: string;
  description?: string;
  icon?: string;
  concept_count?: number;
  subject?: string;
  rarity?: AchievementRarity;
  metadata: Record<string, any>;
  earned_at: string;
}

// Achievement definitions
export interface AchievementDefinition {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: AchievementRarity;
  criteria: {
    type: 'concept_mastery' | 'test_completion' | 'streak' | 'milestone';
    subject?: string;
    count: number;
    threshold?: number;
  };
  points: number;
  gradient: string;
}

export const ACHIEVEMENT_DEFINITIONS: AchievementDefinition[] = [
  // Common achievements
  {
    id: 'first_concept',
    title: 'First Steps',
    description: 'Mastered your first concept',
    icon: 'target',
    rarity: 'common',
    criteria: { type: 'concept_mastery', count: 1 },
    points: 10,
    gradient: 'from-gray-400 to-gray-600',
  },
  {
    id: 'five_concepts',
    title: 'Quick Learner',
    description: 'Mastered 5 concepts',
    icon: 'zap',
    rarity: 'common',
    criteria: { type: 'concept_mastery', count: 5 },
    points: 25,
    gradient: 'from-blue-400 to-blue-600',
  },
  
  // Rare achievements
  {
    id: 'ten_math_concepts',
    title: 'Math Enthusiast',
    description: 'Mastered 10 Mathematics concepts',
    icon: 'calculator',
    rarity: 'rare',
    criteria: { type: 'concept_mastery', subject: 'Mathematics', count: 10 },
    points: 50,
    gradient: 'from-purple-400 to-purple-600',
  },
  {
    id: 'perfect_score',
    title: 'Perfection',
    description: 'Scored 100% on a practice test',
    icon: 'star',
    rarity: 'rare',
    criteria: { type: 'test_completion', threshold: 100, count: 1 },
    points: 75,
    gradient: 'from-yellow-400 to-yellow-600',
  },
  
  // Epic achievements
  {
    id: 'thirty_concepts',
    title: 'Knowledge Seeker',
    description: 'Mastered 30 concepts across subjects',
    icon: 'book-open',
    rarity: 'epic',
    criteria: { type: 'concept_mastery', count: 30 },
    points: 150,
    gradient: 'from-orange-400 to-red-600',
  },
  {
    id: 'month_streak',
    title: 'Consistency Champion',
    description: 'Maintained 30-day learning streak',
    icon: 'flame',
    rarity: 'epic',
    criteria: { type: 'streak', count: 30 },
    points: 200,
    gradient: 'from-red-500 to-orange-500',
  },
  
  // Legendary achievements
  {
    id: 'subject_expert',
    title: 'Subject Expert',
    description: 'Reached Expert level in any subject',
    icon: 'trophy',
    rarity: 'legendary',
    criteria: { type: 'milestone', count: 1 },
    points: 500,
    gradient: 'from-amber-400 via-yellow-500 to-amber-600',
  },
  {
    id: 'hundred_concepts',
    title: 'Master Scholar',
    description: 'Mastered 100 concepts',
    icon: 'crown',
    rarity: 'legendary',
    criteria: { type: 'concept_mastery', count: 100 },
    points: 1000,
    gradient: 'from-purple-600 via-pink-600 to-red-600',
  },
];

export const LEVEL_REQUIREMENTS: Record<LevelName, { min: number; max: number; color: string }> = {
  beginner: { min: 0, max: 10, color: 'from-green-400 to-green-600' },
  intermediate: { min: 11, max: 25, color: 'from-blue-400 to-blue-600' },
  advanced: { min: 26, max: 50, color: 'from-purple-400 to-purple-600' },
  expert: { min: 51, max: Infinity, color: 'from-amber-400 to-amber-600' },
};
