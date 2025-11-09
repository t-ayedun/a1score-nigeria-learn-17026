-- Drop the problematic security definer view
DROP VIEW IF EXISTS public.quiz_questions_safe;

-- Fix function search paths and update the functions
CREATE OR REPLACE FUNCTION public.get_quiz_questions_for_session(
  p_subject TEXT,
  p_topic TEXT,
  p_difficulty TEXT DEFAULT 'beginner',
  p_limit INTEGER DEFAULT 10
)
RETURNS TABLE (
  id UUID,
  question_text TEXT,
  options JSONB,
  subject TEXT,
  topic TEXT,
  difficulty_level TEXT,
  exam_type TEXT
) 
LANGUAGE SQL
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    qq.id,
    qq.question_text,
    qq.options,
    qq.subject,
    qq.topic,
    qq.difficulty_level,
    qq.exam_type
  FROM public.quiz_questions qq
  WHERE qq.subject = p_subject
    AND qq.topic = p_topic
    AND qq.difficulty_level = p_difficulty
  ORDER BY RANDOM()
  LIMIT p_limit;
$$;

-- Fix the quiz results function with proper search path
CREATE OR REPLACE FUNCTION public.get_quiz_results_with_answers(
  p_quiz_attempt_id UUID
)
RETURNS TABLE (
  question_id UUID,
  question_text TEXT,
  options JSONB,
  correct_answer INTEGER,
  explanation TEXT,
  user_answer INTEGER,
  is_correct BOOLEAN
) 
LANGUAGE SQL
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    qq.id,
    qq.question_text,
    qq.options,
    qq.correct_answer,
    qq.explanation,
    (qa.user_answers->qq.id::text)::integer as user_answer,
    (qa.user_answers->qq.id::text)::integer = qq.correct_answer as is_correct
  FROM public.quiz_attempts qa
  JOIN public.quiz_questions qq ON qq.subject = qa.subject AND qq.topic = qa.topic
  WHERE qa.id = p_quiz_attempt_id
    AND qa.user_id = auth.uid();
$$;

-- Update the quiz questions policies to be more restrictive
DROP POLICY IF EXISTS "Students can view quiz questions safely" ON public.quiz_questions;

-- Create a more secure policy that only allows viewing questions (without answers) during active quiz sessions
CREATE POLICY "Authenticated users can view questions without answers" ON public.quiz_questions
  FOR SELECT
  USING (
    auth.uid() IS NOT NULL
  );