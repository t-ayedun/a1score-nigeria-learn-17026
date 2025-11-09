
export const jamb_questions = [
  {
    id: 1,
    subject: 'Mathematics',
    topic: 'Quadratic Equations',
    question: 'Find the roots of the equation x² - 5x + 6 = 0',
    options: ['x = 2, 3', 'x = 1, 6', 'x = -2, -3', 'x = 2, -3'],
    correct: 0,
    explanation: 'Using factorization: x² - 5x + 6 = (x-2)(x-3) = 0, so x = 2 or x = 3',
    year: 2023,
    difficulty: 'Medium'
  },
  {
    id: 2,
    subject: 'Physics',
    topic: 'Motion',
    question: 'A body travels 120m in 8s. Calculate its average speed.',
    options: ['10 m/s', '15 m/s', '20 m/s', '25 m/s'],
    correct: 1,
    explanation: 'Average speed = Distance/Time = 120m/8s = 15 m/s',
    year: 2023,
    difficulty: 'Easy'
  },
  {
    id: 3,
    subject: 'Chemistry',
    topic: 'Atomic Structure',
    question: 'What is the electronic configuration of Sodium (Na, atomic number 11)?',
    options: ['2, 8, 1', '2, 7, 2', '2, 8, 2', '2, 6, 3'],
    correct: 0,
    explanation: 'Sodium has 11 electrons arranged as: 2 in first shell, 8 in second shell, 1 in third shell',
    year: 2022,
    difficulty: 'Easy'
  }
];

export const studentProfiles = [
  {
    name: 'Adebayo Olamide',
    class: 'SS3',
    school: 'King\'s College Lagos',
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'English'],
    targetScore: 280,
    currentAverage: 245,
    strengths: ['Mathematics', 'Physics'],
    weaknesses: ['English', 'Chemistry'],
    studyStreak: 15,
    totalPoints: 2450
  },
  {
    name: 'Fatima Hassan',
    class: 'SS2',
    school: 'Queen\'s College Lagos',
    subjects: ['Biology', 'Chemistry', 'Physics', 'Mathematics'],
    targetScore: 300,
    currentAverage: 267,
    strengths: ['Biology', 'Chemistry'],
    weaknesses: ['Physics', 'Mathematics'],
    studyStreak: 23,
    totalPoints: 3200
  }
];

export const teacherAnalytics = {
  totalStudents: 127,
  activeThisWeek: 98,
  averageScore: 78,
  improvementRate: 23,
  topPerformers: [
    { name: 'Kemi Adebayo', score: 94, improvement: +12 },
    { name: 'Tunde Okafor', score: 91, improvement: +8 },
    { name: 'Amina Suleiman', score: 88, improvement: +15 }
  ],
  subjectPerformance: [
    { subject: 'Mathematics', average: 82, students: 45 },
    { subject: 'Physics', average: 76, students: 38 },
    { subject: 'Chemistry', average: 79, students: 44 }
  ]
};

export const parentInsights = {
  childProgress: {
    weeklyStudyHours: 12,
    completedAssignments: 8,
    missedAssignments: 1,
    averageScore: 87,
    improvement: +5
  },
  recentActivities: [
    { subject: 'Mathematics', activity: 'Completed Algebra Quiz', score: 85, date: '2 hours ago' },
    { subject: 'Physics', activity: 'Studied Motion Laws', duration: '45 min', date: '5 hours ago' },
    { subject: 'Chemistry', activity: 'Practice Test', score: 78, date: '1 day ago' }
  ],
  recommendations: [
    'Kemi needs more practice with Organic Chemistry',
    'Great improvement in Mathematics this week!',
    'Consider scheduling study time for Physics concepts'
  ]
};
