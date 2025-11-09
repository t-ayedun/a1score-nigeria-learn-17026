
export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  userType: 'student' | 'teacher' | 'admin' | 'parent';
  isEmailVerified: boolean;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
  
  // Student specific
  academicLevel?: 'JSS' | 'SS' | 'Undergraduate' | 'Postgraduate-Taught' | 'Postgraduate-Research' | string;
  subjects?: string[];
  graduationYear?: number;
  
  // Teacher specific
  teachingSubjects?: string[];
  qualification?: string;
  experience?: number;
  isVerified?: boolean;
  
  // Parent specific
  childrenIds?: string[];
  
  // Admin specific
  institution?: string;
  institutionRole?: string;
  
  // Profile settings
  preferences: {
    language: string;
    theme: 'light' | 'dark';
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
    privacy: {
      showProfile: boolean;
      showProgress: boolean;
    };
  };
  
  // Progress tracking
  stats: {
    totalQuizzes: number;
    averageScore: number;
    streakDays: number;
    totalStudyHours: number;
    badgesEarned: number;
  };
}

export interface UserProgress {
  userId: string;
  subject: string;
  level: string;
  topicsCompleted: number;
  totalTopics: number;
  averageScore: number;
  lastActivityDate: string;
  timeSpent: number; // in minutes
  strengthAreas: string[];
  weaknessAreas: string[];
}

export interface UserActivity {
  id: string;
  userId: string;
  activityType: 'quiz' | 'lesson' | 'tutor_chat' | 'achievement';
  subject?: string;
  description: string;
  score?: number;
  timeSpent: number; // in minutes
  timestamp: string;
  metadata?: Record<string, any>;
}
