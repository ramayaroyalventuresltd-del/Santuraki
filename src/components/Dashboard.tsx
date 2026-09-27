import React, { useState } from 'react';
import { User, ExamSession } from '../types';
import { questionBank } from '../data/questionBank';
import { FCTA_CADRES } from '../data/fctaData';
import { PSR_CHAPTERS, FR_CHAPTERS, PPA_CHAPTERS, FCT_GK_CHAPTERS, getCadreChapters } from '../data/chaptersCatalog';
import { getUserExamHistory } from '../utils/userStore';
import { 
  GraduationCap, 
  Play, 
  BookOpen, 
  Layers, 
  Award, 
  CheckCircle2, 
  ChevronRight, 
  FolderKanban, 
  Briefcase, 
  Calculator, 
  Clock, 
  ShieldCheck, 
  FileText, 
  ListOrdered,
  HelpCircle,
  Building2,
  Sparkles,
  Sliders,
  Check,
  RotateCcw,
  Zap,
  SlidersHorizontal,
  ChevronDown,
  Monitor,
  Tablet,
  Smartphone,
  Video
} from 'lucide-react';
import { useScreen } from '../context/ScreenRecognitionContext';
import { useTheme } from '../context/ThemeContext';
import { ScreenRecognitionBadge } from './ScreenRecognitionBadge';
import { GraphicalProgressSection } from './GraphicalProgressSection';
import { DailyStudyGoal } from './DailyStudyGoal';
import { VideoUserManual } from './VideoUserManual';

