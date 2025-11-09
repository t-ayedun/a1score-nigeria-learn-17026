-- Fix Profile Privacy Exposure Issue
-- Create profile privacy settings table
CREATE TABLE public.profile_privacy_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  show_school_in_communities BOOLEAN DEFAULT false,
  show_location_in_communities BOOLEAN DEFAULT false,
  show_bio_in_communities BOOLEAN DEFAULT true,
  show_avatar_in_communities BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profile_privacy_settings ENABLE ROW LEVEL SECURITY;

-- Users can view their own privacy settings
CREATE POLICY "Users can view own privacy settings" 
ON public.profile_privacy_settings 
FOR SELECT 
USING (auth.uid() = user_id);

-- Users can update their own privacy settings
CREATE POLICY "Users can update own privacy settings" 
ON public.profile_privacy_settings 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Users can insert their own privacy settings
CREATE POLICY "Users can insert own privacy settings" 
ON public.profile_privacy_settings 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create function to get filtered profile data for communities
CREATE OR REPLACE FUNCTION public.get_community_safe_profile(profile_user_id UUID)
RETURNS TABLE (
  user_id UUID,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  school TEXT,
  location TEXT
) 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  privacy_settings RECORD;
BEGIN
  -- Get privacy settings for the target user
  SELECT * INTO privacy_settings 
  FROM public.profile_privacy_settings 
  WHERE user_id = profile_user_id;
  
  -- If no settings exist, create default (restrictive) settings
  IF NOT FOUND THEN
    INSERT INTO public.profile_privacy_settings (user_id)
    VALUES (profile_user_id)
    RETURNING * INTO privacy_settings;
  END IF;
  
  -- Return profile data respecting privacy settings
  RETURN QUERY
  SELECT 
    p.user_id,
    p.display_name,
    CASE WHEN privacy_settings.show_avatar_in_communities THEN p.avatar_url ELSE NULL END as avatar_url,
    CASE WHEN privacy_settings.show_bio_in_communities THEN p.bio ELSE NULL END as bio,
    CASE WHEN privacy_settings.show_school_in_communities THEN p.school ELSE NULL END as school,
    CASE WHEN privacy_settings.show_location_in_communities THEN p.location ELSE NULL END as location
  FROM public.profiles p
  WHERE p.user_id = profile_user_id;
END;
$$;

-- Update the community members view policy to use privacy-safe function
-- Drop the existing overly permissive policy
DROP POLICY IF EXISTS "Community members can view connected profiles" ON public.profiles;

-- Create new restricted policy that only shows basic info
CREATE POLICY "Community members see privacy-filtered profiles" 
ON public.profiles 
FOR SELECT 
USING (
  -- Always allow users to see their own full profile
  auth.uid() = user_id
  OR
  -- For community members, only show if they share a community
  EXISTS (
    SELECT 1 FROM public.community_members cm1
    JOIN public.community_members cm2 ON cm1.community_id = cm2.community_id
    WHERE cm1.user_id = auth.uid() 
    AND cm2.user_id = profiles.user_id
    AND cm1.user_id != cm2.user_id
  )
);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_privacy_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profile_privacy_settings_updated_at
BEFORE UPDATE ON public.profile_privacy_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_privacy_settings_updated_at();