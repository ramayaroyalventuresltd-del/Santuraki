import { User, ExamSession } from '../types';
import { INITIAL_DEMO_USERS } from '../data/fctaData';
import { generateInitialDemoHistory } from '../data/demoExamHistory';

const USERS_STORAGE_KEY = 'thesanturakiyauri_cbt_users_v1';
const CURRENT_USER_KEY = 'thesanturakiyauri_cbt_current_user_v1';
const EXAM_HISTORY_KEY = 'thesanturakiyauri_cbt_history_v1';
const REMIND_DETAILS_KEY = 'thesanturakiyauri_remind_me_v1';
const TIER_OVERRIDE_KEY = 'thesanturakiyauri_tier_override_v1';
const ADMIN_AUTH_KEY = 'thesanturakiyauri_admin_auth_v2';

export interface AdminAuthData {
  username: string;
  passwordHash: string;
  mustChangePassword: boolean;
  lastLogin?: string;
}

// -------------------------------------------------------------
// USER MANAGEMENT
// -------------------------------------------------------------

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

// -------------------------------------------------------------
// REMIND MY DETAILS (LOGIN HELPER)
// -------------------------------------------------------------

export interface RemindDetails {
  staffId: string;
  fullName?: string;
  savedAt: string;
}

export function getRemindDetails(): RemindDetails | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(REMIND_DETAILS_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveRemindDetails(staffId: string, fullName?: string, remember: boolean = true) {
  if (typeof window === 'undefined') return;
  if (!remember) {
    localStorage.removeItem(REMIND_DETAILS_KEY);
    return;
  }
  const data: RemindDetails = {
    staffId: staffId.trim(),
    fullName: fullName?.trim(),
    savedAt: new Date().toISOString(),
  };
  localStorage.setItem(REMIND_DETAILS_KEY, JSON.stringify(data));
}

export function clearRemindDetails() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(REMIND_DETAILS_KEY);
}

export function findStaffIdByNameOrContact(query: string): User[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const users = getStoredUsers();
  return users.filter(
    (u) =>
      u.fullName.toLowerCase().includes(q) ||
      (u.email && u.email.toLowerCase().includes(q)) ||
      (u.phone && u.phone.includes(q)) ||
      u.username === q
  );
}

// -------------------------------------------------------------
// TIER UNLOCK PROGRESSION (60% PASS MARK BENCHMARK)
// -------------------------------------------------------------

export interface UserTierProgress {
  tier1: boolean; // Always unlocked
  tier2: boolean; // Unlocked if Tier 1 score >= 60%
  tier3: boolean; // Unlocked if Tier 2 score >= 60%
  tier4: boolean; // Unlocked if Tier 3 score >= 60%
  tier1Best: number;
  tier2Best: number;
  tier3Best: number;
  tier4Best: number;
  tier1Attempts: number;
  tier2Attempts: number;
  tier3Attempts: number;
  tier4Attempts: number;
  hasPassedTier1: boolean;
  hasPassedTier2: boolean;
  hasPassedTier3: boolean;
}

export function getUserTierProgress(userId: string): UserTierProgress {
  const defaultProgress: UserTierProgress = {
    tier1: true,
    tier2: false,
    tier3: false,
    tier4: false,
    tier1Best: 0,
    tier2Best: 0,
    tier3Best: 0,
    tier4Best: 0,
    tier1Attempts: 0,
    tier2Attempts: 0,
    tier3Attempts: 0,
    tier4Attempts: 0,
    hasPassedTier1: false,
    hasPassedTier2: false,
    hasPassedTier3: false,
  };

  if (!userId) return defaultProgress;

  // Retrieve user exam history
  const history = getUserExamHistory(userId);

  // Compute best percentages per tier
  history.forEach((session) => {
    if (session.status !== 'completed' && session.score === undefined) return;
    const pct = session.percentage ?? (session.score && session.totalQuestions ? Math.round((session.score / session.totalQuestions) * 100) : 0);

    const isTier1 = session.category === 'tier_1_exam' || session.difficultyLevel === 1 || session.title.includes('Tier 1');
    const isTier2 = session.category === 'tier_2_exam' || session.difficultyLevel === 2 || session.title.includes('Tier 2');
    const isTier3 = session.category === 'tier_3_exam' || session.difficultyLevel === 3 || session.title.includes('Tier 3');
    const isTier4 = session.category === 'tier_4_exam' || session.difficultyLevel === 4 || session.title.includes('Tier 4');

    if (isTier1) {
      defaultProgress.tier1Attempts += 1;
      if (pct > defaultProgress.tier1Best) defaultProgress.tier1Best = pct;
    } else if (isTier2) {
      defaultProgress.tier2Attempts += 1;
      if (pct > defaultProgress.tier2Best) defaultProgress.tier2Best = pct;
    } else if (isTier3) {
      defaultProgress.tier3Attempts += 1;
      if (pct > defaultProgress.tier3Best) defaultProgress.tier3Best = pct;
    } else if (isTier4) {
      defaultProgress.tier4Attempts += 1;
      if (pct > defaultProgress.tier4Best) defaultProgress.tier4Best = pct;
    }
  });

  defaultProgress.hasPassedTier1 = defaultProgress.tier1Best >= 60;
  defaultProgress.hasPassedTier2 = defaultProgress.tier2Best >= 60;
  defaultProgress.hasPassedTier3 = defaultProgress.tier3Best >= 60;

  // Progression logic: 60% unlocks the next tier
  defaultProgress.tier2 = defaultProgress.hasPassedTier1;
  defaultProgress.tier3 = defaultProgress.tier2 && defaultProgress.hasPassedTier2;
  defaultProgress.tier4 = defaultProgress.tier3 && defaultProgress.hasPassedTier3;

  // Apply any manual Admin overrides stored in localStorage
  try {
    const rawOverrides = localStorage.getItem(TIER_OVERRIDE_KEY);
    if (rawOverrides) {
      const overrides = JSON.parse(rawOverrides);
      if (overrides[userId]) {
        if (overrides[userId].tier2 !== undefined) defaultProgress.tier2 = overrides[userId].tier2;
        if (overrides[userId].tier3 !== undefined) defaultProgress.tier3 = overrides[userId].tier3;
        if (overrides[userId].tier4 !== undefined) defaultProgress.tier4 = overrides[userId].tier4;
      }
    }
  } catch (e) {
    console.error('Failed to read tier overrides', e);
  }

  return defaultProgress;
}

