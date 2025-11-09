-- Fix Function Search Path Security Issues
-- Update all existing functions to have secure search_path

-- Fix update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Fix handle_new_user function  
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email));
  RETURN NEW;
END;
$$;

-- Fix handle_accepted_request function
CREATE OR REPLACE FUNCTION public.handle_accepted_request()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- If request was just accepted, create connection
  IF NEW.status = 'accepted' AND OLD.status = 'pending' THEN
    INSERT INTO public.user_connections (user1_id, user2_id)
    VALUES (
      LEAST(NEW.sender_id, NEW.receiver_id),
      GREATEST(NEW.sender_id, NEW.receiver_id)
    )
    ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

-- Fix update_community_member_count function
CREATE OR REPLACE FUNCTION public.update_community_member_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.communities 
    SET member_count = member_count + 1 
    WHERE id = NEW.community_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.communities 
    SET member_count = member_count - 1 
    WHERE id = OLD.community_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

-- Fix update_community_post_count function
CREATE OR REPLACE FUNCTION public.update_community_post_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.communities 
    SET post_count = post_count + 1 
    WHERE id = NEW.community_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.communities 
    SET post_count = post_count - 1 
    WHERE id = OLD.community_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

-- Fix create_activity_entry function
CREATE OR REPLACE FUNCTION public.create_activity_entry()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_TABLE_NAME = 'community_posts' THEN
    INSERT INTO public.community_activity (community_id, user_id, activity_type, content_id, content_title)
    VALUES (NEW.community_id, NEW.user_id, 'post_created', NEW.id, NEW.title);
  ELSIF TG_TABLE_NAME = 'community_discussions' THEN
    INSERT INTO public.community_activity (community_id, user_id, activity_type, content_id, content_title)
    VALUES (NEW.community_id, NEW.user_id, 'discussion_started', NEW.id, NEW.title);
  ELSIF TG_TABLE_NAME = 'shared_files' THEN
    INSERT INTO public.community_activity (community_id, user_id, activity_type, content_id, content_title)
    VALUES (NEW.community_id, NEW.user_id, 'file_shared', NEW.id, NEW.file_name);
  END IF;
  RETURN NEW;
END;
$$;

-- Fix generate_class_code function
CREATE OR REPLACE FUNCTION public.generate_class_code() 
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 6));
END;
$$;