-- Fix Anonymous Access Policies - Part 1
-- Update RLS policies to require authentication for sensitive data

-- Fix user-specific tables that should require authentication
DROP POLICY IF EXISTS "Users can view their own conversations" ON public.conversation_history;
CREATE POLICY "Authenticated users can view their own conversations" ON public.conversation_history
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view their own quiz attempts" ON public.quiz_attempts;
CREATE POLICY "Authenticated users can view their own quiz attempts" ON public.quiz_attempts
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view their achievements" ON public.user_achievements;
CREATE POLICY "Authenticated users can view their achievements" ON public.user_achievements
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage their study sessions" ON public.study_sessions;
CREATE POLICY "Authenticated users can manage their study sessions" ON public.study_sessions
FOR ALL
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage their own progress" ON public.user_progress;
CREATE POLICY "Authenticated users can manage their own progress" ON public.user_progress
FOR ALL
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view their own progress" ON public.user_progress;
CREATE POLICY "Authenticated users can view their own progress" ON public.user_progress
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own PDF analyses" ON public.pdf_analyses;
CREATE POLICY "Authenticated users can delete their own PDF analyses" ON public.pdf_analyses
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own PDF analyses" ON public.pdf_analyses;
CREATE POLICY "Authenticated users can update their own PDF analyses" ON public.pdf_analyses
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view their own PDF analyses" ON public.pdf_analyses;
CREATE POLICY "Authenticated users can view their own PDF analyses" ON public.pdf_analyses
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);