export function adminSetTierOverride(userId: string, tier: 2 | 3 | 4, unlocked: boolean) {
  if (typeof window === 'undefined') return;
  try {
    const rawOverrides = localStorage.getItem(TIER_OVERRIDE_KEY);
    const overrides = rawOverrides ? JSON.parse(rawOverrides) : {};
    if (!overrides[userId]) overrides[userId] = {};
    overrides[userId][`tier${tier}`] = unlocked;
    localStorage.setItem(TIER_OVERRIDE_KEY, JSON.stringify(overrides));
  } catch (e) {
    console.error('Failed to save tier override', e);
  }
}

export function getUserTierUsedQuestionIds(userId: string): Set<string> {
  const history = getUserExamHistory(userId);
  const used = new Set<string>();
  history.forEach((sess) => {
    if (sess.category.startsWith('tier_') || sess.title.includes('Tier ') || (sess.difficultyLevel && sess.difficultyLevel >= 1 && sess.difficultyLevel <= 4)) {
      if (sess.questions) {
        sess.questions.forEach((q) => {
          if (q && q.id) used.add(q.id);
        });
      }
    }
  });
  return used;
}

// -------------------------------------------------------------
// SUPER ADMINISTRATOR & ADMIN AUTHENTICATION
// -------------------------------------------------------------

export function getAdminAuth(): AdminAuthData {
  const defaultAdmin: AdminAuthData = {
    username: 'sysadmin',
    passwordHash: '123456',
    mustChangePassword: true,
  };

  if (typeof window === 'undefined') return defaultAdmin;
  try {
    const raw = localStorage.getItem(ADMIN_AUTH_KEY);
    if (!raw) {
      localStorage.setItem(ADMIN_AUTH_KEY, JSON.stringify(defaultAdmin));
      return defaultAdmin;
    }
    return JSON.parse(raw);
  } catch {
    return defaultAdmin;
  }
}

export function validateAdminLogin(usernameInput: string, passwordInput: string): {
  success: boolean;
  message: string;
  mustChangePassword?: boolean;
} {
  const auth = getAdminAuth();
  if (usernameInput.trim().toLowerCase() !== auth.username.toLowerCase()) {
    return { success: false, message: 'Invalid administrator username.' };
  }

  if (passwordInput !== auth.passwordHash) {
    return { success: false, message: 'Invalid administrator password.' };
  }

  // Record login timestamp
  auth.lastLogin = new Date().toISOString();
  localStorage.setItem(ADMIN_AUTH_KEY, JSON.stringify(auth));

  return {
    success: true,
    message: 'Admin authentication successful.',
    mustChangePassword: auth.mustChangePassword,
  };
}

export function changeAdminPassword(newPassword: string): { success: boolean; message: string } {
  if (!newPassword || newPassword.trim().length < 6) {
    return { success: false, message: 'New password must be at least 6 characters long.' };
  }
  if (newPassword.trim() === '123456') {
    return { success: false, message: 'You must choose a new secure password different from the initial default password (123456).' };
  }

  const auth = getAdminAuth();
  auth.passwordHash = newPassword.trim();
  auth.mustChangePassword = false;
  localStorage.setItem(ADMIN_AUTH_KEY, JSON.stringify(auth));
  return { success: true, message: 'Administrator password changed successfully.' };
}

