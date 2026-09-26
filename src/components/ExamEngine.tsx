import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Question, ExamSession, User } from '../types';
import { voiceReader } from '../utils/speech';
import { VoiceReaderBar } from './VoiceReaderBar';
import { saveExamSession } from '../utils/userStore';
import { recordStudyQuestions } from '../utils/studyGoalStore';
import { 
  Clock, 
  Flag, 
  ChevronLeft, 
  ChevronRight, 
  Send, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowLeft, 
  Award,
  AlertTriangle,
  X,
  Volume2,
  Layers,
  Bot,
  Sparkles
} from 'lucide-react';
import { useScreen } from '../context/ScreenRecognitionContext';
import { ScreenRecognitionBadge } from './ScreenRecognitionBadge';
import { PostExamAdvisorAgentModal } from './PostExamAdvisorAgentModal';
import { ReshuffleAgentModal } from './ReshuffleAgentModal';

interface ExamEngineProps {
  user: User;
  session: ExamSession;
  onExit: () => void;
  onRetake: (session: ExamSession) => void;
  onGenerateNewExam?: (session: ExamSession, difficultyLevel?: number) => void;
}

export const ExamEngine: React.FC<ExamEngineProps> = ({
  user,
  session,
  onExit,
  onRetake,
  onGenerateNewExam,
}) => {
  const { deviceType } = useScreen();
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>(session.userAnswers || {});
  const [flagged, setFlagged] = useState<Set<number>>(new Set(session.flaggedQuestions || []));
  const [paletteDrawerOpen, setPaletteDrawerOpen] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(
    session.timeLimitMinutes > 0 ? session.timeLimitMinutes * 60 : 0
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(session.status === 'completed');
  const [submittedSession, setSubmittedSession] = useState<ExamSession | null>(
    session.status === 'completed' ? session : null
  );
  const [showAdvisorAgent, setShowAdvisorAgent] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'correct' | 'incorrect' | 'flagged'>('all');

  const questions = session.questions;
  const currentQ = questions[currentIdx];

  // Auto-read question on change if autoRead is enabled
  useEffect(() => {
    if (isSubmitted || !currentQ) return;
    const state = voiceReader.getState();
    if (state.autoReadOnNext) {
      voiceReader.speakQuestion(currentIdx + 1, currentQ.questionText, currentQ.options);
    }
  }, [currentIdx, currentQ, isSubmitted]);

  // Clean up voice reader on unmount
  useEffect(() => {
    return () => {
      voiceReader.stop();
    };
  }, []);

  // Timer Countdown Effect
  useEffect(() => {
    if (isSubmitted || session.timeLimitMinutes <= 0) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted, session.timeLimitMinutes]);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Option selection
  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      [currentIdx]: optionIndex,
    }));
  };

  // Clear answer
  const handleClearAnswer = () => {
    if (isSubmitted) return;
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[currentIdx];
      return next;
    });
  };

  // Toggle flag for review
  const handleToggleFlag = () => {
    if (isSubmitted) return;
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(currentIdx)) {
        next.delete(currentIdx);
      } else {
        next.add(currentIdx);
      }
      return next;
    });
  };

  // Submit Exam
  const handleSubmitExam = useCallback(() => {
    voiceReader.stop();
    setShowSubmitModal(false);

    // Calculate score
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correctOptionIndex) {
        correctCount++;
      }
    });

    const pct = Math.round((correctCount / questions.length) * 100);
    const passed = pct >= 60; // FCTA Standard Pass mark is 60%
    const timeSpent = session.timeLimitMinutes * 60 - secondsRemaining;

    const completedSession: ExamSession = {
      ...session,
      userAnswers: answers,
      flaggedQuestions: Array.from(flagged),
      submittedAt: Date.now(),
      timeSpentSeconds: timeSpent,
      score: correctCount,
      percentage: pct,
      isPassed: passed,
      status: 'completed',
    };

    saveExamSession(completedSession);
    const answeredCount = Object.keys(answers).length || session.totalQuestions || questions.length;
    recordStudyQuestions(session.userId, answeredCount);
    setSubmittedSession(completedSession);
    setIsSubmitted(true);
    setShowAdvisorAgent(true); // Automatically prompts candidate with Advisor Agent immediately after submission!
  }, [answers, flagged, questions, secondsRemaining, session]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    if (isSubmitted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is in an input
      if (['input', 'textarea', 'select'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) return;

      const key = e.key.toUpperCase();
      if (key === 'A') handleSelectOption(0);
      else if (key === 'B') handleSelectOption(1);
      else if (key === 'C') handleSelectOption(2);
      else if (key === 'D') handleSelectOption(3);
      else if (key === 'N' || key === 'ARROW_RIGHT') {
        if (currentIdx < questions.length - 1) setCurrentIdx((prev) => prev + 1);
      } else if (key === 'P' || key === 'ARROW_LEFT') {
        if (currentIdx > 0) setCurrentIdx((prev) => prev - 1);
      } else if (key === 'F') {
        handleToggleFlag();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIdx, questions.length, isSubmitted, handleToggleFlag]);

  // Stats
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = questions.length - answeredCount;
  const flaggedCount = flagged.size;

  // Manual speak current question
  const handleSpeakCurrent = () => {
    if (!currentQ) return;
    voiceReader.speakQuestion(currentIdx + 1, currentQ.questionText, currentQ.options);
  };

  // If submitted, show the comprehensive Review Screen
  if (isSubmitted) {
    const score = questions.filter((q, i) => answers[i] === q.correctOptionIndex).length;
    const percentage = Math.round((score / questions.length) * 100);
    const isPassed = percentage >= 60;

    const filteredQuestions = questions.filter((q, i) => {
      if (reviewFilter === 'all') return true;
      if (reviewFilter === 'correct') return answers[i] === q.correctOptionIndex;
      if (reviewFilter === 'incorrect') return answers[i] !== undefined && answers[i] !== q.correctOptionIndex;
      if (reviewFilter === 'flagged') return flagged.has(i);
      return true;
    });

    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header Action Bar */}
          <div className="flex items-center justify-between">
            <button
              onClick={onExit}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium flex items-center gap-2 border border-slate-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </button>

            <button
              onClick={() => onRetake(session)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold flex items-center gap-2 shadow-md transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake This Exam</span>
            </button>
          </div>

          {/* Result Score Card */}
          <div className={`p-6 sm:p-8 rounded-2xl border shadow-2xl text-center space-y-4 ${
            isPassed 
              ? 'bg-gradient-to-b from-emerald-950/60 to-slate-900 border-emerald-600/50' 
              : 'bg-gradient-to-b from-rose-950/60 to-slate-900 border-rose-600/50'
          }`}>
            <div className="inline-flex p-3 rounded-full bg-slate-800/80 border border-slate-700 shadow-inner">
              <Award className={`w-10 h-10 ${isPassed ? 'text-emerald-400' : 'text-rose-400'}`} />
            </div>

            <div className="space-y-1">
              <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                isPassed 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              }`}>
                {isPassed ? 'PROMOTION CRITERIA MET (PASSED)' : 'BELOW 60% PASS THRESHOLD (NEEDS REVISION)'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
                {score} / {questions.length} Questions Correct
              </h2>
              <p className="text-2xl font-mono font-bold text-emerald-400">
                {percentage}% Score
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto pt-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                <span className="text-slate-400 block">Candidate</span>
                <span className="font-semibold text-white truncate block">{user.fullName}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                <span className="text-slate-400 block">Cadre & GL</span>
                <span className="font-semibold text-white">{user.gradeLevel}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                <span className="text-slate-400 block">Pass Threshold</span>
                <span className="font-semibold text-amber-400">60% Required</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                <span className="text-slate-400 block">Questions Answered</span>
                <span className="font-semibold text-white">{answeredCount} / {questions.length}</span>
              </div>
            </div>
          </div>

          {/* Agent Reshuffle Evaluation & Next Action Card */}
          <div 
            id="reshuffle-agent-review-card"
            className="bg-slate-800/90 border-2 border-emerald-500/60 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4 relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700/80 pb-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 text-white border border-emerald-400/40 flex items-center justify-center shadow-lg">
                  <Bot className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-white tracking-tight">Agent Reshuffle</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                      Mandatory Next Step
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Inquiry for Candidate <strong className="text-white">{user.fullName}</strong> ({user.gradeLevel}): <strong>Would you like to rewrite the test?</strong>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowAdvisorAgent(true)}
                className="px-3.5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-emerald-300 hover:text-emerald-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-600 self-start sm:self-auto transition-colors cursor-pointer shadow-sm"
              >
                <Bot className="w-4 h-4 text-emerald-400" />
                <span>Open Agent Reshuffle (Voice & Chat)</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              {/* Option 1: Yes — Rewrite Test */}
              <button
                id="review-card-rewrite-same"
                onClick={() => onRetake(session)}
                className="p-4 rounded-xl bg-slate-900/80 hover:bg-slate-900 border-2 border-slate-700 hover:border-emerald-500 text-left transition-all group flex items-center justify-between cursor-pointer"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-emerald-300">
                    <RotateCcw className="w-4 h-4 text-emerald-400" />
                    <span>Yes, Rewrite the Test</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Retake these exact {questions.length} questions to remediate missed items and cement statutory recall.
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-slate-800 text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>

              {/* Option 2: No — Generate New Questions (More Difficult & Never Answered Before) */}
              <button
                id="review-card-generate-new-diff"
                onClick={() => {
                  if (onGenerateNewExam) {
                    const currentDiff = session.difficultyLevel || 2;
                    const nextDiff = currentDiff < 3 ? currentDiff + 1 : 3;
                    onGenerateNewExam(session, nextDiff);
                  } else {
                    onRetake(session);
                  }
                }}
                className="p-4 rounded-xl bg-slate-900/80 hover:bg-slate-900 border-2 border-teal-500/50 hover:border-teal-400 text-left transition-all group flex items-center justify-between cursor-pointer relative"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-teal-300">
                    <Sparkles className="w-4 h-4 text-teal-400" />
                    <span>No, Generate New Questions (More Difficult)</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Agent Reshuffle synthesizes questions you have <strong className="text-teal-300">never answered before</strong> at higher difficulty.
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-teal-500/20 text-teal-300 group-hover:bg-teal-500/30 group-hover:translate-x-0.5 transition-all">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            </div>
          </div>

          {/* Interactive Agent Reshuffle Dialog */}
          <ReshuffleAgentModal
            isOpen={showAdvisorAgent}
            onClose={() => setShowAdvisorAgent(false)}
            user={user}
            session={submittedSession || session}
            onRewriteTest={() => {
              setShowAdvisorAgent(false);
              onRetake(session);
            }}
            onGenerateNewDifficultQuestions={(diffLevel) => {
              setShowAdvisorAgent(false);
              if (onGenerateNewExam) {
                onGenerateNewExam(session, diffLevel);
              } else {
                onRetake(session);
              }
            }}
            onReviewExplanations={() => setShowAdvisorAgent(false)}
            onExitToDashboard={onExit}
          />

          {/* Filter Reviews Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-400" />
              Detailed Question Review & Explanations
            </h3>

            <div className="flex items-center gap-1.5 text-xs bg-slate-800 p-1 rounded-xl border border-slate-700">
              <button
                onClick={() => setReviewFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
                  reviewFilter === 'all' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                All ({questions.length})
              </button>
              <button
                onClick={() => setReviewFilter('correct')}
                className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
                  reviewFilter === 'correct' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Correct ({score})
              </button>
              <button
                onClick={() => setReviewFilter('incorrect')}
                className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
                  reviewFilter === 'incorrect' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Incorrect ({questions.length - score})
              </button>
            </div>
          </div>

          {/* Questions Review List */}
          <div className="space-y-4">
            {filteredQuestions.map((q, idx) => {
              const originalIndex = questions.findIndex((orig) => orig.id === q.id);
              const userChoice = answers[originalIndex];
              const isCorrect = userChoice === q.correctOptionIndex;
              const isFlaggedItem = flagged.has(originalIndex);

              return (
                <div
                  key={q.id}
                  className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                    isCorrect
                      ? 'bg-slate-800/80 border-slate-700'
                      : 'bg-rose-950/20 border-rose-900/50'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-700 text-slate-200">
                        Q{originalIndex + 1}
                      </span>
                      <span className="text-xs font-medium text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/40">
                        {q.categoryLabel}
                      </span>
                      <span className="text-xs text-slate-400">
                        Ch. {q.chapterNumber}: {q.chapterTitle}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isFlaggedItem && (
                        <span className="text-[11px] flex items-center gap-1 text-amber-400 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-800/40">
                          <Flag className="w-3 h-3 fill-current" /> Flagged
                        </span>
                      )}
                      {isCorrect ? (
                        <span className="text-xs font-semibold flex items-center gap-1 text-emerald-400">
                          <CheckCircle2 className="w-4 h-4" /> Correct
                        </span>
                      ) : (
                        <span className="text-xs font-semibold flex items-center gap-1 text-rose-400">
                          <XCircle className="w-4 h-4" /> Incorrect
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-sm sm:text-base font-semibold text-white mb-4">
                    {q.questionText}
                  </p>

                  {/* Options */}
                  <div className="grid grid-cols-1 gap-2 text-xs sm:text-sm mb-4">
                    {q.options.map((opt, optIdx) => {
                      const isCandidateChoice = userChoice === optIdx;
                      const isRightAnswer = q.correctOptionIndex === optIdx;

                      let optStyle = 'bg-slate-900/60 border-slate-700 text-slate-300';
                      if (isRightAnswer) {
                        optStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold';
                      } else if (isCandidateChoice && !isRightAnswer) {
                        optStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`p-3 rounded-xl border flex items-center justify-between ${optStyle}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center font-bold text-xs">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {isRightAnswer && (
                            <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-400">
                              Correct Answer
                            </span>
                          )}
                          {isCandidateChoice && !isRightAnswer && (
                            <span className="text-[11px] uppercase tracking-wider font-bold text-rose-400">
                              Your Choice
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation Box */}
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-emerald-400 font-semibold flex items-center gap-1">
                        Civil Service Rule Explanation:
                      </strong>
                      {q.referenceRule && (
                        <span className="font-mono text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                          {q.referenceRule}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      {q.explanation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Active Exam Interface
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Exam Header */}
      <header className="sticky top-0 z-30 bg-slate-800/95 border-b border-slate-700 backdrop-blur-md px-4 sm:px-6 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Title & Category Info */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {session.title}
              </span>
              <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                Candidate: {user.username} ({user.gradeLevel})
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-white mt-0.5">
              Question {currentIdx + 1} of {questions.length}
            </h2>
          </div>

          {/* Voice Reader Toolbar & Screen Recognition */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Auto Screen Recognition Badge */}
            <ScreenRecognitionBadge compact />

            {/* Quick Mobile/Tablet Palette Toggle Button */}
            <button
              id="btn-mobile-palette-toggle"
              type="button"
              onClick={() => setPaletteDrawerOpen(true)}
              className="lg:hidden px-2.5 py-1.5 rounded-lg bg-slate-750 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 border border-slate-600 cursor-pointer shadow-sm"
              title="Open Question Palette Drawer"
            >
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Palette</span>
              <span className="text-[11px] font-mono text-emerald-300 bg-slate-900 px-1 py-0.5 rounded">
                {answeredCount}/{questions.length}
              </span>
            </button>

            <VoiceReaderBar onSpeakCurrent={handleSpeakCurrent} />

            {/* Timer */}
            {session.timeLimitMinutes > 0 && (
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono font-bold text-sm shadow-sm ${
                secondsRemaining < 300 
                  ? 'bg-rose-950/80 border-rose-500 text-rose-200 animate-pulse' 
                  : 'bg-slate-900 border-slate-700 text-emerald-400'
              }`}>
                <Clock className="w-4 h-4" />
                <span>{formatTime(secondsRemaining)}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              id="btn-header-submit-exam"
              onClick={() => setShowSubmitModal(true)}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wide shadow transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-700 h-1 mt-2 rounded-full overflow-hidden">
          <div 
            className="bg-emerald-500 h-full transition-all duration-300 ease-out"
            style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
          />
        </div>
      </header>

      {/* Main Content Area: Question + Sidebar Question Palette */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
        {/* Question Panel */}
        <div className="w-full lg:col-span-8 bg-slate-800/90 border border-slate-700 rounded-2xl p-4 sm:p-8 shadow-xl flex flex-col justify-between min-h-0 sm:min-h-[480px]">
          <div>
            {/* Question Chapter/Subject Badge */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-700/80">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-800/40">
                  {currentQ?.categoryLabel}
                </span>
                <span className="text-xs text-slate-300">
                  Chapter {currentQ?.chapterNumber}: {currentQ?.chapterTitle}
                </span>
              </div>

              {currentQ?.referenceRule && (
                <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                  Ref: {currentQ.referenceRule}
                </span>
              )}
            </div>

            {/* Question Text */}
            <div className="text-base sm:text-lg font-medium text-white leading-relaxed mb-6">
              {currentQ?.questionText}
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {currentQ?.options.map((option, optIdx) => {
                const isSelected = answers[currentIdx] === optIdx;
                const letter = String.fromCharCode(65 + optIdx);

                return (
                  <button
                    key={optIdx}
                    id={`opt-btn-${currentIdx}-${optIdx}`}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3.5 group cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-md ring-1 ring-emerald-500'
                        : 'bg-slate-900/60 border-slate-700 hover:border-slate-500 text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-800 text-slate-300 border border-slate-600 group-hover:border-slate-400'
                    }`}>
                      {letter}
                    </span>
                    <span className="text-sm sm:text-base leading-snug pt-0.5">
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Navigation Footer */}
          <div className="pt-6 mt-6 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {/* Previous Button */}
              <button
                id="btn-prev-question"
                onClick={() => currentIdx > 0 && setCurrentIdx((p) => p - 1)}
                disabled={currentIdx === 0}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-900 text-slate-200 text-xs sm:text-sm font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {/* Clear Selection */}
              {answers[currentIdx] !== undefined && (
                <button
                  id="btn-clear-selection"
                  onClick={handleClearAnswer}
                  className="px-3 py-2 rounded-xl text-slate-400 hover:text-slate-200 text-xs hover:bg-slate-700/50 transition-colors"
                >
                  Clear Selection
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Flag for Review */}
              <button
                id="btn-flag-review"
                onClick={handleToggleFlag}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border flex items-center gap-1.5 transition-colors cursor-pointer ${
                  flagged.has(currentIdx)
                    ? 'bg-amber-950/60 border-amber-500 text-amber-300'
                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Flag className={`w-3.5 h-3.5 ${flagged.has(currentIdx) ? 'fill-current' : ''}`} />
                <span>{flagged.has(currentIdx) ? 'Flagged' : 'Flag for Review'}</span>
              </button>

              {/* Next Question / Finish */}
              {currentIdx < questions.length - 1 ? (
                <button
                  id="btn-next-question"
                  onClick={() => setCurrentIdx((p) => p + 1)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow transition-colors cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  id="btn-finish-exam"
                  onClick={() => setShowSubmitModal(true)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Exam</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Question Palette (Desktop Workstation View) */}
        <aside className="hidden lg:block lg:col-span-4 bg-slate-800/90 border border-slate-700 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Question Palette
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              Total: {questions.length}
            </span>
          </div>

          {/* Palette Legend */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/80 border border-slate-700/60">
              <span className="w-3 h-3 rounded bg-emerald-600 flex-shrink-0" />
              <span className="text-slate-300 truncate">Answered ({answeredCount})</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/80 border border-slate-700/60">
              <span className="w-3 h-3 rounded bg-slate-700 flex-shrink-0" />
              <span className="text-slate-300 truncate">Unanswered ({unansweredCount})</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/80 border border-slate-700/60">
              <span className="w-3 h-3 rounded bg-amber-500 flex-shrink-0" />
              <span className="text-slate-300 truncate">Flagged ({flaggedCount})</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/80 border border-slate-700/60">
              <span className="w-3 h-3 rounded ring-2 ring-emerald-400 bg-slate-800 flex-shrink-0" />
              <span className="text-slate-300 truncate">Current (Q{currentIdx + 1})</span>
            </div>
          </div>

          {/* Question Grid Buttons */}
          <div className="max-h-72 overflow-y-auto pr-1">
            <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
              {questions.map((_, idx) => {
                const isAnswered = answers[idx] !== undefined;
                const isFlaggedItem = flagged.has(idx);
                const isCurrent = currentIdx === idx;

                let btnClass = 'bg-slate-900 text-slate-300 hover:bg-slate-700';
                if (isAnswered) btnClass = 'bg-emerald-600 text-white font-bold hover:bg-emerald-500';
                if (isFlaggedItem) btnClass = 'bg-amber-600 text-white font-bold hover:bg-amber-500';

                return (
                  <button
                    key={idx}
                    id={`palette-btn-${idx}`}
                    onClick={() => setCurrentIdx(idx)}
                    className={`h-9 rounded-lg text-xs font-mono transition-all flex items-center justify-center relative ${btnClass} ${
                      isCurrent ? 'ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-800 scale-105 z-10' : ''
                    }`}
                  >
                    {idx + 1}
                    {isFlaggedItem && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-300" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Shortcuts Helper */}
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/60 text-[11px] text-slate-400 space-y-1">
            <span className="font-semibold text-slate-300 block">Keyboard Shortcuts:</span>
            <div className="grid grid-cols-2 gap-1 text-[10px] font-mono">
              <span>[A, B, C, D] Choose Option</span>
              <span>[N / →] Next Q</span>
              <span>[P / ←] Previous Q</span>
              <span>[F] Toggle Flag</span>
            </div>
          </div>
        </aside>
      </main>

      {/* Mobile & Tablet Sticky Exam Action Bar */}
      <div className="lg:hidden sticky bottom-0 z-30 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-3 py-2.5 shadow-2xl flex items-center justify-between gap-2">
        <button
          onClick={() => setCurrentIdx((p) => Math.max(0, p - 1))}
          disabled={currentIdx === 0}
          className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1 min-h-[44px] cursor-pointer ${
            currentIdx === 0
              ? 'border-slate-800 text-slate-600 bg-slate-900/50 cursor-not-allowed'
              : 'border-slate-700 text-slate-300 bg-slate-800 hover:bg-slate-700'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Prev</span>
        </button>

        <button
          onClick={handleToggleFlag}
          className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1 min-h-[44px] cursor-pointer ${
            flagged.has(currentIdx)
              ? 'bg-amber-950/80 border-amber-500 text-amber-300'
              : 'bg-slate-800 border-slate-700 text-slate-300'
          }`}
        >
          <Flag className={`w-3.5 h-3.5 ${flagged.has(currentIdx) ? 'fill-current' : ''}`} />
          <span>{flagged.has(currentIdx) ? 'Flagged' : 'Flag'}</span>
        </button>

        <button
          onClick={() => setPaletteDrawerOpen(true)}
          className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold text-emerald-400 flex items-center gap-1.5 min-h-[44px] cursor-pointer"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Q{currentIdx + 1}/{questions.length}</span>
        </button>

        {currentIdx < questions.length - 1 ? (
          <button
            onClick={() => setCurrentIdx((p) => p + 1)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 shadow min-h-[44px] cursor-pointer"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 shadow min-h-[44px] cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit</span>
          </button>
        )}
      </div>

      {/* Mobile & Tablet Question Palette Modal Drawer */}
      {paletteDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-t-3xl sm:rounded-3xl max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-400" />
                <h3 className="font-extrabold text-white text-base">Question Palette Navigator</h3>
              </div>
              <button
                onClick={() => setPaletteDrawerOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Status Legend */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-850 border border-slate-800">
                <span className="w-3 h-3 rounded bg-emerald-600 flex-shrink-0" />
                <span className="text-slate-300">Answered ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-850 border border-slate-800">
                <span className="w-3 h-3 rounded bg-slate-700 flex-shrink-0" />
                <span className="text-slate-300">Unanswered ({unansweredCount})</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-850 border border-slate-800">
                <span className="w-3 h-3 rounded bg-amber-500 flex-shrink-0" />
                <span className="text-slate-300">Flagged ({flaggedCount})</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-850 border border-slate-800">
                <span className="w-3 h-3 rounded ring-2 ring-emerald-400 bg-slate-800 flex-shrink-0" />
                <span className="text-slate-300">Current (Q{currentIdx + 1})</span>
              </div>
            </div>

            {/* Grid of Questions */}
            <div className="overflow-y-auto max-h-72 pr-1">
              <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
                {questions.map((_, idx) => {
                  const isAnswered = answers[idx] !== undefined;
                  const isFlaggedItem = flagged.has(idx);
                  const isCurrent = currentIdx === idx;

                  let btnClass = 'bg-slate-850 text-slate-300 hover:bg-slate-700';
                  if (isAnswered) btnClass = 'bg-emerald-600 text-white font-bold';
                  if (isFlaggedItem) btnClass = 'bg-amber-600 text-white font-bold';

                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentIdx(idx);
                        setPaletteDrawerOpen(false);
                      }}
                      className={`h-10 rounded-xl text-xs font-mono transition-all flex items-center justify-center relative cursor-pointer ${btnClass} ${
                        isCurrent ? 'ring-2 ring-emerald-400 scale-105 z-10' : ''
                      }`}
                    >
                      {idx + 1}
                      {isFlaggedItem && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-300" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setPaletteDrawerOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold w-full sm:w-auto cursor-pointer"
              >
                Close Palette
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                Submit Examination Confirmation
              </h3>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Are you sure you want to end and submit your CBT exam session? You will immediately receive your scored analysis and question reviews.
            </p>

            <div className="grid grid-cols-3 gap-2 text-center text-xs py-2">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-700">
                <span className="text-emerald-400 text-lg font-bold block">{answeredCount}</span>
                <span className="text-slate-400 text-[11px]">Answered</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-700">
                <span className="text-rose-400 text-lg font-bold block">{unansweredCount}</span>
                <span className="text-slate-400 text-[11px]">Unanswered</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-700">
                <span className="text-amber-400 text-lg font-bold block">{flaggedCount}</span>
                <span className="text-slate-400 text-[11px]">Flagged</span>
              </div>
            </div>

            {unansweredCount > 0 && (
              <p className="text-xs text-amber-400 bg-amber-950/40 p-2.5 rounded-lg border border-amber-800/40">
                Notice: You have {unansweredCount} unanswered questions remaining.
              </p>
            )}

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 text-xs font-semibold hover:bg-slate-700"
              >
                Return to Exam
              </button>
              <button
                id="btn-confirm-submit-exam"
                onClick={handleSubmitExam}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg transition-colors cursor-pointer"
              >
                Confirm & Submit Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
