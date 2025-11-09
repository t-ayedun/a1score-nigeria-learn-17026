-- Add gamification preferences to profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS gamification_enabled BOOLEAN DEFAULT true;

-- Update user_achievements to support learning-based achievements
ALTER TABLE public.user_achievements
ADD COLUMN IF NOT EXISTS concept_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS subject TEXT,
ADD COLUMN IF NOT EXISTS rarity TEXT CHECK (rarity IN ('common', 'rare', 'epic', 'legendary'));

-- Create concept mastery tracking table
CREATE TABLE IF NOT EXISTS public.concept_mastery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  concept_name TEXT NOT NULL,
  mastery_level INTEGER DEFAULT 0 CHECK (mastery_level BETWEEN 0 AND 100),
  evidence_count INTEGER DEFAULT 0,
  first_learned_at TIMESTAMPTZ DEFAULT now(),
  last_practiced_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, subject, concept_name)
);

-- Enable RLS
ALTER TABLE public.concept_mastery ENABLE ROW LEVEL SECURITY;

-- RLS Policies for concept_mastery
CREATE POLICY "Users can view their own concept mastery"
  ON public.concept_mastery FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own concept mastery"
  ON public.concept_mastery FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own concept mastery"
  ON public.concept_mastery FOR UPDATE
  USING (auth.uid() = user_id);

-- Create learning points table
CREATE TABLE IF NOT EXISTS public.learning_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  points INTEGER NOT NULL,
  reason TEXT NOT NULL,
  activity_type TEXT NOT NULL,
  subject TEXT,
  metadata JSONB DEFAULT '{}',
  earned_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.learning_points ENABLE ROW LEVEL SECURITY;

-- RLS Policies for learning_points
CREATE POLICY "Users can view their own points"
  ON public.learning_points FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can award points"
  ON public.learning_points FOR INSERT
  WITH CHECK (true);

-- Create learning streaks table
CREATE TABLE IF NOT EXISTS public.learning_streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE,
  weekly_activity_pattern INTEGER[] DEFAULT ARRAY[0,0,0,0,0,0,0],
  streak_repairs_used INTEGER DEFAULT 0,
  streak_repairs_available INTEGER DEFAULT 2,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.learning_streaks ENABLE ROW LEVEL SECURITY;

-- RLS Policies for learning_streaks
CREATE POLICY "Users can view their own streaks"
  ON public.learning_streaks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own streaks"
  ON public.learning_streaks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own streaks"
  ON public.learning_streaks FOR UPDATE
  USING (auth.uid() = user_id);

-- Create subject levels table
CREATE TABLE IF NOT EXISTS public.subject_levels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  level_name TEXT NOT NULL CHECK (level_name IN ('beginner', 'intermediate', 'advanced', 'expert')),
  concepts_mastered INTEGER DEFAULT 0,
  concepts_required INTEGER NOT NULL,
  progress_percentage INTEGER DEFAULT 0,
  achieved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, subject, level_name)
);

-- Enable RLS
ALTER TABLE public.subject_levels ENABLE ROW LEVEL SECURITY;

-- RLS Policies for subject_levels
CREATE POLICY "Users can view their own levels"
  ON public.subject_levels FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own levels"
  ON public.subject_levels FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own levels"
  ON public.subject_levels FOR UPDATE
  USING (auth.uid() = user_id);

-- Create leaderboard preferences table
CREATE TABLE IF NOT EXISTS public.leaderboard_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  is_visible BOOLEAN DEFAULT true,
  anonymous_mode BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.leaderboard_preferences ENABLE ROW LEVEL SECURITY;

-- RLS Policies for leaderboard_preferences
CREATE POLICY "Users can manage their own leaderboard preferences"
  ON public.leaderboard_preferences FOR ALL
  USING (auth.uid() = user_id);

-- Add triggers for updated_at
CREATE TRIGGER update_concept_mastery_updated_at
  BEFORE UPDATE ON public.concept_mastery
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_learning_streaks_updated_at
  BEFORE UPDATE ON public.learning_streaks
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_subject_levels_updated_at
  BEFORE UPDATE ON public.subject_levels
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_leaderboard_preferences_updated_at
  BEFORE UPDATE ON public.leaderboard_preferences
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();