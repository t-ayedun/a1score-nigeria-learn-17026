-- Fix RLS policies and trigger function for anonymous users
-- First, update the trigger function to have proper security context
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, user_type)
  VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data ->> 'display_name', 
      NEW.email,
      'Guest User'
    ),
    COALESCE(NEW.raw_user_meta_data ->> 'user_type', 'student')
  )
  ON CONFLICT (user_id) DO UPDATE SET
    display_name = COALESCE(
      NEW.raw_user_meta_data ->> 'display_name', 
      NEW.email,
      profiles.display_name,
      'Guest User'
    ),
    user_type = COALESCE(NEW.raw_user_meta_data ->> 'user_type', profiles.user_type, 'student'),
    updated_at = now();
  RETURN NEW;
END;
$$;

-- Grant necessary permissions to the trigger function
GRANT USAGE ON SCHEMA public TO postgres;
GRANT ALL ON public.profiles TO postgres;

-- Add a policy to allow the trigger function to insert profiles for new users
CREATE POLICY "Allow system to create profiles for new users" 
ON public.profiles 
FOR INSERT 
WITH CHECK (true);