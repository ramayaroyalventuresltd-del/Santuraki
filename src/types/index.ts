export interface User {
  id: string; // 6-digit number e.g. "102030"
  username: string; // same 6-digit number
  fullName: string;
  sda: string; // Secretariat, Department or Agency
  cadre: string; // One of 23 FCTA Cadres
  gradeLevel: string; // e.g. "GL 03" to "GL 16"
  email?: string;
  phone?: string;
  registeredAt: string;
}

export type SubjectCategory = 
  | 'psr' 
  | 'fr' 
  | 'ppa' 
  | 'fct_gk'
  | string; // or cadre id

export interface Question {
  id: string;
  category: SubjectCategory;
  categoryLabel: string;
  subjectId?: string;
  chapterNumber: number; // 1 to 20
  chapterTitle: string;
  questionText: string;
  options: [string, string, string, string];
  correctOptionIndex: number; // 0, 1, 2, 3
  explanation: string;
  referenceRule?: string; // e.g., "PSR Rule 030401", "FR 105", "PPA 2007 Sec 16(1)"
  difficultyLevel?: number; // 1, 2, 3, or 4
  gradeLevelCategory?: string; // "GL 03 - GL 06", "GL 07 - GL 10", "GL 12 - GL 14", "GL 15 - GL 16"
  tierCode?: 'TIER_1' | 'TIER_2' | 'TIER_3' | 'TIER_4';
}

export interface ChapterInfo {
  chapterNumber: number;
  chapterTitle: string;
  description: string;
  questionCount: number;
}

export interface SubjectDomain {
  id: string;
  name: string;
  shortName: string;
  description: string;
  totalQuestions: number;
  chaptersCount: number;
  iconName: string;
  badgeColor: string;
  isCadre?: boolean;
}

export interface ExamSession {
  id: string;
  userId: string;
  title: string;
  category: string;
  chapterNumber?: number; // if chapter drill
  totalQuestions: number;
  timeLimitMinutes: number;
  questions: Question[];
  userAnswers: Record<number, number>; // question index -> option index
  flaggedQuestions: number[]; // question indices
  startedAt: number;
  submittedAt?: number;
  timeSpentSeconds?: number;
  score?: number;
  percentage?: number;
  isPassed?: boolean;
  status?: 'in_progress' | 'completed';
  mode: 'exam' | 'practice';
  difficultyLevel?: number; // 1, 2, 3, or 4
  difficultyLabel?: string; // e.g. "Tier 4: Directorate (GL 15 - 16)"
  tierCode?: 'TIER_1' | 'TIER_2' | 'TIER_3' | 'TIER_4';
}

export interface FctaDepartmentAgency {
  id: string;
  name: string;
  category: 'secretariat' | 'department' | 'agency' | 'board' | 'area_council';
  abbreviation: string;
  mandate: string;
  leadOffice: string;
}

export interface GradeLevelInfo {
  level: string; // "GL 03" to "GL 16"
  designation: string;
  cadreRank: string;
  yearsToNextPromotion: number;
  responsibilities: string;
}

export interface LearningModule {
  id: string;
  subject: 'psr' | 'fr' | 'ppa';
  subjectTitle: string;
  chapterNumber: number;
  title: string;
  summary: string;
  keyProvisions: {
    rule: string;
    heading: string;
    content: string;
  }[];
  practicalTips: string[];
}

export type ScreenDeviceType = 'desktop' | 'tablet' | 'mobile';

export interface ScreenRecognitionInfo {
  deviceType: ScreenDeviceType;
  rawDeviceType: ScreenDeviceType;
  width: number;
  height: number;
  orientation: 'landscape' | 'portrait';
  breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  pixelRatio: number;
  touchCapable: boolean;
  aspectRatio: string;
  isForced: boolean;
  forcedMode: ScreenDeviceType | 'auto';
}

export interface DailyStudyGoalData {
  userId: string;
  dailyTargetQuestions: number; // e.g. 20, 50, 100
  lastActiveDate: string; // YYYY-MM-DD
  lastCompletedDate: string; // YYYY-MM-DD
  currentStreak: number; // in days
  longestStreak: number; // in days
  dailyHistory: Record<string, number>; // date "YYYY-MM-DD" -> count of questions answered
}
