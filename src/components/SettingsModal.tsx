import React, { useState } from 'react';
import { useTheme, PortalTheme } from '../context/ThemeContext';
import { useScreen } from '../context/ScreenRecognitionContext';
import { voiceReader } from '../utils/speech';
import { 
  getExamPreferences, 
  saveExamPreferences, 
  DEFAULT_EXAM_PREFS, 
  ExamPreferences,
  factoryResetPortalData,
  getCurrentUser
} from '../utils/userStore';
import { resetStudyGoal, updateDailyTarget, getDailyStudyGoal } from '../utils/studyGoalStore';
import { ScreenDeviceType } from '../types';
import {
  X,
  SlidersHorizontal,
  Sun,
  Moon,
  Monitor,
  Tablet,
  Smartphone,
  Sparkles,
  Layout,
  Volume2,
  Gauge,
  Target,
  Clock,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Play,
  FastForward,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  pageFitMode: 'standard' | 'full';
  onChangePageFitMode: (mode: 'standard' | 'full') => void;
  onSettingsReset?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  pageFitMode,
  onChangePageFitMode,
  onSettingsReset,
}) => {
  const { theme, setTheme, isNavyWhite } = useTheme();
  const { forcedMode, setForcedMode, rawDeviceType } = useScreen();
  const currentUser = getCurrentUser();

  const [activeTab, setActiveTab] = useState<'display' | 'voice' | 'exam' | 'reset'>('display');
  const [examPrefs, setExamPrefs] = useState<ExamPreferences>(() => getExamPreferences());
  const [voiceRate, setVoiceRate] = useState<number>(() => voiceReader.getState().rate);
  const [autoReadNext, setAutoReadNext] = useState<boolean>(() => voiceReader.getState().autoReadOnNext);
  const [dailyTarget, setDailyTarget] = useState<number>(() => {
    if (currentUser) {
      return getDailyStudyGoal(currentUser.id).dailyTargetQuestions;
    }
    return 30;
  });

  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; type: 'success' | 'warn' } | null>(null);
  const [showFactoryConfirm, setShowFactoryConfirm] = useState(false);

  if (!isOpen) return null;

  const showNotification = (text: string, type: 'success' | 'warn' = 'success') => {
    setFeedbackMsg({ text, type });
    setTimeout(() => {
      setFeedbackMsg(null);
    }, 3500);
  };

  // Change Speech Rate
  const handleVoiceRateChange = (rate: number) => {
    setVoiceRate(rate);
    voiceReader.setRate(rate);
    showNotification(`Voice speed set to ${rate}x`);
  };

  // Change Auto-Read
  const handleAutoReadToggle = (enabled: boolean) => {
    setAutoReadNext(enabled);
    voiceReader.setAutoReadOnNext(enabled);
    showNotification(enabled ? 'Auto-read next question enabled' : 'Auto-read next question disabled');
  };

  // Sample Speech Test
  const handleTestSpeech = () => {
    voiceReader.speakText('This is a test of the FCTA Staff CBT Audio Voice Reader at the selected speed.');
  };

  // Exam Prefs Toggle
  const handleTogglePref = (key: keyof ExamPreferences) => {
    const updated = {
      ...examPrefs,
      [key]: !examPrefs[key],
    };
    setExamPrefs(updated);
    saveExamPreferences(updated);
    showNotification(`Exam preference updated`);
  };

  // Daily target change
  const handleDailyTargetChange = (target: number) => {
    setDailyTarget(target);
    if (currentUser) {
      updateDailyTarget(currentUser.id, target);
    }
    showNotification(`Daily study target set to ${target} questions/day`);
  };

  // 1. Reset Application Settings (Display, Screen, Page fit, Voice, Exam prefs)
  const handleResetApplicationSettings = () => {
    // Reset Theme to Navy-White
    setTheme('navy-white');
    // Reset Screen Mode to Auto
    setForcedMode('auto');
    // Reset Page Fit to Standard
    onChangePageFitMode('standard');
    // Reset Voice settings
    voiceReader.resetSettings();
    setVoiceRate(1.0);
    setAutoReadNext(false);
    // Reset Exam Prefs
    setExamPrefs(DEFAULT_EXAM_PREFS);
    saveExamPreferences(DEFAULT_EXAM_PREFS);
    // Reset Daily Goal to 30
    if (currentUser) {
      updateDailyTarget(currentUser.id, 30);
      setDailyTarget(30);
    }

    showNotification('Application settings successfully reset to factory defaults!');
    if (onSettingsReset) {
      onSettingsReset();
    }
  };

  // 2. Factory Reset Everything (Full slate restore)
  const handleConfirmFactoryReset = () => {
    factoryResetPortalData();
    if (currentUser) {
      resetStudyGoal(currentUser.id);
    }
    // Reset state
    setTheme('navy-white');
    setForcedMode('auto');
    onChangePageFitMode('standard');
    voiceReader.resetSettings();
    setVoiceRate(1.0);
    setAutoReadNext(false);
    setExamPrefs(DEFAULT_EXAM_PREFS);
    setDailyTarget(30);
    setShowFactoryConfirm(false);

    showNotification('Complete factory reset performed! Cache and settings refreshed.', 'warn');
    if (onSettingsReset) {
      onSettingsReset();
    }

    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        id="app-settings-modal"
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border flex flex-col max-h-[90vh] transition-colors ${
          isNavyWhite 
            ? 'bg-white border-blue-200 text-slate-800' 
            : 'bg-[#081832] border-blue-900 text-slate-100'
        }`}
      >
        {/* Modal Header */}
        <div className={`px-6 py-4 border-b flex items-center justify-between ${
          isNavyWhite 
            ? 'bg-blue-50/80 border-blue-100 text-blue-950' 
            : 'bg-[#050f20] border-blue-900 text-white'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold tracking-tight">
                Application Settings
              </h2>
              <p className={`text-xs ${isNavyWhite ? 'text-slate-500' : 'text-blue-300/80'}`}>
                Configure display, audio voice reader, exam engine & system reset
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              isNavyWhite ? 'hover:bg-blue-100 text-slate-500' : 'hover:bg-blue-900 text-slate-300'
            }`}
            title="Close Settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feedback Alert Toast */}
        {feedbackMsg && (
          <div className={`px-6 py-2 text-xs font-semibold flex items-center gap-2 border-b animate-in fade-in duration-150 ${
            feedbackMsg.type === 'warn'
              ? 'bg-amber-500 text-white border-amber-600'
              : 'bg-emerald-600 text-white border-emerald-700'
          }`}>
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{feedbackMsg.text}</span>
          </div>
        )}

        {/* Tab Switcher */}
        <div className={`px-6 pt-3 border-b flex items-center gap-2 overflow-x-auto text-xs font-semibold ${
          isNavyWhite ? 'border-blue-100 bg-slate-50/50' : 'border-blue-900/60 bg-[#06142a]'
        }`}>
          <button
            onClick={() => setActiveTab('display')}
            className={`pb-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'display'
                ? 'border-blue-600 text-blue-600 font-bold'
                : isNavyWhite ? 'border-transparent text-slate-500 hover:text-slate-800' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>Display & View</span>
          </button>

          <button
            onClick={() => setActiveTab('voice')}
            className={`pb-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'voice'
                ? 'border-blue-600 text-blue-600 font-bold'
                : isNavyWhite ? 'border-transparent text-slate-500 hover:text-slate-800' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Audio & Voice</span>
          </button>

          <button
            onClick={() => setActiveTab('exam')}
            className={`pb-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'exam'
                ? 'border-blue-600 text-blue-600 font-bold'
                : isNavyWhite ? 'border-transparent text-slate-500 hover:text-slate-800' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>Exam & Goals</span>
          </button>

          <button
            onClick={() => setActiveTab('reset')}
            className={`pb-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'reset'
                ? 'border-rose-600 text-rose-600 font-bold'
                : isNavyWhite ? 'border-transparent text-slate-500 hover:text-rose-600' : 'border-transparent text-slate-400 hover:text-rose-400'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Settings</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {/* TAB 1: DISPLAY */}
          {activeTab === 'display' && (
            <div className="space-y-6">
              {/* Theme Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Color Theme
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setTheme('navy-white')}
                    className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                      theme === 'navy-white'
                        ? 'border-blue-600 ring-2 ring-blue-500/30 bg-blue-50/80 text-blue-950 font-bold shadow-xs'
                        : isNavyWhite
                        ? 'border-blue-100 hover:border-blue-300 bg-white text-slate-700'
                        : 'border-blue-900/60 hover:border-blue-700 bg-[#091b36] text-slate-200'
                    }`}
                  >
                    <Sun className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-xs sm:text-sm">Navy Blue & White</div>
                      <div className={`text-[11px] font-normal ${isNavyWhite ? 'text-slate-500' : 'text-slate-400'}`}>
                        Official FCTA administrative palette with optimal daylight readability
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setTheme('midnight-navy')}
                    className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                      theme === 'midnight-navy'
                        ? 'border-blue-500 ring-2 ring-blue-500/30 bg-blue-950/80 text-white font-bold shadow-xs'
                        : isNavyWhite
                        ? 'border-blue-100 hover:border-blue-300 bg-white text-slate-700'
                        : 'border-blue-900/60 hover:border-blue-700 bg-[#091b36] text-slate-200'
                    }`}
                  >
                    <Moon className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-xs sm:text-sm">Midnight Navy</div>
                      <div className={`text-[11px] font-normal ${isNavyWhite ? 'text-slate-500' : 'text-slate-400'}`}>
                        High-contrast low-light dark mode for prolonged evening mock drill sessions
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Viewport Simulation Mode */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Screen Device Recognition Mode
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'auto', label: 'Auto Hardware', icon: <Sparkles className="w-4 h-4 text-emerald-500" />, desc: 'Hardware sensing' },
                    { id: 'desktop', label: 'Desktop', icon: <Monitor className="w-4 h-4 text-blue-500" />, desc: 'Widescreen (≥1024px)' },
                    { id: 'tablet', label: 'Tablet', icon: <Tablet className="w-4 h-4 text-indigo-500" />, desc: 'Touch pad (768px)' },
                    { id: 'mobile', label: 'Mobile', icon: <Smartphone className="w-4 h-4 text-rose-500" />, desc: 'Smartphone (390px)' },
                  ].map((item) => {
                    const isSelected = forcedMode === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setForcedMode(item.id as ScreenDeviceType | 'auto')}
                        className={`p-3 rounded-xl border text-center flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                          isSelected
                            ? 'border-blue-600 bg-blue-600 text-white font-bold shadow-md'
                            : isNavyWhite
                            ? 'border-blue-100 hover:border-blue-300 bg-white text-slate-700'
                            : 'border-blue-900/60 hover:border-blue-700 bg-[#091b36] text-slate-200'
                        }`}
                      >
                        {item.icon}
                        <span className="text-xs font-semibold">{item.label}</span>
                        <span className="text-[10px] opacity-75">{item.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Page Fit Canvas */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Page Layout Width
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => onChangePageFitMode('standard')}
                    className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                      pageFitMode === 'standard'
                        ? 'border-blue-600 ring-2 ring-blue-500/30 bg-blue-50/80 text-blue-950 font-bold'
                        : isNavyWhite
                        ? 'border-blue-100 bg-white text-slate-700'
                        : 'border-blue-900/60 bg-[#091b36] text-slate-200'
                    }`}
                  >
                    <Layout className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-xs sm:text-sm">Standard Centered (Recommended)</div>
                      <div className={`text-[11px] font-normal ${isNavyWhite ? 'text-slate-500' : 'text-slate-400'}`}>
                        Comfortable reading container bounded at 1280px width
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => onChangePageFitMode('full')}
                    className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                      pageFitMode === 'full'
                        ? 'border-blue-600 ring-2 ring-blue-500/30 bg-blue-50/80 text-blue-950 font-bold'
                        : isNavyWhite
                        ? 'border-blue-100 bg-white text-slate-700'
                        : 'border-blue-900/60 bg-[#091b36] text-slate-200'
                    }`}
                  >
                    <Layout className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-xs sm:text-sm">Edge-to-Edge Canvas</div>
                      <div className={`text-[11px] font-normal ${isNavyWhite ? 'text-slate-500' : 'text-slate-400'}`}>
                        Expands question grids and tables to full browser width
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: AUDIO & VOICE */}
          {activeTab === 'voice' && (
            <div className="space-y-6">
              {/* Voice Speech Speed */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Audio Voice Reader Speed
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[0.8, 1.0, 1.2, 1.4].map((rate) => {
                    const isSelected = Math.abs(voiceRate - rate) < 0.05;
                    return (
                      <button
                        key={rate}
                        onClick={() => handleVoiceRateChange(rate)}
                        className={`py-3 px-2 rounded-xl border text-center flex flex-col items-center gap-1 font-mono transition-all cursor-pointer ${
                          isSelected
                            ? 'border-blue-600 bg-blue-600 text-white font-bold shadow-md'
                            : isNavyWhite
                            ? 'border-blue-100 hover:border-blue-300 bg-white text-slate-700'
                            : 'border-blue-900/60 hover:border-blue-700 bg-[#091b36] text-slate-200'
                        }`}
                      >
                        <Gauge className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm font-bold">{rate.toFixed(1)}x</span>
                        <span className="text-[10px] font-sans opacity-75">
                          {rate === 1.0 ? 'Default' : rate < 1.0 ? 'Paced' : 'Brisk'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Auto Read on Next Question */}
              <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
                isNavyWhite ? 'bg-blue-50/50 border-blue-100' : 'bg-[#091b36] border-blue-900/60'
              }`}>
                <div>
                  <div className="font-semibold text-xs sm:text-sm">Auto-Read Next Question</div>
                  <div className={`text-xs ${isNavyWhite ? 'text-slate-500' : 'text-slate-400'}`}>
                    Automatically narrate each examination question aloud upon navigating to the next question
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={autoReadNext}
                    onChange={(e) => handleAutoReadToggle(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Voice Reader Test Audio Button */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-400">
                  Verify speech synthesis capability
                </span>
                <button
                  onClick={handleTestSpeech}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Test Audio Voice</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: EXAM & GOALS */}
          {activeTab === 'exam' && (
            <div className="space-y-6">
              {/* Daily Study Target */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Daily Study Goal (Questions Per Day)
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[15, 25, 30, 50, 100].map((t) => {
                    const isSelected = dailyTarget === t;
                    return (
                      <button
                        key={t}
                        onClick={() => handleDailyTargetChange(t)}
                        className={`py-3 px-2 rounded-xl border text-center flex flex-col items-center gap-1 font-mono transition-all cursor-pointer ${
                          isSelected
                            ? 'border-blue-600 bg-blue-600 text-white font-bold shadow-md'
                            : isNavyWhite
                            ? 'border-blue-100 hover:border-blue-300 bg-white text-slate-700'
                            : 'border-blue-900/60 hover:border-blue-700 bg-[#091b36] text-slate-200'
                        }`}
                      >
                        <Target className="w-4 h-4 text-amber-400" />
                        <span className="text-sm font-bold">{t} Qs</span>
                        <span className="text-[10px] font-sans opacity-75">
                          {t === 30 ? 'Standard' : t < 30 ? 'Light' : 'Intensive'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Exam Options */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  CBT Exam Engine Preferences
                </label>

                {/* Auto Advance on Option Select */}
                <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
                  isNavyWhite ? 'bg-blue-50/50 border-blue-100' : 'bg-[#091b36] border-blue-900/60'
                }`}>
                  <div>
                    <div className="font-semibold text-xs sm:text-sm">Auto-Advance on Option Selection</div>
                    <div className={`text-xs ${isNavyWhite ? 'text-slate-500' : 'text-slate-400'}`}>
                      Instantly jump to next question as soon as you select an answer (speeds up drill completion)
                    </div>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={examPrefs.autoAdvanceOnSelect}
                      onChange={() => handleTogglePref('autoAdvanceOnSelect')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* 5-minute timer alert */}
                <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
                  isNavyWhite ? 'bg-blue-50/50 border-blue-100' : 'bg-[#091b36] border-blue-900/60'
                }`}>
                  <div>
                    <div className="font-semibold text-xs sm:text-sm">5-Minute Exam Countdown Alert</div>
                    <div className={`text-xs ${isNavyWhite ? 'text-slate-500' : 'text-slate-400'}`}>
                      Highlight timer in bold amber when less than 5 minutes remain on the exam clock
                    </div>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={examPrefs.timerAlertFiveMinutes}
                      onChange={() => handleTogglePref('timerAlertFiveMinutes')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: RESET & RESTORE */}
          {activeTab === 'reset' && (
            <div className="space-y-6">
              {/* Option 1: Reset Application Settings */}
              <div className={`p-5 rounded-2xl border space-y-3 ${
                isNavyWhite 
                  ? 'bg-blue-50/60 border-blue-200 text-slate-800' 
                  : 'bg-[#091b36] border-blue-900/70 text-slate-200'
              }`}>
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-600 text-white flex-shrink-0">
                    <RotateCcw className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm sm:text-base">
                      Reset Application Settings to Default
                    </h3>
                    <p className={`text-xs leading-relaxed ${isNavyWhite ? 'text-slate-600' : 'text-slate-400'}`}>
                      Restores all display and engine preferences back to pristine defaults:
                    </p>
                    <ul className={`text-xs space-y-1 list-disc pl-4 pt-1 ${isNavyWhite ? 'text-slate-600' : 'text-slate-400'}`}>
                      <li>Color Theme: <strong>Navy Blue & White</strong></li>
                      <li>Screen Recognition: <strong>Auto Hardware Detection</strong></li>
                      <li>Page Fit: <strong>Standard Centered Container (max-w-7xl)</strong></li>
                      <li>Voice Reader: <strong>1.0x Speech Rate, Auto-Read Off</strong></li>
                      <li>Exam Preferences: <strong>Timer alert on, Auto-advance off</strong></li>
                      <li>Daily Target: <strong>30 questions per day</strong></li>
                    </ul>
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold pt-1">
                      ✓ Your exam history and registered login remain completely intact.
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleResetApplicationSettings}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Settings Now</span>
                  </button>
                </div>
              </div>

              {/* Option 2: Factory Reset Everything */}
              <div className={`p-5 rounded-2xl border space-y-3 ${
                isNavyWhite 
                  ? 'bg-rose-50/60 border-rose-200 text-slate-800' 
                  : 'bg-rose-950/20 border-rose-900/50 text-slate-200'
              }`}>
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-rose-600 text-white flex-shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm sm:text-base text-rose-600 dark:text-rose-400">
                      Factory Reset Portal State & Clear Cache
                    </h3>
                    <p className={`text-xs leading-relaxed ${isNavyWhite ? 'text-slate-600' : 'text-slate-400'}`}>
                      Completely restores the application to a fresh, clean slate. Resets all cached exam sessions, restores default demo candidates, and reloads clean initial mock data.
                    </p>
                  </div>
                </div>

                {!showFactoryConfirm ? (
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => setShowFactoryConfirm(true)}
                      className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Factory Reset Everything...</span>
                    </button>
                  </div>
                ) : (
                  <div className={`p-3.5 rounded-xl border space-y-2.5 ${
                    isNavyWhite ? 'bg-white border-rose-300' : 'bg-slate-900 border-rose-800'
                  }`}>
                    <p className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                      Are you sure? This will clear locally cached mock test attempts and reload the portal.
                    </p>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setShowFactoryConfirm(false)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer ${
                          isNavyWhite ? 'border-slate-300 hover:bg-slate-100 text-slate-700' : 'border-slate-700 hover:bg-slate-800 text-slate-300'
                        }`}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleConfirmFactoryReset}
                        className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs cursor-pointer"
                      >
                        Yes, Factory Reset All
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className={`px-6 py-3 border-t flex items-center justify-between text-xs ${
          isNavyWhite ? 'bg-slate-50 border-blue-100 text-slate-500' : 'bg-[#06142a] border-blue-900/60 text-slate-400'
        }`}>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>thesanturakiyauri cbtportal • Configuration Engine</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetApplicationSettings}
              className={`px-3 py-1.5 rounded-xl border font-semibold transition-colors cursor-pointer ${
                isNavyWhite
                  ? 'border-blue-200 text-blue-900 hover:bg-blue-50'
                  : 'border-blue-800 text-blue-300 hover:bg-blue-900/50'
              }`}
            >
              Reset to Defaults
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
