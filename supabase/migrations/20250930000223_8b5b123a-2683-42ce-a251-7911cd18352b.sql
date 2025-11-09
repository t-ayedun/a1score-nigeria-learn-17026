-- Fix remaining infinite recursion in profiles policies
-- Create a security definer function to check user type without recursion

-- Create function to check if current user is a teacher
CREATE OR REPLACE FUNCTION public.is_teacher()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE user_id = auth.uid()
    AND user_type = 'teacher'
  )
$$;

-- Drop the problematic teacher policy
DROP POLICY IF EXISTS "Teachers can view student profiles" ON public.profiles;

-- Recreate with security definer function
CREATE POLICY "Teachers can view student profiles"
ON public.profiles
FOR SELECT
USING (
  user_type = 'student' 
  AND auth.uid() IS NOT NULL 
  AND public.is_teacher()
);