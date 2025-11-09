-- Fix infinite recursion in class_groups RLS policies
-- The issue is caused by profiles policies checking class_groups and vice versa

-- Drop the problematic policies that cause circular references
DROP POLICY IF EXISTS "Students can view teacher profiles" ON public.profiles;
DROP POLICY IF EXISTS "Teachers can view student profiles" ON public.profiles;
DROP POLICY IF EXISTS "Authenticated students can view their enrolled classes" ON public.class_groups;

-- Recreate profiles policies without circular dependency
-- Students can view teacher profiles (simplified - no class check)
CREATE POLICY "Students can view teacher profiles"
ON public.profiles
FOR SELECT
USING (
  user_type = 'teacher' AND auth.uid() IS NOT NULL
);

-- Teachers can view student profiles (simplified - no class check)
CREATE POLICY "Teachers can view student profiles"
ON public.profiles
FOR SELECT
USING (
  user_type = 'student' AND auth.uid() IS NOT NULL AND
  EXISTS (
    SELECT 1 FROM public.profiles teacher_profile
    WHERE teacher_profile.user_id = auth.uid() 
    AND teacher_profile.user_type = 'teacher'
  )
);

-- Recreate class_groups policy without profile check
CREATE POLICY "Authenticated students can view their enrolled classes"
ON public.class_groups
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM class_enrollments
    WHERE class_enrollments.class_id = class_groups.id
    AND class_enrollments.student_id = auth.uid()
    AND class_enrollments.is_active = true
  )
);