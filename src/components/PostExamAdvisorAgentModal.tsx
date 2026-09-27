import React, { useState, useEffect } from 'react';
import { User, ExamSession } from '../types';
import { DIFFICULTY_TIERS, getDifficultyTier } from '../data/difficultyLevels';
import { voiceReader } from '../utils/speech';
import {
  Bot,
  RotateCcw,
  Sparkles,
  BookOpen,
  Award,
  AlertTriangle,
  Volume2,
  VolumeX,
  Layers,
  ArrowRight,
  HelpCircle,
  X,
  MessageSquare,
  Flame,
  FileText
} from 'lucide-react';

interface PostExamAdvisorAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  session: ExamSession;
  onRewriteSameQuestions: () => void;
  onGenerateNewQuestions: (difficultyLevel: number) => void;
  onReviewExplanations: () => void;
  onExitToDashboard: () => void;
}

export const PostExamAdvisorAgentModal: React.FC<PostExamAdvisorAgentModalProps> = ({
  isOpen,
  onClose,
  user,
  session,
  onRewriteSameQuestions,
  onGenerateNewQuestions,
  onReviewExplanations,
  onExitToDashboard,
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<number>(3); // Level 3 as required
  const [activeTab, setActiveTab] = useState<'decision' | 'grade_matrix' | 'agent_chat'>('decision');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [agentChatHistory, setAgentChatHistory] = useState<Array<{ sender: 'agent' | 'user'; text: string; time: string }>>([]);
  const [chatInput, setChatInput] = useState<string>('');

  const score = session.score ?? 0;
  const total = session.totalQuestions || session.questions.length || 1;
  const percentage = session.percentage ?? Math.round((score / total) * 100);
  const isPassed = session.isPassed ?? percentage >= 60;

  // Level 3 Difficulty Info
  const level3Info = getDifficultyTier(3);

  // Subscribe to voice reader state
  useEffect(() => {
    const unsub = voiceReader.subscribe((state) => {
      setIsSpeaking(state.isSpeaking && !state.isPaused);
    });
    return unsub;
  }, []);

  // Initialize initial Agent welcome & chat prompt
  useEffect(() => {
    if (!isOpen) {
      voiceReader.stop();
      return;
    }

    const greeting = `Candidate ${user.fullName} (${user.gradeLevel} • ${user.cadre}). Your examination "${session.title}" has been officially evaluated with a score of ${score} out of ${total} (${percentage} percent).`;
    const promptText = `As your FCTA CBT Exam Advisory Agent, my mandate is to ask you: Would you like to REWRITE THE SAME QUESTIONS to master and remediate any errors, or GENERATE A FRESH SET OF NEW QUESTIONS calibrated at Level 3 Difficulty (Directorate Standard for Grade Levels 14 to 16)?`;

    setAgentChatHistory([
      {
        sender: 'agent',
        text: `${greeting}\n\n${promptText}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
  }, [isOpen, user.fullName, user.gradeLevel, user.cadre, session.title, score, total, percentage]);

  if (!isOpen) return null;

  // Voice playback toggle
  const handleToggleVoice = () => {
    if (isSpeaking) {
      voiceReader.stop();
    } else {
      const speechText = `Candidate ${user.fullName}, Grade Level ${user.gradeLevel}. You scored ${score} out of ${total}, which is ${percentage} percent. ${
        isPassed ? 'You have satisfied the 60 percent promotion threshold.' : 'This score is below the 60 percent promotion pass benchmark.'
      } As your CBT Advisor Agent, I need to ask you: Do you want to rewrite the same questions to correct your errors, or generate fresh new questions at Level 3 Difficulty calibrated for Grade Levels 14 to 16?`;
      voiceReader.speakText(speechText);
    }
  };

  // Handle Preset Questions to Agent
  const handleAskAgentPreset = (question: string) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let responseText = '';

    if (question.includes('Level 3 Difficulty')) {
      responseText = `Level 3 Difficulty is calibrated specifically for Senior Directorate and Executive Ranks (Grade Levels 14, 15, and 16). While Level 1 (GL 07-09) focuses on direct factual recall, and Level 2 (GL 10-13) covers supervisory compliance, Level 3 tests high-order statutory conflicts, Federal Executive Council procurement thresholds, gross misconduct disciplinary inquiries, and strategic policy memos. Practicing at Level 3 ensures you operate at the highest promotion standard.`;
    } else if (question.includes('Rewrite the same')) {
      responseText = `Rewriting the same ${total} questions gives you immediate cognitive remediation. Since you just attempted them, retaking now forces your brain to recall the statutory explanations, rule citations, and correct options for questions you initially missed or flagged. It is proven to boost long-term retention toward 100% mastery.`;
    } else if (question.includes('60% Promotion Pass')) {
      responseText = `Under FCTA Civil Service Commission circulars and Federal Civil Service guidelines, 60% is the mandatory statutory threshold to be eligible for substantive promotion consideration. However, because Directorate vacancies (GL 14 to 16) are strictly quota-constrained, candidates with 75% or higher receive priority recommendation during Directorate Promotion Board evaluations.`;
    } else {
      responseText = `Based on your performance in "${session.title}", I recommend either rewriting this set to achieve 100% accuracy on missed questions, or generating a fresh batch at Level 3 Difficulty to test your adaptability across new Directorate-level civil service scenarios.`;
    }

    setAgentChatHistory((prev) => [
      ...prev,
      { sender: 'user', text: question, time: timeNow },
      { sender: 'agent', text: responseText, time: timeNow }
    ]);
  };

  const handleSendCustomChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const text = chatInput.trim();
    setChatInput('');
    handleAskAgentPreset(text);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        id="post-exam-advisor-agent-modal"
        className="bg-slate-900 border-2 border-emerald-500/50 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col my-auto border-t-4 border-t-emerald-400"
      >
        {/* Top Agent Identity Bar */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 px-6 py-4 border-b border-emerald-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg border border-emerald-300/40">
                <Bot className="w-6 h-6 text-white animate-pulse" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                  FCTA Post-Exam Evaluation Agent
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  AI Advisor Active
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Mandatory Post-Submission Guidance • Calibrated for <strong className="text-slate-200">{user.fullName}</strong> ({user.gradeLevel})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleVoice}
              title={isSpeaking ? "Stop Voice Reader" : "Listen to Agent's Advice"}
              className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isSpeaking
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-emerald-400 border-slate-700'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{isSpeaking ? 'Mute Voice' : 'Listen to Agent'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
              title="Close and View Review Screen"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-950/60 px-6 py-2 border-b border-slate-800 flex items-center justify-between text-xs overflow-x-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('decision')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'decision'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Rewrite or Generate New</span>
            </button>

            <button
              onClick={() => setActiveTab('grade_matrix')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'grade_matrix'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Difficulty Levels (GL Categorisation)</span>
            </button>

            <button
              onClick={() => setActiveTab('agent_chat')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'agent_chat'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Ask Advisor Agent</span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 text-slate-400">
            <span className="text-[11px]">Difficulty Assigned:</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 text-[11px]">
              Level 3 (GL 14 - GL 16)
            </span>
          </div>
        </div>

        {/* Main Body */}
        <div className="p-5 sm:p-6 overflow-y-auto max-h-[calc(85vh-160px)] space-y-6">

          {/* Candidate Result Banner */}
          <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
            isPassed 
              ? 'bg-emerald-950/40 border-emerald-600/40 text-emerald-100'
              : 'bg-rose-950/40 border-rose-600/40 text-rose-100'
          }`}>
            <div className="flex items-center gap-3.5 text-left">
              <div className={`p-3 rounded-2xl ${isPassed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                {isPassed ? <Award className="w-7 h-7" /> : <AlertTriangle className="w-7 h-7" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {isPassed ? 'PROMOTION THRESHOLD ATTAINED' : 'BELOW PROMOTION PASS MARK (60%)'}
                  </span>
                  <span className="text-xs px-2 py-0.2 rounded bg-slate-900/60 font-mono text-slate-300 border border-slate-700">
                    {session.totalQuestions} Questions
                  </span>
                </div>
                <h4 className="text-xl sm:text-2xl font-black text-white">
                  {score} / {total} Correct ({percentage}%)
                </h4>
                <p className="text-xs text-slate-300">
                  Exam Title: <strong className="text-white">{session.title}</strong>
                </p>
              </div>
            </div>

            <div className="text-right sm:border-l sm:border-slate-700 sm:pl-4">
              <span className="text-[11px] text-slate-400 block uppercase">Candidate Designation</span>
              <span className="text-sm font-bold text-white block">{user.fullName}</span>
              <span className="text-xs text-emerald-300 font-semibold">{user.cadre} • {user.gradeLevel}</span>
            </div>
          </div>

          {/* TAB 1: THE CORE AGENT DECISION (Rewrite Same Questions vs Generate New Questions) */}
          {activeTab === 'decision' && (
            <div className="space-y-6">
              {/* The Agent's Explicit Mandate Question */}
              <div className="bg-slate-800/80 border-2 border-emerald-500/40 rounded-2xl p-5 shadow-xl space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-emerald-300" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-emerald-300 uppercase tracking-wide">
                        Agent Inquiry & Structured Pathway
                      </h4>
                      <span className="text-[11px] text-slate-400 font-mono">
                        Prompt Ref: FCTA-CBT-POST-SUBMISSION
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
                      Candidate <strong className="text-emerald-300">{user.fullName}</strong>, having concluded your examination session, please declare your next study action:
                    </p>
                    <p className="text-base sm:text-lg font-bold text-white bg-slate-900/80 p-3 rounded-xl border border-emerald-500/30">
                      &ldquo;Do you want to <span className="text-emerald-400 underline decoration-emerald-500">REWRITE THE SAME QUESTIONS</span> to remediate your errors, or <span className="text-teal-300 underline decoration-teal-400">GENERATE NEW QUESTIONS</span> calibrated at Level 3 Difficulty (Directorate Standard, GL 14–16)?&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              {/* Two Primary Choice Action Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* CHOICE 1: Rewrite the Same Questions */}
                <div 
                  id="action-rewrite-same-questions"
                  className="bg-slate-800/90 hover:bg-slate-800 border-2 border-slate-700 hover:border-emerald-500/70 rounded-2xl p-5 shadow-lg transition-all duration-200 flex flex-col justify-between group cursor-pointer"
                  onClick={onRewriteSameQuestions}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <RotateCcw className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-700 text-slate-200 border border-slate-600">
                        Identical {session.totalQuestions} Questions
                      </span>
                    </div>

                    <div>
                      <h5 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-2">
                        Rewrite the Same Questions
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-400" />
                      </h5>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        Retake the exact same questions from this session with blank answer sheets. Immediate re-testing helps you rectify questions you missed, cement statutory memory, and achieve 100% mastery.
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-700 text-[11px] text-slate-300 space-y-1">
                      <div className="flex items-center gap-1.5 font-semibold text-emerald-400">
                        <Award className="w-3.5 h-3.5" />
                        <span>Recommended When:</span>
                      </div>
                      <p>
                        Score was below 80% and you wish to verify correct options for PSR, FR, or PPA rules you previously missed.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-2 border-t border-slate-700/80">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRewriteSameQuestions();
                      }}
                      className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Rewrite Same Questions Now</span>
                    </button>
                  </div>
                </div>

                {/* CHOICE 2: Generate New Questions (Difficulty Level 3) */}
                <div 
                  id="action-generate-new-questions"
                  className="bg-slate-800/90 hover:bg-slate-800 border-2 border-teal-500/60 hover:border-teal-400 rounded-2xl p-5 shadow-lg transition-all duration-200 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
                  onClick={() => onGenerateNewQuestions(selectedDifficulty)}
                >
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-teal-500 to-emerald-600 text-slate-950 font-black text-[10px] uppercase tracking-wider px-3 py-0.5 rounded-bl-lg">
                    Level 3 Difficulty
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/40 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Sparkles className="w-5 h-5 text-teal-300" />
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40">
                        Fresh Question Bank
                      </span>
                    </div>

                    <div>
                      <h5 className="text-lg font-bold text-white group-hover:text-teal-300 transition-colors flex items-center gap-2">
                        Generate New Questions
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-teal-300" />
                      </h5>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        Synthesize and assemble a completely fresh batch of questions at <strong className="text-teal-300">Level 3 Difficulty</strong>, calibrated to Directorate standards (Grade Levels 14–16).
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900/70 border border-teal-500/30 text-[11px] text-slate-300 space-y-1">
                      <div className="flex items-center gap-1.5 font-semibold text-teal-300">
                        <Flame className="w-3.5 h-3.5 text-teal-400" />
                        <span>Level 3 Directorate Calibration:</span>
                      </div>
                      <p>
                        Directorate-level scenarios, cross-statutory reconciliation (PSR vs. Circulars), FEC/BPP thresholds, and policy memo frameworks.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-2 border-t border-slate-700/80">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onGenerateNewQuestions(selectedDifficulty);
                      }}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 active:from-teal-700 active:to-emerald-700 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Generate New Questions (Level 3)</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Difficulty Level 3 Callout Card (Categorised by Grade Level) */}
              <div className="bg-slate-950/70 border border-emerald-500/30 rounded-2xl p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-400" />
                    <h6 className="text-xs font-bold text-white uppercase tracking-wider">
                      Difficulty Level Specification: Level 3 (Categorised by Grade Level)
                    </h6>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Directorate Standard: GL 14 to GL 16
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  {DIFFICULTY_TIERS.map((tier) => {
                    const isSelected = tier.level === 3;
                    return (
                      <div
                        key={tier.level}
                        className={`p-3 rounded-xl border transition-all ${
                          isSelected
                            ? 'bg-emerald-950/50 border-emerald-500/60 shadow-md text-emerald-100 ring-1 ring-emerald-500/50'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold mb-1">
                          <span className={isSelected ? 'text-emerald-300 font-extrabold' : 'text-slate-300'}>
                            Level {tier.level}: {tier.title}
                          </span>
                          {isSelected && (
                            <span className="text-[10px] bg-emerald-500 text-slate-950 px-1.5 py-0.2 rounded font-black">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <div className="font-semibold text-slate-200 text-[11px] mb-1">
                          Grade Levels: <strong className={isSelected ? 'text-emerald-400' : 'text-slate-300'}>{tier.gradeLevels}</strong>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                          {tier.cognitiveFocus}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Secondary Options: Review Explanations or Return to Dashboard */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={onReviewExplanations}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-2 border border-slate-700 transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span>Review Question-by-Question Explanations</span>
                </button>

                <button
                  onClick={onExitToDashboard}
                  className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold flex items-center gap-2 border border-slate-700 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span>Finish & Return to Dashboard</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: GRADE MATRIX DETAIL */}
          {activeTab === 'grade_matrix' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  Official FCTA Civil Service CBT 3-Tier Difficulty Matrix
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  In compliance with public service examination guidelines, difficulty is categorised into three distinct levels corresponding to grade level cadres. The Agent sets generated retake exams to <strong className="text-emerald-400">Level 3 Difficulty</strong> to prepare candidates for senior directorate performance.
                </p>
              </div>

              <div className="space-y-3">
                {DIFFICULTY_TIERS.map((tier) => (
                  <div
                    key={tier.level}
                    className={`p-4 rounded-2xl border transition-all ${
                      tier.level === 3
                        ? 'bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border-emerald-500/60 shadow-lg'
                        : 'bg-slate-800/50 border-slate-700'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-extrabold text-xs ${
                          tier.level === 3 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700 text-slate-300'
                        }`}>
                          {tier.level}
                        </span>
                        <div>
                          <h5 className="text-sm font-bold text-white flex items-center gap-2">
                            {tier.title}
                            {tier.level === 3 && (
                              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                                Applied Difficulty (Level 3)
                              </span>
                            )}
                          </h5>
                          <span className="text-xs font-semibold text-emerald-400">
                            Categorised Grade Levels: {tier.gradeLevels} ({tier.targetRanks})
                          </span>
                        </div>
                      </div>

                      <span className="text-xs font-mono text-slate-300 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-700 self-start sm:self-auto">
                        Pass Mark: {tier.passingRequirement}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 text-xs">
                      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                        <span className="text-slate-400 font-semibold block">Cognitive Focus:</span>
                        <p className="text-slate-200">{tier.cognitiveFocus}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                        <span className="text-slate-400 font-semibold block">Statutory Scope:</span>
                        <p className="text-slate-200">{tier.statutoryScope}</p>
                      </div>
                    </div>

                    <div className="mt-3 text-xs space-y-1">
                      <span className="text-slate-400 font-semibold block">Sample Question Archetypes:</span>
                      <ul className="list-disc list-inside text-slate-300 space-y-0.5">
                        {tier.questionArchetypes.map((arch, i) => (
                          <li key={i} className="text-[11px]">{arch}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-right">
                <button
                  onClick={() => setActiveTab('decision')}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
                >
                  Return to Rewrite / Generate Decision
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: INTERACTIVE CHAT WITH ADVISOR AGENT */}
          {activeTab === 'agent_chat' && (
            <div className="space-y-4">
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 h-64 overflow-y-auto space-y-3 font-sans">
                {agentChatHistory.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 text-[10px] text-slate-400">
                      {msg.sender === 'agent' ? (
                        <>
                          <Bot className="w-3 h-3 text-emerald-400" />
                          <span className="font-bold text-emerald-300">CBT Advisor Agent</span>
                        </>
                      ) : (
                        <>
                          <span className="font-bold text-slate-300">{user.fullName}</span>
                        </>
                      )}
                      <span>• {msg.time}</span>
                    </div>

                    <div
                      className={`p-3 rounded-2xl text-xs max-w-[85%] leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-emerald-600 text-white rounded-tr-none'
                          : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none whitespace-pre-line'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Prompt Chips */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
                  Suggested Questions for the Agent:
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Why should I rewrite the same questions?",
                    "Explain Level 3 Difficulty for GL 14 - 16",
                    "What is the 60% Promotion Pass benchmark?",
                    "How do I master Directorate PSR scenarios?"
                  ].map((chip) => (
                    <button
                      key={chip}
                      onClick={() => handleAskAgentPreset(chip)}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Input */}
              <form onSubmit={handleSendCustomChat} className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask the Post-Exam Agent a question..."
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <span>Ask</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}

        </div>

        {/* Bottom Footer Action Bar */}
        <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Agent Status: Standing by for candidate response</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onReviewExplanations}
              className="text-slate-400 hover:text-white underline cursor-pointer"
            >
              Skip to Review Screen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
