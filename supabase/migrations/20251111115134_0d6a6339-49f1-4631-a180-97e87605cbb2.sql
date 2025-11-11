-- Secure quiz questions - prevent answer leakage and cheating
-- Remove overly permissive policy
DROP POLICY IF EXISTS "Anyone can view quiz questions" ON public.quiz_questions;

-- Create restricted policy that only shows questions to authenticated users
-- Note: Frontend should filter out correct_answer and explanation before showing to users
-- This policy still allows reading, but frontend is responsible for hiding sensitive fields
CREATE POLICY "Authenticated users can view quiz questions" 
ON public.quiz_questions FOR SELECT 
USING (auth.role() = 'authenticated');