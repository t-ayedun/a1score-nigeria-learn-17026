-- Drop the insecure policy that allows viewing all profiles
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Create secure policies for profile viewing
-- Policy 1: Users can always view their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Policy 2: Community members can view each other's profiles
CREATE POLICY "Community members can view connected profiles" ON public.profiles
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.community_members cm1
      JOIN public.community_members cm2 ON cm1.community_id = cm2.community_id
      WHERE cm1.user_id = auth.uid() 
      AND cm2.user_id = profiles.user_id
      AND cm1.user_id != cm2.user_id
    )
  );

-- Policy 3: Teachers can view their enrolled students' profiles
CREATE POLICY "Teachers can view student profiles" ON public.profiles
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.class_groups cg
      JOIN public.class_enrollments ce ON cg.id = ce.class_id
      WHERE cg.teacher_id = auth.uid()
      AND ce.student_id = profiles.user_id
      AND ce.is_active = true
    )
  );

-- Policy 4: Students can view their teachers' profiles
CREATE POLICY "Students can view teacher profiles" ON public.profiles
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.class_enrollments ce
      JOIN public.class_groups cg ON ce.class_id = cg.id
      WHERE ce.student_id = auth.uid()
      AND cg.teacher_id = profiles.user_id
      AND ce.is_active = true
    )
  );