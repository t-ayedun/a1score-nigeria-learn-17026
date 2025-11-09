export type AcademicLevel = 'JSS' | 'SS' | 'Undergraduate' | 'Postgraduate-Taught' | 'Postgraduate-Research';

export interface LevelFeatures {
  // Core features available to all levels
  dashboard: boolean;
  aiTutor: boolean;
  quizzes: boolean;
  studyTimer: boolean;
  subjects: boolean;
  
  // Secondary school features
  jambPrep: boolean;
  careerGuidance: boolean;
  parentPortal: boolean;
  
  // University features
  pdfHelper: boolean;
  homeworkScanner: boolean;
  progressTracker: boolean;
  studyGoals: boolean;
  formulaReference: boolean;
  
  // Postgraduate research features
  literatureReview: boolean;
  referenceManager: boolean;
  thesisWriting: boolean;
  dataAnalysis: boolean;
  
  // Community features
  studentCommunity: boolean;
  
  // Advanced features
  adaptiveLearning: boolean;
}

export const LEVEL_PERMISSIONS: Record<AcademicLevel, LevelFeatures> = {
  'JSS': {
    dashboard: true,
    aiTutor: true,
    quizzes: true,
    studyTimer: true,
    subjects: true,
    jambPrep: false,
    careerGuidance: false,
    parentPortal: true,
    pdfHelper: false,
    homeworkScanner: true,
    progressTracker: true,
    studyGoals: true,
    formulaReference: true,
    literatureReview: false,
    referenceManager: false,
    thesisWriting: false,
    dataAnalysis: false,
    studentCommunity: true,
    adaptiveLearning: false,
  },
  'SS': {
    dashboard: true,
    aiTutor: true,
    quizzes: true,
    studyTimer: true,
    subjects: true,
    jambPrep: true,
    careerGuidance: true,
    parentPortal: true,
    pdfHelper: true,
    homeworkScanner: true,
    progressTracker: true,
    studyGoals: true,
    formulaReference: true,
    literatureReview: false,
    referenceManager: false,
    thesisWriting: false,
    dataAnalysis: false,
    studentCommunity: true,
    adaptiveLearning: false,
  },
  'Undergraduate': {
    dashboard: true,
    aiTutor: true,
    quizzes: true,
    studyTimer: true,
    subjects: true,
    jambPrep: false,
    careerGuidance: true,
    parentPortal: false,
    pdfHelper: true,
    homeworkScanner: true,
    progressTracker: true,
    studyGoals: true,
    formulaReference: true,
    literatureReview: true,
    referenceManager: true,
    thesisWriting: false,
    dataAnalysis: true,
    studentCommunity: true,
    adaptiveLearning: true,
  },
  'Postgraduate-Taught': {
    dashboard: true,
    aiTutor: true,
    quizzes: true,
    studyTimer: true,
    subjects: true,
    jambPrep: false,
    careerGuidance: true,
    parentPortal: false,
    pdfHelper: true,
    homeworkScanner: false,
    progressTracker: true,
    studyGoals: true,
    formulaReference: true,
    literatureReview: true,
    referenceManager: true,
    thesisWriting: true,
    dataAnalysis: true,
    studentCommunity: true,
    adaptiveLearning: true,
  },
  'Postgraduate-Research': {
    dashboard: true,
    aiTutor: true,
    quizzes: false,
    studyTimer: true,
    subjects: true,
    jambPrep: false,
    careerGuidance: true,
    parentPortal: false,
    pdfHelper: true,
    homeworkScanner: false,
    progressTracker: true,
    studyGoals: true,
    formulaReference: true,
    literatureReview: true,
    referenceManager: true,
    thesisWriting: true,
    dataAnalysis: true,
    studentCommunity: true,
    adaptiveLearning: true,
  },
};

export const LEVEL_DISPLAY_NAMES: Record<AcademicLevel, string> = {
  'JSS': 'Junior Secondary School',
  'SS': 'Senior Secondary School',
  'Undergraduate': 'Undergraduate',
  'Postgraduate-Taught': 'Postgraduate (Taught)',
  'Postgraduate-Research': 'Postgraduate (Research)',
};

export const LEVEL_DESCRIPTIONS: Record<AcademicLevel, string> = {
  'JSS': 'Foundation learning with core subjects and study habits',
  'SS': 'Advanced secondary education with JAMB preparation and career guidance',
  'Undergraduate': 'University-level studies with research basics and academic writing',
  'Postgraduate-Taught': 'Advanced coursework with dissertation support and professional development',
  'Postgraduate-Research': 'Full research toolkit with thesis management and publication support',
};

export function hasFeatureAccess(level: AcademicLevel, feature: keyof LevelFeatures): boolean {
  return LEVEL_PERMISSIONS[level][feature];
}

export function getLevelFromString(levelStr?: string): AcademicLevel {
  const validLevels: AcademicLevel[] = ['JSS', 'SS', 'Undergraduate', 'Postgraduate-Taught', 'Postgraduate-Research'];
  
  if (levelStr && validLevels.includes(levelStr as AcademicLevel)) {
    return levelStr as AcademicLevel;
  }
  
  // Default fallback based on common level strings
  if (levelStr?.toLowerCase().includes('jss') || levelStr?.toLowerCase().includes('junior')) {
    return 'JSS';
  }
  if (levelStr?.toLowerCase().includes('ss') || levelStr?.toLowerCase().includes('senior')) {
    return 'SS';
  }
  if (levelStr?.toLowerCase().includes('undergraduate') || levelStr?.toLowerCase().includes('bachelor')) {
    return 'Undergraduate';
  }
  if (levelStr?.toLowerCase().includes('postgraduate') || levelStr?.toLowerCase().includes('master') || levelStr?.toLowerCase().includes('phd')) {
    return 'Postgraduate-Research';
  }
  
  return 'SS'; // Default to Senior Secondary
}