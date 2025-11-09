-- Create user profiles table linked to auth.users
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  school TEXT,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create community role enum
CREATE TYPE public.community_role AS ENUM ('admin', 'moderator', 'member');

-- Create community type enum  
CREATE TYPE public.community_type AS ENUM ('school', 'zone', 'subject');

-- Create communities table
CREATE TABLE public.communities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  type community_type NOT NULL,
  school TEXT,
  location TEXT,
  subject TEXT,
  rules TEXT,
  banner_url TEXT,
  member_count INTEGER DEFAULT 0,
  post_count INTEGER DEFAULT 0,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create community members table
CREATE TABLE public.community_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role community_role DEFAULT 'member',
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(community_id, user_id)
);

-- Create post type enum
CREATE TYPE public.post_type AS ENUM ('text', 'image', 'file', 'link');

-- Create community posts table
CREATE TABLE public.community_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT,
  content TEXT NOT NULL,
  type post_type DEFAULT 'text',
  file_url TEXT,
  file_name TEXT,
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  reply_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create community discussions table
CREATE TABLE public.community_discussions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  is_pinned BOOLEAN DEFAULT FALSE,
  reply_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create discussion replies table
CREATE TABLE public.discussion_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  discussion_id UUID NOT NULL REFERENCES public.community_discussions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  parent_reply_id UUID REFERENCES public.discussion_replies(id) ON DELETE CASCADE,
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create shared files table
CREATE TABLE public.shared_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT,
  file_size BIGINT,
  description TEXT,
  download_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create moderation action enum
CREATE TYPE public.moderation_action AS ENUM ('warning', 'temporary_ban', 'permanent_ban', 'content_removal');

-- Create community moderation table
CREATE TABLE public.community_moderation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  moderator_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action_type moderation_action NOT NULL,
  reason TEXT NOT NULL,
  content_id UUID, -- Can reference posts, discussions, or replies
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create activity feed table
CREATE TABLE public.community_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL, -- 'post_created', 'discussion_started', 'file_shared', etc.
  content_id UUID, -- References the related content
  content_title TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.communities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discussion_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shared_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_moderation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_activity ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for communities
CREATE POLICY "Anyone can view communities" ON public.communities FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create communities" ON public.communities FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Community creators can update their communities" ON public.communities FOR UPDATE USING (auth.uid() = created_by);

-- Create RLS policies for community members
CREATE POLICY "Anyone can view community members" ON public.community_members FOR SELECT USING (true);
CREATE POLICY "Users can join communities" ON public.community_members FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can leave communities" ON public.community_members FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for posts
CREATE POLICY "Anyone can view posts" ON public.community_posts FOR SELECT USING (true);
CREATE POLICY "Community members can create posts" ON public.community_posts 
  FOR INSERT WITH CHECK (
    auth.uid() = user_id AND 
    EXISTS (SELECT 1 FROM public.community_members WHERE community_id = community_posts.community_id AND user_id = auth.uid())
  );
CREATE POLICY "Post authors can update their posts" ON public.community_posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Post authors can delete their posts" ON public.community_posts FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for discussions
CREATE POLICY "Anyone can view discussions" ON public.community_discussions FOR SELECT USING (true);
CREATE POLICY "Community members can create discussions" ON public.community_discussions 
  FOR INSERT WITH CHECK (
    auth.uid() = user_id AND 
    EXISTS (SELECT 1 FROM public.community_members WHERE community_id = community_discussions.community_id AND user_id = auth.uid())
  );
CREATE POLICY "Discussion authors can update their discussions" ON public.community_discussions FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for discussion replies
CREATE POLICY "Anyone can view replies" ON public.discussion_replies FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create replies" ON public.discussion_replies FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Reply authors can update their replies" ON public.discussion_replies FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Reply authors can delete their replies" ON public.discussion_replies FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for shared files
CREATE POLICY "Community members can view files" ON public.shared_files 
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.community_members WHERE community_id = shared_files.community_id AND user_id = auth.uid())
  );
CREATE POLICY "Community members can upload files" ON public.shared_files 
  FOR INSERT WITH CHECK (
    auth.uid() = user_id AND 
    EXISTS (SELECT 1 FROM public.community_members WHERE community_id = shared_files.community_id AND user_id = auth.uid())
  );
