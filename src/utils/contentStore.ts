import { Question } from '../types';
import { questionBank } from '../data/questionBank';

export interface PortalAnnouncement {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'alert' | 'urgent' | 'success';
  targetTiers?: string; // e.g. "All Tiers", "Tier 1", "Tier 2-4"
  date: string;
  isActive: boolean;
  author: string;
}

export interface CustomChapterContent {
  category: 'psr' | 'fr' | 'ppa' | 'fct_gk';
  chapterNumber: number;
  customTitle?: string;
  customOverview?: string;
  customReferenceRule?: string;
  updatedAt: string;
}

export interface CustomCadreContent {
  cadreId: string;
  customDescription?: string;
  updatedAt: string;
}

const ANNOUNCEMENTS_KEY = 'thesanturakiyauri_portal_announcements_v1';
const CUSTOM_QUESTIONS_KEY = 'thesanturakiyauri_custom_questions_v1';
const CHAPTER_CONTENT_KEY = 'thesanturakiyauri_chapter_content_v1';
const CADRE_CONTENT_KEY = 'thesanturakiyauri_cadre_content_v1';

// Initial civil service announcements
export const INITIAL_ANNOUNCEMENTS: PortalAnnouncement[] = [
  {
    id: 'ann_01',
    title: 'Statutory 60% Pass Mark Enforcement for Promotion Tiers',
    content: 'Per FCTA Civil Service Commission guidelines, candidates must score at least 60% in Tier 1 to unlock Tier 2; 60% in Tier 2 to unlock Tier 3; and 60% in Tier 3 to unlock Tier 4. Each tier examination contains strictly 75 questions.',
    type: 'alert',
    targetTiers: 'Tiers 1 to 4',
    date: '2026-10-01',
    isActive: true,
    author: 'sysadmin',
  },
  {
    id: 'ann_02',
    title: '23 Professional Cadres Fully Integrated in CBT Syllabus',
    content: 'All 23 FCTA Professional Cadres (Administration, Finance, Procurement, Engineering, Lands, Town Planning, Surveying, ICT, Education, Health, and more) have customized questions aligned with statutory Grade Levels 03 to 16.',
    type: 'info',
    targetTiers: 'All Candidates',
    date: '2026-09-28',
    isActive: true,
    author: 'sysadmin',
  },
  {
    id: 'ann_03',
    title: 'Audio Voice Question Reader Active',
    content: 'Candidates can toggle the integrated Voice Question Reader to have questions, answer choices, and statutory references read aloud in standard Nigerian English.',
    type: 'success',
    targetTiers: 'All Candidates',
    date: '2026-09-20',
    isActive: true,
    author: 'sysadmin',
  },
];

// -------------------------------------------------------------
// ANNOUNCEMENTS CMS
// -------------------------------------------------------------

export function getAnnouncements(): PortalAnnouncement[] {
  if (typeof window === 'undefined') return INITIAL_ANNOUNCEMENTS;
  try {
    const raw = localStorage.getItem(ANNOUNCEMENTS_KEY);
    if (!raw) {
      localStorage.setItem(ANNOUNCEMENTS_KEY, JSON.stringify(INITIAL_ANNOUNCEMENTS));
      return INITIAL_ANNOUNCEMENTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_ANNOUNCEMENTS;
  } catch {
    return INITIAL_ANNOUNCEMENTS;
  }
}

export function saveAnnouncement(ann: PortalAnnouncement): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const list = getAnnouncements();
    const idx = list.findIndex((a) => a.id === ann.id);
    if (idx >= 0) {
      list[idx] = ann;
    } else {
      list.unshift(ann);
    }
    localStorage.setItem(ANNOUNCEMENTS_KEY, JSON.stringify(list));
    return true;
  } catch {
    return false;
  }
}

export function deleteAnnouncement(id: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const list = getAnnouncements();
    const filtered = list.filter((a) => a.id !== id);
    localStorage.setItem(ANNOUNCEMENTS_KEY, JSON.stringify(filtered));
    return true;
  } catch {
    return false;
  }
}

export function toggleAnnouncement(id: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const list = getAnnouncements();
    const item = list.find((a) => a.id === id);
    if (item) {
      item.isActive = !item.isActive;
      localStorage.setItem(ANNOUNCEMENTS_KEY, JSON.stringify(list));
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

// -------------------------------------------------------------
// CUSTOM QUESTIONS CMS
// -------------------------------------------------------------

export function getCustomQuestions(): Question[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CUSTOM_QUESTIONS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveCustomQuestion(q: Question): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const list = getCustomQuestions();
    const idx = list.findIndex((item) => item.id === q.id);
    if (idx >= 0) {
      list[idx] = q;
    } else {
      list.unshift(q);
    }
    localStorage.setItem(CUSTOM_QUESTIONS_KEY, JSON.stringify(list));

    // Also register into questionBank runtime cache
    try {
      const categoryList = questionBank.getQuestionsByCategory(q.category);
      const catIdx = categoryList.findIndex((item) => item.id === q.id);
      if (catIdx >= 0) {
        categoryList[catIdx] = q;
      } else {
        categoryList.unshift(q);
      }
    } catch (e) {
      console.warn('Could not inject into questionBank cache', e);
    }

    return true;
  } catch {
    return false;
  }
}

export function deleteCustomQuestion(id: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const list = getCustomQuestions();
    const filtered = list.filter((item) => item.id !== id);
    localStorage.setItem(CUSTOM_QUESTIONS_KEY, JSON.stringify(filtered));
    return true;
  } catch {
    return false;
  }
}

// -------------------------------------------------------------
// CHAPTER CONTENT CMS
// -------------------------------------------------------------

export function getCustomChapterContents(): CustomChapterContent[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CHAPTER_CONTENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCustomChapterContent(content: CustomChapterContent): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const list = getCustomChapterContents();
    const idx = list.findIndex(
      (c) => c.category === content.category && c.chapterNumber === content.chapterNumber
    );
    if (idx >= 0) {
      list[idx] = content;
    } else {
      list.push(content);
    }
    localStorage.setItem(CHAPTER_CONTENT_KEY, JSON.stringify(list));
    return true;
  } catch {
    return false;
  }
}

// -------------------------------------------------------------
// CADRE CONTENT CMS
// -------------------------------------------------------------

export function getCustomCadreContents(): CustomCadreContent[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CADRE_CONTENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCustomCadreContent(content: CustomCadreContent): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const list = getCustomCadreContents();
    const idx = list.findIndex((c) => c.cadreId === content.cadreId);
    if (idx >= 0) {
      list[idx] = content;
    } else {
      list.push(content);
    }
    localStorage.setItem(CADRE_CONTENT_KEY, JSON.stringify(list));
    return true;
  } catch {
    return false;
  }
}
