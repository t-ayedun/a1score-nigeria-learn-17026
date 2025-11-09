-- Add user_type column to profiles table to store user role
ALTER TABLE public.profiles 
ADD COLUMN user_type TEXT DEFAULT 'student' CHECK (user_type IN ('student', 'teacher', 'admin', 'parent'));

-- Update existing profiles to have a default user_type
UPDATE public.profiles 
SET user_type = 'student' 
WHERE user_type IS NULL;