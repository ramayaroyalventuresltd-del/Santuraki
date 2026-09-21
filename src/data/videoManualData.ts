export interface VideoChapter {
  id: string;
  chapterNumber: number;
  title: string;
  shortTitle: string;
  startTimeSeconds: number;
  endTimeSeconds: number;
  durationLabel: string;
  badgeLabel: string;
  summary: string;
  narrationScript: string;
  takeaways: string[];
  mockupType: 'auth' | 'builder' | 'exam' | 'accessibility' | 'goal' | 'advisor';
  actionTarget?: 'builder' | 'learning' | 'browse' | 'directory';
}

export const VIDEO_TOTAL_DURATION_SECONDS = 480; // 8 minutes total

export const VIDEO_MANUAL_CHAPTERS: VideoChapter[] = [
  {
    id: 'ch1',
    chapterNumber: 1,
    title: 'Candidate Authentication & Profile Verification',
    shortTitle: 'Login & Verification',
    startTimeSeconds: 0,
    endTimeSeconds: 75,
    durationLabel: '01:15',
    badgeLabel: 'GL 07 - GL 16 Access',
    summary: 'How to authenticate using your designated 6-digit Candidate ID and password. Verifying cadre assignment, Service Delivery Area (SDA), and grade level promotion eligibility.',
    narrationScript: 'Welcome to the official FCTA Civil Service CBT Mock Examination Portal. To begin, authenticate using your allocated 6-digit Staff Identification Number as both your username and initial password. Once logged in, verify your full name, Service Delivery Area, Professional Cadre, and Grade Level. The portal automatically aligns questions to your official syllabus.',
    takeaways: [
      'Staff ID and initial password are both your exact 6-digit numerical ID (e.g. 101010).',
      'Ensure your designated Cadre matches your department (e.g. Administrative Officer, Accountant, Education Officer).',
      'The portal automatically maps your promotion track to the correct Directorate standard.'
    ],
    mockupType: 'auth'
  },
  {
    id: 'ch2',
    chapterNumber: 2,
    title: 'Customized Examination Setup & Timer Calibration',
    shortTitle: 'Exam Builder & Timing',
    startTimeSeconds: 75,
    endTimeSeconds: 160,
    durationLabel: '01:25',
    badgeLabel: '100 Qs / 45-60 Min',
    summary: 'Calibrating your mock exam across statutory domains: Public Service Rules (PSR), Financial Regulations (FR), Public Procurement Act (PPA), FCT General Knowledge, and Cadre questions.',
    narrationScript: 'The Interactive Examination Workstation allows you to calibrate custom mock exams. By default, the standard FCTA promotion mock consists of 100 questions distributed across 20 PSR, 20 Financial Regulations, 20 Public Procurement Act, 20 FCT General Knowledge, and 20 Cadre-specific questions. You can customize question counts and select 45-minute speed mode or standard 60-minute duration.',
    takeaways: [
      'Standard Preset: 20 PSR + 20 PPA + 20 FR + 20 FCT GK + 20 Cadre = 100 Questions for 60 Minutes.',
      'Speed Mode Preset: 100 Questions in 45 Minutes for intensive pacing drills.',
      'Individual category toggles allow practicing specific subjects in isolation.'
    ],
    mockupType: 'builder',
    actionTarget: 'builder'
  },
  {
    id: 'ch3',
    chapterNumber: 3,
    title: 'CBT Examination Engine & Rapid Keyboard Hotkeys',
    shortTitle: 'CBT Engine & Hotkeys',
    startTimeSeconds: 160,
    endTimeSeconds: 255,
    durationLabel: '01:35',
    badgeLabel: 'Keyboard Shortcuts',
    summary: 'Mastering the test interface: using keyboard keys A, B, C, D to answer without mouse latency, N for next, P for previous, F to flag for review, and C to clear answers.',
    narrationScript: 'During the examination, speed and accuracy are vital. Use physical keyboard shortcuts to navigate: press keys A, B, C, or D to select an answer; press N for next question and P for previous question; press F to flag difficult questions for later review; and press C to clear your selection. Monitor the countdown timer and question palette at the top.',
    takeaways: [
      'Keyboard Keys A, B, C, D: Instantly select corresponding option without reaching for the mouse.',
      'Key N (Next) and Key P (Previous): Rapid sequence progression.',
      'Key F (Flag for Review): Mark uncertain questions with an amber indicator on the palette.',
      'Key C (Clear Answer): Deselect an answer choice if you wish to reconsider.'
    ],
    mockupType: 'exam'
  },
  {
    id: 'ch4',
    chapterNumber: 4,
    title: 'Accessibility & Voice Reader Audio Bar',
    shortTitle: 'Voice Reader Audio',
    startTimeSeconds: 255,
    endTimeSeconds: 330,
    durationLabel: '01:15',
    badgeLabel: 'Audio Accessibility',
    summary: 'How to engage the integrated Voice Reader for continuous text-to-speech audio narration of questions and options, adjusting reading speed and volume.',
    narrationScript: 'For candidates who benefit from auditory learning or visual accessibility, engage the Voice Reader Bar at the top of the exam screen. The portal will narrate the question text and all four options aloud in clear English. You can adjust the speech rate from 0.75x to 1.5x and toggle automatic reading upon advancing to the next question.',
    takeaways: [
      'Listen to questions and options read aloud with clear punctuation and cadence.',
      'Adjust speech playback speed (0.75x slow, 1.0x standard, 1.25x brisk, 1.5x rapid).',
      'Toggle Auto-Read to automatically narrate every question as you step through the exam.'
    ],
    mockupType: 'accessibility'
  },
  {
    id: 'ch5',
    chapterNumber: 5,
    title: 'Daily Study Goal & Streak Discipline Tracker',
    shortTitle: 'Daily Goal & Streak',
    startTimeSeconds: 330,
    endTimeSeconds: 405,
    durationLabel: '01:15',
    badgeLabel: 'Daily Quota & Streaks',
    summary: 'Setting daily questions targets (15, 30, 50, 100 questions), tracking consecutive active study days in local storage, and monitoring your 7-day activity timeline.',
    narrationScript: 'Consistent preparation is the cornerstone of passing the civil service promotion exams. Use the Daily Study Goal widget on your Dashboard to set a daily questions target, such as 30 or 50 questions per day. Your progress updates automatically as you complete exams or quick practice drills. Maintain your daily streak to build long-term retention before exam day.',
    takeaways: [
      'Choose from quick presets (15, 25, 30, 50, 100 Qs) or specify a custom daily target.',
      'Completed mock exams and practice drills automatically credit towards today\'s quota.',
      'Visual 7-day strip displays checkmarks for met goals and warns when a streak is at risk.'
    ],
    mockupType: 'goal'
  },
  {
    id: 'ch6',
    chapterNumber: 6,
    title: 'Post-Exam AI Advisory Agent & Statutory Insights',
    shortTitle: 'AI Advisor & Review',
    startTimeSeconds: 405,
    endTimeSeconds: 480,
    durationLabel: '01:15',
    badgeLabel: 'Directorate Diagnostics',
    summary: 'Interpreting post-exam diagnostics, statutory rule citations (PSR 030301, FR 105, PPA 2007), weak domain breakdowns, and directorate promotion clearance.',
    narrationScript: 'Upon submitting any exam, the Post-Exam Advisor Agent automatically analyzes your performance. It computes your domain breakdown across PSR, Financial Regulations, Procurement, and Cadre, highlighting weak chapters and providing exact statutory references. You can launch instant re-drill sessions targeting only the questions you missed.',
    takeaways: [
      '60% Standard Pass Mark: Official FCTA promotion clearance benchmark.',
      'Statutory References: Review codified rules explaining why an option was correct.',
      'Re-drill Missed Questions: Reinforce weak areas immediately with targeted practice sessions.'
    ],
    mockupType: 'advisor'
  }
];

export function formatTimeSeconds(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function getCurrentChapter(currentSeconds: number): VideoChapter {
  const ch = VIDEO_MANUAL_CHAPTERS.find(
    (c) => currentSeconds >= c.startTimeSeconds && currentSeconds < c.endTimeSeconds
  );
  return ch || VIDEO_MANUAL_CHAPTERS[VIDEO_MANUAL_CHAPTERS.length - 1];
}
