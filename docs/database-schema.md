
# A1Score Database Schema Design

> **Last Updated**: 2025-01-09 - Added AI optimization, document storage, and learning analytics tables

## Core Tables

### users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('student', 'teacher', 'admin', 'parent')),
  is_email_verified BOOLEAN DEFAULT FALSE,
  profile_picture TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Student specific
  academic_level VARCHAR(50),
  graduation_year INTEGER,
  
  -- Teacher specific
  qualification VARCHAR(255),
  experience INTEGER,
  is_verified BOOLEAN DEFAULT FALSE,
  
  -- Admin specific
  institution VARCHAR(255),
  institution_role VARCHAR(100),
  
  -- Preferences (JSON)
  preferences JSONB DEFAULT '{
    "language": "en",
    "theme": "light",
    "notifications": {
      "email": true,
      "push": true,
      "sms": false
    },
    "privacy": {
      "showProfile": true,
      "showProgress": true
    }
  }'::jsonb
);
```

### user_subjects
```sql
CREATE TABLE user_subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  subject VARCHAR(100) NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### user_progress
```sql
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  subject VARCHAR(100) NOT NULL,
  level VARCHAR(50) NOT NULL,
  topics_completed INTEGER DEFAULT 0,
  total_topics INTEGER DEFAULT 0,
  average_score DECIMAL(5,2) DEFAULT 0,
  last_activity_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  time_spent INTEGER DEFAULT 0, -- in minutes
  strength_areas TEXT[],
  weakness_areas TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### user_activities
```sql
CREATE TABLE user_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  activity_type VARCHAR(50) NOT NULL CHECK (activity_type IN ('quiz', 'lesson', 'tutor_chat', 'achievement')),
  subject VARCHAR(100),
  description TEXT NOT NULL,
  score INTEGER,
  time_spent INTEGER DEFAULT 0, -- in minutes
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### user_stats
```sql
CREATE TABLE user_stats (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  total_quizzes INTEGER DEFAULT 0,
  average_score DECIMAL(5,2) DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  total_study_hours INTEGER DEFAULT 0,
  badges_earned INTEGER DEFAULT 0,
  last_activity_date TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### achievements
```sql
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(255),
  category VARCHAR(100),
  requirements JSONB, -- conditions to earn the achievement
  points INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### user_achievements
```sql
CREATE TABLE user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);
```

### quizzes
```sql
CREATE TABLE quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  subject VARCHAR(100) NOT NULL,
  level VARCHAR(50) NOT NULL,
  questions JSONB NOT NULL, -- array of question objects
  time_limit INTEGER, -- in minutes
  passing_score INTEGER DEFAULT 60,
  created_by UUID REFERENCES users(id),
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### quiz_attempts
```sql
CREATE TABLE quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  answers JSONB NOT NULL, -- user's answers
  time_taken INTEGER, -- in seconds
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### conversation_history (NEW - AI Chat Persistence)
```sql
CREATE TABLE conversation_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id UUID NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  tokens_used INTEGER DEFAULT 0,
  model TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### quizzes (NEW - Structured Quiz Management)
```sql
CREATE TABLE quizzes (
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
```

### quiz_questions (NEW - Individual Questions)
```sql
CREATE TABLE quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL CHECK (question_type IN ('multiple_choice', 'true_false', 'short_answer', 'essay')),
  options JSONB,
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  topic TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### user_documents (NEW - Document Storage Metadata)
```sql
CREATE TABLE user_documents (
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
```

### document_chunks (NEW - RAG/Vector Search)
```sql
CREATE TABLE document_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL REFERENCES user_documents(id) ON DELETE CASCADE,
  chunk_index INTEGER NOT NULL,
  content TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### learning_sessions (NEW - Learning Analytics)
```sql
CREATE TABLE learning_sessions (
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
```

### spaced_repetition_cards (NEW - Spaced Repetition System)
```sql
CREATE TABLE spaced_repetition_cards (
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
```

### ai_response_cache (NEW - Cost Optimization)
```sql
CREATE TABLE ai_response_cache (
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
```

### user_ai_usage (NEW - Rate Limiting & Usage Tracking)
```sql
CREATE TABLE user_ai_usage (
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
```

## Indexes

```sql
-- User indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_user_type ON users(user_type);
CREATE INDEX idx_users_academic_level ON users(academic_level);

-- Progress indexes
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_subject ON user_progress(subject);

-- Activity indexes
CREATE INDEX idx_user_activities_user_id ON user_activities(user_id);
CREATE INDEX idx_user_activities_type ON user_activities(activity_type);
CREATE INDEX idx_user_activities_date ON user_activities(created_at);

-- Quiz indexes
CREATE INDEX idx_quizzes_subject ON quizzes(subject);
CREATE INDEX idx_quizzes_created_by ON quizzes(created_by);
CREATE INDEX idx_quizzes_created_at ON quizzes(created_at DESC);
CREATE INDEX idx_quiz_questions_quiz_id ON quiz_questions(quiz_id);
CREATE INDEX idx_quiz_questions_topic ON quiz_questions(topic);
CREATE INDEX idx_quiz_attempts_user_id ON quiz_attempts(user_id);
CREATE INDEX idx_quiz_attempts_quiz_id ON quiz_attempts(quiz_id);

-- Conversation indexes
CREATE INDEX idx_conversation_history_user_id ON conversation_history(user_id);
CREATE INDEX idx_conversation_history_session_id ON conversation_history(session_id);
CREATE INDEX idx_conversation_history_created_at ON conversation_history(created_at DESC);

-- Document indexes
CREATE INDEX idx_user_documents_user_id ON user_documents(user_id);
CREATE INDEX idx_user_documents_created_at ON user_documents(created_at DESC);
CREATE INDEX idx_document_chunks_document_id ON document_chunks(document_id);

-- Learning analytics indexes
CREATE INDEX idx_learning_sessions_user_id ON learning_sessions(user_id);
CREATE INDEX idx_learning_sessions_started_at ON learning_sessions(started_at DESC);
CREATE INDEX idx_learning_sessions_subject ON learning_sessions(subject);

-- Spaced repetition indexes
CREATE INDEX idx_spaced_repetition_user_id ON spaced_repetition_cards(user_id);
CREATE INDEX idx_spaced_repetition_next_review ON spaced_repetition_cards(next_review_date);
CREATE INDEX idx_spaced_repetition_subject ON spaced_repetition_cards(subject);

-- AI optimization indexes
CREATE INDEX idx_ai_response_cache_query_hash ON ai_response_cache(query_hash);
CREATE INDEX idx_user_ai_usage_user_id ON user_ai_usage(user_id);
CREATE INDEX idx_user_ai_usage_date ON user_ai_usage(usage_date DESC);
```

## Row Level Security (RLS) Policies

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutor_conversations ENABLE ROW LEVEL SECURITY;

-- Users can only see/edit their own data
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Similar policies for other user-specific tables
CREATE POLICY "Users can view own progress" ON user_progress
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own activities" ON user_activities
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own stats" ON user_stats
  FOR ALL USING (auth.uid() = user_id);
```

This schema provides a solid foundation for user management, progress tracking, and all the features outlined in the enhancement plan.
