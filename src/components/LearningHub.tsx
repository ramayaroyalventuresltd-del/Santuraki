import React, { useState } from 'react';
import { LEARNING_MODULES } from '../data/learningData';
import { PSR_CHAPTERS, FR_CHAPTERS, PPA_CHAPTERS } from '../data/chaptersCatalog';
import { voiceReader } from '../utils/speech';
import { 
  BookOpen, 
  Search, 
  Play, 
  Scale, 
  Coins, 
  FileCheck, 
  CheckCircle2, 
  Lightbulb, 
  ExternalLink,
  Volume2,
  Bookmark,
  Share2,
  ChevronRight,
  BookMarked
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface LearningHubProps {
  onStartChapterPractice: (subject: 'psr' | 'fr' | 'ppa', chapterNumber: number, title: string) => void;
}

export const LearningHub: React.FC<LearningHubProps> = ({ onStartChapterPractice }) => {
  const { isNavyWhite } = useTheme();
  const [activeSubject, setActiveSubject] = useState<'all' | 'psr' | 'fr' | 'ppa'>('psr');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModuleId, setSelectedModuleId] = useState<string>(LEARNING_MODULES[0].id);

  // Filter modules
  const filteredModules = LEARNING_MODULES.filter((m) => {
    const matchSubject = activeSubject === 'all' || m.subject === activeSubject;
    const query = searchQuery.toLowerCase().trim();
    const matchQuery = 
      !query ||
      m.title.toLowerCase().includes(query) ||
      m.summary.toLowerCase().includes(query) ||
      m.keyProvisions.some((p) => p.rule.toLowerCase().includes(query) || p.heading.toLowerCase().includes(query) || p.content.toLowerCase().includes(query));
    return matchSubject && matchQuery;
  });

  const currentModule = LEARNING_MODULES.find((m) => m.id === selectedModuleId) || filteredModules[0] || LEARNING_MODULES[0];

  // Read out summary via Voice Reader
  const handleReadSummary = () => {
    const textToRead = `${currentModule.subjectTitle}. Chapter ${currentModule.chapterNumber}: ${currentModule.title}. Summary: ${currentModule.summary}. Key provisions: ` +
      currentModule.keyProvisions.map((p) => `${p.rule}, ${p.heading}: ${p.content}`).join('. ');
    voiceReader.speakText(textToRead);
  };

  // Get chapter definitions for the subject to show full 20 chapters syllabus
  const getSubjectChapters = () => {
    if (activeSubject === 'psr') return PSR_CHAPTERS;
    if (activeSubject === 'fr') return FR_CHAPTERS;
    if (activeSubject === 'ppa') return PPA_CHAPTERS;
    return [...PSR_CHAPTERS, ...FR_CHAPTERS, ...PPA_CHAPTERS];
  };

  return (
    <div className={`min-h-[calc(100vh-4rem)] py-4 px-3 sm:py-8 sm:px-6 lg:px-8 transition-colors ${
      isNavyWhite ? 'bg-[#f4f7fb] text-slate-800' : 'bg-[#07152b] text-slate-100'
    }`}>
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Header Hero */}
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 ${
          isNavyWhite ? 'border-blue-200' : 'border-slate-800'
        }`}>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              Comprehensive Civil Service Learning Center
            </div>
            <h1 className={`text-2xl sm:text-3xl font-extrabold font-serif ${isNavyWhite ? 'text-[#07152b]' : 'text-white'}`}>
              Learning Hub: <span className="text-emerald-500">PPA, FR & PSR</span>
            </h1>
            <p className={`text-xs sm:text-sm mt-1 max-w-2xl ${isNavyWhite ? 'text-slate-600' : 'text-slate-300'}`}>
              Master the foundational legal and regulatory statutes of the Nigerian Public Service. Access chapter notes, key provisions, reference rules, and launch 10-question practice drills.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search rule (e.g. PSR 020701, FR 105)..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Subject Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveSubject('psr')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
              activeSubject === 'psr'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Public Service Rules (PSR - 200 Qs)</span>
          </button>

          <button
            onClick={() => setActiveSubject('fr')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
              activeSubject === 'fr'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Coins className="w-4 h-4" />
            <span>Financial Regulations (FR - 200 Qs)</span>
          </button>

          <button
            onClick={() => setActiveSubject('ppa')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
              activeSubject === 'ppa'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>Public Procurement Act (PPA - 200 Qs)</span>
          </button>

          <button
            onClick={() => setActiveSubject('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
              activeSubject === 'all'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span>All 3 Subjects</span>
          </button>
        </div>

        {/* Learning Hub Grid: Sidebar of Modules + Detailed Content Reader */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Module Selector Sidebar */}
          <div className="lg:col-span-5 space-y-3 max-h-[750px] overflow-y-auto pr-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Select Study Module ({filteredModules.length} Available)
            </h3>

            {filteredModules.map((mod) => (
              <div
                key={mod.id}
                onClick={() => setSelectedModuleId(mod.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  currentModule.id === mod.id
                    ? 'bg-emerald-950/40 border-emerald-500 shadow-md ring-1 ring-emerald-500'
                    : 'bg-slate-800/80 border-slate-700/80 hover:bg-slate-800 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                    mod.subject === 'psr' ? 'bg-emerald-900/60 text-emerald-300' :
                    mod.subject === 'fr' ? 'bg-amber-900/60 text-amber-300' :
                    'bg-blue-900/60 text-blue-300'
                  }`}>
                    {mod.subject.toUpperCase()} • Ch. {mod.chapterNumber}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    10 Questions
                  </span>
                </div>
                <h4 className="font-bold text-white text-sm leading-snug">
                  {mod.title}
                </h4>
                <p className="text-xs text-slate-300 line-clamp-2 mt-1">
                  {mod.summary}
                </p>
              </div>
            ))}

            {/* Complete 20 Chapters Syllabus Directory Accordion */}
            <div className="pt-4 border-t border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
                <BookMarked className="w-3.5 h-3.5" />
                Full 20 Chapters Practice Directory (10 Qs Each)
              </h4>
              <p className="text-[11px] text-slate-400 mb-3">
                Click any chapter to launch a focused 10-question CBT mock practice session:
              </p>
              <div className="space-y-1.5">
                {getSubjectChapters().map((ch) => (
                  <button
                    key={`${ch.subjectId}_${ch.chapterNumber}`}
                    onClick={() => onStartChapterPractice(ch.subjectId as any, ch.chapterNumber, ch.title)}
                    className="w-full text-left p-2.5 rounded-lg bg-slate-800/50 hover:bg-emerald-950/30 border border-slate-700/60 hover:border-emerald-500/50 text-xs flex items-center justify-between group transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-mono text-emerald-400 font-bold">
                        Ch.{ch.chapterNumber}
                      </span>
                      <span className="text-slate-200 group-hover:text-white truncate">
                        {ch.title}
                      </span>
                    </div>
                    <span className="text-[11px] text-emerald-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold flex-shrink-0">
                      Practice <ChevronRight className="w-3 h-3" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Module Detailed Content Viewer */}
          <div className="lg:col-span-7 bg-slate-800/90 border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            {/* Header of selected module */}
            <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-700">
              <div>
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/40 uppercase tracking-wider">
                  {currentModule.subjectTitle} • Chapter {currentModule.chapterNumber}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {currentModule.title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                {/* Voice Reader Button for Study Mode */}
                <button
                  onClick={handleReadSummary}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  title="Read module notes out loud"
                >
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  <span>Read Notes</span>
                </button>

                {/* Practice Chapter Button */}
                <button
                  id="btn-practice-chapter-10q"
                  onClick={() => onStartChapterPractice(currentModule.subject, currentModule.chapterNumber, currentModule.title)}
                  className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Practice 10 Questions</span>
                </button>
              </div>
            </div>

            {/* Summary Box */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/80 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5" />
                Executive Summary & Scope
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {currentModule.summary}
              </p>
            </div>

            {/* Key Provisions */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Codified Key Provisions & Reference Rules
              </h3>

              <div className="space-y-3">
                {currentModule.keyProvisions.map((prov, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-700/80 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        {prov.heading}
                      </h4>
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/50">
                        {prov.rule}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed pl-6">
                      {prov.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Practical Civil Service Tips */}
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 space-y-2 text-xs">
              <h4 className="font-bold text-emerald-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                Practical Tips for FCTA Promotion Candidates
              </h4>
              <ul className="space-y-1 text-slate-300 list-disc list-inside">
                {currentModule.practicalTips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>

            {/* Call-to-action bottom */}
            <div className="pt-4 border-t border-slate-700 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Ready to test your mastery of Chapter {currentModule.chapterNumber}?
              </span>
              <button
                onClick={() => onStartChapterPractice(currentModule.subject, currentModule.chapterNumber, currentModule.title)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Start Chapter {currentModule.chapterNumber} (10 Questions Drill)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
