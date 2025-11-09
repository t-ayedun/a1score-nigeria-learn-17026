-- Create content library table for saving generated content
CREATE TABLE IF NOT EXISTS public.content_library (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type IN ('quiz', 'practice_test', 'study_guide', 'mnemonic', 'concept_map')),
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  topic TEXT,
  content JSONB NOT NULL,
  tags TEXT[] DEFAULT '{}',
  exam_format TEXT,
  difficulty TEXT,
  is_favorite BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.content_library ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own content"
  ON public.content_library
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own content"
  ON public.content_library
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own content"
  ON public.content_library
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own content"
  ON public.content_library
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_content_library_user_id ON public.content_library(user_id);
CREATE INDEX idx_content_library_content_type ON public.content_library(content_type);
CREATE INDEX idx_content_library_subject ON public.content_library(subject);
CREATE INDEX idx_content_library_tags ON public.content_library USING GIN(tags);

-- Add updated_at trigger
CREATE TRIGGER update_content_library_updated_at
  BEFORE UPDATE ON public.content_library
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Create batch generation jobs table
CREATE TABLE IF NOT EXISTS public.batch_generation_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  content_type TEXT NOT NULL,
  params JSONB NOT NULL,
  total_items INTEGER NOT NULL,
  completed_items INTEGER DEFAULT 0,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  result_ids UUID[],
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for batch jobs
ALTER TABLE public.batch_generation_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own batch jobs"
  ON public.batch_generation_jobs
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own batch jobs"
  ON public.batch_generation_jobs
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own batch jobs"
  ON public.batch_generation_jobs
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create index
CREATE INDEX idx_batch_jobs_user_id ON public.batch_generation_jobs(user_id);
CREATE INDEX idx_batch_jobs_status ON public.batch_generation_jobs(status);

-- Add updated_at trigger
CREATE TRIGGER update_batch_jobs_updated_at
  BEFORE UPDATE ON public.batch_generation_jobs
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();