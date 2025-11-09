-- Fix Vote Manipulation Issue
-- Create separate vote tracking table
CREATE TABLE public.post_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.community_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vote_type TEXT NOT NULL CHECK (vote_type IN ('upvote', 'downvote')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

-- Enable RLS
ALTER TABLE public.post_votes ENABLE ROW LEVEL SECURITY;

-- Anyone can view votes
CREATE POLICY "Anyone can view votes" 
ON public.post_votes 
FOR SELECT 
USING (true);

-- Authenticated users can cast votes
CREATE POLICY "Authenticated users can vote" 
ON public.post_votes 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can update their own votes
CREATE POLICY "Users can update own votes" 
ON public.post_votes 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Users can delete their own votes
CREATE POLICY "Users can delete own votes" 
ON public.post_votes 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to count votes for a post
CREATE OR REPLACE FUNCTION public.get_post_vote_counts(post_id_param UUID)
RETURNS TABLE (
  upvotes BIGINT,
  downvotes BIGINT
) 
LANGUAGE sql
STABLE
AS $$
  SELECT 
    COUNT(*) FILTER (WHERE vote_type = 'upvote') as upvotes,
    COUNT(*) FILTER (WHERE vote_type = 'downvote') as downvotes
  FROM public.post_votes
  WHERE post_id = post_id_param;
$$;

-- Update the posts UPDATE policy to prevent vote field manipulation
DROP POLICY IF EXISTS "Post authors can update their posts" ON public.community_posts;

-- Create new policy that restricts what post authors can update
-- Authors can only update content-related fields, not vote counts
CREATE POLICY "Post authors can update post content" 
ON public.community_posts 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (
  auth.uid() = user_id 
  AND upvotes = (SELECT upvotes FROM public.community_posts WHERE id = community_posts.id)
  AND downvotes = (SELECT downvotes FROM public.community_posts WHERE id = community_posts.id)
);

-- Create trigger to update vote counts on posts table when votes change
CREATE OR REPLACE FUNCTION public.update_post_vote_counts()
RETURNS TRIGGER AS $$
DECLARE
  vote_counts RECORD;
BEGIN
  -- Get the current vote counts
  SELECT * INTO vote_counts 
  FROM public.get_post_vote_counts(
    CASE 
      WHEN TG_OP = 'DELETE' THEN OLD.post_id
      ELSE NEW.post_id
    END
  );
  
  -- Update the post with new counts
  UPDATE public.community_posts
  SET 
    upvotes = COALESCE(vote_counts.upvotes::INTEGER, 0),
    downvotes = COALESCE(vote_counts.downvotes::INTEGER, 0),
    updated_at = NOW()
  WHERE id = CASE 
    WHEN TG_OP = 'DELETE' THEN OLD.post_id
    ELSE NEW.post_id
  END;
  
  RETURN CASE 
    WHEN TG_OP = 'DELETE' THEN OLD
    ELSE NEW
  END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER update_post_votes_on_vote_change
AFTER INSERT OR UPDATE OR DELETE ON public.post_votes
FOR EACH ROW
EXECUTE FUNCTION public.update_post_vote_counts();