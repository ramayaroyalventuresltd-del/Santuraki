import React, { useState, useEffect } from 'react';
import { User, ExamSession, DailyStudyGoalData } from '../types';
import { 
  Flame, 
  Target, 
  Trophy, 
  CheckCircle2, 
  Zap, 
  Sliders, 
  Plus, 
  Minus, 
  Check, 
  Calendar,
  Sparkles,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { 
  getDailyStudyGoal, 
  updateDailyTarget, 
  recordStudyQuestions, 
  getRecent7DaysStatus,
  getLocalDateString,
  DayStreakItem
} from '../utils/studyGoalStore';

interface DailyStudyGoalProps {
  user: User;
  onStartExam: (sessionConfig: {
    title: string;
    category: string;
    chapterNumber?: number;
    totalQuestions: number;
    timeLimitMinutes: number;
    questions: any[];
    mode: 'exam' | 'practice';
  }) => void;
  onNavigateToPractice?: () => void;
  quickQuestionsPool?: any[];
}

export const DailyStudyGoal: React.FC<DailyStudyGoalProps> = ({
  user,
  onStartExam,
  onNavigateToPractice,
  quickQuestionsPool,
}) => {
  const { isNavyWhite } = useTheme();
  const [goalData, setGoalData] = useState<DailyStudyGoalData>(() => getDailyStudyGoal(user.id));
  const [isEditingGoal, setIsEditingGoal] = useState<boolean>(false);
  const [tempTarget, setTempTarget] = useState<number>(goalData.dailyTargetQuestions);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Reload goal whenever user changes or component mounts
  useEffect(() => {
    const updated = getDailyStudyGoal(user.id);
    setGoalData(updated);
    setTempTarget(updated.dailyTargetQuestions);
  }, [user.id]);

  const todayStr = getLocalDateString();
  const todayAnswered = goalData.dailyHistory[todayStr] || 0;
  const target = goalData.dailyTargetQuestions;
  const progressPercent = target > 0 ? Math.min(100, Math.round((todayAnswered / target) * 100)) : 0;
  const remaining = Math.max(0, target - todayAnswered);
  const isGoalAchieved = todayAnswered >= target;

  const recent7Days: DayStreakItem[] = getRecent7DaysStatus(goalData);

  // Preset goals
  const PRESET_GOALS = [15, 25, 30, 50, 100];

  const handleSaveGoal = (newTargetValue: number) => {
    const updated = updateDailyTarget(user.id, newTargetValue);
    setGoalData(updated);
    setTempTarget(updated.dailyTargetQuestions);
    setIsEditingGoal(false);
    setSaveSuccessMsg(`Daily goal set to ${updated.dailyTargetQuestions} questions!`);
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  const handleStepTarget = (delta: number) => {
    setTempTarget((prev) => Math.max(5, Math.min(200, prev + delta)));
  };

  // Quick practice: Start a 10-question practice towards daily goal
  const handleStartDailyPractice = () => {
    if (quickQuestionsPool && quickQuestionsPool.length > 0) {
      const sample = [...quickQuestionsPool].sort(() => 0.5 - Math.random()).slice(0, 10);
      onStartExam({
        title: `Daily Goal Practice Drill (10 Questions towards ${target} Qs Goal)`,
        category: 'daily_goal_practice',
        totalQuestions: sample.length,
        timeLimitMinutes: 15,
        questions: sample,
        mode: 'practice',
      });
    } else if (onNavigateToPractice) {
      onNavigateToPractice();
    }
  };

  // Direct practice progress logger (e.g. quick answer logging)
  const handleQuickLogPractice = (count: number = 5) => {
    const updated = recordStudyQuestions(user.id, count);
    setGoalData(updated);
    setSaveSuccessMsg(`Logged +${count} study questions to today's progress!`);
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  return (
    <div 
      id="daily-study-goal-card"
      className={`rounded-3xl p-6 sm:p-8 shadow-xl transition-all border ${
        isNavyWhite
          ? 'bg-white border-blue-100 text-slate-800 shadow-blue-950/5'
          : 'bg-[#0b1e3b] border-blue-900 text-white shadow-2xl'
      }`}
    >
      {/* Card Header & Streak Badges */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-inherit/20">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              isNavyWhite
                ? 'bg-blue-100 text-blue-900 border border-blue-200'
                : 'bg-blue-900/60 text-blue-200 border border-blue-700/50'
            }`}>
              <Target className="w-3.5 h-3.5 text-blue-600" />
              Daily Study Goal
            </span>

            {isGoalAchieved ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Goal Completed Today
              </span>
            ) : (
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                isNavyWhite ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-amber-950/50 text-amber-300 border border-amber-800/50'
              }`}>
                <Zap className="w-3 h-3 text-amber-500" />
                {remaining} questions left today
              </span>
            )}
          </div>

          <h2 className={`text-xl sm:text-2xl font-extrabold tracking-tight ${
            isNavyWhite ? 'text-[#07152b]' : 'text-white'
          }`}>
            Daily Question Target & Streak
          </h2>
          <p className={`text-xs sm:text-sm ${isNavyWhite ? 'text-slate-500' : 'text-blue-200/75'}`}>
            Track your daily discipline for the FCTA Promotion CBT. Consistency builds mastery.
          </p>
        </div>

        {/* Streak Metrics Highlights */}
        <div className="flex items-center gap-3">
          {/* Active Streak */}
          <div 
            id="streak-counter-badge"
            className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl border transition-all ${
              goalData.currentStreak > 0
                ? isNavyWhite 
                  ? 'bg-orange-50/90 border-orange-200 text-orange-950 shadow-xs' 
                  : 'bg-orange-950/40 border-orange-500/50 text-orange-200'
                : isNavyWhite
                  ? 'bg-slate-50 border-slate-200 text-slate-600'
                  : 'bg-[#07152b] border-blue-900 text-blue-200'
            }`}
          >
            <div className={`p-2 rounded-xl ${
              goalData.currentStreak > 0 
                ? 'bg-orange-500 text-white animate-pulse' 
                : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
            }`}>
              <Flame className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black font-mono leading-none">
                  {goalData.currentStreak}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider">
                  {goalData.currentStreak === 1 ? 'Day' : 'Days'}
                </span>
              </div>
              <span className={`text-[10px] font-semibold uppercase tracking-wider block ${
                goalData.currentStreak > 0 ? 'text-orange-600 dark:text-orange-400' : 'text-slate-400'
              }`}>
                Current Streak
              </span>
            </div>
          </div>

          {/* Longest Streak Pill */}
          <div className={`flex items-center gap-2.5 px-3.5 py-3 rounded-2xl border ${
            isNavyWhite 
              ? 'bg-blue-50/50 border-blue-200 text-blue-950' 
              : 'bg-[#07152b] border-blue-900 text-blue-200'
          }`}>
            <div className="p-2 rounded-xl bg-blue-600 text-white">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-bold font-mono leading-none">
                {goalData.longestStreak || goalData.currentStreak || 1} <span className="text-xs font-normal">Days</span>
              </div>
              <span className="text-[10px] text-slate-400 dark:text-blue-300/70 uppercase tracking-wider font-semibold">
                Best Streak
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Success Notification */}
      {saveSuccessMsg && (
        <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Main Section: Progress Bar & 7-Day Activity */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left / Center: Today's Target Meter */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-baseline justify-between">
            <div>
              <span className={`text-xs uppercase tracking-wider font-bold ${
                isNavyWhite ? 'text-slate-500' : 'text-blue-300'
              }`}>
                Today's Questions Completed
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className={`text-3xl sm:text-4xl font-black font-mono ${
                  isGoalAchieved 
                    ? 'text-emerald-500' 
                    : isNavyWhite ? 'text-[#07152b]' : 'text-white'
                }`}>
                  {todayAnswered}
                </span>
                <span className={`text-lg font-bold ${isNavyWhite ? 'text-slate-400' : 'text-blue-300/60'}`}>
                  / {target} questions
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className={`text-xl font-mono font-black ${
                isGoalAchieved 
                  ? 'text-emerald-500' 
                  : isNavyWhite ? 'text-blue-800' : 'text-blue-400'
              }`}>
                {progressPercent}%
              </span>
              <span className="block text-[11px] text-slate-400 font-medium">
                {isGoalAchieved ? 'Target Met!' : `${remaining} to go`}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className={`h-4 w-full rounded-full overflow-hidden p-0.5 border ${
            isNavyWhite ? 'bg-slate-100 border-slate-200' : 'bg-[#07152b] border-blue-900'
          }`}>
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                isGoalAchieved
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                  : 'bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500'
              }`}
              style={{ width: `${Math.max(4, progressPercent)}%` }}
            />
          </div>

          {/* Motivational Prompt & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <p className={`text-xs ${isNavyWhite ? 'text-slate-600' : 'text-blue-200/80'}`}>
              {isGoalAchieved ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Magnificent work! You've achieved your daily study goal today and saved your streak.
                </span>
              ) : (
                <span>
                  Answer <strong className="font-bold text-blue-600 dark:text-blue-400">{remaining} more questions</strong> today to maintain your consecutive study streak.
                </span>
              )}
            </p>

            <div className="flex items-center gap-2">
              <button
                id="btn-toggle-adjust-goal"
                onClick={() => setIsEditingGoal(!isEditingGoal)}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
                  isEditingGoal
                    ? isNavyWhite ? 'bg-blue-100 text-blue-900 border-blue-300' : 'bg-blue-900 text-white border-blue-700'
                    : isNavyWhite ? 'border-slate-200 hover:bg-slate-100 text-slate-700' : 'border-blue-800 hover:bg-blue-900/60 text-blue-200'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>{isEditingGoal ? 'Close Settings' : 'Adjust Goal'}</span>
              </button>

              <button
                id="btn-quick-practice-10"
                onClick={handleStartDailyPractice}
                className="text-xs font-bold px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                title="Launch a 10-question practice test towards today's goal"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Practice 10 Qs</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: 7-Day Activity Strip */}
        <div className={`lg:col-span-5 p-4 rounded-2xl border ${
          isNavyWhite ? 'bg-blue-50/40 border-blue-100' : 'bg-[#07152b]/80 border-blue-900/70'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
              isNavyWhite ? 'text-blue-950' : 'text-blue-200'
            }`}>
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              Last 7 Days Activity
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              Target: {target} Qs/day
            </span>
          </div>

          <div className="grid grid-cols-7 gap-1.5 text-center">
            {recent7Days.map((day) => {
              const met = day.questionsAnswered >= target && target > 0;
              const hasProgress = day.questionsAnswered > 0;

              return (
                <div 
                  key={day.dateStr}
                  className={`p-2 rounded-xl flex flex-col items-center justify-between transition-all ${
                    day.isToday
                      ? isNavyWhite 
                        ? 'bg-white border-2 border-blue-600 shadow-sm' 
                        : 'bg-blue-900/70 border-2 border-blue-400'
                      : met
                        ? isNavyWhite 
                          ? 'bg-emerald-50 border border-emerald-200' 
                          : 'bg-emerald-950/40 border border-emerald-700/50'
                        : hasProgress
                          ? isNavyWhite 
                            ? 'bg-slate-100/80 border border-slate-200' 
                            : 'bg-blue-950/40 border border-blue-900/60'
                          : isNavyWhite
                            ? 'bg-slate-50 border border-slate-100 opacity-60'
                            : 'bg-[#07152b] border border-blue-950 opacity-60'
                  }`}
                  title={`${day.dateStr}: ${day.questionsAnswered} questions answered (${met ? 'Goal met!' : 'Goal not met'})`}
                >
                  <span className={`text-[10px] font-bold ${
                    day.isToday ? 'text-blue-600 font-extrabold' : 'text-slate-400'
                  }`}>
                    {day.dayLabel}
                  </span>

                  <div className="my-1.5">
                    {met ? (
                      <div className="p-1 rounded-full bg-emerald-500 text-white">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    ) : hasProgress ? (
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold font-mono ${
                        day.isToday 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-blue-200 text-blue-900 dark:bg-blue-800 dark:text-blue-200'
                      }`}>
                        {day.questionsAnswered}
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center text-[9px] text-slate-400">
                        0
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] font-mono text-slate-500 dark:text-blue-300/70">
                    {day.dateNum}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Quick Simulation / Logging shortcut */}
          <div className="mt-3 pt-2.5 border-t border-inherit/30 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Practicing offline or review?</span>
            <button
              id="btn-log-5-questions"
              onClick={() => handleQuickLogPractice(5)}
              className={`font-semibold hover:underline cursor-pointer flex items-center gap-1 ${
                isNavyWhite ? 'text-blue-700' : 'text-blue-400'
              }`}
            >
              <Plus className="w-3 h-3" />
              <span>Log +5 Qs to Today</span>
            </button>
          </div>
        </div>
      </div>

      {/* Goal Configuration Drawer / Expandable Panel */}
      {isEditingGoal && (
        <div 
          id="adjust-goal-panel"
          className={`mt-6 pt-6 border-t rounded-2xl p-5 transition-all ${
            isNavyWhite 
              ? 'bg-blue-50/60 border-blue-200 text-slate-800' 
              : 'bg-[#07152b] border-blue-900 text-white'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-600" />
                Configure Daily Target Questions
              </h3>
              <p className="text-xs text-slate-500 dark:text-blue-300/70 mt-0.5">
                Set how many questions you aim to answer each day. Changes persist in local storage.
              </p>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-blue-600 text-white">
              Target: {tempTarget} Qs/day
            </span>
          </div>

          {/* Preset Buttons */}
          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-blue-300 mb-2">
                Quick Presets (Questions per day)
              </label>
              <div className="flex flex-wrap gap-2">
                {PRESET_GOALS.map((preset) => (
                  <button
                    key={preset}
                    id={`btn-preset-goal-${preset}`}
                    onClick={() => setTempTarget(preset)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      tempTarget === preset
                        ? 'bg-blue-600 text-white shadow-md'
                        : isNavyWhite
                          ? 'bg-white border border-blue-200 text-slate-700 hover:bg-blue-100/50'
                          : 'bg-[#0b1e3b] border border-blue-800 text-blue-200 hover:bg-blue-900'
                    }`}
                  >
                    {preset} Questions
                  </button>
                ))}
              </div>
            </div>

            {/* Stepper / Fine-Tuning */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5">
                <button
                  id="btn-step-minus"
                  onClick={() => handleStepTarget(-5)}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                    isNavyWhite ? 'border-slate-300 hover:bg-slate-200' : 'border-blue-800 hover:bg-blue-900'
                  }`}
                  title="Decrease by 5"
                >
                  <Minus className="w-4 h-4" />
                </button>

                <input
                  id="input-daily-target"
                  type="number"
                  min="5"
                  max="200"
                  value={tempTarget}
                  onChange={(e) => setTempTarget(Math.max(5, Math.min(200, parseInt(e.target.value) || 5)))}
                  className={`w-24 text-center py-2 px-3 rounded-xl font-mono text-base font-bold border focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    isNavyWhite 
                      ? 'bg-white border-blue-200 text-blue-950' 
                      : 'bg-[#0b1e3b] border-blue-800 text-white'
                  }`}
                />

                <button
                  id="btn-step-plus"
                  onClick={() => handleStepTarget(5)}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                    isNavyWhite ? 'border-slate-300 hover:bg-slate-200' : 'border-blue-800 hover:bg-blue-900'
                  }`}
                  title="Increase by 5"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <span className="text-xs text-slate-500 ml-1">questions / day</span>
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <button
                  id="btn-cancel-goal"
                  onClick={() => {
                    setTempTarget(goalData.dailyTargetQuestions);
                    setIsEditingGoal(false);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                    isNavyWhite ? 'border-slate-300 text-slate-600 hover:bg-slate-100' : 'border-blue-800 text-blue-200 hover:bg-blue-900'
                  }`}
                >
                  Cancel
                </button>

                <button
                  id="btn-save-goal-target"
                  onClick={() => handleSaveGoal(tempTarget)}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Goal</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