// -------------------------------------------------------------
// ADMIN USER ACTIONS
// -------------------------------------------------------------

export function adminUpdateUser(updatedUser: User): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const users = getStoredUsers();
    const idx = users.findIndex((u) => u.id === updatedUser.id || u.username === updatedUser.username);
    if (idx >= 0) {
      users[idx] = updatedUser;
    } else {
      users.push(updatedUser);
    }
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    return true;
  } catch {
    return false;
  }
}

export function adminDeleteUser(userId: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const users = getStoredUsers();
    const filtered = users.filter((u) => u.id !== userId && u.username !== userId);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch {
    return false;
  }
}

export function adminAddUser(user: User): boolean {
  return adminUpdateUser(user);
}

export function getAllSystemExamSessions(): ExamSession[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(EXAM_HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// -------------------------------------------------------------
// EXAM SESSION STORAGE
// -------------------------------------------------------------

export function saveExamSession(session: ExamSession) {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(EXAM_HISTORY_KEY);
    const history: ExamSession[] = raw ? JSON.parse(raw) : [];
    const idx = history.findIndex((h) => h.id === session.id);
    if (idx >= 0) {
      history[idx] = session;
    } else {
      history.unshift(session);
    }
    localStorage.setItem(EXAM_HISTORY_KEY, JSON.stringify(history.slice(0, 300)));
  } catch (e) {
    console.error('Failed to save exam session', e);
  }
}

export function getUserExamHistory(userId: string): ExamSession[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(EXAM_HISTORY_KEY);
    if (!raw) {
      const initialHistory = generateInitialDemoHistory(userId);
      if (initialHistory.length > 0) {
        localStorage.setItem(EXAM_HISTORY_KEY, JSON.stringify(initialHistory));
        return initialHistory;
      }
      return [];
    }
    const history: ExamSession[] = JSON.parse(raw);
    const userSessions = history.filter((h) => h.userId === userId);
    if (userSessions.length === 0 && (userId === '101010' || userId === '202020')) {
      const initial = generateInitialDemoHistory(userId);
      const combined = [...initial, ...history];
      localStorage.setItem(EXAM_HISTORY_KEY, JSON.stringify(combined.slice(0, 300)));
      return initial;
    }
    return userSessions;
  } catch {
    return [];
  }
}

export function getUserAnsweredCount(userId: string): number {
  const sessions = getUserExamHistory(userId);
  const seenIds = new Set<string>();
  sessions.forEach((s) => {
    if (s.questions) {
      s.questions.forEach((q) => {
        if (q && q.id) seenIds.add(q.id);
      });
    }
  });
  return seenIds.size;
}

export interface ExamPreferences {
  autoAdvanceOnSelect: boolean;
  timerAlertFiveMinutes: boolean;
  fontSize: 'standard' | 'large';
}

const EXAM_PREFS_KEY = 'thesanturakiyauri_cbt_exam_prefs_v1';

export const DEFAULT_EXAM_PREFS: ExamPreferences = {
  autoAdvanceOnSelect: false,
  timerAlertFiveMinutes: true,
  fontSize: 'standard',
};

export function getExamPreferences(): ExamPreferences {
  if (typeof window === 'undefined') return DEFAULT_EXAM_PREFS;
  try {
    const raw = localStorage.getItem(EXAM_PREFS_KEY);
    if (!raw) return DEFAULT_EXAM_PREFS;
    return { ...DEFAULT_EXAM_PREFS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_EXAM_PREFS;
  }
}

export function saveExamPreferences(prefs: ExamPreferences) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(EXAM_PREFS_KEY, JSON.stringify(prefs));
}

export function resetExamHistory(userId?: string) {
  if (typeof window === 'undefined') return;
  if (userId) {
    const raw = localStorage.getItem(EXAM_HISTORY_KEY);
    if (raw) {
      try {
        const history: ExamSession[] = JSON.parse(raw);
        const filtered = history.filter((h) => h.userId !== userId);
        const initial = generateInitialDemoHistory(userId);
        localStorage.setItem(EXAM_HISTORY_KEY, JSON.stringify([...initial, ...filtered]));
      } catch {
        localStorage.removeItem(EXAM_HISTORY_KEY);
      }
    }
  } else {
    localStorage.removeItem(EXAM_HISTORY_KEY);
  }
}

export function factoryResetPortalData() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(EXAM_HISTORY_KEY);
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_USERS));
  localStorage.removeItem(EXAM_PREFS_KEY);
  localStorage.removeItem(REMIND_DETAILS_KEY);
  localStorage.removeItem(TIER_OVERRIDE_KEY);
  localStorage.removeItem(ADMIN_AUTH_KEY);
  localStorage.removeItem('thesanturakiyauri_screen_mode');
  localStorage.removeItem('fcta_portal_theme');
}
