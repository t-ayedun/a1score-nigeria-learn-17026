-- Fix profiles table - restrict public access to student data
-- Remove overly permissive policy
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Allow users to view their own profile
CREATE POLICY "Users can view own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = user_id);

-- Allow users in same community to view each other's profiles
CREATE POLICY "Community members can view each other" 
ON public.profiles FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.community_members cm1
    JOIN public.community_members cm2 ON cm1.community_id = cm2.community_id
    WHERE cm1.user_id = auth.uid() AND cm2.user_id = profiles.user_id
  )
);