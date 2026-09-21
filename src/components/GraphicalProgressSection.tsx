import React, { useState, useMemo } from 'react';
import { User, ExamSession } from '../types';
import { questionBank } from '../data/questionBank';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ReferenceLine,
} from 'recharts';
import {
  TrendingUp,
  Award,
  CheckCircle2,
  BookOpen,
  BarChart3,
  Target,
  Sparkles,
  Play,
  Layers,
  Clock,
  ArrowUpRight,
  Info,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface GraphicalProgressSectionProps {
  user: User;
  sessions: ExamSession[];
  onStartPracticeModule?: (moduleId: string, moduleName: string) => void;
  onNavigate?: (view: 'learning' | 'browse' | 'directory') => void;
}

export interface ModuleMetric {
  id: 'psr' | 'fr' | 'ppa' | 'fct_gk';
  name: string;
  shortName: string;
  syllabusCategory: string;
  description: string;
  accentColor: string;
  badgeBg: string;
  totalCatalogQuestions: number;
  uniqueAnsweredCount: number;
  totalAttempts: number;
  totalCorrect: number;
  completionRate: number; // 0 - 100%
  averageScore: number;   // 0 - 100%
  masteryStatus: 'Distinction' | 'Proficient' | 'Developing' | 'Needs Review' | 'Not Started';
}

const MODULE_DEFINITIONS = [
  {
    id: 'psr' as const,
    name: 'Public Service Rules (PSR)',
    shortName: 'PSR',
    syllabusCategory: 'psr',
    description: 'Statutory appointments, discipline, promotions, leave, allowances & code of ethics.',
    accentColor: '#10b981', // Emerald
    badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  },
  {
    id: 'fr' as const,
    name: 'Financial Regulations (FR)',
    shortName: 'FR',
    syllabusCategory: 'fr',
    description: 'Expenditure authorities, accounting officers, audit, TSA operations & loss of funds.',
    accentColor: '#0ea5e9', // Sky Blue
    badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
  },
  {
    id: 'ppa' as const,
    name: 'Public Procurement Act (PPA 2007)',
    shortName: 'PPA',
    syllabusCategory: 'ppa',
    description: 'BPP compliance, tenders boards, thresholds, bidding methods & contract approvals.',
    accentColor: '#f59e0b', // Amber
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  },
  {
    id: 'fct_gk' as const,
    name: 'FCT Administration & General Knowledge',
    shortName: 'General Knowledge',
    syllabusCategory: 'fct_gk',
    description: 'Abuja Master Plan, FCT Mandate Secretariats, Area Councils, FCDA & Civil Service reforms.',
    accentColor: '#8b5cf6', // Violet
    badgeBg: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
  },
];

export const GraphicalProgressSection: React.FC<GraphicalProgressSectionProps> = ({
  user,
  sessions,
  onStartPracticeModule,
  onNavigate,
}) => {
  const [activeChartTab, setActiveChartTab] = useState<'comparison' | 'trajectory' | 'radar'>('comparison');
  const [activeModuleFilter, setActiveModuleFilter] = useState<'all' | 'psr' | 'fr' | 'ppa' | 'fct_gk'>('all');

  // Compute metrics across PSR, FR, PPA, and General Knowledge
  const { moduleMetrics, overallStats, timelineData, radarData } = useMemo(() => {
    // 1. Calculate for each module
    const metrics: ModuleMetric[] = MODULE_DEFINITIONS.map((def) => {
      const catalogQuestions = questionBank.getQuestionsByCategory(def.syllabusCategory);
      const totalCatalog = catalogQuestions.length > 0 ? catalogQuestions.length : 200;

      const answeredQuestionIds = new Set<string>();
      let attempts = 0;
      let correct = 0;

      sessions.forEach((s) => {
        if (!s.questions || !s.userAnswers) return;
        s.questions.forEach((q, idx) => {
          const qCat = q.category || (q as any).subjectId;
          const isThisModule = 
            qCat === def.id || 
            qCat === def.syllabusCategory ||
            (def.id === 'fct_gk' && (qCat === 'fct' || qCat === 'fct_gk'));

          if (!isThisModule) return;

          const chosen = s.userAnswers[idx];
          if (chosen !== undefined) {
            attempts++;
            answeredQuestionIds.add(q.id || `${q.chapterNumber}-${q.questionText.slice(0, 30)}`);
            if (chosen === q.correctOptionIndex) {
              correct++;
            }
          }
        });
      });

      const uniqueCount = answeredQuestionIds.size;
      const completionRate = totalCatalog > 0 ? Math.min(100, Math.round((uniqueCount / totalCatalog) * 100)) : 0;
      const averageScore = attempts > 0 ? Math.round((correct / attempts) * 100) : 0;

      let masteryStatus: ModuleMetric['masteryStatus'] = 'Not Started';
      if (attempts > 0) {
        if (averageScore >= 75) masteryStatus = 'Distinction';
        else if (averageScore >= 60) masteryStatus = 'Proficient';
        else if (averageScore >= 45) masteryStatus = 'Developing';
        else masteryStatus = 'Needs Review';
      }

      return {
        id: def.id,
        name: def.name,
        shortName: def.shortName,
        syllabusCategory: def.syllabusCategory,
        description: def.description,
        accentColor: def.accentColor,
        badgeBg: def.badgeBg,
        totalCatalogQuestions: totalCatalog,
        uniqueAnsweredCount: uniqueCount,
        totalAttempts: attempts,
        totalCorrect: correct,
        completionRate,
        averageScore,
        masteryStatus,
      };
    });

    // 2. Timeline history data (sorted chronologically)
    const sortedSessions = [...sessions].sort((a, b) => {
      const timeA = a.submittedAt || a.startedAt;
      const timeB = b.submittedAt || b.startedAt;
      return timeA - timeB;
    });

    const timeline = sortedSessions.map((s, idx) => {
      const dateStr = new Date(s.submittedAt || s.startedAt).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
      });

      // Module specific score inside this session
      const getSubScore = (modId: string) => {
        let att = 0;
        let cor = 0;
        if (s.questions && s.userAnswers) {
          s.questions.forEach((q, qIdx) => {
            const qCat = q.category || (q as any).subjectId;
            const match = qCat === modId || (modId === 'fct_gk' && (qCat === 'fct' || qCat === 'fct_gk'));
            if (match && s.userAnswers[qIdx] !== undefined) {
              att++;
              if (s.userAnswers[qIdx] === q.correctOptionIndex) cor++;
            }
          });
        }
        return att > 0 ? Math.round((cor / att) * 100) : null;
      };

      return {
        testIndex: `Test ${idx + 1}`,
        date: dateStr,
        title: s.title,
        overallScore: s.percentage || 0,
        psr: getSubScore('psr'),
        fr: getSubScore('fr'),
        ppa: getSubScore('ppa'),
        fctGk: getSubScore('fct_gk'),
        passThreshold: 60,
        distinctionThreshold: 75,
      };
    });

    // 3. Radar data for module competency balance
    const radar = metrics.map((m) => ({
      subject: m.shortName,
      candidateScore: m.averageScore,
      completionRate: m.completionRate,
      promotionTarget: 75, // FCTA Distinction Benchmark
      passStandard: 60,   // Standard Pass Benchmark
    }));

    // Overall aggregate summaries
    const totalAttemptedOverall = metrics.reduce((acc, m) => acc + m.totalAttempts, 0);
    const totalCorrectOverall = metrics.reduce((acc, m) => acc + m.totalCorrect, 0);
    const overallAvgScore = totalAttemptedOverall > 0 
      ? Math.round((totalCorrectOverall / totalAttemptedOverall) * 100)
      : 0;
    const overallCompletionRate = Math.round(
      metrics.reduce((acc, m) => acc + m.completionRate, 0) / metrics.length
    );

    return {
      moduleMetrics: metrics,
      overallStats: {
        totalAttemptedOverall,
        totalCorrectOverall,
        overallAvgScore,
        overallCompletionRate,
        testsCount: sessions.length,
      },
      timelineData: timeline,
      radarData: radar,
    };
  }, [sessions]);

  // Data formatted for the grouped BarChart
  const barChartData = useMemo(() => {
    return moduleMetrics.map((m) => ({
      name: m.shortName,
      fullName: m.name,
      'Completion Rate (%)': m.completionRate,
      'Average Score (%)': m.averageScore,
      'FCTA Pass Mark': 60,
      attempts: m.totalAttempts,
      correct: m.totalCorrect,
      totalCatalog: m.totalCatalogQuestions,
      status: m.masteryStatus,
    }));
  }, [moduleMetrics]);

  // Tooltip component for BarChart
  const CustomBarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-2xl p-4 shadow-2xl text-xs space-y-2 min-w-[240px] text-slate-200">
          <div className="border-b border-slate-800 pb-2">
            <span className="text-[10px] uppercase font-mono text-emerald-400 font-bold block">
              Syllabus Module Breakdown
            </span>
            <p className="font-extrabold text-white text-sm">{data.fullName}</p>
          </div>

          <div className="space-y-1.5 pt-1 font-mono">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                Average Score:
              </span>
              <span className="font-bold text-emerald-400 text-sm">{data['Average Score (%)']}%</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                Completion Rate:
              </span>
              <span className="font-bold text-sky-400 text-sm">{data['Completion Rate (%)']}%</span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800">
              <span>Attempts / Correct:</span>
              <span className="text-slate-200">{data.correct} / {data.attempts} Qs</span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Syllabus Bank Coverage:</span>
              <span className="text-slate-200">{data.totalCatalog} Total Questions</span>
            </div>

            <div className="flex items-center justify-between text-[11px] pt-1">
              <span className="text-slate-400">Mastery Assessment:</span>
              <span className="font-bold text-amber-400">{data.status}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Tooltip component for Trajectory Chart
  const CustomTimelineTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-2xl p-4 shadow-2xl text-xs space-y-2 min-w-[220px] text-slate-200">
          <div className="border-b border-slate-800 pb-1.5">
            <span className="text-[10px] uppercase font-mono text-emerald-400 font-bold block">
              {data.testIndex} • {data.date}
            </span>
            <p className="font-bold text-white text-xs truncate max-w-[200px]">{data.title}</p>
          </div>

          <div className="space-y-1 font-mono">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Score Achieved:</span>
              <span className="font-bold text-emerald-400 text-sm">{data.overallScore}%</span>
            </div>
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span>Promotion Pass Line:</span>
              <span className="text-amber-400">60%</span>
            </div>
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span>Distinction Target:</span>
              <span className="text-cyan-400">75%</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div id="graphical-progress-analytics" className="bg-slate-800/90 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-700/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              Recharts Performance Analytics
            </span>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              FCTA Promotion Readiness Tracking
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-emerald-400" />
            Module Completion & Score History
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Real-time visual tracking of your completion rates and average scores across the four statutory civil service promotion modules: <strong>Public Service Rules (PSR)</strong>, <strong>Financial Regulations (FR)</strong>, <strong>Public Procurement Act (PPA)</strong>, and <strong>FCT General Knowledge</strong>.
          </p>
        </div>

        {/* Aggregate KPI Badges */}
        <div className="flex flex-wrap items-center gap-3 bg-slate-900/90 border border-slate-700/90 p-3.5 rounded-2xl shadow-inner">
          <div className="px-3 border-r border-slate-800 text-center">
            <span className="text-xs text-slate-400 block font-medium">Syllabus Completion</span>
            <div className="text-lg sm:text-xl font-black text-sky-400 font-mono mt-0.5">
              {overallStats.overallCompletionRate}%
            </div>
          </div>

          <div className="px-3 border-r border-slate-800 text-center">
            <span className="text-xs text-slate-400 block font-medium">Average Score</span>
            <div className="text-lg sm:text-xl font-black text-emerald-400 font-mono mt-0.5">
              {overallStats.overallAvgScore}%
            </div>
          </div>

          <div className="px-3 text-center">
            <span className="text-xs text-slate-400 block font-medium">Tests Evaluated</span>
            <div className="text-lg sm:text-xl font-black text-white font-mono mt-0.5">
              {overallStats.testsCount}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Chart Control Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Visualizer Mode Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-700/80 rounded-2xl">
          <button
            id="btn-chart-tab-comparison"
            type="button"
            onClick={() => setActiveChartTab('comparison')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeChartTab === 'comparison'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Module Comparison</span>
          </button>

          <button
            id="btn-chart-tab-trajectory"
            type="button"
            onClick={() => setActiveChartTab('trajectory')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeChartTab === 'trajectory'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Score Trajectory</span>
          </button>

          <button
            id="btn-chart-tab-radar"
            type="button"
            onClick={() => setActiveChartTab('radar')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeChartTab === 'radar'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Syllabus Balance Radar</span>
          </button>
        </div>

        {/* FCTA Standard Benchmarks Pill */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/60 px-3 py-1.5 rounded-xl border border-slate-800">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            Score
          </span>
          <span className="flex items-center gap-1 ml-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
            Completion
          </span>
          <span className="flex items-center gap-1 ml-2 text-amber-300">
            Pass Threshold: 60%
          </span>
        </div>
      </div>

      {/* PRIMARY GRAPHICAL DISPLAY (RECHARTS) */}
      <div className="bg-slate-900/90 border border-slate-700/90 rounded-2xl p-4 sm:p-6 shadow-xl relative min-h-[360px] flex flex-col justify-center">
        
        {/* TAB 1: Comparative Grouped Bar Chart */}
        {activeChartTab === 'comparison' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-emerald-400" />
                  Comparative Completion Rates & Average Scores by Module
                </h3>
                <p className="text-xs text-slate-400">
                  Dual-metric visualization tracking syllabus coverage vs. accuracy percentage against the 60% FCTA Promotion Benchmark.
                </p>
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                Scale: 0% – 100%
              </div>
            </div>

            <div className="w-full h-80 sm:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barChartData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 25 }}
                  barGap={8}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.6} />
                  <XAxis
                    dataKey="name"
                    stroke="#94a3b8"
                    tick={{ fill: '#cbd5e1', fontSize: 12, fontWeight: 600 }}
                    dy={10}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                    domain={[0, 100]}
                    tickFormatter={(val) => `${val}%`}
                  />
                  <Tooltip content={<CustomBarTooltip />} />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    wrapperStyle={{ paddingBottom: '15px', fontSize: '12px' }}
                  />
                  {/* FCTA 60% Pass Mark Reference Line */}
                  <ReferenceLine
                    y={60}
                    stroke="#f59e0b"
                    strokeDasharray="4 4"
                    label={{
                      value: '60% Pass Mark',
                      position: 'insideTopLeft',
                      fill: '#fbbf24',
                      fontSize: 11,
                      fontWeight: 'bold',
                    }}
                  />
                  <Bar
                    dataKey="Average Score (%)"
                    fill="#10b981"
                    radius={[8, 8, 0, 0]}
                    maxBarSize={48}
                  />
                  <Bar
                    dataKey="Completion Rate (%)"
                    fill="#0ea5e9"
                    radius={[8, 8, 0, 0]}
                    maxBarSize={48}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* TAB 2: Historical Score Trajectory */}
        {activeChartTab === 'trajectory' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  Chronological Exam Performance Progression
                </h3>
                <p className="text-xs text-slate-400">
                  Performance trajectory across completed mock examinations and diagnostic sessions over time.
                </p>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                Target: $\ge 75\%$ Distinction
              </span>
            </div>

            {timelineData.length > 0 ? (
              <div className="w-full h-80 sm:h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={timelineData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 25 }}
                  >
                    <defs>
                      <linearGradient id="scoreAreaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.6} />
                    <XAxis
                      dataKey="testIndex"
                      stroke="#94a3b8"
                      tick={{ fill: '#cbd5e1', fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis
                      stroke="#94a3b8"
                      tick={{ fill: '#94a3b8', fontSize: 11 }}
                      domain={[0, 100]}
                      tickFormatter={(val) => `${val}%`}
                    />
                    <Tooltip content={<CustomTimelineTooltip />} />
                    <Legend
                      verticalAlign="top"
                      align="right"
                      wrapperStyle={{ paddingBottom: '15px', fontSize: '12px' }}
                    />
                    <ReferenceLine
                      y={60}
                      stroke="#f59e0b"
                      strokeDasharray="4 4"
                      label={{
                        value: '60% Pass Threshold',
                        position: 'insideBottomLeft',
                        fill: '#fbbf24',
                        fontSize: 11,
                      }}
                    />
                    <ReferenceLine
                      y={75}
                      stroke="#06b6d4"
                      strokeDasharray="3 3"
                      label={{
                        value: '75% Distinction Target',
                        position: 'insideTopLeft',
                        fill: '#22d3ee',
                        fontSize: 11,
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="overallScore"
                      name="Overall Score (%)"
                      stroke="#10b981"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#scoreAreaGradient)"
                      activeDot={{ r: 7, fill: '#10b981', stroke: '#ffffff', strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="py-16 text-center space-y-3">
                <AlertCircle className="w-12 h-12 text-amber-400 mx-auto opacity-70" />
                <h4 className="text-base font-bold text-white">No Exam History Recorded Yet</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Take your first FCTA promotion mock exam or chapter drill above to visualize your chronological score trajectory!
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Syllabus Balance Radar */}
        {activeChartTab === 'radar' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Target className="w-4 h-4 text-emerald-400" />
                  Syllabus Mastery Balance Radar
                </h3>
                <p className="text-xs text-slate-400">
                  Multi-axial competency profile highlighting balance between Public Service Rules, Financial Regulations, Procurement, and General Knowledge.
                </p>
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                Target: Balanced Coverage
              </div>
            </div>

            <div className="w-full h-80 sm:h-96 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} outerRadius="75%">
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis
                    dataKey="subject"
                    stroke="#cbd5e1"
                    tick={{ fill: '#e2e8f0', fontSize: 12, fontWeight: 700 }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    stroke="#94a3b8"
                    tick={{ fill: '#94a3b8', fontSize: 10 }}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Radar
                    name="Your Average Score (%)"
                    dataKey="candidateScore"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.4}
                  />
                  <Radar
                    name="Syllabus Completion (%)"
                    dataKey="completionRate"
                    stroke="#0ea5e9"
                    fill="#0ea5e9"
                    fillOpacity={0.25}
                  />
                  <Radar
                    name="FCTA Target (75%)"
                    dataKey="promotionTarget"
                    stroke="#f59e0b"
                    fill="none"
                    strokeDasharray="4 4"
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: '15px', fontSize: '12px' }}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* DETAILED STATUTORY MODULE CARDS (PSR, FR, PPA, GENERAL KNOWLEDGE) */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-400" />
              Statutory Module Progress Cards
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Individual audit tracking completion rates, average accuracy, and quick drill launches for each syllabus domain.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveModuleFilter('all')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                activeModuleFilter === 'all' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              All 4 Modules
            </button>
            <button
              onClick={() => setActiveModuleFilter('psr')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                activeModuleFilter === 'psr' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              PSR
            </button>
            <button
              onClick={() => setActiveModuleFilter('fr')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                activeModuleFilter === 'fr' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              FR
            </button>
            <button
              onClick={() => setActiveModuleFilter('ppa')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                activeModuleFilter === 'ppa' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              PPA
            </button>
            <button
              onClick={() => setActiveModuleFilter('fct_gk')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                activeModuleFilter === 'fct_gk' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              GK
            </button>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {moduleMetrics
            .filter((m) => activeModuleFilter === 'all' || activeModuleFilter === m.id)
            .map((mod) => {
              const statusColor =
                mod.masteryStatus === 'Distinction'
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
                  : mod.masteryStatus === 'Proficient'
                  ? 'bg-teal-950/80 text-teal-300 border-teal-500/50'
                  : mod.masteryStatus === 'Developing'
                  ? 'bg-amber-950/80 text-amber-300 border-amber-500/50'
                  : 'bg-slate-800 text-slate-400 border-slate-700';

              return (
                <div
                  key={mod.id}
                  className="bg-slate-900/90 border border-slate-700/80 hover:border-emerald-500/60 transition-all rounded-2xl p-5 flex flex-col justify-between shadow-lg space-y-4 group"
                >
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded border ${mod.badgeBg}`}>
                          {mod.shortName}
                        </span>
                        <h4 className="font-extrabold text-white text-sm mt-1.5 leading-snug line-clamp-2">
                          {mod.name}
                        </h4>
                      </div>

                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusColor} whitespace-nowrap`}>
                        {mod.masteryStatus}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {mod.description}
                    </p>

                    {/* Progress Metrics & Bar */}
                    <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
                      {/* Completion Rate */}
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-slate-400 font-medium">Completion Rate</span>
                          <span className="font-bold text-sky-400 font-mono">
                            {mod.completionRate}%
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className="h-full bg-sky-500 rounded-full transition-all duration-500"
                            style={{ width: `${mod.completionRate}%` }}
                          />
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5 flex justify-between">
                          <span>{mod.uniqueAnsweredCount} Unique Qs</span>
                          <span>{mod.totalCatalogQuestions} Syllabus Total</span>
                        </div>
                      </div>

                      {/* Average Score */}
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-slate-400 font-medium">Average Score</span>
                          <span className="font-bold text-emerald-400 font-mono">
                            {mod.averageScore}%
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                            style={{ width: `${mod.averageScore}%` }}
                          />
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5 flex justify-between">
                          <span>{mod.totalCorrect} Correct / {mod.totalAttempts} Attempts</span>
                          <span className={mod.averageScore >= 60 ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                            {mod.averageScore >= 60 ? 'Passing' : 'Below 60%'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
                    {onStartPracticeModule ? (
                      <button
                        id={`btn-practice-module-${mod.id}`}
                        type="button"
                        onClick={() => onStartPracticeModule(mod.syllabusCategory, `${mod.shortName} High-Yield Practice (15 Qs)`)}
                        className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm group-hover:shadow-emerald-500/20"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Practice {mod.shortName} (15 Qs)</span>
                      </button>
                    ) : (
                      <div className="text-[11px] text-slate-400 text-center w-full">
                        20 Chapters • 200 Questions
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
