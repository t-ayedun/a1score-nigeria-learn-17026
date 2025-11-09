-- Seed Nigerian Curriculum Content

-- Insert WAEC/JAMB subjects
INSERT INTO public.subjects (name, code, academic_level, description) VALUES
-- JSS Subjects
('Mathematics', 'MTH_JSS', 'JSS', 'Basic mathematics covering arithmetic, algebra, and geometry'),
('English Language', 'ENG_JSS', 'JSS', 'English language and literature fundamentals'),
('Basic Science', 'BSC_JSS', 'JSS', 'Introduction to physics, chemistry, and biology'),
('Social Studies', 'SST_JSS', 'JSS', 'Geography, history, and civic education'),
('Computer Studies', 'COM_JSS', 'JSS', 'Basic computer literacy and programming'),

-- SS Subjects (WAEC)
('Mathematics', 'MTH_SS', 'SS', 'Advanced mathematics for WAEC including calculus and statistics'),
('English Language', 'ENG_SS', 'SS', 'Advanced English and literature for WAEC'),
('Physics', 'PHY_SS', 'SS', 'WAEC Physics covering mechanics, waves, and electricity'),
('Chemistry', 'CHM_SS', 'SS', 'WAEC Chemistry covering organic and inorganic chemistry'),
('Biology', 'BIO_SS', 'SS', 'WAEC Biology covering human biology, ecology, and genetics'),
('Economics', 'ECO_SS', 'SS', 'WAEC Economics covering micro and macroeconomics'),
('Government', 'GOV_SS', 'SS', 'WAEC Government covering Nigerian constitution and politics'),
('Geography', 'GEO_SS', 'SS', 'WAEC Geography covering physical and human geography'),
('Literature in English', 'LIT_SS', 'SS', 'WAEC Literature covering poetry, prose, and drama'),
('Further Mathematics', 'FMT_SS', 'SS', 'Advanced mathematics for WAEC including complex numbers'),

-- JAMB Subjects
('Use of English', 'UOE_JAMB', 'Undergraduate', 'JAMB English language comprehension and grammar'),
('Mathematics', 'MTH_JAMB', 'Undergraduate', 'JAMB Mathematics covering all secondary topics'),
('Physics', 'PHY_JAMB', 'Undergraduate', 'JAMB Physics preparation'),
('Chemistry', 'CHM_JAMB', 'Undergraduate', 'JAMB Chemistry preparation'),
('Biology', 'BIO_JAMB', 'Undergraduate', 'JAMB Biology preparation'),
('Economics', 'ECO_JAMB', 'Undergraduate', 'JAMB Economics preparation'),
('Government', 'GOV_JAMB', 'Undergraduate', 'JAMB Government preparation'),
('Geography', 'GEO_JAMB', 'Undergraduate', 'JAMB Geography preparation'),
('Literature in English', 'LIT_JAMB', 'Undergraduate', 'JAMB Literature preparation'),
('Accounting', 'ACC_JAMB', 'Undergraduate', 'JAMB Accounting preparation');

-- Insert achievements
INSERT INTO public.achievements (name, description, badge_icon, badge_color, criteria, points) VALUES
('First Quiz', 'Complete your first quiz', 'Trophy', '#10B981', '{"type": "quiz_completed", "target": 1}', 10),
('Quiz Streak', 'Complete quizzes for 7 consecutive days', 'Flame', '#F59E0B', '{"type": "quiz_streak", "target": 7}', 50),
('Math Master', 'Score 90% or higher on 5 mathematics quizzes', 'Calculator', '#3B82F6', '{"type": "subject_mastery", "subject": "Mathematics", "score": 90, "target": 5}', 100),
('English Expert', 'Score 90% or higher on 5 English quizzes', 'BookOpen', '#8B5CF6', '{"type": "subject_mastery", "subject": "English Language", "score": 90, "target": 5}', 100),
('Science Star', 'Score 85% or higher on 10 science quizzes', 'Atom', '#EF4444', '{"type": "subject_mastery", "subject": "Physics,Chemistry,Biology", "score": 85, "target": 10}', 150),
('Study Warrior', 'Study for 50 hours total', 'Clock', '#6366F1', '{"type": "study_hours", "target": 50}', 200),
('WAEC Ready', 'Complete all topics in 3 WAEC subjects', 'GraduationCap', '#F97316', '{"type": "waec_completion", "target": 3}', 300),
('JAMB Champion', 'Score 80% or higher on all 4 JAMB subjects', 'Award', '#DC2626', '{"type": "jamb_mastery", "score": 80}', 500);

-- Sample class generation function to create realistic class codes
CREATE OR REPLACE FUNCTION generate_class_code() RETURNS TEXT AS $$
BEGIN
  RETURN UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 6));
END;
$$ LANGUAGE plpgsql;