CREATE POLICY "File uploaders can delete their files" ON public.shared_files FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for moderation
CREATE POLICY "Community members can view moderation actions" ON public.community_moderation 
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.community_members WHERE community_id = community_moderation.community_id AND user_id = auth.uid())
  );

-- Create RLS policies for activity feed
CREATE POLICY "Community members can view activity" ON public.community_activity 
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.community_members WHERE community_id = community_activity.community_id AND user_id = auth.uid())
  );
CREATE POLICY "Authenticated users can create activity" ON public.community_activity FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update community member count
CREATE OR REPLACE FUNCTION public.update_community_member_count()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers for member count updates
CREATE TRIGGER update_member_count_on_join
  AFTER INSERT ON public.community_members
  FOR EACH ROW EXECUTE FUNCTION public.update_community_member_count();

CREATE TRIGGER update_member_count_on_leave
  AFTER DELETE ON public.community_members
  FOR EACH ROW EXECUTE FUNCTION public.update_community_member_count();

-- Create function to update post count
CREATE OR REPLACE FUNCTION public.update_community_post_count()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers for post count updates
CREATE TRIGGER update_post_count_on_create
  AFTER INSERT ON public.community_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_community_post_count();

CREATE TRIGGER update_post_count_on_delete
  AFTER DELETE ON public.community_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_community_post_count();

-- Create function to create activity feed entries
CREATE OR REPLACE FUNCTION public.create_activity_entry()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers for activity feed
CREATE TRIGGER create_activity_on_post
  AFTER INSERT ON public.community_posts
  FOR EACH ROW EXECUTE FUNCTION public.create_activity_entry();

CREATE TRIGGER create_activity_on_discussion
  AFTER INSERT ON public.community_discussions
  FOR EACH ROW EXECUTE FUNCTION public.create_activity_entry();

CREATE TRIGGER create_activity_on_file
  AFTER INSERT ON public.shared_files
  FOR EACH ROW EXECUTE FUNCTION public.create_activity_entry();

-- Create indexes for better performance
CREATE INDEX idx_community_members_community_id ON public.community_members(community_id);
CREATE INDEX idx_community_members_user_id ON public.community_members(user_id);
CREATE INDEX idx_community_posts_community_id ON public.community_posts(community_id);
CREATE INDEX idx_community_posts_created_at ON public.community_posts(created_at DESC);
CREATE INDEX idx_community_discussions_community_id ON public.community_discussions(community_id);
CREATE INDEX idx_discussion_replies_discussion_id ON public.discussion_replies(discussion_id);
CREATE INDEX idx_shared_files_community_id ON public.shared_files(community_id);
CREATE INDEX idx_community_activity_community_id ON public.community_activity(community_id);
CREATE INDEX idx_community_activity_created_at ON public.community_activity(created_at DESC);

-- Create storage bucket for community files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('community-files', 'community-files', false);

-- Create storage policies for community files
CREATE POLICY "Community members can view files" ON storage.objects 
FOR SELECT USING (
  bucket_id = 'community-files' AND 
  EXISTS (
    SELECT 1 FROM public.shared_files sf
    JOIN public.community_members cm ON sf.community_id = cm.community_id
    WHERE sf.file_url = storage.objects.name AND cm.user_id = auth.uid()
  )
);

CREATE POLICY "Community members can upload files" ON storage.objects 
FOR INSERT WITH CHECK (
  bucket_id = 'community-files' AND 
  auth.uid() IS NOT NULL
);

CREATE POLICY "File uploaders can delete their files" ON storage.objects 
FOR DELETE USING (
  bucket_id = 'community-files' AND 
  EXISTS (
    SELECT 1 FROM public.shared_files sf
    WHERE sf.file_url = storage.objects.name AND sf.user_id = auth.uid()
  )
);

-- Enable realtime for activity feed
ALTER PUBLICATION supabase_realtime ADD TABLE public.community_activity;
ALTER PUBLICATION supabase_realtime ADD TABLE public.community_posts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.community_discussions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.community_members;