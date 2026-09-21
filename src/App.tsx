import React, { useState, useEffect } from 'react';
import { User, ExamSession, Question } from './types';
import { getCurrentUser, setCurrentUser } from './utils/userStore';
import { questionBank } from './data/questionBank';
import { FCTA_CADRES } from './data/fctaData';
import { getDifficultyTier } from './data/difficultyLevels';
import { Navbar } from './components/Navbar';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { ExamEngine } from './components/ExamEngine';
import { LearningHub } from './components/LearningHub';
import { BrowseQuestions } from './components/BrowseQuestions';
import { DirectoryView } from './components/DirectoryView';
import { ScreenRecognitionProvider, useScreen } from './context/ScreenRecognitionContext';
import { ScreenRecognitionToast } from './components/ScreenRecognitionToast';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function PortalRoot() {
  const [currentUser, setUser] = useState<User | null>(() => getCurrentUser());
  const [currentView, setCurrentView] = useState<'dashboard' | 'exam' | 'learning' | 'browse' | 'directory'>('dashboard');
  const [activeSession, setActiveSession] = useState<ExamSession | null>(null);
  const { deviceType, isForced, forcedMode, width, setForcedMode } = useScreen();
  const { isNavyWhite } = useTheme();

  // Keep stored user updated
  const handleLoginSuccess = (user: User) => {
    setUser(user);
    setCurrentUser(user);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentUser(null);
    setActiveSession(null);
    setCurrentView('dashboard');
  };

  // Launch an Exam Session
  const handleStartExam = (config: {
    title: string;
    category: string;
    chapterNumber?: number;
    totalQuestions: number;
    timeLimitMinutes: number;
    questions: Question[];
    mode: 'exam' | 'practice';
  }) => {
    if (!currentUser) return;

    const newSession: ExamSession = {
      id: `session_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      userId: currentUser.id,
      title: config.title,
      category: config.category,
      chapterNumber: config.chapterNumber,
      totalQuestions: config.questions.length,
      timeLimitMinutes: config.timeLimitMinutes,
      startedAt: Date.now(),
      status: 'in_progress',
      mode: config.mode,
      questions: config.questions,
      userAnswers: {},
      flaggedQuestions: [],
    };

    setActiveSession(newSession);
    setCurrentView('exam');
  };

  // Launch a 10-question practice drill from Learning Hub or Chapters
  const handleStartChapterPractice = (subject: 'psr' | 'fr' | 'ppa', chapterNumber: number, title: string) => {
    if (!currentUser) return;

    const questions = questionBank.getQuestionsByChapter(subject, chapterNumber);
    handleStartExam({
      title: `${subject.toUpperCase()} Chapter ${chapterNumber}: ${title}`,
      category: subject,
      chapterNumber,
      totalQuestions: questions.length,
      timeLimitMinutes: 15,
      questions,
      mode: 'practice',
    });
  };

  // Retake exam session (Rewrite the same questions)
  const handleRetakeSession = (session: ExamSession) => {
    const refreshed: ExamSession = {
      ...session,
      id: `session_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      startedAt: Date.now(),
      submittedAt: undefined,
      userAnswers: {},
      flaggedQuestions: [],
      score: undefined,
      percentage: undefined,
      status: 'in_progress',
    };
    setActiveSession(refreshed);
    setCurrentView('exam');
  };

  // Generate a fresh exam session calibrated at Level 3 Difficulty (Directorate Standard: GL 14 - GL 16)
  const handleGenerateNewExamSession = (session: ExamSession, difficultyLevel: number = 3) => {
    const totalQ = session.totalQuestions || session.questions.length || 60;
    const previousIds = session.questions.map((q) => q.id);

    // Match cadre id from user cadre title or id
    const matchedCadre = FCTA_CADRES.find(
      (c) => c.name.toLowerCase() === currentUser?.cadre?.toLowerCase() || c.id === currentUser?.cadre
    );
    const cadreId = matchedCadre ? matchedCadre.id : 'cadre_admin';

    // Fetch fresh Level 3 questions excluding the previous questions
    const newQuestions = questionBank.generateLevel3Questions({
      category: session.category,
      cadreId,
      count: totalQ,
      excludeIds: previousIds,
    });

    const diffTier = getDifficultyTier(difficultyLevel);

    const cleanBaseTitle = session.title.replace(/\[Level \d.*?\]/g, '').trim();

    const newSession: ExamSession = {
      id: `session_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      userId: currentUser?.id || 'candidate_user',
      title: `${cleanBaseTitle} [${diffTier.badgeLabel}]`,
      category: session.category,
      chapterNumber: session.chapterNumber,
      totalQuestions: newQuestions.length,
      timeLimitMinutes: session.timeLimitMinutes,
      questions: newQuestions,
      userAnswers: {},
      flaggedQuestions: [],
      startedAt: Date.now(),
      status: 'in_progress',
      mode: session.mode,
      difficultyLevel,
      difficultyLabel: diffTier.badgeLabel,
    };

    setActiveSession(newSession);
    setCurrentView('exam');
  };

  // Review a past exam session
  const handleReviewPastSession = (session: ExamSession) => {
    setActiveSession(session);
    setCurrentView('exam');
  };

  const simulationContainerClass = isForced && forcedMode === 'mobile'
    ? `max-w-md mx-auto shadow-2xl border-x min-h-screen ${isNavyWhite ? 'bg-white border-blue-200 text-slate-800' : 'bg-slate-900 border-slate-800 text-slate-100'}`
    : isForced && forcedMode === 'tablet'
    ? `max-w-3xl mx-auto shadow-2xl border-x min-h-screen ${isNavyWhite ? 'bg-white border-blue-200 text-slate-800' : 'bg-slate-900 border-slate-800 text-slate-100'}`
    : `min-h-screen flex flex-col font-sans ${isNavyWhite ? 'bg-[#f4f7fb] text-slate-800' : 'bg-[#07152b] text-slate-100'}`;

  const bgThemeClass = isNavyWhite ? 'bg-[#f4f7fb] text-slate-900' : 'bg-[#07152b] text-slate-100';
  const forcedBgClass = isNavyWhite ? 'bg-slate-200' : 'bg-slate-950';

  // If user is not logged in, show the comprehensive Login and Registration Portal
  if (!currentUser) {
    return (
      <div className={isForced ? `${forcedBgClass} min-h-screen py-4` : `min-h-screen ${bgThemeClass}`}>
        {isForced && (
          <div className="max-w-4xl mx-auto mb-2 px-4 py-1 rounded-lg bg-blue-900/30 border border-blue-600/40 text-center text-xs text-blue-300 flex items-center justify-between">
            <span>Simulated Screen: <strong className="capitalize">{forcedMode}</strong> ({forcedMode === 'mobile' ? '390px' : '768px'})</span>
            <button onClick={() => setForcedMode('auto')} className="underline text-blue-200 hover:text-white font-bold cursor-pointer">
              Restore Hardware Auto-Detection
            </button>
          </div>
        )}
        <div className={simulationContainerClass}>
          <Navbar
            currentUser={null}
            currentView="dashboard"
            onNavigate={() => {}}
            onLogout={() => {}}
          />
          <main className="flex-1">
            <LoginPage onLoginSuccess={handleLoginSuccess} />
          </main>
          <footer className={`border-t text-xs py-6 text-center ${
            isNavyWhite 
              ? 'bg-white border-blue-100 text-slate-600' 
              : 'bg-[#07152b] border-blue-900 text-blue-200'
          }`}>
            <div className="max-w-7xl mx-auto px-4 space-y-1">
              <p className={`font-bold ${isNavyWhite ? 'text-blue-950' : 'text-white'}`}>
                thesanturakiyauri cbtportal • Federal Capital Territory Administration (FCTA) Staff CBT Portal
              </p>
              <p className={isNavyWhite ? 'text-slate-500' : 'text-blue-300/80'}>
                Auto Screen Recognition (Desktop, Tablet, Mobile) • Includes 3,600 Examination Questions with Voice Reader
              </p>
            </div>
          </footer>
        </div>
      </div>
    );
  }

  // If user is in an active exam
  if (currentView === 'exam' && activeSession) {
    return (
      <div className={isForced ? `${forcedBgClass} min-h-screen py-4` : `min-h-screen ${bgThemeClass}`}>
        {isForced && (
          <div className="max-w-4xl mx-auto mb-2 px-4 py-1 rounded-lg bg-blue-900/30 border border-blue-600/40 text-center text-xs text-blue-300 flex items-center justify-between">
            <span>Simulated CBT View: <strong className="capitalize">{forcedMode}</strong></span>
            <button onClick={() => setForcedMode('auto')} className="underline text-blue-200 hover:text-white font-bold cursor-pointer">
              Restore Hardware Auto-Detection
            </button>
          </div>
        )}
        <div className={simulationContainerClass}>
          <ExamEngine
            user={currentUser}
            session={activeSession}
            onExit={() => {
              setActiveSession(null);
              setCurrentView('dashboard');
            }}
            onRetake={handleRetakeSession}
            onGenerateNewExam={handleGenerateNewExamSession}
          />
        </div>
      </div>
    );
  }

  // Normal Portal Views (with Navbar and Footer)
  return (
    <div className={isForced ? `${forcedBgClass} min-h-screen py-4` : `min-h-screen ${bgThemeClass}`}>
      {isForced && (
        <div className="max-w-4xl mx-auto mb-2 px-4 py-1 rounded-lg bg-blue-900/30 border border-blue-600/40 text-center text-xs text-blue-300 flex items-center justify-between">
          <span>Simulated Screen View: <strong className="capitalize">{forcedMode}</strong></span>
          <button onClick={() => setForcedMode('auto')} className="underline text-blue-200 hover:text-white font-bold cursor-pointer">
            Restore Hardware Auto-Detection
          </button>
        </div>
      )}
      <div className={simulationContainerClass}>
        <Navbar
          currentUser={currentUser}
          currentView={currentView}
          onNavigate={(view) => setCurrentView(view)}
          onLogout={handleLogout}
        />

        <main className="flex-1">
          {currentView === 'dashboard' && (
            <Dashboard
              user={currentUser}
              onStartExam={handleStartExam}
              onNavigate={(view) => setCurrentView(view)}
              onReviewPastSession={handleReviewPastSession}
            />
          )}

          {currentView === 'learning' && (
            <LearningHub
              onStartChapterPractice={handleStartChapterPractice}
            />
          )}

          {currentView === 'browse' && (
            <BrowseQuestions />
          )}

          {currentView === 'directory' && (
            <DirectoryView />
          )}
        </main>

        <footer className={`border-t text-xs py-6 text-center ${
          isNavyWhite 
            ? 'bg-white border-blue-100 text-slate-600' 
            : 'bg-[#07152b] border-blue-900 text-blue-200'
        }`}>
          <div className="max-w-7xl mx-auto px-4 space-y-1">
            <p className={`font-bold ${isNavyWhite ? 'text-blue-950' : 'text-white'}`}>
              thesanturakiyauri cbtportal • Federal Capital Territory Administration (FCTA)
            </p>
            <p className={isNavyWhite ? 'text-slate-500' : 'text-blue-300/80'}>
              Auto Screen Recognition (Desktop, Tablet, Mobile) • GL 07 to GL 16 Syllabus • 3,600 Questions with Audio Voice Reader
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ScreenRecognitionProvider>
        <PortalRoot />
        <ScreenRecognitionToast />
      </ScreenRecognitionProvider>
    </ThemeProvider>
  );
}
