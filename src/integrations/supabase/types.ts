export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          badge_color: string | null
          badge_icon: string | null
          created_at: string
          criteria: Json
          description: string
          id: string
          is_active: boolean | null
          name: string
          points: number | null
        }
        Insert: {
          badge_color?: string | null
          badge_icon?: string | null
          created_at?: string
          criteria: Json
          description: string
          id?: string
          is_active?: boolean | null
          name: string
          points?: number | null
        }
        Update: {
          badge_color?: string | null
          badge_icon?: string | null
          created_at?: string
          criteria?: Json
          description?: string
          id?: string
          is_active?: boolean | null
          name?: string
          points?: number | null
        }
        Relationships: []
      }
      class_enrollments: {
        Row: {
          class_id: string
          enrolled_at: string
          id: string
          is_active: boolean | null
          student_id: string
        }
        Insert: {
          class_id: string
          enrolled_at?: string
          id?: string
          is_active?: boolean | null
          student_id: string
        }
        Update: {
          class_id?: string
          enrolled_at?: string
          id?: string
          is_active?: boolean | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "class_enrollments_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "class_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      class_groups: {
        Row: {
          academic_level: string
          class_code: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          subject_id: string
          teacher_id: string
          updated_at: string
        }
        Insert: {
          academic_level: string
          class_code: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          subject_id: string
          teacher_id: string
          updated_at?: string
        }
        Update: {
          academic_level?: string
          class_code?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          subject_id?: string
          teacher_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "class_groups_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      communities: {
        Row: {
          banner_url: string | null
          created_at: string | null
          created_by: string
          description: string | null
          id: string
          location: string | null
          member_count: number | null
          name: string
          post_count: number | null
          rules: string | null
          school: string | null
          subject: string | null
          type: Database["public"]["Enums"]["community_type"]
          updated_at: string | null
        }
        Insert: {
          banner_url?: string | null
          created_at?: string | null
          created_by: string
          description?: string | null
          id?: string
          location?: string | null
          member_count?: number | null
          name: string
          post_count?: number | null
          rules?: string | null
          school?: string | null
          subject?: string | null
          type: Database["public"]["Enums"]["community_type"]
          updated_at?: string | null
        }
        Update: {
          banner_url?: string | null
          created_at?: string | null
          created_by?: string
          description?: string | null
          id?: string
          location?: string | null
          member_count?: number | null
          name?: string
          post_count?: number | null
          rules?: string | null
          school?: string | null
          subject?: string | null
          type?: Database["public"]["Enums"]["community_type"]
          updated_at?: string | null
        }
        Relationships: []
      }
      community_activity: {
        Row: {
          activity_type: string
          community_id: string
          content_id: string | null
          content_title: string | null
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          activity_type: string
          community_id: string
          content_id?: string | null
          content_title?: string | null
          created_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          activity_type?: string
          community_id?: string
          content_id?: string | null
          content_title?: string | null
          created_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_activity_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
        ]
      }
      community_discussions: {
        Row: {
          community_id: string
          created_at: string | null
          description: string | null
          id: string
          is_pinned: boolean | null
          reply_count: number | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          community_id: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_pinned?: boolean | null
          reply_count?: number | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          community_id?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_pinned?: boolean | null
          reply_count?: number | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_discussions_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
        ]
      }
      community_members: {
        Row: {
          community_id: string
          id: string
          joined_at: string | null
          role: Database["public"]["Enums"]["community_role"] | null
          user_id: string
        }
        Insert: {
          community_id: string
          id?: string
          joined_at?: string | null
          role?: Database["public"]["Enums"]["community_role"] | null
          user_id: string
        }
        Update: {
          community_id?: string
          id?: string
          joined_at?: string | null
          role?: Database["public"]["Enums"]["community_role"] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_members_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
        ]
      }
      community_moderation: {
        Row: {
          action_type: Database["public"]["Enums"]["moderation_action"]
          community_id: string
          content_id: string | null
          created_at: string | null
          expires_at: string | null
          id: string
          moderator_id: string
          reason: string
          user_id: string
        }
        Insert: {
          action_type: Database["public"]["Enums"]["moderation_action"]
          community_id: string
          content_id?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          moderator_id: string
          reason: string
          user_id: string
        }
        Update: {
          action_type?: Database["public"]["Enums"]["moderation_action"]
          community_id?: string
          content_id?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          moderator_id?: string
          reason?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_moderation_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
        ]
      }
      community_posts: {
        Row: {
          community_id: string
          content: string
          created_at: string | null
          downvotes: number | null
          file_name: string | null
          file_url: string | null
          id: string
          reply_count: number | null
          title: string | null
          type: Database["public"]["Enums"]["post_type"] | null
          updated_at: string | null
          upvotes: number | null
          user_id: string
        }
        Insert: {
          community_id: string
          content: string
          created_at?: string | null
          downvotes?: number | null
          file_name?: string | null
          file_url?: string | null
          id?: string
          reply_count?: number | null
          title?: string | null
          type?: Database["public"]["Enums"]["post_type"] | null
          updated_at?: string | null
          upvotes?: number | null
          user_id: string
        }
        Update: {
          community_id?: string
          content?: string
          created_at?: string | null
          downvotes?: number | null
          file_name?: string | null
          file_url?: string | null
          id?: string
          reply_count?: number | null
          title?: string | null
          type?: Database["public"]["Enums"]["post_type"] | null
          updated_at?: string | null
          upvotes?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_posts_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_history: {
        Row: {
          content: string
          created_at: string
          id: string
          message_type: string
          metadata: Json | null
          subject: string
          tutor_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          message_type: string
          metadata?: Json | null
          subject: string
          tutor_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          message_type?: string
          metadata?: Json | null
          subject?: string
          tutor_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      discussion_replies: {
        Row: {
          content: string
          created_at: string | null
          discussion_id: string
          downvotes: number | null
          id: string
          parent_reply_id: string | null
          updated_at: string | null
          upvotes: number | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          discussion_id: string
          downvotes?: number | null
          id?: string
          parent_reply_id?: string | null
          updated_at?: string | null
          upvotes?: number | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          discussion_id?: string
          downvotes?: number | null
          id?: string
          parent_reply_id?: string | null
          updated_at?: string | null
          upvotes?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "discussion_replies_discussion_id_fkey"
            columns: ["discussion_id"]
            isOneToOne: false
            referencedRelation: "community_discussions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "discussion_replies_parent_reply_id_fkey"
            columns: ["parent_reply_id"]
            isOneToOne: false
            referencedRelation: "discussion_replies"
            referencedColumns: ["id"]
          },
        ]
      }
      home_learning_resources: {
        Row: {
          content: string | null
          created_at: string
          description: string | null
          difficulty_level: string | null
          estimated_duration: number | null
          external_url: string | null
          id: string
          is_featured: boolean | null
          resource_type: string | null
          subject: string | null
          tags: string[] | null
          target_age_group: string | null
          title: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          description?: string | null
          difficulty_level?: string | null
          estimated_duration?: number | null
          external_url?: string | null
          id?: string
          is_featured?: boolean | null
          resource_type?: string | null
          subject?: string | null
          tags?: string[] | null
          target_age_group?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          description?: string | null
          difficulty_level?: string | null
          estimated_duration?: number | null
          external_url?: string | null
          id?: string
          is_featured?: boolean | null
          resource_type?: string | null
          subject?: string | null
          tags?: string[] | null
          target_age_group?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      learning_path_topics: {
        Row: {
          id: string
          is_required: boolean | null
          learning_path_id: string
          order_index: number
          topic_id: string
        }
        Insert: {
          id?: string
          is_required?: boolean | null
          learning_path_id: string
          order_index?: number
          topic_id: string
        }
        Update: {
          id?: string
          is_required?: boolean | null
          learning_path_id?: string
          order_index?: number
          topic_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "learning_path_topics_learning_path_id_fkey"
            columns: ["learning_path_id"]
            isOneToOne: false
            referencedRelation: "learning_paths"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "learning_path_topics_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_paths: {
        Row: {
          academic_level: string
          created_at: string
          description: string | null
          difficulty: string
          estimated_duration_hours: number | null
          id: string
          is_active: boolean | null
          learning_outcomes: string[] | null
          prerequisites: string[] | null
          subject_id: string
          title: string
          updated_at: string
        }
        Insert: {
          academic_level: string
          created_at?: string
          description?: string | null
          difficulty?: string
          estimated_duration_hours?: number | null
          id?: string
          is_active?: boolean | null
          learning_outcomes?: string[] | null
          prerequisites?: string[] | null
          subject_id: string
          title: string
          updated_at?: string
        }
        Update: {
          academic_level?: string
          created_at?: string
          description?: string | null
          difficulty?: string
          estimated_duration_hours?: number | null
          id?: string
          is_active?: boolean | null
          learning_outcomes?: string[] | null
          prerequisites?: string[] | null
          subject_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "learning_paths_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_plans: {
        Row: {
          academic_level: string
          activities: Json | null
          assessment_criteria: string | null
          created_at: string
          description: string | null
          duration_minutes: number | null
          id: string
          is_shared: boolean | null
          materials: Json | null
          objectives: string[] | null
          subject_id: string
          teacher_id: string
          title: string
          updated_at: string
        }
        Insert: {
          academic_level: string
          activities?: Json | null
          assessment_criteria?: string | null
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_shared?: boolean | null
          materials?: Json | null
          objectives?: string[] | null
          subject_id: string
          teacher_id: string
          title: string
          updated_at?: string
        }
        Update: {
          academic_level?: string
          activities?: Json | null
          assessment_criteria?: string | null
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_shared?: boolean | null
          materials?: Json | null
          objectives?: string[] | null
          subject_id?: string
          teacher_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_plans_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      message_requests: {
        Row: {
          created_at: string
          id: string
          message: string | null
          receiver_id: string
          sender_id: string
          status: Database["public"]["Enums"]["request_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          message?: string | null
          receiver_id: string
          sender_id: string
          status?: Database["public"]["Enums"]["request_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string | null
          receiver_id?: string
          sender_id?: string
          status?: Database["public"]["Enums"]["request_status"]
          updated_at?: string
        }
        Relationships: []
      }
      parent_notifications: {
        Row: {
          channels_sent: string[] | null
          content: string
          created_at: string
          id: string
          is_read: boolean | null
          notification_type: string
          parent_id: string
          priority: string | null
          scheduled_for: string | null
          sent_at: string | null
          student_id: string
          title: string
        }
        Insert: {
          channels_sent?: string[] | null
          content: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          notification_type: string
          parent_id: string
          priority?: string | null
          scheduled_for?: string | null
          sent_at?: string | null
          student_id: string
          title: string
        }
        Update: {
          channels_sent?: string[] | null
          content?: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          notification_type?: string
          parent_id?: string
          priority?: string | null
          scheduled_for?: string | null
          sent_at?: string | null
          student_id?: string
          title?: string
        }
        Relationships: []
      }
      parent_teacher_messages: {
        Row: {
          created_at: string
          id: string
          is_read: boolean | null
          message: string
          message_type: string | null
          parent_id: string
          parent_read_at: string | null
          priority: string | null
          student_id: string
          subject: string | null
          teacher_id: string
          teacher_read_at: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          message: string
          message_type?: string | null
          parent_id: string
          parent_read_at?: string | null
          priority?: string | null
          student_id: string
          subject?: string | null
          teacher_id: string
          teacher_read_at?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          message?: string
          message_type?: string | null
          parent_id?: string
          parent_read_at?: string | null
          priority?: string | null
          student_id?: string
          subject?: string | null
          teacher_id?: string
          teacher_read_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      parental_controls: {
        Row: {
          ai_assistance_level: string | null
          allowed_subjects: string[] | null
          content_filter_level: string | null
          created_at: string
          daily_time_limit: number | null
          id: string
          notification_preferences: Json | null
          parent_id: string
          student_id: string
          study_hours_end: string | null
          study_hours_start: string | null
          updated_at: string
          weekend_restrictions: boolean | null
        }
        Insert: {
          ai_assistance_level?: string | null
          allowed_subjects?: string[] | null
          content_filter_level?: string | null
          created_at?: string
          daily_time_limit?: number | null
          id?: string
          notification_preferences?: Json | null
          parent_id: string
          student_id: string
          study_hours_end?: string | null
          study_hours_start?: string | null
          updated_at?: string
          weekend_restrictions?: boolean | null
        }
        Update: {
          ai_assistance_level?: string | null
          allowed_subjects?: string[] | null
          content_filter_level?: string | null
          created_at?: string
          daily_time_limit?: number | null
          id?: string
          notification_preferences?: Json | null
          parent_id?: string
          student_id?: string
          study_hours_end?: string | null
          study_hours_start?: string | null
          updated_at?: string
          weekend_restrictions?: boolean | null
        }
        Relationships: []
      }
      pdf_analyses: {
        Row: {
          analysis_type: string | null
          breakdown_content: string | null
          created_at: string
          file_name: string
          file_path: string
          id: string
          original_content: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          analysis_type?: string | null
          breakdown_content?: string | null
          created_at?: string
          file_name: string
          file_path: string
          id?: string
          original_content?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          analysis_type?: string | null
          breakdown_content?: string | null
          created_at?: string
          file_name?: string
          file_path?: string
          id?: string
          original_content?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      post_votes: {
        Row: {
          created_at: string | null
          id: string
          post_id: string
          user_id: string
          vote_type: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_id: string
          user_id: string
          vote_type: string
        }
        Update: {
          created_at?: string | null
          id?: string
          post_id?: string
          user_id?: string
          vote_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_votes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_privacy_settings: {
        Row: {
          created_at: string | null
          id: string
          show_avatar_in_communities: boolean | null
          show_bio_in_communities: boolean | null
          show_location_in_communities: boolean | null
          show_school_in_communities: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          show_avatar_in_communities?: boolean | null
          show_bio_in_communities?: boolean | null
          show_location_in_communities?: boolean | null
          show_school_in_communities?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          show_avatar_in_communities?: boolean | null
          show_bio_in_communities?: boolean | null
          show_location_in_communities?: boolean | null
          show_school_in_communities?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          display_name: string | null
          id: string
          location: string | null
          school: string | null
          updated_at: string | null
          user_id: string
          user_type: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          id?: string
          location?: string | null
          school?: string | null
          updated_at?: string | null
          user_id: string
          user_type?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          id?: string
          location?: string | null
          school?: string | null
          updated_at?: string | null
          user_id?: string
          user_type?: string | null
        }
        Relationships: []
      }
      quiz_attempts: {
        Row: {
          correct_answers: number
          created_at: string
          exam_type: string | null
          id: string
          questions_data: Json
          score_percentage: number
          subject: string
          time_taken_minutes: number | null
          topic: string
          total_questions: number
          user_answers: Json
          user_id: string
        }
        Insert: {
          correct_answers: number
          created_at?: string
          exam_type?: string | null
          id?: string
          questions_data: Json
          score_percentage: number
          subject: string
          time_taken_minutes?: number | null
          topic: string
          total_questions: number
          user_answers: Json
          user_id: string
        }
        Update: {
          correct_answers?: number
          created_at?: string
          exam_type?: string | null
          id?: string
          questions_data?: Json
          score_percentage?: number
          subject?: string
          time_taken_minutes?: number | null
          topic?: string
          total_questions?: number
          user_answers?: Json
          user_id?: string
        }
        Relationships: []
      }
      quiz_questions: {
        Row: {
          correct_answer: number
          created_at: string
          difficulty_level: string
          exam_type: string | null
          explanation: string
          id: string
          options: Json
          question_text: string
          subject: string
          topic: string
          updated_at: string
        }
        Insert: {
          correct_answer: number
          created_at?: string
          difficulty_level: string
          exam_type?: string | null
          explanation: string
          id?: string
          options: Json
          question_text: string
          subject: string
          topic: string
          updated_at?: string
        }
        Update: {
          correct_answer?: number
          created_at?: string
          difficulty_level?: string
          exam_type?: string | null
          explanation?: string
          id?: string
          options?: Json
          question_text?: string
          subject?: string
          topic?: string
          updated_at?: string
        }
        Relationships: []
      }
      shared_files: {
        Row: {
          community_id: string
          created_at: string | null
          description: string | null
          download_count: number | null
          file_name: string
          file_size: number | null
          file_type: string | null
          file_url: string
          id: string
          user_id: string
        }
        Insert: {
          community_id: string
          created_at?: string | null
          description?: string | null
          download_count?: number | null
          file_name: string
          file_size?: number | null
          file_type?: string | null
          file_url: string
          id?: string
          user_id: string
        }
        Update: {
          community_id?: string
          created_at?: string | null
          description?: string | null
          download_count?: number | null
          file_name?: string
          file_size?: number | null
          file_type?: string | null
          file_url?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shared_files_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
        ]
      }
      student_reports: {
        Row: {
          achievements: string[] | null
          ai_usage_hours: number | null
          areas_for_improvement: string[] | null
          attendance_rate: number | null
          generated_at: string
          id: string
          overall_grade: number | null
          parent_id: string
          period_end: string
          period_start: string
          report_type: string | null
          sent_at: string | null
          sent_to_parent: boolean | null
          student_id: string
          subjects: Json | null
          teacher_comments: string | null
        }
        Insert: {
          achievements?: string[] | null
          ai_usage_hours?: number | null
          areas_for_improvement?: string[] | null
          attendance_rate?: number | null
          generated_at?: string
          id?: string
          overall_grade?: number | null
          parent_id: string
          period_end: string
          period_start: string
          report_type?: string | null
          sent_at?: string | null
          sent_to_parent?: boolean | null
          student_id: string
          subjects?: Json | null
          teacher_comments?: string | null
        }
        Update: {
          achievements?: string[] | null
          ai_usage_hours?: number | null
          areas_for_improvement?: string[] | null
          attendance_rate?: number | null
          generated_at?: string
          id?: string
          overall_grade?: number | null
          parent_id?: string
          period_end?: string
          period_start?: string
          report_type?: string | null
          sent_at?: string | null
          sent_to_parent?: boolean | null
          student_id?: string
          subjects?: Json | null
          teacher_comments?: string | null
        }
        Relationships: []
      }
      study_sessions: {
        Row: {
          duration_minutes: number
          ended_at: string | null
          id: string
          metadata: Json | null
          points_earned: number | null
          session_type: string
          started_at: string
          subject_id: string | null
          topic_id: string | null
          user_id: string
        }
        Insert: {
          duration_minutes?: number
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          points_earned?: number | null
          session_type?: string
          started_at?: string
          subject_id?: string | null
          topic_id?: string | null
          user_id: string
        }
        Update: {
          duration_minutes?: number
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          points_earned?: number | null
          session_type?: string
          started_at?: string
          subject_id?: string | null
          topic_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_sessions_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "study_sessions_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      subjects: {
        Row: {
          academic_level: string
          code: string
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          academic_level: string
          code: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          academic_level?: string
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      topics: {
        Row: {
          created_at: string
          description: string | null
          difficulty_level: string
          estimated_hours: number | null
          id: string
          name: string
          order_index: number
          subject_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          difficulty_level?: string
          estimated_hours?: number | null
          id?: string
          name: string
          order_index?: number
          subject_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          difficulty_level?: string
          estimated_hours?: number | null
          id?: string
          name?: string
          order_index?: number
          subject_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "topics_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      user_achievements: {
        Row: {
          achievement_id: string
          earned_at: string
          id: string
          metadata: Json | null
          user_id: string
        }
        Insert: {
          achievement_id: string
          earned_at?: string
          id?: string
          metadata?: Json | null
          user_id: string
        }
        Update: {
          achievement_id?: string
          earned_at?: string
          id?: string
          metadata?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
        ]
      }
      user_connections: {
        Row: {
          created_at: string
          id: string
          user1_id: string
          user2_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          user1_id: string
          user2_id: string
        }
        Update: {
          created_at?: string
          id?: string
          user1_id?: string
          user2_id?: string
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          average_score: number | null
          correct_answers: number | null
          created_at: string
          id: string
          last_activity_date: string | null
          streak_days: number | null
          study_hours: number | null
          subject: string
          topic: string | null
          total_questions: number | null
          total_quizzes: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          average_score?: number | null
          correct_answers?: number | null
          created_at?: string
          id?: string
          last_activity_date?: string | null
          streak_days?: number | null
          study_hours?: number | null
          subject: string
          topic?: string | null
          total_questions?: number | null
          total_quizzes?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          average_score?: number | null
          correct_answers?: number | null
          created_at?: string
          id?: string
          last_activity_date?: string | null
          streak_days?: number | null
          study_hours?: number | null
          subject?: string
          topic?: string | null
          total_questions?: number | null
          total_quizzes?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_class_code: { Args: never; Returns: string }
      get_community_safe_profile: {
        Args: { profile_user_id: string }
        Returns: {
          avatar_url: string
          bio: string
          display_name: string
          location: string
          school: string
          user_id: string
        }[]
      }
      get_post_vote_counts: {
        Args: { post_id_param: string }
        Returns: {
          downvotes: number
          upvotes: number
        }[]
      }
      get_quiz_questions_for_session: {
        Args: {
          p_difficulty?: string
          p_limit?: number
          p_subject: string
          p_topic: string
        }
        Returns: {
          difficulty_level: string
          exam_type: string
          id: string
          options: Json
          question_text: string
          subject: string
          topic: string
        }[]
      }
      get_quiz_results_with_answers: {
        Args: { p_quiz_attempt_id: string }
        Returns: {
          correct_answer: number
          explanation: string
          is_correct: boolean
          options: Json
          question_id: string
          question_text: string
          user_answer: number
        }[]
      }
      is_teacher: { Args: never; Returns: boolean }
    }
    Enums: {
      community_role: "admin" | "moderator" | "member"
      community_type: "school" | "zone" | "subject"
      moderation_action:
        | "warning"
        | "temporary_ban"
        | "permanent_ban"
        | "content_removal"
      post_type: "text" | "image" | "file" | "link"
      request_status: "pending" | "accepted" | "declined"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      community_role: ["admin", "moderator", "member"],
      community_type: ["school", "zone", "subject"],
      moderation_action: [
        "warning",
        "temporary_ban",
        "permanent_ban",
        "content_removal",
      ],
      post_type: ["text", "image", "file", "link"],
      request_status: ["pending", "accepted", "declined"],
    },
  },
} as const
