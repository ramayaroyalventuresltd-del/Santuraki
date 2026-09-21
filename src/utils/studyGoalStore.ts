import { DailyStudyGoalData, ExamSession } from '../types';
import { getUserExamHistory } from './userStore';

export function getLocalDateString(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function getYesterdayDateString(): string {
  const yesterday = new Date(Date.now() - 86400000);
  return getLocalDateString(yesterday);
}

const STORAGE_PREFIX = 'thesanturakiyauri_study_goal_';

function getStorageKey(userId: string): string {
  return `${STORAGE_PREFIX}${userId}`;
}

export function getDailyStudyGoal(userId: string): DailyStudyGoalData {
  const todayStr = getLocalDateString();
  const yesterdayStr = getYesterdayDateString();

  if (typeof window === 'undefined') {
    return {
      userId,
      dailyTargetQuestions: 30,
      lastActiveDate: todayStr,
      lastCompletedDate: yesterdayStr,
      currentStreak: 3,
      longestStreak: 5,
      dailyHistory: { [todayStr]: 15 },
    };
  }

  const key = getStorageKey(userId);
  const raw = localStorage.getItem(key);

  let data: DailyStudyGoalData;

  if (raw) {
    try {
      data = JSON.parse(raw);
    } catch {
      data = createDefaultGoalData(userId);
    }
  } else {
    data = createDefaultGoalData(userId);
  }

  // Ensure dailyHistory exists
  if (!data.dailyHistory) {
    data.dailyHistory = {};
  }

  // Sync with exam sessions from today to ensure questions answered in exams are counted
  const examHistory = getUserExamHistory(userId);
  let sessionsTodayCount = 0;
  
  examHistory.forEach((session) => {
    const sessionDate = getLocalDateString(new Date(session.submittedAt || session.startedAt));
    if (sessionDate === todayStr) {
      const answeredInSession = session.userAnswers 
        ? Object.keys(session.userAnswers).length 
        : session.totalQuestions || 0;
      sessionsTodayCount += answeredInSession;
    }
  });

  // Today's total is the max between tracked dailyHistory and actual exam answers today
  const existingToday = data.dailyHistory[todayStr] || 0;
  const currentToday = Math.max(existingToday, sessionsTodayCount);
  data.dailyHistory[todayStr] = currentToday;
  data.lastActiveDate = todayStr;

  // Streak verification logic
  // If last completed date was before yesterday, the streak is broken
  if (data.lastCompletedDate && data.lastCompletedDate !== todayStr && data.lastCompletedDate !== yesterdayStr) {
    // Check how many days ago
    const lastDate = new Date(data.lastCompletedDate).getTime();
    const yesterdayDate = new Date(yesterdayStr).getTime();
    const diffDays = Math.round((yesterdayDate - lastDate) / (1000 * 60 * 60 * 24));
    
    if (diffDays > 0) {
      data.currentStreak = 0;
    }
  }

  // Check if today's progress satisfies the target
  if (currentToday >= data.dailyTargetQuestions && data.dailyTargetQuestions > 0) {
    if (data.lastCompletedDate !== todayStr) {
      // Completed for the first time today
      if (data.lastCompletedDate === yesterdayStr) {
        data.currentStreak = (data.currentStreak || 0) + 1;
      } else {
        data.currentStreak = 1;
      }
      data.lastCompletedDate = todayStr;
      if (data.currentStreak > (data.longestStreak || 0)) {
        data.longestStreak = data.currentStreak;
      }
    }
  }

  // Save back sanitized data
  localStorage.setItem(key, JSON.stringify(data));
  return data;
}

function createDefaultGoalData(userId: string): DailyStudyGoalData {
  const todayStr = getLocalDateString();
  const yesterdayStr = getYesterdayDateString();

  // For initial demo candidate 101010 or 202020, seed an authentic active streak
  const isDemo = userId === '101010' || userId === '202020';
  const initialStreak = isDemo ? 3 : 1;
  const initialToday = isDemo ? 18 : 10;
  const initialTarget = 30;

  return {
    userId,
    dailyTargetQuestions: initialTarget,
    lastActiveDate: todayStr,
    lastCompletedDate: yesterdayStr,
    currentStreak: initialStreak,
    longestStreak: isDemo ? 5 : 1,
    dailyHistory: {
      [getYesterdayDateString()]: 35,
      [todayStr]: initialToday,
    },
  };
}

export function saveDailyStudyGoal(data: DailyStudyGoalData): void {
  if (typeof window === 'undefined') return;
  const key = getStorageKey(data.userId);
  localStorage.setItem(key, JSON.stringify(data));
}

export function updateDailyTarget(userId: string, target: number): DailyStudyGoalData {
  const cleanTarget = Math.max(5, Math.min(200, Math.round(target)));
  const goal = getDailyStudyGoal(userId);
  goal.dailyTargetQuestions = cleanTarget;
  
  const todayStr = getLocalDateString();
  const todayCount = goal.dailyHistory[todayStr] || 0;
  const yesterdayStr = getYesterdayDateString();

  if (todayCount >= cleanTarget) {
    if (goal.lastCompletedDate !== todayStr) {
      if (goal.lastCompletedDate === yesterdayStr) {
        goal.currentStreak = (goal.currentStreak || 0) + 1;
      } else {
        goal.currentStreak = 1;
      }
      goal.lastCompletedDate = todayStr;
      if (goal.currentStreak > (goal.longestStreak || 0)) {
        goal.longestStreak = goal.currentStreak;
      }
    }
  }

  saveDailyStudyGoal(goal);
  return goal;
}

export function recordStudyQuestions(userId: string, count: number): DailyStudyGoalData {
  if (count <= 0) return getDailyStudyGoal(userId);
  
  const goal = getDailyStudyGoal(userId);
  const todayStr = getLocalDateString();
  const yesterdayStr = getYesterdayDateString();

  const currentToday = (goal.dailyHistory[todayStr] || 0) + count;
  goal.dailyHistory[todayStr] = currentToday;
  goal.lastActiveDate = todayStr;

  if (currentToday >= goal.dailyTargetQuestions && goal.dailyTargetQuestions > 0) {
    if (goal.lastCompletedDate !== todayStr) {
      if (goal.lastCompletedDate === yesterdayStr) {
        goal.currentStreak = (goal.currentStreak || 0) + 1;
      } else {
        goal.currentStreak = 1;
      }
      goal.lastCompletedDate = todayStr;
      if (goal.currentStreak > (goal.longestStreak || 0)) {
        goal.longestStreak = goal.currentStreak;
      }
    }
  }

  saveDailyStudyGoal(goal);
  return goal;
}

export interface DayStreakItem {
  dateStr: string;
  dayLabel: string; // e.g. "Mon", "Tue"
  dateNum: number; // e.g. 21
  questionsAnswered: number;
  targetMet: boolean;
  isToday: boolean;
  isFuture: boolean;
}

export function getRecent7DaysStatus(goalData: DailyStudyGoalData): DayStreakItem[] {
  const result: DayStreakItem[] = [];
  const today = new Date();
  const todayStr = getLocalDateString(today);

  // Show past 6 days + today = 7 days
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today.getTime() - i * 86400000);
    const dateStr = getLocalDateString(d);
    const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short' });
    const dateNum = d.getDate();
    const answered = goalData.dailyHistory[dateStr] || 0;
    const targetMet = answered >= goalData.dailyTargetQuestions && goalData.dailyTargetQuestions > 0;
    const isToday = dateStr === todayStr;

    result.push({
      dateStr,
      dayLabel,
      dateNum,
      questionsAnswered: answered,
      targetMet,
      isToday,
      isFuture: false,
    });
  }

  return result;
}
