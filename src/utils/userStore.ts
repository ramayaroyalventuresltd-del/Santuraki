import { User, ExamSession } from '../types';
import { INITIAL_DEMO_USERS } from '../data/fctaData';
import { generateInitialDemoHistory } from '../data/demoExamHistory';

const USERS_STORAGE_KEY = 'thesanturakiyauri_cbt_users_v1';
const CURRENT_USER_KEY = 'thesanturakiyauri_cbt_current_user_v1';
const EXAM_HISTORY_KEY = 'thesanturakiyauri_cbt_history_v1';

export function getStoredUsers(): User[] {
  if (typeof window === 'undefined') return INITIAL_DEMO_USERS;
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_USERS));
      return INITIAL_DEMO_USERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_DEMO_USERS;
  } catch (e) {
    console.error('Failed to parse users', e);
    return INITIAL_DEMO_USERS;
  }
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setCurrentUser(user: User | null) {
  if (typeof window === 'undefined') return;
  if (!user) {
    localStorage.removeItem(CURRENT_USER_KEY);
  } else {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  }
}

export function registerUser(newUserData: {
  username: string; // 6 digit number
  fullName: string;
  sda: string;
  cadre: string;
  gradeLevel: string;
  email?: string;
  phone?: string;
}): { success: boolean; message: string; user?: User } {
  // Validate 6 digit format
  const digitRegex = /^\d{6}$/;
  if (!digitRegex.test(newUserData.username)) {
    return { success: false, message: 'Staff ID / Username must be exactly a 6-digit number.' };
  }

  if (!newUserData.fullName.trim()) {
    return { success: false, message: 'Please enter a valid User Name (Full Name).' };
  }

  const users = getStoredUsers();
  const existing = users.find((u) => u.username === newUserData.username);
  if (existing) {
    return { success: false, message: `A candidate with 6-digit ID "${newUserData.username}" is already registered. Please log in or use your unique ID.` };
  }

  const user: User = {
    id: newUserData.username,
    username: newUserData.username,
    fullName: newUserData.fullName.trim(),
    sda: newUserData.sda,
    cadre: newUserData.cadre,
    gradeLevel: newUserData.gradeLevel,
    email: newUserData.email,
    phone: newUserData.phone,
    registeredAt: new Date().toISOString(),
  };

  users.push(user);
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  return { success: true, message: 'Registration successful! You can now log in using your 6-digit number.', user };
}

export function validateLogin(usernameInput: string, passwordInput: string): { success: boolean; message: string; user?: User } {
  const cleanUser = usernameInput.trim();
  const cleanPass = passwordInput.trim();

  // Validate that username and password are a 6-digit number
  const digitRegex = /^\d{6}$/;
  if (!digitRegex.test(cleanUser)) {
    return { success: false, message: 'Username must be a 6-digit number.' };
  }

  if (cleanUser !== cleanPass) {
    return { success: false, message: 'Invalid credentials: The password must be the exact same 6-digit number as your username.' };
  }

  const users = getStoredUsers();
  const user = users.find((u) => u.username === cleanUser);

  if (!user) {
    return {
      success: false,
      message: `No candidate found with 6-digit ID "${cleanUser}". Please click "Register New User" to create your profile.`,
    };
  }

  return { success: true, message: 'Login successful', user };
}

export function saveExamSession(session: ExamSession) {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(EXAM_HISTORY_KEY);
    const history: ExamSession[] = raw ? JSON.parse(raw) : [];
    // Replace if exists, or append
    const idx = history.findIndex((h) => h.id === session.id);
    if (idx >= 0) {
      history[idx] = session;
    } else {
      history.unshift(session);
    }
    localStorage.setItem(EXAM_HISTORY_KEY, JSON.stringify(history.slice(0, 100)));

    // Track answered question IDs for this user
    if (session.userId && session.questions && session.questions.length > 0) {
      const answeredIds = session.questions
        .filter((_, qIdx) => session.userAnswers && session.userAnswers[qIdx] !== undefined)
        .map((q) => q.id);
      
      // If userAnswers is empty or it's a submitted session, record all session questions as attempted
      const idsToRecord = answeredIds.length > 0 ? answeredIds : session.questions.map((q) => q.id);
      recordUserAnsweredQuestionIds(session.userId, idsToRecord);
    }
  } catch (e) {
    console.error('Failed to save exam session', e);
  }
}

const ANSWERED_QUESTIONS_PREFIX = 'thesanturakiyauri_cbt_answered_ids_';

export function getUserAnsweredQuestionIds(userId: string): Set<string> {
  const result = new Set<string>();
  if (typeof window === 'undefined' || !userId) return result;

  try {
    const key = `${ANSWERED_QUESTIONS_PREFIX}${userId}`;
    const raw = localStorage.getItem(key);
    if (raw) {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) {
        arr.forEach((id: string) => result.add(id));
      }
    }

    // Also parse past exam sessions in history to ensure complete tracking
    const history = getUserExamHistory(userId);
    history.forEach((session) => {
      if (session.questions) {
        session.questions.forEach((q) => {
          if (q.id) result.add(q.id);
        });
      }
    });
  } catch (e) {
    console.error('Failed to retrieve answered question IDs', e);
  }

  return result;
}

export function recordUserAnsweredQuestionIds(userId: string, questionIds: string[]): void {
  if (typeof window === 'undefined' || !userId || !questionIds || questionIds.length === 0) return;

  try {
    const current = getUserAnsweredQuestionIds(userId);
    questionIds.forEach((id) => {
      if (id) current.add(id);
    });

    const key = `${ANSWERED_QUESTIONS_PREFIX}${userId}`;
    localStorage.setItem(key, JSON.stringify(Array.from(current)));
  } catch (e) {
    console.error('Failed to record answered question IDs', e);
  }
}

export function getUserAnsweredCount(userId: string): number {
  return getUserAnsweredQuestionIds(userId).size;
}

export function getUserExamHistory(userId: string): ExamSession[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(EXAM_HISTORY_KEY);
    if (!raw) {
      // If user is a demo user (e.g. 101010), populate realistic baseline history
      const initialHistory = generateInitialDemoHistory(userId);
      if (initialHistory.length > 0) {
        localStorage.setItem(EXAM_HISTORY_KEY, JSON.stringify(initialHistory));
        return initialHistory;
      }
      return [];
    }
    const history: ExamSession[] = JSON.parse(raw);
    const userSessions = history.filter((h) => h.userId === userId);
    // If the demo user has no sessions in existing storage, provide demo sessions
    if (userSessions.length === 0 && (userId === '101010' || userId === '202020')) {
      const initial = generateInitialDemoHistory(userId);
      const combined = [...initial, ...history];
      localStorage.setItem(EXAM_HISTORY_KEY, JSON.stringify(combined.slice(0, 100)));
      return initial;
    }
    return userSessions;
  } catch {
    return [];
  }
}
