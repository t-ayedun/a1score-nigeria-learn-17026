-- Create parent-teacher communication tables
CREATE TABLE public.parent_teacher_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_id UUID NOT NULL,
  teacher_id UUID NOT NULL,
  student_id UUID NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  message_type TEXT DEFAULT 'message' CHECK (message_type IN ('message', 'announcement', 'alert', 'report')),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  is_read BOOLEAN DEFAULT FALSE,
  parent_read_at TIMESTAMP WITH TIME ZONE,
  teacher_read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create student progress reports table
CREATE TABLE public.student_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL,
  parent_id UUID NOT NULL,
  report_type TEXT DEFAULT 'weekly' CHECK (report_type IN ('weekly', 'monthly', 'quarterly', 'custom')),
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  subjects JSONB,
  overall_grade DECIMAL(5,2),
  attendance_rate DECIMAL(5,2),
  ai_usage_hours DECIMAL(5,2),
  achievements TEXT[],
  areas_for_improvement TEXT[],
  teacher_comments TEXT,
  generated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  sent_to_parent BOOLEAN DEFAULT FALSE,
  sent_at TIMESTAMP WITH TIME ZONE
);

-- Create parental control settings table
CREATE TABLE public.parental_controls (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_id UUID NOT NULL,
  student_id UUID NOT NULL,
  daily_time_limit INTEGER DEFAULT 120, -- minutes
  allowed_subjects TEXT[],
  content_filter_level TEXT DEFAULT 'age_appropriate' CHECK (content_filter_level IN ('strict', 'age_appropriate', 'relaxed')),
  ai_assistance_level TEXT DEFAULT 'guided' CHECK (ai_assistance_level IN ('minimal', 'guided', 'full')),
  weekend_restrictions BOOLEAN DEFAULT FALSE,
  study_hours_start TIME,
  study_hours_end TIME,
  notification_preferences JSONB DEFAULT '{"email": true, "sms": false, "whatsapp": false}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create parent notifications table
CREATE TABLE public.parent_notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_id UUID NOT NULL,
  student_id UUID NOT NULL,
  notification_type TEXT NOT NULL CHECK (notification_type IN ('achievement', 'progress', 'alert', 'report', 'message')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  is_read BOOLEAN DEFAULT FALSE,
  channels_sent TEXT[] DEFAULT ARRAY['in_app'],
  scheduled_for TIMESTAMP WITH TIME ZONE DEFAULT now(),
  sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create home learning resources table
CREATE TABLE public.home_learning_resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  resource_type TEXT CHECK (resource_type IN ('guide', 'activity', 'tip', 'video', 'article')),
  target_age_group TEXT,
  subject TEXT,
  content TEXT,
  external_url TEXT,
  difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  estimated_duration INTEGER, -- minutes
  tags TEXT[],
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.parent_teacher_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parental_controls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parent_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.home_learning_resources ENABLE ROW LEVEL SECURITY;

-- RLS Policies for parent_teacher_messages
CREATE POLICY "Parents can view their messages" ON public.parent_teacher_messages
  FOR SELECT USING (auth.uid() = parent_id);

CREATE POLICY "Teachers can view their messages" ON public.parent_teacher_messages
  FOR SELECT USING (auth.uid() = teacher_id);

CREATE POLICY "Parents can send messages" ON public.parent_teacher_messages
  FOR INSERT WITH CHECK (auth.uid() = parent_id);

CREATE POLICY "Teachers can send messages" ON public.parent_teacher_messages
  FOR INSERT WITH CHECK (auth.uid() = teacher_id);

CREATE POLICY "Message participants can update" ON public.parent_teacher_messages
  FOR UPDATE USING (auth.uid() IN (parent_id, teacher_id));

-- RLS Policies for student_reports
CREATE POLICY "Parents can view their child's reports" ON public.student_reports
  FOR SELECT USING (auth.uid() = parent_id);

CREATE POLICY "Teachers can create reports" ON public.student_reports
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Teachers can update reports" ON public.student_reports
  FOR UPDATE USING (auth.uid() IS NOT NULL);

-- RLS Policies for parental_controls
CREATE POLICY "Parents can manage their controls" ON public.parental_controls
  FOR ALL USING (auth.uid() = parent_id);

-- RLS Policies for parent_notifications
CREATE POLICY "Parents can view their notifications" ON public.parent_notifications
  FOR SELECT USING (auth.uid() = parent_id);

CREATE POLICY "System can create notifications" ON public.parent_notifications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Parents can update their notifications" ON public.parent_notifications
  FOR UPDATE USING (auth.uid() = parent_id);

-- RLS Policies for home_learning_resources
CREATE POLICY "Anyone can view learning resources" ON public.home_learning_resources
  FOR SELECT USING (true);

CREATE POLICY "Teachers can create resources" ON public.home_learning_resources
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Create triggers for updated_at
CREATE TRIGGER update_parent_teacher_messages_updated_at
  BEFORE UPDATE ON public.parent_teacher_messages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_parental_controls_updated_at
  BEFORE UPDATE ON public.parental_controls
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_home_learning_resources_updated_at
  BEFORE UPDATE ON public.home_learning_resources
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();