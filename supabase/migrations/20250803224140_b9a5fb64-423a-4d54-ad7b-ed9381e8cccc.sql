-- Fix Anonymous Access Policies - Part 2
-- Fix class and parent-related tables

DROP POLICY IF EXISTS "Students can view their enrollments" ON public.class_enrollments;
CREATE POLICY "Authenticated students can view their enrollments" ON public.class_enrollments
FOR SELECT
TO authenticated
USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "Teachers can manage enrollments for their classes" ON public.class_enrollments;
CREATE POLICY "Authenticated teachers can manage enrollments for their classes" ON public.class_enrollments
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.class_groups 
    WHERE id = class_id AND teacher_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "Students can view their enrolled classes" ON public.class_groups;
CREATE POLICY "Authenticated students can view their enrolled classes" ON public.class_groups
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.class_enrollments 
    WHERE class_id = public.class_groups.id AND student_id = auth.uid() AND is_active = true
  )
);

DROP POLICY IF EXISTS "Teachers can manage their classes" ON public.class_groups;
CREATE POLICY "Authenticated teachers can manage their classes" ON public.class_groups
FOR ALL
TO authenticated
USING (auth.uid() = teacher_id);

DROP POLICY IF EXISTS "Parents can update their notifications" ON public.parent_notifications;
CREATE POLICY "Authenticated parents can update their notifications" ON public.parent_notifications
FOR UPDATE
TO authenticated
USING (auth.uid() = parent_id);

DROP POLICY IF EXISTS "Parents can view their notifications" ON public.parent_notifications;
CREATE POLICY "Authenticated parents can view their notifications" ON public.parent_notifications
FOR SELECT
TO authenticated
USING (auth.uid() = parent_id);

DROP POLICY IF EXISTS "Message participants can update" ON public.parent_teacher_messages;
CREATE POLICY "Authenticated message participants can update" ON public.parent_teacher_messages
FOR UPDATE
TO authenticated
USING ((auth.uid() = parent_id) OR (auth.uid() = teacher_id));

DROP POLICY IF EXISTS "Parents can view their messages" ON public.parent_teacher_messages;
CREATE POLICY "Authenticated parents can view their messages" ON public.parent_teacher_messages
FOR SELECT
TO authenticated
USING (auth.uid() = parent_id);

DROP POLICY IF EXISTS "Teachers can view their messages" ON public.parent_teacher_messages;
CREATE POLICY "Authenticated teachers can view their messages" ON public.parent_teacher_messages
FOR SELECT
TO authenticated
USING (auth.uid() = teacher_id);

DROP POLICY IF EXISTS "Parents can manage their controls" ON public.parental_controls;
CREATE POLICY "Authenticated parents can manage their controls" ON public.parental_controls
FOR ALL
TO authenticated
USING (auth.uid() = parent_id);