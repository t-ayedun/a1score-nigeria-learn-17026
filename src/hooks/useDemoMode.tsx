
import { useState, useEffect } from 'react';

export interface DemoUser {
  id: string;
  name: string;
  type: 'student' | 'teacher' | 'parent' | 'admin';
  level?: string;
  avatar?: string;
  progress?: {
    streak: number;
    points: number;
    avgScore: string;
  };
}

export interface DemoData {
  users: DemoUser[];
  sampleQuestions: any[];
  achievements: any[];
  analytics: any;
}

const demoData: DemoData = {
  users: [
    {
      id: 'demo-student-1',
      name: 'Adebayo Olamide',
      type: 'student',
      level: 'ss3',
      avatar: '👨‍🎓',
      progress: { streak: 15, points: 2450, avgScore: '87%' }
    },
    {
      id: 'demo-student-2',
      name: 'Fatima Hassan',
      type: 'student', 
      level: 'undergraduate',
      avatar: '👩‍🎓',
      progress: { streak: 30, points: 12450, avgScore: '92%' }
    },
    {
      id: 'demo-teacher-1',
      name: 'Mr. Chinedu Okoro',
      type: 'teacher',
      avatar: '👨‍🏫'
    },
    {
      id: 'demo-parent-1',
      name: 'Mrs. Aisha Musa',
      type: 'parent',
      avatar: '👩‍👧‍👦'
    }
  ],
  sampleQuestions: [
    {
      id: 1,
      subject: 'Mathematics',
      question: 'If log₂ 8 = x, find the value of x',
      options: ['2', '3', '4', '8'],
      correct: 1,
      explanation: 'Since 2³ = 8, therefore log₂ 8 = 3'
    },
    {
      id: 2,
      subject: 'Physics',
      question: 'The unit of electric field intensity is',
      options: ['NC⁻¹', 'Nm⁻¹', 'Vm⁻¹', 'Both A and C'],
      correct: 3,
      explanation: 'Electric field intensity is measured in Newtons per Coulomb (NC⁻¹) or Volts per meter (Vm⁻¹)'
    }
  ],
  achievements: [
    { title: 'JAMB Champion', description: 'Scored 300+ in practice test', icon: 'Trophy' },
    { title: 'Math Genius', description: 'Solved 100 math problems', icon: 'Calculator' },
    { title: 'Streak Master', description: '30-day learning streak', icon: 'Zap' }
  ],
  analytics: {
    totalStudents: 15000,
    activeTeachers: 800,
    passRate: 92,
    satisfaction: 4.8
  }
};

export const useDemoMode = () => {
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [currentDemoUser, setCurrentDemoUser] = useState<DemoUser>(demoData.users[0]);
  const [demoStep, setDemoStep] = useState(0);

  const enableDemoMode = () => setIsDemoMode(true);
  const disableDemoMode = () => setIsDemoMode(false);
  
  const switchDemoUser = (userId: string) => {
    const user = demoData.users.find(u => u.id === userId);
    if (user) setCurrentDemoUser(user);
  };

  const nextDemoStep = () => setDemoStep(prev => prev + 1);
  const prevDemoStep = () => setDemoStep(prev => Math.max(0, prev - 1));

  return {
    isDemoMode,
    enableDemoMode,
    disableDemoMode,
    currentDemoUser,
    switchDemoUser,
    demoStep,
    nextDemoStep,
    prevDemoStep,
    demoData
  };
};
