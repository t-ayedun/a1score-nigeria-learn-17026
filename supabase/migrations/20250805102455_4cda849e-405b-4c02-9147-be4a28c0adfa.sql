-- Fix the trigger function to properly handle anonymous users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
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
      'Guest User'
    ),
    user_type = COALESCE(NEW.raw_user_meta_data ->> 'user_type', 'student'),
    updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;