interface DashboardProps {
  user: User;
  onStartExam: (sessionConfig: {
    title: string;
    category: string;
    chapterNumber?: number;
    totalQuestions: number;
    timeLimitMinutes: number;
    questions: ReturnType<typeof questionBank.getMixedMockExamQuestions>;
    mode: 'exam' | 'practice';
  }) => void;
  onNavigate: (view: 'learning' | 'browse' | 'directory') => void;
  onReviewPastSession?: (session: ExamSession) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  onStartExam,
  onNavigate,
  onReviewPastSession,
}) => {
  const { isNavyWhite } = useTheme();
  const [isVideoManualModalOpen, setIsVideoManualModalOpen] = useState<boolean>(false);
  // Selected tab for Chapter-by-Chapter drill
  const [selectedDrillDomain, setSelectedDrillDomain] = useState<string>('psr');
  const [drillQuestionCount, setDrillQuestionCount] = useState<number>(10);

  // User Cadre lookup
  const userCadreObj = FCTA_CADRES.find((c) => c.name === user.cadre) || FCTA_CADRES[0];

  // Two-Column Exam Configurator State
  // Default: 20 PSR, 20 PPA, 20 FR, 20 FCT General Knowledge, 20 Cadre (Total: 100 questions)
  const [customPsrCount, setCustomPsrCount] = useState<number>(20);
  const [customPpaCount, setCustomPpaCount] = useState<number>(20);
  const [customFrCount, setCustomFrCount] = useState<number>(20);
  const [customFctCount, setCustomFctCount] = useState<number>(20);
  const [customCadreCount, setCustomCadreCount] = useState<number>(20);
  const [customCadreId, setCustomCadreId] = useState<string>(userCadreObj.id);

  // Category enabled toggles
  const [enabledCats, setEnabledCats] = useState<{
    psr: boolean;
    ppa: boolean;
    fr: boolean;
    fct: boolean;
    cadre: boolean;
  }>({
    psr: true,
    ppa: true,
    fr: true,
    fct: true,
    cadre: true,
  });

  // Time in minutes: default 60 minutes (1 hour), range 45 to 60 minutes
  const [customExamTime, setCustomExamTime] = useState<number>(60);

  // Effective question counts
  const effectivePsr = enabledCats.psr ? customPsrCount : 0;
  const effectivePpa = enabledCats.ppa ? customPpaCount : 0;
  const effectiveFr = enabledCats.fr ? customFrCount : 0;
  const effectiveFct = enabledCats.fct ? customFctCount : 0;
  const effectiveCadre = enabledCats.cadre ? customCadreCount : 0;
  const totalCustomQuestions = effectivePsr + effectivePpa + effectiveFr + effectiveFct + effectiveCadre;

  // Pace: seconds per question
  const secondsPerQuestion = totalCustomQuestions > 0 
    ? Math.round((customExamTime * 60) / totalCustomQuestions) 
    : 0;

  // Launch Custom Exam Handler
  const launchCustomExam = () => {
    if (totalCustomQuestions <= 0) return;

    const questions = questionBank.getCustomMockExamQuestions({
      cadreId: customCadreId,
      psrCount: effectivePsr,
      ppaCount: effectivePpa,
      frCount: effectiveFr,
      fctCount: effectiveFct,
      cadreCount: effectiveCadre,
    });

    const activeCadre = FCTA_CADRES.find((c) => c.id === customCadreId) || userCadreObj;

    onStartExam({
      title: `FCTA Customized Mock Exam (${totalCustomQuestions} Qs • ${customExamTime === 60 ? '1 Hour' : `${customExamTime} Min`})`,
      category: 'custom_mock',
      totalQuestions: questions.length,
      timeLimitMinutes: customExamTime,
      questions,
      mode: 'exam',
    });
  };

  const applyPreset100Standard = () => {
    setCustomPsrCount(20);
    setCustomPpaCount(20);
    setCustomFrCount(20);
    setCustomFctCount(20);
    setCustomCadreCount(20);
    setEnabledCats({ psr: true, ppa: true, fr: true, fct: true, cadre: true });
    setCustomExamTime(60);
  };

  const applyPreset45MinFast = () => {
    setCustomPsrCount(20);
    setCustomPpaCount(20);
    setCustomFrCount(20);
    setCustomFctCount(20);
    setCustomCadreCount(20);
    setEnabledCats({ psr: true, ppa: true, fr: true, fct: true, cadre: true });
    setCustomExamTime(45);
  };

  // User past history
  const pastSessions = getUserExamHistory(user.id);
  const totalExamsTaken = pastSessions.length;
  const avgScore = totalExamsTaken > 0 
    ? Math.round(pastSessions.reduce((acc, s) => acc + (s.percentage || 0), 0) / totalExamsTaken)
    : 0;

  // 1. Launch Mixed Promotion Mock Exam
  const launchFullMockExam = (questionCount: number = 60, timeMinutes: number = 60) => {
    const questions = questionBank.getMixedMockExamQuestions(userCadreObj.id, questionCount);
    onStartExam({
      title: `FCTA Comprehensive Mock Exam (${user.gradeLevel})`,
      category: 'mixed_mock',
      totalQuestions: questionCount,
      timeLimitMinutes: timeMinutes,
      questions,
      mode: 'exam',
    });
  };

  // 2. Launch Subject Category Exam (e.g. PSR 200 or 50 Qs)
  const launchCategoryExam = (category: string, title: string, count: number = 50, timeMinutes: number = 45) => {
    let pool = questionBank.getQuestionsByCategory(category);
    if (count < pool.length) {
      pool = [...pool].sort(() => 0.5 - Math.random()).slice(0, count);
    }
    onStartExam({
      title,
      category,
      totalQuestions: pool.length,
      timeLimitMinutes: timeMinutes,
      questions: pool,
      mode: 'exam',
    });
  };

  // 3. Launch Chapter Drill (Exactly 10 questions for chosen chapter)
  const launchChapterDrill = (category: string, chapterNum: number, chapterTitle: string) => {
    const questions = questionBank.getQuestionsByChapter(category, chapterNum);
    onStartExam({
      title: `${chapterTitle} (10 Questions Drill)`,
      category,
      chapterNumber: chapterNum,
      totalQuestions: questions.length,
      timeLimitMinutes: 15,
      questions,
      mode: 'practice',
    });
  };

  // Get active drill chapter list
  const getDrillChapters = () => {
    if (selectedDrillDomain === 'psr') return PSR_CHAPTERS;
    if (selectedDrillDomain === 'fr') return FR_CHAPTERS;
    if (selectedDrillDomain === 'ppa') return PPA_CHAPTERS;
    if (selectedDrillDomain === 'fct_gk') return FCT_GK_CHAPTERS;
    
    // Cadre chapters
    const cadre = FCTA_CADRES.find((c) => c.id === selectedDrillDomain) || userCadreObj;
    return getCadreChapters(cadre.id, cadre.name);
  };

  // Launch quick module practice drill from Graphical Progress Section
  const handleStartModulePractice = (moduleCategory: string, moduleTitle: string) => {
    launchCategoryExam(moduleCategory, moduleTitle, 15, 20);
  };

  return (
    <div className={`min-h-[calc(100vh-4rem)] py-4 px-3 sm:py-8 sm:px-6 lg:px-8 transition-colors ${
      isNavyWhite ? 'bg-[#f4f7fb] text-slate-800' : 'bg-[#07152b] text-slate-100'
    }`}>
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Candidate Profile Header Card */}
        <div className={`border rounded-3xl p-5 sm:p-8 shadow-2xl relative overflow-hidden transition-all ${
          isNavyWhite 
            ? 'bg-white border-blue-100 text-slate-900 shadow-blue-950/5' 
            : 'bg-gradient-to-r from-slate-800 via-slate-800 to-slate-850 border-slate-700 text-white'
        }`}>
          {/* Subtle decoration accent */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
            <div className="space-y-2 min-w-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                FCTA Civil Service Examination Portal
              </div>
              <h1 className={`text-xl sm:text-3xl font-extrabold truncate ${isNavyWhite ? 'text-[#07152b]' : 'text-white'}`}>
                Welcome, {user.fullName}
              </h1>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
                <span className={`font-mono px-2.5 py-1 rounded-lg border font-bold ${
                  isNavyWhite 
                    ? 'bg-blue-50 border-blue-200 text-blue-900' 
                    : 'bg-slate-900/80 border-slate-700 text-emerald-400'
                }`}>
                  ID: {user.username}
                </span>
                <span className={`font-semibold px-2.5 py-1 rounded-lg border ${
                  isNavyWhite 
                    ? 'bg-amber-50 border-amber-200 text-amber-800' 
                    : 'bg-slate-900/80 border-slate-700 text-amber-400'
                }`}>
                  {user.gradeLevel}
                </span>
                <span className={`px-2.5 py-1 rounded-lg border truncate max-w-[200px] sm:max-w-xs ${
                  isNavyWhite 
                    ? 'bg-slate-100 border-slate-200 text-slate-700' 
                    : 'bg-slate-900/80 border-slate-700 text-slate-300'
                }`}>
                  {user.cadre}
                </span>
                <span className={`px-2.5 py-1 rounded-lg border truncate max-w-[200px] sm:max-w-xs ${
                  isNavyWhite 
                    ? 'bg-slate-50 border-slate-200 text-slate-500' 
                    : 'bg-slate-900/80 border-slate-700 text-slate-400'
                }`}>
                  {user.sda}
                </span>
                <button
                  onClick={() => setIsVideoManualModalOpen(true)}
                  className={`md:hidden px-2.5 py-1 rounded-lg border flex items-center gap-1.5 font-semibold text-xs cursor-pointer ${
                    isNavyWhite
                      ? 'bg-blue-100 text-blue-900 border-blue-300'
                      : 'bg-blue-950/80 text-blue-300 border-blue-700'
                  }`}
                >
                  <Video className="w-3.5 h-3.5 text-blue-500" />
                  <span>Video Manual</span>
                </button>
              </div>
            </div>

            {/* Quick Stat Pill */}
            <div className={`grid grid-cols-3 sm:flex sm:items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-2xl border w-full lg:w-auto ${
              isNavyWhite 
                ? 'bg-blue-50/50 border-blue-100 text-slate-800' 
                : 'bg-slate-900/80 border-slate-700/80 text-slate-200'
            }`}>
              <div className="text-center px-1 sm:px-2">
                <span className={`text-lg sm:text-xl font-bold block ${isNavyWhite ? 'text-blue-900' : 'text-emerald-400'}`}>
                  {totalExamsTaken}
                </span>
                <span className="text-[10px] sm:text-[11px] text-slate-400 uppercase">Tests Taken</span>
              </div>
              <div className={`hidden sm:block h-8 w-[1px] ${isNavyWhite ? 'bg-blue-200' : 'bg-slate-700'}`} />
              <div className="text-center px-1 sm:px-2">
                <span className="text-lg sm:text-xl font-bold text-amber-500 block">{avgScore}%</span>
                <span className="text-[10px] sm:text-[11px] text-slate-400 uppercase">Average</span>
              </div>
              <div className={`hidden sm:block h-8 w-[1px] ${isNavyWhite ? 'bg-blue-200' : 'bg-slate-700'}`} />
              <div className="text-center px-1 sm:px-2">
                <span className={`text-lg sm:text-xl font-bold block ${isNavyWhite ? 'text-slate-900' : 'text-white'}`}>
                  {questionBank.getTotalQuestionsCount().toLocaleString()}
                </span>
                <span className={`text-[10px] sm:text-[11px] uppercase font-semibold ${isNavyWhite ? 'text-blue-700' : 'text-emerald-400'}`}>
                  Total Qs
                </span>
              </div>
              <div className={`h-8 w-[1px] hidden sm:block ${isNavyWhite ? 'bg-blue-200' : 'bg-slate-700'}`} />
              <div className="hidden sm:flex flex-col items-center justify-center px-2">
                <ScreenRecognitionBadge compact />
                <span className="text-[10px] text-slate-400 uppercase mt-1">Screen Mode</span>
              </div>
              <div className={`h-8 w-[1px] hidden md:block ${isNavyWhite ? 'bg-blue-200' : 'bg-slate-700'}`} />
              <button
                id="btn-header-video-manual"
                onClick={() => {
                  const el = document.getElementById('video-user-manual-section');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    setIsVideoManualModalOpen(true);
                  }
                }}
                className={`hidden md:flex flex-col items-center justify-center px-2.5 py-1 rounded-xl transition-all cursor-pointer ${
                  isNavyWhite 
                    ? 'hover:bg-blue-100/70 text-blue-900' 
                    : 'hover:bg-slate-800 text-blue-300'
                }`}
                title="Watch Video User Manual Guide"
              >
                <div className="flex items-center gap-1 font-bold text-xs">
                  <Video className="w-3.5 h-3.5 text-blue-500" />
                  <span>Video Guide</span>
                </div>
                <span className="text-[10px] text-slate-400 uppercase mt-0.5">8 Min Manual</span>
              </button>
            </div>
          </div>
        </div>

        {/* Daily Study Goal & Streak Tracker */}
        <DailyStudyGoal
          user={user}
          onStartExam={onStartExam}
          quickQuestionsPool={questionBank.getAllQuestions()}
          onNavigateToPractice={() => onNavigate('learning')}
        />

        {/* Graphical Progress Analytics Section (Recharts Visualization) */}
        <GraphicalProgressSection
          user={user}
          sessions={pastSessions}
          onStartPracticeModule={handleStartModulePractice}
          onNavigate={onNavigate}
        />

        {/* Video User Manual Guide */}
        <VideoUserManual
          onStartExam={() => {
            document.getElementById('interactive-exam-configurator')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onNavigateToSection={(sectionId) => {
            document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Interactive Dual-Column Examination Workstation */}
        <div id="interactive-exam-configurator" className="bg-slate-800/90 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/80 pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-emerald-500 text-slate-950 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Promotion Examination CBT Builder
                </span>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                  GL 07 – GL 16 Syllabus
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Customized Examination Setup & Timer Calibrator
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Configure your question distribution across the statutory syllabi and calibrate your test duration from 45 minutes to 1 hour.
              </p>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                id="btn-preset-100-std"
                onClick={applyPreset100Standard}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  totalCustomQuestions === 100 && customExamTime === 60 && effectivePsr === 20 && effectivePpa === 20 && effectiveFr === 20 && effectiveFct === 20 && effectiveCadre === 20
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-700/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
                title="Select 20 PSR, 20 PPA, 20 FR, 20 FCT General, and 20 Cadre questions for 1 Hour"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Standard (20 × 5 = 100 Qs • 1 Hr)</span>
              </button>

              <button
                id="btn-preset-45-fast"
                onClick={applyPreset45MinFast}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  totalCustomQuestions === 100 && customExamTime === 45
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-700/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
                title="100 Questions in 45 Minutes Speed Mode"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>45-Min Speed Mode</span>
              </button>

              <button
                id="btn-preset-reset"
                onClick={applyPreset100Standard}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-medium border border-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
                title="Reset to 20 Qs per domain and 60 minutes"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* TWO COLUMNS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* COLUMN 1: Choose List of Questions (7 Cols on LG) */}
            <div id="column-choose-questions" className="lg:col-span-7 bg-slate-900/80 border border-slate-700/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center border border-emerald-500/30">
                    1
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                      <ListOrdered className="w-4 h-4 text-emerald-400" />
                      Choose List of Questions You Want to Answer
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Tailor the question pool across 5 mandatory civil service categories (Default: 20 each = 100 Qs).
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono font-extrabold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-800/80">
                    {totalCustomQuestions} Questions
                  </span>
                </div>
              </div>

              {/* Questions List & Category Controls */}
              <div className="space-y-3">
                {/* 1. Public Service Rules (PSR) */}
                <div className={`p-3.5 rounded-xl border transition-all ${
                  enabledCats.psr 
                    ? 'bg-slate-800/90 border-emerald-500/40 shadow-sm' 
                    : 'bg-slate-800/30 border-slate-800 opacity-60'
                }`}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="chk-psr"
                        checked={enabledCats.psr}
                        onChange={(e) => setEnabledCats(prev => ({ ...prev, psr: e.target.checked }))}
                        className="w-4 h-4 rounded text-emerald-500 bg-slate-900 border-slate-700 focus:ring-emerald-500 cursor-pointer"
                      />
                      <label htmlFor="chk-psr" className="cursor-pointer">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-emerald-400" />
                          <span className="font-bold text-sm text-white">Public Service Rules (PSR)</span>
                          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                            200 Qs Bank
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Appointments, discipline, queries, serious misconduct, leaves, and promotions
                        </p>
                      </label>
                    </div>

                    {/* Question Count Controls */}
                    {enabledCats.psr && (
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg p-0.5">
                          <button
                            type="button"
                            onClick={() => setCustomPsrCount(Math.max(5, customPsrCount - 5))}
                            className="w-6 h-6 rounded text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-bold cursor-pointer"
                            title="Decrease by 5"
                          >
                            -
                          </button>
                          <span className="w-9 text-center font-mono font-bold text-xs text-emerald-400">
                            {customPsrCount}
                          </span>
                          <button
                            type="button"
                            onClick={() => setCustomPsrCount(Math.min(50, customPsrCount + 5))}
                            className="w-6 h-6 rounded text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-bold cursor-pointer"
                            title="Increase by 5"
                          >
                            +
                          </button>
                        </div>
                        <div className="hidden sm:flex items-center gap-1">
                          {[10, 20, 30].map(val => (
                            <button
                              key={val}
                              type="button"
                              onClick={() => setCustomPsrCount(val)}
                              className={`px-1.5 py-0.5 text-[10px] font-mono rounded cursor-pointer ${
                                customPsrCount === val 
                                  ? 'bg-emerald-500 text-slate-950 font-bold' 
                                  : 'bg-slate-800 text-slate-400 hover:text-white'
                              }`}
                            >
                              {val}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Public Procurement Act (PPA) */}
                <div className={`p-3.5 rounded-xl border transition-all ${
                  enabledCats.ppa 
                    ? 'bg-slate-800/90 border-blue-500/40 shadow-sm' 
                    : 'bg-slate-800/30 border-slate-800 opacity-60'
                }`}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="chk-ppa"
                        checked={enabledCats.ppa}
                        onChange={(e) => setEnabledCats(prev => ({ ...prev, ppa: e.target.checked }))}
                        className="w-4 h-4 rounded text-blue-500 bg-slate-900 border-slate-700 focus:ring-blue-500 cursor-pointer"
                      />
                      <label htmlFor="chk-ppa" className="cursor-pointer">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-blue-400" />
                          <span className="font-bold text-sm text-white">Public Procurement Act (PPA 2007)</span>
                          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                            200 Qs Bank
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Tendering, BPP thresholds, bid opening, evaluation, award criteria, and offenses
                        </p>
                      </label>
                    </div>

                    {/* Question Count Controls */}
                    {enabledCats.ppa && (
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg p-0.5">
                          <button
                            type="button"
                            onClick={() => setCustomPpaCount(Math.max(5, customPpaCount - 5))}
                            className="w-6 h-6 rounded text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-bold cursor-pointer"
                            title="Decrease by 5"
                          >
                            -
                          </button>
                          <span className="w-9 text-center font-mono font-bold text-xs text-blue-400">
                            {customPpaCount}
                          </span>
                          <button
                            type="button"
                            onClick={() => setCustomPpaCount(Math.min(50, customPpaCount + 5))}
                            className="w-6 h-6 rounded text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-bold cursor-pointer"
                            title="Increase by 5"
                          >
                            +
                          </button>
                        </div>
                        <div className="hidden sm:flex items-center gap-1">
                          {[10, 20, 30].map(val => (
                            <button
                              key={val}
                              type="button"
                              onClick={() => setCustomPpaCount(val)}
                              className={`px-1.5 py-0.5 text-[10px] font-mono rounded cursor-pointer ${
                                customPpaCount === val 
                                  ? 'bg-blue-500 text-slate-950 font-bold' 
                                  : 'bg-slate-800 text-slate-400 hover:text-white'
                              }`}
                            >
                              {val}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 3. Financial Regulations (FR) */}
                <div className={`p-3.5 rounded-xl border transition-all ${
                  enabledCats.fr 
                    ? 'bg-slate-800/90 border-amber-500/40 shadow-sm' 
                    : 'bg-slate-800/30 border-slate-800 opacity-60'
                }`}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="chk-fr"
                        checked={enabledCats.fr}
                        onChange={(e) => setEnabledCats(prev => ({ ...prev, fr: e.target.checked }))}
                        className="w-4 h-4 rounded text-amber-500 bg-slate-900 border-slate-700 focus:ring-amber-500 cursor-pointer"
                      />
                      <label htmlFor="chk-fr" className="cursor-pointer">
                        <div className="flex items-center gap-2">
                          <Calculator className="w-4 h-4 text-amber-400" />
                          <span className="font-bold text-sm text-white">Financial Regulations (FR)</span>
                          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                            200 Qs Bank
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Authorities for expenditure, warrants, AIEs, vote accounting, store keeping, and audits
                        </p>
                      </label>
                    </div>

                    {/* Question Count Controls */}
                    {enabledCats.fr && (
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg p-0.5">
                          <button
                            type="button"
                            onClick={() => setCustomFrCount(Math.max(5, customFrCount - 5))}
                            className="w-6 h-6 rounded text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-bold cursor-pointer"
                            title="Decrease by 5"
                          >
                            -
                          </button>
                          <span className="w-9 text-center font-mono font-bold text-xs text-amber-400">
                            {customFrCount}
                          </span>
                          <button
                            type="button"
                            onClick={() => setCustomFrCount(Math.min(50, customFrCount + 5))}
                            className="w-6 h-6 rounded text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-bold cursor-pointer"
                            title="Increase by 5"
                          >
                            +
                          </button>
                        </div>
                        <div className="hidden sm:flex items-center gap-1">
                          {[10, 20, 30].map(val => (
                            <button
                              key={val}
                              type="button"
                              onClick={() => setCustomFrCount(val)}
                              className={`px-1.5 py-0.5 text-[10px] font-mono rounded cursor-pointer ${
                                customFrCount === val 
                                  ? 'bg-amber-500 text-slate-950 font-bold' 
                                  : 'bg-slate-800 text-slate-400 hover:text-white'
                              }`}
                            >
                              {val}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 4. FCT General Questions */}
                <div className={`p-3.5 rounded-xl border transition-all ${
                  enabledCats.fct 
                    ? 'bg-slate-800/90 border-purple-500/40 shadow-sm' 
                    : 'bg-slate-800/30 border-slate-800 opacity-60'
                }`}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="chk-fct"
                        checked={enabledCats.fct}
                        onChange={(e) => setEnabledCats(prev => ({ ...prev, fct: e.target.checked }))}
                        className="w-4 h-4 rounded text-purple-500 bg-slate-900 border-slate-700 focus:ring-purple-500 cursor-pointer"
                      />
                      <label htmlFor="chk-fct" className="cursor-pointer">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-purple-400" />
                          <span className="font-bold text-sm text-white">FCT General Questions</span>
                          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                            200 Qs Bank
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          FCT Act (Cap F6), Abuja master plan, 6 Area Councils, SDAs, and minister administration
                        </p>
                      </label>
                    </div>

                    {/* Question Count Controls */}
                    {enabledCats.fct && (
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg p-0.5">
                          <button
                            type="button"
                            onClick={() => setCustomFctCount(Math.max(5, customFctCount - 5))}
                            className="w-6 h-6 rounded text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-bold cursor-pointer"
                            title="Decrease by 5"
                          >
                            -
                          </button>
                          <span className="w-9 text-center font-mono font-bold text-xs text-purple-400">
                            {customFctCount}
                          </span>
                          <button
                            type="button"
                            onClick={() => setCustomFctCount(Math.min(50, customFctCount + 5))}
                            className="w-6 h-6 rounded text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-bold cursor-pointer"
                            title="Increase by 5"
                          >
                            +
                          </button>
                        </div>
                        <div className="hidden sm:flex items-center gap-1">
                          {[10, 20, 30].map(val => (
                            <button
                              key={val}
                              type="button"
                              onClick={() => setCustomFctCount(val)}
                              className={`px-1.5 py-0.5 text-[10px] font-mono rounded cursor-pointer ${
                                customFctCount === val 
                                  ? 'bg-purple-500 text-slate-950 font-bold' 
                                  : 'bg-slate-800 text-slate-400 hover:text-white'
                              }`}
                            >
                              {val}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 5. Cadre Specific Questions */}
                <div className={`p-3.5 rounded-xl border transition-all ${
                  enabledCats.cadre 
                    ? 'bg-slate-800/90 border-rose-500/40 shadow-sm' 
                    : 'bg-slate-800/30 border-slate-800 opacity-60'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start sm:items-center gap-3">
                      <input
                        type="checkbox"
                        id="chk-cadre"
                        checked={enabledCats.cadre}
                        onChange={(e) => setEnabledCats(prev => ({ ...prev, cadre: e.target.checked }))}
                        className="w-4 h-4 mt-0.5 sm:mt-0 rounded text-rose-500 bg-slate-900 border-slate-700 focus:ring-rose-500 cursor-pointer"
                      />
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <Briefcase className="w-4 h-4 text-rose-400" />
                          <span className="font-bold text-sm text-white">Professional Cadre Questions</span>
                          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                            200 Qs Bank
                          </span>
                        </div>
                        {/* Cadre Selector */}
                        <div className="mt-1.5 flex flex-wrap items-center gap-2">
                          <label htmlFor="select-custom-cadre" className="text-[11px] text-slate-400">
                            Target Cadre:
                          </label>
                          <select
                            id="select-custom-cadre"
                            value={customCadreId}
                            onChange={(e) => setCustomCadreId(e.target.value)}
                            disabled={!enabledCats.cadre}
                            className="text-xs bg-slate-900 border border-slate-700 rounded px-2 py-1 text-rose-300 font-semibold focus:ring-1 focus:ring-rose-500 focus:outline-none max-w-[280px]"
                          >
                            {FCTA_CADRES.map(c => (
                              <option key={c.id} value={c.id}>
                                {c.name} {c.name === user.cadre ? '(Your Cadre)' : ''}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Question Count Controls */}
                    {enabledCats.cadre && (
                      <div className="flex items-center gap-1.5 flex-shrink-0 self-end sm:self-center">
                        <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg p-0.5">
                          <button
                            type="button"
                            onClick={() => setCustomCadreCount(Math.max(5, customCadreCount - 5))}
                            className="w-6 h-6 rounded text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-bold cursor-pointer"
                            title="Decrease by 5"
                          >
                            -
                          </button>
                          <span className="w-9 text-center font-mono font-bold text-xs text-rose-400">
                            {customCadreCount}
                          </span>
                          <button
                            type="button"
                            onClick={() => setCustomCadreCount(Math.min(50, customCadreCount + 5))}
                            className="w-6 h-6 rounded text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-bold cursor-pointer"
                            title="Increase by 5"
                          >
                            +
                          </button>
                        </div>
                        <div className="hidden sm:flex items-center gap-1">
                          {[10, 20, 30].map(val => (
                            <button
                              key={val}
                              type="button"
                              onClick={() => setCustomCadreCount(val)}
                              className={`px-1.5 py-0.5 text-[10px] font-mono rounded cursor-pointer ${
                                customCadreCount === val 
                                  ? 'bg-rose-500 text-slate-950 font-bold' 
                                  : 'bg-slate-800 text-slate-400 hover:text-white'
                              }`}
                            >
                              {val}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Proportion Bar & Summary */}
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Question Pool Distribution:</span>
                  <span className="font-mono text-slate-200 font-semibold text-[11px]">
                    {effectivePsr} PSR + {effectivePpa} PPA + {effectiveFr} FR + {effectiveFct} FCT + {effectiveCadre} Cadre
                  </span>
                </div>
                {/* Visual stacked bar */}
                <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden flex">
                  {effectivePsr > 0 && <div style={{ width: `${(effectivePsr / (totalCustomQuestions || 1)) * 100}%` }} className="bg-emerald-500" title={`PSR: ${effectivePsr}`} />}
                  {effectivePpa > 0 && <div style={{ width: `${(effectivePpa / (totalCustomQuestions || 1)) * 100}%` }} className="bg-blue-500" title={`PPA: ${effectivePpa}`} />}
                  {effectiveFr > 0 && <div style={{ width: `${(effectiveFr / (totalCustomQuestions || 1)) * 100}%` }} className="bg-amber-500" title={`FR: ${effectiveFr}`} />}
                  {effectiveFct > 0 && <div style={{ width: `${(effectiveFct / (totalCustomQuestions || 1)) * 100}%` }} className="bg-purple-500" title={`FCT GK: ${effectiveFct}`} />}
                  {effectiveCadre > 0 && <div style={{ width: `${(effectiveCadre / (totalCustomQuestions || 1)) * 100}%` }} className="bg-rose-500" title={`Cadre: ${effectiveCadre}`} />}
                </div>
              </div>
            </div>

            {/* COLUMN 2: Choose Time from 45 Minutes to 1 Hour (5 Cols on LG) */}
            <div id="column-choose-time" className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-slate-700/90 rounded-2xl p-5 sm:p-6 space-y-5 shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center border border-amber-500/30">
                      2
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-amber-400" />
                        Choose Time (45 Min to 1 Hour)
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        Calibrate test timer from 45 minutes to 60 minutes (1 hour).
                      </p>
                    </div>
                  </div>
                </div>

                {/* Big Time Display Badge */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-center mb-4">
                  <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight">
                    {customExamTime}
                    <span className="text-sm font-sans font-bold text-amber-400 ml-2">
                      {customExamTime === 60 ? 'MINUTES (1 HOUR)' : 'MINUTES'}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Allowed time window: 45 to 60 minutes
                  </div>
                </div>

                {/* Preset Time Buttons (45, 50, 55, 60 min) */}
                <div className="space-y-1.5 mb-4">
                  <div className="text-xs font-semibold text-slate-300">
                    Quick Duration Selection:
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { minutes: 45, label: '45 Min', desc: 'Speed Test' },
                      { minutes: 50, label: '50 Min', desc: 'Accelerated' },
                      { minutes: 55, label: '55 Min', desc: 'Standard' },
                      { minutes: 60, label: '60 Min', desc: '1 Hour (Full)' },
                    ].map((item) => (
                      <button
                        key={item.minutes}
                        type="button"
                        onClick={() => setCustomExamTime(item.minutes)}
                        className={`p-2.5 rounded-xl text-center border transition-all cursor-pointer ${
                          customExamTime === item.minutes
                            ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-md shadow-amber-500/20'
                            : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        <div className="text-xs font-bold">{item.label}</div>
                        <div className={`text-[10px] ${customExamTime === item.minutes ? 'text-slate-900 font-medium' : 'text-slate-400'}`}>
                          {item.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Range Slider for 45 to 60 minutes */}
                <div className="space-y-2 mb-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1">
                      <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                      Fine-tune Timer Duration:
                    </span>
                    <span className="font-mono text-amber-300 font-bold">{customExamTime} minutes</span>
                  </div>
                  <input
                    type="range"
                    id="slider-exam-time"
                    min={45}
                    max={60}
                    step={1}
                    value={customExamTime}
                    onChange={(e) => setCustomExamTime(Number(e.target.value))}
                    className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-500 px-0.5">
                    <span>45 Min (Min)</span>
                    <span>50 Min</span>
                    <span>55 Min</span>
                    <span>60 Min (1 Hour Max)</span>
                  </div>
                </div>

                {/* Exam Readiness & Analytics Card */}
                <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 space-y-2 text-xs">
                  <div className="font-semibold text-slate-300 flex items-center justify-between">
                    <span>Target Exam Pace:</span>
                    <span className="font-mono font-bold text-emerald-400">
                      {secondsPerQuestion}s / Question
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Total Question Bank:</span>
                    <span className="font-mono text-slate-200">{totalCustomQuestions} Questions</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Promotion Pass Mark:</span>
                    <span className="font-mono text-amber-300 font-semibold">
                      60% ({Math.round(totalCustomQuestions * 0.6)} Correct)
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Audio Speech Reader:</span>
                    <span className="text-emerald-400 font-medium">Ready (Native Speech)</span>
                  </div>
                </div>
              </div>

              {/* Action Button to Launch */}
              <div className="pt-4 border-t border-slate-800 space-y-2">
                <button
                  id="btn-launch-custom-exam"
                  onClick={launchCustomExam}
                  disabled={totalCustomQuestions === 0}
                  className={`w-full py-4 px-6 rounded-xl font-extrabold text-sm tracking-wide shadow-xl flex items-center justify-center gap-2.5 transition-all cursor-pointer ${
                    totalCustomQuestions > 0
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/25 hover:scale-[1.01]'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  }`}
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>
                    Start Examination ({totalCustomQuestions} Questions • {customExamTime === 60 ? '1 Hour' : `${customExamTime} Min`})
                  </span>
                </button>
                <p className="text-[10px] text-center text-slate-400">
                  Simulates official FCTA Staff Promotion Examination conditions with full review & auto-scoring.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* 4 Core Domain Categories (200 Questions Each) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FolderKanban className="w-5 h-5 text-emerald-400" />
                Domain Mock Examinations (200 Questions Each)
              </h3>
              <p className="text-xs text-slate-400">
                Focus on specific statutory regulatory subjects. Take the entire 200 questions or a 50-question mock.
              </p>
            </div>
            <button
              onClick={() => onNavigate('learning')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
            >
              <span>Learning Hub</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. PSR 200 */}
            <div className="bg-slate-800/80 border border-slate-700/80 hover:border-emerald-500/50 p-5 rounded-2xl flex flex-col justify-between transition-all group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-800">
                    200 Questions
                  </span>
                  <span className="text-xs font-mono text-slate-400">20 Chapters</span>
                </div>
                <h4 className="font-bold text-white text-base mb-1 group-hover:text-emerald-400 transition-colors">
                  Public Service Rules (PSR)
                </h4>
                <p className="text-xs text-slate-300 line-clamp-3 mb-4">
                  Appointments, discipline, queries, serious misconduct, leaves, allowances, promotion intervals, and statutory retirement.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-slate-700/60">
                <button
                  id="btn-start-psr-50"
                  onClick={() => launchCategoryExam('psr', 'Public Service Rules (PSR Mock)', 50, 45)}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>50 Qs Mock</span>
                </button>
                <button
                  id="btn-start-psr-200"
                  onClick={() => launchCategoryExam('psr', 'Public Service Rules (Full 200 Qs)', 200, 150)}
                  className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                  title="Full 200 questions"
                >
                  All 200
                </button>
              </div>
            </div>

            {/* 2. FR 200 */}
            <div className="bg-slate-800/80 border border-slate-700/80 hover:border-emerald-500/50 p-5 rounded-2xl flex flex-col justify-between transition-all group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-amber-950 text-amber-400 border border-amber-800">
                    200 Questions
                  </span>
                  <span className="text-xs font-mono text-slate-400">20 Chapters</span>
                </div>
                <h4 className="font-bold text-white text-base mb-1 group-hover:text-emerald-400 transition-colors">
                  Financial Regulations (FR)
                </h4>
                <p className="text-xs text-slate-300 line-clamp-3 mb-4">
                  Accounting Officer duties, TSA operations, vote control, virements, payment vouchers, imprests, loss of funds, and audit queries.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-slate-700/60">
                <button
                  id="btn-start-fr-50"
                  onClick={() => launchCategoryExam('fr', 'Financial Regulations (FR Mock)', 50, 45)}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>50 Qs Mock</span>
                </button>
                <button
                  id="btn-start-fr-200"
                  onClick={() => launchCategoryExam('fr', 'Financial Regulations (Full 200 Qs)', 200, 150)}
                  className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                  title="Full 200 questions"
                >
                  All 200
                </button>
              </div>
            </div>

            {/* 3. PPA 200 */}
            <div className="bg-slate-800/80 border border-slate-700/80 hover:border-emerald-500/50 p-5 rounded-2xl flex flex-col justify-between transition-all group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-blue-950 text-blue-400 border border-blue-800">
                    200 Questions
                  </span>
                  <span className="text-xs font-mono text-slate-400">20 Chapters</span>
                </div>
                <h4 className="font-bold text-white text-base mb-1 group-hover:text-emerald-400 transition-colors">
                  Public Procurement Act (PPA)
                </h4>
                <p className="text-xs text-slate-300 line-clamp-3 mb-4">
                  BPP mandate, NCPP, competitive bidding standards, Ministerial Tenders Boards, evaluation criteria, and Section 58 penal offences.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-slate-700/60">
                <button
                  id="btn-start-ppa-50"
                  onClick={() => launchCategoryExam('ppa', 'Public Procurement Act (PPA Mock)', 50, 45)}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>50 Qs Mock</span>
                </button>
                <button
                  id="btn-start-ppa-200"
                  onClick={() => launchCategoryExam('ppa', 'Public Procurement Act (Full 200 Qs)', 200, 150)}
                  className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                  title="Full 200 questions"
                >
                  All 200
                </button>
              </div>
            </div>

            {/* 4. FCT General Knowledge 200 */}
            <div className="bg-slate-800/80 border border-slate-700/80 hover:border-emerald-500/50 p-5 rounded-2xl flex flex-col justify-between transition-all group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-purple-950 text-purple-400 border border-purple-800">
                    200 Questions
                  </span>
                  <span className="text-xs font-mono text-slate-400">20 Chapters</span>
                </div>
                <h4 className="font-bold text-white text-base mb-1 group-hover:text-emerald-400 transition-colors">
                  FCT General Knowledge
                </h4>
                <p className="text-xs text-slate-300 line-clamp-3 mb-4">
                  Decree 6 of 1976, Aguda Panel, Abuja Master Plan, 6 Area Councils, FCDA infrastructure, historic Ministers, and FCTA administration.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-slate-700/60">
                <button
                  id="btn-start-fct-50"
                  onClick={() => launchCategoryExam('fct_gk', 'FCT General Knowledge Mock', 50, 45)}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>50 Qs Mock</span>
                </button>
                <button
                  id="btn-start-fct-200"
                  onClick={() => launchCategoryExam('fct_gk', 'FCT General Knowledge (Full 200 Qs)', 200, 150)}
                  className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                  title="Full 200 questions"
                >
                  All 200
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FCTA Cadres Section (200 Questions Each) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-emerald-400" />
                The {FCTA_CADRES.length} FCTA Cadres Professional Mock Exams ({(FCTA_CADRES.length * 200).toLocaleString()} Questions Total)
              </h3>
              <p className="text-xs text-slate-400">
                Each cadre includes 200 dedicated questions across 20 technical modules. Your registered cadre is highlighted:
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-md border border-emerald-800">
              {FCTA_CADRES.length} Cadres x 200 = {(FCTA_CADRES.length * 200).toLocaleString()} Qs
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FCTA_CADRES.map((cadre) => {
              const isUserCadre = cadre.name === user.cadre;

              return (
                <div
                  key={cadre.id}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                    isUserCadre
                      ? 'bg-slate-850 border-emerald-500 shadow-lg ring-1 ring-emerald-500/50'
                      : 'bg-slate-800/80 border-slate-700/80 hover:bg-slate-800'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-semibold font-mono text-slate-400">
                        200 Questions (20 Modules)
                      </span>
                      {isUserCadre && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500 text-slate-950 uppercase tracking-wider">
                          Your Cadre
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-white text-sm leading-snug mb-1">
                      {cadre.name}
                    </h4>
                    <p className="text-xs text-slate-300 line-clamp-2 mb-4">
                      {cadre.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-700/60 flex items-center gap-2">
                    <button
                      onClick={() => launchCategoryExam(cadre.id, `${cadre.shortName} Mock (50 Qs)`, 50, 45)}
                      className="flex-1 py-2 px-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>50 Qs Mock</span>
                    </button>
                    <button
                      onClick={() => launchCategoryExam(cadre.id, `${cadre.name} (Full 200 Qs)`, 200, 150)}
                      className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                      title="Full 200 questions"
                    >
                      All 200
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chapter-by-Chapter Drill ("picking 10 questions from every chapter of psr, fr, ppa and the 13 fcta cadres") */}
        <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <ListOrdered className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">
                  Chapter-by-Chapter Drill (10 Questions Per Chapter)
                </h3>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Select any subject or cadre below to access all 20 individual chapters with exactly 10 questions each.
              </p>
            </div>

            {/* Domain Selector Dropdown / Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <label htmlFor="drill-domain-select" className="text-xs text-slate-400 font-semibold uppercase">
                Subject:
              </label>
              <select
                id="drill-domain-select"
                value={selectedDrillDomain}
                onChange={(e) => setSelectedDrillDomain(e.target.value)}
                className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
              >
                <optgroup label="General Civil Service Subjects">
                  <option value="psr">Public Service Rules (PSR - 20 Chapters)</option>
                  <option value="fr">Financial Regulations (FR - 20 Chapters)</option>
                  <option value="ppa">Public Procurement Act (PPA - 20 Chapters)</option>
                  <option value="fct_gk">FCT General Knowledge (20 Chapters)</option>
                </optgroup>
                <optgroup label={`FCTA Professional Cadres (${FCTA_CADRES.length} Cadres)`}>
                  {FCTA_CADRES.map((cadre) => (
                    <option key={cadre.id} value={cadre.id}>
                      {cadre.name} (20 Modules)
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>

          {/* Chapters Grid (20 Chapters x 10 Questions each = 200 Qs for active domain) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {getDrillChapters().map((ch) => (
              <div
                key={ch.chapterNumber}
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/80 hover:border-emerald-500/60 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      Chapter {ch.chapterNumber}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                      10 Questions
                    </span>
                  </div>
                  <h5 className="font-bold text-white text-xs leading-snug line-clamp-2 mb-1">
                    {ch.title}
                  </h5>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mb-3">
                    {ch.topicSummary}
                  </p>
                </div>

                <button
                  id={`btn-drill-ch-${ch.chapterNumber}`}
                  onClick={() => launchChapterDrill(ch.subjectId, ch.chapterNumber, ch.title)}
                  className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Practice 10 Questions</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Past Exam History */}
        {pastSessions.length > 0 && (
          <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-400" />
              Your Recent CBT Mock Exam Records
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400 uppercase font-semibold">
                    <th className="py-3 px-4">Exam Title</th>
                    <th className="py-3 px-4">Questions</th>
                    <th className="py-3 px-4">Score</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Completed Date</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {pastSessions.slice(0, 5).map((s) => (
                    <tr key={s.id} className="hover:bg-slate-900/60 transition-colors">
                      <td className="py-3 px-4 font-semibold text-white">
                        {s.title}
                      </td>
                      <td className="py-3 px-4 text-slate-300 font-mono">
                        {s.totalQuestions} Qs
                      </td>
                      <td className="py-3 px-4 font-bold text-emerald-400 font-mono">
                        {s.score} / {s.totalQuestions} ({s.percentage}%)
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          s.isPassed
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-rose-950 text-rose-400 border border-rose-800'
                        }`}>
                          {s.isPassed ? 'Passed' : 'Failed'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-400">
                        {new Date(s.submittedAt || s.startedAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {onReviewPastSession && (
                          <button
                            onClick={() => onReviewPastSession(s)}
                            className="px-3 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold transition-colors"
                          >
                            Review
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Fullscreen Video Manual Modal */}
        {isVideoManualModalOpen && (
          <VideoUserManual
            isOpenModal={true}
            onCloseModal={() => setIsVideoManualModalOpen(false)}
            onStartExam={() => {
              setIsVideoManualModalOpen(false);
              document.getElementById('interactive-exam-configurator')?.scrollIntoView({ behavior: 'smooth' });
            }}
            onNavigateToSection={(id) => {
              setIsVideoManualModalOpen(false);
              document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        )}
      </div>
    </div>
  );
};
