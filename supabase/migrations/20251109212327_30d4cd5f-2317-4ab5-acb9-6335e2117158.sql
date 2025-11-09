-- Create quizzes table first (referenced by quiz_questions)
CREATE TABLE IF NOT EXISTS public.quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  subject TEXT NOT NULL,
  academic_level TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  estimated_duration_minutes INTEGER,
  passing_score INTEGER DEFAULT 70,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_quizzes_subject ON public.quizzes(subject);
CREATE INDEX idx_quizzes_created_by ON public.quizzes(created_by);
CREATE INDEX idx_quizzes_created_at ON public.quizzes(created_at DESC);

-- Enable RLS on quizzes
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for quizzes
CREATE POLICY "Anyone can view published quizzes" ON public.quizzes
  FOR SELECT USING (is_published = true OR auth.uid() = created_by);

CREATE POLICY "Authenticated users can create quizzes" ON public.quizzes
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update own quizzes" ON public.quizzes
  FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Users can delete own quizzes" ON public.quizzes
  FOR DELETE USING (auth.uid() = created_by);

-- Create conversation_history table for AI chat persistence
CREATE TABLE IF NOT EXISTS public.conversation_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id UUID NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  tokens_used INTEGER DEFAULT 0,
  model TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_conversation_history_user_id ON public.conversation_history(user_id);
CREATE INDEX idx_conversation_history_session_id ON public.conversation_history(session_id);
CREATE INDEX idx_conversation_history_created_at ON public.conversation_history(created_at DESC);

-- Create quiz_questions table for proper quiz structure
CREATE TABLE IF NOT EXISTS public.quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID REFERENCES public.quizzes(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL CHECK (question_type IN ('multiple_choice', 'true_false', 'short_answer', 'essay')),
  options JSONB,
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  topic TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_quiz_questions_quiz_id ON public.quiz_questions(quiz_id);
CREATE INDEX idx_quiz_questions_topic ON public.quiz_questions(topic);

-- Create user_documents table for document storage
CREATE TABLE IF NOT EXISTS public.user_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  file_type TEXT,
  storage_path TEXT NOT NULL,
  upload_status TEXT DEFAULT 'processing' CHECK (upload_status IN ('processing', 'completed', 'failed')),
  processing_metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_user_documents_user_id ON public.user_documents(user_id);
CREATE INDEX idx_user_documents_created_at ON public.user_documents(created_at DESC);

-- Create document_chunks table for RAG/vector search
CREATE TABLE IF NOT EXISTS public.document_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL REFERENCES public.user_documents(id) ON DELETE CASCADE,
  chunk_index INTEGER NOT NULL,
  content TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_document_chunks_document_id ON public.document_chunks(document_id);
CREATE INDEX idx_document_chunks_chunk_index ON public.document_chunks(chunk_index);

-- Create learning_sessions table for analytics
CREATE TABLE IF NOT EXISTS public.learning_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_type TEXT NOT NULL CHECK (session_type IN ('quiz', 'ai_chat', 'document_study', 'practice')),
  subject TEXT,
  topic TEXT,
  duration_minutes INTEGER,
  questions_answered INTEGER DEFAULT 0,
  correct_answers INTEGER DEFAULT 0,
  concepts_covered TEXT[],
  performance_score DECIMAL(5,2),
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB
);

CREATE INDEX idx_learning_sessions_user_id ON public.learning_sessions(user_id);
CREATE INDEX idx_learning_sessions_started_at ON public.learning_sessions(started_at DESC);
CREATE INDEX idx_learning_sessions_subject ON public.learning_sessions(subject);

-- Create spaced_repetition_cards table
CREATE TABLE IF NOT EXISTS public.spaced_repetition_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  topic TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  difficulty INTEGER DEFAULT 0,
  ease_factor DECIMAL(3,2) DEFAULT 2.5,
  interval_days INTEGER DEFAULT 0,
  repetitions INTEGER DEFAULT 0,
  next_review_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB
);

CREATE INDEX idx_spaced_repetition_user_id ON public.spaced_repetition_cards(user_id);
CREATE INDEX idx_spaced_repetition_next_review ON public.spaced_repetition_cards(next_review_date);
CREATE INDEX idx_spaced_repetition_subject ON public.spaced_repetition_cards(subject);

-- Create ai_response_cache table for cost optimization
CREATE TABLE IF NOT EXISTS public.ai_response_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  query_hash TEXT NOT NULL UNIQUE,
  query_text TEXT NOT NULL,
  response_text TEXT NOT NULL,
  model TEXT NOT NULL,
  tokens_used INTEGER,
  hit_count INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_ai_response_cache_query_hash ON public.ai_response_cache(query_hash);
CREATE INDEX idx_ai_response_cache_created_at ON public.ai_response_cache(created_at DESC);

-- Create user_ai_usage table for rate limiting
CREATE TABLE IF NOT EXISTS public.user_ai_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  usage_date DATE NOT NULL DEFAULT CURRENT_DATE,
  requests_count INTEGER DEFAULT 0,
  tokens_used INTEGER DEFAULT 0,
  cost_usd DECIMAL(10,4) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, usage_date)
);

CREATE INDEX idx_user_ai_usage_user_id ON public.user_ai_usage(user_id);
CREATE INDEX idx_user_ai_usage_date ON public.user_ai_usage(usage_date DESC);

-- Enable RLS on all tables
ALTER TABLE public.conversation_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spaced_repetition_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_response_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_ai_usage ENABLE ROW LEVEL SECURITY;

-- RLS Policies for conversation_history
CREATE POLICY "Users can view own conversation history" ON public.conversation_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own conversation history" ON public.conversation_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for quiz_questions
CREATE POLICY "Anyone can view quiz questions" ON public.quiz_questions
  FOR SELECT USING (true);

CREATE POLICY "Teachers can create quiz questions" ON public.quiz_questions
  FOR INSERT WITH CHECK (true);

-- RLS Policies for user_documents
CREATE POLICY "Users can view own documents" ON public.user_documents
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can upload own documents" ON public.user_documents
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own documents" ON public.user_documents
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own documents" ON public.user_documents
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for document_chunks
CREATE POLICY "Users can view chunks of own documents" ON public.document_chunks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.user_documents 
      WHERE user_documents.id = document_chunks.document_id 
      AND user_documents.user_id = auth.uid()
    )
  );

-- RLS Policies for learning_sessions
CREATE POLICY "Users can view own learning sessions" ON public.learning_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own learning sessions" ON public.learning_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own learning sessions" ON public.learning_sessions
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for spaced_repetition_cards
CREATE POLICY "Users can manage own spaced repetition cards" ON public.spaced_repetition_cards
  FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for ai_response_cache
CREATE POLICY "Anyone can read from cache" ON public.ai_response_cache
  FOR SELECT USING (true);

CREATE POLICY "System can manage cache" ON public.ai_response_cache
  FOR ALL USING (true);

-- RLS Policies for user_ai_usage
CREATE POLICY "Users can view own AI usage" ON public.user_ai_usage
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can track AI usage" ON public.user_ai_usage
  FOR ALL USING (true);

-- Add triggers for updated_at
CREATE TRIGGER update_quizzes_updated_at
  BEFORE UPDATE ON public.quizzes
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_user_documents_updated_at
  BEFORE UPDATE ON public.user_documents
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_user_ai_usage_updated_at
  BEFORE UPDATE ON public.user_ai_usage
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();