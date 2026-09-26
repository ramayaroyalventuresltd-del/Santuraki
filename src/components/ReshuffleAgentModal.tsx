import React, { useState, useEffect } from 'react';
import { User, ExamSession } from '../types';
import { DIFFICULTY_TIERS, getDifficultyTier } from '../data/difficultyLevels';
import { voiceReader } from '../utils/speech';
import { getUserAnsweredCount } from '../utils/userStore';
import { questionBank } from '../data/questionBank';
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
  FileText,
  ShieldAlert,
  CheckCircle2,
  Zap,
  TrendingUp,
  Filter
} from 'lucide-react';

interface ReshuffleAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  session: ExamSession;
  onRewriteTest: () => void;
  onGenerateNewDifficultQuestions: (escalatedDifficulty: number) => void;
  onReviewExplanations: () => void;
  onExitToDashboard: () => void;
}

export const ReshuffleAgentModal: React.FC<ReshuffleAgentModalProps> = ({
  isOpen,
  onClose,
  user,
  session,
  onRewriteTest,
  onGenerateNewDifficultQuestions,
  onReviewExplanations,
  onExitToDashboard,
}) => {
  const [activeTab, setActiveTab] = useState<'decision' | 'difficulty_matrix' | 'agent_chat'>('decision');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isReshuffling, setIsReshuffling] = useState<boolean>(false);
  const [reshuffleStepText, setReshuffleStepText] = useState<string>('');
  const [agentChatHistory, setAgentChatHistory] = useState<Array<{ sender: 'agent' | 'user'; text: string; time: string }>>([]);
  const [chatInput, setChatInput] = useState<string>('');

  const score = session.score ?? 0;
  const total = session.totalQuestions || session.questions.length || 1;
  const percentage = session.percentage ?? Math.round((score / total) * 100);
  const isPassed = session.isPassed ?? percentage >= 60;

  // Determine current and next escalated difficulty
  const currentDiff = session.difficultyLevel || 2;
  const escalatedDiff = currentDiff < 3 ? currentDiff + 1 : 3;
  const currentTier = getDifficultyTier(currentDiff);
  const nextTier = getDifficultyTier(escalatedDiff);

  const answeredCountAll = getUserAnsweredCount(user.id);
  const totalBankCount = questionBank.getTotalQuestionsCount();

  // Subscribe to voice reader state
  useEffect(() => {
    const unsub = voiceReader.subscribe((state) => {
      setIsSpeaking(state.isSpeaking && !state.isPaused);
    });
    return unsub;
  }, []);

  // Initialize initial Agent Reshuffle welcome & inquiry
  useEffect(() => {
    if (!isOpen) {
      voiceReader.stop();
      setIsReshuffling(false);
      return;
    }

    const greeting = `Candidate ${user.fullName} (${user.gradeLevel} • ${user.cadre}). Your test "${session.title}" has been successfully submitted and scored at ${score}/${total} (${percentage}%).`;
    const promptText = `I am Agent Reshuffle. Now that your test is submitted, I must ask you: Would you like to REWRITE THE TEST to remediate your errors, or shall I GENERATE NEW QUESTIONS that you have NEVER answered before and MAKE THE EXAM MORE DIFFICULT?`;

    setAgentChatHistory([
      {
        sender: 'agent',
        text: `${greeting}\n\n${promptText}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);

    // Optional subtle voice prompt on entry
    const voiceSpeech = `Candidate ${user.fullName}. You scored ${score} out of ${total}, which is ${percentage} percent. I am Agent Reshuffle. Would you like to rewrite this test, or shall I generate brand-new, more difficult questions you have never answered before?`;
    voiceReader.speakText(voiceSpeech);
  }, [isOpen, user.fullName, user.gradeLevel, user.cadre, session.title, score, total, percentage]);

  if (!isOpen) return null;

  // Voice playback toggle
  const handleToggleVoice = () => {
    if (isSpeaking) {
      voiceReader.stop();
    } else {
      const speechText = `Candidate ${user.fullName}. You scored ${score} out of ${total} (${percentage} percent). Agent Reshuffle asks: Would you like to rewrite the test, or generate new questions you have never answered before with increased difficulty?`;
      voiceReader.speakText(speechText);
    }
  };

  // Trigger reshuffle generation sequence with live feedback
  const handleExecuteGenerateNewQuestions = () => {
    voiceReader.stop();
    setIsReshuffling(true);
    setReshuffleStepText('Agent Reshuffle is indexing your past answered questions...');

    setTimeout(() => {
      setReshuffleStepText(`Filtering out ${answeredCountAll} previously attempted questions...`);
    }, 450);

    setTimeout(() => {
      setReshuffleStepText(`Escalating exam difficulty to ${nextTier.badgeLabel}...`);
    }, 900);

    setTimeout(() => {
      setReshuffleStepText('Synthesizing 100% unseen statutory questions and starting exam...');
    }, 1350);

    setTimeout(() => {
      setIsReshuffling(false);
      onGenerateNewDifficultQuestions(escalatedDiff);
    }, 1750);
  };

  // Preset prompts for Agent Reshuffle Chat
  const handleAskAgentPreset = (question: string) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let responseText = '';

    if (question.includes('rewrite the test')) {
      responseText = `If you choose YES to rewrite the test, I will reload the exact same ${total} questions with cleared answer sheets. This allows you to immediately apply what you learned, recall correct rule citations (PSR, FR, PPA), and turn your ${percentage}% into 100% mastery.`;
    } else if (question.includes('never answered before') || question.includes('new questions')) {
      responseText = `If you choose NO to generate new questions, I guarantee that every single question in your next exam will be 100% fresh—items you have NEVER seen or answered in any previous mock or practice drill. I automatically cross-check your entire test history and exclude all ${answeredCountAll} previously seen questions.`;
    } else if (question.includes('more difficult') || question.includes('difficulty')) {
      responseText = `I escalate the cognitive challenge! If your previous test was at Level ${currentDiff}, I step you up to ${nextTier.title} (${nextTier.gradeLevels}). You will face advanced civil service scenario judgment, cross-statutory conflict resolution (e.g. Circulars vs. PSR vs. Procurement Act), and senior administrative governance.`;
    } else if (question.includes('60% pass mark')) {
      responseText = `Under FCTA Civil Service Commission standards, 60% is the mandatory statutory threshold. However, for Directorate elevations (GL 14 to GL 16), vacancies are quota-restricted, so scoring 75%+ on higher-difficulty exams guarantees you stand out before the promotion board.`;
    } else {
      responseText = `I am Agent Reshuffle. My directive is to ensure you either master the current test through a rewrite, or advance your career by conquering fresh, harder statutory questions you have never encountered before. Which path do you choose?`;
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
        id="reshuffle-agent-modal"
        className="bg-[#0b172a] border-2 border-emerald-500/60 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col my-auto border-t-4 border-t-emerald-400"
      >
        {/* Top Agent Identity Bar */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-[#0b172a] px-5 sm:px-6 py-4 border-b border-emerald-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 flex items-center justify-center shadow-lg border-2 border-emerald-300/40">
                <Bot className="w-7 h-7 text-white animate-pulse" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  <span>Agent Reshuffle</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/50">
                    CBT Reshuffling Agent
                  </span>
                </h3>
              </div>
              <p className="text-xs text-slate-300">
                Post-Submission Test Protocol • Calibrated for <strong className="text-white">{user.fullName}</strong> ({user.gradeLevel} • {user.cadre})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleVoice}
              title={isSpeaking ? "Stop Voice Audio" : "Listen to Agent Reshuffle"}
              className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isSpeaking
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/30 font-bold'
                  : 'bg-slate-800 hover:bg-slate-700 text-emerald-400 border-slate-700'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{isSpeaking ? 'Mute Agent' : 'Voice Agent'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
              title="Close and View Results Review"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs & Status Bar */}
        <div className="bg-slate-950/80 px-5 sm:px-6 py-2 border-b border-slate-800 flex items-center justify-between text-xs overflow-x-auto gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('decision')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'decision'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-emerald-300" />
              <span>Reshuffle Inquiry (Rewrite vs New)</span>
            </button>

            <button
              onClick={() => setActiveTab('difficulty_matrix')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'difficulty_matrix'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-emerald-300" />
              <span>Difficulty Tiers & Standards</span>
            </button>

            <button
              onClick={() => setActiveTab('agent_chat')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'agent_chat'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-300" />
              <span>Ask Agent Reshuffle</span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 text-slate-400">
            <Filter className="w-3.5 h-3.5 text-teal-400" />
            <span className="text-[11px]">Unanswered Bank:</span>
            <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-bold border border-teal-500/40 text-[11px]">
              {Math.max(0, totalBankCount - answeredCountAll).toLocaleString()}+ Unseen Questions
            </span>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 overflow-y-auto max-h-[calc(85vh-160px)] space-y-6">

          {/* Test Performance Summary Banner */}
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
                    {isPassed ? 'PROMOTION CRITERIA MET (PASS)' : 'BELOW 60% BENCHMARK (NEEDS REVISION)'}
                  </span>
                  <span className="text-xs px-2 py-0.2 rounded bg-slate-900/60 font-mono text-slate-300 border border-slate-700">
                    {session.totalQuestions} Questions Submitted
                  </span>
                </div>
                <h4 className="text-xl sm:text-2xl font-black text-white">
                  {score} / {total} Questions Correct ({percentage}%)
                </h4>
                <p className="text-xs text-slate-300">
                  Completed Session: <strong className="text-white">{session.title}</strong>
                </p>
              </div>
            </div>

            <div className="text-right sm:border-l sm:border-slate-700 sm:pl-4">
              <span className="text-[11px] text-slate-400 block uppercase">Candidate Designation</span>
              <span className="text-sm font-bold text-white block">{user.fullName}</span>
              <span className="text-xs text-emerald-300 font-semibold">{user.cadre} • {user.gradeLevel}</span>
            </div>
          </div>

          {/* TAB 1: THE CORE AGENT RESHUFFLE DECISION */}
          {activeTab === 'decision' && (
            <div className="space-y-6">

              {/* The Mandate Question from Agent Reshuffle */}
              <div className="bg-slate-900/90 border-2 border-emerald-500/50 rounded-2xl p-5 shadow-xl space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 border border-emerald-400/50 flex items-center justify-center shrink-0 mt-0.5 shadow-md">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-sm font-extrabold text-emerald-400 uppercase tracking-wide flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-emerald-300" />
                        <span>Agent Reshuffle Directive</span>
                      </h4>
                      <span className="text-[11px] text-slate-400 font-mono bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
                        Protocol: ASK_REWRITE_OR_MORE_DIFFICULT_UNSEEN
                      </span>
                    </div>

                    <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed">
                      Candidate <strong className="text-white">{user.fullName}</strong>, having completed and submitted your examination:
                    </p>

                    <div className="text-base sm:text-lg font-bold text-white bg-slate-950/80 p-4 rounded-xl border border-emerald-500/40 shadow-inner space-y-1">
                      <p className="text-emerald-300 text-sm font-semibold uppercase tracking-wider">
                        Agent Reshuffle asks:
                      </p>
                      <p className="text-lg sm:text-xl font-black text-white">
                        &ldquo;Would you like to rewrite the test?&rdquo;
                      </p>
                      <p className="text-xs text-slate-300 font-normal pt-1">
                        • If <strong className="text-emerald-400">YES</strong>: Rewrite the exact same test to remediate errors and cement rules.<br />
                        • If <strong className="text-teal-300">NO</strong>: I will generate new questions you have <span className="underline decoration-teal-400 font-semibold">never answered before</span> and make the exam <span className="underline decoration-teal-400 font-semibold">more difficult</span>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reshuffle Processing Indicator (when generating) */}
              {isReshuffling && (
                <div className="p-5 rounded-2xl bg-teal-950/60 border-2 border-teal-500/60 text-center space-y-3 animate-pulse">
                  <div className="inline-flex p-3 rounded-full bg-teal-500/20 text-teal-300">
                    <Bot className="w-8 h-8 animate-spin" />
                  </div>
                  <h5 className="text-base font-bold text-white">Agent Reshuffle is Assembling Your Exam</h5>
                  <p className="text-xs text-teal-300 font-mono">{reshuffleStepText}</p>
                </div>
              )}

              {/* Two Primary Choice Action Cards (YES vs NO) */}
              {!isReshuffling && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* CHOICE 1: YES — REWRITE TEST */}
                  <div 
                    id="agent-reshuffle-rewrite-yes"
                    className="bg-slate-900/90 hover:bg-slate-900 border-2 border-slate-700 hover:border-emerald-500 rounded-2xl p-5 shadow-lg transition-all duration-200 flex flex-col justify-between group cursor-pointer"
                    onClick={() => {
                      voiceReader.stop();
                      onRewriteTest();
                    }}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <RotateCcw className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase">
                          YES — Rewrite
                        </span>
                      </div>

                      <div>
                        <h5 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-2">
                          <span>Yes, Rewrite the Test</span>
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-400" />
                        </h5>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          Retake the identical {session.totalQuestions} questions with clean answer sheets. Correct your missed questions while the explanations are fresh in mind to attain 100% mastery.
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-300 space-y-1.5">
                        <div className="flex items-center gap-1.5 font-semibold text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Remediation Benefits:</span>
                        </div>
                        <ul className="list-disc list-inside space-y-0.5 text-slate-400">
                          <li>Instant recall reinforcement for missed PSR/FR rules</li>
                          <li>Strengthens muscle memory for time-limited CBT navigation</li>
                          <li>Guaranteed retention for promotion exam day</li>
                        </ul>
                      </div>
                    </div>

                    <div className="pt-4 mt-3 border-t border-slate-800">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          voiceReader.stop();
                          onRewriteTest();
                        }}
                        className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Yes, Rewrite Test Now</span>
                      </button>
                    </div>
                  </div>

                  {/* CHOICE 2: NO — GENERATE NEW QUESTIONS (MORE DIFFICULT & NEVER ANSWERED BEFORE) */}
                  <div 
                    id="agent-reshuffle-generate-no"
                    className="bg-slate-900/90 hover:bg-slate-900 border-2 border-teal-500/60 hover:border-teal-400 rounded-2xl p-5 shadow-lg transition-all duration-200 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
                    onClick={handleExecuteGenerateNewQuestions}
                  >
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-teal-500 to-emerald-600 text-slate-950 font-black text-[10px] uppercase tracking-wider px-3 py-0.5 rounded-bl-lg">
                      Difficulty Escalation
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/40 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <TrendingUp className="w-5 h-5 text-teal-300" />
                        </div>
                        <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40 uppercase">
                          NO — New & Harder
                        </span>
                      </div>

                      <div>
                        <h5 className="text-lg font-bold text-white group-hover:text-teal-300 transition-colors flex items-center gap-2">
                          <span>No, Generate New Questions</span>
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-teal-300" />
                        </h5>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          Agent Reshuffle synthesizes brand-new questions you have <strong className="text-teal-300">NEVER answered before</strong> and elevates the exam to <strong className="text-teal-300">{nextTier.badgeLabel}</strong>.
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-950/70 border border-teal-500/30 text-[11px] text-slate-300 space-y-1.5">
                        <div className="flex items-center gap-1.5 font-semibold text-teal-300">
                          <Flame className="w-3.5 h-3.5 text-teal-400" />
                          <span>Agent Reshuffle Guarantee:</span>
                        </div>
                        <ul className="list-disc list-inside space-y-0.5 text-slate-300">
                          <li><strong>Zero Repeated Questions:</strong> Excludes all {answeredCountAll} questions you already answered</li>
                          <li><strong>Harder Cognitive Tier:</strong> Escalated to {nextTier.title} ({nextTier.gradeLevels})</li>
                          <li><strong>Directorate Scenario Depth:</strong> Advanced legal, fiscal & procurement cases</li>
                        </ul>
                      </div>
                    </div>

                    <div className="pt-4 mt-3 border-t border-slate-800">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleExecuteGenerateNewQuestions();
                        }}
                        className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-500 hover:from-teal-500 hover:to-emerald-400 active:from-teal-700 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>No, Generate New Harder Questions</span>
                      </button>
                    </div>
                  </div>

                </div>
              )}

              {/* Difficulty Escalation Comparison Banner */}
              <div className="bg-slate-950/70 border border-emerald-500/30 rounded-2xl p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-400" />
                    <h6 className="text-xs font-bold text-white uppercase tracking-wider">
                      Difficulty Escalation Path Managed by Agent Reshuffle
                    </h6>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    From {currentTier.badgeLabel} ➔ {nextTier.badgeLabel}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  {DIFFICULTY_TIERS.map((tier) => {
                    const isCurrent = tier.level === currentDiff;
                    const isTarget = tier.level === escalatedDiff;

                    return (
                      <div
                        key={tier.level}
                        className={`p-3 rounded-xl border transition-all ${
                          isTarget
                            ? 'bg-emerald-950/60 border-emerald-500/70 shadow-md text-emerald-100 ring-1 ring-emerald-500/50'
                            : isCurrent
                            ? 'bg-slate-900/80 border-slate-700 text-slate-300'
                            : 'bg-slate-900/40 border-slate-800 text-slate-400'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold mb-1">
                          <span className={isTarget ? 'text-emerald-300 font-extrabold' : 'text-slate-300'}>
                            Level {tier.level}: {tier.title}
                          </span>
                          {isTarget && (
                            <span className="text-[10px] bg-teal-500 text-slate-950 px-1.5 py-0.2 rounded font-black">
                              ESCALATION TARGET
                            </span>
                          )}
                          {isCurrent && !isTarget && (
                            <span className="text-[10px] bg-slate-700 text-slate-300 px-1.5 py-0.2 rounded font-semibold">
                              JUST COMPLETED
                            </span>
                          )}
                        </div>
                        <div className="font-semibold text-slate-200 text-[11px] mb-1">
                          Grade Levels: <strong className={isTarget ? 'text-teal-300' : 'text-slate-300'}>{tier.gradeLevels}</strong>
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
                  onClick={() => {
                    voiceReader.stop();
                    onReviewExplanations();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-2 border border-slate-700 transition-colors cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span>Review Question Explanations First</span>
                </button>

                <button
                  onClick={() => {
                    voiceReader.stop();
                    onExitToDashboard();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold flex items-center gap-2 border border-slate-700 transition-colors cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Conclude & Return to Dashboard</span>
                </button>
              </div>

            </div>
          )}

          {/* TAB 2: DIFFICULTY MATRIX DETAIL */}
          {activeTab === 'difficulty_matrix' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span>Agent Reshuffle Adaptive Difficulty System</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Agent Reshuffle automatically adapts exams so candidates don't stagnate on basic recall questions. If you opt not to rewrite, your new test advances from your current tier directly into senior directorate statutory standards.
                </p>
              </div>

              <div className="space-y-3">
                {DIFFICULTY_TIERS.map((tier) => (
                  <div
                    key={tier.level}
                    className={`p-4 rounded-2xl border transition-all ${
                      tier.level === escalatedDiff
                        ? 'bg-gradient-to-r from-teal-950/60 via-slate-900 to-slate-900 border-teal-500/60 shadow-lg'
                        : 'bg-slate-900/60 border-slate-800'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-extrabold text-xs ${
                          tier.level === escalatedDiff ? 'bg-teal-500 text-slate-950' : 'bg-slate-700 text-slate-300'
                        }`}>
                          {tier.level}
                        </span>
                        <div>
                          <h5 className="text-sm font-bold text-white flex items-center gap-2">
                            <span>{tier.title}</span>
                            {tier.level === escalatedDiff && (
                              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/40">
                                Next Difficulty Level
                              </span>
                            )}
                          </h5>
                          <span className="text-xs font-semibold text-teal-400">
                            Grade Levels: {tier.gradeLevels} ({tier.targetRanks})
                          </span>
                        </div>
                      </div>

                      <span className="text-xs font-mono text-slate-300 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-700 self-start sm:self-auto">
                        Pass Benchmark: {tier.passingRequirement}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 text-xs">
                      <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                        <span className="text-slate-400 font-semibold block">Cognitive Rigor:</span>
                        <p className="text-slate-200">{tier.cognitiveFocus}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                        <span className="text-slate-400 font-semibold block">Statutory Scope:</span>
                        <p className="text-slate-200">{tier.statutoryScope}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-right">
                <button
                  onClick={() => setActiveTab('decision')}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Return to Reshuffle Decision
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: CHAT WITH AGENT RESHUFFLE */}
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
                          <span className="font-bold text-emerald-300">Agent Reshuffle</span>
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
                  <span>Suggested Inquiries for Agent Reshuffle:</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Why should I rewrite the test?",
                    "How do you ensure questions were never answered before?",
                    "How much more difficult will the new exam be?",
                    "What is the 60% pass mark for promotion?"
                  ].map((chip) => (
                    <button
                      key={chip}
                      onClick={() => handleAskAgentPreset(chip)}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendCustomChat} className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask Agent Reshuffle about test rewrite or difficulty escalation..."
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Inquire</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}

        </div>

        {/* Footer Bar */}
        <div className="bg-slate-950 px-5 sm:px-6 py-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Agent Reshuffle Status: Standing by for candidate response</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                voiceReader.stop();
                onReviewExplanations();
              }}
              className="text-slate-400 hover:text-white underline cursor-pointer"
            >
              Skip directly to question review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
