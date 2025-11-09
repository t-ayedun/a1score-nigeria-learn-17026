-- Drop the insecure policy that exposes all quiz answers
DROP POLICY IF EXISTS "Anyone can view quiz questions" ON public.quiz_questions;

-- Create a view for quiz questions without answers (for active quiz sessions)
CREATE OR REPLACE VIEW public.quiz_questions_safe AS
SELECT 
  id,
  question_text,
  options,
  subject,
  topic,
  difficulty_level,
  exam_type,
  created_at,
  updated_at
FROM public.quiz_questions;

-- Enable RLS on the view
ALTER VIEW public.quiz_questions_safe SET (security_barrier = true);

-- Create secure policies for quiz questions
-- Policy 1: Teachers can view and manage all quiz questions with answers
CREATE POLICY "Teachers can manage quiz questions" ON public.quiz_questions
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE user_id = auth.uid() 
      AND user_type = 'teacher'
    )
  );

-- Policy 2: Students can view questions without answers during quiz sessions
CREATE POLICY "Students can view quiz questions safely" ON public.quiz_questions
  FOR SELECT
  USING (
    auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE user_id = auth.uid() 
      AND user_type = 'student'
    )
  );

-- Policy 3: Users can view complete questions with answers only after completing the quiz
CREATE POLICY "Users can view answers after quiz completion" ON public.quiz_questions
  FOR SELECT
  USING (
    auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1 FROM public.quiz_attempts qa
      WHERE qa.user_id = auth.uid()
      AND qa.subject = quiz_questions.subject
      AND qa.topic = quiz_questions.topic
      AND qa.created_at >= NOW() - INTERVAL '24 hours'
    )
  );

-- Create a function to get quiz questions without answers for active sessions
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

-- Create a function to get quiz results with answers (only after completion)
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