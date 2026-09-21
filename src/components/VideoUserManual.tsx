import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  SkipBack, 
  SkipForward, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Sparkles, 
  Sliders, 
  ShieldCheck, 
  Award, 
  HelpCircle, 
  Monitor, 
  Zap, 
  Flame, 
  X, 
  Video, 
  Link as LinkIcon, 
  MessageSquare, 
  FileText,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { 
  VIDEO_MANUAL_CHAPTERS, 
  VIDEO_TOTAL_DURATION_SECONDS, 
  formatTimeSeconds, 
  getCurrentChapter,
  VideoChapter
} from '../data/videoManualData';
import { voiceReader } from '../utils/speech';

interface VideoUserManualProps {
  isOpenModal?: boolean;
  onCloseModal?: () => void;
  onNavigateToSection?: (sectionId: string) => void;
  onStartExam?: () => void;
  isInlineView?: boolean;
}

export const VideoUserManual: React.FC<VideoUserManualProps> = ({
  isOpenModal = false,
  onCloseModal,
  onNavigateToSection,
  onStartExam,
  isInlineView = true,
}) => {
  const { isNavyWhite } = useTheme();

  // Playback state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showCaptions, setShowCaptions] = useState<boolean>(true);
  const [narrationEnabled, setNarrationEnabled] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'chapters' | 'shortcuts' | 'transcript' | 'custom_url'>('chapters');
  const [isTheaterMode, setIsTheaterMode] = useState<boolean>(false);

  // Custom external video URL support
  const [customVideoUrl, setCustomVideoUrl] = useState<string>('');
  const [activeVideoSource, setActiveVideoSource] = useState<'interactive' | 'external'>('interactive');
  const [searchTranscript, setSearchTranscript] = useState<string>('');

  const currentChapter: VideoChapter = getCurrentChapter(currentTime);

  // Timer loop for interactive playback
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 1 * playbackSpeed;
          if (next >= VIDEO_TOTAL_DURATION_SECONDS) {
            setIsPlaying(false);
            return 0;
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  // Voice narration synchronization
  useEffect(() => {
    if (narrationEnabled && isPlaying && !isMuted) {
      // Narrate current chapter if speech is supported
      voiceReader.speakText(currentChapter.narrationScript);
    } else {
      voiceReader.stop();
    }
    return () => {
      voiceReader.stop();
    };
  }, [currentChapter.id, narrationEnabled, isPlaying, isMuted]);

  // Handle Play / Pause Toggle
  const togglePlay = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    if (!nextState) {
      voiceReader.stop();
    }
  };

  // Jump to specific timestamp
  const handleSeek = (seconds: number) => {
    const clamped = Math.max(0, Math.min(VIDEO_TOTAL_DURATION_SECONDS, seconds));
    setCurrentTime(clamped);
  };

  // Jump to chapter
  const handleSelectChapter = (chapter: VideoChapter) => {
    setCurrentTime(chapter.startTimeSeconds);
    setIsPlaying(true);
  };

  // Previous Chapter / Next Chapter
  const handlePrevChapter = () => {
    const idx = VIDEO_MANUAL_CHAPTERS.findIndex((c) => c.id === currentChapter.id);
    if (idx > 0) {
      handleSelectChapter(VIDEO_MANUAL_CHAPTERS[idx - 1]);
    } else {
      handleSeek(0);
    }
  };

  const handleNextChapter = () => {
    const idx = VIDEO_MANUAL_CHAPTERS.findIndex((c) => c.id === currentChapter.id);
    if (idx < VIDEO_MANUAL_CHAPTERS.length - 1) {
      handleSelectChapter(VIDEO_MANUAL_CHAPTERS[idx + 1]);
    }
  };

  // Progress percentage
  const progressPercent = (currentTime / VIDEO_TOTAL_DURATION_SECONDS) * 100;

  // Render Visual Mockup Stage corresponding to active chapter
  const renderInteractiveStage = () => {
    switch (currentChapter.mockupType) {
      case 'auth':
        return (
          <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center animate-fadeIn space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shadow-xl">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 text-blue-200 border border-blue-600/40 text-xs font-bold uppercase tracking-wider mb-2">
                Chapter 1: Official Authentication Protocol
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                FCTA Civil Service Candidate Portal
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mt-1">
                Candidate authentication requires a valid 6-digit numeric Staff ID with automatic cadre syllabus binding.
              </p>
            </div>

            {/* Interactive Demonstration Card */}
            <div className="bg-slate-900/90 border border-slate-700 rounded-2xl p-4 max-w-sm w-full text-left space-y-2.5 shadow-2xl">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                <span className="text-slate-400">Candidate Identity</span>
                <span className="font-mono text-emerald-400 font-bold">STATUS: VERIFIED</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-800/80 p-2 rounded-lg">
                  <span className="text-[10px] text-slate-400 block uppercase">Staff ID / Password</span>
                  <span className="font-mono font-bold text-white text-sm">101010</span>
                </div>
                <div className="bg-slate-800/80 p-2 rounded-lg">
                  <span className="text-[10px] text-slate-400 block uppercase">Promotion Tier</span>
                  <span className="font-bold text-amber-400 text-sm">GL 14 - GL 16</span>
                </div>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-2 rounded-lg text-[11px] text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>PSR & Financial Regulations Syllabi Configured</span>
              </div>
            </div>
          </div>
        );

      case 'builder':
        return (
          <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center animate-fadeIn space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400 shadow-xl">
              <Sliders className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 text-blue-200 border border-blue-600/40 text-xs font-bold uppercase tracking-wider mb-2">
                Chapter 2: Examination Workstation Setup
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Statutory Domain Question Calibrator
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mt-1">
                Customize question ratios across 5 statutory domains and calibrate test duration from 45 min to 1 hr.
              </p>
            </div>

            {/* Interactive Domain Sliders Visualization */}
            <div className="bg-slate-900/90 border border-slate-700 rounded-2xl p-4 max-w-md w-full text-left space-y-2.5 shadow-2xl">
              <div className="flex items-center justify-between text-xs pb-1.5 border-b border-slate-800">
                <span className="text-slate-400">Question Distribution (Standard 100 Qs)</span>
                <span className="font-mono text-emerald-400 font-bold">1 Hour Exam (36s / Q)</span>
              </div>
              <div className="grid grid-cols-5 gap-1.5 text-center text-xs">
                <div className="bg-slate-800 p-2 rounded-lg border border-slate-700">
                  <span className="text-[10px] text-slate-400 block font-bold">PSR</span>
                  <span className="font-mono font-bold text-white text-sm">20 Qs</span>
                </div>
                <div className="bg-slate-800 p-2 rounded-lg border border-slate-700">
                  <span className="text-[10px] text-slate-400 block font-bold">FR</span>
                  <span className="font-mono font-bold text-white text-sm">20 Qs</span>
                </div>
                <div className="bg-slate-800 p-2 rounded-lg border border-slate-700">
                  <span className="text-[10px] text-slate-400 block font-bold">PPA</span>
                  <span className="font-mono font-bold text-white text-sm">20 Qs</span>
                </div>
                <div className="bg-slate-800 p-2 rounded-lg border border-slate-700">
                  <span className="text-[10px] text-slate-400 block font-bold">FCT GK</span>
                  <span className="font-mono font-bold text-white text-sm">20 Qs</span>
                </div>
                <div className="bg-slate-800 p-2 rounded-lg border border-emerald-500/50">
                  <span className="text-[10px] text-emerald-400 block font-bold">CADRE</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">20 Qs</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] pt-1 text-slate-400">
                <span>Presets: <strong>Standard 100 Qs</strong> • <strong>45-Min Speed Mode</strong></span>
                <span className="text-emerald-400 font-semibold">100% Ready</span>
              </div>
            </div>
          </div>
        );

      case 'exam':
        return (
          <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center animate-fadeIn space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-xl">
              <Clock className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/60 text-amber-200 border border-amber-600/40 text-xs font-bold uppercase tracking-wider mb-2">
                Chapter 3: CBT Examination Room & Hotkeys
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Zero-Latency Keyboard Examination Controls
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mt-1">
                Answer without reaching for your mouse using direct keyboard hotkeys to maximize your exam pacing.
              </p>
            </div>

            {/* Simulated Exam Screen with Keys */}
            <div className="bg-slate-900/90 border border-slate-700 rounded-2xl p-4 max-w-lg w-full text-left space-y-2.5 shadow-2xl">
              <div className="flex items-center justify-between text-xs pb-1.5 border-b border-slate-800">
                <span className="font-bold text-slate-200">Question 14 of 100 (Public Service Rules)</span>
                <span className="font-mono text-amber-400 font-bold bg-slate-800 px-2 py-0.5 rounded">00:51:24 REMAINING</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-lg bg-slate-800/90 border border-emerald-500/80 flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-slate-950 font-mono font-black text-xs">[A]</span>
                  <span className="text-white font-medium truncate">Selected Answer</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-800/50 border border-slate-700 flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-slate-700 text-slate-300 font-mono font-bold text-xs">[B]</span>
                  <span className="text-slate-300 truncate">Option B</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-800/50 border border-slate-700 flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-slate-700 text-slate-300 font-mono font-bold text-xs">[C]</span>
                  <span className="text-slate-300 truncate">Option C</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-800/50 border border-slate-700 flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-slate-700 text-slate-300 font-mono font-bold text-xs">[D]</span>
                  <span className="text-slate-300 truncate">Option D</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-slate-400 border-t border-slate-800">
                <span>[N] Next Question • [P] Previous</span>
                <span className="text-amber-400">[F] Flag for Review • [C] Clear</span>
              </div>
            </div>
          </div>
        );

      case 'accessibility':
        return (
          <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center animate-fadeIn space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shadow-xl">
              <Volume2 className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/60 text-cyan-200 border border-cyan-600/40 text-xs font-bold uppercase tracking-wider mb-2">
                Chapter 4: Voice Reader & Auditory Accessibility
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Integrated English Voice Audio Reader
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mt-1">
                Listen to complete question stems and options read aloud with adjustable playback cadence and auto-advance.
              </p>
            </div>

            {/* Voice Reader Mockup Card */}
            <div className="bg-slate-900/90 border border-cyan-500/40 rounded-2xl p-4 max-w-md w-full text-left space-y-3 shadow-2xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 animate-pulse" /> Voice Reader Active
                </span>
                <span className="text-xs font-mono bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800 text-cyan-300">
                  Rate: 1.0x
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800 text-xs text-slate-200 font-sans border-l-2 border-cyan-400">
                "Question 14. What constitutes serious misconduct under Chapter 3 of the Public Service Rules? Option A..."
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Auto-Read on Next: <strong className="text-white">Enabled</strong></span>
                <span className="text-cyan-400">SpeechSynthesis High-Yield Voice</span>
              </div>
            </div>
          </div>
        );

      case 'goal':
        return (
          <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center animate-fadeIn space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-orange-500/20 border border-orange-400/40 flex items-center justify-center text-orange-400 shadow-xl">
              <Flame className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-900/60 text-orange-200 border border-orange-600/40 text-xs font-bold uppercase tracking-wider mb-2">
                Chapter 5: Daily Study Goal & Streak Discipline
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Daily Study Quota & Consecutive Streak Tracker
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mt-1">
                Configure daily question targets (15 to 100 Qs/day) with real-time local storage streak synchronization.
              </p>
            </div>

            {/* Streak & Goal Mockup Card */}
            <div className="bg-slate-900/90 border border-orange-500/40 rounded-2xl p-4 max-w-md w-full text-left space-y-3 shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-orange-500 text-white animate-pulse">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-black text-white block leading-none">3 Days Streak</span>
                    <span className="text-[10px] text-orange-400 font-semibold uppercase">Goal Active</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400">35 / 50 Qs Today (70%)</span>
              </div>
              {/* Progress bar */}
              <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full w-[70%]" />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>15 more questions to keep streak active today</span>
                <span className="text-white font-mono">Best: 7 Days</span>
              </div>
            </div>
          </div>
        );

      case 'advisor':
        return (
          <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center animate-fadeIn space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-400 shadow-xl">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/60 text-purple-200 border border-purple-600/40 text-xs font-bold uppercase tracking-wider mb-2">
                Chapter 6: Post-Exam AI Performance Advisor
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Statutory Remediation & Promotion Readiness Clearance
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mt-1">
                Diagnostic score breakdown with codified citations from PSR, Financial Regulations, and Procurement Act.
              </p>
            </div>

            {/* Advisor Mockup Card */}
            <div className="bg-slate-900/90 border border-purple-500/40 rounded-2xl p-4 max-w-md w-full text-left space-y-2.5 shadow-2xl">
              <div className="flex items-center justify-between text-xs pb-1.5 border-b border-slate-800">
                <span className="text-slate-400">Promotion Benchmark</span>
                <span className="font-mono text-emerald-400 font-bold">84% • PASSED (Clearance Met)</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-800/80 text-xs text-slate-200 space-y-1">
                <div className="text-[11px] font-semibold text-purple-300 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" /> Reference: PSR Rule 030301 (Misconduct Procedure)
                </div>
                <p className="text-[11px] text-slate-400">
                  Targeted remediation recommended for Financial Regulations Chapter 4 (Virement Approvals).
                </p>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span>Directorate Standard Level 3 Verified</span>
                <span className="text-purple-400 font-semibold cursor-pointer">One-Click Re-drill Ready</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Content for the component
  const content = (
    <div className={`space-y-6 ${isTheaterMode ? 'p-6 max-w-7xl mx-auto' : ''}`}>
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-inherit/20">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              isNavyWhite 
                ? 'bg-blue-100 text-blue-900 border border-blue-200' 
                : 'bg-blue-900/60 text-blue-200 border border-blue-700/50'
            }`}>
              <Video className="w-3.5 h-3.5 text-blue-600" />
              Official Portal User Manual
            </span>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              6 Chapters • 8 Minutes Duration
            </span>
          </div>

          <h2 className={`text-xl sm:text-2xl font-black tracking-tight ${
            isNavyWhite ? 'text-[#07152b]' : 'text-white'
          }`}>
            Video User Manual & Candidate Orientation Guide
          </h2>
          <p className={`text-xs sm:text-sm mt-0.5 ${isNavyWhite ? 'text-slate-500' : 'text-blue-200/75'}`}>
            Watch the comprehensive guide to candidate authentication, CBT exam calibration, hotkeys, accessibility, and AI performance advisor.
          </p>
        </div>

        {/* Quick Guide Controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            id="btn-toggle-narration"
            onClick={() => setNarrationEnabled(!narrationEnabled)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
              narrationEnabled
                ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20'
                : isNavyWhite
                  ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
            title="Toggle speech synthesis narration of the user guide"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{narrationEnabled ? 'Audio Voice: ON' : 'Audio Voice: OFF'}</span>
          </button>

          <button
            id="btn-toggle-theater"
            onClick={() => setIsTheaterMode(!isTheaterMode)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
              isTheaterMode
                ? 'bg-emerald-600 text-white border-emerald-500'
                : isNavyWhite
                  ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
            title="Toggle maximized theater mode"
          >
            {isTheaterMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isTheaterMode ? 'Exit Theater' : 'Theater View'}</span>
          </button>

          {isOpenModal && onCloseModal && (
            <button
              id="btn-close-manual-modal"
              onClick={onCloseModal}
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Primary Video Player Screen & Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left / Main: Video Screen Frame */}
        <div className="lg:col-span-8 flex flex-col space-y-3">
          <div 
            id="video-player-viewport"
            className="relative w-full aspect-video bg-slate-950 rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl flex flex-col justify-between group"
          >
            {/* Top Video Header Overlay */}
            <div className="relative z-10 p-3 sm:p-4 bg-gradient-to-b from-slate-950/90 via-slate-950/40 to-transparent flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-red-600 text-white uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" /> REC 1080p
                </span>
                <span className="text-xs font-extrabold text-white truncate max-w-xs sm:max-w-md">
                  CH {currentChapter.chapterNumber}: {currentChapter.title}
                </span>
              </div>

              <span className="text-xs font-mono font-bold text-emerald-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                {currentChapter.badgeLabel}
              </span>
            </div>

            {/* Center Stage: Interactive Simulator View or External Player */}
            <div className="relative flex-1 flex items-center justify-center overflow-hidden">
              {activeVideoSource === 'external' && customVideoUrl ? (
                <iframe
                  src={customVideoUrl}
                  title="FCTA CBT Portal Video User Manual"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  {renderInteractiveStage()}

                  {/* Play Button Splash Overlay when Paused */}
                  {!isPlaying && (
                    <div 
                      onClick={togglePlay}
                      className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center cursor-pointer transition-all hover:bg-slate-950/40"
                    >
                      <div className="w-20 h-20 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                        <Play className="w-10 h-10 ml-1.5 fill-current" />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Closed Captions Subtitle Ribbon */}
            {showCaptions && activeVideoSource === 'interactive' && (
              <div className="relative z-10 px-4 py-2 bg-slate-950/85 backdrop-blur-sm border-t border-slate-800 text-center">
                <p className="text-xs sm:text-sm text-amber-300 font-medium tracking-wide">
                  "{currentChapter.narrationScript}"
                </p>
              </div>
            )}

            {/* Video Controls Bar */}
            <div className="relative z-10 p-3 sm:p-4 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent space-y-2">
              {/* Progress Scrubber Timeline */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-300">
                  {formatTimeSeconds(currentTime)}
                </span>

                <div 
                  className="relative flex-1 h-3 bg-slate-800/90 rounded-full cursor-pointer overflow-hidden group/track"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const ratio = (e.clientX - rect.left) / rect.width;
                    handleSeek(ratio * VIDEO_TOTAL_DURATION_SECONDS);
                  }}
                >
                  {/* Chapter segment tick marks */}
                  {VIDEO_MANUAL_CHAPTERS.map((ch) => (
                    <div
                      key={ch.id}
                      className="absolute top-0 bottom-0 w-[1px] bg-slate-600 z-10"
                      style={{ left: `${(ch.startTimeSeconds / VIDEO_TOTAL_DURATION_SECONDS) * 100}%` }}
                      title={`${ch.title} (${ch.durationLabel})`}
                    />
                  ))}

                  {/* Filled Progress Bar */}
                  <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full relative transition-all duration-150"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <span className="text-xs font-mono text-slate-400">
                  {formatTimeSeconds(VIDEO_TOTAL_DURATION_SECONDS)}
                </span>
              </div>

              {/* Action Buttons Row */}
              <div className="flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-2">
                  <button
                    id="btn-player-play-pause"
                    onClick={togglePlay}
                    className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer"
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                  </button>

                  <button
                    id="btn-player-prev-ch"
                    onClick={handlePrevChapter}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
                    title="Previous Chapter"
                  >
                    <SkipBack className="w-4 h-4" />
                  </button>

                  <button
                    id="btn-player-next-ch"
                    onClick={handleNextChapter}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
                    title="Next Chapter"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>

                  <button
                    id="btn-player-rewind-10"
                    onClick={() => handleSeek(currentTime - 10)}
                    className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                    title="Rewind 10 Seconds"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                {/* Right Controls: Speed, Captions, Mute */}
                <div className="flex items-center gap-2">
                  {/* Speed Selector */}
                  <div className="flex items-center bg-slate-800/90 rounded-lg p-0.5 border border-slate-700">
                    {[0.75, 1.0, 1.25, 1.5].map((speed) => (
                      <button
                        key={speed}
                        onClick={() => setPlaybackSpeed(speed)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono transition-colors ${
                          playbackSpeed === speed
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>

                  {/* Subtitles CC Toggle */}
                  <button
                    id="btn-toggle-cc"
                    onClick={() => setShowCaptions(!showCaptions)}
                    className={`px-2 py-1 rounded-lg text-xs font-mono font-bold border transition-colors cursor-pointer ${
                      showCaptions
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                    title="Toggle Closed Captions (CC)"
                  >
                    CC
                  </button>

                  {/* Mute Audio */}
                  <button
                    id="btn-toggle-mute"
                    onClick={() => setIsMuted(!isMuted)}
                    className={`p-2 rounded-xl transition-colors cursor-pointer ${
                      isMuted ? 'bg-red-500/20 text-red-400' : 'bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Current Chapter Takeaway Banner */}
          <div className={`p-4 rounded-2xl border transition-all ${
            isNavyWhite 
              ? 'bg-blue-50/50 border-blue-200 text-slate-800' 
              : 'bg-slate-900/90 border-slate-800 text-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" /> Key Takeaway • Chapter {currentChapter.chapterNumber}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                Segment: {currentChapter.durationLabel}
              </span>
            </div>
            <p className="text-xs font-medium text-inherit mb-2.5">
              {currentChapter.summary}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {currentChapter.takeaways.map((takeaway, idx) => (
                <div 
                  key={idx} 
                  className={`p-2 rounded-xl text-[11px] border flex items-start gap-1.5 ${
                    isNavyWhite ? 'bg-white border-blue-100' : 'bg-slate-800/80 border-slate-700/80'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="leading-tight">{takeaway}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Chapter Playlist & Interactive Guides Sidebar */}
        <div className="lg:col-span-4 flex flex-col space-y-4">
          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-900/60 border border-slate-800">
            <button
              onClick={() => setActiveTab('chapters')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'chapters'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Chapters (6)
            </button>
            <button
              onClick={() => setActiveTab('shortcuts')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'shortcuts'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Hotkeys
            </button>
            <button
              onClick={() => setActiveTab('transcript')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'transcript'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Transcript
            </button>
            <button
              onClick={() => setActiveTab('custom_url')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'custom_url'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Custom URL
            </button>
          </div>

          {/* Tab 1: Chapter Playlist */}
          {activeTab === 'chapters' && (
            <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
              {VIDEO_MANUAL_CHAPTERS.map((ch) => {
                const isActive = ch.id === currentChapter.id;
                return (
                  <div
                    key={ch.id}
                    id={`chapter-card-${ch.id}`}
                    onClick={() => handleSelectChapter(ch)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isActive
                        ? isNavyWhite
                          ? 'bg-blue-50 border-blue-300 text-blue-950 shadow-sm ring-1 ring-blue-300'
                          : 'bg-blue-900/60 border-blue-500 text-white shadow-lg ring-1 ring-blue-400'
                        : isNavyWhite
                          ? 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                          : 'bg-slate-900/80 border-slate-800 hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-bold text-xs flex-shrink-0 ${
                      isActive 
                        ? 'bg-blue-600 text-white' 
                        : isNavyWhite ? 'bg-slate-100 text-slate-600' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {isActive && isPlaying ? (
                        <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                      ) : (
                        `0${ch.chapterNumber}`
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold truncate">
                          {ch.title}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 ml-1">
                          {ch.durationLabel}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                        {ch.summary}
                      </p>
                    </div>

                    <ChevronRight className={`w-4 h-4 flex-shrink-0 mt-2 transition-transform ${
                      isActive ? 'text-blue-500 translate-x-0.5' : 'text-slate-400'
                    }`} />
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab 2: CBT Rapid Keyboard Hotkeys */}
          {activeTab === 'shortcuts' && (
            <div className={`p-4 rounded-2xl border space-y-3 ${
              isNavyWhite ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900/80 border-slate-800 text-white'
            }`}>
              <div className="flex items-center justify-between pb-2 border-b border-inherit/20">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  CBT Keyboard Hotkeys
                </span>
                <span className="text-[10px] text-slate-400">Zero Mouse Latency</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100 dark:bg-slate-800/60">
                  <span className="font-semibold">Select Option A / B / C / D</span>
                  <div className="flex gap-1 font-mono">
                    <kbd className="px-2 py-0.5 rounded bg-blue-600 text-white font-bold">A</kbd>
                    <kbd className="px-2 py-0.5 rounded bg-blue-600 text-white font-bold">B</kbd>
                    <kbd className="px-2 py-0.5 rounded bg-blue-600 text-white font-bold">C</kbd>
                    <kbd className="px-2 py-0.5 rounded bg-blue-600 text-white font-bold">D</kbd>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100 dark:bg-slate-800/60">
                  <span className="font-semibold">Next Question</span>
                  <kbd className="px-2.5 py-0.5 rounded bg-slate-700 text-white font-mono font-bold">N</kbd>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100 dark:bg-slate-800/60">
                  <span className="font-semibold">Previous Question</span>
                  <kbd className="px-2.5 py-0.5 rounded bg-slate-700 text-white font-mono font-bold">P</kbd>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100 dark:bg-slate-800/60">
                  <span className="font-semibold text-amber-500">Flag for Review</span>
                  <kbd className="px-2.5 py-0.5 rounded bg-amber-600 text-white font-mono font-bold">F</kbd>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100 dark:bg-slate-800/60">
                  <span className="font-semibold text-red-400">Clear Selection</span>
                  <kbd className="px-2.5 py-0.5 rounded bg-slate-700 text-white font-mono font-bold">C</kbd>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Complete Guide Transcript */}
          {activeTab === 'transcript' && (
            <div className={`p-4 rounded-2xl border space-y-3 ${
              isNavyWhite ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900/80 border-slate-800 text-white'
            }`}>
              <input
                type="text"
                placeholder="Search guide transcript..."
                value={searchTranscript}
                onChange={(e) => setSearchTranscript(e.target.value)}
                className="w-full text-xs py-2 px-3 rounded-xl border border-slate-700 bg-slate-800/80 text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />

              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1 text-xs">
                {VIDEO_MANUAL_CHAPTERS
                  .filter((ch) => 
                    !searchTranscript || 
                    ch.title.toLowerCase().includes(searchTranscript.toLowerCase()) || 
                    ch.narrationScript.toLowerCase().includes(searchTranscript.toLowerCase())
                  )
                  .map((ch) => (
                    <div 
                      key={ch.id} 
                      onClick={() => handleSelectChapter(ch)}
                      className="p-2.5 rounded-xl border border-slate-700/60 hover:border-blue-500/80 transition-all cursor-pointer space-y-1"
                    >
                      <div className="flex items-center justify-between text-[11px] font-bold text-blue-400">
                        <span>Chapter {ch.chapterNumber}: {ch.title}</span>
                        <span className="font-mono text-slate-400">{formatTimeSeconds(ch.startTimeSeconds)}</span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        {ch.narrationScript}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Tab 4: Custom Video URL */}
          {activeTab === 'custom_url' && (
            <div className={`p-4 rounded-2xl border space-y-3 ${
              isNavyWhite ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900/80 border-slate-800 text-white'
            }`}>
              <div>
                <h4 className="text-xs font-bold text-blue-500 flex items-center gap-1.5">
                  <LinkIcon className="w-3.5 h-3.5" /> Custom Video Manual Link
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Connect an external YouTube video or department-hosted MP4 tutorial.
                </p>
              </div>

              <input
                id="input-custom-video-url"
                type="text"
                placeholder="https://www.youtube.com/embed/... or direct MP4 URL"
                value={customVideoUrl}
                onChange={(e) => setCustomVideoUrl(e.target.value)}
                className="w-full text-xs py-2 px-3 rounded-xl border border-slate-700 bg-slate-800/80 text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
              />

              <div className="flex items-center gap-2">
                <button
                  id="btn-apply-external-video"
                  onClick={() => {
                    if (customVideoUrl.trim()) {
                      setActiveVideoSource('external');
                    }
                  }}
                  disabled={!customVideoUrl.trim()}
                  className="flex-1 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white transition-colors cursor-pointer"
                >
                  Load External Video
                </button>

                <button
                  id="btn-reset-interactive-video"
                  onClick={() => {
                    setActiveVideoSource('interactive');
                    setCustomVideoUrl('');
                  }}
                  className="px-3 py-2 rounded-xl text-xs font-bold border border-slate-700 hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer"
                >
                  Reset Simulator
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // If in Modal Mode
  if (isOpenModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
        <div 
          className={`w-full max-w-6xl max-h-[92vh] overflow-y-auto rounded-3xl p-6 shadow-2xl border ${
            isNavyWhite ? 'bg-white border-blue-200 text-slate-800' : 'bg-[#07152b] border-blue-900 text-white'
          }`}
          role="dialog"
          aria-modal="true"
        >
          {content}
        </div>
      </div>
    );
  }

  // If in inline dashboard mode
  return (
    <div 
      id="video-user-manual-section"
      className={`rounded-3xl p-6 sm:p-8 shadow-xl transition-all border ${
        isNavyWhite
          ? 'bg-white border-blue-100 text-slate-800 shadow-blue-950/5'
          : 'bg-[#0b1e3b] border-blue-900 text-white shadow-2xl'
      }`}
    >
      {content}
    </div>
  );
};
